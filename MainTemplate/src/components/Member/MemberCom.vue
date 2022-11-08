<template>
<v-container fluid>
  <v-card color="cyan lighten-2">
    <!--card-title : 회원 관리-->
    <v-card-title>
      <h2>회원관리</h2>
      <!--search 부분을 우측으로 밀기-->
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        hide-details
        class="mx-4"
        flat
        solo-inverted
        dark
      ></v-text-field>
    </v-card-title>
    <!--MemberName가 header-->
    <v-data-table
      :headers="headers"
      :items="MemberName" 
      sort-by="MemberManager"
      class="elevation-1"
      :search="search"
      hide-default-footer
      :page.sync="page" 
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
    >
    <!--MemberComDialog 시작-->
      <template v-slot:top>
      <v-dialog
        v-model="MemberComDialog"
        max-width="500px"
      > 
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>
          <!--
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.id"
                    label="ID"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.email"
                    label="Email"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.group"
                    label="Group"
                  ></v-text-field>
                </v-col>
                
              </v-row>
            </v-container>
          </v-card-text>-->
          <!--펜 클릭시 나타나는 화면 editname
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              취소
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              수정 확인
            </v-btn>
          </v-card-actions>-->
        </v-card>
      </v-dialog>
      <!--휴지통 클릭시 나타나는 화면
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">회원 정보를 삭제하시겠습니까?</v-card-title> 
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">취소</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">삭제</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>-->
      <!--휴지통 클릭시 나타나는 화면 끝!-->
      </template>
      <!--MemberComDialog 끝-->
      <template v-slot:[`item.actions`]="{ item }">
      <!--펜 아이콘 생성
      <v-btn
        class="mx-1"
        fab
        dark
        samll
        color="green lighten-1"
        @click="editItem(item)"
        >
        <v-icon>mdi-pencil</v-icon>
        </v-btn>-->
      <!--휴지통 아이콘 생성-->
      <v-btn
        class="mx-1"
        fab
        dark
        x-small
        color="red lighten-1"
        @click="deleteItem(item)"
        >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      </template>
    </v-data-table>
  </v-card>
  <!--페이지--> <!--:length="pageCount" -->
  <template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="100" 
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
  </template>
<!--페이지 끝-->
</v-container>
</template>

<!--script-->
<script>
// 유리추가 : main.js 안에 있는 코드
import { EventBus } from '@/main.js';
import { mapState } from 'vuex';
var RestAPIManager = require("../RestAPIManager");
var SignEnum = require("../Enum/SignEnum");
var UserModes = SignEnum.UserModes;

export default {
  data: () => ({
    search: '', // 회원관리 Search

    page: 1, // page
    pageCount: 0, // pageCount
    itemsPerPage: 10, // itemsPerPage

    MemberComDialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '이름', // Member Name
        align: 'start',
        filterable: true, // 모든 항목에 오름차순, 내림차순
        //sortable: false,
        value: 'name',
      },
      { text: 'ID', value: 'id' }, // 아이디
      { text: 'Email', value: 'email' }, // 이메일
      { text: 'Phone', value: 'phone' }, // 핸드폰 번호
      { text: '부서', value: 'group' }, // grop
      { text: '정보삭제', value: 'actions', sortable: false },
    ],
    MemberName: [ ], // MemberName
    /*editedIndex: -1,
    editedItem: {
      name: ' ',
      id: ' ',
      email: ' ',
      group: ' ',
    },
    defaultItem: {
      name: ' ',
      id: ' ',
      email: ' ',
      group: ' ',
    },
    */
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '새로운 이름' : '이름 수정'
    },
    // 유리추가
    ...mapState(['allUsers'])
  },

  // 유리추가
  mounted() {
    EventBus.$on('signUp', users => {
      this.$store.state.allUsers.push(users)
    })
  },

  watch: {
    MemberComDialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    //this.initialize(),
    this.memberlist()
  },

  methods: {
    /**initialize () {
      this.MemberName = [
        {
          name: ' ',
          id: ' ',
          email: ' ',
          group: '' 
        },
      ]
    },**/

    /**editItem (item) {
      this.editedIndex = this.MemberName.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.MemberComDialog = true
    },**/

    /**deleteItem (item) {
      this.editedIndex = this.MemberName.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },**/

    /**deleteItemConfirm () {
      this.MemberName.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.MemberComDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.MemberName[this.editedIndex], this.editedItem)
      } else {
        this.MemberName.push(this.editedItem)
      }
      this.close()
    },**/

    isNotEmpty() {
    return this.items && this.items.length > 0;
    },

    // 회원정보 리스트 받기
    // 로그인의 정보를 받아야한다
    // 가져올 데이터는 회원정보의 이름, 아이디, 이메일, 부서
    // 회원 정보 조회 API : 2. Get - http://IPAddress/api/users/get/allstudent
    async memberlist(){
      var allStudent = await RestAPIManager.API_allstudent();
      this.MemberName = allStudent.studentList;
    },

    // 휴지통 클릭시 삭제
    // 회원 정보 삭제 API : 3. Patch - http://IPAddress/api/users/patch/deleteuser
    async deleteItem(item) {
      var prompStr = prompt(
        '회원정보가 삭제되며 복구할 수 없습니다.\n삭제를 원하면 "삭제"를 입력해주세요.'
      );
      if (prompStr == null) {
        return;
      }
      if (prompStr == "삭제") {
        var userId = this.$store.getters.getUserInfo.id;
        var itemInfo = Object.assign({}, item);
        var deleteUser = await RestAPIManager.API_deleteuser(userId, itemInfo.id, UserModes.STUDENT);
        if (deleteUser.success === true){
          alert("회원정보가 성공적으로 삭제되었습니다.");
          this.$parent.$parent.$parent.$parent.deleteItem(item);
        } else {
          alert(deleteUser.message);
        }
          console.log("delete item");
      } else {
        alert("정확하게 입력해주세요.");
        return;
      }
    }
  },
}
</script>