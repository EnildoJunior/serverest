const loc = require('../locators/FrontendLocator')

class FrontendPage {
  // Preenche os campos de email e senha na tela de login
  // @param {string} email - E-mail do usuário
  // @param {string} senha - Senha do usuário
  preencherLogin(email, senha) {
    cy.get(loc.login.email).type(email)
    cy.get(loc.login.senha).type(senha)
  }

  // Clica no botão Entrar e aguarda o retorno da lista de usuários (GET /usuarios 200)
  clicarEntrar() {
    cy.intercept('GET', 'https://serverest.dev/usuarios').as('usuarios')
    cy.get(loc.login.btnEntrar).click()
    cy.wait('@usuarios')
  }

  // Valida que o título de boas-vindas está visível na home
  validarBemVindo() {
    cy.get(loc.home.tituloBemVindo).should('be.visible')
  }

  // Preenche os campos do formulário de cadastro de usuário
  // @param {string} nome - Nome completo do usuário
  // @param {string} email - E-mail do usuário
  // @param {string} password - Senha do usuário
  preencherCadastro(nome, email, password) {
    cy.get(loc.cadastro.nome).type(nome)
    cy.get(loc.cadastro.email).type(email)
    cy.get(loc.cadastro.password).type(password)
  }

  // Clica no botão Cadastrar e aguarda o retorno da lista de produtos (GET /produtos 200)
  clicarCadastrar() {
    cy.intercept('GET', 'https://serverest.dev/produtos').as('paginaLogin')
    cy.get(loc.cadastro.btnCadastrar).click()
    cy.wait('@paginaLogin').its('response.statusCode').should('eq', 200)
  }

  // Valida que o texto "Bem Vindo" está presente no título da home
  verificarProdutosVisiveis() {
    cy.get(loc.home.tituloBemVindo).should('contain.text', 'Bem Vindo')
  }

  // Clica no botão Listar Produtos e aguarda o retorno da API (GET /produtos 200)
  clicarListarProdutos() {
    cy.intercept('GET', 'https://serverest.dev/produtos').as('produtos')
    cy.get(loc.home.buttonListarProdutos).click()
    cy.wait('@produtos').its('response.statusCode').should('eq', 200)
  }

  // Valida o valor de uma célula específica da tabela de produtos
  // @param {number} linha - Índice da linha (nth-child, começa em 1)
  // @param {number} coluna - Índice da coluna (nth-child, começa em 1)
  // @param {string} valor - Texto esperado na célula
  validarValueGrid(linha, coluna, valor) {
    cy.get(`p[class="row"] table tbody tr:nth-child(${linha}) td:nth-child(${coluna})`).should('have.text', valor)
  }

  // Valida o título da página, a existência de linhas e que nome e preço estão preenchidos
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
