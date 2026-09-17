import './commands'
import 'cypress-mochawesome-reporter/register'

// Captura o estado final de cada teste de interface como evidência no relatório.
// Specs de API não entram: a evidência ali é o par requisição/resposta.
afterEach(() => {
  if (Cypress.spec.name.includes('api')) return

  const nome = Cypress.currentTest.titlePath.join(' - ').replace(/[\\/:*?"<>|]/g, '')
  cy.screenshot(`evidencia/${nome}`, { capture: 'viewport', overwrite: true })
})
