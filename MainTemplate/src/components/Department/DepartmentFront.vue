<!--Content front-->
<template>
<v-card class="overflow-hidden">
  <v-responsive :aspect-ratio="16/9">
    <v-spacer></v-spacer>
    <!--grey lighten-3 색이 포함된 sheet 늘리기 800-->
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
            v-for="(item, index) in DepartmentModalList"
            :key="index"
            cols="4"
          >
            <Department-Modal v-bind:info="DepartmentModalList[index]"></Department-Modal>
          </v-col>
        </v-row>
      </div>
    <!--스크롤 내리기-->
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
    <!--컨텐츠 등록-->
    <template>
    <!--컨텐츠 등록 우측으로 이동-->
    <div class="text-right">
      <v-col
        cols="12"
        sm="12"
        md="8"
        offset-md="4"
      >
        <v-dialog
          v-model="ContentFrontDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="deep-purple lighten-1"
            dark
            v-bind="attrs"
            v-on="on"
            @click="empty()"
          >
            부서 등록
          </v-btn>  
          </template>
          <!--컨텐츠 등록 팝업창-->
          <v-card
            class="overflow-hidden"
            color="purple lighten-1"
            dark
          >
            <!--상단 컨텐츠 등록-->   
            <v-toolbar
              flat
              color="purple"
            >
              <v-toolbar-title class="front-weight-light">부서 등록</v-toolbar-title> 
            </v-toolbar>
            <!--컨텐츠 이름: ContentFrontMapName-->
            <v-card-text>
              <v-text-field
                v-model="DepartmentName"
                label="부서 이름"
                required
                color="white"
              >
              </v-text-field>
            </v-card-text>                     
            <!--하단 취소, 확인 버튼-->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue-grey"
                    @click="ContentFrontDialog = false"
                >
                    취소
                </v-btn>
                <v-btn
                    color="green"
                    @click="RegisterDepartment()"
                >
                    확인
                </v-btn>
            </v-card-actions>  
          </v-card>
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
import DepartmentModal from './DepartmentModal.vue';
var Config = require("../../config");
var RestAPIURL = require("../../RestAPIURL");

export default {
  components: { DepartmentModal },
  data: () => ({
    contentId: "",

    ContentFrontFiles: [], // v-model=ContentFrontFiles 파일 업로드
    DepartmentName: "", //  이름
    ContentFrontDialog: false, // ContentFrontDialog 선택시, 입력 값
  // ContentFrontModalList
    DepartmentModalList:[],
  }),

  created() {
    this.fetchData();
  },    

  methods: {
    // 부서 리스트 API : 27. Get - http://IPAddress/api/department/get/departmentlist
    fetchData() {
      this.DepartmentModalList = [];

      var url = RestAPIURL.Department.GetDepartmentListAPI;

      var config = Config.config;

      this.$http
        .get(url, config)
        .then(res => {
          if (res.data.data.length > 0) {
            res.data.data.forEach(element => {
              this.DepartmentModalList.push({
                id: element.id,
                name: element.name
              })
            })
          }
        })
    },

    empty() {
      this.DepartmentName = "";
    },

    ContentFrontCreateClassModal()
    {
      this.ContentFrontModalList.push({
        com : DepartmentModal
      })   
      console.log("aaaaaaaaa")
    },

    ContentFrontDeleteClassModal()
    {
      this.ContentFrontModalList.splice(this.ContentFrontModalList.length, 1)
    },

    // 컨텐츠 생성 API : 13. Post - http://IPAddress/api/content/post/createcontent
    Upload() {
      const formData = new FormData();
      formData.append("file", this.ContentFrontFiles[0]);

      var url = RestAPIURL.Content.PostCreateContentAPI;

      var config = Config.config;

      this.$http
        .post(url, formData, config)
        .then(res => {
          console.log(res);
          if (res.data.success === true) {
            this.contentId = res.data.data.contentId;
          } else {
            alert("업로드 실패");
            return;
          }
        })
      console.log(this.ContentFrontFiles);
    },

    // 부서 입력 API : 26. Post - http://IPAddress/api/department/post/postdepartment
    RegisterDepartment() {
      var url = RestAPIURL.Department.PostPostDepartmentAPI;

      var payload = {
          "name" : this.DepartmentName
      }

      var config = Config.config;

      this.$http
          .post(url, payload, config)
          .then((res) => {
              if (res.data.success === true) {
                  alert("부서 등록 완료")
                  this.ContentFrontDialog = false;
              }
          })
          .catch((err) => {
              alert(err);
          })
    },
  },
}
</script>