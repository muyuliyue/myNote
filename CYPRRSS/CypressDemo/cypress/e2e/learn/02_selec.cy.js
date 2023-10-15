it('test', () => {
  cy.visit('https://example.cypress.io/commands/actions');

  cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
    .check().should('be.checked')
});

it('test1', () => {
  cy.visit('https://example.cypress.io/commands/actions');

  cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
    .check().should('be.checked')

  // cy.get('.action-radios [type="radio"]').not('[disabled]')
  //   .check().should('be.checked')

  // // .check() accepts a value argument
  // cy.get('.action-radios [type="radio"]')
  //   .check('radio1').should('be.checked')

  // // .check() accepts an array of values
  // cy.get('.action-multiple-checkboxes [type="checkbox"]')
  //   .check(['checkbox1', 'checkbox2']).should('be.checked')

  // // Ignore error checking prior to checking
  // cy.get('.action-checkboxes [disabled]')
  //   .check({ force: true }).should('be.checked')

  // cy.get('.action-radios [type="radio"]')
  //   .check('radio3', { force: true }).should('be.checked')
});