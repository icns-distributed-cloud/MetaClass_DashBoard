<!--Class front-->
<template>
<v-container fluid>
  <v-card class="overflow-hidden">
    <v-responsive :aspect-ratio="16/9">
    <v-spacer></v-spacer>
    <!-- grey lighten-3 sheet size 800-->
    <v-sheet
      id="classmap-mainscroll"
      class="overflow-y-auto"
      max-height="800"
      color="grey lighten-3"
      dark
    >
    <div>     
      <v-row>
        <v-col
          v-for="(item, index) in ClassFrontModalList"
          :key="index"
          cols="4"
          @change="fetchMapData"
        >
          <ClassMap-Modal v-bind:info="ClassFrontModalList[index]" v-bind:fetchMapData="fetchMapData"></ClassMap-Modal>
        </v-col>
      </v-row>
    </div>
    <v-container style="height: 1000px;"></v-container>
    </v-sheet>
      <template>
      <!--classroom registration text-right move-->
      <div class="text-right">
        <v-col
          cols="12"
          sm="12"
          md="8"
          offset-md="4"
        >
          <v-dialog
            v-model="ClassFrontDialog"
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="deep-purple lighten-1"
              dark
              v-bind="attrs"
              v-on="on"
            >
              강의실 등록
            </v-btn>  
            </template>
            <!--classroom registration pop-up window-->
            <v-card
              class="overflow-hidden"
              color="purple lighten-1"
              dark
            >
              <v-toolbar
                flat
                color="purple"
              >
                <v-toolbar-title class="front-weight-light">강의실 등록</v-toolbar-title>
              </v-toolbar>
              <!--class front mapname-->
              <v-card-text>
                <v-text-field
                  v-model="ClassFrontMapName"
                  label="강의실 이름"
                  color="white"
                >
              </v-text-field>
              <!--classfrontmaptype-->
              <v-autocomplete
                v-model="ClassFrontMapType"
                :items="ClassFrontMapTypeItem"
                label="강의실 유형"
                color="white"
              ></v-autocomplete>     
              <!--number of participants in the classroom-->
              <v-text-field
                v-model="ClassFrontNumValue"
                label="강의실 참여 인원수"
                class="numer"
                :ClassFrontRules="[ClassFrontRules.required, ClassFrontRules.min, ClassFrontRules.max]"
                type="number"
                @click:append-outer="ClassFrontIncrement"
                @click:prepend="ClassFrontDecrement"
                color="white"
                required
              >
              </v-text-field>                 
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-grey"
                @click="ClassFrontDialog = false"
              >
                취소
              </v-btn>
              <v-btn
                color="green"
                @click=ClassFrontCreateClassModal();
              >
                확인
              </v-btn>
            </v-card-actions>  
          </v-card>
        </v-dialog>
        <!--adjust class registration input so that it appears above the scroll bar-->
        <v-container style="height: 20px;"></v-container>
        </v-col>
      </div>
      </template>
    </v-responsive>        
  </v-card>
</v-container>
</template>

<!------script-------->
<script>
var RestAPIManager = require('../RestAPIManager')
import ClassMapModal from './ClassMapModal.vue'
export default {

components: { ClassMapModal },
  data: () => ({
    ClassFrontMapName: "",
    ClassFrontDialog: false,
    ClassFrontMapType: [],
    ClassFrontMapTypeItem: ['오픈형', '계단식', '소회의실'],  // classroom type

    // check the number of participants in the class(lecture)
    ClassFrontNumValue: 50,
    ClassFrontForm : {
      min: 2,
      max: 10
    },
    ClassFrontRules: {
      required: value => !!value || "Required.",
      min: v => v >= this.ClassFrontForm .min || `The Min is ${this.ClassFrontForm .min}`,
      max: v => v <= this.ClassFrontForm .max || `The Max is ${this.ClassFrontForm .max}`
    },
    ///
    ClassFrontModalList:[],
    ModalInfo: [],

    componentKey: 0
  }),
  ClassFrontMapType: "ClassFront",

  created() {
    this.fetchMapData();
  },

  methods: {
    forceRerender() {
      this.componentKey += 1;
    },

    ClassFrontIncrement() {
      if (this.ClassFrontNumValue < this.ClassFrontForm .max) {
        this.ClassFrontNumValue = parseInt(this.ClassFrontNumValue, 10) + 1;
      }
    },

    ClassFrontDecrement() {
      if (this.ClassFrontNumValue > this.ClassFrontForm .min) {
        this.ClassFrontNumValue = parseInt(this.ClassFrontNumValue, 10) - 1;
      }
    },

    deleteMap() {
      this.fetchMapData();
    },

    updateMap() {
      this.fetchMapData();
    },

    ClassFrontDeleteClassModal(){
      this.ClassFrontModalList.splice(this.ClassFrontModalList.length, 1)
    },

    // 7. Post - http://IPAdress/api/map/post/maplist
    async fetchMapData() {
      this.ClassFrontModalList = [];
      var maplist = await RestAPIManager.API_maplist("", this.$store.getters.getUserInfo.id);
      this.ClassFrontModalList = maplist;
    },

    // 5. Post - http://IPAdress/api/map/post/createmap
    async ClassFrontCreateClassModal() {
      var maptype = 0;
      if (this.ClassFrontMapType === "오픈형") {
        maptype = 0
      } else if (this.ClassFrontMapType === "계단식") {
        maptype = 1
      } else if (this.ClassFrontMapType === "소회의실") {
        maptype = 2
      } else {
        alert("강의실 유형을 정확하게 입력해주세요.")
        return;
      }

      var createmap = await RestAPIManager.API_createmap(this.ClassFrontMapName, maptype, this.ClassFrontNumValue, this.$store.getters.getUserInfo.id);

      if (createmap.res_success === true) {
        alert("강의실 생성이 완료되었습니다.");
        this.ClassFrontDialog = false;
        this.fetchMapData();
      } else {
        alert("강의실 이름이 중복되었습니다");
        return;
      }
    },
  }
}
</script>