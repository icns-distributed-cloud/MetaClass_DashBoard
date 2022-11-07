<!--Sudent_Tardy : 학생 지각률 card-->
<template>
<v-container fluid>
  <v-row dense>
    <v-col
      v-for="card in cards"
      :key="card.title"
      :cols="card.flex"
    >
      <v-card>
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
        <v-card-title v-text="card.title"></v-card-title>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

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
      // cards 데이터 입력값 들어갈 이름
      cards: [
        {title: '학생 지각률', flex: 6},
      ],
      // chartData
      chartData: {
        labels: [ '학생 A', '학생 B', '학생 C', '학생 D', '학생 E' ], 
        datasets: [{
          label: '점수',
          backgroundColor: ['#E57373', '#FFB74D', '#FFF176', '#81C784', '#4FC3F7'], // 칼라
          data: [20, 40, 30, 60, 10],
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>