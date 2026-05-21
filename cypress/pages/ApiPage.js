const loc = require('../locators/ApiLocator')

class ApiPage {
  // Realiza login na API e retorna a resposta com o token de autorização
  // @param {string} email - E-mail do usuário
  // @param {string} password - Senha do usuário
  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${loc.baseUrl}${loc.endpoints.login}`,
      body: { email, password },
      failOnStatusCode: false,
    })
  }

  // Cria um novo usuário na API
  // @param {string} nome - Nome completo do usuário
  // @param {string} email - E-mail do usuário
  // @param {string} password - Senha do usuário
  // @param {string} administrador - Define se é admin ('true' ou 'false', padrão 'false')
  criarUsuario(nome, email, password, administrador = 'false') {
    return cy.request({
      method: 'POST',
      url: `${loc.baseUrl}${loc.endpoints.usuarios}`,
      body: { nome, email, password, administrador },
      failOnStatusCode: false,
    })
  }

  // Cria um novo produto na API (requer token de administrador)
  // @param {string} nome - Nome do produto
  // @param {number} preco - Preço do produto
  // @param {string} descricao - Descrição do produto
  // @param {number} quantidade - Quantidade em estoque
  // @param {string} token - Token de autorização Bearer do administrador
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
