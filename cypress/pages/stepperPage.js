import BasePage from './basePage';

class StepperPage extends BasePage{
  
    navigateToStepperPage(){
        cy.visit('/');
        cy.contains('.menu-title', 'Layout').click();
        cy.contains('.menu-title', 'Stepper').click();
    }
    clickOnStep(stepNumber){
        cy.contains('.label-index', stepNumber).click();

    }
    verifyStepperContent( content){
        cy.get('[class="step-content"] [class="ng-star-inserted"]').eq(0).should('have.text', content);
    }
    completeWizard(firstName,favoriteMovie,favoriteTeam){
        cy.get('nb-card').eq(1).within(() => {
            cy.get('[placeholder="Enter your name"]').should('be.visible').type(firstName);
            cy.get('[type="submit"]').click()
            cy.get('[placeholder="Enter favorite movie"]').should('be.visible').type(favoriteMovie);
            cy.get('[type="submit"]').click()
            cy.get('[placeholder="Enter something"]').should('be.visible').type(favoriteTeam);
            cy.get('[type="submit"]',).click()
            cy.get('.step-content').should('contain.text','Wizard completed!')
        })
    }
    shouldNavigateThroughSteps(){
         cy.get('nb-card').eq(2).within(() => {
            cy.contains('[type="submit"]','prev').should('be.disabled');
            cy.contains('[type="submit"]','next').click()
         })   
         cy.contains('.step.completed','First step').should('be.visible');
    }
}
export default new StepperPage();   