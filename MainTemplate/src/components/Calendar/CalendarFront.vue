<template>
<v-col style="background-color: #f8f9fc;">
  <v-toolbar
    flat
  >
    <v-tabs
      dark
      background-color="white"
      grow
    >
      <v-tab>
        <v-btn
          outlined
          class="mr-4"
          color="teal"
          @click="CalendarFrontSetToday"
        >
          Today
        </v-btn>
      </v-tab>
      <v-tab>
          <!--middle date prev-->
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
        <!--screen top middle today date-->
        <v-toolbar-title style="color:black" v-if="$refs.calendar">
          {{ $refs.calendar.title }} 
        </v-toolbar-title>
        <!--top middle date Next click button-->
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
        <!--top right month-->
        <v-tab>
        <v-menu
          bottom
          right
        >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            color="teal"
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
  <!--Adjust the size of the entire calendar sheet up and down (top-bottom)-->
  <v-sheet height="850">
    <v-calendar
      ref="calendar"
      v-model="CalendarFrontFocus"
      color="primary"
      :events="CalendarFrontEvents" 
      :event-color="GetEventColor"
      :type="CalendarFrontType"
      @click:event="CalendarFrontShowEvent"
      @click:more="CalendarFrontViewDay"
      @click:date="CalendarFrontViewDay"
      @change="CalendarFrontUpdateRange"
      font-weight-black
      interval-height="96"
      :event-overlap-mode="mode"
      :event-overlap-threshold="60"
    ></v-calendar>
    <!--event click screen--> 
    <v-menu
      v-model="CalendarFrontSelectedOpen"
      :close-on-content-click="false"
      :activator="CalendarFrontSelectedElement"
      offset-x
      CalendarFrontUpdateRange
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
          <!--mdi-pencil icon according to the class create-->
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

        <!--Full screen that appears when an event (subject) is clicked on the calendar-->
        <template>
        <v-row>
          <v-col>
            <v-dialog
              v-model="CreateClassModalDialog"
              max-width="500px"
            >
              <!--Modify class name-->
              <template>
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >강좌명 수정
                </v-toolbar>
                <!--class name-->
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
                <!--screen close/create-->
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
              <!--sumit-->
            </v-dialog>
          </v-col>      
        </v-row> 
        </template>
        <!--footer-->            
        <!--v-data table-->
        <v-data-table
          :headers="TotalHeaders"
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
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="TotaleditedItem.CalendarClassnameTitle"
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
                        v-model="TotaleditedItem.CalendarClassnameAction"
                        label="강의 상세정보"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
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

          <!--number of participants: list of members (students)-->
          <v-icon
            small
            class="mr-2"
            @click="popupStudentList()"
            v-else-if="isStudentList(item)"
          >
            mdi-pencil
          </v-icon>

          <!--content pen-icon-->
          <v-icon
            small
            class="mr-2"
            @click="popupContentList()"
            v-else-if="isContent(item)"
          >
            mdi-pencil
          </v-icon>
          
          <!--quiz pen-icon-->
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
        <!--All Classroom Selected Part (Additional)-->
        <v-dialog
          v-model="popupMaplistDialog"
          max-width="500px"
        >
        <!--classroom top box-->
          <v-card>
            <v-toolbar
              class="overflow-hidden mx-auto"
              color="grey lighten-2"
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
                    width="98%"
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
        <!--The screen that appears when the number of participants button is clicked: list of participants-->
        <template>
        <v-dialog
          v-model="popupStudentListDialog"
          max-width="400px"
        >
          <v-card
            class="mx-auto"
            max-width="500px"
          >
            <v-card-title class="white--text blue darken-4">
              참여자 명단
              <v-spacer></v-spacer>
              <v-btn
                icon
                dark
                @click="closeStudentList()"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <div style="text-align:center;">
              <v-card-subtext class="pt-4">
                <v-list-item>
                  <v-list-item-action>
                      <strong>FirtName</strong> 
                  </v-list-item-action>
                  
                  <v-list-item-content>
                    <v-list-item-title>
                      <strong>Name</strong>
                    </v-list-item-title>
                  </v-list-item-content>
                  
                  <v-list-item-action>
                      <v-list-item-title>
                      <strong>ID</strong>
                    </v-list-item-title>
                  </v-list-item-action>
                </v-list-item>                    
              </v-card-subtext>
              <v-divider></v-divider>
              <v-virtual-scroll
                :items="studentlist[CalendarFrontSelectedEvent.classid]"
                height="300"
                item-height="64"
              >
                <template v-slot:default="{ item }">
                <v-list-item :key="item">
                  <v-list-item-action>
                    <v-btn
                      fab
                      small
                      depressed
                      color="primary"
                    >
                      {{GetFirstName(item.studentName)}}
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>
                      <strong>{{ item.studentName }}</strong>
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                      <v-list-item-title>
                      <strong>{{ item.loginId }}</strong>
                    </v-list-item-title>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
                </template>
              </v-virtual-scroll>
            </div>
          </v-card>
        </v-dialog>
        </template>
        <!-- contents dialog-->
        <v-dialog
          v-model="popupContentListDialog"
          max-width="500px"
        >
        <!--classroom top box-->
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
            <!--contents name--> 
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
        <!--quize dialog-->
        <v-dialog
          v-model="popupQuizListDialog"
          max-width="500px"
        >
        <!--quize top box-->
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
            <!--quize name--> 
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
          persistent
          lazy
          full-width
          width="290px"
          solo-inverted
        >  
          <v-date-picker v-model="CreateClassModalStartDate1" :max="CreateClassModalFinishDate3">
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
          persistent
          lazy
          full-width
          width="290px"
          solo-inverted
        >
          <v-date-picker v-model="CreateClassModalFinishDate3" :min="CreateClassModalStartDate1">
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
        <!--When you click an event (subject) in the calendar, the most "bottom" of the 'full-screen' appears-->
        <v-list two-line color="grey lighten-3">
          <v-card-actions>
            <v-spacer></v-spacer>
            <!--class(lecture) message send-->
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
          <!--After clicking Send class(lecture) Message dialog-->
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
                    <!--Send class(lecture) message dialog close button-->
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
                    <!--email, sms message-->
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
              </v-dialog>
            </v-col>
          </v-row>
          </template>
        </v-card-actions>
      </v-list>
        <v-list two-line color="grey lighten-3">
          <v-card-actions>
            <v-spacer></v-spacer>
            <!--When clicking on a created course, modify and check class information-->
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
  <!--mdi-plus button click-->
  <div class="text-right">
    <v-btn 
      fab
      color="primary"
      right
      absolute
      @click="CalendarFrontSetActivePopup(CreateClassModal)"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
  <!--<CreateClassModal v-if="showCreateClassModal"></CreateClassModal>-->
  <!--create-class-modal-->
  <CreateClassModal
  v-if="showCreateClassModal"
  v-bind:CreateClassDone="CreateClassDone"
  @close="CreateClassDone()"
  />
