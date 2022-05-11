/// <reference types="cypress" />

export class Header {

    banner = {


    }

    navigationBar = {

        btnAccount: () => cy.get("#header .header_user_info a.account"),
        btnLogOut: () => cy.get("#header .header_user_info a.logout"),
        
    }

}

export class Footer {

    newsletter = {

    }

    social = {

    }

    categories = {

    }

    information = {

    }

    myAccount = {

    }

    contact = {

    }

}

