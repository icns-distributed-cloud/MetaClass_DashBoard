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
          @click=DeleteDepartment()
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
var Config = require("../../config");
var RestAPIURL = require("../../RestAPIURL");

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
    // 부서 삭제 API : 28. Post - http://IPAddress/api/department/patch/deletedepartment
    DeleteDepartment() {
      var prompStr = prompt(
        '부서가 삭제되며 복구할 수 없습니다.\n삭제를 원하면 "삭제"를 입력해주세요.'
      );
      if (prompStr == null) {
        return;
      }
      if (prompStr == "삭제") {
        var url = RestAPIURL.Department.PostDeleteDepartmentAPI;

        var payload = {
          id: this.info.id
        }

        var config = Config.config;

        this.$http
          .patch(url, payload, config)
          .then(res => {
            if (res.data.success === true) {
              alert("성공적으로 삭제되었습니다.");
              this.$parent.$parent.$parent.$parent.fetchData();
            } else {
              alert(res.data.message);
            }
            
          })
      } else {
        alert("정확하게 입력해주세요.");
        return;
      }
    },
  },
}
</script>