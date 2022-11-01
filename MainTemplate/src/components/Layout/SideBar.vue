<template>
  <div>
    <!--가장 위 상단의 bar, 색은 primary-->
      <!--가장 아래인 하단 bar, 색은 primary-->
      <!-- <v-footer color="blue lighten-1" dark app>Project</v-footer> -->
    <!--왼쪽에 bar 생성-->
    <v-navigation-drawer 
    class="light-blue darken-1" dark permanet app clipped>
    <v-container>
      <router-link :to="logolink">
        <v-img :src="imgLogo" alt="logo" />
      </router-link>
      <v-list-item>
        <v-list-item-content style="back">
          <v-list-item-title class="title grey--text text--darken-2">Meta Class</v-list-item-title>
          <v-list-item-subtitle>ICNS Lab</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    <!--item-->
      <v-list nav dense v-if="isStudent">
        <v-list-item
          v-for="item in studentMenus"
          :key="item.title"
          link 
          @click="menuActionClick(item.action)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title  style="color: white;">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list nav dense v-if="isTeacher">
        <v-list-item
          v-for="item in teacherMenus"
          :key="item.title"
          link 
          @click="menuActionClick(item.action)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title  style="color: white;">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list nav dense v-if="isServerManager">
        <v-list-item
          v-for="item in serverManagerMenus"
          :key="item.title"
          link 
          @click="menuActionClick(item.action)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title  style="color: white;">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-container>
    </v-navigation-drawer>
  </div>
</template>


<script>
var LayoutEnum = require("./LayoutEnum");
var UserModes = LayoutEnum.UserModes;
export default {
  data () {
    return {
      studentMenus: [
          { title: '강좌 정보', icon: 'event', action: "StudentCalendar" },
          { title: '학생 평가 정보', icon: 'mdi-clipboard-text', action: "StudentEvaluation" },
          { title: '회원 정보', icon: 'mdi-account-circle', action: "StudentInformation" },
      ],
      teacherMenus: [
          { title: '강좌 관리', icon: 'event', action: "Calendar" },
          { title: '학생 평가 관리', icon: 'mdi-clipboard-text', action: "Student" },
          { title: '강의실 등록', icon: 'class', action: "ClassMap" },
          { title: '컨텐츠 등록', icon: 'mdi-folder', action: "Content" },
          { title: '퀴즈 등록', icon: 'quiz' , action: "Quiz"},
          { title: '회원 관리', icon: 'mdi-account-circle' , action: "Member"},
          { title: '부서 관리', icon: 'mdi-clipboard-text', action: "Department" }
      ],
      serverManagerMenus: [
          { title: "서버 등록", icon: 'mdi-server', action: "serverRegister" },
          { title: "서버 관리", icon: 'mdi-server', action: "serverManage" }
      ],
      right: null,
      logolink: ""
    }
  },
  props: {
    imgLogo: {
      type: String,
      default: require("@/assets/logo.jpeg")
    }
  },
  created() {
    var userInfo = this.$store.getters.getUserInfo;
    if (userInfo.userMode === UserModes.INSTRUCTOR) {
      this.logolink = "/CalendarPage"
    } else if (userInfo.userMode === UserModes.STUDENT) {
      this.logolink = "/StudentCalendar"
    } else if (userInfo.userMode === UserModes.SERVER_MANAGER) {
      this.logolink = "/ServerRegister"
    }
  },
  computed: {
      isTeacher: function() {
          var userInfo = this.$store.getters.getUserInfo;
          return userInfo.userMode == UserModes.INSTRUCTOR;
      },
      isStudent: function() {
          var userInfo = this.$store.getters.getUserInfo;
          return userInfo.userMode == UserModes.STUDENT;
      },
      isServerManager: function() {
          var userInfo = this.$store.getters.getUserInfo;
          return userInfo.userMode == UserModes.SERVER_MANAGER;
      }
  },
  methods:{
    signout() {
      this.$store
        .dispatch("LOGOUT")
        .then(() => this.redirect())
        .catch(() => this.redirect());
    },
    redirect() {
      alert("로그아웃 되었습니다.");
      this.$router.push("/");
    },
    menuActionClick(action){
      if(action=="Calendar")
      {
        this.$router.push('/CalendarPage');
      }
      else if(action=="Student")
      {
        this.$router.push('/StudentPage');
      }
      else if(action=="ClassMap")
      {
        this.$router.push('/ClassMapPage');
      }
      else if(action=="Content")
      {
        this.$router.push('/ContentPage');
      }
      else if(action=="Quiz")
      {
        this.$router.push('/QuizPage');
      }
      else if(action=="Member")
      {
        this.$router.push('/MemberPage');
      }
      else if(action=="Department")
      {
        this.$router.push('/Department');
      }
      else if(action=="Server")
      {
        this.$router.push('/ServerManage');
      }
      else if(action=="StudentCalendar")
      {
          this.$router.push('/StudentCalendar');
      }
      else if(action=="StudentEvaluation")
      {
          this.$router.push('/StudentEvaluation');
      }
      else if(action=="StudentInformation")
      {
          this.$router.push('/StudentInformation');
      }
      else if(action=="serverRegister")
      {
          this.$router.push('/ServerRegister');
      }
      else if(action=="serverManage")
      {
          this.$router.push('/ServerManage');
      }
    }
  }
}
</script>

