// VSCode injects ELECTRON_RUN_AS_NODE=1 into integrated terminal because VSCode itself is Electron.
// This causes Cypress.exe (also Electron) to start in Node.js mode instead of Electron mode,
// resulting in ACCESS_VIOLATION crash. Remove it before spawning Cypress.
delete process.env.ELECTRON_RUN_AS_NODE

const { spawn } = require('child_process')
const args = process.argv.slice(2)

const child = spawn('npx', ['cypress', ...args], {
  shell: true,
  stdio: 'inherit',
  env: process.env,
})

child.on('exit', (code) => process.exit(code ?? 1))
