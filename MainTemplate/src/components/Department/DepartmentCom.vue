<template>
<v-app id="inspire">
  <v-layout>
    <v-flex>
      <div id="DepartmentFront">
        <Department-Front></Department-Front>
      </div>
    </v-flex>
  </v-layout>
</v-app>
</template>

<script>
import DepartmentFront from './DepartmentFront.vue';

export default {
  components:{
    DepartmentFront
  },
  name: "DepartmentCom",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>