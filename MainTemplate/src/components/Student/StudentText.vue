<!--StudentText-->
<!--해당 과목 클릭시, "학생 참여율" & "학생 지각율" 오름차순과 내림차순으로 나타남-->
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
      @click="closeModal"
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
    >
    </v-text-field>
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
        v-on:close="closeIndividualModal"
      />
    </v-dialog>
    </template>
  </v-data-table>  
</v-card>
</template>

<!--script-->
<script>
import StudentIndividualModal from './StudentIndividualModal.vue'; // StudentIndividualModal
var Config = require("../../config");
var RestAPIURL = require("../../RestAPIURL");

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
      StudentSubjectHeaders: [{
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
  },

  methods: {
    closeIndividualModal() {
      this.StudentIndividualModalDialog = false;
    },
    closeModal() {
      this.$emit("close", "closeModal");
    },
    
    // 상세보기 안에 있는 사람 아이콘을 클릭
    // 수강신청한 강좌 조회 API : 22. Post - http://IPAddress/api/lecture/student/post/lecturelist
    StudentIndividualModalItem (item) {
      var url = RestAPIURL.Lecture.Student.PostStuLectureListAPi;

      var payload = {
        studentId: item.id,
        startDate: "2000-01-01",
        endDate: "2100-12-31"
      }

      var config = Config.config;

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
      this.editedIndex = this.StudentSubjectText.indexOf(item);
      this.StudentIndividualModalDialog = true; // StudentIndividualModalDialog
    },
  },
}
</script>