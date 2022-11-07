<template>
<v-app id="inspire">
  <v-layout>
    <v-flex>
      <div id="CalendarFront">
        <Class-Front></Class-Front>
      </div>
    </v-flex>
  </v-layout>
</v-app>
</template>

<script>
import ClassFront from './ClassFront.vue';

export default {
  components: {
    ClassFront
  },
  name: "ClassMapCom",
  data() {
    return {
    
    }
  },
  methods: {
  }
}
</script>