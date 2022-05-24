<template>
  <v-container>
    <v-row>
      <v-col cols="12">
         <v-card color="blue lighten-5">
    <!--card-title : 학생평가관리 -> 가장 위의 상단-->
    <v-card-title>
      학생 평가 관리
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
    <v-dialog v-model="StudentSubjectModalDialog" max-width="800px">
        <!--StudentSubjectModal-->
        <Student-Subject-Modal
        v-if="StudentSubjectModal"/>
            
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
     StudentSubjectModalDialog: false, // StudentSubjectModalDialog
      expanded: [],
      page: 1, // page
      pageCount: 0, // pageCount
      itemsPerPage: 10, // itemsPerPage
      StudentFrontDialog: false,
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

    created () {
      this.initialize()
    },

    methods: {
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
    
      isNotEmpty() {
       return this.items && this.items.length > 0;
      },
   
       // Action 안에 있는 볼펜 아이콘을 클릭
       StudentSubjectModalItem (item) {
        this.editedIndex = this.ClassName.indexOf(item)
        
        this.StudentSubjectModalDialog = true // StudentSubjectModalDialog 
       
      },

    },
  }
</script>