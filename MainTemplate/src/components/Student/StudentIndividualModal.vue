<!--Student-Individual-Modal-->
<!--StudentText(텍스트 안에서 --텍스트로된 학생참여율과 지각율: 오름차순, 내림차순)를 넣기 위한 sheet-->
<template>
  <div>
    <v-sheet>
      <v-responsive :aspect-ratio="10/6">
       <div id="StudentIndividual">
         <Student-Individual v-bind:infoinfo="individual" v-on:close="closeIndividualModal"></Student-Individual>
       </div>
      
     
      </v-responsive>
    </v-sheet>
  </div>
</template>


<!--script-->
<script>
import StudentIndividual from './StudentIndividual.vue' // StudentIndividual 


export default {
    props: {
      individualInfo: {
        type: Object,
        require: true
      }
    },
    components: 
    { 
      StudentIndividual, 
    },
    
    name: "StudentIndividualModal",
    data() {
        return {
          individual: this.individualInfo
        
        }
    },
    watch: {
      individualInfo() {
        this.individual = this.individualInfo;
      }
    },
    updated() {

    },
    beforeMount() {

    },
    methods: {
      closeIndividualModal() {
        this.$emit("close", "close")
      }
    }
}
</script>