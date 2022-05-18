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
               <div id="ClassMapCom">
                <ClassMap-Com></ClassMap-Com>
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
import ClassMapCom from './ClassMapCom.vue'

export default {
   components:
  {
    SideBar,ClassMapCom
  },
    name: "ClassMapPage",
  data() {
        return {
        
        }
    },
    methods: {
    }
}
</script>
