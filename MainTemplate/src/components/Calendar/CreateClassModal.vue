<template>
  <v-row>
    <v-col>
      <v-dialog
        v-model="CreateClassModalDialog"
        max-width="500px"
      >
      <!--강의실 상단 box-->
        <v-card>
            <v-toolbar
              class="overflow-hidden mx-auto"
              color="primary"
              dark  
            >
            
            <v-toolbar-title><strong>강의실 선택</strong></v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn
              icon
              dark
              @click="mainDialogClose()"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-toolbar>
          <!--강의실 A--> 
          <v-col cols="auto">
            <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
              v-model="mainDialog"
            >
            <!--<v-list>
              <v-list-item
                v-for="(item, index) in maplist"
                :key=index
              > <v-btn>{{ item.id }}</v-btn>
              </v-list-item>
            </v-list>-->
              <template v-slot:activator="{ on, attrs }">
                
                <v-list>
                  <v-list-item
                    v-for="(item, index) in maplist"
                    :key=index,
                  > 
                  <v-btn
                    width="98%"
                    color="grey lighten-2"
                    v-bind="attrs"
                    v-on=on
                    @click="selectedMap=item.id"
                  >{{ item.name }}: {{ item.typename }}/{{ item.maxUser }}명</v-btn>
                  </v-list-item>
                </v-list>
              </template>
              
              <!--강의실 A 클릭 후에 나타나는 page-->
              <template v-slot:default="CreateClassModalDialog">
                <v-card>
                  <v-toolbar
                    :color="CreateClassModalColor"
                    dark
                  ><strong>강좌 생성</strong>
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

                    <!-- 소속 선택-->
                    <div>
                      <v-select
                        v-model="CreateClassModalBelong"
                        :items="CreateClassModalBelongItems"
                        item-text="item_text"
                        item-value="item_value"
                        label="소속 선택"
                        @change="test()"
                        outlined
                        prepend-icon="mdi-domain"
                      >    
                      </v-select> 
                    </div>
                    
                    <!--single select-->
                    <v-card class="mx-auto">
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
                    </v-card>
                 

                    <!-- 컨텐츠 파일 선택-->
                    <div>
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
                    </div> 
                    
                    <!-- 퀴즈 선택-->
                    <div>
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
                    </div> 
              

                  <!-- 컬러 선택-->
                    <div>
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
                    </div> 
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
              <!--강의실 A 클릭 후 sumit 끝 부분-->
            </v-dialog>
           </v-col>
            
         </v-card> 
      </v-dialog>
    </v-col>
  </v-row> 
</template>




