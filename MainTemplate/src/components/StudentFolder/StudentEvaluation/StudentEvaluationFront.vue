<!--Student-Individual-->
<!--학생 참여율, 지각율 페이지에서 오른쪽 아이콘을 클릭하면 나타나는 창으로-->
<!--학생 개인이 수강하는 모든 과목이 나타난다-->
<template>
<v-card>
  <v-card-title>
    강좌 참여율 & 강좌 지각율
    <v-spacer></v-spacer>
    <v-text-field
    v-model="search"
    append-icon="mdi-magnify"
    label="Search"
    single-line
    hide-details
    ></v-text-field>
  </v-card-title>
  <v-data-table
    :headers="StudentIndividualHeaders"
    :items="StudentIndividualText"
    :search="search"
    no-data-text="신청한 강좌가 없습니다"
  >
  </v-data-table>
</v-card>
</template>


<!--script-->
<script>
var RestAPIManager = require('../../RestAPIManager');

export default {
  data () {
    return {
      search: '',
      subjectlist: [],
      StudentIndividualText: [],
      // headers
      StudentIndividualHeaders: [
        {
          text: '과목명',
          align: 'start',
          filterable: true, // 모든 항목에 오름차순, 내림차순
          value: 'subject',
        },
        { text: '강의 날짜', value: 'date'},
        { text: '참여율 (%)', value: 'participation' },  // participation (참여율)
        { text: '지각여부', value: 'tardy' },  // tardy (지각율)
      ],
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    // 수강 신청한 강좌 조회 API : 22. Post - http://IPAddress/api/lecture/student/post/lecturelist
    async fetchData() {
      var userId = this.$store.getters.getUserInfo.id;
      var studentlecturelistRes = await RestAPIManager.API_studentlecturelist(userId, "2000-01-01", "2100-12-31");
      
      for (const lecture of studentlecturelistRes.lectureList) {
        var lateYN;
        if (lecture.lateYN === true) {
          lateYN = "YES"
        } else if (lecture.lateYN === false) {
          lateYN = "NO"
        }
        var startdate = this.lectureDatetoString(new Date(`${lecture.startTime}`));
        this.StudentIndividualText.push({
          subject: lecture.name,
          date: startdate,
          participation: lecture.participationLevel,
          tardy: lateYN
        })
      }      
    },

    lectureDatetoString(source, delimiter = '-') {
      const year = source.getFullYear();
      const month = this.leftPad(source.getMonth() + 1);
      const day = this.leftPad(source.getDate());

      return [year, month, day].join(delimiter);
    },

    leftPad(value) {
      if (value >= 10) {
        return value;
      }
      return `0${value}`
    },
  },
}
</script>