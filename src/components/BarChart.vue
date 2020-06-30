<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'BarChart',
  mixins: [reactiveProp],
  extends: Bar,
  props: {
    options: {
      type: Object
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
