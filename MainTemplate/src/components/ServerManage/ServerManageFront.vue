<!--Server front-->
<template>
<v-card class="overflow-hidden">
  <v-responsive :aspect-ratio="16/9">
    <v-spacer></v-spacer>
    <!-- grey lighten-3 색이 포함된 sheet 늘리기 800-->
    <v-sheet
      id="classmap-mainscroll"
      class="overflow-y-auto"
      max-height="800"
      color="grey lighten-3"
      dark
    >
      <div> 
        <compo-nent :is="ServerModal"></compo-nent>        
        <v-row>
          <v-col
            v-for="(item, index) in ServerFrontModalList"
            :key="index"
            cols="4"
          >
            <Server-Manage-Modal v-bind:info="ServerFrontModalList[index]"></Server-Manage-Modal>
          </v-col>
        </v-row>
      </div>
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
    <!--서버 등록-->
    <template>
    <!--서버 등록 우측으로 이동-->
    <div class="text-right">
      <v-col
        cols="12"
        sm="12"
        md="8"
        offset-md="4"
      >
        <v-dialog
          v-model="ServerFrontDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="deep-purple lighten-1"
            dark
            v-bind="attrs"
            v-on="on"
            @click=empty()
          >
            서버 관리
          </v-btn>  
          </template>
          <!--서버 등록 팝업창-->
          <template>
          <v-card
            class="overflow-hidden"
            color="purple lighten-1"
            dark
          >
            <v-toolbar
              flat
              color="purple"
            >
              <v-toolbar-title class="font-weight-light"> 서버 관리 </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-autocomplete
                v-model="ServerIpList"
                :items="ServerIpListItem"
                item-text="name"
                item-value="value"
                label="아이피 주소"
                color="white"   
              ></v-autocomplete>
              <v-autocomplete
                v-model="ServerTeacherList"
                :items="ServerTeacherListItem"
                item-text="name"
                item-value="value"
                label="강의자 리스트"
                color="white"   
              ></v-autocomplete>
              <v-autocomplete
                v-model="ServerSubjectList"
                :items="ServerSubjectListItem"
                item-text="name"
                item-value="value"
                label="강좌 리스트"
                color="white"
                no-data-text="생성한 강좌가 없습니다"
              >
                <template v-slot:item="data">
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  <v-list-item-subtitle v-html="data.item.time"></v-list-item-subtitle>
                </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-grey"
                @click="ServerFrontDialog = false"
              >
                취소
              </v-btn>
              <v-btn
                color="green"
                @click=save()
              >
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
          </template>
        </v-dialog>
        <!--강의실 등록 입력이 스크롤창 위로 보이도록 조정-->
        <v-container style="height: 20px;"></v-container>
      </v-col>
    </div>
    </template>
  </v-responsive>        
</v-card>
</template>

<!------script-------->
<script>
import ServerManageModal from './ServerManageModal.vue';
var Config = require("../../config");
var RestAPIURL = require("../../RestAPIURL");
var ClassMapEnum = require("../ClassMap/ClassMapEnum");
var MapType = ClassMapEnum.Maptype;

