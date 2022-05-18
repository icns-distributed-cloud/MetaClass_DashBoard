
<template>
  <v-app>
    <!--가장 위 상단의 bar, 색은 primary-->
      <v-app-bar color="light-blue lighten-1" dark app clipped-left>
        <v-toolbar-title>Project</v-toolbar-title>
      </v-app-bar>
      
      <!--가장 아래인 하단 bar, 색은 primary-->
      <v-footer color="light-blue lighten-1" dark app>Project</v-footer>
      
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
          { title: '캘린더', icon: 'mdi-view-dashboard', action: "Calendar" },
          { title: '학생 평가 관리', icon: 'mdi-view-dashboard', action: "Student" },
          { title: '강의실 등록', icon: 'mdi-view-dashboard', action: "ClassMap" },
          { title: '컨텐츠 등록', icon: 'mdi-view-dashboard', action: "Content" },
          { title: '회원 관리', icon: 'mdi-view-dashboard' , action: "Member"},       
        ],
        right: null,
      }
    },
    methods:{
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
        else if(action=="Member")
        {
          this.$router.push('/MemberPage');
        }
      
      }
    }
  }
</script>

