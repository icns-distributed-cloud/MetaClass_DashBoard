<!--Certificate front-->
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
            v-for="(item, index) in CertificateFrontModalList"
            :key="index"
            cols="4"
          >
            <Certificate-Modal v-bind:info="CertificateFrontModalList[index]" v-bind:fetchCertificateData="fetchCertificateData"></Certificate-Modal>
          </v-col>
        </v-row>
      </div>
      <!--스크롤 내리기-->
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
    <!--수료증 등록-->
    <template>
    <!--수료증 등록 우측으로 이동-->
    <div class="text-right">
      <v-col
        cols="12"
        sm="12"
        md="8"
        offset-md="4"
      >
        <v-dialog
          v-model="CertificateFrontDialog"
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
            수료증 등록
          </v-btn>  
          </template>
          <!--수료증 등록 팝업창-->
          <v-card
            class="overflow-hidden"
            color="purple lighten-1"
            dark
          >
            <!--상단 수료증 등록-->   
            <v-toolbar
              flat
              color="purple"
            >
              <v-toolbar-title class="front-weight-light">수료증 등록</v-toolbar-title> 
            </v-toolbar>
            <!--수료증 이름: CertificateName-->
            <v-card-text>
              <v-text-field
                v-model="CertificateName"
                label="수료증 이름"
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
                v-model="CertificateFrontFiles"
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
                @click="CertificateFrontDialog = false"
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
              v-model="certificateSaved"
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
import CertificateModal from './CertificateModal.vue';
var RestAPIManager = require("../RestAPIManager");

export default {
  components: { CertificateModal },
  data: () => ({
    // 수료증 파일업로드 형식 지정
    certificateSaved: false,
    uploading: false,
    progress: 0,
    isUploaded: false,
    CertificateFrontFiles: null, // v-model=CertificateFrontFiles 파일 업로드
    fileAccept: 'image/*',
    certificateId: "",
    CertificateName: "", // 수료증 이름
    CertificateFrontDialog: false, // CertificateFrontDialog 선택시, 입력 값
  // CertificateFrontModalList
    CertificateFrontModalList:[],
  }),

  created() {
    this.fetchCertificateData();
  },    

  methods: {
    selectFile(file) {
      this.uploading = false;
      this.progress = 0;
      this.currentFile = file;
      if (!this.currentFile) {
        this.isUploaded = false;
        return;
      }
      this.testProgress();
    },

    CertificateFrontDeleteClassModal() {
      this.CertificateFrontModalList.splice(this.CertificateFrontModalList.length, 1)
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

    // 54. Post- http://IPAdress/api/certificate/post/certificatelist 
    async fetchCertificateData() {
      var certificatelist = await RestAPIManager.API_certificatelist(this.$store.getters.getUserInfo.id);
      this.certificatelist = certificatelist.certificateList;
      var CertificateFrontModalList = [];
      for (const certificate of this.certificatelist){
        if (certificate.id !== 51){
          var filename = certificate.directory.slice(certificate.directory.indexOf("_")+ 1);
          CertificateFrontModalList.push({
            id: certificate.id,
            name: certificate.name,
            filename: filename
          })
        }
      }
      this.CertificateFrontModalList = CertificateFrontModalList;
    },

    // 52. Post - http://IPAddress/api/certificate/post/createcertificate
    fileUpload(file, onUploadProgress) {
        this.uploading = false;
        this.progress = 0;
        let formData = new FormData();
        formData.append("file", file);
        this.uploading = true;
        return ({
          formData: formData,
          onUploadProgress: onUploadProgress
        });
      },

    async testProgress() {
      var tempfile = this.currentFile;
      this.isUploaded = false;

      var fileUploaded = this.fileUpload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total)
      })

      var createCertificate = await RestAPIManager.API_createcertificate(fileUploaded.formData);
      
      if (tempfile === this.currentFile){
        if (createCertificate.success === true){
          this.certificateSaved = true;
          this.uploading = false;
          this.certificateId = createCertificate.data.certificateId;
          this.isUploaded = true;
        } else {
          alert("업로드 실패");
          this.uploading = false;
          return;
        }
      } else {
        this.uploading = false;
        this.progress = 0;
        this.currentFile = undefined
      }
    },

    // 53. Post - http://IPAddress/api/certificate/post/getcertificateinfobyid
    async UpdateId() {  
      if (this.certificateId === "") {
        alert("파일을 선택해주세요");
        return;
      } else if (!this.CertificateName) {
        alert("수료증 이름을 입력해주세요");
        return;
      } else {
        var getcertificateinfobyid = await RestAPIManager.API_getcertificateinfobyid(this.$store.getters.getUserInfo.id, this.certificateId, this.CertificateName);
        this.getcertificateinfobyid = getcertificateinfobyid;
        if (this.getcertificateinfobyid.success){
          alert("수료증 업로드가 완료되었습니다.");
          this.fetchCertificateData();
          this.CertificateFrontDialog = false;
        }
      }
    },
  },
}
</script>