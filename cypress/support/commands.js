Cypress.Commands.add('acessarLogin', () => {
  cy.visit('/login')
})

Cypress.Commands.add('acessarCadastro', () => {
  cy.visit('/cadastrarusuarios')
})
