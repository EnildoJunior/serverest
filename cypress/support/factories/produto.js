const sufixoUnico = () => `${Date.now()}${crypto.randomUUID().slice(0, 8)}`

const produto = {
  /**
   * Gera um produto válido com nome inédito.
   * @param {object} [overrides] campos a sobrescrever
   * @returns {{nome: string, preco: number, descricao: string, quantidade: number}}
   */
  valido(overrides = {}) {
    const unico = sufixoUnico()
    return {
      nome: `Produto QA ${unico}`,
      preco: 500,
      descricao: `Produto de teste ${unico}`,
      quantidade: 10,
      ...overrides,
    }
  },
}

module.exports = produto
