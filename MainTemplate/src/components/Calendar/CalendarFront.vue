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
<<<<<<< HEAD
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
=======
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
              <v-toolbar-title style="color:black" v-if="$refs.calendar">
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
                    color="teal"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ CalendarFrontTypeToLabel[CalendarFrontType] }}</span>
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
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
=======
    <!--캘린더 전체 sheet 상하(위-아래)사이즈 조절 -->
    <!--원래 사이즈 600에서 850으로 변경-->
    <!--:events="CalendarFrontEvents" 이벤트: 시간, 과목-->
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
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
                            @click="SaveLectureName()"
                          >
                            등록 확인
                          </v-btn>
=======
                            @click="saveLectureName()"
                          >등록 확인
                          </v-btn>
                          <v-btn
                            color="primary"
                            text
                            @click="closeLectureName()"
                          >닫기
                          </v-btn>

>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
              :headers="mAllClassInformationHeaders" 
              :items="mCalendarFrontSelectedEvent.showevent"
=======
              :headers="TotalHeaders"
              :items="CalendarFrontSelectedEvent.showevent"
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
                              v-model="mTotaleditedItem.CalendarClassnameTitle"
=======
                              v-model="TotaleditedItem.CalendarClassnameTitle"
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
                              v-model="mTotaleditedItem.CalendarClassnameAction"
=======
                              v-model="TotaleditedItem.CalendarClassnameAction"
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
                              label="강의 상세정보"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
<<<<<<< HEAD
=======

                    
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
                <!--PopupLecturelist-->
=======

>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
                <v-icon
                  small
                  class="mr-2"
                  @click="PopupLecturelist()"
                  v-else-if="IsLecturename(item)"
                >
                  mdi-pencil
                </v-icon>
<<<<<<< HEAD
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
=======

                <!--참여인원수 : 회원(학생)리스트-->
                <v-icon
                  small
                  class="mr-2"
                  @click="popupStudentList()"
                  v-else-if="isStudentList(item)"
                >
                  mdi-pencil
                </v-icon>

                 <!--ClaendarStudentListModal
            <ClaendarStudentListModal
            v-if="ClaendarStudentListModal"
            @close="
            ClaendarStudentListModal = false;"
            />-->

                <!--컨텐츠 펜 아이콘-->
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
=======
                
                <!--퀴즈 펜 아이콘-->
                <v-icon
                  small
                  class="mr-2"
                  @click="popupQuizList()"
                  v-else-if="isQuiz(item)"
                >
                  mdi-pencil
                </v-icon>

                

>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
              </template>
            </v-data-table>

            <!--Information change Pen-click : mPopupMaplistDialog-->
            <v-dialog
              v-model="mPopupMaplistDialog"
              max-width="500px"
            >
              <v-card>
<<<<<<< HEAD
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
=======
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
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
                          <v-btn
                            width="98%"
                            color="grey lighten-2"
                            v-bind="attrs"
                            v-on=on
                            @click="Setmapdata(item)"
                          >{{ item.name }}: {{ item.typename }}/{{ item.maxUser }}명
                          </v-btn>
=======
                        <v-btn
                          width="98%"
                          color="light-blue lighten-2"
                          v-bind="attrs"
                          v-on=on
                          @click="Setmapdata(item)"
                        >{{ item.name }}: {{ item.typename }}/{{ item.maxUser }}명</v-btn>
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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

<<<<<<< HEAD
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
=======
           
           <!--참여인원수 버튼 클릭시 나타나는 화면 : 참여자 명단-->
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
                    
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a

                          <v-list-item-content>
                            <v-list-item-title>
                             <strong>{{ item.studentName }}</strong>
                            </v-list-item-title>
                          </v-list-item-content>

<<<<<<< HEAD
=======
                    <v-divider></v-divider>

                    <v-virtual-scroll
                      :items="studentlist"
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


>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
                          <v-list-item-action>
                             <v-list-item-title>
                              <strong>{{ item.loginId }}</strong>
                            </v-list-item-title>
                          </v-list-item-action>
    
