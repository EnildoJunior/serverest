const ApiPage = require('../pages/ApiPage')
const FrontendPage = require('../pages/FrontendPage')

/**
 * Cadastra um usuário pela API e devolve os dados utilizados.
 * @param {{nome: string, email: string, password: string, administrador: string}} dados
 * @returns {Cypress.Chainable<object>} dados do usuário acrescidos do _id
 */
Cypress.Commands.add('criarUsuarioViaApi', (dados) => {
  return ApiPage.criarUsuario(dados).then((resposta) => {
    expect(resposta.status, 'pre-condicao: usuario criado').to.eq(201)
    return cy.wrap({ ...dados, _id: resposta.body._id }, { log: false })
  })
})

/**
 * Autentica pela API e injeta a sessão no localStorage da aplicação.
 * Exige que a aplicação já tenha sido carregada, pois o localStorage
 * pertence à origem do site.
 * @param {{nome: string, email: string, password: string}} dados
 * @returns {Cypress.Chainable<string>} Authorization no formato "Bearer <jwt>"
 */
Cypress.Commands.add('autenticarViaApi', (dados) => {
  return ApiPage.login(dados.email, dados.password).then((resposta) => {
    expect(resposta.status, 'pre-condicao: usuario autenticado').to.eq(200)
    return cy.window().then((janela) => {
      janela.localStorage.setItem('serverest/userToken', resposta.body.authorization)
      janela.localStorage.setItem('serverest/userNome', dados.nome)
      janela.localStorage.setItem('serverest/userEmail', dados.email)
      return resposta.body.authorization
    })
  })
})

/**
 * Cadastra um administrador, autentica pela API e abre a home administrativa.
 * Atalho de pré-condição para cenários em que o login não é o objeto do teste.
 * @param {{nome: string, email: string, password: string, administrador: string}} dados
 */
Cypress.Commands.add('entrarComoAdmin', (dados) => {
  cy.criarUsuarioViaApi(dados)
  FrontendPage.acessarLogin()
  cy.autenticarViaApi(dados)
  FrontendPage.acessarHomeAdmin()
})
