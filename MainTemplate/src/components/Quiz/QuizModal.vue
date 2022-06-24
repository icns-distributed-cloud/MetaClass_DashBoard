<template>
  <div class="container-app">
    <div class = "container-quiz">
      <div class = "quiz-header">
        <h1>퀴즈 등록</h1>
      </div>

      <div class = quiz-main v-for = "(element,index) in questions.slice(a,b)" :key="index" v-show="quiz">
        <div class = "box-question">
          <div>
            <h2>Question {{ b }} / {{ questions.length }}</h2>
            <!--점수-->
              <v-text-field
                v-model="ClassFrontNumValue"
                label="점수"
                class="numer"
                :ClassFrontRules="[ClassFrontRules.required, ClassFrontRules.min, ClassFrontRules.max]"
                type="number"
                @click:append-outer="ClassFrontIncrement"
                @click:prepend="ClassFrontDecrement"
                color="white"
                required
              >
              </v-text-field>
          </div>
            <v-list></v-list>

             <v-card
                class="mx-auto"
                max-width="90%"
              >
                <v-card-text>
                  <v-text-field 
                  v-model="questions[a]['question']"
                  label="퀴즈 입력"
                  > 
                  </v-text-field>
                </v-card-text>
            </v-card>   
        </div>

        <v-list></v-list>
        <v-card class = "box-suggestions" max-width="90%">
          
          <ul class = "quiz_ul">
            <li class = "quiz_li" v-for="(item, index) in element.suggestions" :key="index" :class = "select? check(item) : ''" click="selectResponse(item)">
                <v-app-bar>
                  <div class = "checkbox-div">
                  <v-checkbox
                    v-model = "questions[a]['suggestions'][index]['correct']"
                    hide-details
                    class="shrink mr-2 mt-0"
                  >
                  </v-checkbox>
                  </div>
                  <div class = "textfield-div">
                    <v-text-field 
                      v-model = "questions[a]['suggestions'][index]['suggestion']"
                      label = "정답 입력"
                    > 
                    </v-text-field>
                  </div>

                  <div class = "box-button-delete">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      x-small
                      color="primary"
                      @click="quiz_delete_list(index)"
                      >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-app-bar>
              
            </li>
          </ul>
        </v-card> 
        
        <div class = "box-button">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="red lighten-1"
            @click="quiz_create_list()"
            >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>

      </div>
      <!--점수 등록 
      <div class = "box-score" v-if="score_show">
        <h2>점수 등록</h2>
        <h2>{{ score }}/{{ questions.length }}</h2>
        <div class = "btn-restart">
          <v-btn>Restart <i class="fas fa-sync-alt"></i></v-btn>
        </div>
      </div>-->

      <v-list></v-list>

      <template>
        <div class = "quiz-footer">
          <div class = "box-button">
            <v-btn rounded color="primary" dark width=25% @click="backQuestion">Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="primary" dark width=25% @click="nextQuestion">Next</v-btn> 
          </div>
        </div>
        </template>
        <template>
          <div class = "quiz-footer">
            <div class = "box-button create_quiz">
              <v-btn rounded color="orange lighten-1" dark width=100% height="65%" @click="conformQuestion"><h3>확인</h3></v-btn>
            </div>
          </div>
        </template>

    </div>
  </div>
</template>




<script>
export default {
  name: 'QuizFront',
  data(){
    return{
      questions: [
        {
          question: '문제 이름',
          suggestions: []
        },

       /* {
          question: '안전 장치로 옳지 않은 것은?',
          suggestions: [
            {suggestion:'장비를 장갑을 끼고 만진다'},
            {suggestion:'장비를 맨손으로 만진다', correct:true},
            {suggestion:'안전모를 착용한다'},
            {suggestion:'안전장비인지 확인 후 사용한다'},
          ]
        },*/

      ],

      a:0,
      b:1,
      select:false,
      score:0,
      quiz:true,
      score_show:false

   }
 },
 methods: {

   selecResponse(e){
     this.select = true;
     if (e.correct) {
       this.score++;
     }
   },

   check(status) {
     if (status.correct) {
       return 'correct'
     } else {
       return 'incorrect'
     }
   },

   nextQuestion(){
        this.a++;
        this.b++;
        if(this.questions.length -1 < this.a) {
          this.questions.push( {
            question: '',
            suggestions: []
          });
        }
   },

    backQuestion(){
     if(this.a > 0){
      this.a--;
      this.b--;
      }
   },


   // 퀴즈 리스트 생성 (리스트는 4개까지만!)
   quiz_create_list(){
    if(this.questions[this.a]["suggestions"].length < 4 ) {
       this.questions[this.a]["suggestions"].push({suggestion:'', correct:false})
       //this.questions[this.a]["question"] = "테스트 입니다"
   } 
  },

   // 퀴즈 리스트 생성 (리스트는 4개까지만!)
  quiz_delete_list(index){
    if(this.questions[this.a]["suggestions"].length > -1 ) {
       this.questions[this.a]["suggestions"].splice(index, 1);
   } 
  },
   
  conformQuestion(){
    this.score_show = true;
  },
  
  ClassFrontIncrement() {
      if (this.ClassFrontNumValue < this.ClassFrontForm .max) {
        this.ClassFrontNumValue = parseInt(this.ClassFrontNumValue, 10) + 1;
      }
    },

  ClassFrontDecrement() {
    if (this.ClassFrontNumValue > this.ClassFrontForm .min) {
      this.ClassFrontNumValue = parseInt(this.ClassFrontNumValue, 10) - 1;
    }
  },



   // 퀴즈 생성하기
   /* createQuestion()
    {
      var url = "http://163.180.117.47:8088/api/quiz/post/createquiz";

        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
          data: 데이터 넣기 
          instructorId: userId
        }

        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        this.$http
          .post(url, payload, config)
          .then(res => {
            console.log(res.data.success);
            if (res.data.success === true) {
              alert("퀴즈 등록이 완료되었습니다.");
              this.score_show = true;
              this.fetchData();
            } else {
              alert(res.data.message);
              return;
            }
          })
      },*/


 }
}
</script>




