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
                :disabled="!CalendarFrontSelectedEvent.canJoinCancel"
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
      CalendarFrontUpdateRange ({ start, end }) {
        this.beforestart = start;
        this.beforeend = end;
        // 이벤트 막대기 생성부분
        // 여기서 데이터베이스에서 정보를 가져와야한다.
        // 가져올 데이터 data , time
         
        const CalendarFrontEvents = []

        var url = "http://163.180.117.22:8088/api/lecture/student/post/registerlecturelist";
        
        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          studentId: userId,
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

                var endTime = new Date(`${element.endTime}`);
                var now = new Date();
                
                var canJoinCancel;
                
                if (now > endTime) {
                  canJoinCancel = false;
                } else {
                  canJoinCancel = true;
                }
                CalendarFrontEvents.push({
                  name: element.name,
                  start: new Date(`${element.startTime}`),
                  end: endTime,
                  color: this.CalendarFrontColors[1],
                  timed: true,
                  classid: element.id,
                  isRegistered: false,
                  canJoinCancel: canJoinCancel,
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
                      CalendarClassnameAction: maptype,
                      CalendarClassnameTitle: '강의 타입',
                    },
                    {
                      CalendarClassnameAction: element.countUser+"/"+element.mapMaxUser,
                      CalendarClassnameTitle: '참여 인원수',
                    },
                  ]
                })
              })

            }
            this.CalendarFrontEvents = CalendarFrontEvents;
          })
        
        var url2 = "http://163.180.117.22:8088/api/lecture/student/post/lecturelist";
        
        this.$http
          .post(url2, payload, config)
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
                  isRegistered: true,
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
                      CalendarClassnameAction: maptype,
                      CalendarClassnameTitle: '강의 타입',
                    },
                    {
                      CalendarClassnameAction: element.countUser+"/"+element.mapMaxUser,
                      CalendarClassnameTitle: '참여 인원수',
                    },
                  ]
                })
              })
            }
          })


      },
      register(a) {
        var url = "http://163.180.117.22:8088/api/lecture/student/post/joinlecture";

        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          studentId: userId,
          lectureId: a.classid
        }
        var config = {
          "Content-Type": "application/json"
        }

        this.$http
          .post(url, payload, config)
          .then(res => {
            if (res.data.success === true) {
              alert("수강신청이 완료되었습니다.");
              this.CalendarFrontSelectedOpen = false;
              this.refreshData();
            } else {
              alert(res.data.message);
            }
          })

        
      },
      refreshData() { 
        const CalendarFrontEvents = []

        var url = "http://163.180.117.22:8088/api/lecture/student/post/registerlecturelist";
        
        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          studentId: userId,
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
                  color: this.CalendarFrontColors[1],
                  isRegistered: false,
                  timed: true,
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
                      CalendarClassnameAction: maptype,
                      CalendarClassnameTitle: '강의 타입',
                    },
                    {
                      CalendarClassnameAction: element.countUser+"/"+element.mapMaxUser,
                      CalendarClassnameTitle: '참여 인원수',
                    },
                  ]
                })
              })

            }
            this.CalendarFrontEvents = CalendarFrontEvents;
          })

          var url2 = "http://163.180.117.22:8088/api/lecture/student/post/lecturelist";
        
        this.$http
          .post(url2, payload, config)
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
                  isRegistered: true,
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
                      CalendarClassnameAction: maptype,
                      CalendarClassnameTitle: '강의 타입',
                    },
                    {
                      CalendarClassnameAction: element.countUser+"/"+element.mapMaxUser,
                      CalendarClassnameTitle: '참여 인원수',
                    },
                  ]
                })
              })
            }
          })

      },
      deletelecture(a) {
        console.log(a);
        var url = "http://163.180.117.22:8088/api/lecture/student/delete/deletelecture";

        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          data: {
            studentId: userId,
            lectureId: a.classid
          }
          
        }


        this.$http
          .delete(url, payload)
          .then(res => {
            if (res.data.success === true) {
              alert("수강 취소가 완료되었습니다.")
              this.CalendarFrontSelectedOpen = false;
              this.refreshData();
            } else if (res.data.success === false) {
              alert(res.data.message);
            }
          })
          console.log(a.classid);
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },

    },
  }
</script>