<!--script--->
<script>
  export default {
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
            date: this.$moment().format('YYYY-MM-DD'),
            currentDate: this.$moment().format('YYYY-MM-DD'),
            currentTime: "",
            CreateClassModalStartDate1: this.$moment().format('YYYY-MM-DD'),
            CreateClassModalFinishDate3: this.$moment().format('YYYY-MM-DD'),

            
            
            // 콘텐츠 파일 첨부
            //CreateClassModalFiles: [],
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
          this.currentTime = this.$moment().format("HH:mm");
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

      // API 16. 컨텐츠 목록 Post- http://IPAdress/api/content/post/contentlist
      fetchContent() {
        var url = "http://163.180.117.47:8088/api/content/post/contentlist"; 

        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          instructorId: userId
        }

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        this.$http
          .post(url, payload, config)
          .then(res => {
            this.CreateClassModalFileItem.push({
              item_value: null,
              item_text: "컨텐츠 없음"
            })
            if (res.data.data.length > 0) {
              res.data.data.forEach(element => {
                this.CreateClassModalFileItem.push({
                  item_text: element.name,
                  item_value: element.id
                })
              })
            }
          })
       },

      fecthDepartment() {
        var url = "http://163.180.117.47:8088/api/department/get/departmentlist";

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        this.$http
          .get(url, config)
          .then(res => {
            if (res.data.data.length > 0) {
              res.data.data.forEach(element => {
                this.CreateClassModalBelongItems.push({
                  item_text: element.name,
                  item_value: element.id
                })
              })
            }
          })
      },
      
      // API 42. 퀴즈 리스트 get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1 
      fetchQuizData() {
        var userId = this.$store.getters.getUserInfo.id;
        var url = "http://163.180.117.47:8088/api/quiz/get/list?instructorId=" + userId;

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        this.$http
          .get(url, config)
          .then(res => {
            this.CreateClassModalQuizItem.push({
              item_value: null,
              item_text: "퀴즈 없음"
            })
            if (res.data.data.length >0) {
              res.data.data.forEach(element => {
                this.CreateClassModalQuizItem.push({
                  item_text: element.name,
                  item_value: element.id
                })
              })
            }
          })
      },
     
      fetchMapData() {
        this.maplist = [];

        var url = "http://163.180.117.47:8088/api/map/post/maplist";
        
        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          instructorId: userId
        }

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        this.$http
          .post(url, payload, config)
          .then(res => {
            if (res.data.data.length > 0) {
              res.data.data.forEach(element => {
                var maptype = ""
                if (element.type === 0) {
                  maptype = "오픈형";
                } else if (element.type ===1){ 
                  maptype = "계단식";
                } else if (element.type === 2) {
                  maptype = "소회의실";
                }
                this.maplist.push({
                  id: element.id,
                  name: element.name,
                  type: element.type,
                  maxUser: element.maxUser,
                  typename: maptype
                })
              })
            }


          })
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
        console.log(this.showStudents);
      },

      SetSelectClassActive()
      {
        console.log(this.CreateClassModalFile);
          if(this.CreateClassModalDialog == true)
          {
              this.CreateClassModalDialog = false;
          }
      },

      // 강좌 생성 : 9. Post - http://IPAdress/api/lecture/instructor/post/createlecture 
      CreateClass() {
        if (this.CreateClassModalBelong === "") {
          alert("부서를 선택하세요.");
          return;
        } else {
          console.log("wler");
        }
        var url = "http://163.180.117.47:8088/api/lecture/instructor/post/createlecture"

        var userId = this.$store.getters.getUserInfo.id;

        var studentlist = []
        this.selectedStudents.forEach(element => {
          studentlist.push({
            studentId: element.studentId
          })
        })
        
        var payload = {
          quizId: this.CreateClassModalQuiz,
          name: this.CreateClassModalTitle,
          instructorId: userId,
          mapId: this.selectedMap,
          contentId: this.CreateClassModalFile,
          stulist: studentlist,
          startTime: this.CreateClassModalStartDate1+":00",
          endTime: this.CreateClassModalFinishDate3+":00"
        }

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        var startdate = new Date(this.CreateClassModalStartDate1+":00");
        var enddate = new Date(this.CreateClassModalFinishDate3+":00");
        if (startdate < enddate) {
          this.$http
          .post(url, payload, config)
          .then(res => {
            if (res.data.success === true) {
              alert("강좌 생성이 완료되었습니다.");
              this.CreateClassModalDialog = false;
              this.$parent.refreshData();
            } else {
              alert("정확하게 입력해주세요.");
              return;
            }
          })
        }
            else {
              alert("강의 끝 시간은 시작 시간보다 빠를 수 없습니다.")
          }

      },

      test() {
        this.belongstudents = []
        
        console.log(this.CreateClassModalBelong);
        var url = "http://163.180.117.47:8088/api/users/post/studentlistbydepartment";

        var payload = {
          departmentId: this.CreateClassModalBelong
        }

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        this.$http
          .post(url, payload, config)
          .then(res => {
            if (res.data.data.length > 0) {
              res.data.data.forEach(element => {
                this.BelongStudents.push({
                  studentId: element.studentId
                })
                this.belongstudents.push({
                  name: element.studentName,
                  studentId: element.studentId
                })
                
              })
              console.log(this.belongstudents);
              this.showStudents = true;
            }
            
            
            
          })

      }
  }
  }
</script>