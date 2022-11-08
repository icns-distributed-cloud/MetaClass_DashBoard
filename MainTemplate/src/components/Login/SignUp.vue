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
var SignEnum = require("../Enum/SignEnum");
var UserModes = SignEnum.UserModes;
var RestAPIManager = require("../RestAPIManager");


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
  async created() {
    var vm = this;
    var departmentList = await RestAPIManager.API_departmentlist();
    var departmentItems = [];
    for (const department of departmentList.departmentList){
      departmentItems.push({
        item_text: department.name,
        item_value: department.id
      })
    }
    vm.departmentItems = departmentItems;
  },

  methods: {
    // 아이디 중복 체크 API : 48. Request - http://IPAddress/api/users/post/checkLoginId
    async checkLoginId() {
      var checkLoginId = await RestAPIManager.API_checkloginid(this.userid);
      if (checkLoginId.success === true){
        this.IDCHECKED = true;
        alert("사용가능한 ID 입니다.");
      } else {
        alert("사용중인 ID 입니다.");
      }
    },

    // 회원가입 API : 4. Post - http://IPAddress/api/users/post/register
    async submit() {
      if(this.IDCHECKED){
        var usermode = 0;
        if (this.role === "instructor") {
          usermode = UserModes.INSTRUCTOR;
        } else if (this.role === "student") {
          usermode = UserModes.STUDENT;
        } else {
          alert("정확하게 입력해주세요.");
          return;
        }
        var register = await RestAPIManager.API_register(this.userid, this.userpass, this.name, usermode, this.email, this.selectedDepartment.item_value, this.phone);
        if (register.success){
          alert("회원가입이 완료되었습니다.")
          this.redirect();
        } else {
          alert(register.message);
        }
      } else {
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

