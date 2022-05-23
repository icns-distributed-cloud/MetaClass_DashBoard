<template>
  <v-container
    class="fill-height"
    fluid
  >
            
    <v-row
      align="center"
      justify="center"
    >
      
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
      
      
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
          
          
            <v-toolbar-title>메타 클래스</v-toolbar-title>
            <v-spacer></v-spacer>
            
          </v-toolbar>
          
          <v-card-text>
            <v-form>
              <v-text-field
                label="id"
                name="id"
                prepend-icon="mdi-account"
                type="text"
                v-model="id"
                @keydown.enter="validateUser"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                @keydown.enter="validateUser"
              ></v-text-field>

            </v-form>
          </v-card-text>
          <v-card-actions>

            <v-btn color="secondary" @click="showSignUpModal = true">회원 가입</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validateUser" @keydown.enter="validateUser">로그인</v-btn>

            
           
            
          </v-card-actions>
          
          <v-overlay
            :value="overlay"
            :absolute="absolute">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-overlay>
        </v-card>

        <v-card>
            <SignUp v-if="showSignUpModal" @close="showSignUpModal=false"></SignUp>
        </v-card>
        
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  components:
  {

  },
    data: () => ({
        overlay: false,
        absolute: true,

        id : "",
        password : "",
        confirm : "",
        showSignUpModal: false,
        SignUp : false,
    }),
    methods: {
        validateUser() {
          // 추후 형식 맞는지 검사

          this.onSubmit(this.id, this.password);
        },
        onSubmit(id, password) {
          this.overlay = true;

          console.log(id, password);
        },


        signup() {
          this.showSignUpModal=true;
          
        }
    }
}


</script>

