<template>
  <div class="flex flex-wrap mt-2">
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavButtons',
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser.name,
      currentMatrix: state => state.matrix.currentMatrix,
      currentList: state => state.matrix.currentList
    })
  },
  methods: {
    async loadList (type) {
      await this.$store.dispatch('matrix/loadList', this.currentMatrix.lists.find(l => l.type === type).id)
      this.$emit('load')
    }
  }
}
</script>

<style>

</style>
