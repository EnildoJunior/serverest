/**
 * Seletores do frontend ServeRest.
 * Ordem de preferência: data-testid, id, estrutura.
 */
const FrontendLocator = {
  urls: {
    login: '/login',
    cadastro: '/cadastrarusuarios',
    homeAdmin: '/admin/home',
    homeCliente: '/home',
    listarProdutos: '/admin/listarprodutos',
    cadastrarProduto: '/admin/cadastrarprodutos',
  },

  login: {
    email: '[data-testid="email"]',
    senha: '[data-testid="senha"]',
    btnEntrar: '[data-testid="entrar"]',
    linkCadastrar: '[data-testid="cadastrar"]',
  },

  cadastro: {
    nome: '[data-testid="nome"]',
    email: '[data-testid="email"]',
    password: '[data-testid="password"]',
    checkboxAdministrador: '[data-testid="checkbox"]',
    btnCadastrar: '[data-testid="cadastrar"]',
  },

  homeAdmin: {
    titulo: '.jumbotron h1',
    linkListarProdutos: '[data-testid="listarProdutos"]',
    linkCadastrarProdutos: '[data-testid="cadastrarProdutos"]',
    linkListarUsuarios: '[data-testid="listarUsuarios"]',
    btnLogout: '[data-testid="logout"]',
  },

  homeCliente: {
    titulo: 'h1',
    listaProdutos: '[data-testid="listaProdutos"]',
    card: '.card',
    inputPesquisar: '[data-testid="pesquisar"]',
    btnPesquisar: '[data-testid="botaoPesquisar"]',
    linkDetalhe: '[data-testid="product-detail-link"]',
    btnAdicionarNaLista: '[data-testid="adicionarNaLista"]',
    btnCarrinho: '[data-testid="shopping-cart-button"]',
  },

  listaProdutos: {
    titulo: '.jumbotron h1',
    tabela: 'table',
    linhas: 'table tbody tr',
    colunaNome: 'table tbody tr td:nth-child(1)',
    colunaPreco: 'table tbody tr td:nth-child(2)',
  },

  cadastroProduto: {
    nome: '[data-testid="nome"]',
    preco: '[data-testid="preco"]',
    descricao: '[data-testid="descricao"]',
    quantidade: '[data-testid="quantity"]',
    imagem: '[data-testid="imagem"]',
    btnCadastrar: '[data-testid="cadastarProdutos"]',
  },

  alerta: '.alert',
}

module.exports = FrontendLocator
