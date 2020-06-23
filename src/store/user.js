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
    }
  },
  actions: {
    async login ({ commit }, loginInfo) {
      try {
        const response = await Api().post('/api/sessions', loginInfo)
        const user = response.data
        debugger
        commit('SET_CURRENT_USER', user)
        return user
      } catch {
        return { error: 'Username/Password combination was incorrect. Please try again.' }
      }
    }
  }
}
