<!--StudentText-->
<!--해당 과목 클릭시, "학생 참여율" & "학생 지각율" 오름차순과 내림차순으로 나타남-->
<!--template-->
<template>
  <v-card>    
    <v-toolbar
          dark
          color="primary"
        >
        <v-toolbar-title>학생 참여율 & 학생 지각율</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="dialog = !dialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-toolbar>
        <v-card-title>
     
      
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
        :headers="StudentSubjectHeaders"
        :items="StudentSubjectText"
        :search="search"
        class="elevation-1"
         
      
        >

      


      <!--상세보기 안에 있는 사람 아이콘을 클릭-->
     <template v-slot:[`item.actions`]="{ item }">
        <v-btn
        color="cyan lighten-3"
        depressed
        @click="StudentIndividualModalItem(item)"
        >
        <v-icon
        left
        @click="StudentIndividualModalItem(item)"
      >
         mdi-account
      </v-icon>
      상세보기
      </v-btn>
      
      </template>

      <template v-slot:top>
        <v-dialog v-model="StudentIndividualModalDialog" max-width="800px">
          <Student-Individual-Modal
            :individualInfo="individualinfo"
          />
        </v-dialog>
      </template>

     <!--Student-Individual-Modal안에 들어가기-->  
    
    </v-data-table>
    
  
  </v-card>
 
  

 

</template>


<!--script-->
<script>
import StudentIndividualModal from './StudentIndividualModal.vue' // StudentIndividualModal

  export default {
      components: { StudentIndividualModal }, // StudentIndividualModal
      props: {
      student: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        dialog: false,
        individualinfo: {},
        search: '',
        StudentIndividualModalDialog: false, // StudentIndividualModalDialog
        StudentIndividualModal: true, //  StudentIndividualModal
        // headers
        StudentSubjectHeaders: [
          {
            text: '이름',
            align: 'start',
            filterable: true, // 모든 항목에 오름차순, 내림차순
            value: 'name',
          },
          { text: '참여율 (%)', value: 'participation' }, // participation (참여율)
          { text: '지각여부', value: 'tardy' }, // tardy (지각율)
          { text: '상세보기', value: 'actions', sortable: false }, // actions
        ],

        StudentSubjectText: [],
        
      }
    },
    watch: {
      student() {
        var studentsubjecttext = []
        this.student.data.forEach(element => {
          var istardy;
          if (element.lateYN === true) {
            istardy = "YES"
          } else if (element.lateYN === false) {
            istardy = "NO"
          }
          studentsubjecttext.push({
            name: element.name,
            participation: element.participationLevel,
            tardy: istardy,
            id: element.id
          })
        })
        this.StudentSubjectText = studentsubjecttext;
      }
    },

    created () {
      this.initialize()
    },


    methods: {
      test() {
        this.StudentIndividualModalDialog = false;
      },
      initialize () {

    this.StudentSubjectText= [
          {
            name: '홍길동',
            participation: 80,
            tardy: 10,
          },
          {
            name: '김영희',
            participation: 70,
            tardy: 20,
          },
          {
            name: '정훈이',
            participation: 50,
            tardy: 30,
          },
          {
            name: '김나라',
            participation: 95,
            tardy: 0.5,
          },
          {
            name: '김민국',
            participation: 65,
            tardy: 35,
          },
          {
            name: '박민지',
            participation: 75,
            tardy: 10,
          },
          
        ]
      },
     
    
    




    // 상세보기 안에 있는 사람 아이콘을 클릭
       StudentIndividualModalItem (item) {
        var url = "http://163.180.117.47:8088/api/lecture/student/post/lecturelist";

        var payload = {
          studentId: item.id,
          startDate: "2000-01-01",
          endDate: "2100-12-31"
        }

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        var tempinfo = {}
        this.$http
          .post(url, payload, config)
          .then(res => {
            tempinfo.data = res.data.data;
            tempinfo.studentId = item.id;
            
            this.individualinfo = tempinfo;
          })


        // var tempinfo = item;

        // this.individualinfo = tempinfo;
        console.log(this.individualinfo);
        this.editedIndex = this.StudentSubjectText.indexOf(item)
        
        this.StudentIndividualModalDialog = true // StudentIndividualModalDialog
       
      },
    }
  }
</script>