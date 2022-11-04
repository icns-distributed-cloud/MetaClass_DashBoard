<template>
<v-app id="inspire">
  <v-layout>
    <v-flex>
      <div id="StudentFront">
        <Content-Front></Content-Front>
      </div>
    </v-flex>
  </v-layout>
</v-app>
</template>


<script>
import ContentFront from './StudentFront.vue';

export default {
  components: {
    ContentFront
  },
  name: "StudentCom",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>