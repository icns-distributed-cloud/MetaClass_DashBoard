  <template>
   <v-app id="inspire">
     <div id="CalendarFront">
      <Calendar-Front></Calendar-Front>
      </div>
  </v-app>
</template>

<!--script-->
<script>
import CalendarFront from './CalendarFront.vue'

export default {
   components:
  {
    CalendarFront
  },
    name: "CalendarCom",
  data() {
        return {
        
        }
    },
    methods: {
    }
}
</script>