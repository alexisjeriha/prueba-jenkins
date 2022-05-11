/// <reference types="cypress" />
export class ForgotPasswordPage {

    navigate = () => cy.visit('/index.php?controller=password')

    // Forgot Your Password Page elements
    subheading = () => cy.get('.page-subheading')

    errorMessagesList = () => cy.get('.alert.alert-danger ol')
    successMessage = () => cy.get('.alert.alert-success')

    legend = () => cy.get('#center_column p').eq(0)

    lblEmail = () => cy.get('label[for=email]')
    txtEmail = () => cy.get('#email')

    btnRetrievePassword = () => cy.get('.submit button[type=submit]')

    // Forgot Your Password actions

    errorMessage = (errorString) => this.errorMessagesList().contains(errorString)
    enterEmail = (email) => this.txtEmail().type(email)
    submit = () => this.btnRetrievePassword().click()

    }
