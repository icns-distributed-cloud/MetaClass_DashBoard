<template>
  <v-container>
    <v-row>
      <v-col cols="12">
         <v-card color="blue lighten-5">
    <!--card-title : 학생평가관리 -> 가장 위의 상단-->
    <v-card-title>
      학생 평가 관리
       <!--search 부분을 우측으로 밀기-->
      <v-spacer></v-spacer>
       <!--search-->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <!--StudentManager가 header-->
  <v-data-table
    :headers="StudentHeaders"
    :items="ClassName" 
    sort-by="StudentManager"
    class="elevation-1"
    hide-default-footer
    :page.sync="page" 
    :items-per-page="itemsPerPage"
    @page-count="pageCount = $event"
    item-key="name"
    show-expand
    :expanded.sync="expanded"
    :search="search"
   
  >
  <!--과목 앞에 있는 ^표시 : 아래에 그래프 넣을 것 StudentModal-->
  <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">
        <!--StudentModal-->
        <Student-Modal
        v-if="StudentModal"/>
      </td>  
    </template>

 <!--Action 안에 있는 볼펜 아이콘을 클릭-->
     <template v-slot:[`item.actions`]="{ item }">
        <v-icon
        small
        @click="StudentSubjectModalItem(item)"
      >
         mdi-pencil
      </v-icon>

     <!--Student-Subject-Modal안에 들어가기-->  
    <v-dialog v-model="StudentSubjectModalDialog" max-width="800px"
    @click:outside=test()
    @keydown.esc=test()
    :retain-focus="false">
        <!--StudentSubjectModal-->
        <Student-Subject-Modal
        v-if="StudentSubjectModal"
        v-bind:info="selectedClass" />

    </v-dialog>
    </template>
     
      
    
     
    

  </v-data-table>
  </v-card>
  <!--data tabel 끝!-->

<!--페이지 이동-->
  <div class="text-center pt-2">
    <v-pagination
      v-model="page"
      :length="pageCount"
    ></v-pagination>
    
    <!--페이지 설정-->  
      <v-text-field
        :value="itemsPerPage"
        label="Items per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
    </v-col>
    </v-row>
  </v-container>
</template>


 

<!--script-->

<script>
import StudentModal from './StudentModal.vue' // StudentModal
import StudentSubjectModal from './StudentSubjectModal.vue' // StudentSubjectModal

  export default {
    components: { StudentModal, StudentSubjectModal }, // StudentModal, StudentSubjectModal
    data: () => ({
      dialogsync: false,
     StudentSubjectModalDialog: false, // StudentSubjectModalDialog
     selectedClass: {},
      expanded: [],
      page: 1, // page
      pageCount: 0, // pageCount
      itemsPerPage: 10, // itemsPerPage
      StudentFrontDialog: false,
      search: '', // 회원 평가 관리 Search
      // headers
      StudentHeaders: [
        {
          text: '강의명', //ClassName
          align: 'start',
          filterable: true, // 모든 항목에 오름차순, 내림차순
          //sortable: false,
          value: 'name',
        },
        { text: '강의 날짜', value: 'ClassDate'},  
        { text: 'Actions', value: 'actions', sortable: false }, 


      ],
      ClassName: [], //ClassName
      StudentModal : true, //  StudentModal
      StudentSubjectModal : true, //  StudentSubjectModal
     
    }),
    watch: {
      
    },

    created () {
      this.fetchClassData();
    },

    methods: {
      test() {
        this.StudentSubjectModalDialog = false;
      },
      fetchClassData() {
        var url = "http://163.180.117.47:8088/api/lecture/instructor/post/lecturelist";

        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          instructorId: userId,
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
                this.ClassName.push({
                  name: element.name,
                  ClassDate: element.startTime.slice(0, 10),
                  id: element.id
                })
              })
            }
          })

      },
      /*
      initialize () {
        this.ClassName = [
          {
            name: '미분적분학',
            ClassDate : '2022-04-08',
          },
          {
            name: '선형대수',
            ClassDate: '2021-07-18',
          },
          {
            name: '컴퓨터개론',
            ClassDate : '2023-10-08',
          },
         
        ]
      },
      */
    
      isNotEmpty() {
       return this.items && this.items.length > 0;
      },
   
       // Action 안에 있는 볼펜 아이콘을 클릭
       StudentSubjectModalItem (item) {
        var selectedclass = item;

        var url = "http://163.180.117.47:8088/api/lecture/instructor/post/cktstubylecture";

        var payload = {
          lectureId: item.id
        }

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        this.$http
          .post(url, payload, config)
          .then(res => {
            selectedclass.data = res.data.data;

            this.selectedClass = selectedclass;
          })






        // this.editedIndex = this.ClassName.indexOf(item)
        
        this.StudentSubjectModalDialog = true // StudentSubjectModalDialog 
       
      },

    },
  }
</script>