</v-col>
</template>

<!--script-->
<script>
var RestAPIManager = require('../RestAPIManager')
import CreateClassModal from './CreateClassModal.vue' // CreateClassModal
//import ClaendarStudentListModal from './ClaendarStudentListModal.vue' // ClaendarStudentListModal

export default {
  components: { CreateClassModal },
  data: () => ({
    showCreateClassModal: false,
    color:" ",
    CreateClassModalColorItem: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal','green', 'light-green', 'lime', 'amber'],
    dialog: false,
    StudentListdialog: false, // 참여 인원수 dialog
    mode: 'column',

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

    MonthStartDate: "",
    MonthEndDate: "",

    maplist: [],
    studentlist: {}, // 학생 리스트
    contentlist: [], // 컨텐츠 리스트
    quizlist: [], // 퀴즈 리스트

    editLectureName: "",

    // 연두색 이벤트 클릭시 나타나는 전체정보 --> 강의정보, 강의상세정보, 정보수정
    TotalHeaders: [
      { text: '강의 정보', align: 'start', value: 'CalendarClassnameTitle', sortable: false }, // 강의 정보
      { text: '강의 상세정보', value: 'CalendarClassnameAction', sortable: false }, // 강의 상세정보
      { text: '정보 수정 ', value: 'actions', sortable: false }, // 정보 수정
    ],

    // 참여 인원수 클릭시 나타나는 page
    StudentHeaders: [
      {  text: '학생 이름', value: 'studentName', sortable: false }, //  학생 이름
      {  text: '학생 ID ', value: 'studentId', sortable: false }, // 학생 아이디
    ],
    
    editedIndex: -1,

    // 이벤트 클릭시 들어오는 TotaleditedItem (전체리스트아이템)
    TotaleditedItem: {
      CalendarClassnameTitle: '', // 강의 정보
      CalendarClassnameAction: 0, // 강의 상세정보
    },

    // 참여인원수 클릭시 들어오는 StudenteditedItem (학생이름, 아이디에 대한 정보)
    StudenteditedItem: {
      studentName: '', // 학생 이름
      studentId: '', // 학생 아이디
    },
    
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
  
  // Send class(lecture) message
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
    this.GetMonthDate();
    this.$refs.calendar.checkChange()
  },

  methods: {
    closeCreateClassModal(){
      this.showCreateClassModal=false;
    },
    GetMonthDate() {
      this.MonthStartDate = new Date(this.date.split('-')[0], this.date.split('-')[1] - 1, 2).toISOString().split('T')[0];
      this.MonthEndDate = new Date(this.date.split('-')[0], this.date.split('-')[1], 1).toISOString().split('T')[0];
    },

    GetEventColor (event) {
      return event.color
    },

    // class(lecture) Participation List
    GetFirstName(name){
      var length = name.length
      return name.substr(1, length-1)
    },

    // true when time is divided into 5-minute intervals
    allowedInterval: m => m % 5 == 0,

    // popUpCalendarFrontMessage
    popUpCalendarFrontMessage() {
      this.CalendarFrontMessageDialog= true
    },

    // closeCalendarFrontMessage
    closeCalendarFrontMessage() {
      this.CalendarFrontMessageDialog= false 
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

     // Number of participants in the class(lecture) button click-pens
    isStudentList(item) {
      if(this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 5) {
        return true
      } else {
        return false
      }
    },

    // contents button click-pens
    isContent(item) {
      if(this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 6) {
        return true
      } else {
        return false
      }
    },
    
    // quize button click-pens
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

    // student list
    popupStudentList() {
      this.popupStudentListDialog = true  // 
    },

    closeStudentList(){
      this.popupStudentListDialog = false // 
    },

    // contents list
    popupContentList() {
      this.fetchContentData()
      this.popupContentListDialog = true
    },

    closeContentsList(){
      this.popupContentListDialog = false
    },

    // When editing a classroom name, close the classroom selection window
    closeClassList() {
      this.popupMaplistDialog = false
    },

  
    popupQuizList() {
      this.fetchQuizData()
      this.popupQuizListDialog = true
    },

    closeQuizList(){
      this.popupQuizListDialog = false
    },

    CreateClassDone() {
      this.showCreateClassModal = false;
      this.CalendarFrontUpdate();
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

    // Save content revisions
    SetContentData(item) {
      this.CalendarFrontSelectedEvent.showevent[6].CalendarClassnameAction = item.name
      this.CalendarFrontSelectedEvent.contentId = item.id
      this.popupContentListDialog=false
    },

    // Save quize revisions
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

    editAllItem(){
      this.editLectureName = this.CalendarFrontSelectedEvent.name
      this.CreateClassModalDialog = true
    },
    editAllclose () {
      this.CreateClassModalDialog = false
    },

    closeLectureName () {
      this.CreateClassModalDialog = false
    },

    saveLectureName () {
      this.CalendarFrontSelectedEvent.name = this.editLectureName
      this.closeLectureName()
    },

    CalendarFrontViewDay ({ date }) {
      this.CalendarFrontFocus = date
      this.CalendarFrontType = 'day'
    },

    CalendarFrontGetEventColor () {
      var index = Math.floor(Math.random()*( this.CreateClassModalColorItem.length + 1 )) ;
      return this.CreateClassModalColorItem[index];
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

    CalendarFrontSetActivePopup(modal){
      console.log(modal.isActive);
      if(this.showCreateClassModal){
        this.showCreateClassModal = false;
      }
      else{
        this.showCreateClassModal = true;
      }
    },

    // 7. Post  -  http://IPAdress/api/map/post/maplist 
    async fetchMapData () {
      this.maplist = await RestAPIManager.API_maplist(this.CalendarFrontGetEventColor(), this.$store.getters.getUserInfo.id);
    },
    
    // 16. Post- http://IPAdress/api/content/post/contentlist
    async fetchContentData() {
      this.contentlist = await RestAPIManager.API_contentlist(this.$store.getters.getUserInfo.id);
    },

    // 42. Get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1 
    async fetchQuizData() {
      this.quizlist = await RestAPIManager.API_quizlist(this.$store.getters.getUserInfo.id);
    },
  
    // 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
    async CalendarFrontUpdateRange({ start, end }) {
      this.beforestart = start;
      this.beforeend = end;
      var CalendarFrontEvents = await RestAPIManager.API_lecturelist(this.beforestart.date, this.beforeend.date, this.$store.getters.getUserInfo.id);
      this.CalendarFrontEvents = CalendarFrontEvents;
      var studentList = [];
      for (const lecture of this.CalendarFrontEvents){
        studentList[lecture.classid] = lecture.studentlist; 
      }
      this.studentlist = studentList;
    },

    // 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
    async CalendarFrontUpdate() {
      var CalendarFrontEvents = await RestAPIManager.API_lecturelist(this.MonthStartDate, this.MonthEndDate, this.$store.getters.getUserInfo.id);
      this.CalendarFrontEvents = CalendarFrontEvents;
      var studentList = [];
      for (const lecture of this.CalendarFrontEvents){
        studentList[lecture.classid] = lecture.studentlist; 
      }
      this.studentlist = studentList;
    },

    // 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
    async inslecturelist() { 
      var lecturelist = await RestAPIManager.API_lecturelist(this.MonthStartDate, this.MonthEndDate, this.$store.getters.getUserInfo.id);
      this.CalendarFrontEvents = lecturelist;
    },

    // 11. Patch- http://IPAdress/api/lecture/instructor/patch/deletelecture
    async ClassDelete(classinfo) {
      var deletelecture = await RestAPIManager.API_insdeletelecture(this.$store.getters.getUserInfo.id, classinfo.classid);
      if (deletelecture.res_success === true) {
        alert("강좌 삭제가 완료되었습니다.")
        this.CalendarFrontSelectedOpen = false;
      } else if (deletelecture.res_success === false) {
        alert(deletelecture.res_message);
      }
    },

    // 10. Patch - http://IPAdress/api/lecture/instructor/patch/updatelecture
    async patchEditedClass(lectureinfo) {
      var updatelecture = await RestAPIManager.API_updatelecture(lectureinfo, this.$store.getters.getUserInfo.id);
      var startdate = new Date(lectureinfo.showevent[0].CalendarClassnameAction);
      var enddate = new Date(lectureinfo.showevent[1].CalendarClassnameAction);
      var nowdate = new Date();     
      if ((startdate < enddate) && (nowdate < enddate)) { 
        if (updatelecture.success === true) {
          alert("강좌 수정이 완료되었습니다.")
          this.CalendarFrontSelectedOpen = false;
          this.fetchMapData();
        } else if (updatelecture.success === false) {
          alert(updatelecture.message);
        }
      } else if(startdate >= enddate) {
        alert("강의 끝 시간은 시작 시간보다 빠를 수 없습니다.")
      } else if(nowdate >= enddate) {
        alert("지난 강의는 수정할 수 없습니다.")
      }
    },

    // 8. Patch - http://IPAdress/api/map/patch/updatemap 
    async patchEditedClassLectureMap(mapinfo) {
      var updatemap = await RestAPIManager.API_updatemap(mapinfo, this.$store.getters.getUserInfo.id);
      //var Maxnum = parseInt(mapinfo.showevent[5].CalendarClassnameAction);
      if (updatemap.success === true) {
        alert("강좌 수정이 완료되었습니다.")
        this.CalendarFrontSelectedOpen = false;
      } else if (updatemap.ssuccess === false) {
        alert(this.updatemap.res_message);
      }
    },

    // 45. post http://localhost:8088/api/mail/sendAll
    async appendCalendarFrontMessage() {
      if (this.emailClick) {
        this.mailsend = await RestAPIManager.API_mailsend(this.MessageContext, this.$store.getters.getUserInfo.id);
        console.log(this.mailsend);
        if (this.mailsend.res_success === true) {
          alert("메일 전송이 완료되었습니다.")
          this.closeCalendarFrontMessage();
        } else if (this.mailsend.res_success === false) {
          alert(this.mailsend.res_message);
        }
      }
      // 46. post http://localhost:8088/api/sms/send
      if(this.messageClick) {
        this.smssend = await RestAPIManager.API_smssend(this.MessageContext, this.$store.getters.getUserInfo.id);
        console.log(this.smssend);
        if (this.smssend.res_success === true) {
          alert("메세지 전송이 완료되었습니다.")
          this.closeCalendarFrontMessage();
        } else if (this.smssend.res_success === false) {
          alert(this.smssend.res_message);
        }
      }
    },
  }
}
</script>
