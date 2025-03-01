import stepperPage from '../pages/stepperPage';
describe('Stepper Test', () => {
    beforeEach('Navigate to stepper Page', ()=> {
        stepperPage.navigateToStepperPage();
    })
    it( 'Verify stepper content 2 is displayed', () =>  {
        stepperPage.clickOnStep('2');
        stepperPage.verifyStepperContent('Step content #2');
    })
    
});