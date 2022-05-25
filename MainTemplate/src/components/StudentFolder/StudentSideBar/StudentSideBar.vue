
<template>
  <v-app>
    <!--가장 위 상단의 bar, 색은 primary-->
      <v-app-bar color="blue lighten-1" dark app clipped-left>
        <v-toolbar-title>Project</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn elevation="2" @click=signout()>로그아웃</v-btn>
      </v-app-bar>
      
      <!--가장 아래인 하단 bar, 색은 primary-->
      <v-footer color="blue lighten-1" dark app>Project</v-footer>
      
    <!--왼쪽에 bar 생성-->
    <v-navigation-drawer 
    class="light-blue darken-1" dark permanet app v-model="drawer" clipped>
    <v-container>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-tile class="title grey--text text--darken-2">Meta Class</v-list-item-tile>
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
  </v-app>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          { title: '강좌 정보', icon: 'mdi-view-dashboard', action: "StudentCalendar" },
          { title: '학생 평가 정보', icon: 'mdi-view-dashboard', action: "StudentEvaluation" },
          { title: '회원 정보', icon: 'mdi-view-dashboard', action: "StudentInformation" },
         
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
        if(action=="StudentCalendar")
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
        
      
      }
    }
  }
</script>

