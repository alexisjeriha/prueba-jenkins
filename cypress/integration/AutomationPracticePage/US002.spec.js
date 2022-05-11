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
    })

    it("Verify default state of email field", () => {

        authPage.createAnAccount.txtEmail()
            .should('have.value', '')
    })

    it("Verify inline 'Email' field validation by entering a value with invalid format", function () {

        authPage.createAnAccount.enterEmail(user.invalidFormat.email)
        authPage.clickOutsideElement()
        authPage.createAnAccount.txtEmail().parent()
            .should('have.class', 'form-error')
    })

    it("Verify inline 'Email' field validation by entering a value with valid format", () => {

        authPage.createAnAccount.enterEmail(user.valid.email)
        authPage.clickOutsideElement()
        authPage.createAnAccount.txtEmail().parent()
            .should('have.class', 'form-ok')
    })

    it("Verify 'Email' field validation when creating an account by entering a value with invalid format", () => {

        authPage.createAnAccount.enterEmail(user.invalidFormat.email)
        authPage.createAnAccount.submit()
        authPage.createAnAccount.errorMessagesList().eq(0)
            .should('have.text', 'Invalid email address.')

    })

    it("Verify 'Email' field validation when creating an account by entering an existing value", () => {

        authPage.createAnAccount.enterEmail(user.existing.email)
        authPage.createAnAccount.submit()
        authPage.createAnAccount.errorMessagesList().eq(0)
            .should('have.text', 'An account using this email address has already been registered. Please enter a valid password or request a new one. ')

    })

    it("Verify 'Email' field validation when creating an account by entering a value that meets all criteria.", () => {

        authPage.createAnAccount.enterEmail(user.valid.email)
        authPage.createAnAccount.submit()
        createAccountPage.heading()
            .should('have.text', 'Create an account')
    })

})