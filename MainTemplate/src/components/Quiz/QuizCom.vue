<template>
<v-app id="inspire">
  <v-layout>
    <v-flex>
      <div id="QuizFront">
        <Quiz-Front></Quiz-Front>
      </div>
    </v-flex>
  </v-layout>
</v-app>
</template>


<script>
import QuizFront from './QuizFront.vue';

export default {
  components: {
    QuizFront
  },
  name: "QuizCom",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>