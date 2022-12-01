<template>
<v-app>
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
          </v-toolbar>
          <v-card-text>
            최초 로그인 비밀번호 변경
            
            <v-text-field
            label="비밀번호"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"
            @keydown.enter="changePassword"
            ></v-text-field>
              
              <v-form ref="form">
              <v-text-field
                id="confirm"
                label="비밀번호 확인"
                name="confirm"
                prepend-icon="mdi-lock"
                type="password"
                v-model="confirm"
                :rules="rules"
                @keydown.enter="changePassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>

            <v-spacer></v-spacer>
            <v-btn 
                color="primary" 
                @click="changePassword" 
                @keydown.enter="changePassword"
                :disabled="!match"
            >
            비밀번호 변경
            </v-btn>

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
      </v-col>
    </v-row>
  </v-container>
</v-app>
</template>

<script>
var RestAPIManager = require('../RestAPIManager');

export default {
  components: {
    
  },

  data: () => ({
    overlay: false,
    absolute: true,
    sending: false,

    id : "",
    password : "",
    confirm : "",
    showSignUpModal: false,
    SignUp : false,
    match: false,
  }),

  props: {
    imgLogo: {
      type: String,
      default: require("@/assets/logo.jpeg")
    }
  },
  computed: {
    rules() {
        const rules = []

        if (this.confirm) {
            const rule = v => (!!v && v) === this.password || 'Password do not match'
            rules.push(rule)
        }
        return rules
    }
  },
  watch: {
    password: 'validateField',
    confirm: 'validateField'
  },

  methods: {

    validateField() {
        this.match = this.password && this.confirm && this.$refs.form.validate();
        this.$refs.form.validate()
    },

    // changePassword
    // 비밀번호 변경 API : 51. Post - http://IPAddress/api/users/post/changePassword
    async changePassword() {
        this.overlay = true;

        if (this.match === true) {
            var userId = this.$store.getters.getUserInfo.id;
            var userMode = this.$store.getters.getUserInfo.userMode;

            var changePassword = await RestAPIManager.API_changepassword(userId, window.btoa(this.confirm), userMode)

            console.log(changePassword);
            if (changePassword.success === true) {
                this.overlay = false;
                alert("비밀번호 변경 성공")
                this.redirect()
            } else {
                alert("비밀번호 변경 실패!");
                this.overlay = false;
            }
        } else {
            alert("비밀번호가 일치하지 않습니다");
            this.overlay = false;
        }
        

     
    },

    redirect() {
        var redirectPath = "/";
      
        this.$router.push(redirectPath);
    },

    signup() {
      this.showSignUpModal=true;
    },
  },
}
</script>

<style lang="scss" scoped>
  .loading-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>


