/// <reference types="cypress" />

//#region Modules
import user from '../../fixtures/user.json'
import { MainPage } from "../../page-objects/MainPage"
import { AuthenticationPage } from "../../page-objects/AuthenticationPage";
import { CreateAnAccountPage } from "../../page-objects/CreateAnAccountPage";
import { MyAccountPage } from "../../page-objects/MyAccountPage";
//#endregion

describe("User Story 006 - Login", () => {

    const mainPage = new MainPage();
    const authPage = new AuthenticationPage()
    const createAccountPage = new CreateAnAccountPage()
    const myAccountPage = new MyAccountPage()

    beforeEach(() => {

        authPage.navigate()
    })

    describe("Email field validations", () => {

        it("Verify inline 'Email' field validation by entering a value with invalid format", () => {

            authPage.registerAsClient.enterEmail(user.invalidFormat.email)
            authPage.clickOutsideElement()
            authPage.registerAsClient.txtEmail().parent()
                .should('have.class', 'form-error')
        })

        it("Verify inline 'Email' field validation by entering a value with valid format", () => {

            authPage.registerAsClient.enterEmail(user.valid.email)
            authPage.clickOutsideElement()
            authPage.registerAsClient.txtEmail().parent()
                .should('have.class', 'form-ok')
        })

        it("Verify Email field validation when loging in by entering a value with invalid format.", () => {
            authPage.registerAsClient.enterEmail(user.invalidFormat.email)
            authPage.registerAsClient.submit()
            createAccountPage.errorMessage('Invalid email address').should('exist')
        })

        it("Verify Email field validation when loging in by leaving the field empty.", () => {
            authPage.registerAsClient.txtEmail().clear()
            authPage.registerAsClient.submit()
            createAccountPage.errorMessage('An email address required').should('exist')
        })
    })

    describe("Password field validations", () => {

        it("Verify Password field validation when loging in by leaving the field empty.", () => {
            authPage.registerAsClient.enterEmail(user.valid.email)
            authPage.registerAsClient.txtPassword().clear()
            authPage.registerAsClient.submit()
            createAccountPage.errorMessage('Password is required.').should('exist')
        })
    })

    describe("Credential validations", () => {

        it("Verify credentials validation when loging in with existing Email and invalid Password", () => {
            authPage.registerAsClient.enterEmail(user.existing.email)
            authPage.registerAsClient.enterPassword(user.existing.password + "randomString")
            authPage.registerAsClient.submit()
            createAccountPage.errorMessage('Authentication failed').should('exist')
        })

        it("Verify credentials validation when loging in with existing Email and valid Password", () => {
            authPage.registerAsClient.enterEmail(user.existing.email)
            authPage.registerAsClient.enterPassword(user.existing.password)
            authPage.registerAsClient.submit()
            myAccountPage.heading().should('have.text', 'My account')
        })

    })

})