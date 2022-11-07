<!--Content front-->
<template>
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
        <v-row>
          <v-col
            v-for="(item, index) in ContentFrontModalList"
            :key="index"
            cols="4"
          >
            <Content-Modal v-bind:info="ContentFrontModalList[index]"></Content-Modal>
          </v-col>
        </v-row>
      </div>
      <!--스크롤 내리기-->
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
    <!--컨텐츠 등록-->
    <template>
    <!--컨텐츠 등록 우측으로 이동-->
    <div class="text-right">
      <v-col
        cols="12"
        sm="12"
        md="8"
        offset-md="4"
      >
        <v-dialog
          v-model="ContentFrontDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="deep-purple lighten-1"
            dark
            v-bind="attrs"
            v-on="on"
          >
            컨텐츠 등록
          </v-btn>  
          </template>
          <!--컨텐츠 등록 팝업창-->
          <v-card
            class="overflow-hidden"
            color="purple lighten-1"
            dark
          >
            <!--상단 컨텐츠 등록-->   
            <v-toolbar
                flat
                color="purple"
            >
              <v-toolbar-title class="front-weight-light">컨텐츠 등록</v-toolbar-title> 
            </v-toolbar>
            <!--컨텐츠 이름: ContentName-->
            <v-card-text>
              <v-text-field
                v-model="ContentName"
                label="컨텐츠 이름"
                required
                color="white"
              >
              </v-text-field>
              <v-progress-linear
                v-if="uploading"
                indeterminate
                rounded
                color="light-blue"
                height="20px"
              >
              </v-progress-linear>
              <!-- 콘텐츠 파일 첨부-->
              <v-file-input
                v-model="ContentFrontFiles"
                :accept="fileAccept"
                color="blue lighten-3"
                counter
                label="File input"
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
                loading=true
                @change="selectFile"
              >
                <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="blue lighten-3"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>
                <span
                color="blue"
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
                </template>
              </v-file-input>
            </v-card-text>
            <!--하단 취소, 확인 버튼-->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-grey"
                @click="ContentFrontDialog = false"
              >
                취소
              </v-btn>
              <v-btn
                color="green"
                @click=UpdateId()
                :disabled="!isUploaded"
              >
                확인
              </v-btn>
            </v-card-actions>  
            <v-snackbar
              v-model="contentSaved"
              :timeout="2000"
              absolute
              bottom
              left
            >
              업로드가 완료되었습니다.
            </v-snackbar>
          </v-card>
        </v-dialog>
        <!--강의실 등록 입력이 스크롤창 위로 보이도록 조정-->
        <v-container style="height: 20px;"></v-container>
      </v-col>
    </div>
    </template>   
  </v-responsive>   
</v-card> 
</template>

<!------script-------->
<script>
import ContentModal from './ContentModal.vue';
var Config = require("../../config");
var ResAPIURL = require("../../RestAPIURL");

