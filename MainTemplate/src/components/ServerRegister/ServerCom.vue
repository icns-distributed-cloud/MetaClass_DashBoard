<!--ServerFront-->
<template>
<v-app id="inspire">
  <v-layout>
    <v-flex>
      <div id="ServerFront">
        <Server-Front></Server-Front>
      </div>
    </v-flex>
  </v-layout>
</v-app>
</template>


<script>
import ServerFront from './ServerFront.vue';

export default {
  components: {
    ServerFront
  },
  name: "ServerCom",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>