<!--StudentText-->
<!--해당 과목 클릭시, "학생 참여율" & "학생 지각율" 오름차순과 내림차순으로 나타남-->
<!--template-->
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
        :headers="StudentSubjectHeaders"
        :items="StudentSubjectText"
        :search="search"
        class="elevation-1"
         
      
        >

      <template v-slot:top>
        <v-dialog v-model="StudentIndividualModalDialog" max-width="800px">
          <Student-Individual-Modal
            :individualInfo="individualinfo"
          />
        </v-dialog>
      </template>


      <!--Action 안에 있는 볼펜 아이콘을 클릭-->
     <template v-slot:[`item.actions`]="{ item }">
        <v-icon
        small
        @click="StudentIndividualModalItem(item)"
      >
         mdi-pencil
      </v-icon>
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
        individualinfo: '',
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
          { text: '지각율 (%)', value: 'tardy' }, // tardy (지각율)
          { text: 'Actions', value: 'actions', sortable: false }, // actions
        ],

        StudentSubjectText: [],
        
      }
    },
    watch: {
      student() {
        var studentsubjecttext = []
        this.student.data.forEach(element => {
          studentsubjecttext.push({
            name: element.name,
            participation: element.participationLevel,
            tardy: 100-element.participationLevel,
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
     
    
    




    // Action 안에 있는 볼펜 아이콘을 클릭
       StudentIndividualModalItem (item) {
        console.log(item);
        this.editedIndex = this.StudentSubjectText.indexOf(item)
        
        this.StudentIndividualModalDialog = true // StudentIndividualModalDialog
       
      },
    }
  }
</script>