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
var RestAPIManager = require('../RestAPIManager');

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
    async save() {
      console.log(this.ServerSubjectList)
      var createserverRes = await RestAPIManager.API_createserver(this.ServerSubjectList, this.ServerIpList);

      if (createserverRes.success === true) {
        alert("서버-강좌 등록 완료");
        this.ServerSaved = true;
        this.ServerFrontDialog = false;
        this.fetchData();
      }

    },

    // 등록한 아이피 리스트 API : 35. Get - http://IPAddress/api/ip/get/list
    async fetchIP() {
      var iplistRes = await RestAPIManager.API_iplist();
      for (const ip of iplistRes.ipList) {
        this.ServerIpListItem.push({
          name: ip.address,
          value: ip.id
        })
      }
    },

    // 서버 아이피 등록 시 모든 강사 회원 정보 리스트 API : 31. Get - http://IPAddress/api/users/get/allInstructor
    async fetchTeacher() {
      var instructorlistRes = await RestAPIManager.API_instructorlist();

      for (const instructor of instructorlistRes.instructorList) {
        this.ServerTeacherListItem.push({
          name: instructor.name,
          value: instructor.id
        })
      }
    },

    // 강사가 강좌 예정인 강좌 리스트 API : 20. Get - http://IPAddress/api/server/get/findlectureinfo?instructorId=
    async fetchSubject() {
      this.ServerSubjectListItem = []
      var lecturelistRes = await RestAPIManager.API_findlecture(this.ServerTeacherList);

      for (const lecture of lecturelistRes.lectureList) {
        var time = lecture.lectureStartTime + " ~ " + lecture.lectureEndTime;
        this.ServerSubjectListItem.push({
          name: lecture.lectureName,
          value: lecture.lectureId,
          time: time
        })
      }
    },

    // 서버 아이피 리스트 API : 19. Post - http://IPAddress/api/server/post/listserver
    async fetchData() {
      this.ServerFrontModalList = []
      var serverlistRes = await RestAPIManager.API_serverlist(0)
      console.log(serverlistRes)

      for (const server of serverlistRes.serverList) {
        var time = server.lectureStartTime + " ~ " + server.lectureEndTime;
        this.ServerFrontModalList.push({
          id: server.id,
          ipId: server.ipId,
          ipAddress: server.ipAddress,
          ipName: server.ipName,
          lectureId: server.lectureId,
          lectureName: server.lectureName,
          time: time
        })
      }
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