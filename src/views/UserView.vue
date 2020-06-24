<template>
  <div class="w-full max-w-6xl m-auto">
    <div class="flex flex-wrap">
        <button @click="loadList('Q1')" class="w-1/2 bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Q1
        </button>
        <button @click="loadList('Q2')" class="w-1/2 bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Q2
        </button>
        <button @click="loadList('Q3')" class="w-1/2 bg-orange-300 hover:bg-orange-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Q3
        </button>
        <button @click="loadList('Q4')" class="w-1/2 bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Q4
        </button>
    </div>
    <div v-for="task in currentList.tasks" :key="task.id">
      <h1>{{ task.description }}</h1>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserView',
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
      this.$store.dispatch('matrix/loadList', this.currentMatrix.lists.find(l => l.type === type).id)
    }
  }
}
</script>

<style>

</style>
