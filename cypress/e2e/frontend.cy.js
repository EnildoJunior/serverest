const FrontendPage = require('../pages/FrontendPage')

const ts = Date.now()

describe('Testes E2E Frontend ServeRest', () => {
  it('Login com credenciais válidas', () => {
    cy.acessarLogin()
    FrontendPage.preencherLogin(Cypress.env('email'), Cypress.env('password'))
    FrontendPage.clicarEntrar()
    cy.url().should('include', '/home')
    FrontendPage.validarBemVindo()
  })

  it('Cadastro de novo usuário', () => {
    const novoEmail = `novo${ts}@qa.com`
    cy.acessarCadastro()
    FrontendPage.preencherCadastro(`Novo ${ts}`, novoEmail, Cypress.env('password'))
    FrontendPage.clicarCadastrar()
    FrontendPage.validarBemVindo()
  })

  it('Visualizar lista de produtos após login', () => {
    cy.acessarLogin()
    FrontendPage.preencherLogin(Cypress.env('email'), Cypress.env('password'))
    FrontendPage.clicarEntrar()
    FrontendPage.verificarProdutosVisiveis()
    FrontendPage.clicarListarProdutos()
    FrontendPage.validarListaProdutos()
  })
})
