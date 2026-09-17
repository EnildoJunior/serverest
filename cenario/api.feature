# language: pt
Funcionalidade: Testes de API ServeRest
  Como um consumidor da API ServeRest
  Quero interagir com os endpoints disponíveis
  Para gerenciar usuários e produtos da plataforma

  Contexto:
    Dado que a massa de dados de cada cenário é criada em tempo de execução
    E que nenhum cenário depende de registro previamente cadastrado

  Cenário: Realizar login com credenciais válidas
    Dado que existe um usuário cadastrado com email e senha válidos
    Quando é enviada uma requisição POST para "/login" com essas credenciais
    Então a resposta deve retornar o status HTTP 200
    E a mensagem deve ser "Login realizado com sucesso"
    E o corpo da resposta deve conter um token de autorização "Bearer"

  Cenário: Cadastrar um novo usuário
    Dado que o endpoint de usuários está disponível
    Quando é enviada uma requisição POST para "/usuarios" com nome, email, senha e flag administrador válidos
    Então a resposta deve retornar o status HTTP 201
    E a mensagem deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve conter o id do usuário criado

  Cenário: Cadastrar um produto como administrador
    Dado que existe um usuário administrador autenticado com token válido
    Quando é enviada uma requisição POST para "/produtos" com nome, preço, descrição e quantidade válidos
    Então a resposta deve retornar o status HTTP 201
    E a mensagem deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve conter o id do produto criado
