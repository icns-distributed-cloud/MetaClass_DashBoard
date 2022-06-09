<template>
  <v-col>
      <v-card>
        <v-toolbar
          color="indigo"
          light
          extended
        >
          <v-toolbar-title class="white--text">
            <h2>서버 주소</h2>
          </v-toolbar-title>
        </v-toolbar>
        <v-list
          two-line
          subheader
          color="indigo lighten-5"
        >
          <v-subheader inset class="indigo--text">
            <h2>과목명</h2>
          </v-subheader>
         </v-list>

         <v-list two-line color="indigo lighten-5">
         <v-card-actions>
            <v-spacer></v-spacer> 
            <v-btn
                color="indigo darken-4"
                @click=DeleteContent()
            >
                삭제
            </v-btn>
            <v-btn
                color="green"
                @click=DeleteContent()
            >
                수정
            </v-btn>
        </v-card-actions> 
        </v-list>

       
      </v-card>
  </v-col>
</template>