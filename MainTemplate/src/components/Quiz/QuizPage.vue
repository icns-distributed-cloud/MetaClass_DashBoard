<template>
  <v-app id="inspire">
    <div>
      <v-layout>
        <v-row>
          <v-sheet rounded="lg">
              <div id="SideBar">
              <side-bar></side-bar>
              </div>
            </v-sheet>
          <v-col cols="12">
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
               <div id="QuizCom">
                <Quiz-Com></Quiz-Com>
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
import SideBar from '../SideBar/SideBar.vue'
import QuizCom from './QuizCom.vue'

export default {
   components:
  {
    SideBar,QuizCom
  },
    name: "QuizPage",
  data() {
        return {
        
        }
    },
    methods: {
    }
}
</script>