export default {
  components: { ContentModal },
  data: () => ({
    // 컨텐츠 파일업로드 형식 지정
    contentSaved: false,
    durationaa: 0,
    uploading: false,
    progress: 0,
    isUploaded: false,
    ContentFrontFiles: null, // v-model=ContentFrontFiles 파일 업로드
    fileAccept: 'video/*',
    contentId: "",
    ContentName: "", // 컨텐츠 이름
    ContentFrontDialog: false, // ContentFrontDialog 선택시, 입력 값
  // ContentFrontModalList
    ContentFrontModalList:[],
  }),

  created() {
    this.fetchData();
  },    

  methods: {
    // 컨텐츠 목록 API : 16. Post - http://IPAddress/api/content/post/contentlist
    fetchData() {
      this.ContentFrontModalList = [];

      var url = ResAPIURL.Content.PostContentListAPI;

      var userId = this.$store.getters.getUserInfo.id;
      var payload = {
        instructorId: userId
      }

      var config = Config.config;

      this.$http
        .post(url, payload, config)
        .then(res => {
          if (res.data.data.length > 0) {
            res.data.data.forEach(element => {
              if (element.id !== 51) {
                var filename = element.directory.slice(element.directory.indexOf("_")+1);
                this.ContentFrontModalList.push({
                id: element.id,
                name: element.name,
                filename: filename
              })
              }
            })
          }
        })
    },

    selectFile(file) {
      this.uploading = false;

      this.progress = 0;
      this.currentFile = file;
      if (!this.currentFile) {
        this.durationaa = 0
        this.isUploaded = false;
        return;
      }
      var vm = this;
      var video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = function() {
        window.URL.revokeObjectURL(video.src);
        var duration = video.duration;

        vm.durationaa = vm.numbertoTime(duration);
        console.log(vm.durationaa);
      }

      video.src = URL.createObjectURL(this.currentFile);
      this.testProgress();
    },

    // 컨텐츠 생성 API : 13. Post - http://IPAddress/api/content/post/createcontent
    fileUpload(file, onUploadProgress) {
      this.uploading = false;
      this.progress = 0;

      let formData = new FormData();

      formData.append("file", file);

      var url = ResAPIURL.Content.PostCreateContentAPI;
      var config = {
        headers: Config.config.headers,
        onUploadProgress
      }

      this.uploading = true;
      return this.$http.post(url, formData, config);
    }, 

    testProgress() {
      var tempfile = this.currentFile;
      this.isUploaded = false;
      this.fileUpload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total)
      })
        .then((res) => {
          if (tempfile === this.currentFile) {
            if (res.data.success === true) {
              this.contentSaved = true;
              this.uploading = false;
              this.contentId = res.data.data.contentId;
              this.isUploaded = true;
            } else {
              alert("업로드 실패");
              this.uploading = false;
              return;
            }
          }
        })
        .catch(() => {
          this.uploading = false;
          this.progress = 0;
          this.currentFile = undefined;
        })
    },

    
    ContentFrontDeleteClassModal()
    {
      this.ContentFrontModalList.splice(this.ContentFrontModalList.length, 1)
    },

    // 컨텐츠 생성 API : 13. Post - http://IPAddress/api/content/post/createcontent
    Upload() {
      if (!this.currentFile) {
        return;
      }

      const formData = new FormData();
      formData.append("file", this.ContentFrontFiles[0]);

      var url = ResAPIURL.Content.PostCreateContentAPI;

      var config = Config.config;

      this.$http
        .post(url, formData, config)
        .then(res => {
          console.log(res);
          if (res.data.success === true) {
            this.contentId = res.data.data.contentId;
            console.log(this.contentId);
          } else {
            alert("업로드 실패");
            return;
          }
        })
      console.log(this.ContentFrontFiles);
    },

    // 컨텐츠를 등록한 강사 id 저장 API : 14. Post - http://IPAddress/api/content/post/updateidbycontentid
    UpdateId() {
      if (this.contentId === "") {
        alert("파일을 선택해주세요");
        return;
      } else if (!this.ContentName) {
        alert("컨텐츠 이름을 입력해주세요");
        return;
      } else {
        var userId = this.$store.getters.getUserInfo.id;
        var idUpdateUrl = ResAPIURL.Content.PostUpdateIdbyContentIdAPI;
        var payload = {
          instructorId: userId,
          contentId: this.contentId,
          contentName: this.ContentName,
          playTime: this.durationaa
        }

        var config = Config.config;
        this.$http
          .post(idUpdateUrl, payload, config)
          .then(res => {
            console.log(res);
            alert("컨텐츠 업로드가 완료되었습니다.");
            this.fetchData();
            this.ContentFrontDialog = false;
          })
      }

    },
    numbertoTime(value) {
      const sec = parseInt(value, 10); // convert value to number if it's string
      let hours   = Math.floor(sec / 3600); // get hours
      let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
      let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
    },
  },
}
</script>