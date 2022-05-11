/// <reference types="cypress" />

//#region Modules
import user from '../../fixtures/user.json'
import { MainPage } from "../../page-objects/MainPage"
import { AuthenticationPage } from "../../page-objects/AuthenticationPage";
import { CreateAnAccountPage } from "../../page-objects/CreateAnAccountPage";
import { MyAccountPage } from "../../page-objects/MyAccountPage";
import { Header } from "../../page-objects/Structure"

//#endregion

describe("User Story 005 - My Account Screen", () => {

    const mainPage = new MainPage();
    const authPage = new AuthenticationPage()
    const createAccountPage = new CreateAnAccountPage()
    const myAccountPage = new MyAccountPage()
    const header = new Header();

    beforeEach(() => {

        authPage.navigate()
        myAccountPage.heading().should('have.text', 'Authentication')
        authPage.login(user.existing.email, user.existing.password)
        myAccountPage.heading().should('have.text', 'My account')
    })

    describe("Loading", () => {

        it("Verify navigation bar elements", () => {

            header.navigationBar.btnAccount().should('exist').and('have.text', user.existing.firstName + ' ' + user.existing.lastName )
            header.navigationBar.btnLogOut().should('exist').and('include.text', 'Sign out')

        })

        it("Verify 'Your Address' area elements", () => {

            myAccountPage.heading().should('exist').and('include.text','My account')

            myAccountPage.myAccountArea.legendInfoAccount().should('exist').and('include.text','Welcome to your account. Here you can manage all of your personal information and orders.')
            
            myAccountPage.myAccountArea.btnOrders().should('exist').and('include.text', 'Order history and details')
            myAccountPage.myAccountArea.btnCreditSlips().should('exist').and('include.text', 'My credit slips')
            myAccountPage.myAccountArea.btnAddresses().should('exist').and('include.text', 'My addresses')
            myAccountPage.myAccountArea.btnInformation().should('exist').and('include.text', 'My personal information')
            myAccountPage.myAccountArea.btnMyWishlists().should('exist').and('include.text', 'My wishlists')

            myAccountPage.myAccountArea.btnHome().should('exist').and('include.text', 'Home')
        })

    })

})