<<<<<<< HEAD
=======

                          <!--<v-list-item-action>
                            <v-btn
                              depressed
                              small
                            >
                              View User

                              <v-icon
                                color="orange darken-4"
                                right
                              >
                                mdi-open-in-new
                              </v-icon>
                            </v-btn>
                          </v-list-item-action>-->
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
                        </v-list-item>
                        <v-divider></v-divider>
                      </template>
                    </v-virtual-scroll>
<<<<<<< HEAD
                  </div>
                </v-card>
              </v-dialog>
            </template>
=======
                    </div>
                  </v-card>
                </v-dialog>
              </template>

>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a

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
<<<<<<< HEAD
                      icon
                      dark
                      @click="CloseContentsList"
                      >
=======
                    icon
                    dark
                    @click="closeContentsList"
                    >
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
                          <v-btn
                            width="98%"
                            color="grey lighten-2"
                            v-bind="attrs"
                            v-on=on
                            @click="SetContentData(item)"
                          >{{ item.name }}
                          </v-btn>
=======
                        <v-btn
                          width="98%"
                          color="light-blue lighten-2"
                          v-bind="attrs"
                          v-on=on
                          @click="SetContentData(item)"
                        >{{ item.name }}</v-btn>
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-dialog>
                </v-col>
              </v-card>
            </v-dialog>

            <!-- 퀴즈 dialog-->
            <v-dialog
<<<<<<< HEAD
              v-model="mPopupQuizListDialog"
=======
              v-model="popupQuizListDialog"
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
              max-width="500px"
            >
            <!--퀴즈 상단 box-->
              <v-card>
<<<<<<< HEAD
                <v-toolbar
                  class="overflow-hidden mx-auto"
                  color="light-blue darken-4"
                  dark  
                >
=======
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



>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a

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
            
<<<<<<< HEAD
              <v-date-picker v-model="mCreateClassModalStartDate" scrollable :min="mCreateClassModalFinishDate">
=======
              <v-date-picker v-model="CreateClassModalStartDate1" scrollable :min="CreateClassModalFinishDate3">
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
            <!--:allowed-minutes="AllowedInterval" -->
=======
            <!--:allowed-minutes="allowedInterval" -->
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
              <v-time-picker
                v-if="mCreateClassModalStartTimePicker"
                v-model="mCreateClassModalStartTime"
                full-width
<<<<<<< HEAD
                :allowed-minutes="AllowedInterval"
=======
                :allowed-minutes="allowedInterval"
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
              <v-date-picker v-model="mCreateClassModalFinishDate" scrollable :min="mCreateClassModalStartDate">
=======
              <v-date-picker v-model="CreateClassModalFinishDate3" scrollable :min="CreateClassModalStartDate1">
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
                v-if="mCreateClassModalFinishTimePicker"
                v-model="mCreateClassModalFinishTime" 
=======
                v-if="CreateClassModalFinishTimeModal"
                v-model="CreateClassModalFinishTime4" 
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
            
<<<<<<< HEAD
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
=======
            
       
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
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
          @click="CalendarFrontSetActivePopup(mCreateClassModal)"
