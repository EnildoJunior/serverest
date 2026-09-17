const loc = require('../locators/FrontendLocator')

class FrontendPage {
  /** Abre a página de login. */
  acessarLogin() {
    cy.visit(loc.urls.login)
  }

  /** Abre a página de cadastro de usuário. */
  acessarCadastro() {
    cy.visit(loc.urls.cadastro)
  }

  /** Abre a home do administrador. */
  acessarHomeAdmin() {
    cy.visit(loc.urls.homeAdmin)
  }

  /**
   * Preenche e submete o formulário de login.
   * @param {string} email
   * @param {string} senha
   * @returns {Cypress.Chainable} interceptação de POST /login
   */
  autenticar(email, senha) {
    cy.intercept('POST', '**/login').as('login')
    cy.get(loc.login.email).clear().type(email)
    cy.get(loc.login.senha).clear().type(senha, { log: false })
    cy.get(loc.login.btnEntrar).click()
    return cy.wait('@login')
  }

  /**
   * Preenche e submete o formulário de cadastro.
   * @param {string} nome
   * @param {string} email
   * @param {string} senha
   * @returns {Cypress.Chainable} interceptação de POST /usuarios
   */
  cadastrar(nome, email, senha) {
    cy.intercept('POST', '**/usuarios').as('cadastro')
    cy.get(loc.cadastro.nome).clear().type(nome)
    cy.get(loc.cadastro.email).clear().type(email)
    cy.get(loc.cadastro.password).clear().type(senha, { log: false })
    cy.get(loc.cadastro.btnCadastrar).click()
    return cy.wait('@cadastro')
  }

  /** Abre a listagem de produtos pelo menu e aguarda o carregamento dos dados. */
  irParaListarProdutos() {
    cy.intercept('GET', '**/produtos').as('produtos')
    cy.get(loc.homeAdmin.linkListarProdutos).click()
    cy.wait('@produtos').its('response.statusCode').should('eq', 200)
  }

  /**
   * Valida a home do administrador.
   * @param {string} nome nome cadastrado do usuário autenticado
   */
  validarHomeAdmin(nome) {
    cy.url().should('include', loc.urls.homeAdmin)
    cy.get(loc.homeAdmin.titulo).should('contain.text', 'Bem Vindo').and('contain.text', nome)
  }

  /** Valida a home do cliente. */
  validarHomeCliente() {
    cy.url().should('include', loc.urls.homeCliente)
    cy.get(loc.homeCliente.titulo).should('contain.text', 'Serverest Store')
  }

  /** Valida que a página exibida é a de login. */
  validarPaginaLogin() {
    cy.url().should('include', loc.urls.login)
  }

  /** Valida que a página exibida é a de cadastro. */
  validarPaginaCadastro() {
    cy.url().should('include', loc.urls.cadastro)
  }

  /**
   * Valida o alerta exibido pela aplicação.
   * @param {string} mensagem trecho esperado no alerta
   */
  validarAlerta(mensagem) {
    cy.get(loc.alerta).should('be.visible').and('contain.text', mensagem)
  }

  /** Valida que toda linha da listagem exibe nome e preço preenchidos. */
  validarListaProdutosPreenchida() {
    cy.get(loc.listaProdutos.titulo).should('contain.text', 'Lista dos Produtos')
    cy.get(loc.listaProdutos.linhas).should('have.length.greaterThan', 0)
    cy.get(loc.listaProdutos.colunaNome).each((celula) => {
      cy.wrap(celula).invoke('text').should('not.be.empty')
    })
    cy.get(loc.listaProdutos.colunaPreco).each((celula) => {
      cy.wrap(celula).invoke('text').should('not.be.empty')
    })
  }

  /**
   * Valida que um produto aparece na listagem, sem depender de posição.
   * @param {string} nomeProduto
   */
  validarProdutoNaLista(nomeProduto) {
    cy.get(loc.listaProdutos.tabela).should('contain.text', nomeProduto)
  }
}

module.exports = new FrontendPage()
