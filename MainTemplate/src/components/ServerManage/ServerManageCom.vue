<!--ServerFront-->
<template>
<v-app id="inspire">
  <v-layout>
    <v-flex>
      <div id="ServerFront">
        <Server-Manage-Front></Server-Manage-Front>
      </div>
    </v-flex>
  </v-layout>
</v-app>
</template>

<script>
import ServerManageFront from './ServerManageFront.vue';

export default {
  components: {
    ServerManageFront
  },
  name: "ServerManageCom",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>