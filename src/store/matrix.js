import Api from '../services/api'

export default {
  namespaced: true,
  state: {
    currentMatrix: {},
    currentList: []
  },
  mutations: {
    SET_CURRENT_MATRIX (state, matrix) {
      state.currentMatrix = matrix
    },
    SET_CURRENT_LIST (state, list) {
      state.currentList = list
    },
    EDIT_TASK (state, task) {
      state.currentList.tasks.forEach(t => {
        if (t.id === task.id) {
          t = task
        }
      })
    }
  },
  actions: {
    async load ({ commit, dispatch }, matrixId) {
      const response = await Api().get(`/api/matrices/${matrixId}`)
      const matrix = response.data.data
      matrix.attributes.id = matrix.id
      if (response.data.included) {
        matrix.attributes.lists = response.data.included.filter(obj => obj.type === 'lists')
        matrix.attributes.lists.forEach(l => {
          l.attributes.id = l.id
        })
        matrix.attributes.lists = matrix.attributes.lists.map(l => l.attributes)
        dispatch('loadList', matrix.attributes.lists[0].id)
      } else {
        matrix.attributes.lists = []
      }
      commit('SET_CURRENT_MATRIX', matrix.attributes)
    },
    async loadList ({ commit }, listId) {
      const response = await Api().get(`/api/lists/${listId}`)
      const list = response.data.data
      list.attributes.id = list.id
      list.attributes.tasks = response.data.included.filter(obj => obj.type === 'tasks')
      list.attributes.tasks.forEach(t => {
        t.attributes.id = t.id
      })
      list.attributes.tasks = list.attributes.tasks.map(t => t.attributes)
      commit('SET_CURRENT_LIST', list.attributes)
    },
    async taskChangeDoneStatus ({ commit }, task) {
      const response = await Api().put(`/api/tasks/${task.id}`, task)
      const newTask = response.data.data
      commit('EDIT_TASK', newTask)
    }
  }
}
