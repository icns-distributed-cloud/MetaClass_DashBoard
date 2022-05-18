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
              color="light-blue darken-4"
              dark  
            >
            
            <v-toolbar-title>강의실 선택</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
      <!--강의실 A--> 
          <v-col cols="auto">
            <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                > 강의실 A
                </v-btn>
              </template>
              
     <!--강의실 A 클릭 후에 나타나는 page-->
              <template v-slot:default="CreateClassModalDialog">
                <v-card>
                  <v-toolbar
                    color="primary"
                    dark
                  >강의실 생성
                  </v-toolbar>
                  
                  <!--강의실 제목 입력-->
                  <v-card-text>
                    <v-text-field
                      v-model="CreateClassModalTitle"
                      :error-messages="CreateClassModalTitleErrors" 
                      :counter="10"
                      label="강의실 제목 입력"
                      required
                      @input="$v.CreateClassModalTitle.$touch()"
                      @blur="$v.CreateClassModalTitle.$touch()"
                      solo-inverted
                      color="white"
                    >
                    </v-text-field>    
                  
                  
                  <!--강의실 이름 입력-->
                    <v-text-field
                      v-model="CreateClassModalName"
                      :error-messages="CreateClassModalNameErrors"
                      :counter="10"
                      label="강의실 이름 입력"
                      required
                      @input="$v.CreateClassModalName.$touch()"
                      @blur="$v.CreateClassModalName.$touch()"
                      solo-inverted
                      color="white" 
                    ></v-text-field>

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
                          solo-inverted
                        >  
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="CreateClassModalStartDate1"
                              label="강의 시작 날짜 및 시간"
                              solo-inverted
                              color="white"
                              readonly
                              v-on="on"
                            >
                            </v-text-field>
                          </template>
                          <v-date-picker v-model="CreateClassModalStartDate1" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="CreateClassModalStartDateModal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="CreateClassModalStartTimeModal = true">OK</v-btn>
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
                          >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="CreateClassModalStartTimeModal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="CreateClassModalStartSet()">OK</v-btn>
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
                          solo-inverted
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="CreateClassModalFinishDate3"
                              label="강의 종료 날짜 및 시간"
                              solo-inverted
                              color="white"
                              readonly
                              v-on="on"
                            >  
                            </v-text-field>
                          </template>  
                          <v-date-picker v-model="CreateClassModalFinishDate3" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="CreateClassModalFinishDateModal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="CreateClassModalFinishTimeModal = true">OK</v-btn>
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
                          >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="CreateClassModalFinishTimeModal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="CreateClassModalFinishSet()">OK</v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      text
                      color="primary"
                      @click=SetSelectClassActive(CreateClassModalDialog)
                    >Submit
                    </v-btn>
                  </v-card-actions>
                 </v-card>
              </template> 
              <!--강의실 A 클릭 후 sumit 끝 부분-->
            </v-dialog>
           </v-col>
            <v-card-actions>
              <v-spacer></v-spacer> 
              <v-btn
                text
                color="primary"
                @click="CreateClassModalDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
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
            // 강의실 선택
            CreateClassModalDialog: true,
            // 강의 시작 날짜 및 시간 : CreateClassModalStartDate1
            CreateClassModalStartDate1: "",
            CreateClassModalStartDateModal: false,
            CreateClassModalStartTime2: "",
            CreateClassModalStartTimeModal: false,
            // 강의 종료 날짜 및 시간 : CreateClassModalFinishDate1
            CreateClassModalFinishDate3: "",
            CreateClassModalFinishDateModal: false,
            CreateClassModalFinishTime4: "",
            CreateClassModalFinishTimeModal: false,   
            
        }
    },
    methods: {
      // 강의실 생성 시작 date, time
      CreateClassModalStartSet() {
        this.CreateClassModalStartDate1 = this.CreateClassModalStartDate1 +" "+ this.CreateClassModalStartTime2;
        this.$refs.CreateClassModalStartDateDialog1.save(this.CreateClassModalStartDate1);
        this.$refs.CreateClassModalStartTimeDialog2.save(this.CreateClassModalStartTime2);
      },
      // 강의실 생성 종료 date, time
      CreateClassModalFinishSet() {
        this.CreateClassModalFinishDate3 = this.CreateClassModalFinishDate3 +" "+ this.CreateClassModalFinishTime3;
        this.$refs.CreateClassModalFinishDateDialog3.save(this.CreateClassModalFinishDate3);
        this.$refs.CreateClassModalFinishTimeDialog4.save(this.CreateClassModalFinishTime4);
      },

      SetSelectClassActive()
      {
          if(this.CreateClassModalDialog == true)
          {
              this.CreateClassModalDialog = false;
          }
      },
  }
  }
</script>