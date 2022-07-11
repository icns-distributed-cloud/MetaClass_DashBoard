<!--CalendarFront-->
<template>
  <v-container fluid>
    <v-col style="background-color: #f8f9fc;">
      <v-toolbar
        flat
      >
        <!--Tab left today-->
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
          <!--Tab center before-icon-->
          <v-tab>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="Prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <!--Tab center month/year-->
            <v-toolbar-title style="color:black" v-if="$refs.calendar">
              {{ $refs.calendar.title }} 
            </v-toolbar-title>
            <!--Tab center next-icon-->
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="Next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>  
            </v-btn>
          </v-tab>
          <!--right menu : day/week/month-->
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
                  <span>{{ mCalendarFrontTypeToLabel[mCalendarFrontType] }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>  
                </v-btn>
              </template>
                <v-list>
                  <v-list-item @click="mCalendarFrontType = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="mCalendarFrontType = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="mCalendarFrontType = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                </v-list>  
              </v-menu>
            </v-tab>   
          </v-tabs>
        </v-toolbar>
        <!--All calendarpage-->
        <!--calendar size change "850" (row-version : 600) -->
        <!--:events="mCalendarFrontEvents" -- event click : time and subject-->
        <v-sheet height="850">
          <v-calendar
            ref="calendar"
            v-model="mCalendarFrontFocus"
            color="primary"
            :events="mCalendarFrontEvents" 
            :event-color="GetEventColor"
            :type="mCalendarFrontType"
            @click:event="CalendarFrontShowEvent"
            @click:more="CalendarFrontViewDay"
            @click:date="CalendarFrontViewDay"
            @change="CalendarFrontUpdateRange"
            font-weight-black
            interval-height="96"
            :event-overlap-mode="mMode"
            :event-overlap-threshold="60"
          >
          </v-calendar>
    
          <!--Event click : page--> 
          <v-menu
            v-model="CalendarFrontSelectedOpen"
            :close-on-content-click="false"
            :activator="mCalendarFrontSelectedElement"
            offset-x
            CalendarFrontUpdateRange
          >
            <v-card
              color="grey lighten-4"
              min-width="300px"
              flat
            >
              <v-toolbar
                :color="mCalendarFrontSelectedEvent.color"
                dark
                flat
              >
                <v-toolbar-title v-html="mCalendarFrontSelectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <!--Createclassname change "pen" button-->
                <v-btn
                  fab
                  small
                  @click="PopupEditEventName()"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-toolbar>
              <!--Pen button click event : Edit classname dialog-->
              <template>
                <v-row>
                  <v-col>  
                    <v-dialog
                      v-model="mEditClassNameDialog"
                      max-width="500px"
                    >
                    <!--Edit classname change-->
                    <template>
                      <v-card>
                        <v-toolbar
                          class="overflow-hidden mx-auto"
                          color="primary"
                          dark
                        >
                          강좌명 수정
                          <v-spacer></v-spacer>
                          <v-btn
                            icon
                            dark
                            @click="PopupEditEventName()"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <!--classname-->
                        <div>
                          <v-card-text>
                            <v-text-field
                              v-model="mEditLectureName"
                              :counter="10"
                              label="강좌명"
                              required
                              prepend-icon="mdi-pencil"
                              outlined
                            >
                            </v-text-field>   
                          </v-card-text> 
                        </div>
                        <!--Edit classname dialog close/create-->
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="SaveLectureName()"
                          >
                            등록 확인
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </template> 
                  </v-dialog>
                </v-col>      
              </v-row> 
            </template>

            <!--footer-->            
            <!--AllClassInformationHeaders: classinformation/detailinformation/changeinformation-->
            <v-data-table
              :headers="mAllClassInformationHeaders" 
              :items="mCalendarFrontSelectedEvent.showevent"
              class="elevation-1"
              hide-default-footer
            >
              <template v-slot:top>
                <v-dialog
                  v-model="mAllClassInformationDialog"
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
                              v-model="mTotaleditedItem.CalendarClassnameTitle"
                              label="강의 정보"
                              solo
                              readonly
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="mTotaleditedItem.CalendarClassnameAction"
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
                <!--popupStartTime-->
                <v-icon
                  small
                  class="mr-2"
                  @click="PopupStartTime()"
                  v-if="IsStartTime(item)"
                >
                  mdi-pencil
                </v-icon>
                <!--PopupEndTime-->
                <v-icon
                  small
                  class="mr-2"
                  @click="PopupEndTime()"
                  v-else-if="IsEndTime(item)"
                >
                  mdi-pencil
                </v-icon>
                <!--PopupLecturelist-->
                <v-icon
                  small
                  class="mr-2"
                  @click="PopupLecturelist()"
                  v-else-if="IsLecturename(item)"
                >
                  mdi-pencil
                </v-icon>
                <!--PopupStudentList-->
                <v-icon
                  small
                  class="mr-2"
                  @click="PopupStudentList()"
                  v-else-if="IsStudentList(item)"
                >
                  mdi-pencil
                </v-icon>
                <!--popupContentList-->
                <v-icon
                  small
                  class="mr-2"
                  @click="popupContentList()"
                  v-else-if="IsContent(item)"
                >
                  mdi-pencil
                </v-icon>
                <!--PopupQuizList-->
                <v-icon
                  small
                  class="mr-2"
                  @click="PopupQuizList()"
                  v-else-if="IsQuiz(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
            </v-data-table>

            <!--Information change Pen-click : mPopupMaplistDialog-->
            <v-dialog
              v-model="mPopupMaplistDialog"
              max-width="500px"
            >
              <v-card>
                <v-toolbar
                  class="overflow-hidden mx-auto"
                  color="primary"
                  dark  
                >
                  <v-toolbar-title>강의실 선택</v-toolbar-title>
                  <v-spacer></v-spacer>
                    <v-btn
                      icon
                      dark
                      @click="CloseClassList"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <!--Maplist select--> 
                <v-col cols="auto">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in mMapList"
                          :key="index"
                        > 
                          <v-btn
                            width="98%"
                            color="grey lighten-2"
                            v-bind="attrs"
                            v-on=on
                            @click="Setmapdata(item)"
                          >{{ item.name }}: {{ item.typename }}/{{ item.maxUser }}명
                          </v-btn>
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-dialog>
                </v-col>
              </v-card>
            </v-dialog>

           <!--참여인원수 버튼 클릭시 나타나는 화면 : 참여자 명단-->
            <template>
               <v-dialog
                  v-model="mPopupStudentListDialog"
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
                        @click="CloseStudentList()"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <div style="text-align:center;">
                      <v-card-text class="pt-4">
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
                      </v-card-text>
                    <v-divider></v-divider>
                    <v-virtual-scroll
                      :items="mStudentList"
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

           <!-- 컨텐츠 dialog-->
            <v-dialog
              v-model="mPopupContentListDialog"
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
                      @click="CloseContentsList"
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
                          v-for="(item, index) in mContentList"
                          :key="index"
                        > 
                          <v-btn
                            width="98%"
                            color="grey lighten-2"
                            v-bind="attrs"
                            v-on=on
                            @click="SetContentData(item)"
                          >{{ item.name }}
                          </v-btn>
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-dialog>
                </v-col>
              </v-card>
            </v-dialog>

            <!-- 퀴즈 dialog-->
            <v-dialog
              v-model="mPopupQuizListDialog"
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
                      @click="CloseQuizList"
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
                          v-for="(item, index) in mQuizList"
                          :key="index"
                        > 
                          <v-btn
                            width="98%"
                            color="grey lighten-2"
                            v-bind="attrs"
                            v-on=on
                            @click="SetQuizData(item)"
                          >{{ item.name }}
                          </v-btn>
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-dialog>
                </v-col>
              </v-card>
            </v-dialog>

            <v-dialog
              ref="CreateClassModalStartDateDialog1"
              v-model="mCreateClassModalStartDatePicker"
              :return-value.sync="mCreateClassModalStartDate"
              persistent
              lazy
              full-width
              width="290px"
              solo-inverted
            >  
            
              <v-date-picker v-model="mCreateClassModalStartDate" scrollable :min="mCreateClassModalFinishDate">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="mCreateClassModalStartDatePicker = false">Cancel</v-btn>
                <v-btn text color="primary" @click="mCreateClassModalStartTimePicker = true">OK</v-btn>
              </v-date-picker> 
            </v-dialog>

            <v-dialog
              ref="CreateClassModalStartTimeDialog2"
              v-model="mCreateClassModalStartTimePicker"
              :return-value.sync="mCreateClassModalStartTime"
              persistent
              lazy
              full-width
              width="290px"
            >
            <!--:allowed-minutes="AllowedInterval" -->
              <v-time-picker
                v-if="mCreateClassModalStartTimePicker"
                v-model="mCreateClassModalStartTime"
                full-width
                :allowed-minutes="AllowedInterval"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="mCreateClassModalStartTimePicker = false">Cancel</v-btn>
                <v-btn text color="primary" @click="SetStartTime()">OK</v-btn>
              </v-time-picker>
            </v-dialog>

            <v-dialog
              ref="CreateClassModalFinishDateDialog3"
              v-model="mCreateClassModalFinishDatePicker"
              :return-value.sync="mCreateClassModalFinishDate"
              persistent
              lazy
              full-width
              width="290px"
              solo-inverted
            >
              <v-date-picker v-model="mCreateClassModalFinishDate" scrollable :min="mCreateClassModalStartDate">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="mCreateClassModalFinishDatePicker = false">Cancel</v-btn>
                <v-btn text color="primary" @click="mCreateClassModalFinishTimePicker = true">OK</v-btn>
              </v-date-picker> 
            </v-dialog>
            <v-dialog
              ref="CreateClassModalFinishTimeDialog4"
              v-model="mCreateClassModalFinishTimePicker"
              :return-value.sync="mCreateClassModalFinishTime"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-time-picker
                v-if="mCreateClassModalFinishTimePicker"
                v-model="mCreateClassModalFinishTime" 
                full-width
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="mCreateClassModalFinishTimePicker = false">Cancel</v-btn>
                <v-btn text color="primary" @click="SetEndTime()">OK</v-btn>
              </v-time-picker>
            </v-dialog>
        
            <span v-html="mCalendarFrontSelectedEvent.details"></span>
            <!--캘린더에서 이벤트(과목)을 클릭 했을 때, 나타나는 '전체'화면에서 가장 "하단"-->

            <v-list two-line color="grey lighten-3">
              <v-card-actions>
                <v-spacer></v-spacer>
             
                <!--강의 메세지 전송-->
                <v-btn
                  color="teal darken-4"
                  class="ma-2 white--text"
                  @click="PopUpCalendarFrontMessage()"
                >
                  <strong>강의 메세지 전송</strong>
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
                        v-model="mCalendarFrontMessageDialog"
                        max-width="500px"
                      >
                        <v-card
                          color="grey lighten-4"
                          min-width="300px"
                          flat
                        >
                          <v-toolbar
                            :color="mCalendarFrontSelectedEvent.color"
                            dark
                            flat
                          >
                            <v-toolbar-title v-html="mCalendarFrontSelectedEvent.name"></v-toolbar-title>
                            <v-spacer></v-spacer>

                            <!--강의 메시지 전송 dialog 닫기 버튼-->
                            <v-btn
                              icon
                              dark
                              @click="CloseCalendarFrontMessage"
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
                                v-model="mMessageContext"
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
                                  @click="AppendCalendarFrontMessage()"
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
                                  v-model="mEmailClick"
                                  color="blue darken-1"
                                >
                                  <template v-slot:label>
                                    <h3>이메일</h3>
                                  </template>
                                </v-checkbox>
                                <v-checkbox
                                  v-model="mMessageClick"
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
                        <!--강의실 A 클릭 후 sumit 끝 부분-->
                      </v-dialog>
                    </v-col>
                  </v-row>
                </template>
              </v-card-actions>
            </v-list>
            
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
                  @click="PatchEditedClass(mCalendarFrontSelectedEvent)"
                >
                  <strong>강의 수정</strong>
                </v-btn>
                <v-btn
                  @click="ClassDelete(mCalendarFrontSelectedEvent)"
                >
                  <strong>강의 취소</strong>
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
          color="primary"
          right
          absolute
          @click="CalendarFrontSetActivePopup(mCreateClassModal)"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      
      <!--create-class-modal-->
      <create-class-modal
        v-if="mCreateClassModal"
        @close="mCreateClassModal = false;"
      />
    </v-col>
  </v-container>
</template>


<!--script-->
<script>
import CreateClassModal from './CreateClassModal.vue' // CreateClassModal

  export default {
    components: { CreateClassModal },
    data: () => ({
      mCreateClassModalColorItem: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal','green', 'light-green', 'lime', 'amber'], // define colorlist
      mAllClassInformationDialog: false, // class information dialog flag
      mMode: 'column', // event overlab mode (stack is overlap/ column is not overlab)
      mPopupMaplistDialog: false, // map list dialog flag
      mPopupStudentListDialog: false, // student list dialog flag
      mPopupContentListDialog: false, // content list dialog flag
      mPopupQuizListDialog: false, // quiz list dialog flag
      mEditClassNameDialog: false, // classname change dialog flag

      mCreateClassModalStartDatePicker: false, // class select > class start-date picker
      mCreateClassModalStartTime: "", // class select > start-time input data variable
      mCreateClassModalStartTimePicker: false, // class select > start-time picker
      mCreateClassModalFinishDatePicker: false, // class select > finsh-date picker  

      // 한꺼번에 넣기 (워드로!!!)
      mCreateClassModalStartDate: new Date().toISOString().substr(0, 10), // class select > start-date input data variable
      mCreateClassModalFinishDate: new Date().toISOString().substr(0, 10), // class select > finsh-date input data variable
      mCreateClassModalFinishTime: "", // class select > finsh-time input data variable
      mCreateClassModalFinishTimePicker: false, // class select > finsh-time picker

      mCalendarFrontMessageDialog: false,  // class message send dialog
      mEmailClick : false, // email-click select
      mMessageClick: false, // message-click select
      mMessageContext:"", // massage-context

      mMapList: [], // map-list
      mStudentList: [], // student-list
      mContentList: [], // content-list
      mQuizList: [], // quiz-list
      mEditLectureName: "", // editLectureName 

      // calendar event-click data-tabel header : AllClassInformation
      mAllClassInformationHeaders: [
        { text: '강의 정보', align: 'start', value: 'CalendarClassnameTitle', sortable: false }, // 강의 정보
        { text: '강의 상세정보', value: 'CalendarClassnameAction', sortable: false }, // 강의 상세정보
        { text: '정보 수정 ', value: 'actions', sortable: false }, // 정보 수정
      ],

      // event-click > TotaleditedItem (class-information)
      mTotaleditedItem: {
        CalendarClassnameTitle: '', // 강의 정보
        CalendarClassnameAction: 0, // 강의 상세정보
      },

      // 여기서부터 시작!!!! (7/9)
      
      mBeforestart: "", // Events start time in CalendarFrontUpdateRange function
      mBeforeend: "",   // Events end time in CalendarFrontUpdateRange function
      mCalendarFrontFocus: '',  // Foucus date variable
      mCalendarFrontType: 'month',  // CalendarFrontType('month', 'week', 'day')
      mCalendarFrontTypeToLabel: {    // mCalendarFrontType to String
        month: 'Month',
        week: 'Week',
        day: 'Day',
      },
      mCalendarFrontSelectedEvent: {},    // dictionary for all Events data
      mCalendarFrontSelectedElement: null,    // selected Evente Elments
      //mCalendarFrontSelectedOpen: false,  // 사용되지 않음
      mCalendarFrontEvents: [], // classinformation for update class
      mCreateClassModal : false, //  CreateClassModal window flag 
      // selected: [2], // 사용되지 않음
    }),
    
    // watch 함수 : vue 인스턴스의 특정 프로퍼티가 변경될 때 지정한 콜백함수가 실행되는 기능
    // if PopUpCalendarFrontMessage did not change in 50sec set null
    watch: {
      PopUpCalendarFrontMessage () { 
        const l = this.PopUpCalendarFrontMessage
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.PopUpCalendarFrontMessage = null
      },
    },

    name: "CalendarFront", // CalendarFront
    
    // mounted 함수 : DOM조작, 및 이벤트 리스너를 여기서 등록해준다.
    mounted () {  //mount calendar.checkChange() Eventlistener
      this.$refs.calendar.checkChange()
    },

    methods: {
      GetEventColor (event) {   // Get Eventcolor in event itself
        return event.color
      },

      // 참여 리스트 : 동그라미 이름
      GetFirstName(name){   // Get name in students list and return Firstname
        var length = name.length
        return name.substr(1, length-1)
      },

      // 시간 5분 간격으로 나눠질 때 TRUE
      AllowedInterval: m => m % 5 == 0,

      // mCalendarFrontMessageDialog
      PopUpCalendarFrontMessage() {   // Popup Calendar Front Message Dialog window
        this.mCalendarFrontMessageDialog= true
      },

      // mCalendarFrontMessageDialog
      CloseCalendarFrontMessage() {   // Close Calendar Front Message
        this.mCalendarFrontMessageDialog= false 
      },

      IsStartTime(item) {   // Compare index with Starttime (Starttime의 index인지를 비교)
        if (this.mCalendarFrontSelectedEvent.showevent.indexOf(item) === 0){
          return true
        } else {
            return false
        }
      },

      IsEndTime(item) {   // Compare index with Endtime (EndTime의 index인지를 비교)
        if (this.mCalendarFrontSelectedEvent.showevent.indexOf(item) === 1) {
          return true
        } else {
            return false
        }
      },

      IsLecturename(item) {   // Compare index with Lecturename (Lecture리스트의 index인지를 비교)
        if(3 === this.mCalendarFrontSelectedEvent.showevent.indexOf(item)) {
          return true
        }
        else{return false}
      },

       // 참여 인원수 (펜)
      IsStudentList(item) {   // Compare index with StudentList (Student리스트의 index인지를 비교)
        if(this.mCalendarFrontSelectedEvent.showevent.indexOf(item) === 5) {
          return true
        } else {
          return false
        }
      },

      // 컨텐츠 (펜)
      IsContent(item) {   // Compare index with Content (Content수정의 index인지를 비교)
        if(this.mCalendarFrontSelectedEvent.showevent.indexOf(item) === 6) {
          return true
        } else {
          return false
        }
      },
      
      // 퀴즈 (펜)
       IsQuiz(item) {   // Quiz index with Content (Quiz수정의 index인지를 비교)
        if(this.mCalendarFrontSelectedEvent.showevent.indexOf(item) === 7) {
          return true
        } else {
          return false
        }
      },

      PopupStartTime() {    // Popup StartDatePicker dialog window in CreateClassModal
        this.mCreateClassModalStartDatePicker  = true
      },

      PopupEndTime() {      // Popup EndDatePicker dialog window in CreateClassModal
        this.mCreateClassModalFinishDatePicker = true
      },

      PopupLecturelist() {    // Popup Lecturelist dialog window in CreateClassModal and load Class Map data
        this.FetchMapData()
        this.mPopupMaplistDialog = true
      },

      // 학생 리스트
      PopupStudentList() {    // Popup StudentList dialog window in CreateClassModal
        this.mPopupStudentListDialog = true  // 
      },
      CloseStudentList(){    // Close StudentList dialog window in CreateClassModal
        this.mPopupStudentListDialog = false // 
      },

      // 컨텐츠
      PopupContentList() {    // Popup Content dialog window in CreateClassModal and load Content 
        this.FetchContentData()
        this.mPopupContentListDialog = true
      },

      CloseContentsList(){   // close Content dialog window in CreateClassModal and load Content 
        this.mPopupContentListDialog = false
      },

      // 강의실 이름 수정할 때, 강의실 선택 창 닫기 
      CloseClassList() {    // close classlist dialog window in CreateClassModal 
        this.mPopupMaplistDialog = false
      },

      // 퀴즈
      PopupQuizList() {     // Popup Quizlist dialog window in CreateClassModal and load Content
        this.FetchQuizData()
        this.mPopupQuizListDialog = true
      },

      CloseQuizList(){    // close Quizlist dialog window in CreateClassModal 
        this.mPopupQuizListDialog = false
      },

      Setmapdata(item){   // Set classmap data
        this.mCalendarFrontSelectedEvent.showevent[3].CalendarClassnameAction = item.name
        this.mCalendarFrontSelectedEvent.showevent[4].CalendarClassnameAction = item.typename
        this.mCalendarFrontSelectedEvent.showevent[5].CalendarClassnameAction = this.mCalendarFrontSelectedEvent.showevent[5].CalendarClassnameAction.slice(0, 1) + "/" + item.maxUser
        this.mCalendarFrontSelectedEvent.mapId = item.id;
        this.mPopupMaplistDialog=false
        this.CalendarFrontSelectedOpen=false
        this.CalendarFrontSelectedOpen=true
      },

      // 컨텐츠 수정본 저장
      SetContentData(item) {    // Set Content data
        this.mCalendarFrontSelectedEvent.showevent[6].CalendarClassnameAction = item.name
        this.mCalendarFrontSelectedEvent.contentId = item.id
        this.mPopupContentListDialog=false
      },

      // 퀴즈 수정본 저장
       SetQuizData(item) {      // Set Quiz data
        this.mCalendarFrontSelectedEvent.showevent[7].CalendarClassnameAction = item.name
        this.mCalendarFrontSelectedEvent.quizId = item.id
        this.mPopupQuizListDialog=false
      },

      SetStartTime() {      // Set Start Time
        this.mCalendarFrontSelectedEvent.showevent[0].CalendarClassnameAction = this.mCreateClassModalStartDate + " " + this.mCreateClassModalStartTime + ":00";
        this.mCreateClassModalStartDatePicker  = false;
        this.mCreateClassModalStartTimePicker = false;
      },

      SetEndTime() {      // Set End Time
        this.mCalendarFrontSelectedEvent.showevent[1].CalendarClassnameAction = this.mCreateClassModalFinishDate + " " + this.mCreateClassModalFinishTime + ":00";
        this.mCreateClassModalFinishDatePicker = false;
        this.mCreateClassModalFinishTimePicker = false;
      },

      PopupEditEventName() {      // Popup Edit Front Selected Event name dialog(title)
        this.mEditLectureName = this.mCalendarFrontSelectedEvent.name
        this.mEditClassNameDialog = true
      },

      CloseEditEventName() {     // Close Edit Front Selected Event name dialog(title) 
        this.mEditClassNameDialog = false
      },

      SaveLectureName() {       // Save Edit Event Name in dialog and set mEditLectureName
        this.mCalendarFrontSelectedEvent.name = this.mEditLectureName
        this.CloseEditEventName()
      },

      CalendarFrontViewDay ({ date }) {    // Set Calendar mode to 'day'
        this.mCalendarFrontFocus = date
        this.mCalendarFrontType = 'day'
      },

      CalendarFrontSetToday () {          // Set Calendar focus today
        this.mCalendarFrontFocus = ''
      },

      Prev () {                           // move prev month botton
        this.$refs.calendar.prev() // CalendarFrontPrev
      },

      Next () {                           // move Next month botton
        this.$refs.calendar.next() // CalendarFrontNext
      },

      // 07. 맵리스트   
      FetchMapData() {      // Get Class Map information list from server (07. maplist)
        this.mMapList = [];
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
                this.mMapList.push({
                  id: element.id,
                  name: element.name,
                  type: element.type,
                  maxUser: element.maxUser,
                  typename: maptype,
                })
              })
            }
          })
      },
      
      // 컨텐츠 목록 API : 16. Post- http://IPAdress/api/content/post/contentlist
      FetchContentData() {          // Get Content data list from server (16. contentlist)
        this.mContentList = []
        var url = "http://163.180.117.22:8088/api/content/post/contentlist";
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
            this.mContentList.push({
              id: null,
              name: "컨텐츠 없음"
            })
            if (res.data.data.length >= 0) {
              res.data.data.forEach(element => {
                this.mContentList.push({
                  id: element.id,
                  name: element.name
                })
              })
            }
          }))
      },

      // API 42. 퀴즈 리스트 get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1 
      FetchQuizData() {               // Get Quiz list from server (42. quizlist)
        this.mQuizList = [];  
        var userId = this.$store.getters.getUserInfo.id;
        var url = "http://163.180.117.22:8088/api/quiz/get/list?instructorId=" + userId;
        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        this.$http
          .get(url, config)
          .then(res => {
            this.mQuizList.push({
              id: null,
              name: "퀴즈 없음"
            })
            if (res.data.data.length >0) {
              res.data.data.forEach(element => {
                this.mQuizList.push({
                  id: element.id,
                  name: element.name
                })
              })
            }
          })
      },
     
      // 선생님 강좌 목록 불러오기 : 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
      CalendarFrontUpdateRange ({ start, end }) {     // Get lectureinfomation list from server (12. lecturelist)
        this.mBeforestart = start;
        this.mBeforeend = end;
        // 이벤트 막대기 생성부분
        const mCalendarFrontEvents = [] // const : 내용을 변경하지 않음
        var url = "http://163.180.117.22:8088/api/lecture/instructor/post/lecturelist";
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
                this.mStudentList=element.students;
                mCalendarFrontEvents.push({
                  name: element.name,
                  start: new Date(`${element.startTime}`),
                  end: new Date(`${element.endTime}`),
                  timed: true,
                  classid: element.id,
                  mapId: element.mapId,
                  mapName: element.mapName,
                  contentId: element.contentId,
                  quizId: element.quizId,
                  color: element.color,
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
            this.mCalendarFrontEvents = mCalendarFrontEvents;
            console.log(this.mStudentList)
          })
      },

      // 선생님 강좌 목록 불러오기 : 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
      RefreshData() {               // Get lectureinfomation list from server for refresh after edit (12. lecturelist)
        const mCalendarFrontEvents = []
        var url = "http://163.180.117.22:8088/api/lecture/instructor/post/lecturelist";
        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          instructorId: userId,
          startDate: this.mBeforestart.date,
          endDate: this.mBeforeend.date
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
                this.mStudentList=element.students;
                mCalendarFrontEvents.push({
                  name: element.name,
                  start: new Date(`${element.startTime}`),
                  end: new Date(`${element.endTime}`),
                  timed: true,
                  classid: element.id,
                  mapId: element.mapId,
                  mapName: element.mapName,
                  contentId: element.contentId,
                  quizId: element.quizId,
                  color: element.color,
                 
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
            this.mCalendarFrontEvents = mCalendarFrontEvents;
          })
      },

      CalendarFrontShowEvent ({ nativeEvent, event }) {   // Show event modals in calendar month page
        const open = () => {
          this.mCalendarFrontSelectedEvent = event
          this.mCalendarFrontSelectedElement = nativeEvent.target
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

      ClassDelete(a) {           // Delete class (deletelecture)
        var url = "http://163.180.117.22:8088/api/lecture/instructor/patch/deletelecture";
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
              this.RefreshData();
            } else if (res.data.success === false) {
              alert(res.data.message);
            }
          })
      },

      CalendarFrontSetActivePopup(modal) {       // Popup create class event dialog window
        if(modal == true)
        {
          this.mCreateClassModal = false;
        }
        else
        {
          this.mCreateClassModal = true; 
        }
      },

      // 강좌 수정 10. Patch - http://IPAdress/api/lecture/instructor/patch/updatelecture
      PatchEditedClass(a) {                       // Update Class infomation to server(10. updatelecture)
        var url = "http://163.180.117.22:8088/api/lecture/instructor/patch/updatelecture ";
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
            color: a.color,

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
                this.RefreshData();
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

    // 강의 메시지 전송 AppendCalendarFrontMessage
    // 45. 메일 전송 post http://localhost:8088/api/mail/send -- 전체학생들에게 전송
    AppendCalendarFrontMessage() {            // Send message to all student (45. send)
      if(this.mEmailClick ) {
        let url = "http://163.180.117.22:8088/api/mail/send";
        let userId = this.$store.getters.getUserInfo.id;
        let payload = {
          instructorId: userId,
          context: this.mMessageContext,
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
              this.CloseCalendarFrontMessage();
            } else if (res.data.success === false) {
              alert(res.data.message);
            }
          }) 
        }   else if(this.mMessageClick) {
              let url = "http://163.180.117.22:8088/api/sms/send"; // http://localhost:8088/api/sms/send 

              //var userId = this.$store.getters.getUserInfo.id;
              let payload = {
                //instructorId: userId,
                context: this.mMessageContext,
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
                    this.CloseCalendarFrontMessage();
                  } else if (res.data.success === false) {
                    alert(res.data.message);
                  }
                })
           }
    },
  },
}
</script>