=======
          @click="CalendarFrontSetActivePopup(CreateClassModal)"
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
//import ClaendarStudentListModal from './ClaendarStudentListModal.vue' // ClaendarStudentListModal

  export default {
    components: { CreateClassModal },
    data: () => ({
<<<<<<< HEAD
      mCreateClassModalColorItem: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal','green', 'light-green', 'lime', 'amber'], // define colorlist
      mAllClassInformationDialog: false, // class information dialog flag
      mMode: 'column', // event overlab mode (stack is overlap/ column is not overlab)
      mPopupMaplistDialog: false, // map list dialog flag
      mPopupStudentListDialog: false, // student list dialog flag
      mPopupContentListDialog: false, // content list dialog flag
      mPopupQuizListDialog: false, // quiz list dialog flag
      mEditClassNameDialog: false, // classname change dialog flag
=======
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
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a

      mCreateClassModalStartDatePicker: false, // class select > class start-date picker
      mCreateClassModalStartTime: "", // class select > start-time input data variable
      mCreateClassModalStartTimePicker: false, // class select > start-time picker
      mCreateClassModalFinishDatePicker: false, // class select > finsh-date picker  

<<<<<<< HEAD
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
=======
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
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
        CalendarClassnameTitle: '', // 강의 정보
        CalendarClassnameAction: 0, // 강의 상세정보
      },

<<<<<<< HEAD
      // 여기서부터 시작!!!! (7/9)
=======
      // 참여인원수 클릭시 들어오는 StudenteditedItem (학생이름, 아이디에 대한 정보)
      StudenteditedItem: {
        studentName: '', // 학생 이름
        studentId: '', // 학생 아이디
      },

>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
      
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
<<<<<<< HEAD
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
=======
      GetEventColor (event) {
        return event.color
      },

      // 참여 리스트 : 동그라미 이름
      GetFirstName(name){
        var length = name.length
        return name.substr(1, length-1)
      },

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

  

      isStartTime(item) {
        if (this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 0){
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
          return true
        } else {
            return false
        }
      },

<<<<<<< HEAD
      IsEndTime(item) {   // Compare index with Endtime (EndTime의 index인지를 비교)
        if (this.mCalendarFrontSelectedEvent.showevent.indexOf(item) === 1) {
=======
      isEndTime(item) {
        if (this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 1) {
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
          return true
        } else {
            return false
        }
      },

<<<<<<< HEAD
      IsLecturename(item) {   // Compare index with Lecturename (Lecture리스트의 index인지를 비교)
        if(3 === this.mCalendarFrontSelectedEvent.showevent.indexOf(item)) {
=======
      checkIndex(item){
        if(2 <= this.CalendarFrontSelectedEvent.showevent.indexOf(item)){
          return false
        }
        else{return true}
      },
      isLecturename(item){
        if(3 === this.CalendarFrontSelectedEvent.showevent.indexOf(item)){
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
          return true
        }
        else{return false}
      },

       // 참여 인원수 (펜)
<<<<<<< HEAD
      IsStudentList(item) {   // Compare index with StudentList (Student리스트의 index인지를 비교)
        if(this.mCalendarFrontSelectedEvent.showevent.indexOf(item) === 5) {
=======
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
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
          return true
        } else {
          return false
        }
      },
<<<<<<< HEAD

      // 컨텐츠 (펜)
      IsContent(item) {   // Compare index with Content (Content수정의 index인지를 비교)
        if(this.mCalendarFrontSelectedEvent.showevent.indexOf(item) === 6) {
=======
      
      // 퀴즈 (펜)
       isQuiz(item) {
        if(this.CalendarFrontSelectedEvent.showevent.indexOf(item) === 7) {
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
          return true
        } else {
          return false
        }
<<<<<<< HEAD
=======
      },

      popupStartTime() {
        this.CreateClassModalStartDateModal = true
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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

<<<<<<< HEAD
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
=======
      // 학생 리스트
      popupStudentList() {
        this.popupStudentListDialog = true  // 
      },
      closeStudentList(){
        this.popupStudentListDialog = false // 
      },
      /*
      popupStudentList(modal){
        if(modal == true)
        {
          this.ClaendarStudentListModal = false;
        }
        else
        {
          this.ClaendarStudentListModal = true; 
        }
      },

      closeStudentList(modal){
        if(modal == true)
        {
          this.ClaendarStudentListModal = false;
        }
        else
        {
          this.ClaendarStudentListModal = true; 
        }
      },*/

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

      // 처음 등록 확인
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
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
=======

      fetchMapData() {
        this.maplist = [];
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a

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
              this.color = this.CalendarFrontGetEventColor();

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
<<<<<<< HEAD
=======
                  color: this.color
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
                })
              })
            }
          })
      },
      
<<<<<<< HEAD
      // 컨텐츠 목록 API : 16. Post- http://IPAdress/api/content/post/contentlist
      FetchContentData() {          // Get Content data list from server (16. contentlist)
        this.mContentList = []
        var url = "http://163.180.117.22:8088/api/content/post/contentlist";
=======
  
      // 컨텐츠 목록 API : 16. Post- http://IPAdress/api/content/post/contentlist
      fetchContentData() {
        this.contentlist = []

        var url = "http://163.180.117.47:8088/api/content/post/contentlist";

>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
=======

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
         
        const CalendarFrontEvents = [] // const : 내용을 변경하지 않음
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a

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
<<<<<<< HEAD
                this.mStudentList=element.students;
                mCalendarFrontEvents.push({
=======
                this.studentlist=element.students;
                CalendarFrontEvents.push({
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
                  name: element.name,
                  start: new Date(`${element.startTime}`),
                  end: new Date(`${element.endTime}`),
                  timed: true,
                  classid: element.id,
                  mapId: element.mapId,
                  mapName: element.mapName,
                  contentId: element.contentId,
                  quizId: element.quizId,
<<<<<<< HEAD
                  color: element.color,
=======
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD

=======
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
                    { // 퀴즈 선택 추가
                      CalendarClassnameAction: element.quizName,
                      CalendarClassnameTitle: '퀴즈 이름'
                    },
                  ]
                })
              })
            }
<<<<<<< HEAD
            this.mCalendarFrontEvents = mCalendarFrontEvents;
            console.log(this.mStudentList)
          })
      },
