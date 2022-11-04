<template>
<v-col>
  <v-card>
    <v-toolbar
      color="indigo"
      light
      extended
    >
      <v-toolbar-title class="white--text">
        <h2>{{info.name}}</h2>
      </v-toolbar-title>
    </v-toolbar>
    <v-list
      two-line
      subheader
      color="indigo lighten-5"
    >
      <v-subheader inset class="indigo--text" v-if="info.type === 0">
        <h2>오픈형</h2>
      </v-subheader>
      <v-subheader inset class="indigo--text" v-if="info.type === 1">
        <h2>계단식</h2>
      </v-subheader>
      <v-subheader inset class="indigo--text" v-if="info.type === 2">
        <h2>소회의실</h2>
      </v-subheader>
      <v-subheader inset class="indigo--text">
        <h2>{{info.maxUser}}</h2>
      </v-subheader>
    </v-list>

    <v-list two-line color="indigo lighten-5">
      <v-card-actions>
        <v-spacer></v-spacer> 
        <v-btn
          class="mr-4"
          color="indigo darken-4"
          @click=deleteMap();
        >
          삭제
        </v-btn>
        <v-btn
          class="mr-4"
          color="green"
          @click=popupUpdateMapDialog();
        >
          수정
        </v-btn>
      </v-card-actions> 
    </v-list>
  </v-card>

  <template>
  <v-dialog 
    v-model="popupUpdateMap"
    persistent
    max-width="600px"
  >
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
      <v-card-text>
        <v-text-field
          v-model="classMapName"
          label="강의실 이름"
          color="white"
        >
        </v-text-field>
        <v-autocomplete
          v-model="classMapType"
          :items="ClassMapTypeItem"
          label="강의실 유형"
          color="white"
        ></v-autocomplete>
        <v-text-field
          v-model="classMapMaxUser"
          label="강의실 참여 인원수"
          color="white"
          class="number"
          :ClassFrontRules="[ClassFrontRules.required, ClassFrontRules.min, ClassFrontRules.max]"
          type="number"
          @click:append-outer="ClassFrontIncrement"
          @click:prepend="ClassFrontDecrement"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-grey"
          @click=closeUpdateMap()
        >
        취소
        </v-btn>
        <v-btn
          color="green"
          @click=updateMap()
        >
        수정
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </template>
</v-col>
</template>

<!---->
<script>
var Config = require("../../config");
var ClassMapEnum = require("./ClassMapEnum");
var RestAPIURL = require("../../RestAPIURL");

export default {
  props: {
    info: {
      type: Object,
      require: true
    }
  },

  data:() => ({
    popupUpdateMap: false,
    classMapName: "",
    classMapType: "",
    classMapMaxUser: 0,
    ClassMapTypeItem: ["오픈형", "계단식", "소회의실"],

    ClassFrontForm : {
      min: 2,
      max: 10
    },

    ClassFrontRules: {
      required: value => !!value || "Required.",
      min: v => v >= this.ClassFrontForm .min || `The Min is ${this.ClassFrontForm .min}`,
      max: v => v <= this.ClassFrontForm .max || `The Max is ${this.ClassFrontForm .max}`
    },
  }),

  computed: {

  },

  created() {
    this.setMapInfo();
  },

  methods: {
    ClassFrontIncrement() {
      if (this.classMapMaxUser < this.ClassFrontForm .max) {
        this.classMapMaxUser = parseInt(this.classMapMaxUser, 10) + 1;
      }
    },

    ClassFrontDecrement() {
      if (this.classMapMaxUser > this.ClassFrontForm .min) {
        this.classMapMaxUser = parseInt(this.classMapMaxUser, 10) - 1;
      }
    },

    setMapInfo() {
      var Maptype = ClassMapEnum.Maptype;
      this.classMapName = this.info.name;
      if (this.info.type === Maptype.OPEN) {
        this.classMapType = "오픈형"
      } else if (this.info.type === Maptype.CASCADING) {
        this.classMapType = "계단식"
      } else if (this.info.type === Maptype.MEETING_ROOM) {
        this.classMapType = "소회의실"
      }
      this.classMapMaxUser = this.info.maxUser;
    },

    popupUpdateMapDialog() {
      this.popupUpdateMap = true
    },

    closeUpdateMap() {
      this.setMapInfo();
      this.popupUpdateMap = false
    },

    // 강의실 맵 정보 수정 API : 8. Patch - http://IPAddress/api/map/patch/updatemap
    updateMap() {
      var url = RestAPIURL.Map.PatchUpdateMapAPI;

      var maptype = 0;
      var Maptype = ClassMapEnum.Maptype;
      if (this.classMapType === "오픈형") {
        maptype = Maptype.OPEN;
      } else if (this.classMapType === "계단식") {
        maptype = Maptype.CASCADING;
      } else if (this.classMapType === "소회의실") {
        maptype = Maptype.MEETING_ROOM;
      } else {
        alert("강의실 유형을 정확하게 입력해주세요.")
        return;
      }

      var payload = {
        id: this.info.id,
        name: this.classMapName,
        type: maptype,
        maxUser: this.classMapMaxUser
      }

      var config = Config.config;

      this.$http
        .patch(url, payload, config)
        .then(res => {
          if (res.data.success === true) {
            alert("강의실 수정이 완료되었습니다.");
            this.popupUpdateMap = false;
            this.$parent.$parent.$parent.$parent.fetchData();
          } else {
            alert("강의실 수정이 실패했습니다.");
            return;
          }
        })
        .catch(res => {
          alert(res);
        })
    },

    // 강의실 맵 삭제 API : 6. Patch - http://IPAddress/api/map/patch/deletemap
    deleteMap() {
      var prompStr = prompt(
        '강의실이 삭제되며 복구할 수 없습니다.\n삭제를 원하면 "삭제"를 입력해주세요.'
      );
      if (prompStr == null) {
        return;
      }
      if (prompStr == "삭제") {
        var url = RestAPIURL.Map.PatchDeleteMapAPI;

        var payload = {
          id: this.info.id
        }

        var config = Config.config;

        this.$http
          .patch(url, payload, config)
          .then(res => {
            if (res.data.success === true) {
              alert("성공적으로 삭제되었습니다.");
              this.$parent.$parent.$parent.$parent.deleteMap();
            } else {
              alert(res.data.message);
            }
            
          })
          console.log("delete map");
        } else {
          alert("정확하게 입력해주세요.");
          return;
        }
    },
  },
}
</script>