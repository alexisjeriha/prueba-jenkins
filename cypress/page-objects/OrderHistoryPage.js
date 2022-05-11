/// <reference types="cypress" />
export class OrderHistoryPage {

    // Order History Page attributes


    // Order History Page elements
    heading = () => cy.get('.page-heading')

    // Order History Page actions
    clickOutsideElement = () => cy.get('body').click(0, 0)


        // Order History section elements
        
        legend = () => cy.get("p.info-title")
        orderTable = () => cy.get('#order-list')
        orderTableColumns = () => cy.get('#order-list tr th')
        orderTableColumnN = (i) => cy.get('#order-list tr th').eq(i)

        btnDownloadInvoice = () => cy.get('#order-list td.history_invoice')
        btnDetails = () => cy.get('#order-list td.history_detail a').eq(0)
        btnReorder = () => cy.get('#order-list td.history_detail a').eq(1)


        formSubmitReorder = () => cy.get('#submitReorder')
        cartTitle = () => cy.get("#cart_title")
 

        // Order History section actions


    list = {

        // List section elements
        

        // List section actions


    }
}