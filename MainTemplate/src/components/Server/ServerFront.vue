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
                           v-model="ServerIPaddress"
                           :counter="10"
                           label="IP 주소"
                           required
                           color="white"
                          >
                          </v-text-field>
                          <v-autocomplete
                            v-model="ServerTeacherList"
                            :items="ServerTeacherListItem"
                            label="강의자 리스트"
                            color="white"   
                          ></v-autocomplete>
                          <v-autocomplete
                            v-model="ServerSubjectList"
                            :items="ServerSubjectListItem"
                            label="강좌 리스트"
                            color="white"   
                          ></v-autocomplete>
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
                            @click=save()
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
                <!--서버 등록 입력이 스크롤창 위로 보이도록 조정-->
                <v-container style="height: 20px;"></v-container>
            </v-col>
        </div>
    </template>
    </v-responsive>        
  </v-card>
</template>




<!------script-------->

<script>
import ServerModal from './ServerModal.vue'

  export default {
  components: { ServerModal },
    data: () => ({
      
      ServerIPaddress : "",
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

  created() {
    this.fetchData();
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
    deleteMap() {
      this.fetchData();
    },
    save () {
        this.ServerSaved = true
      },
  
   
    fetchData() {
      // var vm = this;
      this.ServerFrontModalList = [];
      var url = "http://163.180.117.22:8088/api/map/post/maplist";

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
        .then((res) => {
          // console.log(res);
          if (res.data.data.length > 0) {
            res.data.data.forEach(element => {
              this.ServerFrontModalList.push({
                id: element.id,
                maxUser: element.maxUser,
                name: element.name,
                type: element.type
              })
            })
          }
          console.log(this.ServerFrontModalList);
          
          // console.log(this.ServerFrontModalList[0]);
        })
        

    },


      ServerFrontCreateClassModal()
      {
        var url = "http://163.180.117.22:8088/api/map/post/createmap";
        var maptype = 0;
        if (this.ServerTeacherList === "손덕인") {
          maptype = 0
        } else if (this.ServerTeacherList === "최인훈") {
          maptype = 1
        } else if (this.ServerTeacherList === "노설") {
          maptype = 2
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

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

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

      ServerFrontDeleteClassModal()
      {
        this.ServerFrontModalList.splice(this.ServerFrontModalList.length, 1)
      },
  },
  
  }
</script>