<style>
/*{
  font-family: 'Poppins, sans-serif';
  margin: 0;
  letter-spacing: 2px;
 */

.container-app {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
}

.container-quiz {
    display: flex;
    width: 40%;
    height: 85%;
    background-color: white;
    text-align: center;
    flex-flow: column;
    border: 1px solid #e7eae0;
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.quiz-header {
    display: flex;
    width: 100%;
    height: 20%;
    border-bottom: 1px solid #e7eae0;
    justify-content: center;
    align-items: center;
    background-color: #e7eae0;
    border-radius: 10px 10px 0px 0px;
}

.quiz-main {
  display: flex;
  width: 100%;
  height: 70%;
  flex-flow: column;
  margin: auto; 
}

.quiz-footer {
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  border-top: 1px solid #e7eae0;
  background-color: #e7eae0;
  border-radius: 0px 0px 10px 10px;
}

.box-suggestions {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: auto; 
  
}

.container-quiz .box {
    display: flex;
    width: 100%;
    height: 70%;
    flex-flow: column;
    margin: auto;
}

.box-question {
    margin-top: 20px;
 
}

.box-question p {
    margin-top: 20px;
    margin-bottom: 20px;
}

.box-propositions {
    margin: auto;
    display: flex;
    width: 100%;
    justify-content: center;
}

ul.quiz_ul {
    display: flex;
    width: 90%;
    margin: 0;
    padding: 0;
    flex-flow: column;
}

li.quiz_li {
    list-style: none;
    line-height: 2;
    border: 1px solid #cdd2d2;
    margin-bottom: 10px;
    margin-top: 10px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.3s;
    
}

li:hover {
 
    background-color: #e7eae0;
}

li>div {
    margin-top: 7px;
    margin-right: 7px;
    color: white;
}

.check {
    color: rgb(74, 219, 74);
}

.close {
    color: rgb(240, 117, 100);
}

.footer-quiz {
    display: flex;
    width: 100%;
    height: 10%;
    justify-content: center;
    border-top: 1px solid #e7eae0;
    background-color: #e7eae0;
    border-radius: 0px 0px 10px 10px;
}

.box-button {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-top: 15px; 
    padding-left: 15px;
    padding-right: 15px;
}

.footer-quiz .box-button v-btn {
    width: 150px;
    height: 35px;
    outline: none;
    border: 0;
    color: white;
    font-size: 18px;
    cursor: pointer;
    border-radius: 15px;
    margin: auto;
    margin-bottom: 10px;
    letter-spacing: 2px;
    background-color: #a09f9ff5;
}

li.correct {
    border: 1px solid rgb(74, 219, 74);
    background-color: rgb(74, 219, 74);
    color: white;
    font-weight: 600;
}

li.incorrect {
    border: 1px solid rgb(240, 117, 100);
    background-color: rgb(240, 117, 100);
    color: white;
    font-weight: 600;
}

.box-score {
    display: flex;
    width: 100%;
    height: 70%;
    flex-flow: column;
}

.box-score h2 {
    margin-top: 40px;
}

i {
    display: none;
    color: white;
}

.step-progress {
    display: flex;
    width: 100%;
    height: 5px;
    background-color: rgb(106, 128, 202);
    transition: 0.5s;
}

.btn-restart {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    margin-top: 50px;
}

.btn-restart v-btn {
    width: 150px;
    height: 35px;
    outline: none;
    border: 0;
    background-color: rgb(106, 128, 202);
    color: white;
    font-size: 18px;
    cursor: pointer;
    border-radius: 15px;
    margin: auto;
    margin-bottom: 10px;
    letter-spacing: 2px;
}

.question_list_size {
  width : 80%;
  justify-content: center;
}

.next {
    background-color: rgb(106, 128, 202);
}

.checkbox-div {
  width: 10%;

}

.textfield-div {
  width: 80%;

}

.box-button-delete {
  width: 10%;
  float: right;
}

.create_quiz {
  height: 70px;
}

@media screen and (max-width: 900px) {
    .container-quiz {
        width: 60%;
    }
}

@media screen and (max-width: 720px) {
    .container-quiz {
        width: 80%;
    }
    .footer-quiz .box-button v-btn {
        width: 100px;
    }
    }
</style>