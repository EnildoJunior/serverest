const FrontendLocator = {
  login: {
    email: "input[id='email']",
    senha: "input[id='password']",
    btnEntrar: "button[data-testid='entrar']",
  },
  cadastro: {
    nome: '[data-testid="nome"]',
    email: '[data-testid="email"]',
    password: '[data-testid="password"]',
    btnCadastrar: '[data-testid="cadastrar"]',
  },
  home: {
    tituloBemVindo: "div[class='jumbotron'] h1",
    buttonListarProdutos: "a[data-testid='listarProdutos']",
  },
  listaProdutos: {
    titulo: "div[class='jumbotron'] h1",
    linhas: 'table tbody tr',
    colunaNome: 'table tbody tr td:nth-child(1)',
    colunaPreco: 'table tbody tr td:nth-child(2)',
  },
}

module.exports = FrontendLocator
