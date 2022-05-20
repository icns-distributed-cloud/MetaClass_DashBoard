<template>
  <v-card
    v-model="ClassMapModalDelate"
    class="mx-auto"
    color="amber"
    max-width="400"
  >
    <v-card-title>
      <v-card-subtitle>강의실 이름:</v-card-subtitle>
      <v-card-subtitle class="align-end">
        <!-- {{ClassFrontMapName}} -->
      </v-card-subtitle>
    </v-card-title>

    <v-card-title>
      <v-card-subtitle>강의실 유형:</v-card-subtitle>
      <v-card-subtitle class="align-end">
        <!-- {{ClassFrontMapType}} -->
      </v-card-subtitle>
    </v-card-title>

    <v-card-title>
      <v-card-subtitle>강의실 참여 인원수:</v-card-subtitle>
      <v-card-subtitle class="align-end">
        <!-- {{ClassFrontNumValue}} -->
      </v-card-subtitle>
    </v-card-title>
    
    <v-list two-line>
        <v-card-actions>
            <v-spacer></v-spacer> 
            <v-btn
                class="mr-4"
                color="orange"
                text
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
        <h3>{{ item }}</h3>
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
      console.log(this.info);
    }
  }

</script>

