Feature: Testes E2E Frontend ServeRest
  Como um usuário da plataforma ServeRest
  Quero interagir com o frontend da aplicação
  Para realizar minhas compras e gerenciar minha conta

  Scenario: Login com credenciais válidas
    Given que o usuário está na página de login do ServeRest
    When o usuário preenche o email e a senha com credenciais válidas
    And clica no botão "Entrar"
    Then deve ser redirecionado para a página inicial logada

  Scenario: Cadastro de novo usuário
    Given que o usuário está na página de cadastro do ServeRest
    When o usuário preenche nome, email e senha com dados válidos
    And clica no botão "Cadastrar"
    Then o cadastro deve ser realizado com sucesso
    And o usuário deve ser redirecionado para a página de login

  Scenario: Visualizar lista de produtos após login
    Given que o usuário está autenticado na plataforma
    When acessa a página de listagem de produtos
    Then deve ser exibida a lista de produtos disponíveis
    And cada produto deve conter nome e preço visíveis
