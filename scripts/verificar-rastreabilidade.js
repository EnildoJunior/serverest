/**
 * Verifica a rastreabilidade entre os cenários em Gherkin e os testes automatizados.
 *
 * A suíte não usa Cucumber: os arquivos .feature são a especificação legível, e a
 * amarração com o código é feita pelo nome do teste, que deve ser idêntico ao nome
 * do cenário. Este script torna essa convenção verificável — sem ele, a divergência
 * só apareceria na leitura manual.
 *
 * Falha quando existe cenário sem teste ou teste sem cenário.
 */
const fs = require('fs')
const path = require('path')

const RAIZ = path.join(__dirname, '..')
const PASTA_CENARIOS = path.join(RAIZ, 'cenario')
const PASTA_TESTES = path.join(RAIZ, 'cypress', 'e2e')

const listarArquivos = (pasta, extensao) =>
  fs.readdirSync(pasta).filter((arquivo) => arquivo.endsWith(extensao)).map((arquivo) => path.join(pasta, arquivo))

const extrair = (arquivos, expressao) =>
  arquivos.flatMap((arquivo) => {
    const conteudo = fs.readFileSync(arquivo, 'utf8')
    return [...conteudo.matchAll(expressao)].map((ocorrencia) => ocorrencia[1].trim())
  })

const cenarios = extrair(listarArquivos(PASTA_CENARIOS, '.feature'), /^\s*(?:Cenário|Cenario|Scenario):(.+)$/gm)
const testes = extrair(listarArquivos(PASTA_TESTES, '.cy.js'), /\bit\(\s*['"`](.+?)['"`]\s*,/g)

const semTeste = cenarios.filter((cenario) => !testes.includes(cenario))
const semCenario = testes.filter((teste) => !cenarios.includes(teste))

console.log(`Cenários especificados: ${cenarios.length}`)
console.log(`Testes automatizados:   ${testes.length}\n`)

if (semTeste.length === 0 && semCenario.length === 0) {
  console.log('Rastreabilidade OK: todo cenário tem teste correspondente e vice-versa.')
  process.exit(0)
}

if (semTeste.length > 0) {
  console.error('Cenários especificados sem teste automatizado:')
  semTeste.forEach((cenario) => console.error(`  - ${cenario}`))
}

if (semCenario.length > 0) {
  console.error('Testes automatizados sem cenário especificado:')
  semCenario.forEach((teste) => console.error(`  - ${teste}`))
}

process.exit(1)
