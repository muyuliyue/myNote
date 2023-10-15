describe("demo", () => {
  it('', () => {
    cy.visit('https://github.com')
    cy.get('.mr-lg-3 > .HeaderMenu-link').click();
    cy.url().should('include', 'login')
    cy.title().should('include', 'GitHub')

  });
})