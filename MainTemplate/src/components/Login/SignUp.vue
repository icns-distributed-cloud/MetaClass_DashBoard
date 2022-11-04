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
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >
              <v-toolbar-title>메타 클래스</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <form>
                <v-text-field
                  v-model="name"
                  :counter="10"
                  label="이름"
                  required
                ></v-text-field>
                <!--아이디 중복확인-->
                <v-text-field
                  v-model="userid"
                  :counter="10"
                  label="아이디"
                  required
                >
                  <template #append>
                  <v-btn 
                    small 
                    color="primary"
                    @click="checkLoginId"
                  >
                    중복확인
                  </v-btn>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model="userpass"
                  type="password"
                  :counter="10"
                  label="비밀번호"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  label="이메일"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="phone"
                  label="핸드폰 번호"
                  required
                ></v-text-field>

                <v-radio-group v-model="role">
                  <v-radio
                    label="강의자"
                    value="instructor"
                  ></v-radio>

                  <v-radio
                    label="학생"
                    value="student"
                  ></v-radio>
                </v-radio-group>
                <v-select v-if="role==='student'"
                  v-model="selectedDepartment"          
                  :items="departmentItems"
                  item-text="item_text"
                  item-value="item_value"
                  label="부서"
                  persistent-hint
                  return-object
                  single-line
                  @change="$v.select.$touch()"
                  @blur="$v.select.$touch()"
                ></v-select>
                <v-card-actions>
                <v-btn class="login_button"
                href="/">
                  로그인
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  class="submit_button"
                  color="primary"
                  @click="submit"
                >
                  회원가입
                </v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</v-app>
</template>

<script>
import { UserModes } from './SignEnum';
var Config = require("../../config");
var RestAPIURL = require("../../RestAPIURL");

export default {
  name: "SignUp",
  data() {
    return {
      role: "",
      selectedDepartment: "",
      departmentItems: [],

      name: "",
      userid: "",
      userpass: "",
      email: "",
      phone: "",

      // 중복체크 검사
      IDCHECKED:false,
    }
  },
  props: {
    imgLogo: {
      type: String,
      default: require("@/assets/logo.jpeg")
    }
  },

  // 부서 리스트 API : 27. Get - http://IPAddress/api/department/get/departmentlist
  created() {
    var vm = this;
    var url = RestAPIURL.Department.GetDepartmentListAPI;

    var config = Config.config;

    this.$http
      .get(url, config)
      .then(res => {
        if (res.data.data.length > 0) {
          res.data.data.forEach(element => {
            vm.departmentItems.push({
              item_text: element.name,
              item_value: element.id
            })
          })
        }
        console.log(vm.departmentItems);
      })
  },

  methods: {
    // 아이디 중복 체크 API : 48. Request - http://IPAddress/api/users/post/checkLoginId
    checkLoginId() {
      var url = RestAPIURL.Users.PostCheckLoginIdAPI;
    
      var payload = {
        loginId: this.userid,
      }
      
      var config = Config.config

      this.$http
        .post(url, payload, config)
        .then(res => {
          console.log(res);
          if (res.data.success == true) {
            this.IDCHECKED = true;
            alert("사용가능한 ID 입니다.");
          } else if (res.data.success == false) {
            alert("사용중인 ID 입니다.");
          }
        })
    },

    // 회원가입 API : 4. Post - http://IPAddress/api/users/post/register
    submit() {
      if(this.IDCHECKED){
        var url = RestAPIURL.Users.PostRegisterAPI;

        var usermode = 0;
        if (this.role === "instructor") {
          usermode = UserModes.INSTRUCTOR;
        } else if (this.role === "student") {
          usermode = UserModes.STUDENT;
        } else {
          alert("정확하게 입력해주세요.");
          return;
        }

        var payload = {
          loginId: this.userid,
          // base64 encoding
          // password: window.btoa(this.userpass),
          password: this.userpass,
          name: this.name,
          userMode: usermode,
          email: this.email,
          departmentId: this.selectedDepartment.item_value,
          phone: this.phone
        }

        var config = Config.config;

        this.$http
          .post(url, payload, config)
          .then(res => {
            console.log(res);
            if (res.data.success === true) {
              alert("회원가입이 완료되었습니다.")
              this.redirect();
            }
          })
          .catch(res => {
            alert(res);
          })
      }
      else{
        alert("중복체크를 해주세요.");
      }
    },

    redirect() {
      var redirectPath = "/";
        
      this.$router.push(redirectPath);
    },
  }
}
</script>

