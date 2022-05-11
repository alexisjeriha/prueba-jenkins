/// <reference types="cypress" />
export class AuthenticationPage {

    // Authentication Page attributes
    URL = 'http://automationpractice.com/index.php?controller=authentication&back=my-account';

    // Authentication Page elements
    heading = () => cy.get('.page-heading')

    // Authentication Page actions
    navigate = () => cy.visit('/index.php?controller=authentication&back=my-account')
    clickOutsideElement = () => cy.get('body').click(0,0)

    /**
     * @description Registered user account login
     * @param {String} email Registered user email
     * @param {String} password User password
     */
    login = function (email, password) {
        this.registerAsClient.enterEmail(email)
        this.registerAsClient.enterPassword(password)
        this.registerAsClient.submit()
    }

    /**
     * @description A non-existent email is entered for the creation of an account
     * @param {String} email Non-existing email
     */
    createAccount = function (email) {
        this.createAnAccount.enterEmail(email)
        this.createAnAccount.submit()
    }

    createAnAccount = {

        // Create an Account section elements
        title: () => cy.get("#create-account_form .page-subheading"),
        legend: () => cy.get("#create-account_form p"),
        lblEmail: () => cy.get("label[for=email_create]"),
        txtEmail: () => cy.get("#email_create"),
        btnCreateAnAccount: () => cy.get("#SubmitCreate"),
        errorMessagesList: () => cy.get('#create_account_error ol'),

        // Create an Account section actions
        enterEmail : function (email) { this.txtEmail().type(email) },
        submit: function () { this.btnCreateAnAccount().click() },
    }

    registerAsClient = {

        // Create an Account section elements
        title: () => cy.get("#login_form .page-subheading"),
        lblEmail: () => cy.get("label[for=email]"),
        txtEmail: () => cy.get("#email"),
        lblPassword: () => cy.get("label[for=passwd]"),
        txtPassword: () => cy.get("#passwd"),
        llbForgotPassword: () => cy.get("#login_form .lost_password a"),
        btnSignIn: () => cy.get("#SubmitLogin"),

        // Create an Account section actions
        enterEmail : function (email) { this.txtEmail().type(email) },
        enterPassword : function (password) { this.txtPassword().type(password) },
        submit: function () { this.btnSignIn().click() }

    }

}