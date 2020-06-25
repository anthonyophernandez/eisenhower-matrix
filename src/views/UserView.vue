<template>
  <div class="w-full max-w-6xl m-auto">
    <div class="flex flex-wrap">
        <button @click="loadList('Q1')" class="w-1/2 bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Do
        </button>
        <button @click="loadList('Q2')" class="w-1/2 bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Schedule
        </button>
        <button @click="loadList('Q3')" class="w-1/2 bg-orange-300 hover:bg-orange-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Delegate
        </button>
        <button @click="loadList('Q4')" class="w-1/2 bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Eliminate
        </button>
    </div>
    <div class="bg-white divide-y divide-gray-400 rounded border-l-8 mt-4 p-4" :class="[colorBorder(currentList.type)]">
      <div v-for="task in currentList.tasks" :key="task.id" class="flex justify-between my-2 py-2">
        <h1 :class="[task['is-done'] ? 'line-through' : '']">{{ task.description }}</h1>
        <div>
          <button v-if="!task['is-done']" @click="changeDoneStatus(task.id, true)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Done</button>
          <button v-else @click="changeDoneStatus(task.id, false)" class="bg-green-500 hover:bg-green-700 text-white font-bold  rounded py-2 px-4">Undone</button>
          <button @click="toggleModal = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 ml-1">Edit</button>
          <button @click="deleteTask(task.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold rounded py-2 px-4 ml-1">Delete</button>
        </div>
      </div>
    </div>

    <ModalForm :isModalOpen="toggleModal" @closeModal="closeModal"/>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ModalForm from '../components/ModalForm.vue'

export default {
  name: 'UserView',
  components: {
    ModalForm
  },
  data () {
    return {
      toggleModal: false
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser,
      currentMatrix: state => state.matrix.currentMatrix,
      currentList: state => state.matrix.currentList
    })
  },
  created () {
    this.$store.dispatch('matrix/load', this.currentUser.matrixId)
  },
  methods: {
    loadList (type) {
      if (this.currentMatrix.lists.length > 0) {
        this.$store.dispatch('matrix/loadList', this.currentMatrix.lists.find(l => l.type === type).id)
      }
    },
    colorBorder (type) {
      const color = (type === 'Q1') ? 'border-green-300'
        : (type === 'Q2') ? 'border-blue-300'
          : (type === 'Q3') ? 'border-orange-300'
            : (type === 'Q4') ? 'border-red-300'
              : 'border-gray-600'
      return color
    },
    changeDoneStatus (taskId, doneStatus) {
      const task = this.currentList.tasks.find(t => t.id === taskId)
      task['is-done'] = doneStatus
      this.$store.dispatch('matrix/taskChangeDoneStatus', task)
    },
    deleteTask (taskId) {
      const task = this.currentList.tasks.find(t => t.id === taskId)
      this.$store.dispatch('matrix/deleteTask', task)
    },
    closeModal () {
      this.toggleModal = false
    }
  }
}
</script>

<style>

</style>
