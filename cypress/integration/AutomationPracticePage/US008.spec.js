/// <reference types="cypress" />

//#region Modules
import user from '../fixtures/user.json'
import { MainPage } from "../page-objects/MainPage"
import { AuthenticationPage } from "../page-objects/AuthenticationPage";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { OrderHistoryPage } from "../page-objects/OrderHistoryPage";

//#endregion

describe("User Story 008: Order History page content", () => {

    const mainPage = new MainPage();
    const authPage = new AuthenticationPage()
    const myAccountPage = new MyAccountPage()
    const orderHistoryPage = new OrderHistoryPage()
    const columns = ["Order reference", "Date", "Total price", "Payment", "Status", "Invoice"];

    beforeEach(() => {

        authPage.navigate()
        myAccountPage.heading().should('have.text', 'Authentication')
        authPage.login(user.existing.email, user.existing.password)
        myAccountPage.heading().should('have.text', 'My account')
        myAccountPage.myAccountArea.btnOrders().click()
        orderHistoryPage.heading().should('have.text', 'Order history')
        
    })

    describe("Loading", () => {


        it("Verify legend", () => {
            orderHistoryPage.legend().should('have.text', "Here are the orders you've placed since your account was created.")
        })
    
    })

    describe("Verify Order List", () => {

        it("Verify Email field validation when retrieving password by entering a value with invalid format.", () => {
                
            orderHistoryPage.orderTable().should('exist')
            
            for (let i = 0; i < columns.length; i++) {
                orderHistoryPage.orderTableColumnN(i).should('have.text', columns[i])
                }

        })

        // it("Verify behavior of Invoice link.", () => {
                
            

        // })

        it("Verify behavior of Details button.", () => {
                
            orderHistoryPage.btnDetails().should('exist')

        })

        it("Verify behavior of Reorder link.", () => {
                
            orderHistoryPage.btnReorder().should('exist')

        })



    })

})