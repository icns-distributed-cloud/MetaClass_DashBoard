<template>
  <div>
    <v-card>
    <!--너비/높이 계산 설정 aspect-ratio-->
    <v-responsive :aspect-ratio="16/9">
        <v-card-text>
          학생 평가 관리
        </v-card-text>
        <!--progress circular-->
        <div class="text-center">
    <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="value"
      color="teal"
    >
      {{ value }}
    </v-progress-circular>
    </div>
    <!--progress circular-->
      </v-responsive>
    </v-card>
  </div>
</template>

    
  


<!------script-------->


<script>
  export default {
    data () {
      return {
        interval: {},
        value: 0,
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    },
  }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>