it('noScroll', () => {

  cy.visit('https://example.cypress.io/commands/querying');

  // 通过父元素查找子元素（query-from的子元素有name，password)
  let name_el = cy.get('.query-form').children('input:first')
  name_el.type('mona');
});

it('haveScroll', () => {

  cy.visit('https://example.cypress.io/commands/querying');

  // 通过父元素查找子元素（query-from的子元素有name，password)
  let name_el = cy.get('.query-form').children('input:first')
  name_el.scrollIntoView().type('mona');
});