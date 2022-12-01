<!--Student-Calendar-Front-->
<template>
<v-row class="fill-height">
  <v-col>
    <v-sheet height="64">
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
    </v-sheet>
    <!--캘린더 전체 sheet 상하(위-아래)사이즈 조절 -->
    <!--원래 사이즈 600에서 800으로 변경-->
    <v-sheet height="800">
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
      ></v-calendar>
      <!--event 클릭 시 나타나는 화면--> 
      <v-menu
        v-model="CalendarFrontSelectedOpen"
        :close-on-content-click="false"
        :activator="CalendarFrontSelectedElement"
        offset-x
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
          >
            <v-toolbar-title v-html="CalendarFrontSelectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <!--캘린더에서 이벤트(과목)을 클릭 했을 때, 나타나는 '전체'화면-->
          <!--과목명 안에 있는 card-text 시작-->
          <v-card-text>
            <v-list two-line>
              <v-list-item-group
                v-model="selected"
                active-class="pink--text"
                multiple
              >
              <template v-for="(CalendarClassnameItem, CalendarClassnameIndex) in CalendarFrontSelectedEvent.showevent">
                <v-list-item :key="CalendarClassnameItem.CalendarClassnameTitle">
                  <v-list-item-content>
                    <v-list-item-title v-text="CalendarClassnameItem.CalendarClassnameTitle"></v-list-item-title>
                    <v-list-item-subtitle
                      class="text--primary"
                      v-text="CalendarClassnameItem.headline"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="CalendarClassnameItem.CalendarClassnameSubTitle"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text v-text="CalendarClassnameItem.CalendarClassnameAction"></v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  v-if="CalendarClassnameIndex < CalendarFrontSelectedEvent.showevent.length - 1"
                  :key="CalendarClassnameIndex"
                ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card-text>
          <!--과목명 안에 있는 card-text 끝-->
          <span v-html="CalendarFrontSelectedEvent.details"></span>
          <!--캘린더에서 이벤트(과목)을 클릭 했을 때, 나타나는 '전체'화면에서 가장 "하단"-->
          <v-card-actions>
            <!--강의 메세지 전송 삭제-->
            <v-spacer></v-spacer>
            <v-btn
              v-if="CalendarFrontSelectedEvent.isRegistered === false"
              text
              color="secondary"
              @click=register(CalendarFrontSelectedEvent)
              :disabled="!CalendarFrontSelectedEvent.canJoinCancel"
            >
              수강 신청
            </v-btn>
            <v-btn
              v-if="CalendarFrontSelectedEvent.isRegistered === true"
              text
              color="secondary"
              @click=deletelecture(CalendarFrontSelectedEvent)
              :disabled="CalendarFrontSelectedEvent.canJoinCancel"
            >
              수강 취소
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-col>
</v-row>
</template>

<!--script-->
<script>
var RestAPIManager = require('../../RestAPIManager');
var ClassMapEnum = require("../../Enum/MapEnum");
var MapType = ClassMapEnum.Maptype;

