const sufixoUnico = () => `${Date.now()}${crypto.randomUUID().slice(0, 8)}`

const usuario = {
  /**
   * Gera um usuário válido e inédito.
   * @param {object} [overrides] campos a sobrescrever
   * @returns {{nome: string, email: string, password: string, administrador: string}}
   */
  valido(overrides = {}) {
    const unico = sufixoUnico()
    return {
      nome: `Usuario QA ${unico}`,
      email: `qa.${unico}@teste.com`,
      password: `Senha${unico.slice(-6)}`,
      administrador: 'false',
      ...overrides,
    }
  },

  /**
   * Gera um usuário administrador.
   * @param {object} [overrides] campos a sobrescrever
   * @returns {{nome: string, email: string, password: string, administrador: string}}
   */
  admin(overrides = {}) {
    return usuario.valido({ administrador: 'true', ...overrides })
  },

  /**
   * Gera um usuário com e-mail fora do formato aceito.
   * @returns {{nome: string, email: string, password: string, administrador: string}}
   */
  comEmailInvalido() {
    return usuario.valido({ email: 'email-sem-arroba' })
  },
}

module.exports = usuario
