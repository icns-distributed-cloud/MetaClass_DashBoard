<template>
  <v-card
    class="mx-auto"
    color="amber"
    max-width="400"
  >
    
    <v-card-title>{{info.name}}</v-card-title>

    <v-card-text class="text--primary">
      <div>{{info.filename}}</div>
    </v-card-text>
    <v-list two-line>
        <v-card-actions>
            <v-spacer></v-spacer> 
            <v-btn
                class="mr-4"
                color="orange"
                text
                @click=DeleteContent()
            >
                삭제
            </v-btn>
            <v-btn
                class="mr-4"
                color="orange"
                text
                
            >
                수정
            </v-btn>
        </v-card-actions> 
    </v-list>
  </v-card>
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

    data() {
      return {
        
      }
    },

    methods: {
      DeleteContent() {
        var prompStr = prompt(
          '컨텐츠가 삭제되며 복구할 수 없습니다.\n삭제를 원하면 "삭제"를 입력해주세요.'
        );
        if (prompStr == null) {
          return;
        }
        if (prompStr == "삭제") {
          var url = "http://163.180.117.47:8088/api/content/patch/deletecontent";

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
            .then(() => {
              alert("성공적으로 삭제되었습니다.");
              this.$parent.$parent.$parent.$parent.fetchData();
            })
        } else {
          alert("정확하게 입력해주세요.");
          return;
        }

        
      }
    }
  }

</script>