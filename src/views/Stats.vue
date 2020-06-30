<template>
  <div class="w-full max-w-6xl m-auto">
    <h2 class="w-1/2 m-auto text-center text-4xl bg-yellow-500 text-gray-900 font-semibold tracking-tight p-1 border-4">
        {{ currentUser }}
    </h2>

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

    <div v-if="loaded" class="bg-white divide-y divide-gray-400 rounded border-l-8 mt-4 p-4">
      <BarChart :chartData="chartData" :options="options" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BarChart from '../components/BarChart.vue'

export default {
  name: 'Stats',
  components: {
    BarChart
  },
  data () {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Done',
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)'
            ],
            data: null
          },
          {
            label: 'Not Done',
            backgroundColor: [
              'rgba(54, 162, 235, 0.7)'
            ],
            data: null
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser.name,
      currentMatrix: state => state.matrix.currentMatrix,
      currentList: state => state.matrix.currentList
    })
  },
  methods: {
    async loadList (type) {
      this.loaded = false
      await this.$store.dispatch('matrix/loadList', this.currentMatrix.lists.find(l => l.type === type).id)
      this.setChartData()
      this.loaded = true
    },
    setChartData () {
      const labels = ['Tasks']
      this.chartData.labels = labels

      const numOfDoneTasks = this.currentList.tasks.filter(t => t['is-done'] === true).length
      const numOfNotDoneTasks = this.currentList.tasks.length - numOfDoneTasks

      this.chartData.datasets[0].data = [numOfDoneTasks]
      this.chartData.datasets[1].data = [numOfNotDoneTasks]
    }
  }
}
</script>

<style>

</style>
