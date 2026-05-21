Feature: Testes de API ServeRest
  Como um consumidor da API ServeRest
  Quero interagir com os endpoints disponíveis
  Para gerenciar usuários e produtos da plataforma

  Scenario: Realizar login com credenciais válidas
    Given que existe um usuário cadastrado na API com email e senha válidos
    When é enviada uma requisição POST para "/login" com as credenciais corretas
    Then a resposta deve retornar o status HTTP 200
    And o corpo da resposta deve conter um token de autorização válido

  Scenario: Cadastrar um novo usuário
    Given que o endpoint de usuários está disponível
    When é enviada uma requisição POST para "/usuarios" com nome, email, senha e flag administrador válidos
    Then a resposta deve retornar o status HTTP 201
    And o corpo da resposta deve conter o id do usuário criado

  Scenario: Cadastrar um produto como administrador
    Given que o usuário está autenticado como administrador com token válido
    When é enviada uma requisição POST para "/produtos" com nome, preço, descrição e quantidade válidos
    Then a resposta deve retornar o status HTTP 201
    And o corpo da resposta deve conter o id do produto criado
