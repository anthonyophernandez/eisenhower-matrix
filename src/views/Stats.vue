<template>
  <div class="w-full max-w-6xl m-auto">
    <h2 class="w-1/2 m-auto text-center text-4xl bg-yellow-500 text-gray-900 font-semibold tracking-tight p-1 border-4">
        {{ currentUser }}
    </h2>

    <ListButtons @load="setChartData" />

    <div v-if="loaded" class="bg-white divide-y divide-gray-400 rounded border-l-8 mt-4 p-4">
      <BarChart :chart-data="chartData" :options="options" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BarChart from '../components/BarChart.vue'
import ListButtons from '../components/ListButtons.vue'

export default {
  name: 'Stats',
  components: {
    BarChart,
    ListButtons
  },
  data () {
    return {
      loaded: false,
      chartData: null,
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
      currentList: state => state.matrix.currentList
    })
  },
  methods: {
    setChartData () {
      this.loaded = false

      const numOfDoneTasks = this.currentList.tasks.filter(t => t['is-done'] === true).length
      const numOfNotDoneTasks = this.currentList.tasks.length - numOfDoneTasks

      const chartData = {
        labels: ['Tasks'],
        datasets: [
          {
            label: 'Done',
            backgroundColor: [
              'rgba(162, 222, 150, 0.7)'
            ],
            data: [numOfDoneTasks]
          },
          {
            label: 'Not Done',
            backgroundColor: [
              'rgba(250, 22, 22, 0.7)'
            ],
            data: [numOfNotDoneTasks]
          }
        ]
      }

      this.chartData = chartData

      this.loaded = true
    }
  }
}
</script>

<style>

</style>
