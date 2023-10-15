/// <reference types="cypress" />

context('Local Storage / Session Storage', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/storage')
  })
  // Although localStorage is automatically cleared
  // in between tests to maintain a clean state
  // sometimes we need to clear localStorage manually

  it('cy.clearLocalStorage() - clear all data in localStorage for the current origin', () => {
    // https://on.cypress.io/clearlocalstorage
    cy.get('.ls-btn').click().should(() => {
      expect(localStorage.getItem('prop1111')).to.eq('red')
      expect(localStorage.getItem('prop2')).to.eq('blue')
      expect(localStorage.getItem('prop3')).to.eq('magenta')
    })
  })

})
