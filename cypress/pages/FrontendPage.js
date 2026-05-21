const loc = require('../locators/FrontendLocator')

class FrontendPage {
  preencherLogin(email, senha) {
    cy.get(loc.login.email).type(email)
    cy.get(loc.login.senha).type(senha)
  }

  clicarEntrar() {
    cy.intercept('GET', 'https://serverest.dev/usuarios').as('usuarios')
    cy.get(loc.login.btnEntrar).click()
    cy.wait('@usuarios')
  }

  validarBemVindo() {
    cy.get(loc.home.tituloBemVindo).should('be.visible')
  }

  preencherCadastro(nome, email, password) {
    cy.get(loc.cadastro.nome).type(nome)
    cy.get(loc.cadastro.email).type(email)
    cy.get(loc.cadastro.password).type(password)
  }

  clicarCadastrar() {
    cy.intercept('GET', 'https://serverest.dev/produtos').as('paginaLogin')
    cy.get(loc.cadastro.btnCadastrar).click()
    cy.wait('@paginaLogin').its('response.statusCode').should('eq', 200)
  }

  verificarProdutosVisiveis() {
    cy.get(loc.home.tituloBemVindo).should('contain.text', 'Bem Vindo')
  }

  clicarListarProdutos() {
    cy.intercept('GET', 'https://serverest.dev/produtos').as('produtos')
    cy.get(loc.home.buttonListarProdutos).click()
    cy.wait('@produtos').its('response.statusCode').should('eq', 200)
  }

  validarValueGrid(linha, coluna, valor) {
    cy.get(`p[class="row"] table tbody tr:nth-child(${linha}) td:nth-child(${coluna})`).should('have.text', valor)
  }

  validarListaProdutos() {
    cy.get(loc.listaProdutos.titulo).should('contain.text', 'Lista dos Produtos')
    cy.get(loc.listaProdutos.linhas).should('have.length.greaterThan', 0)
    cy.get(loc.listaProdutos.colunaNome).each(($cel) => {
      cy.wrap($cel).should('not.be.empty')
    })
    cy.get(loc.listaProdutos.colunaPreco).each(($cel) => {
      cy.wrap($cel).should('not.be.empty')
    })
  }
}

module.exports = new FrontendPage()
