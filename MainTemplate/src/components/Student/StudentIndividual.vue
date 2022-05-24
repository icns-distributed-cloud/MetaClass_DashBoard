<!--Student-Individual-->
<!--학생 참여율, 지각율 페이지에서 오른쪽 아이콘을 클릭하면 나타나는 창으로-->
<!--학생 개인이 수강하는 모든 과목이 나타난다-->

<template>
  <v-card>
          <v-card-title>
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
    data () {
      return {
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
        StudentIndividualText: [
          {
            subject: '컴퓨터개론',
            participation: 80,
            tardy: 10,
          },
          {
            subject: '선형대수',
            participation: 70,
            tardy: 20,
          },
          {
            subject: '컴퓨터구조',
            participation: 50,
            tardy: 30,
          },
          {
            subject: '데이터센터프로그래밍',
            participation: 95,
            tardy: 0.5,
          },
          {
            subject: '컴퓨터네트워크',
            participation: 65,
            tardy: 35,
          },
          {
            subject: '인공지능',
            participation: 75,
            tardy: 10,
          },
          
        ],
        

      }
    },
  }
</script>