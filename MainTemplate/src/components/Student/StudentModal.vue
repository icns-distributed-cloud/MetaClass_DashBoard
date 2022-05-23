<!--SudentModal-->

<template>

  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />



 

 
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartData: {
        labels: [ '학생 A', '학생 B', '학생 C', '학생 D', '학생 E' ], // 학생 A, 학생 B, 학생 C
        datasets: [
  
        {
          label: '점수', 
          backgroundColor: ['#E57373', '#FFB74D', '#FFF176', '#81C784', '#4FC3F7'], // 칼라
          data: [100, 90, 80, 70, 50]
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>