export default {
  data: () => ({
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
    CalendarFrontColors: ['light-green lighten-1', 'grey lighten-1'], // 색도 랜덤 값
    CalendarFrontNames: ['과목명'], // 캘린더에서 과목을 클릭 했을 때, 나타나는 과목명 // 랜덤 값 추출
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
  // StudentCalendarFront
  name: "StudentCalendarFront", // StudentCalendarFront

  mounted () {
    this.$refs.calendar.checkChange()
  },

  methods: {
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
    
    // 수강 신청 가능 리스트 API : 25. Post - http://IPAddress/api/lecture/student/post/registerlecturelist
    // 수강 신청한 강좌 조회 API : 22. Post - http://IPAddress//api/lecture/student/post/lecturelist
    async CalendarFrontUpdateRange ({ start, end }) {
      this.beforestart = start;
      this.beforeend = end;
      // 이벤트 막대기 생성부분
      // 여기서 데이터베이스에서 정보를 가져와야한다.
      // 가져올 데이터 data , time

      var userId = this.$store.getters.getUserInfo.id;
      var registerlecturelistRes = await RestAPIManager.API_registerlecturelist(userId, start.date, end.date);

      const CalendarFrontEvents = []
      var maptype = "";

      for (const lecture of registerlecturelistRes.lectureList) {        
 
        if (lecture.mapType === MapType.OPEN) {
          maptype = "오픈형";
        } else if (lecture.mapType === MapType.CASCADING) {
          maptype = "계단식";
        } else if (lecture.mapType === MapType.MEETING_ROOM) {
          maptype = "소회의실"
        }

        var endTime = new Date(`${lecture.endTime}`);
        var now = new Date();
        
        var canJoinCancel;
        
        if (now > endTime) {
          canJoinCancel = false;
        } else {
          canJoinCancel = true;
        }
        CalendarFrontEvents.push({
          name: lecture.name,
          start: new Date(`${lecture.startTime}`),
          end: endTime,
          color: this.CalendarFrontColors[1],
          timed: true,
          classid: lecture.id,
          isRegistered: false,
          canJoinCancel: canJoinCancel,
          showevent: [
            {
              CalendarClassnameAction: lecture.startTime,
              CalendarClassnameTitle: '강의 시작 일자',
            },
            {
              CalendarClassnameAction: lecture.endTime,
              CalendarClassnameTitle: '강의 끝 일자',
            },
            {
              CalendarClassnameAction: lecture.instructorName,
              CalendarClassnameTitle: '강의자',
            },
            {
              CalendarClassnameAction: maptype,
              CalendarClassnameTitle: '강의 타입',
            },
            {
              CalendarClassnameAction: lecture.countUser+"/"+lecture.mapMaxUser,
              CalendarClassnameTitle: '참여 인원수',
            },
          ]
        })
      }
      
      var studentlecturelistRes = await RestAPIManager.API_studentlecturelist(userId, start.date, end.date)
      for (const lecture of studentlecturelistRes.lectureList) {
        
          if (lecture.mapType === MapType.OPEN) {
            maptype = "오픈형";
          } else if (lecture.mapType === MapType.CASCADING) {
            maptype = "계단식";
          } else if (lecture.mapType === MapType.MEETING_ROOM) {
            maptype = "소회의실"
          }
          CalendarFrontEvents.push({
            name: lecture.name,
            start: new Date(`${lecture.startTime}`),
            end: new Date(`${lecture.endTime}`),
            color: this.CalendarFrontColors[0],
            timed: true,
            classid: lecture.id,
            isRegistered: true,
            showevent: [
              {
                CalendarClassnameAction: lecture.startTime,
                CalendarClassnameTitle: '강의 시작 일자',
              },
              {
                CalendarClassnameAction: lecture.endTime,
                CalendarClassnameTitle: '강의 끝 일자',
              },
              {
                CalendarClassnameAction: lecture.instructorName,
                CalendarClassnameTitle: '강의자',
              },
              {
                CalendarClassnameAction: maptype,
                CalendarClassnameTitle: '강의 타입',
              },
              {
                CalendarClassnameAction: lecture.countUser+"/"+lecture.mapMaxUser,
                CalendarClassnameTitle: '참여 인원수',
              },
            ]
          })
      }
      this.CalendarFrontEvents = CalendarFrontEvents;
    },

    // 강좌 수강 신청 API : 24. Post - http://IPAddress/api/lecture/student/post/joinlecture
    async register(a) {
      var userId = this.$store.getters.getUserInfo.id;
      var joinlectureRes = await RestAPIManager.API_joinlecture(userId, a.classid);

      if (joinlectureRes.success === true) {
        alert("수강신청이 완료되었습니다.");
        this.CalendarFrontSelectedOpen = false;
        this.refreshData();
      } else {
        alert(joinlectureRes.message);
      }
      console.log(joinlectureRes);

    },

    // 수강 신청 가능 리스트 API : 25. Post - http://IPAddress/api/lecture/student/post/registerlecturelist
    // 수강 신청한 강좌 조회 API : 22. Post - http://IPAddress//api/lecture/student/post/lecturelist
    async refreshData() { 
      var userId = this.$store.getters.getUserInfo.id;
      var registerlectureRes =  await RestAPIManager.API_registerlecturelist(userId, this.beforestart.date, this.beforeend.date);

      var maptype = "";
      const CalendarFrontEvents = []

      for (const lecture of registerlectureRes.lectureList) {
        
        if (lecture.mapType === MapType.Open) {
          maptype = "오픈형"
        } else if (lecture.mapType === MapType.CASCADING) {
          maptype = "계단식";
        } else if (lecture.mapType === MapType.MEETING_ROOM) {
          maptype = "소회의실"
        }

        var endTime = new Date(`${lecture.endTime}`);
        var now = new Date();
        
        var canJoinCancel;
        
        if (now > endTime) {
          canJoinCancel = false;
        } else {
          canJoinCancel = true;
        }
        
        CalendarFrontEvents.push({
          name: lecture.name,
          start: new Date(`${lecture.startTime}`),
          end: new Date(`${lecture.endTime}`),
          color: this.CalendarFrontColors[1],
          isRegistered: false,
          canJoinCancel: canJoinCancel,
          timed: true,
          showevent: [
            {
              CalendarClassnameAction: lecture.startTime,
              CalendarClassnameTitle: '강의 시작 일자',
            },
            {
              CalendarClassnameAction: lecture.endTime,
              CalendarClassnameTitle: '강의 끝 일자',
            },
            {
              CalendarClassnameAction: lecture.instructorName,
              CalendarClassnameTitle: '강의자',
            },
            {
              CalendarClassnameAction: maptype,
              CalendarClassnameTitle: '강의 타입',
            },
            {
              CalendarClassnameAction: lecture.countUser+"/"+lecture.mapMaxUser,
              CalendarClassnameTitle: '참여 인원수',
            },
          ]
        })
      }
      this.CalendarFrontEvents = CalendarFrontEvents;


      var studentlecturelistRes = await RestAPIManager.API_studentlecturelist(userId, this.beforestart.date, this.beforeend.date);
      
      for (const lecture of studentlecturelistRes.lectureList) {
        if (lecture.mapType === MapType.OPEN) {
          maptype = "오픈형";
        } else if (lecture.mapType === MapType.CASCADING) {
          maptype = "계단식";
        } else if (lecture.mapType === MapType.MEETING_ROOM) {
          maptype = "소회의실"
        }
        CalendarFrontEvents.push({
          name: lecture.name,
          start: new Date(`${lecture.startTime}`),
          end: new Date(`${lecture.endTime}`),
          color: this.CalendarFrontColors[0],
          timed: true,
          classid: lecture.id,
          isRegistered: true,
          showevent: [
            {
              CalendarClassnameAction: lecture.startTime,
              CalendarClassnameTitle: '강의 시작 일자',
            },
            {
              CalendarClassnameAction: lecture.endTime,
              CalendarClassnameTitle: '강의 끝 일자',
            },
            {
              CalendarClassnameAction: lecture.instructorName,
              CalendarClassnameTitle: '강의자',
            },
            {
              CalendarClassnameAction: maptype,
              CalendarClassnameTitle: '강의 타입',
            },
            {
              CalendarClassnameAction: lecture.countUser+"/"+lecture.mapMaxUser,
              CalendarClassnameTitle: '참여 인원수',
            },
          ]
        })
      }
    },

    // 강좌 취소 API : 23. Post - http://IPAddress/api/lecture/student/delete/deletelecture
    async deletelecture(a) {
      var userId = this.$store.getters.getUserInfo.id;

      var deletelectureRes = await RestAPIManager.API_deletelecture(userId, a.classid);
      if (deletelectureRes.success === true) {
        alert("수강 취소가 완료되었습니다.")
        this.CalendarFrontSelectedOpen = false;
        this.refreshData();
      } else if (deletelectureRes.success === false) {
        alert(deletelectureRes.message);
      }
    },

    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>
