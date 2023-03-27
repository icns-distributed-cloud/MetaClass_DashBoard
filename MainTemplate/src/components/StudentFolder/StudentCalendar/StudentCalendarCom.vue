<template>
<v-app id="inspire">
  <div id="StudentCalendarFront">
    <StudentCalendar-Front></StudentCalendar-Front>
  </div>
</v-app>
</template>

<!--script-->
<script>
import StudentCalendarFront from './StudenCalendarFront.vue';

export default {
  components: {
    StudentCalendarFront
  },
    name: "StudentCalendarCom",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>