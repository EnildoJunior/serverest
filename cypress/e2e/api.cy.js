const ApiPage = require('../pages/ApiPage')

const ts = Date.now()

describe('Testes de API ServeRest', () => {
  it('Realizar login com credenciais válidas', () => {
    const email = `apLogin${ts}@qa.com`
    const password = 'teste123'

    ApiPage.criarUsuario(`Login User ${ts}`, email, password).then(() => {
      ApiPage.login(email, password).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('authorization')
        expect(response.body.authorization).to.include('Bearer')
        expect(response.body.message).to.eq('Login realizado com sucesso')
      })
    })
  })

  it('Cadastrar um novo usuário', () => {
    const email = `apUser${ts}@qa.com`

    ApiPage.criarUsuario(`Novo User ${ts}`, email, 'teste123').then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('_id')
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
    })
  })

  it('Cadastrar um produto como administrador', () => {
    const adminEmail = `apAdmin${ts}@qa.com`
    const password = 'teste123'

    ApiPage.criarUsuario(`API Admin ${ts}`, adminEmail, password, 'true').then(() => {
      ApiPage.login(adminEmail, password).then((loginRes) => {
        const token = loginRes.body.authorization

        ApiPage.criarProduto(`Produto API ${ts}`, 999, 'Produto cadastrado via API', 5, token).then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body).to.have.property('_id')
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        })
      })
    })
  })
})
