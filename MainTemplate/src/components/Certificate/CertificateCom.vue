<template>
<v-app id="inspire">
  <v-layout>
    <v-flex>
      <div id="CertificateFront">
        <Certificate-Front></Certificate-Front>
      </div>
    </v-flex>
  </v-layout>
</v-app>
</template>

<script>
import CertificateFront from './CertificateFront.vue';

export default {
  components:{
    CertificateFront
  },
  name: "CertificateCom",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>