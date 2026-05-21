const loc = require('../locators/ApiLocator')

class ApiPage {
  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${loc.baseUrl}${loc.endpoints.login}`,
      body: { email, password },
      failOnStatusCode: false,
    })
  }

  criarUsuario(nome, email, password, administrador = 'false') {
    return cy.request({
      method: 'POST',
      url: `${loc.baseUrl}${loc.endpoints.usuarios}`,
      body: { nome, email, password, administrador },
      failOnStatusCode: false,
    })
  }

  criarProduto(nome, preco, descricao, quantidade, token) {
    return cy.request({
      method: 'POST',
      url: `${loc.baseUrl}${loc.endpoints.produtos}`,
      headers: { Authorization: token },
      body: { nome, preco, descricao, quantidade },
      failOnStatusCode: false,
    })
  }
}

module.exports = new ApiPage()
