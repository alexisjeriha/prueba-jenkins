/// <reference types="cypress" />

export class MainPage {

    // Main Page attributes

    // Main Page elements
    SignInButton = () => cy.get('.header_user_info .login') 
    

    // Main Page actions
    navigate(){
        cy.visit('/')
    }

    signInButtonClick(){
        this.SignInButton().click();
    }


}
