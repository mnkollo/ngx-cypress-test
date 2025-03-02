
class accordionPage {

    navigateToAccordionPage() {
        cy.contains('.menu-title', 'Layout').click();
        cy.contains('.menu-title', 'Accordion').click();
    }
    verifyProductDetails() {
        cy.contains('.appearance-filled','Toggle First Item').click();
        cy.contains('[class="expanded"]',' Product Details ').then(($productDetailsCard) => {
            cy.wrap($productDetailsCard).find('.item-body').should('be.visible');
        });
    }
}
export default new accordionPage();