export default {
  components: { ServerManageModal },
  data: () => ({
    ServerIPaddress : "",
    ServerFrontDialog: false,
    ServerIpList: "",
    ServerIpListItem: [],
    ServerTeacherList: "", // 강의자 리스트 
    ServerTeacherListItem: [],  // 강의자 리스트 아이템
    ServerSubjectList: "", // 강좌 리스트
    ServerSubjectListItem: [], //  강좌 리스트 아이템
    // ServerSaved
    ServerSaved: false,
    // model
    // 참여 인원수 체크 (참여 인원)   
    ServerFrontNumValue: 50,
    ServerFrontForm : {
      min: 2,
      max: 10
    },
    ServerFrontRules: {
      required: value => !!value || "Required.",
      min: v => v >= this.ServerFrontForm .min || `The Min is ${this.ServerFrontForm .min}`,
      max: v => v <= this.ServerFrontForm .max || `The Max is ${this.ServerFrontForm .max}`
    },
    ///
    ServerFrontModalList:[],
    ModalInfo: []
  }),
  ServerTeacherList: "ServerFront",

  created() {
    this.fetchData();
    this.fetchIP();
    this.fetchTeacher();
  },

  watch: {
    ServerTeacherList() {
      if (this.ServerTeacherList != "") {
        this.ServerSubjectList = "";
        this.fetchSubject();
      }
    }
  },

  methods: {
    ServerFrontIncrement() {
      if (this.ServerFrontNumValue < this.ServerFrontForm .max) {
        this.ServerFrontNumValue = parseInt(this.ServerFrontNumValue, 10) + 1;
      }
    },
    
    ServerFrontDecrement() {
      if (this.ServerFrontNumValue > this.ServerFrontForm .min) {
        this.ServerFrontNumValue = parseInt(this.ServerFrontNumValue, 10) - 1;
      }
    },

    deleteServer() {
      this.fetchData();
    },

    // 서버 아이피 등록 API : 18. Post - http://IPAddress/api/server/post/createserver
    save() {
      var url = RestAPIURL.Server.PostCreateServerAPI;

      var payload = {
        lectureId: this.ServerSubjectList,
        ipId: this.ServerIpList
      }

      var config = Config.config;

      this.$http
        .post(url, payload, config)
        .then((res) => {
          if (res.data.success === true) {
            alert("서버-강좌 등록 완료");
            this.ServerSaved = true;
            this.fetchData();
          }
        })
        .catch((err) => {
          alert(err);
        })
      this.ServerSaved = true
    },

    // 등록한 아이피 리스트 API : 35. Get - http://IPAddress/api/ip/get/list
    fetchIP() {
      var url = RestAPIURL.IP.GetIPListAPI;

      var config = Config.config;

      this.$http
        .get(url, config)
        .then((res) => {
          if (res.data.data.length > 0) {
            res.data.data.forEach(element => {
              console.log(element);
              this.ServerIpListItem.push({
                name: element.address,
                value: element.id
              })
            })
          }
        })
    },

    // 서버 아이피 등록 시 모든 강사 회원 정보 리스트 API : 31. Get - http://IPAddress/api/users/get/allInstructor
    fetchTeacher() {
      var url = RestAPIURL.Users.GetAllInstructorAPI;

      var config = Config.config;

      this.$http
        .get(url, config)
        .then((res) => {
          if (res.data.data.length > 0) {
            res.data.data.forEach(element => {
              this.ServerTeacherListItem.push({
                name: element.name,
                value: element.id
              })
            }) 
          }
        })
    },

    // 강사가 강좌 예정인 강좌 리스트 API : 20. Get - http://IPAddress/api/server/get/findlectureinfo?instructorId=
    fetchSubject() {
      this.ServerSubjectListItem = [];
      var url = RestAPIURL.Server.GetFindLectureInfoAPI + this.ServerTeacherList;
      var config = Config.config;

      this.$http
        .get(url, config)
        .then((res) => {
          if (res.data.data.length > 0) {
            res.data.data.forEach(element => {
              console.log(element)
              var time = element.lectureStartTime + " ~ " + element.lectureEndTime;
              this.ServerSubjectListItem.push({
                name: element.lectureName,
                value: element.lecturId,
                time: time
              })
            })
          }
        })
    },

    // 서버 아이피 리스트 API : 19. Post - http://IPAddress/api/server/post/listserver
    fetchData() {
      // var vm = this;
      this.ServerFrontModalList = [];
      var url = RestAPIURL.Server.PostListServerAPI;

      var payload = {
        instructorId: 0
      }

      var config = Config.config;

      this.$http
        .post(url, payload, config)
        .then((res) => {
          // console.log(res);
          if (res.data.data.length > 0) {
            res.data.data.forEach(element => {
              var time = element.lectureStartTime + " ~ " + element.lectureEndTime;
              this.ServerFrontModalList.push({
                id: element.id,
                ipId: element.ipId,
                ipAddress: element.ipAddress,
                ipName: element.ipName,
                lectureId: element.lectureId,
                lectureName: element.lectureName,
                time: time
              })
            })
          }
          console.log(this.ServerFrontModalList);
          // console.log(this.ServerFrontModalList[0]);
        })
    },

    // 강의실 맵 생성 API : 5. Post - http://IPAddress/api/map/post/createmap
    ServerFrontManage()
    {
      var url = RestAPIURL.Map.PostCreateMapAPI;
      var maptype = 0;
      if (this.ServerTeacherList === "손덕인") {
        maptype = MapType.OPEN;
      } else if (this.ServerTeacherList === "최인훈") {
        maptype = MapType.CASCADING;
      } else if (this.ServerTeacherList === "노설") {
        maptype = MapType.MEETING_ROOM;
      } else {
        alert("강의실 유형을 정확하게 입력해주세요.")
        console.log(maptype);
        return;
      }
        
      var userId = this.$store.getters.getUserInfo.id;
      var payload = {
        name: this.ServerIPaddress,
        type: maptype,
        maxUser: this.ServerFrontNumValue,
        instructorId: userId
      }

      var config = Config.config;

      this.$http
        .post(url, payload, config)
        .then(res => {
          console.log(res.data.success);
          if (res.data.success === true) {
            alert("강의실 생성이 완료되었습니다.");
            this.ServerFrontDialog = false;
            this.fetchData();
          } else {
            alert("강의실 이름이 중복되었습니다");
            return;
          }
        })
    },

    ServerFrontDeleteClassModal() {
      this.ServerFrontModalList.splice(this.ServerFrontModalList.length, 1)
    },
    
    empty() {
      this.ServerIpList = "",
      this.ServerTeacherList = "",
      this.ServerSubjectList = ""
    }
  },
}
</script>