import { equal } from "assert";
import { waitForDebugger } from "inspector";

describe('', () => {

  // beforeEach(() => {
  //   cy.session('login', () => {
  //     cy.visit('https://github.com/login')
  //     cy.get('#login_field').type('muyuliyue@gmail.com');
  //     cy.get('#password').type('Wanjj1310073');
  //     cy.get('input[name="commit"]').click();
  //     cy.wait(3000);
  //   }, {
  //     validate() {
  //       cy.document().its('cookie').should('contain', 'name').then((token) => {
  //         cy.request({
  //           url: 'https://github.com',
  //           headers: {
  //             token
  //           }
  //         })
  //       })
  //     }
  //   })
  // })

  beforeEach(() => {
    cy.session('login', () => {

      cy.visit('https://github.com/login')

      cy.origin('https://github.com', () => {
        cy.get('#login_field').type('muyuliyue@gmail.com');
        cy.get('#password').type('Wanjj1310073');
        cy.get('input[name="commit"]').click();
      })

      cy.visit('https://github.com')
    })
  })


  it('test1', () => {
    // cy.visit('https://github.com/login')
    cy.get('#global-create-menu-button').click();

  });

  it('test2', () => {
    // cy.visit('https://github.com/login')
    cy.get('#global-create-menu-button').click();

  });
})

