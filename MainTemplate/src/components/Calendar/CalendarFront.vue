<template>
    <v-col style="background-color: #f8f9fc;">
        <v-toolbar
          flat
        >
          <v-tabs
            dark
            background-color="light-blue lighten-3"
            grow
          >
            <v-tab>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="CalendarFrontSetToday"
              >
                Today
              </v-btn>
            </v-tab>
            <v-tab>
               <!--중간상단 날짜 Prev -->
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="prev"
              >
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <!--중간상단 오늘의 날짜 -->
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }} 
              </v-toolbar-title>
             <!--중간상단 날짜 Next-->
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="next"
              >
                <v-icon small>
                  mdi-chevron-right
                </v-icon>  
              </v-btn>
              </v-tab>
              <!--우측상단 month-->
              <v-tab>
              <v-menu
                bottom
                right
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ CalendarFrontTypeToLabel[CalendarFrontType] }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>  
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="CalendarFrontType = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="CalendarFrontType = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="CalendarFrontType = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                </v-list>  
              </v-menu>
            </v-tab>   
          </v-tabs>
        </v-toolbar>
    <!--캘린더 전체 sheet 상하(위-아래)사이즈 조절 -->
    <!--원래 사이즈 600에서 850으로 변경-->
    <!--:events="CalendarFrontEvents" 이벤트: 시간, 과목-->
      <v-sheet height="850">
        <v-calendar
          ref="calendar"
          v-model="CalendarFrontFocus"
          color="primary"
          :events="CalendarFrontEvents" 
          :event-color="CalendarFrontGetEventColor"
          :type="CalendarFrontType"
          @click:event="CalendarFrontShowEvent"
          @click:more="CalendarFrontViewDay"
          @click:date="CalendarFrontViewDay"
          @change="CalendarFrontUpdateRange"
          font-weight-black
          interval-height="96"
        ></v-calendar>
        <!--class="test-css black--text"-->
       

        <!--event 클릭 시 나타나는 화면--> 
     
        <v-menu
          v-model="CalendarFrontSelectedOpen"
          :close-on-content-click="false"
          :activator="CalendarFrontSelectedElement"
          offset-x
          CalendarFrontUpdateRange
        >
        
        <!---->
          <v-card
            color="grey lighten-4"
            min-width="300px"
            flat
          >
            <v-toolbar
              :color="CalendarFrontSelectedEvent.color"
              dark
              flat
            >
              <v-toolbar-title v-html="CalendarFrontSelectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <!--강좌 생성에 따른 펜 생성-->
              <v-btn
                dark
                color="blue-grey"
                fab
                small
                @click="editAllItem()"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-toolbar>
            <!--캘린더에서 이벤트(과목)을 클릭 했을 때, 나타나는 '전체'화면-->
            
            <template>
              <v-row>
                <v-col>
                 
                  <v-dialog
                    v-model="CreateClassModalDialog"
                    max-width="500px"
                  >
                    <!--강좌명 수정-->
                    <template>
                      <v-card>
                        <v-toolbar
                          color="primary"
                          dark
                        >강좌명 수정
                        </v-toolbar>
                        
                        <!--강좌명-->
                        <div>
                        <v-card-text>
                          <v-text-field
                            v-model="editLectureName"
                            :counter="10"
                            label="강좌명"
                            required
                            solo-inverted
                            color="white"
                          >
                          </v-text-field>   
                        </v-card-text> 
                        </div>
                        <!--창 닫기/ 생성-->
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="saveLectureName()"
                          >등록 확인
                          </v-btn>
                          <v-btn
                            color="primary"
                            text
                            @click="closeLectureName()"
                          >닫기
                          </v-btn>

                        </v-card-actions>
                        </v-card>
                    </template> 
                    <!--강의실 A 클릭 후 sumit 끝 부분-->
                  </v-dialog>
               
                  </v-col>      
              </v-row> 
            </template>

            <!--footer-->            
            <!--v-data table-->
            <v-data-table
              :headers="headers"
              :items="CalendarFrontSelectedEvent.showevent"
              class="elevation-1"
              hide-default-footer
            >
              <template v-slot:top>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <v-card>
                    <!--
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>-->

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.CalendarClassnameTitle"
                              label="강의 정보"
                              solo
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.CalendarClassnameAction"
                              label="강의 상세정보"
                            ></v-text-field>
                          </v-col>
                         
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        닫기
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        확인
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="popupStartTime()"
                  v-if="isStartTime(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="popupEndTime()"
                  v-else-if="isEndTime(item)"
                >
                  mdi-pencil
                </v-icon>

                <v-icon
                  small
                  class="mr-2"
                  @click="popupLecturelist()"
                  v-else-if="isLecturename(item)"
                >
                  mdi-pencil
                </v-icon>

                <!--참여인원수 : 회원(학생)리스트-->
                <v-icon
                  small
                  class="mr-2"
                  @click="popupStudentList()"
                  v-else-if="isStudentList(item)"
                >
                  mdi-pencil
                </v-icon>

                <!--컨텐츠 펜 아이콘-->
                <v-icon
                  small
                  class="mr-2"
                  @click="popupContentList()"
                  v-else-if="isContent(item)"
                >
                  mdi-pencil
                </v-icon>
                
                <!--퀴즈 펜 아이콘-->
                <v-icon
                  small
                  class="mr-2"
                  @click="popupQuizList()"
                  v-else-if="isQuiz(item)"
                >
                  mdi-pencil
                </v-icon>

                

              </template>
            </v-data-table>


            <!--전체 강의실 선택하는 부분 (추가)-->
            <v-dialog
              v-model="popupMaplistDialog"
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
                    <v-btn
                    icon
                    dark
                    @click="closeClassList"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <!--강의실 A--> 
                <v-col cols="auto">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in maplist"
                          :key=index
                        > 
                        <v-btn
                          width=98%
                          color="light-blue lighten-2"
                          v-bind="attrs"
                          v-on=on
                          @click="Setmapdata(item)"
                        >{{ item.name }}: {{ item.typename }}/{{ item.maxUser }}명</v-btn>
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-dialog>
                </v-col>
              </v-card>
            </v-dialog>

             <!-- 참여 인원수 dialog-->
            <v-dialog
              v-model="popupStudentListDialog"
              max-width="500px"
            >
            <!--강의실 상단 box-->
              <v-card>
                  <v-toolbar
                    class="overflow-hidden mx-auto"
                    color="light-blue darken-4"
                    dark  
                  >
                  
                  <v-toolbar-title>참여자 정보</v-toolbar-title>
                  <v-spacer></v-spacer>
                    <v-btn
                    icon
                    dark
                    @click="closeStudentList"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <!--참여자 정보 리스트--> 
                <v-col cols="auto">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                  >
                   <!--v-data table-->
                    <v-data-table
                      :headers="headers"
                      :items="CalendarFrontSelectedEvent.showevent"
                      class="elevation-1"
                      hide-default-footer
                    >
        
                    </v-data-table>
                    
                  </v-dialog>
                </v-col>
              </v-card>
            </v-dialog>



           <!-- 컨텐츠 dialog-->
            <v-dialog
              v-model="popupContentListDialog"
              max-width="500px"
            >
            <!--강의실 상단 box-->
              <v-card>
                  <v-toolbar
                    class="overflow-hidden mx-auto"
                    color="light-blue darken-4"
                    dark  
                  >
                  
                  <v-toolbar-title>컨텐츠 선택</v-toolbar-title>
                  <v-spacer></v-spacer>
                    <v-btn
                    icon
                    dark
                    @click="closeContentsList"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <!--컨텐츠 이름--> 
                <v-col cols="auto">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in contentlist"
                          :key=index
                        > 
                        <v-btn
                          width="98%"
                          color="light-blue lighten-2"
                          v-bind="attrs"
                          v-on=on
                          @click="SetContentData(item)"
                        >{{ item.name }}</v-btn>
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-dialog>
                </v-col>
              </v-card>
            </v-dialog>

            <!-- 퀴즈 dialog-->
            <v-dialog
              v-model="popupQuizListDialog"
              max-width="500px"
            >
            <!--퀴즈 상단 box-->
              <v-card>
                  <v-toolbar
                    class="overflow-hidden mx-auto"
                    color="light-blue darken-4"
                    dark  
                  >
                  
                  <v-toolbar-title>퀴즈 선택</v-toolbar-title>
                  <v-spacer></v-spacer>
                    <v-btn
                    icon
                    dark
                    @click="closeQuizList"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <!--퀴즈 이름--> 
                <v-col cols="auto">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in quizlist"
                          :key=index
                        > 
                        <v-btn
                          width="98%"
                          color="light-blue lighten-2"
                          v-bind="attrs"
                          v-on=on
                          @click="SetQuizData(item)"
                        >{{ item.name }}</v-btn>
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-dialog>
                </v-col>
              </v-card>
            </v-dialog>






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
            
              <v-date-picker v-model="CreateClassModalStartDate1" scrollable :min="CreateClassModalFinishDate3">
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
            <!--:allowed-minutes="allowedInterval" -->
              <v-time-picker
                v-if="CreateClassModalStartTimeModal"
                v-model="CreateClassModalStartTime2"
                full-width
                :allowed-minutes="allowedInterval"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="CreateClassModalStartTimeModal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="setStartTime()">OK</v-btn>
              </v-time-picker>
            </v-dialog>


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
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="CreateClassModalFinishTimeModal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="setEndTime()">OK</v-btn>
              </v-time-picker>
            </v-dialog>
        
           <span v-html="CalendarFrontSelectedEvent.details"></span>
            <!--캘린더에서 이벤트(과목)을 클릭 했을 때, 나타나는 '전체'화면에서 가장 "하단"-->

            <v-list two-line color="grey lighten-3">
            <v-card-actions>
              <v-spacer></v-spacer>
             
               <!--강의 메세지 전송-->
              <v-btn
                color="teal darken-4"
                class="ma-2 white--text"
                @click="popUpCalendarFrontMessage()"
              >
                강의 메세지 전송
                <v-icon
                  right
                  dark
                >
                  mdi-email
                </v-icon>
              </v-btn>

              <!--강의 메세지 전송 클릭 후 dialog-->
            <template>
              <v-row>
                <v-col>
                  <v-dialog
                    v-model="CalendarFrontMessageDialog"
                    max-width="500px"
                  >
                    <v-card
                      color="grey lighten-4"
                      min-width="300px"
                      flat
                    >
                      <v-toolbar
                        :color="CalendarFrontSelectedEvent.color"
                        dark
                        flat
                      >
                        <v-toolbar-title v-html="CalendarFrontSelectedEvent.name"></v-toolbar-title>
                        <v-spacer></v-spacer>


                        <!--강의 메시지 전송 dialog 닫기 버튼-->
                        <v-btn
                          icon
                          dark
                          @click="closeCalendarFrontMessage"
                        >
                          <v-icon>
                            mdi-close
                          </v-icon>
                        </v-btn>
                      </v-toolbar>

                      <v-card-title>
                        <v-container fluid>
                          <v-textarea
                            filled
                            auto-grow
                            rows="4"
                            row-height="30"
                            shaped
                            clearable
                            clear-icon="mdi-close-circle"
                            label="내용을 입력해주세요."
                            v-model="MessageContext"
                          ></v-textarea>
                        </v-container>
                      </v-card-title>

                      <!--강의 메세지 전송 내용입력 아래에 있는 강의 메세지-->
                      <v-card-subtitle>
                        <v-row class="ma-2" justify="center">
                          <v-card-actions> 
                            <v-btn
                              color="teal darken-4"
                              class="ma-2 white--text"
                              large
                              @click="appendCalendarFrontMessage()"
                            >
                              <h3>강의 메세지 전송</h3>
                              <v-icon
                                right
                                dark
                              >
                                mdi-email
                              </v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-row>

                        <!--이메일, sms 문자-->
                        <v-card-actions>
                          <v-row class="ma-2" justify="space-around">
                            <v-checkbox
                              v-model="emailClick"
                              color="blue darken-1"
                            >
                              <template v-slot:label>
                                <h3>이메일</h3>
                              </template>
                            </v-checkbox>
                        
                            <v-checkbox
                              v-model="messageClick"
                              color="blue darken-1"
                            >
                              <template v-slot:label>
                                <h3>SMS 문자</h3>
                              </template>
                            </v-checkbox>
                          </v-row>
                        </v-card-actions>
                      </v-card-subtitle>
                      
               
          
                    </v-card>

                  <!--캘린더에서 이벤트(과목)을 클릭 했을 때, 나타나는 '전체'화면-->
            
                    <!--강의실 A 클릭 후 sumit 끝 부분-->
                  </v-dialog>
                </v-col>
              </v-row>
            </template>
               


              </v-card-actions>
            </v-list>
            
            
       
            <!--test-->

             <v-list two-line color="grey lighten-3">
                 <v-card-actions>
              <v-spacer></v-spacer>
              <!--유리추가: 수정 클릭 시 item-->
              <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                color="green"
                @click="CalendarFrontSelectedOpen(item)"
              >
                수정
              </v-btn>
              </template>
              <v-btn
                color="indigo lighten-3"
                @click="patchEditedClass(CalendarFrontSelectedEvent)"
              >
                강의 수정
              </v-btn>

              <v-btn
                color="indigo lighten-3"
                @click="ClassDelete(CalendarFrontSelectedEvent)"
              >
                강의 취소
              </v-btn>
              
            </v-card-actions>
            </v-list>

          </v-card>
        </v-menu>
      </v-sheet>
    

      <!--하단 버튼 클릭-->
      <div class="text-right">
        <v-btn
          fab
          color="light-blue accent-2"
          right
          absolute
          @click="CalendarFrontSetActivePopup(CreateClassModal)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      
      <!--create-class-modal-->
      <create-class-modal
      v-if="CreateClassModal"
      @close="
      CreateClassModal = false;"
      />

    </v-col>
