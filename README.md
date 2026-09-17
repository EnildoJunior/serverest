# Automação de Testes — ServeRest

Suíte de testes automatizados end-to-end e de API para a plataforma [ServeRest](https://serverest.dev), escrita em Cypress com JavaScript.

| | |
|---|---|
| Frontend | https://front.serverest.dev |
| API | https://serverest.dev |
| Cobertura | 3 cenários E2E e 3 de API, em 8 testes |

---

## Pré-requisitos

| Ferramenta | Versão | Verificar |
|---|---|---|
| Node.js | 18 ou superior | `node --version` |
| npm | 8 ou superior | `npm --version` |

Não há outro pré-requisito. O relatório é gerado em Node puro, sem JDK.

---

## Instalação

```bash
git clone https://github.com/EnildoJunior/serverest.git
cd serverest
npm install
```

---

## Execução

```bash
npm test                  # executa a suíte e gera o relatório em HTML
npm run cy:open           # abre o Cypress em modo interativo
npm run cy:run            # executa em modo headless, sem relatório
npm run verificar:bdd     # confere a rastreabilidade entre BDD e testes
```

O relatório fica em `cypress/reports/index.html` — arquivo único, com as evidências embutidas, que abre direto no navegador.

---

## Sobre credenciais

**Esta suíte não utiliza credenciais.** Não há e-mail nem senha em variável de ambiente, em `cypress.env.json` ou em qualquer arquivo do projeto — e isso é uma decisão de projeto, não uma omissão.

Cada teste **fabrica o próprio usuário em tempo de execução**, através das factories em `cypress/support/factories/`. O e-mail é único por execução, combinando timestamp e um trecho de UUID, e a senha é gerada junto. São dados descartáveis, criados e usados dentro do mesmo teste, que não dão acesso a nada além de um cadastro efêmero numa base pública de demonstração.

Guardar um usuário fixo em variável de ambiente resolveria o problema errado. O ServeRest é uma base pública e compartilhada: qualquer pessoa altera os dados, e a base é reiniciada periodicamente. Um usuário fixo, protegido ou não, deixa a suíte dependente de um registro que pode desaparecer entre uma execução e outra. A geração dinâmica elimina essa dependência e, de quebra, remove a necessidade de proteger qualquer coisa.

O arquivo `cypress.env.json` segue declarado no `.gitignore`. Ele não existe no projeto hoje, mas continua sendo o lugar destinado a segredos caso a suíte passe a precisar de algum — um token de serviço, por exemplo. Nesse caso, o valor viria de `secrets` no CI, nunca do repositório.

---

## Estrutura

```
.
├── .github/workflows/
│   └── testes.yml                 # pipeline de integração contínua
├── cenario/                       # especificação dos cenários em Gherkin
│   ├── api.feature
│   └── frontend.feature
├── cypress/
│   ├── e2e/                       # testes automatizados
│   │   ├── api.cy.js
│   │   └── frontend.cy.js
│   ├── locators/                  # seletores e endpoints
│   ├── pages/                     # Page Objects: interação com a aplicação
│   └── support/
│       ├── commands.js            # comandos de pré-condição via API
│       ├── e2e.js                 # captura de evidência
│       └── factories/             # geração de massa de dados
└── scripts/
    ├── cypress.js                 # execução do Cypress
    └── verificar-rastreabilidade.js
```

---

## Cenários

### API

| Cenário | Método | Endpoint | Valida |
|---|---|---|---|
| Realizar login com credenciais válidas | POST | `/login` | 200, mensagem e token `Bearer` |
| Cadastrar um novo usuário | POST | `/usuarios` | 201, mensagem e `_id` |
| Cadastrar um produto como administrador | POST | `/produtos` | 201, mensagem e `_id` |

### Frontend

| Cenário | Tipo | Valida |
|---|---|---|
| Autenticar administrador com credenciais válidas | positivo | 200, redirecionamento para `/admin/home` e saudação |
| Não autenticar com senha incorreta | negativo | 401, alerta e permanência na tela de login |
| Cadastrar novo usuário e acessar a loja | positivo | 201, autenticação automática e redirecionamento para `/home` |
| Não cadastrar usuário com email já utilizado | negativo | 400, alerta e permanência na tela de cadastro |
| Visualizar a lista de produtos como administrador | positivo | título, existência de linhas e nome e preço preenchidos |

---

## Decisões técnicas

### Gherkin como especificação, sem Cucumber

Os arquivos em `cenario/` descrevem o comportamento esperado em linguagem de negócio. Optamos por **não** adotar o `cypress-cucumber-preprocessor`: ele acrescenta uma camada de indireção entre o cenário e o código, e o ganho não compensa numa suíte deste porte.

A amarração é feita pelo **nome**: cada `it` repete literalmente o texto do `Cenário:` correspondente. Para que isso não dependa de disciplina, `npm run verificar:bdd` compara as duas listas e falha quando existe cenário sem teste ou teste sem cenário. A verificação roda no CI antes da suíte.

### Massa de dados gerada em execução

As factories produzem dados únicos a cada chamada. Nenhum teste depende de registro pré-existente nem do resultado de outro teste, o que permite executá-los isoladamente, em qualquer ordem e em paralelo.

### Nenhuma espera por tempo fixo

A aplicação carrega os dados de forma assíncrona — a listagem da loja, por exemplo, exibe zero produtos no instante do login e o conteúdo completo somente após a resposta de `GET /produtos`. Toda espera é feita com `cy.intercept` e `cy.wait` sobre o alias da requisição. Não há `cy.wait` com valor numérico na suíte.

### Asserções que não dependem de dado compartilhado

A base do ServeRest é pública e mutável: qualquer pessoa cria produtos, inclusive a própria suíte de API deste projeto. Por isso a listagem é validada pela **estrutura** — existência de linhas, nome e preço preenchidos — e nunca pelo conteúdo de uma posição específica.

### Seletores por `data-testid`

A preferência é `data-testid`, depois `id`, e estrutura apenas quando não há alternativa. Os seletores foram conferidos contra a aplicação. Vale registrar duas particularidades dela: o campo de senha usa `data-testid="senha"` na tela de login e `"password"` na de cadastro, e o botão de cadastro de produto é `"cadastarProdutos"`, com o erro de digitação presente na própria aplicação.

### Separação de responsabilidades

As specs orquestram e afirmam; os Page Objects concentram a interação com a aplicação; os locators isolam os seletores; as factories cuidam da massa. Nenhum seletor aparece nas specs, e nenhuma regra de negócio aparece nos locators.

### Pré-condição montada via API

Quando o cadastro ou o login não são o objeto do teste, o usuário é criado e autenticado pela API, e a sessão é injetada no `localStorage` — onde a aplicação de fato a mantém. Isso deixa a execução mais rápida e evita que uma falha na tela de login derrube cenários que não têm relação com ela.

---

## Integração contínua

O workflow em `.github/workflows/testes.yml` roda a cada push e em todo pull request aberto para a `main`:

1. verifica a rastreabilidade entre os cenários em Gherkin e os testes;
2. executa a suíte completa;
3. publica o relatório e as evidências como artefatos, inclusive quando a execução falha.

Nenhum segredo é necessário para o pipeline, pela mesma razão descrita em *Sobre credenciais*.
