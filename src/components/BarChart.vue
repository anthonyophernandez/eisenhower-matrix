<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'BarChart',
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  extends: Bar,
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
