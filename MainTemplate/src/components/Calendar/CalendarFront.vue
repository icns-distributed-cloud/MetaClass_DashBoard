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
            <v-card-text>
              <div class="text--primary">강의 시작 일자: 2022/08/25 13:00</div>
              <div class="text--primary">강의 끝 일자: 2022/08/25 15:00</div>
              <div class="text--primary">강의자: 홍길동</div>
              <div class="text--primary">강의 타입: 계단식</div>
              <div class="text--primary">소속: 그룹 A</div>
              <div class="text--primary">참여 인원수: 100/300</div>
              <span v-html="CalendarFrontSelectedEvent.details"></span>
            </v-card-text>
            <!--캘린더에서 이벤트(과목)을 클릭 했을 때, 나타나는 '전체'화면에서 가장 "하단"-->
            <v-card-actions>
               <!--강의 메세지 전송-->
              <v-btn
                :loading="CalendarFrontMessageLoaderloading"
                :disabled="CalendarFrontMessageLoaderloading"
                color="teal darken-4"
                class="ma-2 white--text"
                @click="CalendarFrontMessageLoader = 'CalendarFrontMessageLoaderloading'"
              >
                강의 메세지 전송
                <v-icon
                  right
                  dark
                >
                  mdi-email
                </v-icon>
              </v-btn>
             
              <v-spacer></v-spacer>
              <v-btn
                text
                color="secondary"
                @click="CalendarFrontSelectedOpen = false"
              >
                수정
              </v-btn>
              <v-btn
                text
                color="secondary"
                @click="CalendarFrontSelectedOpen = false"
              >
                강의 취소
              </v-btn>
            </v-card-actions>
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
          @click=CalendarFrontSetActivePopup(CreateClassModal);
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
  </v-row>
</template>


<!--script-->
<script>
import CreateClassModal from './CreateClassModal.vue'

  export default {
    components: { CreateClassModal },
    data: () => ({
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
      CalendarFrontColors: ['light-green lighten-1', 'red lighten-1'],
      CalendarFrontNames: ['과목명'], // 캘린더에서 과목을 클릭 했을 때, 나타나는 과목명
      CreateClassModal : false, //  CreateClassModal 

      CalendarFrontMessageLoader: null, // 강의 메세지 전송
      CalendarFrontMessageLoaderloading: false, // 강의 메세지 전송
    }),
    // 강의 메세지 전송
    watch: {
      CalendarFrontMessageLoader () {
        const l = this.CalendarFrontMessageLoader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.CalendarFrontMessageLoader = null
      },
    },
   // CalendarFront
    name: "CalendarFront", // CalendarFront

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
        const CalendarFrontEvents = []
        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          CalendarFrontEvents.push({
            name: this.CalendarFrontNames[this.rnd(0, this.CalendarFrontNames.length - 1)],
            start: first,
            end: second,
            color: this.CalendarFrontColors[this.rnd(0, this.CalendarFrontColors.length - 1)],
            timed: !allDay,
          })
        }

        this.CalendarFrontEvents = CalendarFrontEvents
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
    },
  }
</script>





