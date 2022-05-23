<template>
<div>
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

  >
<!--test 버튼 클릭 시 나타나는 화면-->
<v-dialog  v-model="dialogDelete" max-width="500px">
  <v-card>
    <v-card-title class="text-h5">회원 정보를 삭제하시겠습니까?</v-card-title>
    <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">취소</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">확인</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <!--test 버튼 클릭 시 나타나는 화면-->
    <!--휴지통 아이콘 생성-->
      <v-icon
        elevation="4"
        fab
        class="cyan"
        small
        @click="deleteItem(item)"
      >
        mdi-trash-can-outline
      </v-icon>



</v-dialog>
<!--그래프 아이콘 생성-->

    <template v-slot:[`item.actions`]="{  }">
      <v-btn 
      class="ma-2" 
      color="primary" 
      dark 
      @click=StudentModalPopup(StudentModal);
      >그래프 보기
      <v-icon 
        dark 
        right
        elevation="4"
        fab
        class="teal mr-2"
        small
      >mdi-checkbox-marked-circle  
      </v-icon>
      </v-btn>
      <!--StudentModal-->
      <Student-Modal
      v-if="StudentModal"

      @close="
      StudentModal = false;"
      />

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
  </div>
</template>



<!--script-->

<script>
import StudentModal from './StudentModal.vue' // StudentModal

  export default {
   components: { StudentModal }, // StudentModal
    data: () => ({
     dialogDelete: false, //
   
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
      StudentModal : false, //  StudentModal
     
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
///
      watch: {
   
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
   
    
 deleteItem (item) {
        this.editedIndex = this.MemberName.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.MemberName.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      //
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },


      
      isNotEmpty() {
       return this.items && this.items.length > 0;
      },


       StudentModalPopup(modal){
        if(modal == true)
        {
          this.StudentModal = false;
        }
        else
        {
          this.StudentModal = true; 
        }

      },

    },
  }
</script>