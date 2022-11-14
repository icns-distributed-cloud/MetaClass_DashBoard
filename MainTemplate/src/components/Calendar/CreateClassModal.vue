<template>
<v-row>
  <v-col>
    <v-dialog
      v-model="CreateClassModalDialog"
      max-width="600px"
    >
      <v-card>
        <v-col cols="auto">
          <template>
          <v-card>
            <v-toolbar
              :color="CreateClassModalColor"
              dark
            >
              <strong>강좌 생성</strong>
              <v-spacer></v-spacer>
              <v-btn
                icon
                dark
                @click="SetSelectClassActive(CreateClassModalDialog)"
                >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
              <!--강좌명 입력-->
            <div>
              <v-card-text>
                <v-text-field
                  v-model="CreateClassModalTitle"
                  :counter="10"
                  label="강좌명 입력"
                  required
                  prepend-icon="mdi-pencil"
                  outlined
                >
                </v-text-field>    
                <!--강의 시작 날짜 및 시간-->
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-dialog
                      ref="CreateClassModalStartDateDialog1"
                      v-model="CreateClassModalStartDateModal"
                      :return-value.sync="CreateClassModalStartDate1"
                      persistent
                      lazy
                      full-width
                      width="290px"
                      outlined
                    >  
                      <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="CreateClassModalStartDate1"
                        label="강의 시작 날짜 및 시간"
                        outlined
                        readonly
                        prepend-icon="mdi-clock"
                        v-on="on"
                      >
                      </v-text-field>
                      </template>
                      <v-date-picker v-model="CreateClassModalStartDate1" scrollable :min="currentDate">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="CreateClassModalStartDateModal = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="CreateClassModalStartTimeModal = true">OK</v-btn>
                      </v-date-picker> 
                    </v-dialog>

                    <v-dialog
                      ref="CreateClassModalStartTimeDialog2"
                      v-model="CreateClassModalStartTimeModal"
                      :return-value.sync="CreateClassModalStartTime2"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-time-picker
                        v-if="CreateClassModalStartTimeModal"
                        v-model="CreateClassModalStartTime2"
                        full-width
                        :allowed-minutes="allowedInterval"
                        :min="currentTime"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="CreateClassModalStartTimeModal = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="CreateClassModalStartSet()">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                  <!--강의 종료 날짜 및 시간--> 
                  <v-col cols="12" sm="6">
                    <v-dialog
                      ref="CreateClassModalFinishDateDialog3"
                      v-model="CreateClassModalFinishDateModal"
                      :return-value.sync="CreateClassModalFinishDate3"
                      persistent
                      lazy
                      full-width
                      width="290px"
                      outlined
                    >
                      <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="CreateClassModalFinishDate3"
                        label="강의 종료 날짜 및 시간"
                        outlined
                        readonly
                        v-on="on"
                        :disabled="createClassModalFinish"
                      >  
                      </v-text-field>
                      </template>  
                      <v-date-picker v-model="CreateClassModalFinishDate3" scrollable :min="CreateClassModalStartDate1">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="CreateClassModalFinishDateModal = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="CreateClassModalFinishTimeModal = true">OK</v-btn>
                      </v-date-picker> 
                    </v-dialog>

                    <v-dialog
                      ref="CreateClassModalFinishTimeDialog4"
                      v-model="CreateClassModalFinishTimeModal"
                      :return-value.sync="CreateClassModalFinishTime4"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-time-picker
                        v-if="CreateClassModalFinishTimeModal"
                        v-model="CreateClassModalFinishTime4"
                        full-width
                        :min="classStartTime"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="CreateClassModalFinishTimeModal = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="CreateClassModalFinishSet()">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
                <!--강의실 선택-->
                <v-row class="mx-auto">
                  <v-select
                    v-model="selectedMap"
                    :items="maplist"
                    item-text="name"
                    item-value="id"
                    label="강의실 선택"
                    outlined
                    prepend-icon="mdi-domain"
                  >  
                  </v-select>
                  <v-btn
                    @click="CreateClassMapModalDialog = true"
                  >등록</v-btn>
                </v-row>
                <v-dialog
                  v-model="CreateClassMapModalDialog"
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
                    <!--강의실 이름: ClassMapName-->
                    <v-card-text>
                      <v-text-field
                        v-model="ClassMapName"
                        label="강의실 이름"
                        color="white"
                      >
                    </v-text-field>
                    <!--강의실 유형 (type)-->
                    <v-autocomplete
                      v-model="ClassMapType"
                      :items="ClassMapTypeItem"
                      label="강의실 유형"
                      color="white"
                    ></v-autocomplete>     
                    <!--강의실 참여 인원-->
                    <v-text-field
                      v-model="ClassNumValue"
                      label="강의실 참여 인원수"
                      class="numer"
                      :ClassRules="[ClassRules.required, ClassRules.min, ClassRules.max]"
                      type="number"
                      @click:append-outer="ClassIncrement"
                      @click:prepend="ClassDecrement"
                      color="white"
                      required
                    >
                    </v-text-field>                 
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue-grey"
                      @click="CreateClassMapModalDialog = false"
                    >
                      취소
                    </v-btn>
                    <v-btn
                      color="green"
                      @click="CreateClassMap()"
                    >
                      확인
                    </v-btn>
                  </v-card-actions>  
                </v-card>
                </v-dialog>
                <!-- 소속 선택-->
                <v-row class="mx-auto">
                  <v-select
                    v-model="CreateClassModalBelong"
                    :items="CreateClassModalBelongItems"
                    item-text="item_text"
                    item-value="item_value"
                    label="소속 선택"
                    outlined
                    prepend-icon="mdi-domain"
                  >    
                  </v-select> 
                  <v-btn
                    @click="CreateDepartmentModalDialog = true"
                  >등록</v-btn>
                </v-row>
                <v-dialog
                  v-model="CreateDepartmentModalDialog"
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
                      <v-toolbar-title class="front-weight-light">부서 등록</v-toolbar-title>
                    </v-toolbar>
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
                        @click="CreateDepartmentModalDialog = false"
                      >
                        취소
                      </v-btn>
                      <v-btn
                        color="green"
                        @click="CreateDepartment()"
                      >
                        확인
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!--single select-->
                <!-- <v-card class="mx-auto">
                  <v-data-table v-if="showStudents"
                    v-model="selectedStudents"
                    :headers="headers"
                    :items="belongstudents"
                    :single-select="singleSelect"
                    item-key="name"
                    hide-default-footer
                    show-select
                    @click:row="selectstudent()"
                  >
                    <template v-slot:top>
                    <v-switch
                      v-model="singleSelect"
                      label="Single select"
                      class="pa-3"
                    ></v-switch>
                    </template>
                  </v-data-table>
                </v-card> -->
                <!-- 컨텐츠 파일 선택-->
                <v-row class="mx-auto">
                  <v-select
                    v-model="CreateClassModalFile"
                    :items="CreateClassModalFileItem"
                    item-text="item_text"
                    item-value="item_value"
                    label="컨텐츠 파일 선택"
                    prepend-icon="folder_open"
                    outlined
                  >    
                  </v-select>
                  <v-btn>등록</v-btn>
                </v-row> 
                <!-- 퀴즈 선택-->
                <v-row class="mx-auto">
                  <v-select
                    v-model="CreateClassModalQuiz"
                    :items="CreateClassModalQuizItem"
                    label="퀴즈 선택"
                    item-text="item_text"
                    item-value="item_value"
                    prepend-icon="mdi-check"
                    outlined
                  >    
                  </v-select>
                  <v-row class="quiz-button">
                  <QuizCreateModal>퀴즈 등록</QuizCreateModal>
                  </v-row>
                </v-row>
                <!-- 컬러 선택-->
                <v-row class="mx-auto">
                  <v-select
                    v-model="CreateClassModalColor"
                    :items="CreateClassModalColorItem"
                    label="컬러 선택"
                    item-text="item_text"
                    item-value="item_value"
                    prepend-icon="invert_colors"
                    outlined
                  >    
                  </v-select> 
                </v-row>
              </v-card-text>
            </div>
            <!--등록 확인-->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="CreateClass()"
              >등록 확인
              </v-btn>
            </v-card-actions>
          </v-card>
          </template> 
        </v-col>
      </v-card> 
    </v-dialog>
  </v-col>
