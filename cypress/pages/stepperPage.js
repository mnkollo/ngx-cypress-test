
class StepperPage {
  
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
}

export default new StepperPage();