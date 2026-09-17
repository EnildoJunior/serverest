const FrontendPage = require('../pages/FrontendPage')
const usuario = require('../support/factories/usuario')

describe('E2E Frontend ServeRest', () => {
  describe('Autenticação', () => {
    it('Autenticar administrador com credenciais válidas', () => {
      const admin = usuario.admin()

      cy.criarUsuarioViaApi(admin)
      FrontendPage.acessarLogin()
      FrontendPage.autenticar(admin.email, admin.password)
        .its('response.statusCode')
        .should('eq', 200)

      FrontendPage.validarHomeAdmin(admin.nome)
    })

    it('Não autenticar com senha incorreta', () => {
      const cliente = usuario.valido()

      cy.criarUsuarioViaApi(cliente)
      FrontendPage.acessarLogin()
      FrontendPage.autenticar(cliente.email, 'senha-incorreta')
        .its('response.statusCode')
        .should('eq', 401)

      FrontendPage.validarAlerta('Email e/ou senha inválidos')
      FrontendPage.validarPaginaLogin()
    })
  })

  describe('Cadastro de usuário', () => {
    it('Cadastrar novo usuário e acessar a loja', () => {
      const novo = usuario.valido()

      FrontendPage.acessarCadastro()
      FrontendPage.cadastrar(novo.nome, novo.email, novo.password)
        .its('response.statusCode')
        .should('eq', 201)

      FrontendPage.validarHomeCliente()
    })

    it('Não cadastrar usuário com email já utilizado', () => {
      const existente = usuario.valido()

      cy.criarUsuarioViaApi(existente)
      FrontendPage.acessarCadastro()
      FrontendPage.cadastrar(existente.nome, existente.email, existente.password)
        .its('response.statusCode')
        .should('eq', 400)

      FrontendPage.validarAlerta('Este email já está sendo usado')
      FrontendPage.validarPaginaCadastro()
    })
  })

  describe('Listagem de produtos', () => {
    it('Visualizar a lista de produtos como administrador', () => {
      cy.entrarComoAdmin(usuario.admin())

      FrontendPage.irParaListarProdutos()
      FrontendPage.validarListaProdutosPreenchida()
    })
  })
})
