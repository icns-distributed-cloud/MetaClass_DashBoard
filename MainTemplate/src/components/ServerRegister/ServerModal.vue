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
        <h2>{{info.address}}</h2>
      </v-subheader>
    </v-list>
    <v-list two-line color="indigo lighten-5">
        <v-card-actions>
          <v-spacer></v-spacer> 
          <v-btn
            class="mr-4"
            color="indigo darken-4"
            @click=Deletemap();
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
var RestAPIManager = require('../RestAPIManager');

export default {
  props: {
    info: {
      type: Object,
      require: true
    }
  },

  computed: {
  },

  created() {
  },
  
  methods: {
    // 등록한 아이피 삭제 API : 34. Get - http://IPAddress/api/ip/get/delete?id=
    async Deletemap() {
      var prompStr = prompt(
        '아이피가 삭제되며 복구할 수 없습니다.\n삭제를 원하면 "삭제"를 입력해주세요.'
      );
      if (prompStr === null) {
        return;
      }
      if (prompStr == "삭제") {
        var deleteipRes = await RestAPIManager.API_deleteip(this.info.id);
        if (deleteipRes.success === true) {
          alert("성공적으로 삭제되었습니다.");
          this.$parent.$parent.$parent.$parent.deleteIP();
        } else {
          alert(deleteipRes.message)
        }
      } else {
        alert("정확하게 입력해주세요.");
        return;
      }
    }
  }
}
</script>

