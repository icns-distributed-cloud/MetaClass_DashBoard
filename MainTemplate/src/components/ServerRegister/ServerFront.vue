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
        <v-row>
          <v-col
            v-for="(item, index) in ServerFrontModalList"
            :key="index"
            cols="4"
          >
            <Server-Modal v-bind:info="ServerFrontModalList[index]"></Server-Modal>
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
            @click=hello()
          >
            서버 등록
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
              <v-toolbar-title class="font-weight-light"> 서버 등록 </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="ServerName"
                label="서버 이름"
                required
                color="white"
              >
              </v-text-field>
              <v-text-field
                v-model="ServerIPaddress"
                label="아이피 주소"
                required
                color="white"
              >
              </v-text-field>
              <v-text-field
                v-model="ServerMaxUser"
                label="서버 최대 인원수"
                required
                color="white"
              >
              </v-text-field>

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
                @click=ServerFrontRegister()
              >
                확인
              </v-btn>
            </v-card-actions>
            <v-snackbar
              v-model="ServerSaved"
              :timeout="2000"
              absolute
              bottom
              left
            >
              서버 등록이 완료되었습니다.
            </v-snackbar>
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
import ServerModal from './ServerModal.vue';
var RestAPIManager = require('../RestAPIManager');

export default {
  components: { ServerModal },
  data: () => ({
    ServerName : "",
    ServerIPaddress: "",
    ServerMaxUser: "",
    ServerFrontDialog: false,
    ServerTeacherList: [], // 강의자 리스트 
    ServerTeacherListItem: ['손덕인', '최인훈', '노설', '서유리'],  // 강의자 리스트 아이템
    ServerSubjectList: [], // 강좌 리스트
    ServerSubjectListItem: ['수치해석', '네트워크론'], //  강좌 리스트 아이템
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

  async created() {
    await this.fetchData();
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

    deleteIP() {
      this.fetchData();
    },

    hello () {
      this.ServerName = "";
      this.ServerIPaddress = "";
      this.ServerMaxUser = "";
    },

    // 등록한 아이피 리스트 API : 35. Get - http://IPAddress/api/ip/get/list
    async fetchData() {
      var ipListRes = await RestAPIManager.API_iplist();
      
      if (ipListRes.success === true) {
        this.ServerFrontModalList = ipListRes.ipList
      }
    },

    // 아이피 등록 API : 33. Post - http://IPAddress/api/ip/post/create
    async ServerFrontRegister() {
      var createIpRes = await RestAPIManager.API_createip(this.ServerIPaddress, this.ServerName, this.ServerMaxUser)
      
      if (createIpRes.success === true) {
        alert("서버 등룍이 완료되었습니다.");
        this.ServerFrontDialog = false;
        await this.fetchData();
      } else {
        alert("서버 이름이 중복되었습니다");
        return;
      }
      
    },

    ServerFrontDeleteClassModal() {
      this.ServerFrontModalList.splice(this.ServerFrontModalList.length, 1)
    },
  }, 
}
</script>