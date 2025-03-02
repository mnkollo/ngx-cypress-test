import stepperPage from "../pages/stepperPage";
import accordionPage from "../pages/accordionPage";
describe("Stepper Test", () => {
  beforeEach("Navigate to stepper Page", () => {
    stepperPage.openSite();
  });
  it("Verify stepper content 2 is displayed", () => {
    stepperPage.navigateToStepperPage();
    stepperPage.clickOnStep("2");
    stepperPage.verifyStepperContent("Step content #2");
  });
  it('Verify able to enter name', () =>{
    stepperPage.navigateToStepperPage();
    stepperPage.completeWizard('John Doe','The Dark Knight','Manchester United');
  })
  it('Verify able navigateThroughSteps', () =>{
    stepperPage.navigateToStepperPage();
    stepperPage.shouldNavigateThroughSteps();
  })
  it("Verify after clicking toggle first item product details show", () => {
    accordionPage.navigateToAccordionPage();
    accordionPage.verifyProductDetails();
  });
});
