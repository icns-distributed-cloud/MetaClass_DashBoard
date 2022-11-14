<!--Quiz front-->
<template>
<v-container fluid>
  <v-card class="overflow-hidden">
    <v-responsive :aspect-ratio="16/9">
      <v-spacer></v-spacer>
      <!--grey lighten-3 색이 포함된 sheet 늘리기 800-->
      <v-sheet 
        id="classmap-mainscroll"
        class="overflow-y-auto"
        max-height="800"
        color="grey lighten-3"
        dark
      >
        <div> 
          <!--<compo-nent :is="QuizModal"></compo-nent>-->
          <v-row>
            <v-col
              v-for="(item, index) in QuizFrontModalList"
              :key="index"
              cols="4"
            >
              <Quiz-Modal v-bind:info="QuizFrontModalList[index]" v-bind:fetchData="fetchData"></Quiz-Modal>
            </v-col>
          </v-row>
        </div>
      <!--스크롤 내리기-->
        <v-container style="height: 1000px;"></v-container>
      </v-sheet>
      <QuizCreateModal>퀴즈 등록</QuizCreateModal>
    </v-responsive>   
  </v-card> 
</v-container>
</template>

<!------script-------->
<script>
import QuizModal from './QuizModal.vue';
import QuizCreateModal from './QuizCreateModal.vue';
var RestAPIManager = require("../RestAPIManager");

export default {
  components: { QuizModal, QuizCreateModal },
  //name: 'QuizFront',
  props: {
    info: {
      type: Object,
      require: true
    }
  },

  data: () => ({
    QuizId: "",
    QuizFrontMapName: "", // 퀴즈 이름
  // QuizFrontModalList
    QuizFrontModalList:[],
    QuizModalView:false,
    QuizCreateModal:false,

    data: [
      {
        title: '',
        quizContext: [],
        answerYN: [],
        score: 0,
      },
    ],
    a:0,
    b:1,
    select:false,
    //score:0,
    quiz:true,
    QuizScoreModal:false,
    totalscore: 0,
  }),

  created() {
    this.fetchQuizData();
  },    

  methods: {
    // 퀴즈 리스트 API : 42. Get - http://IPAddress/api/quiz/get/list?instructorId=1 
    async fetchQuizData() {
      this.QuizFrontModalList = [];
      var quizFrontModalList = await RestAPIManager.API_quizlist(this.$store.getters.getUserInfo.id)
      this.QuizFrontModalList = quizFrontModalList;
    },

    QuizFrontCreateModal() {
      this.QuizFrontModalList.push({
        com : QuizModal
      })   
    },

    QuizFrontDeleteClassModal() {
      this.QuizFrontModalList.splice(this.QuizFrontModalList.length, 1)
    },

    QuizFrontModal() {
      this.QuizCreateModal = false
      this.QuizModalView = true
    },

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

    nextQuestion() {
      this.a++;
      this.b++;
      if(this.data.length -1 < this.a) {
        this.data.push( {
          title: '',
          quizContext: [],
          answerYN: [],
          score: 0,
        });
      }
    },

    backQuestion() {
      if(this.a > 0){
        this.a--;
        this.b--;
      }
    },

  // 퀴즈 리스트 생성 (리스트는 4개까지만!)
    quiz_create_list() {
      if(this.data[this.a]["quizContext"].length < 4 ) {
        this.data[this.a]["quizContext"].push('');
        this.data[this.a]["answerYN"].push(false);
      } 
    },

    // 퀴즈 리스트 삭제 (리스트는 4개까지만!)
    quiz_delete_list(index) {
      if(this.data[this.a]["quizContext"].length > -1 ) {
        this.data[this.a]["quizContext"].splice(index, 1);
        this.data[this.a]["answerYN"].splice(index, 1);
      } 
    },

    popUpQuizScoreModal() {
      this.QuizScoreModal = true
    },

    GetTotalScore() {
      this.totalscore = 0;
      for (var i=0; i<this.data.length; i++) {
        this.totalscore += parseFloat(this.data[i]['score']);
      }

      if (this.totalscore % 100) {
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

  // 퀴즈 생성 API : 40. Post - http://IPAddress/api/quiz/post/createquiz
    async createQuestion(){
      var createQuiz = await RestAPIManager.API_createquiz(this.QuizFrontMapName, this.data, this.$store.getters.getUserInfo.id);
      if (createQuiz.success === true) {
        alert("퀴즈 등록이 완료되었습니다.");
        this.QuizScoreModal = false;
        this.QuizModalView = false;
        //this.score_show = true; // score_show
        this.$parent.$parent.$parent.$parent.fetchQuizData();
      } else {
        alert(createQuiz.message);
        return;
      }
      // data 초기화
      this.data = [
        {
          title: '',
          quizContext: [],
          answerYN: [],
          score: 0,
        },
      ]
      this.QuizFrontMapName = "";
    },
    
    // 퀴즈 등록 창 닫기
    quizDialogClose() {
      this.QuizModalView = false
    },

    // 점수 등록 창 닫기
    QuizScoreDialogClose() {
      this.QuizScoreModal = false
    },
  },
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