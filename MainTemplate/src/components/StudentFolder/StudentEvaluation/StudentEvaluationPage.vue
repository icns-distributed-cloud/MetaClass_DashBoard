<template>
  <v-app id="inspire">
    <div>
      <v-layout>
        <v-row>
          <v-sheet rounded="lg">
              <div id="StudentSideBar">
              <Student-SideBar></Student-SideBar>
              </div>
            </v-sheet>
          <v-col cols="12">
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
               <div id="StudentEvaluationCom">
                <StudentEvaluation-Com></StudentEvaluation-Com>
                </div>
            </v-sheet>
          </v-col>
        </v-row>
       </v-layout>
    </div>
  </v-app>
</template>


<!--script-->
<script>
import StudentSideBar from '../StudentSideBar/StudentSideBar.vue'
import StudentEvaluationCom from './StudentEvaluationCom.vue'

export default {
   components:
  {
    StudentSideBar,StudentEvaluationCom
  },
    name: "StudentEvaluationPage",
  data() {
        return {
        
        }
    },
    methods: {
    }
}
</script>