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
          t.description = task.description
          t['is-done'] = task['is-done']
        }
      })
    },
    ADD_TASK (state, task) {
      const tasks = state.currentList.tasks.concat(task)
      state.currentList.tasks = tasks
    },
    DELETE_TASK (state, taskId) {
      const tasks = state.currentList.tasks.filter(t => t.id !== taskId)
      state.currentList.tasks = tasks
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
      if (response.data.included) {
        list.attributes.tasks = response.data.included.filter(obj => obj.type === 'tasks')
        list.attributes.tasks.forEach(t => {
          t.attributes.id = t.id
          t.attributes.listId = list.id
        })
        list.attributes.tasks = list.attributes.tasks.map(t => t.attributes)
      } else {
        list.attributes.tasks = []
      }
      commit('SET_CURRENT_LIST', list.attributes)
    },
    clearCurrentList ({ commit }) {
      commit('SET_CURRENT_LIST', [])
    },
    async deleteTask ({ commit }, task) {
      const response = await Api().delete(`/api/tasks/${task.id}`)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_TASK', task.id)
      }
    },
    async editTask ({ commit }, task) {
      const response = await Api().put(`/api/tasks/${task.id}`, task)
      const newTask = response.data.data.attributes
      commit('EDIT_TASK', newTask)
    },
    async createTask ({ commit }, task) {
      const response = await Api().post('/api/tasks', task)
      const savedTask = response.data.data
      savedTask.attributes.id = savedTask.id
      commit('ADD_TASK', savedTask.attributes)
    }
  }
}
