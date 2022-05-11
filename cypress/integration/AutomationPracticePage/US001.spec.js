/// <reference types="cypress" />

//#region Modules
import { MainPage } from "../../page-objects/MainPage"
import { AuthenticationPage } from "../../page-objects/AuthenticationPage";
//#endregion

// Test suite
describe("User Story 001 - Authentication Page", () => {

    const mainPage = new MainPage();
    const authPage = new AuthenticationPage()

    beforeEach(() => {
        mainPage.navigate();
    })

    it("Verify access to Authentication Screen", () => {

        mainPage.signInButtonClick();
        authPage.heading().should('have.text', 'Authentication')
    })

    it("Verify 'Create an Account' area elements", () => {

        mainPage.signInButtonClick();

        authPage.createAnAccount.title().should('exist').should('be.visible')
            .should('have.text', 'Create an account')

        authPage.createAnAccount.legend().should('exist').should('be.visible')
            .should('have.text', 'Please enter your email address to create an account.')

        authPage.createAnAccount.lblEmail().should('exist').should('be.visible')
            .should('have.text', 'Email address')
        authPage.createAnAccount.txtEmail().should('exist').should('be.visible')

        authPage.createAnAccount.btnCreateAnAccount().should('exist').should('be.visible')
            .should('include.text', 'Create an account')
    })

    it("Verify 'Register as a Client' area elements", () => {
        mainPage.signInButtonClick();

        authPage.registerAsClient.title().should('exist').should('be.visible')
            .should('have.text', 'Already registered?')

        authPage.registerAsClient.lblEmail().should('exist').should('be.visible')
            .should('have.text', 'Email address')
        authPage.registerAsClient.txtEmail().should('exist').should('be.visible')

        authPage.registerAsClient.lblPassword().should('exist').should('be.visible')
            .should('have.text', 'Password')
        authPage.registerAsClient.txtPassword().should('exist').should('be.visible')
        authPage.registerAsClient.llbForgotPassword().should('exist').should('be.visible')
            .should('have.text', 'Forgot your password?')

        authPage.registerAsClient.btnSignIn().should('exist').should('be.visible')
            .should('include.text', 'Sign in')
    })

})

