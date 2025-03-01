/// <reference types="cypress" />

describe('My First Test', () => {

    beforeEach(() => {
        cy.openLocalHost()
    })
    it('ToolTips', () => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })
    it('PopUps - Dialog box', () => {
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    })
    it('Finding Element In Dropdown', () => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.contains('[type="button"]', 'top-right').click()
        cy.get('nb-option').each((el, index) => {
            const itemText = el.text().trim()

            if (itemText.includes('top-left')) {
                cy.wrap(el).click()
                cy.get('[class="select-button"]').eq(1).should('have.text', 'top-left')
            }
        })
    })

    it('Template Popovers', () => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Popover').click()

        cy.contains('nb-card', 'Template Popovers').then(templatePopover => {
            cy.wrap(templatePopover).find('[status="warning"]').eq(0).click()
        })
        cy.contains('Second Tab').click()
        cy.get('[class="p-4 ng-star-inserted"]').should('contain', ' Indeed! ')
    })

    it('Save subject of the command', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1 Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')                          //Can be used anywhere in the code
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        //2 Cypress Then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {               //usingTheGridForm is the subject of the command, it can only be used inside the block of code

            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })

        //3 
        cy.contains('nb-card', 'Basic form').then(basicForm => {
            const emailLabelFirst = basicForm.find('[for="exampleInputEmail1"]').text()
            const passwordLabelFirst = basicForm.find('[for="exampleInputPassword1"]').text()

            cy.wrap(emailLabelFirst).should('equal', 'Email address')
            cy.wrap(passwordLabelFirst).should('equal', 'Password')
        });
    });

    it.only('extract text values', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {        //label is now a jquery object
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {  //text is a string
            cy.wrap(text).should('contain', 'Email address')
        })

        //4
        cy.get('[for="exampleInputEmail1"]').invoke('attr','class').then(classValue => {  //classValue is a string
                cy.wrap(classValue).should('contain', 'label')
        })

    })
    it('List and Dropdowns', () => {
        cy.visit('/')

        cy.get('nav').find('nb-select').click()
        cy.get('nb-option').each((el, i) => {
            if (i === 1) {
                cy.wrap(el).click()
                cy.wrap(el).invoke('text').should('contain', 'Dark')
            }
        })
    })
    it('List and Dropdowns', () => {
        cy.visit('/')

        //1. 
        cy.get('nav nb-select').click()          //nb-select is a child of nav element
        cy.get('.options-list').contains('Light').click()
        cy.get('nav nb-select').should('contain', 'Light')

        //2.
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const listText = listItem.text().trim()                  //trim() removes the white spaces
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', listText)
                if(index < 3){
                    cy.wrap(dropDown).click()
                }
            })

        })
    });
    it('Date Picker',() => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
    })
})
