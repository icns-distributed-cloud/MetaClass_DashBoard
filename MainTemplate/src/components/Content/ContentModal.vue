<template>
<v-col>
  <v-card>
    <v-toolbar
      color="indigo"
      light
      extended
    >
      <v-toolbar-title class="white--text">
        <h2>{{info.name}}</h2>
      </v-toolbar-title>
    </v-toolbar>
    <v-list
    two-line
    subheader
    color="indigo lighten-5"
    >
      <v-subheader inset class="indigo--text">
        <h3>{{info.filename}}</h3>
      </v-subheader>
    </v-list>
    <v-list two-line color="indigo lighten-5">
      <v-card-actions>
        <v-spacer></v-spacer> 
        <v-btn
          class="mr-4"
          color="green"
          @click=fetchdeletecontent()
        >
          삭제
        </v-btn>
      </v-card-actions> 
    </v-list>
  </v-card>
</v-col>
</template>

<!---->
<script>
var RestAPIManager = require("../RestAPIManager");

export default {
  props: {
    info: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      
    }
  },

  methods: {
    // 15. Patch - http://IPAddress/api/content/patch/deletecontent
    async fetchdeletecontent() {
      this.deletecontent = await RestAPIManager.API_deletecontent(this.$store.getters.getUserInfo.id);
      var prompStr = prompt(
        '컨텐츠가 삭제되며 복구할 수 없습니다.\n삭제를 원하면 "삭제"를 입력해주세요.'
      );
      if (prompStr == null) {
        return;
      }
      if (prompStr == "삭제") {
        if (this.deletecontent.res_success === true) {
          alert("성공적으로 삭제되었습니다.");
          //this.$parent.$parent.$parent.$parent.fetchData();
        } else {
          alert(this.deletecontent.res_message);
        }
      }
      else {
        alert("정확하게 입력해주세요.");
        return;
      }
  
    

            
    },
  },
}
</script>