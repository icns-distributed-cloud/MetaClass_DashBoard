<template>
  <v-card class="overflow-hidden">
    <v-spacer></v-spacer>
    <v-sheet
      id="classmap-mainscroll"
      class="overflow-y-auto"
      max-height="425"
      color="teal lighten-3"
      dark
    >
    <div> 
        <compo-nent :is="ContentModal"></compo-nent>
       <v-row>
        <v-col
          v-for="n in ContentFrontModalList.length"
          :key="n"
          cols="4"
        >
          <Content-Modal></Content-Modal>
        </v-col>
      </v-row>
    </div>
    
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
    <!--강의실 등록-->
    <template>
        <!--강의실 등록 우측으로 이동-->
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
                            강의실 등록
                        </v-btn>  
                    </template>

                    <!--강의실 등록 팝업창-->
                    <v-card
                        class="overflow-hidden"
                        max-width="600"
                        color="light-blue lighten-1"
                        dark
                    >
                        <v-toolbar
                            flat
                            color="light-blue"
                        >
                        <v-toolbar-title class="front-weight-light">강의실 등록</v-toolbar-title>
                        <v-spacer></v-spacer>  
                        </v-toolbar>

                        <!--강의실 이름: ContentFrontMapName-->
                        
                        <v-text-field

                          v-model="ContentFrontMapName"
                            
                            :error-messages="ContentFrontMapName"
                            :counter="10"
                            label="강의실 이름"
                            required
                            @input="$v.ContentFrontMapName.$touch()"
                            @blur="$v.ContentFrontMapName.$touch()"
                            solo-inverted
                            color="white"
                        >
                        </v-text-field>
                        <!--강의실 유형 (type)-->
                        <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <v-select
                                    v-model="ContentFrontMapType"
                                    :items="ContentFrontMapTypeItem"
                                    label="강의실 유형"
                                    @input="$v.ContentFrontMapType.$touch()"
                                    @blur="$v.ContentFrontMapType.$touch()"
                                    solo-inverted
                                    color="white"
                                >    
                                </v-select> 
                            </v-col>
                                
                            <!--강의실 참여 인원-->
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                    v-model="ContentFrontNumValue"
                                    label="강의실 참여 인원"
                                    class="numer"
                                    :ContentFrontRules="[ContentFrontRules.required, ContentFrontRules.min, ContentFrontRules.max]"
                                    type="number"
                                    @click:append-outer="ContentFrontIncrement"
                                    @click:prepend="ContentFrontDecrement"
                                    
                                    color="white"
                                    required
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-card-actions >
                            <v-spacer></v-spacer>
                            <v-btn
                                color="light-blue lighten-5"
                                text
                                @click="ContentFrontDialog = false"
                            >
                                Close
                            </v-btn>
                            <v-btn
                                color="light-blue lighten-5"
                                text
                                @click=ContentFrontCreateClassModal();
                            >
                                Save
                            </v-btn>
                        </v-card-actions>  
                    </v-card>
                </v-dialog>
                <!--강의실 등록 입력이 스크롤창 위로 보이도록 조정-->
                <v-container style="height: 20px;"></v-container>

            </v-col>
        </div>



        


    </template>        
  </v-card>
</template>




<!------script-------->


<script>

import ContentModal from './ContentModal.vue'

  export default {

  components: { ContentModal },
    data: () => ({
      ContentFrontMapName: "",
      ContentFrontDialog: false,
      ContentFrontMapType: [],
      ContentFrontMapTypeItem: ['오픈형', '계단식', '소회의실'],  // 강의실 타입

     // 참여 인원수 체크 (참여 인원)   
      ContentFrontNumValue: 2,
      ContentFrontForm: {
        min: 2,
        max: 10
      },
      ContentFrontRules: {
        required: value => !!value || "Required.",
        min: v => v >= this.ContentFrontForm.min || `The Min is ${this.ContentFrontForm.min}`,
        max: v => v <= this.ContentFrontForm.max || `The Max is ${this.ContentFrontForm.max}`
      },

      ///

      ContentFrontModalList:[],

    }),
    ContentFrontMapType: "ContentFront",

  methods: {
    ContentFrontIncrement() {
      if (this.ContentFrontNumValue < this.ContentFrontForm.max) {
        this.ContentFrontNumValue = parseInt(this.ContentFrontNumValue, 10) + 1;
      }
    },
    ContentFrontDecrement() {
      if (this.ContentFrontNumValue > this.ContentFrontForm.min) {
        this.ContentFrontNumValue = parseInt(this.ContentFrontNumValue, 10) - 1;
      }
    },
    //
     
      ContentFrontCreateClassModal()
      {
        this.ContentFrontModalList.push({
                com : ContentModal
            })

        console.log("test" + "    " + this.v.ContentFrontMapType + "  " + this.v.ContentFrontMapName)
        console.log("aaaaaaaaa")
      },

      ContentFrontDeleteClassModal()
      {
        this.ContentFrontModalList.splice(this.ContentFrontModalList.length, 1)
      },
  }
  }
</script>