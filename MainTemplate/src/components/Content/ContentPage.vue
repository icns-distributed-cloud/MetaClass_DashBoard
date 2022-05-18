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
               <div id="ContentCom">
                <Content-Com></Content-Com>
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
import ContentCom from './ContentCom.vue'

export default {
   components:
  {
    SideBar,ContentCom
  },
    name: "ContentPage",
  data() {
        return {
        
        }
    },
    methods: {
    }
}
</script>