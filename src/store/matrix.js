import Api from '../services/api'

export default {
  namespaced: true,
  state: {
    currentMatrix: {}
  },
  mutations: {
    SET_CURRENT_MATRIX (state, matrix) {
      state.currentMatrix = matrix
    }
  },
  actions: {
    async load ({ commit }, matrixId) {
      const response = await Api().get(`/api/matrices/${matrixId}`)
      const matrix = response.data.data
      matrix.attributes.id = matrix.id
      matrix.attributes.userId = matrix.relationships.user.data.id
      matrix.attributes.listIds = matrix.relationships.lists.data.map(l => l.id)
      commit('SET_CURRENT_MATRIX', matrix.attributes)
    }
  }
}
