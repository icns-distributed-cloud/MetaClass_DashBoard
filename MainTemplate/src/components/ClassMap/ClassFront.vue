<!--Class front-->
<template>
<v-container fluid>
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
                v-for="(item, index) in ClassFrontModalList"
                :key="index"
                cols="4"
              >
                <ClassMap-Modal v-bind:info="ClassFrontModalList[index]"></ClassMap-Modal>
              </v-col>
              
            </v-row>
    </div>
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
    
    <!--강의실 등록-->
    <template>
        <!--강의실 등록 우측으로 이동-->
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

                    <!--강의실 등록 팝업창-->
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

                        <!--강의실 이름: ClassFrontMapName-->
                        <v-card-text>
                          <v-text-field
                            v-model="ClassFrontMapName"
                            label="강의실 이름"
                            color="white"
                          >
                          </v-text-field>
                          <!--강의실 유형 (type)-->
                          <v-autocomplete
                            v-model="ClassFrontMapType"
                            :items="ClassFrontMapTypeItem"
                            label="강의실 유형"
                            color="white"
                          ></v-autocomplete>     
                          <!--강의실 참여 인원-->
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
                <!--강의실 등록 입력이 스크롤창 위로 보이도록 조정-->
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
import ClassMapModal from './ClassMapModal.vue'

  export default {
    //props: ['ClassFrontMapName', 'ClassFrontMapType', 'ClassFrontNumValue'],

  components: { ClassMapModal },
    data: () => ({
    
      ClassFrontMapName: "",
      ClassFrontDialog: false,
      ClassFrontMapType: [],
      ClassFrontMapTypeItem: ['오픈형', '계단식', '소회의실'],  // 강의실 타입

     // 참여 인원수 체크 (참여 인원)   s
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
      ModalInfo: []
    }),
    ClassFrontMapType: "ClassFront",

  created() {
    this.fetchData();
  },


  methods: {
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
      this.fetchData();
    },
  
   
    fetchData() {
      // var vm = this;
      this.ClassFrontModalList = [];
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
              this.ClassFrontModalList.push({
                id: element.id,
                maxUser: element.maxUser,
                name: element.name,
                type: element.type
              })
            })
          }
          console.log(this.ClassFrontModalList);
          
          // console.log(this.ClassFrontModalList[0]);
        })
        

    },


      ClassFrontCreateClassModal()
      {
        var url = "http://163.180.117.22:8088/api/map/post/createmap";
        var maptype = 0;
        if (this.ClassFrontMapType === "오픈형") {
          maptype = 0
        } else if (this.ClassFrontMapType === "계단식") {
          maptype = 1
        } else if (this.ClassFrontMapType === "소회의실") {
          maptype = 2
        } else {
          alert("강의실 유형을 정확하게 입력해주세요.")
          console.log(maptype);
          return;
        }
         
        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          name: this.ClassFrontMapName,
          type: maptype,
          maxUser: this.ClassFrontNumValue,
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
            if (res.data.success === true) {
              alert("강의실 생성이 완료되었습니다.");
              this.ClassFrontDialog = false;
              this.fetchData();
            } else {
              alert("강의실 이름이 중복되었습니다");
              return;
            }
          }) 
      },

      ClassFrontDeleteClassModal()
      {
        this.ClassFrontModalList.splice(this.ClassFrontModalList.length, 1)
      },
  },
  
  }
</script>