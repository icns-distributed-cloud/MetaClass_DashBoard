<template>
<v-col>
  <v-card>
    <v-toolbar
      color="indigo"
      light
      extended
    >
      <v-toolbar-title class="white--text">
        <h2>{{info.ipName}}</h2>
      </v-toolbar-title>
    </v-toolbar>
    <v-list
      two-line
      subheader
      color="indigo lighten-5"
    >

      <v-subheader inset class="indigo--text">
        <h2>{{info.lectureName}}</h2>

        
      </v-subheader>
      <v-subheader inset class="indigo--text">
        <h5>{{info.time}}</h5>
        
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
          '아이피가 삭제되며 복구할 수 없습니다.\n삭제를 원하면 "삭제"를 입력해주세요.'
        );
        if (prompStr == null) {
          return;
        }
        if (prompStr == "삭제") {
          var url = "http://163.180.117.47:8088/api/server/delete/deleteserver";

          var payload = {
            data: {
              id: this.info.id
            }
          }


          this.$http
            .delete(url, payload)
            .then(res => {
              if (res.data.success === true) {
                alert("성공적으로 삭제되었습니다.");
                this.$parent.$parent.$parent.$parent.deleteServer();
              } else {
                alert(res.data.message);
              }
              
            })
            console.log("delete server");
          } else {
            alert("정확하게 입력해주세요.");
            return;
          }


      }
    }
  }

</script>

