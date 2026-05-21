# ServeRest - Automação de Testes

Projeto de automação de testes E2E (Frontend) e de API para a plataforma [ServeRest](https://serverest.dev), utilizando Cypress com Page Object Model e relatório Allure.

---

## Tecnologias

- [Node.js](https://nodejs.org/) v18+
- [Cypress](https://www.cypress.io/) v13
- [Allure Cypress](https://allurereport.org/docs/cypress/) — geração de relatórios
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) — necessário para o Allure CLI

---

## Pré-requisitos

Antes de instalar, certifique-se de ter:

| Ferramenta | Versão mínima | Verificar |
|---|---|---|
| Node.js | 18 | `node --version` |
| npm | 8 | `npm --version` |
| Java JDK | 8 | `java -version` |
| Allure CLI | 2.x | `allure --version` |

> **Instalar o Allure CLI:** `npm install -g allure-commandline`

---

## Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd desafio

# 2. Instale as dependências
npm install
```

---

## Configuração de credenciais

Crie o arquivo `cypress.env.json` na raiz do projeto (ele não é versionado):

```json
{
  "email": "fulano@qa.com",
  "password": "teste"
}
```

---

## Estrutura do projeto

```
desafio/
├── cenario/                        # Cenários BDD em Gherkin
│   ├── api.feature
│   └── frontend.feature
├── cypress/
│   ├── e2e/                        # Arquivos de teste
│   │   ├── api.cy.js
│   │   └── frontend.cy.js
│   ├── locators/                   # Seletores e endpoints
│   │   ├── ApiLocator.js
│   │   └── FrontendLocator.js
│   ├── pages/                      # Page Objects
│   │   ├── ApiPage.js
│   │   └── FrontendPage.js
│   └── support/
│       ├── commands.js             # Comandos customizados do Cypress
│       └── e2e.js                  # Configuração global de suporte
├── scripts/
│   └── cypress.js                  # Script de execução (fix VSCode + Electron)
├── cypress.config.js               # Configuração do Cypress
├── cypress.env.json                # Credenciais (não versionado)
└── package.json
```

---

## Executando os testes

### Modo interativo (interface gráfica)

```bash
npm run cy:open
```

### Modo headless (linha de comando)

```bash
npm run cy:run
```

### Executar e gerar relatório Allure

```bash
npm test
```

---

## Relatório Allure

```bash
# Gerar o relatório a partir dos resultados
npm run allure:generate

# Abrir o relatório no navegador
npm run allure:open
```

---

## Cenários cobertos

### API (`api.cy.js`)
| Cenário | Método | Endpoint |
|---|---|---|
| Login com credenciais válidas | POST | `/login` |
| Cadastrar novo usuário | POST | `/usuarios` |
| Cadastrar produto como administrador | POST | `/produtos` |

### Frontend (`frontend.cy.js`)
| Cenário | Descrição |
|---|---|
| Login com credenciais válidas | Autentica e valida a tela de boas-vindas |
| Cadastro de novo usuário | Preenche o formulário e valida o redirecionamento |
| Visualizar lista de produtos após login | Navega até a lista e valida título, linhas e valores da tabela |
