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
    async load ({ commit, dispatch }, matrixId) {
      const response = await Api().get(`/api/matrices/${matrixId}`)
      const matrix = response.data.data
      matrix.attributes.id = matrix.id
      matrix.attributes.lists = response.data.included.filter(obj => {
        return obj.type === 'lists'
      })
      commit('SET_CURRENT_MATRIX', matrix.attributes)
    }
  }
}