</v-row> 
</template>

<!--script--->
<script>
import moment from 'moment';
import QuizCreateModal from '../Quiz/QuizCreateModal.vue';
var RestAPIManager = require('../RestAPIManager');
// var CalendarEnum = require("../Enum/CalendarEnum");

export default {
  components: { QuizCreateModal },
  data () {
    return {
      CreateClassModalColorItem: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal','green', 'light-green', 'lime', 'amber'],
      CreateClassModalColor: 'Primary',
      mainDialog: false,
      maplist: [],
      ButtonValue: "",
      selectedMap: "",
      hello: "",

      belongstudents: [],
      singleSelect: false,
      headers: [
        {
          text: "이름",
          align: "start",
          sortable: false,
          value: "name"
        }
      ],

      selectedStudents: [],
      showStudents: false,

      // 강의실 선택
      CreateClassModalDialog: true,
      // 강의실 등록 모달
      CreateClassMapModalDialog: false,
      ClassMapName: "",
      ClassMapType: [],
      ClassMapTypeItem: ['오픈형', '계단식', '소회의실'],  // 강의실 타입
      // 참여 인원수 체크 (참여 인원)   s
      ClassNumValue: 50,
      ClassForm : {
        min: 2,
        max: 10
      },
      ClassRules: {
        required: value => !!value || "Required.",
        min: v => v >= this.ClassForm .min || `The Min is ${this.ClassForm .min}`,
        max: v => v <= this.ClassForm .max || `The Max is ${this.ClassForm .max}`
      },
      ///
      ClassModalList:[],
      // 강의 시작 날짜 및 시간 : CreateClassModalStartDate1
      //CreateClassModalStartDate1: "",
      CreateClassModalStartDateModal: false,
      CreateClassModalStartTime2: "",
      CreateClassModalStartTimeModal: false,
      // 강의 종료 날짜 및 시간 : CreateClassModalFinishDate1
      //CreateClassModalFinishDate3: "",
      CreateClassModalFinishDateModal: false,
      CreateClassModalFinishTime4: "",
      CreateClassModalFinishTimeModal: false, 

      // 소속 선택
      CreateClassModalBelong: "",
      CreateClassModalBelongItems: [],
      BelongStudents: [],
      // 소속 등록 모달
      CreateDepartmentModalDialog: false,
      DepartmentName: "",

      // 컨텐츠 파일 선택
      CreateClassModalFile: "",
      CreateClassModalFileItem: [],  // 컨텐츠 item 선택 
      // 퀴즈 선택
      CreateClassModalQuiz: [],
      CreateClassModalQuizItem: [], // 퀴즈 item 선택
      CreateClassModalTitle: "",
      createClassModalFinish: true,
      classStartTime: "",

      // 시간 시작, 종료 지정
      date: moment().format('YYYY-MM-DD'),
      currentDate: moment().format('YYYY-MM-DD'),
      currentTime: "",
      CreateClassModalStartDate1: moment().format('YYYY-MM-DD'),
      CreateClassModalFinishDate3: moment().format('YYYY-MM-DD'),
    }
  },

  created() {
    this.fetchMapData();
    this.fecthDepartment();
    this.fetchContent();
    this.fetchQuizData();
  },

  watch: {
    CreateClassModalStartDate1() {
      if (this.CreateClassModalStartDate1 === this.currentDate) {
        this.currentTime = moment().format("HH:mm");
      } else {
        this.currentTime = "";
      }
    },

    CreateClassModalFinishDate3() {
      if (this.CreateClassModalFinishDate3 === this.saveStartDate) {
        this.classStartTime = this.CreateClassModalStartTime2;
      } else {
        this.classStartTime = "";
      }
    }
  },

  methods: {
    // 시간 5분 간격으로 나눠질 때 TRUE
    allowedInterval: m => m % 5 == 0,

    selectstudent() {
      console.log(this.selectedStudents)
    },

    mainDialogClose(){
    this.CreateClassModalDialog = false
    },

    // 강의실 생성 시작 date, time
    CreateClassModalStartSet() {
      this.saveStartDate = this.CreateClassModalStartDate1;
      this.CreateClassModalStartDate1 = this.CreateClassModalStartDate1 +" "+ this.CreateClassModalStartTime2;
      this.$refs.CreateClassModalStartDateDialog1.save(this.CreateClassModalStartDate1);
      this.$refs.CreateClassModalStartTimeDialog2.save(this.CreateClassModalStartTime2);
      this.createClassModalFinish = false
    },

    // 강의실 생성 종료 date, time
    CreateClassModalFinishSet() {
      this.CreateClassModalFinishDate3 = this.CreateClassModalFinishDate3 +" "+ this.CreateClassModalFinishTime4;
      this.$refs.CreateClassModalFinishDateDialog3.save(this.CreateClassModalFinishDate3);
      this.$refs.CreateClassModalFinishTimeDialog4.save(this.CreateClassModalFinishTime4);
    },

    show() {
      this.showStudents = true;
    },

    SetSelectClassActive() {
      if(this.CreateClassModalDialog == true) {
        this.CreateClassModalDialog = false;
      }
    },

    ClassIncrement() {
      if (this.ClassNumValue < this.ClassForm .max) {
        this.ClassNumValue = parseInt(this.ClassNumValue, 10) + 1;
      }
    },

    ClassDecrement() {
      if (this.ClassNumValue > this.ClassForm .min) {
        this.ClassNumValue = parseInt(this.ClassNumValue, 10) - 1;
      }
    },

    // 16. Post- http://IPAdress/api/content/post/contentlist
    async fetchContent() {
      var contentlist = await RestAPIManager.API_contentlist(this.$store.getters.getUserInfo.id);
      var CreateClassModalFileItem = [];
      for (const content of contentlist){
        CreateClassModalFileItem.push({
          item_text: content.name,
          item_value: content.id
        });
      }
      this.CreateClassModalFileItem = CreateClassModalFileItem;
    },

    // 27. Get- http://localhost:8088/api/department/get/departmentlist
    async fecthDepartment() {
      var departmentlist = await RestAPIManager.API_departmentlist()
      var CreateClassModalBelongItems = [];
      for (const department of departmentlist.departmentList) {
        CreateClassModalBelongItems.push({
          item_text: department.name,
          item_value: department.id
        });
      }
      this.CreateClassModalBelongItems = CreateClassModalBelongItems;
    },
  
    // 42. Get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1 
    async fetchQuizData() {
      var quizlist = await RestAPIManager.API_quizlist(this.$store.getters.getUserInfo.id)
      var CreateClassModalQuizItem = [];
      for (const quiz of quizlist) {
        CreateClassModalQuizItem.push({
          item_text: quiz.name,
          item_value: quiz.id
        });
      }
      this.CreateClassModalQuizItem = CreateClassModalQuizItem;
    },

    // 7. Post  -  http://IPAdress/api/map/post/maplist 
    async fetchMapData () {
      var maplist = await RestAPIManager.API_maplist("", this.$store.getters.getUserInfo.id);
      this.maplist = maplist;
    },

    // 9. Post - http://IPAdress/api/lecture/instructor/post/createlecture
    async CreateClass() {
      var startdate = new Date(this.CreateClassModalStartDate1+":"+this.CreateClassModalStartTime2).toISOString().split('T');
      var enddate = new Date(this.CreateClassModalFinishDate3+":"+this.CreateClassModalFinishTime4).toISOString().split('T');
      var classInfo = {
        name: this.CreateClassModalTitle,
        mapId: this.selectedMap,
        quizId: this.CreateClassModalQuiz,
        contentId: this.CreateClassModalFile,
        stulist: this.selectedStudents,
        startTime: startdate[0] + ' ' + startdate[1].split('.')[0],
        endTime: enddate[0] + ' ' + enddate[1].split('.')[0]
      };

      if (startdate < enddate) {
        var createlecture = await RestAPIManager.API_createlecture(classInfo, this.$store.getters.getUserInfo.id);
        if (createlecture.res_success === true) {
          alert("강좌 생성이 완료되었습니다.");
          this.CreateClassModalDialog = false;
          this.refreshData();
        } else {
            alert("정확하게 입력해주세요.");
            return;
          }
      } else {
          alert("강의 끝 시간은 시작 시간보다 빠를 수 없습니다.")
      }
      if (this.CreateClassModalBelong === "") {
        alert("부서를 선택하세요.");
        return;
      }
    },

    // 32. post - http://localhost:8088/api/users/post/studentlistbydepartment
    async department() {
      var res_studentlistbydepartment = await RestAPIManager.API_studentlistbydepartment(this.CreateClassModalBelong);
      if (this.belongstudents.length > 0) {
        for (const studentlistbydepartment of res_studentlistbydepartment.res_studentlistbydepartment){
          this.belongstudents.push(studentlistbydepartment)
        }
      }
    },

    // 5. Post - http://IPAdress/api/map/post/createmap
    async CreateClassMap() {
      var maptype = 0;
      if (this.ClassMapType === "오픈형") {
        maptype = 0
      } else if (this.ClassMapType === "계단식") {
        maptype = 1
      } else if (this.ClassMapType === "소회의실") {
        maptype = 2
      } else {
        alert("강의실 유형을 정확하게 입력해주세요.")
        return;
      }

      var createmap = await RestAPIManager.API_createmap(this.ClassMapName, maptype, this.ClassNumValue, this.$store.getters.getUserInfo.id);

      if (createmap.res_success === true) {
        alert("강의실 생성이 완료되었습니다.");
        this.CreateClassMapModalDialog = false;
        this.fetchMapData();
      } else {
        alert("강의실 이름이 중복되었습니다");
        return;
      }
    },

    // 부서 입력 API : 26. Post - http://IPAddress/api/department/post/postdepartment
    async CreateDepartment() {
      var postDepartment = await RestAPIManager.API_postdepartment(this.DepartmentName);
      if (postDepartment.res_success){
        alert("부서 등록 완료");
        this.CreateDepartmentModalDialog = false;
        this.fecthDepartment();
      } else {
        alert(postDepartment.res_message);
        return;
      }
    },
  },
}
</script>

<style>
.quiz-button {
  justify-content: center;
  margin: 0;
}
</style>