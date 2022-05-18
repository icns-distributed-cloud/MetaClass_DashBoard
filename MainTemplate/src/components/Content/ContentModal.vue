<template>
  <v-card
    class="mx-auto"
    color="amber"
    max-width="400"
  >
    
    <v-card-title>컨텐츠 b</v-card-title>

    <v-card-text class="text--primary">
      <div>컨텐츠 유형 : 소회의실</div>
      <div>최대 인원 : 500</div>
    </v-card-text>
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
    </v-list>
  </v-card>
</template>




<!---->
<script>
  export default {
    data() {
      return {
        
      }
    },
  }

</script>