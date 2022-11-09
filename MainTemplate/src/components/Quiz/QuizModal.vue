<template>
<v-col>
  <v-card>
    <v-toolbar
      color="indigo"
      light
      extended
    >
      <v-toolbar-title class="white--text">
        <h2>{{info.name}}</h2>
      </v-toolbar-title>
    </v-toolbar>
    <v-list
      two-line
      subheader
      color="indigo lighten-5"
    >  
    </v-list>

    <v-list two-line color="indigo lighten-5">
      <v-card-actions>
        <v-spacer></v-spacer> 
          <v-btn
            class="mr-4"
            color="indigo darken-4"
            @click="DeleteQuiz()"
          >
            삭제
          </v-btn>
          <v-btn
            class="mr-4"
            color="green"
            @click="popupUpdateQuiz()"
          >
            수정
          </v-btn>
      </v-card-actions> 
    </v-list>
  </v-card>
  <!--퀴즈 모달 시작-->
  <template>
  <v-dialog v-model = "QuizModalView">
    <div class="container-app">
      <div class = "container-quiz">
        <div class = "quiz-header">
          <div class = "box-button">
            <v-spacer></v-spacer>
            <v-btn
              class="mx-2"
              fab
              dark
              color="indigo"
              @click="quizDialogClose()"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <div class = "quiz-header">
          <div class = "box-button">
            <h1>퀴즈 등록</h1>
          </div>
        </div>
        <div class = quiz-main v-for = "(element,index) in data.slice(a,b)" :key="index" v-show="quiz">
          <div class = "box-question">
            <h2>Question {{ b }} / {{ data.length }}</h2>
            <v-list></v-list>
            <v-card
              class="mx-auto"
              max-width="90%"
            >
              <v-card-text>
                <v-text-field 
                  v-model="data[a]['title']"
                  label="퀴즈 입력"
                > 
                </v-text-field>
              </v-card-text>
            </v-card>   
          </div>
          <v-list></v-list>
          <v-card class = "box-suggestions" max-width="90%">
            <ul class = "quiz_ul">
              <li class = "quiz_li" v-for="(item, index) in element.quizContext" :key="index" :class = "select? check(item) : ''" click="selectResponse(item)">
                <v-app-bar>
                  <div class = "checkbox-div">
                    <v-checkbox
                      v-model = "data[a]['answerYN'][index]"
                      hide-details
                      class="shrink mr-2 mt-0"
                    >
                  </v-checkbox>
                  </div>
                  <div class = "textfield-div">
                    <v-text-field 
                      v-model = "data[a]['quizContext'][index]"
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
          <div class="box-button">
            <v-btn
              class="mx-2"
              fab
              dark
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
        <div class = "quiz-footer-next">
          <div class = "box-button">
            <v-btn rounded color="primary" dark width=25% @click="backQuestion">Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="primary" dark width=25% @click="nextQuestion">Next</v-btn> 
          </div>
        </div>
        </template>
          <!--배점-->
        <template>
        <div class = "quiz-footer">
          <div class = "box-button create_quiz">
            <v-btn rounded color="orange lighten-1" dark width=100% height="65%" @click="popUpQuizScoreModal()"><h3>배점</h3></v-btn>
          </div>
        </div>
        </template>
          <!--수정 완료-->
        <template>
        <div class = "quiz-footer">
          <div class = "box-button create_quiz">
            <v-btn rounded color="orange lighten-1" dark width=100% height="65%" @click="updateQuestion()"><h3>수정 완료</h3></v-btn>
          </div>
        </div>
        </template>
          <!--점수입력-->
        <template>
        <v-row>
          <v-col>
            <v-dialog
              v-model="QuizScoreModal"
              max-width="500px"
            >
            <!--퀴즈 등록-->
              <template>
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >
                  <h2>점수 등록</h2>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    dark
                    @click="QuizScoreDialogClose()"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <!--scroll-->
                <v-sheet 
                  id="classmap-mainscroll"
                  class="overflow-y-auto"
                  max-height="500"
                >
                  <v-list></v-list>
                  <!--문제당 점수항목-->
                  <v-card class = "box-suggestions" max-width="90%">
                    <ul class = "quiz_ul">
                      <li class = "quiz_li" v-for="(item, index) in data.length" :key="index" :class = "select? check(item) : ''" click="selectResponse(item)">
                        <v-app-bar>
                          <div 
                            class = "score-index" 
                            hide-details
                          >
                            <h3>{{index + 1}}번</h3> 
                          </div>
                            <div class = "textfield-div">
                              <v-text-field 
                                v-model = "data[index]['score']"
                                @input = "GetTotalScore()"
                              > 
                              </v-text-field>
                          </div>
                        </v-app-bar>   
                      </li>
                    </ul>
                  </v-card> 
                </v-sheet>
                <!--이전 / N/1-->
                <template>
                <div class = "quiz-footer-next">
                  <div class = "box-button">
                    <v-btn
                      rounded
                      color="blue lighten-1"
                      depressed
                      dark
                      width="20%"
                      @click="QuizScoreModal = false"
                    >이전
                    </v-btn>
                    <v-spacer></v-spacer>
                      <h3>총점: {{ totalscore }}</h3>
                      <v-spacer></v-spacer>
                    <v-btn
                      rounded
                      color="blue lighten-1"
                      depressed
                      dark
                      width="20%"
                      @click="QuizScoreDeviedN(), GetTotalScore()"
                    >N/1
                    </v-btn>
                  </div>
                </div>
                </template>
                <template>
                <div class = "quiz-footer">
                  <div class = "box-button create_quiz">
                    <v-btn rounded color="orange lighten-1" dark width=100% height="65%" @click="updateQuestion()"><h3>수정 완료</h3></v-btn>
                  </div>
                </div>
                </template>
              </v-card>
              </template> 
              <!--sumit 끝 부분-->
            </v-dialog>
          </v-col>      
        </v-row> 
        </template>
      </div>
    </div>
  </v-dialog>
  </template>
  <!--퀴즈 모달 끝-->
