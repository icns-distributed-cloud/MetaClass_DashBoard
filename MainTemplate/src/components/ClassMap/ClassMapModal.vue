<template>
  <v-card
    class="mx-auto"
    color="amber"
  >
    <v-card-title>
      <v-card-subtitle>강의실 이름:</v-card-subtitle>
      <v-card-subtitle class="align-end">
        {{info.name}}
      </v-card-subtitle>
    </v-card-title>

    <v-card-title>
      <v-card-subtitle>강의실 유형:</v-card-subtitle>
      <v-card-subtitle class="align-end" v-if="info.type === 0">
        오픈형
      </v-card-subtitle>
      <v-card-subtitle class="align-end" v-if="info.type === 1">
        계단식
      </v-card-subtitle>
      <v-card-subtitle class="align-end" v-if="info.type === 2">
        소회의실
      </v-card-subtitle>
    </v-card-title>

    <v-card-title>
      <v-card-subtitle>강의실 참여 인원수:</v-card-subtitle>
      <v-card-subtitle class="align-end">
        {{info.maxUser}}
      </v-card-subtitle>
    </v-card-title>
    
    <v-list two-line>
        <v-card-actions>
            <v-spacer></v-spacer> 
            <v-btn
                class="mr-4"
                color="orange"
                text
                @click=Deletemap();
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

