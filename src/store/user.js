import Api from '../services/api'

export default {
  namespaced: true,
  state: {
    currentUser: {
      username: '',
      name: '',
      id: '',
      matrixId: ''
    }
  },
  mutations: {
    SET_CURRENT_USER (state, user) {
      state.currentUser.username = user.username
      state.currentUser.password = user.password
      state.currentUser.name = user.name
      state.currentUser.id = user.id
      state.currentUser.matrixId = user.matrixId

      window.localStorage.currentUser = JSON.stringify(state.currentUser)
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
    async register ({ commit }, registrationInfo) {
      try {
        const response = await Api().post('/api/users', registrationInfo)
        const user = response.data.data
        user.attributes.id = user.id
        user.attributes.matrixId = user.relationships.matrix.data.id
        commit('SET_CURRENT_USER', user.attributes)
        return user.attributes
      } catch {
        return { error: 'There was an error. Please try again.' }
      }
    },
    logout ({ commit }) {
      commit('LOGOUT_USER')
    }
  }
}