</v-col>
</template>

<!---->
<script>
var RestAPIManager = require("../RestAPIManager");

export default {
  props: {
    info: {
      type: Object,
      require: true
    }
  },

  computed: {
  },

  created() {
  },

  data:() => ({
    QuizId: "",
    QuizFrontMapName: "", // 퀴즈 이름
    QuizFrontDialog: false, //QuizFrontDialog 선택시, 입력 값
  // QuizFrontModalList
    QuizFrontModalList:[],
    QuizModalView:false,

    data: [],

    a:0,
    b:1,
    select:false,
    //score:0,
    quiz:true,
    QuizScoreModal:false,
    totalscore: 0,
  }),

  methods: {
    // 퀴즈 모달
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
      if(this.data.length - 1 < this.a) {
        this.data.push( {
          title: '',
          quizContext: [],
          answerYN: [],
          score: 0,
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
      if(this.data[this.a]["quizContext"].length < 4 ) {
        this.data[this.a]["quizContext"].push('');
        this.data[this.a]["answerYN"].push(false);
      } 
    },

    // 퀴즈 리스트 삭제 (리스트는 4개까지만!)
    quiz_delete_list(index){
      if(this.data[this.a]["quizContext"].length > -1 ) {
        this.data[this.a]["quizContext"].splice(index, 1);
        this.data[this.a]["answerYN"].splice(index, 1);
      } 
    },
  
    popUpQuizScoreModal() {
      this.QuizScoreModal = true
      this.GetTotalScore()
    },

    GetTotalScore() {
      this.totalscore = 0;
      for (var i=0; i<this.data.length; i++) {
        this.totalscore += parseFloat(this.data[i]['score']);
      }

      if ((this.totalscore % 1)>0) {
        this.totalscore = this.totalscore.toFixed(1);
      }
    },

    QuizScoreDeviedN() {
      var length = this.data.length;
      for (var i=0; i<length; i++) {
        if (100% length) {
          this.data[i]['score'] = (100/this.data.length).toFixed(1);
        } else {
          this.data[i]['score'] = Math.round(100/this.data.length);
        }
      }
    },

    // 퀴즈 아이디에 따른 퀴즈 정보 API : 47. Get - http://IPAddress/api/quiz/get/listbyquizid?quizId=9
    async popupUpdateQuiz() {
      this.data = [];
      this.a = 0;
      this.b = 1;
      var quizList = await RestAPIManager.API_listbyquizid(this.info.id);
      if (quizList.success === true){
        if (quizList.quizList.length > 0){
          this.QuizModalView = true;
          for (const quiz of quizList.quizList){
            this.data.push({
              title: quiz.title,
              quizContext: quiz.quizContext,
              answerYN: quiz.answerYN,
              score: quiz.score
            });
          }
        }
      } else {
        alert(quizList.message);
        return;
      }
    },

    // 퀴즈 삭제 API : 41. Get - http://IPAddress/api/quiz/get/deletequiz?id=1 (id 는 quiz의 id값)
    async DeleteQuiz() {
      var prompStr = prompt(
        '퀴즈가 삭제되며 복구할 수 없습니다.\n삭제를 원하면 "삭제"를 입력해주세요.'
      );
      if (prompStr == null) {
        return;
      }
      if (prompStr == "삭제") {
        var deleteQuiz = await RestAPIManager.API_deletequiz(this.info.id);
        if (deleteQuiz.success === true){
          alert("성공적으로 삭제되었습니다.");
          this.$parent.$parent.$parent.$parent.fetchData();
        } else {
          alert(deleteQuiz.message);
        }
          console.log("Delete Quiz");
        } else {
          alert("정확하게 입력해주세요.");
          return;
        }
    },

    // 퀴즈 수정 API : 43. Post - http://IPAddress/api/quiz/post/updatequiz
    async updateQuestion(){
      if(this.totalscore > 100){
        alert("점수는 100점을 초과할 수 없습니다.");
      }
      else{
        var updateQuiz = await RestAPIManager.API_updatequiz(this.info.id, this.info.name, this.data);
        console.log(updateQuiz);
        if (updateQuiz.success === true){
          alert("퀴즈 수정이 완료되었습니다.");
          this.QuizModalView = false;
          this.QuizScoreModal = false; 
          this.$parent.$parent.$parent.$parent.fetchData();
        } else {
          alert(updateQuiz.message); // "퀴즈 이름이 중복되었습니다."
          return;
        }
      }
    },

    // 퀴즈 등록 창 닫기
    quizDialogClose () {
      this.QuizModalView = false
    },

    // 점수 등록 창 닫기
    QuizScoreDialogClose() {
      this.QuizScoreModal = false
    },
  }
}
</script>


<!--스타일-->
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

  .quiz-footer-next {
    display: flex;
    width: 100%;
    height: 10%;
    justify-content: center;
    border-top: 1px solid #e7eae0;
    background-color: #e7eae0;
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

  .score-index {
    width: 15%;
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
    border-radius: 0px 0px 10px 10px;
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
