const loc = require('../locators/ApiLocator')

class ApiPage {
  /**
   * Autentica um usuário.
   * @param {string} email
   * @param {string} password
   * @returns {Cypress.Chainable<Cypress.Response>} POST /login
   */
  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${loc.baseUrl}${loc.endpoints.login}`,
      body: { email, password },
      failOnStatusCode: false,
    })
  }

  /**
   * Cadastra um usuário.
   * @param {{nome: string, email: string, password: string, administrador: string}} usuario
   * @returns {Cypress.Chainable<Cypress.Response>} POST /usuarios
   */
  criarUsuario(usuario) {
    return cy.request({
      method: 'POST',
      url: `${loc.baseUrl}${loc.endpoints.usuarios}`,
      body: usuario,
      failOnStatusCode: false,
    })
  }

  /**
   * Cadastra um produto.
   * @param {{nome: string, preco: number, descricao: string, quantidade: number}} produto
   * @param {string} [token] Authorization no formato "Bearer <jwt>"
   * @returns {Cypress.Chainable<Cypress.Response>} POST /produtos
   */
  criarProduto(produto, token) {
    return cy.request({
      method: 'POST',
      url: `${loc.baseUrl}${loc.endpoints.produtos}`,
      headers: token ? { Authorization: token } : {},
      body: produto,
      failOnStatusCode: false,
    })
  }

  /**
   * Cadastra um usuário e devolve o token de autenticação dele.
   * @param {{nome: string, email: string, password: string, administrador: string}} usuario
   * @returns {Cypress.Chainable<string>} Authorization no formato "Bearer <jwt>"
   */
  criarUsuarioAutenticado(usuario) {
    return this.criarUsuario(usuario)
      .then((cadastro) => {
        expect(cadastro.status, 'usuario cadastrado').to.eq(201)
        return this.login(usuario.email, usuario.password)
      })
      .then((autenticacao) => {
        expect(autenticacao.status, 'usuario autenticado').to.eq(200)
        return autenticacao.body.authorization
      })
  }
}

module.exports = new ApiPage()
