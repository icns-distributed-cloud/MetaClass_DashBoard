<template>
<v-app id="inspire">
  <div id="StudentInformationFront">
    <StudentInformation-Front></StudentInformation-Front>
  </div>
</v-app>
</template>

<!--script-->
<script>
import StudentInformationFront from './StudentInformationFront.vue';

export default {
  components: {
    StudentInformationFront
  },
  name: "StudentInformationCom",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>