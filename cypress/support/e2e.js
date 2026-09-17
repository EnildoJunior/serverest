import './commands'
import 'allure-cypress'

// Captura o estado final de cada teste de interface como evidência no relatório.
// Specs de API não entram: a evidência ali é o par requisição/resposta.
afterEach(function () {
  if (Cypress.spec.name.includes('api')) return

  const nome = Cypress.currentTest.titlePath.join(' - ').replace(/[\\/:*?"<>|]/g, '')
  cy.screenshot(`evidencia/${nome}`, { capture: 'viewport', overwrite: true })
})
