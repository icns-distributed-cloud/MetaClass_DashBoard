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
      fetchData() {
        this.subjectlist = [];

        var url = "http://163.180.117.47:8088/api/lecture/student/post/lecturelist";

        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          studentId: userId,
          startDate: "2000-01-01",
          endDate: "2100-12-31"
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
                console.log(element)
                this.subjectlist.push({
                  id: element.id,
                  name: element.name,
                  date: element.startTime.slice(0, 10)

                })
              })

              
            }
            var url2 = "http://163.180.117.47:8088/api/lecture/student/post/ParticipationInfo";


            this.subjectlist.forEach(element => {
              var payload = {
                studentId: userId,
                lectureId: element.id
              }
              this.StudentIndividualText = []
              this.$http
                .post(url2, payload, config)
                .then(res => {
                  console.log(res)
                  
                  var istardy;
                  if (res.data.data.lateYN === true) {
                    istardy = "YES"
                  } else if (res.data.data.lateYN === false) {
                    istardy = "NO"
                  }
                  this.StudentIndividualText.push({
                    subject: res.data.data.lectureName,
                    date: element.date,
                    participation: res.data.data.participationLevel,
                    tardy: istardy
                  })
                })

            })
              
          })
            
        }
      }
  }
    
    
  
  
</script>