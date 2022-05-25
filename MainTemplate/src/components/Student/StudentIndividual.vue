<!--Student-Individual-->
<!--학생 참여율, 지각율 페이지에서 오른쪽 아이콘을 클릭하면 나타나는 창으로-->
<!--학생 개인이 수강하는 모든 과목이 나타난다-->

<template>
  <v-card>
          <v-card-title
          >
          {{infoinfo.name}}
            학생 참여율 & 학생 지각율
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
            >
            
    </v-data-table>
</v-card>
</template>


<!--script-->
<script>
  export default {
    props: {
      infoinfo: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        individualInfo: [],
        search: '',
       
        // headers
        StudentIndividualHeaders: [
          {
            text: '과목명',
            align: 'start',
            filterable: true, // 모든 항목에 오름차순, 내림차순
            value: 'subject',
          },
          { text: '참여율 (%)', value: 'participation' },  // participation (참여율)
          { text: '지각율 (%)', value: 'tardy' },  // tardy (지각율)
         
        ],
        StudentIndividualText: [],
        

      }
    },
    watch: {
      infoinfo() {

        this.StudentIndividualText = []
        this.individualInfo = this.infoinfo;

        var url = "http://163.180.117.47:8088/api/lecture/student/post/ParticipationInfo"

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        this.individualInfo.data.forEach(element => {
          this.$http
            .post(url, {studentId: this.individualInfo.studentId, lectureId: element.id}, config)
            .then(res => {
              if (res.data.success === true) {
                this.StudentIndividualText.push({
                  subject: res.data.data.lectureName,
                  participation: res.data.data.participationLevel,
                  tardy: 100-res.data.data.participationLevel
                })
              }
            })
        })

      }
    },
    methods: {
      test() {
      }
    },
    beforeMount() {
    }

  }
</script>