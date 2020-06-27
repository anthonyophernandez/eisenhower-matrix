<template>
  <div>
    <button
      @click="currentTab = tab"
      class="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 mb-2 mr-1 rounded"
      :class="[(currentTab === tab) ? 'bg-blue-700' : '']"
      v-for="tab in tabs"
      :key="tab"
    >
        {{ tab }}
    </button>

    <component :is="currentTabComponent"></component>
  </div>
</template>

<script>
import Matrix from './Matrix.vue'
import Stats from './Stats.vue'

export default {
  name: 'User',
  components: {
    Matrix,
    Stats
  },
  data () {
    return {
      currentTab: 'Matrix',
      tabs: ['Matrix', 'Stats']
    }
  },
  computed: {
    currentTabComponent () {
      return this.currentTab
    }
  }
}
</script>

<style>

</style>
