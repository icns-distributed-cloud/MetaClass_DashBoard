<!--SudentModal-->
<!--학생 참여율과 학생 지각율을 카드 2개로 나누어서 넣기 위한 sheet-->
<template>
<div>
  <v-sheet>
    <v-responsive :aspect-ratio="10/6">
      <div id="StudentParticipation">
        <Student-Participation></Student-Participation>
      </div>
      <div id="StudentTardy">
        <Student-Tardy></Student-Tardy>
      </div>
    </v-responsive>
  </v-sheet>
</div>
</template>

<!--script-->
<script>
import StudentParticipation from './StudentParticipation.vue'; // StudentParticipation (참여율)
import StudentTardy from './StudentTardy.vue'; // StudentTardy (지각율)

export default {
  components: { 
    StudentParticipation, StudentTardy
  },
  name: "StudentModal",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>
