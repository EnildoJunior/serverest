# language: pt
Funcionalidade: Testes E2E Frontend ServeRest
  Como um usuário da plataforma ServeRest
  Quero interagir com o frontend da aplicação
  Para gerenciar minha conta e consultar os produtos

  Contexto:
    Dado que a massa de dados de cada cenário é criada em tempo de execução
    E que nenhum cenário depende de usuário previamente cadastrado

  # ------------------------- Cenário 1: Autenticação -------------------------

  Cenário: Autenticar administrador com credenciais válidas
    Dado que existe um usuário administrador cadastrado
    E que o usuário está na página de login do ServeRest
    Quando preenche o email e a senha com as credenciais desse usuário
    E clica no botão "Entrar"
    Então a requisição de login deve retornar o status HTTP 200
    E o usuário deve ser redirecionado para "/admin/home"
    E a página deve exibir a saudação de boas-vindas com o nome do usuário

  Cenário: Não autenticar com senha incorreta
    Dado que existe um usuário cadastrado
    E que o usuário está na página de login do ServeRest
    Quando preenche o email correto e uma senha incorreta
    E clica no botão "Entrar"
    Então a requisição de login deve retornar o status HTTP 401
    E deve ser exibido o alerta "Email e/ou senha inválidos"
    E o usuário deve permanecer na página de login

  # ------------------------- Cenário 2: Cadastro -----------------------------

  Cenário: Cadastrar novo usuário e acessar a loja
    Dado que o usuário está na página de cadastro do ServeRest
    Quando preenche nome, email e senha com dados válidos e inéditos
    E clica no botão "Cadastrar"
    Então a requisição de cadastro deve retornar o status HTTP 201
    E o usuário deve ser autenticado automaticamente
    E deve ser redirecionado para a loja em "/home"

  Cenário: Não cadastrar usuário com email já utilizado
    Dado que existe um usuário cadastrado com determinado email
    E que o usuário está na página de cadastro do ServeRest
    Quando preenche o formulário reutilizando esse mesmo email
    E clica no botão "Cadastrar"
    Então a requisição de cadastro deve retornar o status HTTP 400
    E deve ser exibido o alerta "Este email já está sendo usado"
    E o usuário deve permanecer na página de cadastro

  # ------------------------- Cenário 3: Lista de produtos --------------------

  Cenário: Visualizar a lista de produtos como administrador
    Dado que existe um usuário administrador autenticado
    Quando acessa a listagem de produtos pelo menu
    Então a listagem deve ser carregada a partir da resposta da API
    E o título da página deve ser "Lista dos Produtos"
    E a tabela deve conter ao menos uma linha
    E cada produto listado deve exibir nome e preço preenchidos
