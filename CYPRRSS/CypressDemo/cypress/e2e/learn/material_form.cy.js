describe('', () => {
  beforeEach(() => {

    cy.visit('https://material.angular.io/components/autocomplete/examples')

  })

  it('1-1', () => {
    cy.get('#mat-input-0').scrollIntoView().click()
      .get('mat-option').contains('One').click();

    cy.get('#mat-input-0').should('have.text', 'One');

  });

});