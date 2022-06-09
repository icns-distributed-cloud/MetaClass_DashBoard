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
      <v-subheader inset class="indigo--text" v-if="info.type === 0">
        <h2>오픈형</h2>
      </v-subheader>
      <v-subheader inset class="indigo--text" v-if="info.type === 1">
        <h2>계단식</h2>
      </v-subheader>
      <v-subheader inset class="indigo--text" v-if="info.type === 2">
        <h2>소회의실</h2>
      </v-subheader>
      <v-subheader inset class="indigo--text">
        <h2>{{info.maxUser}}</h2>
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
            <v-btn
              class="mr-4"
              color="green"
              >
                수정
            </v-btn>
        </v-card-actions> 
    </v-list>
  </v-card>
</v-col>
</template>




<!---->
<script>
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
      Deletemap() {
        var prompStr = prompt(
          '강의실이 삭제되며 복구할 수 없습니다.\n삭제를 원하면 "삭제"를 입력해주세요.'
        );
        if (prompStr == null) {
          return;
        }
        if (prompStr == "삭제") {
          var url = "http://163.180.117.47:8088/api/map/patch/deletemap";

          var payload = {
            id: this.info.id
          }

          var config = {
            headers: {
              "Content-Type": "application/json"
            }
          }

          this.$http
            .patch(url, payload, config)
            .then(res => {
              if (res.data.success === true) {
                alert("성공적으로 삭제되었습니다.");
                this.$parent.$parent.$parent.$parent.deleteMap();
              } else {
                alert(res.data.message);
              }
              
            })
            console.log("delete map");
          } else {
            alert("정확하게 입력해주세요.");
            return;
          }


      }
    }
  }

</script>

