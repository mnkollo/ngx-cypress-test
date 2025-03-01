describe("Accounts Feature", () => {
  describe("Subject of the Command", () => {
    beforeEach("Navigate To Forms Page", () => {
      cy.visit("/");
      cy.contains("Forms").click();
      cy.contains("Form Layouts").click();
    });
    it("Saving Subject of the Command", () => {
      cy.contains("nb-card", "Using the Grid").then(($usingTheGridForm) => {
        cy.wrap($usingTheGridForm)
          .find('[for="inputEmail1"]')
          .should("be.visible");
      });

      //alias
    //   cy.contains("nb-card", "Using the Grid").as("usingTheGridForm");
    //   cy.get("@usingTheGridForm")
    //     .find('[for="inputPassword2"]')
    //     .should("be.visible");
     });

    it.only("Extracting Values", () => {
      cy.contains("nb-card", "Basic form")
        .find('[for="exampleInputEmail1"]')
        .then(($label) => {
          const text = $label.text();

          expect(text).to.eq("Email address");
          cy.wrap(text).should("contain", "Email address");
        });

      cy.get('[for="exampleInputPassword1"]')
        .invoke("text")
        .then(($password) => {
          expect($password).to.equal("Password");
        });

      // extract attribute value
      cy.get('[for="exampleInputPassword1"]')
        .invoke("attr", "class")
        .then(($classValue) => {
          expect($classValue).to.equal("label");
        });
    });
  });
  describe("Date Picker", () => {
    beforeEach("Navigate To DatePicker Page", () => {
      cy.visit("/");
      cy.contains("Forms").click();
      cy.contains("Datepicker").click();
    });
    it("date Picker Test", () => {
      // cy.contains('nb-card', 'Common Datepicker').find('input').then($input => {
      //     cy.wrap($input).click()
      //     cy.get('.day-cell').not('.bounding-month').contains('21').click()
      //     cy.wrap($input).invoke('prop','value').should('contain','Jul 21, 2024')
      //     cy.wrap($input).should('have.value','Jul 21, 2024')
      // })

      let date = new Date(); // will give us current date and time    date - is the instance of the object
      date.setDate(date.getDate() + 5); //return current date of calender
      let futureDate = date.getDate();
      let dateToAssert = `Jul ${futureDate}, 2024`;
      cy.contains("nb-card", "Common Datepicker")
        .find("input")
        .then(($input) => {
          cy.wrap($input).click();
          cy.get(".day-cell")
            .not(".bounding-month")
            .contains(futureDate)
            .click();
          cy.wrap($input)
            .invoke("prop", "value")
            .should("contain", dateToAssert);
          cy.wrap($input).should("have.value", dateToAssert);
        });
    });
  });
  describe("List and Dropdowns", () => {
    beforeEach("Navigate To DatePicker Page", () => {
      cy.visit("/");
    });
    it("list and Dropdowns", () => {
      //loop through each element
      cy.get("nav nb-select").then((dropDown) => {
        cy.wrap(dropDown).click();
        cy.get(".options-list nb-option").each((listItem, index) => {
          //list item will be our iterator
          const itemText = listItem.text().trim();

          cy.wrap(listItem).click();
          cy.wrap(dropDown).should("contain", itemText);
          if (index < 3) {
            cy.wrap(dropDown).click();
          }
        });
      });
    });
  });
  describe("Web Date Pickers", () => {
    beforeEach("Navigate To DatePicker Page", () => {
      cy.visit("/");
      cy.contains("Tables & Data").click();
      cy.contains("Smart Table").click();
    });
    it("Verify able to add age", () => {
      //Act
      cy.get("th .ng2-smart-action").click();
      cy.get("thead tr")
        .eq(2)
        .then((tableRow) => {
          cy.wrap(tableRow).find('[placeholder="First Name"]').type("Michael");
          cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Bing");
          cy.get(".nb-checkmark").click();
        });
      //Assert
      cy.get("tbody tr:eq(0)").then((tableRow) => {
        cy.wrap(tableRow).find("td").eq(2).should("contain", "Michael");
        cy.wrap(tableRow).find("td").eq(3).should("contain", "Bing");
      });

      const age = [20, 30, 200];

      cy.wrap(age).each((age) => {
        cy.get('thead [placeholder="Age"]').clear().type(age);
        cy.wait(1000);
        cy.get("tbody tr").each((tableRow) => {
          if (age === 200) {
            cy.wrap(tableRow).should("contain", "No data found");
          } else {
            cy.wrap(tableRow).find("td:eq(6)").should("contain", age);
          }
        });
      });
    });
    describe('Dropdown Menu Test', () => {

      it('Dropdown Test' , () => {

        
      })
    })
  });
});
