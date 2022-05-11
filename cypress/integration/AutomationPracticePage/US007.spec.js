/// <reference types="cypress" />

//#region Modules
import user from '../../fixtures/user.json'
import { MainPage } from "../../page-objects/MainPage"
import { AuthenticationPage } from "../../page-objects/AuthenticationPage";
import { ForgotPasswordPage } from "../../page-objects/ForgotPasswordPage";
//#endregion

describe("User Story 007: Forgot Password", () => {

    const mainPage = new MainPage();
    const authPage = new AuthenticationPage()
    const forgotPasswordPage = new ForgotPasswordPage()

    beforeEach(() => {

        forgotPasswordPage.navigate()
    })

    describe("Loading", () => {

        it("Verify Forgot Password area elements", () => {

             forgotPasswordPage.subheading().should('exist').and('have.text', 'Forgot your password?')
             forgotPasswordPage.legend().should('exist').and('have.text', 'Please enter the email address you used to register. We will then send you a new password. ')
             
            // NO DEFINIDO EN USER STORY
            //  forgotPasswordPage.lblEmail().should('exist').and('include.value', 'Email address')
            //  forgotPasswordPage.txtEmail().should('exist').and('have.value', '')

             forgotPasswordPage.btnRetrievePassword().should('exist').and('include.text', 'Retrieve Password')
            })
    
    })

    describe("Email field validations", () => {

        it("Verify Email field validation when retrieving password by entering a value with invalid format.", () => {

            forgotPasswordPage.enterEmail(user.invalidFormat.email)
            forgotPasswordPage.submit()
            forgotPasswordPage.errorMessage('Invalid email address')

        })

        it("Verify credentials validation when retrieving password by entering a non-existing Email", () => {

            forgotPasswordPage.enterEmail(user.valid.email)
            forgotPasswordPage.submit()
            forgotPasswordPage.errorMessage('There is no account registered for this email address.')

        })

        it("Verify credentials validation when retrieving password by entering an existing Email", () => {

            forgotPasswordPage.enterEmail(user.existing.email)
            forgotPasswordPage.submit()
            forgotPasswordPage.successMessage().should('exist').and('include.text','A confirmation email has been sent to your address: ' + user.existing.email )

        })

    })

})