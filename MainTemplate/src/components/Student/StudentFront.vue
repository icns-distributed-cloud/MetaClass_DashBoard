<template>
<v-container fluid>
  <v-row>
    <v-col cols="12">
      <v-card color="teal lighten-2">
        <!--card-title : 학생평가관리 -> 가장 위의 상단-->
        <v-card-title>
          <h2>사원 평가 관리</h2>
          <!--search 부분을 우측으로 밀기-->
          <v-spacer></v-spacer>
          <!--search-->
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
            class="mx-4"
            flat
            solo-inverted
            dark
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
        <template v-slot:top>
        <v-dialog v-model="StudentSubjectModalDialog" max-width="800px">
          <Student-Subject-Modal
          :info="selectedClass"
          v-on:close="closeModal"
          />
        </v-dialog>
        </template>
        <!--상세보기 안에 있는 사람 아이콘을 클릭-->
        <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          color="teal lighten-3"
          depressed
          @click="StudentSubjectModalItem(item)"
        >
          <v-icon 
            left
          >
            mdi-account
          </v-icon>
          상세보기
        </v-btn>
        </template>
        </v-data-table>
      </v-card>
      <!--data tabel 끝!-->
      <!--페이지--> <!--:length="pageCount" -->
      <template>
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="page"
                  class="my-4"
                  :length="100" 
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
      </template>
      <!--페이지 끝-->
    </v-col>
  </v-row>
</v-container>
</template>

<!--script-->
<script>
import StudentModal from './StudentModal.vue'; // StudentModal
import StudentSubjectModal from './StudentSubjectModal.vue'; // StudentSubjectModal
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
var Config = require("../../config");
var RestAPIURL = require("../../RestAPIURL");
var RestAPIManager = require('../RestAPIManager');

Vue.use(Vuetify)
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
      { text: '상세보기', value: 'actions', sortable: false }, 
    ],
    ClassName: [], //ClassName
    StudentModal : true, //  StudentModal
    StudentSubjectModal : false, //  StudentSubjectModal
  }),

  watch: {
    
  },
  
  created () {
    this.fetchClassData();
  },

  methods: {
    closeModal() {
      this.StudentSubjectModalDialog = false;
    },

    // 선생님 강좌 목록 불러오기 API : 12. Post - http://IPAddress/api/lecture/instructor/post/lecturelist
    async fetchClassData() {
      var lectureList = await RestAPIManager.API_lecturelist_("2000-01-01", "2100-12-31", this.$store.getters.getUserInfo.id);

      this.ClassName = lectureList.lectureList
    },
    
  
    isNotEmpty() {
      return this.items && this.items.length > 0;
    },
  
    // 상세보기 안에 있는 사람 아이콘을 클릭
    // 특정 강좌 학생 목록 보기 API : 17 Post - http://IPAddress/api/lecture/instructor/post/cktstubylecture
    async StudentSubjectModalItem (item) {
      var selectedclass = item;
      var cktstubylectureRes = await RestAPIManager.API_cktstudbylecture(item.id)
      selectedclass.data = cktstubylectureRes.lectureList;
      this.selectedClass = selectedclass

      this.StudentSubjectModalDialog = true // StudentSubjectModalDialog 
      this.StudentSubjectModal = true;


      var url = RestAPIURL.Lecture.Instructor.PostCKTStubyLectureAPI;

      var payload = {
        lectureId: item.id
      }

      var config = Config.config;

      this.$http
        .post(url, payload, config)
        .then(res => {
          selectedclass.data = res.data.data;
          this.selectedClass = selectedclass;
        })
      // this.editedIndex = this.ClassName.indexOf(item)
      this.StudentSubjectModalDialog = true // StudentSubjectModalDialog 
      this.StudentSubjectModal = true;
    },
  },
}
</script>