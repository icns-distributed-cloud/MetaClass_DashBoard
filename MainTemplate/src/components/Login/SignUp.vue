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

</template>

<script>
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

    created() {
      var vm = this;
      var url = "http://163.180.117.47:8088/api/department/get/departmentlist"

      var config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

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
      // 48. 아이디 중복 체크 http://localhost:8088/api/users/post/checkLoginId
      checkLoginId() {
        var url = "http://163.180.117.47:8088/api/users/post/checkLoginId";
      
        var payload = {
          loginId: this.userid,
        }
        
        var config = {
        headers: {
          "Content-Type": "application/json"
        }

        
      }

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

      submit() {
        if(this.IDCHECKED){
          var url = "http://163.180.117.47:8088/api/users/post/register";

          var usermode = 0;
          if (this.role === "instructor") {
            usermode = 0;
          } else if (this.role === "student") {
            usermode = 1;
          } else {
            alert("정확하게 입력해주세요.");
            return;
          }

          var payload = {
            loginId: this.userid,
            password: this.userpass,
            name: this.name,
            userMode: usermode,
            email: this.email,
            departmentId: this.selectedDepartment.item_value,
            phone: this.phone
          }

          var config = {
            headers: {
              "Content-Type": "application/json"
            }
          }

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
