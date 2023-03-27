
<template>
  <div>
    <!--가장 위 상단의 bar, 색은 primary-->
      
      
      <!--가장 아래인 하단 bar, 색은 primary-->
      <!-- <v-footer color="blue lighten-1" dark app>Project</v-footer> -->
      
    <!--왼쪽에 bar 생성-->
    <v-navigation-drawer 
    class="light-blue darken-1" dark permanet app clipped>
    <v-container>
      <v-list-item>
        <v-list-item-content style="back">
          <v-list-item-title class="title grey--text text--darken-2">Meta Class</v-list-item-title>
          <v-list-item-subtitle>ICNS Lab</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
     <!--item-->
      <v-list nav dense>
          <v-list-item
          v-for="item in items"
          :key="item.title"
          link  
          @click="menuActionClick(item.action)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-container>
    </v-navigation-drawer>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          { title: '강좌 관리', icon: 'event', action: "Calendar" }, // event
          { title: '학생 평가 관리', icon: 'mdi-clipboard-text', action: "Student" }, // mdi-clipboard-text
          { title: '강의실 등록', icon: 'class', action: "ClassMap" }, // class
          { title: '컨텐츠 등록', icon: 'mdi-folder', action: "Content" }, // mdi-folder
          { title: '퀴즈 등록', icon: 'quiz', action: "Quiz"}, // quiz // 또는  mdi-format-list-bulleted-square
          { title: '회원 관리', icon: 'mdi-account-circle' , action: "Member"},  // mdi-account-circle
          { title: '서버 관리', icon: 'mdi-server' , action: "Server"},  // mdi-server
        ],
        right: null,
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
        else if(action=="Server")
        {
          this.$router.push('/ServerManage');
        }
      
      }
    }
  }
</script>

