const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: false,

    // Relatório em Node puro: dispensa JDK e roda igual na máquina local e no CI.
    // As evidências capturadas ao fim de cada teste são embutidas no HTML.
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'index',
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      overwrite: true,
    },

    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
})
