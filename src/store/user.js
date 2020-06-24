import Api from '../services/api'

export default {
  namespaced: true,
  state: {
    currentUser: {}
  },
  mutations: {
    SET_CURRENT_USER (state, user) {
      state.currentUser = user
      window.localStorage.currentUser = JSON.stringify(user)
    },
    LOGOUT_USER (state) {
      state.currentUser = {}
      window.localStorage.currentUser = JSON.stringify({})
    }
  },
  actions: {
    async loadCurrent ({ commit }) {
      const currentUser = JSON.parse(window.localStorage.currentUser) || {}
      commit('SET_CURRENT_USER', currentUser)
    },
    async login ({ commit }, loginInfo) {
      try {
        const response = await Api().post('/api/sessions', loginInfo)
        const user = response.data.data
        user.attributes.id = user.id
        user.attributes.matrixId = user.relationships.matrix.data.id
        commit('SET_CURRENT_USER', user.attributes)
        return user.attributes
      } catch {
        return { error: 'Username/Password combination was incorrect. Please try again.' }
      }
    },
    logout ({ commit }) {
      commit('LOGOUT_USER')
    }
  }
}
