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
            <!-- <v-btn color="secondary" @click="showSignUpModal = true">회원 가입</v-btn> -->
            <v-btn color="secondary" href="/signup">회원가입</v-btn>
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
      </v-col>
    </v-row>
  </v-container>
</v-app>
</template>

<script>
var SignEnum = require('../Enum/SignEnum');
var UserModes = SignEnum.UserModes;
var Status = SignEnum.Status;

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
  }),

  props: {
    imgLogo: {
      type: String,
      default: require("@/assets/logo.jpeg")
    }
  },

  methods: {
    validateUser() {
      // 추후 형식 맞는지 검사
      // base64 encoding
      this.onSubmit(this.id, window.btoa(this.password));
    },

    // signin
    // 로그인 관련 API : 1. Post - http://IPAddress/api/users/post/login
    onSubmit(id, password) {
      this.overlay = true;

      setTimeout(() => {
        this.sending = true;

        this.$store.dispatch("LOGOUT");

        this.$store
        .dispatch("LOGIN", {id, password})
        .then((res) => {
          if (res === "success") {
            this.overlay = false;
            this.redirect();
          } else {
            alert("로그인 실패!");
            this.overlay = false;
          }
        })
        .catch(({message}) => {
          console.log(message);
          alert("로그인 실패!");
          this.overlay = false;
        })
      }, 1000);
    },

    redirect() {
      var userMode = this.$store.getters.getUserInfo.userMode;
      var redirectPath = "/";
      if (this.$store.getters.getUserInfo.status === Status.NOT_AVAILABLE){
        // 비밀번호 변경 modal or page 이동
      } else {
          if (userMode === UserModes.INSTRUCTOR) {
          redirectPath = "/CalendarPage"
        } else if (userMode === UserModes.STUDENT) {
          redirectPath = "/StudentCalendar"
        } else if (userMode === UserModes.SERVER_MANAGER) {
          redirectPath = "/ServerRegister"
        }
      }
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