=======
            this.CalendarFrontEvents = CalendarFrontEvents;
            //console.log(this.studentlist);
          })
      },

      // 선생님 강좌 목록 불러오기 : 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
      refreshData() { 
        const CalendarFrontEvents = []
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a

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
<<<<<<< HEAD
                this.mStudentList=element.students;
                mCalendarFrontEvents.push({
=======
                this.studentlist=element.students;

                CalendarFrontEvents.push({
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
                  name: element.name,
                  start: new Date(`${element.startTime}`),
                  end: new Date(`${element.endTime}`),
                  timed: true,
                  classid: element.id,
                  mapId: element.mapId,
                  mapName: element.mapName,
                  contentId: element.contentId,
                  quizId: element.quizId,
<<<<<<< HEAD
                  color: element.color,
                 
=======
                 
        
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
            this.mCalendarFrontEvents = mCalendarFrontEvents;
          })
      },

      CalendarFrontShowEvent ({ nativeEvent, event }) {   // Show event modals in calendar month page
=======
            this.CalendarFrontEvents = CalendarFrontEvents;
            
          })
      },


      CalendarFrontShowEvent ({ nativeEvent, event }) {
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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

<<<<<<< HEAD
        }
        var config = {
          headers: {
=======
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
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
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
<<<<<<< HEAD
        }   else if(this.mMessageClick) {
              let url = "http://163.180.117.22:8088/api/sms/send"; // http://localhost:8088/api/sms/send 
=======
      } else if(this.messageClick) {
          let url = "http://163.180.117.47:8088/api/sms/send"; // http://localhost:8088/api/sms/send 
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a

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
<<<<<<< HEAD
  },
}
</script>
=======

    intervalFormat() {
            const longOptions = { timeZone: 'UTC', hour12: true, hour: '2-digit', minute: '2-digit' }
            //const shortOptions = { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: '2-digit' }
            //const shortHourOptions = { timeZone: 'UTC', hour12: true, hour: 'numeric' }

            return longOptions
        }


  },
}

</script>

<!--
<style>
/* 캘린더 상단에 week와 day클릭 시, 왼쪽 시간을 투명색으로 주기 */ 
.v-calendar-daily__interval-text {
  color: transparent !important
}
</style>-->
>>>>>>> 5b00440d23b68d6f77e5eb526902a0d29714d54a
