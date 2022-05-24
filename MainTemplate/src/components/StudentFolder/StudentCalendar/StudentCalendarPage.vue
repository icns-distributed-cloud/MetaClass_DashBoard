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
               <div id="StudentCalendarCom">
                <StudentCalendar-Com></StudentCalendar-Com>
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
import StudentCalendarCom from './StudentCalendarCom.vue'

export default {
   components:
  {
    StudentSideBar,StudentCalendarCom
  },
    name: "StudentCalendarPage",
  data() {
        return {
        
        }
    },
    methods: {
    }
}
</script>
