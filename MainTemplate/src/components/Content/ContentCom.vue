   <template>
  <v-app id="inspire">
   <v-layout>
    <v-flex>
          <div id="ContentFront">
        <Content-Front></Content-Front>
      </div>
    </v-flex>
   </v-layout>
  </v-app>
</template>


<script>
import ContentFront from './ContentFront.vue'

export default {
   components:
  {
    ContentFront
  },
    name: "ContentCom",
  data() {
        return {
        
        }
    },
    methods: {
    }
}
</script>