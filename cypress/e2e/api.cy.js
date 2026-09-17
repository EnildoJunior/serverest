const ApiPage = require('../pages/ApiPage')
const usuario = require('../support/factories/usuario')
const produto = require('../support/factories/produto')

describe('API ServeRest', () => {
  it('Realizar login com credenciais válidas', () => {
    const cliente = usuario.valido()

    ApiPage.criarUsuario(cliente)
    ApiPage.login(cliente.email, cliente.password).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body.message).to.eq('Login realizado com sucesso')
      expect(resposta.body.authorization).to.include('Bearer')
    })
  })

  it('Cadastrar um novo usuário', () => {
    const novo = usuario.valido()

    ApiPage.criarUsuario(novo).then((resposta) => {
      expect(resposta.status).to.eq(201)
      expect(resposta.body.message).to.eq('Cadastro realizado com sucesso')
      expect(resposta.body).to.have.property('_id')
    })
  })

  it('Cadastrar um produto como administrador', () => {
    const admin = usuario.admin()
    const novoProduto = produto.valido()

    ApiPage.criarUsuarioAutenticado(admin).then((token) => {
      ApiPage.criarProduto(novoProduto, token).then((resposta) => {
        expect(resposta.status).to.eq(201)
        expect(resposta.body.message).to.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.have.property('_id')
      })
    })
  })
})
