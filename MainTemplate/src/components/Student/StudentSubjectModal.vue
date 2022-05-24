<!--StudentSubject-Modal-->
<!--StudentText(텍스트로된 학생참여율과 지각율: 오름차순, 내림차순)를 넣기 위한 sheet-->
<template>
  <div>
    <v-sheet>
      <v-responsive :aspect-ratio="10/6">
       <div id="StudentText">
         <Student-Text v-bind:student="studentlist"></Student-Text>
       </div>
      
     
      </v-responsive>
    </v-sheet>
  </div>
</template>


<!--script-->
<script>
import StudentText from './StudentText.vue' // StudentText 


export default {
    props: {
      info: {
        type: Object,
        require: true
      }
    },
    components: 
    { 
      StudentText, 
    },
      name: "StudentSubjectModal",
    data() {
        return { 
          studentlist: {}
        }
    },
    watch: {
      info() {
        this.studentlist = this.info;
      }
    },
    updated() {
      console.log("helll");
    },
    beforeMount() {
    },
    methods: {
      
    }
}
</script>