<template>
  <v-card
    class="mx-auto"
    color="amber"
    max-width="400"
  >
    
    <v-card-title>컨텐츠 이름</v-card-title>

    <v-card-text class="text--primary">
      <div>파일 이름</div>
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