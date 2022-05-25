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
        <compo-nent :is="ContentModal"></compo-nent>
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
                            color="primary"
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
                        max-width="600"
                        color="light-blue lighten-1"
                        dark
                    >
                    <!--상단 컨텐츠 등록-->   
                        <v-toolbar
                            flat
                            color="light-blue"
                        >
                        <v-toolbar-title class="front-weight-light">컨텐츠 등록</v-toolbar-title>
                        <v-spacer></v-spacer>  
                        </v-toolbar>

                        <!--컨텐츠 이름: ContentFrontMapName-->

                        <v-text-field
                          v-model="ContentFrontMapName"
                          :error-messages="ContentFrontMapName"
                          :counter="10"
                          label="컨텐츠 이름"
                          required
                          @input="$v.ContentFrontMapName.$touch()"
                          @blur="$v.ContentFrontMapName.$touch()"
                          solo-inverted
                          color="white" 
                        >
                        </v-text-field>

                        <!-- 콘텐츠 파일 첨부-->
                        <v-file-input
                          v-model="ContentFrontFiles"
                          color="blue lighten-3"
                          counter
                          label="File input"
                          multiple
                          placeholder="Select your files"
                          prepend-icon="mdi-paperclip"
                          outlined
                          :show-size="1000"
                          loading=true
                          @change=Upload()
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

                        <!--하단 취소, 확인 버튼-->
                        <v-card-actions >
                            <v-spacer></v-spacer>
                            <v-btn
                                color="light-blue lighten-5"
                                text
                                @click="ContentFrontDialog = false"
                            >
                                취소
                            </v-btn>
                            <v-btn
                                color="light-blue lighten-5"
                                text
                                @click=UpdateId()
                            >
                                확인
                            </v-btn>
                        </v-card-actions>  
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

import ContentModal from './ContentModal.vue'

  export default {

  components: { ContentModal },
    data: () => ({
      contentId: "",

      ContentFrontFiles: [], // v-model=ContentFrontFiles 파일 업로드
      ContentFrontMapName: "", // 컨텐츠 이름
      ContentFrontDialog: false, // ContentFrontDialog 선택시, 입력 값
    // ContentFrontModalList
      ContentFrontModalList:[],
    }),
  created() {
    this.fetchData();
  },    

  methods: {
      fetchData() {
        this.ContentFrontModalList = [];

        var url = "http://163.180.117.47:8088/api/content/post/contentlist";

        var userId = this.$store.getters.getUserInfo.id;
        var payload = {
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
            if (res.data.data.length > 0) {
              res.data.data.forEach(element => {
                var filename = element.directory.slice(element.directory.indexOf("_")+1);
                console.log(filename);
                this.ContentFrontModalList.push({
                  id: element.id,
                  name: element.name,
                  filename: filename
                })
              })
            }
          })

      },

      ContentFrontCreateClassModal()
      {
        this.ContentFrontModalList.push({
                com : ContentModal
            })   
        console.log("aaaaaaaaa")
      },

      ContentFrontDeleteClassModal()
      {
        this.ContentFrontModalList.splice(this.ContentFrontModalList.length, 1)
      },
      Upload() {
        const formData = new FormData();
        formData.append("file", this.ContentFrontFiles[0]);

        var url = "http://163.180.117.47:8088/api/content/post/createcontent";

        var config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }

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
      UpdateId() {
        if (this.contentId === "") {
          alert("파일을 선택해주세요");
          return;
        } else {
          var userId = this.$store.getters.getUserInfo.id;
          var idUpdateUrl = "http://163.180.117.47:8088/api/content/post/updateidbycontentid";
          var payload = {
            instructorId: userId,
            contentId: this.contentId,
            contentName: this.ContentFrontMapName
          }
          this.$http
            .post(idUpdateUrl, payload, {
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(res => {
              console.log(res);
              alert("컨텐츠 업로드가 완료되었습니다.");
              this.fetchData();
              this.ContentFrontDialog = false;
            })
        }

      }
  }
  }
</script>