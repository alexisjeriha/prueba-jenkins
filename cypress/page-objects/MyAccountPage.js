/// <reference types="cypress" />
export class MyAccountPage {

    // My Account Page attributes


    // My Account Page elements
    heading = () => cy.get('.page-heading')

    // My Account Page actions
    clickOutsideElement = () => cy.get('body').click(0, 0)

    myAccountArea = {

        // My Account section elements
        
        legendInfoAccount: () => cy.get("p.info-account"),
        
        btnOrders: () => cy.get(".addresses-lists ul.myaccount-link-list a[title=Orders]"),
        btnCreditSlips: () => cy.get(".addresses-lists ul.myaccount-link-list a[title='Credit slips']"),
        btnAddresses: () => cy.get(".addresses-lists ul.myaccount-link-list a[title=Addresses]"),
        btnInformation: () => cy.get(".addresses-lists ul.myaccount-link-list a[title=Information]"),
        btnMyWishlists: () => cy.get(".addresses-lists ul.myaccount-link-list a[title='My wishlists']"),

        btnHome: () => cy.get("ul.footer_links a[title=Home]"),

        // My Account section actions
        btnOrdersClick: () => this.btnOrders().click()


    }
}