</template>


<!--script-->
<script>
import CreateClassModal from './CreateClassModal.vue' // CreateClassModal

  export default {
    components: { CreateClassModal },
    data: () => ({
      //test
      dialog: false,
      popupMaplistDialog: false,
      popupStudentListDialog: false, // 학생 리스트
      popupContentListDialog: false, // 컨텐츠 리스트
      popupQuizListDialog: false, // 퀴즈 리스트
      dialogDelete: false,

      CreateClassModalDialog: false,

      //CreateClassModalStartDate1: "",
      CreateClassModalStartDateModal: false,
      CreateClassModalStartTime2: "",
      CreateClassModalStartTimeModal: false,
      // 강의 종료 날짜 및 시간 : CreateClassModalFinishDate1
      //CreateClassModalFinishDate3: "",
      CreateClassModalFinishDateModal: false,
      CreateClassModalFinishTime4: "",
      CreateClassModalFinishTimeModal: false, 
      // 강의 메세지 전송 dialog 닫기 버튼
      CalendarFrontMessageDialog: false,
      // 이메일 클릭(선택) 
      emailClick: false,
      // 메세지 클릭(선택) 
      messageClick: false,
      // 메세지 내용
      MessageContext:"",

      // 시간 시작, 종료 지정
      date: new Date().toISOString().substr(0, 10),
      CreateClassModalStartDate1: new Date().toISOString().substr(0, 10),
      CreateClassModalFinishDate3: new Date().toISOString().substr(0, 10),


      maplist: [],
      studentlist: [], // 학생 리스트
      contentlist: [], // 컨텐츠 리스트
      quizlist: [], // 퀴즈 리스트

      editLectureName: "",
      headers: [
        {
          text: '강의 정보', 
          align: 'start',
          value: 'CalendarClassnameTitle',
          sortable: false
        },
        {  text: '강의 상세정보', value: 'CalendarClassnameAction', sortable: false }, // 
        {  text: '정보 수정 ', value: 'actions', sortable: false }, // 
    
      ],
      
      editedIndex: -1,
      editedItem: {
        CalendarClassnameTitle: '',
        CalendarClassnameAction: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },

      computed: {
    },

    created () {
      this.initialize()
       },

      //test 끝
      
      beforestart: "",
      beforeend: "",
      CalendarFrontFocus: '',
      CalendarFrontType: 'month',
      CalendarFrontTypeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
      },
      CalendarFrontSelectedEvent: {},
      CalendarFrontSelectedElement: null,
      CalendarFrontSelectedOpen: false,
      CalendarFrontEvents: [],
      CalendarFrontColors: ['green', 'red lighten-1'], // 색도 랜덤 값
      CalendarFrontNames: ['과목명'], // 캘린더에서 과목을 클릭 했을 때, 나타나는 과목명 // 랜덤 값 추출
      CreateClassModal : false, //  CreateClassModal 
    

   
      // 과목명 안에 있는 card-text 시작
      selected: [2],
      CalendarClassnameItemS: [
        {
          CalendarClassnameAction: '2022-08-25, 13:00',
          CalendarClassnameTitle: '강의 시작 일자',
        },
        {
          CalendarClassnameAction: '2022-08-25, 15:00',
          CalendarClassnameTitle: '강의 끝 일자',
        },
        {
          CalendarClassnameAction: '홍길동',
          CalendarClassnameTitle: '강의자',
        },
        {
          CalendarClassnameAction: '계단식',
          CalendarClassnameTitle: '강의 타입',
        },
        {
          CalendarClassnameAction: '그룹 A',
          CalendarClassnameTitle: '소속',
        },
        {
          CalendarClassnameAction: '100/300',
          CalendarClassnameTitle: '참여 인원수',
        },
        ]
    }),
    
    // 강의 메세지 전송
    watch: {
      popUpCalendarFrontMessage () {
        const l = this.popUpCalendarFrontMessage
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.popUpCalendarFrontMessage = null
      },
    },
   // CalendarFront
    name: "CalendarFront", // CalendarFront

    mounted () {
      this.$refs.calendar.checkChange()
    },

    methods: {
      // 시간 5분 간격으로 나눠질 때 TRUE
      allowedInterval: m => m % 5 == 0,
      // CalendarFrontMessageDialog
      popUpCalendarFrontMessage() {
        this.CalendarFrontMessageDialog= true

      },
      // CalendarFrontMessageDialog
      closeCalendarFrontMessage() {
        this.CalendarFrontMessageDialog= false 
        },

  


      //test
      initialize () {
        this.showevent = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          ]
      },
      editItem (item) {
        this.editedIndex = this.CalendarFrontSelectedEvent.showevent.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      isStartTime(item) {
        if (this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 0){
          return true
        } else {
          return false
        }
      },
      isEndTime(item) {
        if (this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 1) {
          return true
        } else {
          return false
        }
      },
      checkIndex(item){
        if(2 <= this.CalendarFrontSelectedEvent.showevent.indexOf(item)){
          return false
        }
        else{return true}
      },
      isLecturename(item){
        if(3 === this.CalendarFrontSelectedEvent.showevent.indexOf(item)){
          return true
        }
        else{return false}
      },

       // 참여 인원수 (펜)
      isStudentList(item) {
        if(this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 5) {
          return true
        } else {
          return false
        }
      },

      // 컨텐츠 (펜)
      isContent(item) {
        if(this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 6) {
          return true
        } else {
          return false
        }
      },
      
      // 퀴즈 (펜)
       isQuiz(item) {
        if(this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 7) {
          return true
        } else {
          return false
        }
      },

      popupStartTime() {
        this.CreateClassModalStartDateModal = true
      },
      popupEndTime() {
        this.CreateClassModalFinishDateModal = true
      },
      popupLecturelist() {
        this.fetchMapData()
        this.popupMaplistDialog = true
      },

      // 학생 리스트
      popupStudentList() {
        this.fetchStudentData()
        this.popupStudentListDialog = true
      },
      closeStudentList(){
        this.popupStudentListDialog = false
      },

      // 컨텐츠
      popupContentList() {
        this.fetchContentData()
        this.popupContentListDialog = true
      },
      closeContentsList(){
        this.popupContentListDialog = false
      },

      // 강의실 이름 수정할 때, 강의실 선택 창 닫기 
      closeClassList() {
        this.popupMaplistDialog = false
      },

      // 퀴즈
      popupQuizList() {
        this.fetchQuizData()
        this.popupQuizListDialog = true
      },
      closeQuizList(){
        this.popupQuizListDialog = false
      },



      Setmapdata(item){
        this.CalendarFrontSelectedEvent.showevent[3].CalendarClassnameAction = item.name
        this.CalendarFrontSelectedEvent.showevent[4].CalendarClassnameAction = item.typename
        this.CalendarFrontSelectedEvent.showevent[5].CalendarClassnameAction = this.CalendarFrontSelectedEvent.showevent[5].CalendarClassnameAction.slice(0, 1) + "/" + item.maxUser
        this.CalendarFrontSelectedEvent.mapId = item.id;
        this.popupMaplistDialog=false
        this.CalendarFrontSelectedOpen=false
        this.CalendarFrontSelectedOpen=true
      },
      // 컨텐츠 수정본 저장
      SetContentData(item) {
        this.CalendarFrontSelectedEvent.showevent[6].CalendarClassnameAction = item.name
        this.CalendarFrontSelectedEvent.contentId = item.id
        this.popupContentListDialog=false
      },

      // 퀴즈 수정본 저장
       SetQuizData(item) {
        this.CalendarFrontSelectedEvent.showevent[7].CalendarClassnameAction = item.name
        this.CalendarFrontSelectedEvent.quizId = item.id
        this.popupQuizListDialog=false
      },


      setStartTime() {
        this.CalendarFrontSelectedEvent.showevent[0].CalendarClassnameAction = this.CreateClassModalStartDate1 + " " + this.CreateClassModalStartTime2 + ":00";
        this.CreateClassModalStartDateModal = false;
        this.CreateClassModalStartTimeModal = false;
      },
      setEndTime() {
        this.CalendarFrontSelectedEvent.showevent[1].CalendarClassnameAction = this.CreateClassModalFinishDate3 + " " + this.CreateClassModalFinishTime4 + ":00";
        this.CreateClassModalFinishDateModal = false;
        this.CreateClassModalFinishTimeModal = false;
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      
      editAllItem(){
        this.editLectureName = this.CalendarFrontSelectedEvent.name
        this.CreateClassModalDialog = true
      },
      editAllclose () {
        this.CreateClassModalDialog = false
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.CalendarFrontSelectedEvent.showevent[this.editedIndex], this.editedItem)
        } else {
          this.CalendarFrontSelectedEvent.showevent.push(this.editedItem)
        }
        this.close()
      },
      closeLectureName () {
        this.CreateClassModalDialog = false
      },

      // 처음 등록 확인
      saveLectureName () {
        this.CalendarFrontSelectedEvent.name = this.editLectureName
        this.closeLectureName()
      },

      //test 끝



      CalendarFrontViewDay ({ date }) {
        this.CalendarFrontFocus = date
        this.CalendarFrontType = 'day'
      },
      CalendarFrontGetEventColor (event) {
        return event.color
      },
      CalendarFrontSetToday () {
        this.CalendarFrontFocus = ''
      },
      prev () {
        this.$refs.calendar.prev() // CalendarFrontPrev
      },
      next () {
        this.$refs.calendar.next() // CalendarFrontNext
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
      
  
      // 컨텐츠 목록 API : 16. Post- http://IPAdress/api/content/post/contentlist
      fetchContentData() {
        this.contentlist = []

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
          .then((res => {
            this.contentlist.push({
              id: null,
              name: "컨텐츠 없음"
            })
            if (res.data.data.length >= 0) {
              res.data.data.forEach(element => {
                this.contentlist.push({
                  id: element.id,
                  name: element.name
                })
              })
            }
          }))
      },

      // API 42. 퀴즈 리스트 get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1 
      fetchQuizData() {
        this.quizlist = []; 
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
            this.quizlist.push({
              id: null,
              name: "퀴즈 없음"
            })
            if (res.data.data.length >0) {
              res.data.data.forEach(element => {
                this.quizlist.push({
                  id: element.id,
                  name: element.name
                })
                 //console.log(this.quizlist);
              })
            }
          })
      },
     
      // 선생님 강좌 목록 불러오기 : 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
      CalendarFrontUpdateRange ({ start, end }) {
        this.beforestart = start;
        this.beforeend = end;
        // 이벤트 막대기 생성부분
        // 여기서 데이터베이스에서 정보를 가져와야한다.
        // 가져올 데이터 data , time
         
        const CalendarFrontEvents = []

        var url = "http://163.180.117.47:8088/api/lecture/instructor/post/lecturelist";
        
        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          instructorId: userId,
          startDate: start.date,
          endDate: end.date
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
                var maptype = "";
                if (element.mapType === 0) {
                  maptype = "오픈형";
                } else if (element.mapType === 1) {
                  maptype = "계단식";
                } else if (element.mapType === 2) {
                  maptype = "소회의실"
                }
                CalendarFrontEvents.push({
                  name: element.name,
                  start: new Date(`${element.startTime}`),
                  end: new Date(`${element.endTime}`),
                  color: this.CalendarFrontColors[0],
                  timed: true,
                  classid: element.id,
                  mapId: element.mapId,
                  mapName: element.mapName,
                  contentId: element.contentId,
                  quizId: element.quizId,
                  showevent: [
                    {
                      CalendarClassnameAction: element.startTime,
                      CalendarClassnameTitle: '강의 시작 일자',
                    },
                    {
                      CalendarClassnameAction: element.endTime,
                      CalendarClassnameTitle: '강의 끝 일자',
                    },
                    {
                      CalendarClassnameAction: element.instructorName,
                      CalendarClassnameTitle: '강의자',
                    },
                    {
                      CalendarClassnameAction: element.mapName,
                      CalendarClassnameTitle: '강의실 이름',
                    },
                    {
                      CalendarClassnameAction: maptype,
                      CalendarClassnameTitle: '강의 타입',
                    },
                    {
                      CalendarClassnameAction: element.countUser+"/"+element.mapMaxUser,
                      CalendarClassnameTitle: '참여 인원수',
                      //CalendarClassnameAction: element.mapMaxUser,
                      //CalendarClassnameTitle: '참여 인원수',
                    },
                    {
                      CalendarClassnameAction: element.contentName,
                      CalendarClassnameTitle: '컨텐츠 이름'
                    },
                    { // 퀴즈 선택 추가
                      CalendarClassnameAction: element.quizName,
                      CalendarClassnameTitle: '퀴즈 이름'
                    },
                  ]
                })
              })

            }
            this.CalendarFrontEvents = CalendarFrontEvents;
          })
      },

      // 선생님 강좌 목록 불러오기 : 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
      refreshData() { 
        const CalendarFrontEvents = []

        var url = "http://163.180.117.47:8088/api/lecture/instructor/post/lecturelist";
        
        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          instructorId: userId,
          startDate: this.beforestart.date,
          endDate: this.beforeend.date
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
                var maptype = "";
                if (element.mapType === 0) {
                  maptype = "오픈형";
                } else if (element.mapType === 1) {
                  maptype = "계단식";
                } else if (element.mapType === 2) {
                  maptype = "소회의실"
                }
                CalendarFrontEvents.push({
                  name: element.name,
                  start: new Date(`${element.startTime}`),
                  end: new Date(`${element.endTime}`),
                  color: this.CalendarFrontColors[0],
                  timed: true,
                  classid: element.id,
                  mapId: element.mapId,
                  mapName: element.mapName,
                  contentId: element.contentId,
                  quizId: element.quizId,
        
                  showevent: [
                    {
                      CalendarClassnameAction: element.startTime,
                      CalendarClassnameTitle: '강의 시작 일자',
                    },
                    {
                      CalendarClassnameAction: element.endTime,
                      CalendarClassnameTitle: '강의 끝 일자',
                    },
                    {
                      CalendarClassnameAction: element.instructorName,
                      CalendarClassnameTitle: '강의자',
                    },
                    {
                      CalendarClassnameAction: element.mapName,
                      CalendarClassnameTitle: '강의실 이름',
                    },
                    {
                      CalendarClassnameAction: maptype,
                      CalendarClassnameTitle: '강의 타입',
                    },
                    {
                      CalendarClassnameAction: element.countUser+"/"+element.mapMaxUser,
                      CalendarClassnameTitle: '참여 인원수',
                      //CalendarClassnameAction: element.mapMaxUser,
                      //CalendarClassnameTitle: '참여 인원수',
                    },
                    {
                      CalendarClassnameAction: element.contentName,
                      CalendarClassnameTitle: '컨텐츠 이름'
                    },
                    
                    // 퀴즈 이름
                    {
                      CalendarClassnameAction: element.quizName,
                      CalendarClassnameTitle: '퀴즈 이름'
                    },
                  ]
                })
              })

            }
            this.CalendarFrontEvents = CalendarFrontEvents;
          })
      },
      CalendarFrontShowEvent ({ nativeEvent, event }) {
        const open = () => {
          this.CalendarFrontSelectedEvent = event
          this.CalendarFrontSelectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.CalendarFrontSelectedOpen = true))
        }

        if (this.CalendarFrontSelectedOpen) {
          this.CalendarFrontSelectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      ClassDelete(a) {
        var url = "http://163.180.117.47:8088/api/lecture/instructor/patch/deletelecture";

        var payload = {
          id: a.classid
        }

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        this.$http
          .patch(url, payload, config)
          .then(res => {
            if (res.data.success === true) {
              alert("강좌 삭제가 완료되었습니다.")
              this.CalendarFrontSelectedOpen = false;
              this.refreshData();
            } else if (res.data.success === false) {
              alert(res.data.message);
            }
          })
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },

      CalendarFrontSetActivePopup(modal){
        if(modal == true)
        {
          this.CreateClassModal = false;
        }
        else
        {
          this.CreateClassModal = true; 
        }
      },


      // 강좌 수정 10. Patch - http://IPAdress/api/lecture/ instructor/patch/updatelecture
     patchEditedClass(a){
      var url = "http://163.180.117.47:8088/api/lecture/instructor/patch/updatelecture ";
      console.log(a.showevent[6].contentId);
      console.log(a.showevent[3].mapId);

      var userId = this.$store.getters.getUserInfo.id;

      var payload = {
          id: a.classid,
          name: a.name,
          instructorId: userId,
          startTime: a.showevent[0].CalendarClassnameAction,
          endTime: a.showevent[1].CalendarClassnameAction,
          contentId: a.contentId,
          quizId: a.quizId,
          mapId: a.mapId,
      }
      
      var config = {
        
          headers: {
            "Content-Type": "application/json"
          }
        }
        
      var startdate = new Date(a.showevent[0].CalendarClassnameAction);
      var enddate = new Date(a.showevent[1].CalendarClassnameAction);
      var nowdate = new Date();
      if ((startdate < enddate) && (nowdate < enddate)) { 
        this.$http
          .patch(url, payload, config)
          .then(res => {
            if (res.data.success === true) {
              alert("강좌 수정이 완료되었습니다.")
              this.CalendarFrontSelectedOpen = false;
              this.refreshData();
            } else if (res.data.success === false) {
              alert(res.data.message);
            }
          })
          .catch(res => {
            alert(res);
        })
      }
      else if(startdate >= enddate) {
        alert("강의 끝 시간은 시작 시간보다 빠를 수 없습니다.")
      }
      else if(nowdate >= enddate) {
        alert("지난 강의는 수정할 수 없습니다.")
      }

    },

    
    // 강의실 맵정보 수정 : 8. Patch - http://IPAdress/api/map/patch/updatemap 
    patchEditedClassLectureMap(a){
      var url = "http://163.180.117.47:8088/api/map/patch/updatemap";

      var userId = this.$store.getters.getUserInfo.id;
      var Maxnum = parseInt(a.showevent[5].CalendarClassnameAction)
      var payload = {
        instructorId: userId,
        id: a.mapId,
        name: a.mapName,
        type: a.maptype,
        maxUser: Maxnum,
      }
      var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

      this.$http
        .patch(url, payload, config)
        .then(res => {
          if (res.data.success === true) {
            alert("강좌 수정이 완료되었습니다.")
            this.CalendarFrontSelectedOpen = false;
            this.refreshData();
          } else if (res.data.success === false) {
            alert(res.data.message);
          }
        })
    },
    test1() {
      console.log(this.CreateClassModalStartDate1);
    },

    // 강의 메시지 전송 appendCalendarFrontMessage
    // (1) 이메일 전송 http://localhost:8088/api/mail/send 
    
    appendCalendarFrontMessage() {
      if(this.emailClick) {
        let url = "http://163.180.117.47:8088/api/mail/send";

        let userId = this.$store.getters.getUserInfo.id;
        let payload = {
          instructorId: userId,
          context: this.MessageContext,
        }

        let config = {
            headers: {
              "Content-Type": "application/json"
            }
          }

        this.$http
          .post(url, payload, config)
          .then(res => {
            if (res.data.success === true) {
              alert("메일 전송이 완료되었습니다.")
              this.closeCalendarFrontMessage();
            } else if (res.data.success === false) {
              alert(res.data.message);
            }
          }) 
      } else if(this.messageClick) {
          let url = "http://163.180.117.47:8088/api/sms/send"; // http://localhost:8088/api/sms/send 

          //var userId = this.$store.getters.getUserInfo.id;
          let payload = {
            //instructorId: userId,
            context: this.MessageContext,
          }

          let config = {
              headers: {
                "Content-Type": "application/json"
              }
            }

          this.$http
            .post(url, payload, config)
            .then(res => {
              if (res.data.success === true) {
                alert("메세지 전송이 완료되었습니다.")
                this.closeCalendarFrontMessage();
              } else if (res.data.success === false) {
                alert(res.data.message);
              }
            })
      }
      
    },


  },
}
  

</script>






<!--<style scoped lang="scss">

.v-calendar {
  $font-size-root: 30px;
}

</style>


.test-css {
font-size: 15px;}
  
.black--text {color:black;}
</style>-->