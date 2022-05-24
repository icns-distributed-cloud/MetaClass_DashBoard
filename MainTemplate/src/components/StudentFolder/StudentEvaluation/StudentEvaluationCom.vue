  <template>
   <v-app id="inspire">
     <div id="StudentEvaluationFront">
      <StudentEvaluation-Front></StudentEvaluation-Front>
      </div>
  </v-app>
</template>

<!--script-->
<script>
import StudentEvaluationFront from './StudentEvaluationFront.vue'

export default {
   components:
  {
    StudentEvaluationFront
  },
    name: "StudentEvaluationCom",
  data() {
        return {
        
        }
    },
    methods: {
    }
}
</script>