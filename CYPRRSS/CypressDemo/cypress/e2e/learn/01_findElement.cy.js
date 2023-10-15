it('findElemtn', () => {

  cy.visit('https://example.cypress.io/commands/querying');

  // 通过父元素查找子元素（query-from的子元素有name，password)
  let name_el = cy.get('.query-form').children('input:first')
  name_el.type('mona');

  // 查找同级元素（name的同级元素是password)
  let password_el = name_el.siblings('input');
  password_el.type('1234');

  // 查找指定元素的前一个元素（password的后一个元素是name)
  password_el.prev('input').clear();

  // 查找指定元素的后一个元素（name的后一个元素是password)
  name_el.next('input').clear();
});

it('get1', () => {
  cy.visit('https://example.cypress.io/commands/querying');

  // 通过CSS的id查找
  cy.get('#query-btn').should('contain', 'Button')
  // 通过CSS的class查找
  cy.get('.query-btn').should('contain', 'Button')
  // 通过CSS的 id class 元素 元素第几个 查找
  cy.get('#querying .well>button:first').should('contain', 'Button')

});

it('get2', () => {
  cy.visit('https://example.cypress.io/commands/querying');

  // 通过自定义id查找
  cy.get('[data-test-id="test-example"]').should('have.class', 'example')

  // invoke:对前一个命令返回的结果进行调用
  cy.get('[data-test-id="test-example"]')
    .invoke('attr', 'data-test-id')
    .should('equal', 'test-example')
});