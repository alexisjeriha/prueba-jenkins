/// <reference types="cypress" />

//#region Modules
import user from '../../fixtures/user.json'
import { MainPage } from "../../page-objects/MainPage"
import { AuthenticationPage } from "../../page-objects/AuthenticationPage";
import { CreateAnAccountPage } from "../../page-objects/CreateAnAccountPage";
//#endregion

// Test suite
describe("User Story 002 - Create Account. Main Screen validations", () => {

    const mainPage = new MainPage();
    const authPage = new AuthenticationPage()
    const createAccountPage = new CreateAnAccountPage()

    beforeEach(() => {
        authPage.navigate()
        cy.eyesOpen({appName: 'Automation Practice', batchName: 'AP_002_Valid_Inline'})
    })

    it("Verify inline 'Email' field validation by entering a value with valid format", () => {
        cy.eyesCheckWindow('Auth Page')
        authPage.createAnAccount.enterEmail(user.valid.email)
        authPage.clickOutsideElement()
        cy.eyesCheckWindow('Green check')
        authPage.createAnAccount.txtEmail().parent()
            .should('have.class', 'form-ok')
        cy.eyesClose()
    })
})