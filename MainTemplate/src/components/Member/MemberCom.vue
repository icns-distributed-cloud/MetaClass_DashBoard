<template>
<div>
  <v-card color="blue lighten-5">
    <!--card-title : 회원 관리-->
    <v-card-title>
      회원관리
      <!--search 부분을 우측으로 밀기-->
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.phonenumber"
                      label="Phone Number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <!--펜 클릭시 나타나는 화면 editname-->
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
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--휴지통 클릭시 나타나는 화면-->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">회원 정보를 삭제하시겠습니까?</v-card-title> 
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">취소</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">확인</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--휴지통 클릭시 나타나는 화면 끝!-->
      
    </template>
     <!--MemberComDialog 끝-->

    <!--펜 아이콘 생성-->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        elevation="4"
        fab
        class="teal mr-2"
        small
        dark
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
     <!--휴지통 아이콘 생성-->
      <v-icon
        elevation="4"
        fab
        class="cyan"
        small
        @click="deleteItem(item)"
      >
        mdi-trash-can-outline
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </v-card>

<!--페이지 이동-->
  <div class="text-center pt-2">
    <v-pagination
      v-model="page"
      :length="pageCount"
    ></v-pagination>
    
    <!--페이지 설정-->  
      <v-text-field
        :value="itemsPerPage"
        label="Items per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
   


  </div>
</template>



<!--script-->

<script>
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
          text: 'Member Name',
          align: 'start',
          filterable: true, // 모든 항목에 오름차순, 내림차순
          //sortable: false,
          value: 'name',
        },
        { text: 'ID', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Group', value: 'group' },
        { text: 'Phone Number', value: 'phonenumber' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      MemberName: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        id: 0,
        email: 0,
        group: 0,
        phonenumber: 0,
      },
      defaultItem: {
        name: '',
        id: 0,
        email: 0,
        group: 0,
        phonenumber: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Name' : 'Edit Name'
      },
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
      this.initialize()
    },

    methods: {
      initialize () {
        this.MemberName = [
          {
            name: '서유리',
            id: 'yuri',
            email: 'yuri95@khu.ac.kr',
            group: 'A',
            phonenumber: '010-1253-5000',
          },
          {
            name: '손덕인',
            id: 'Jen',
            email: 'thsejrdls@naver.com',
            group: 'B',
            phonenumber: '010-5000-1234',
          },
          {
            name: '노설',
            id: 'seol',
            email: 'seol12@khu.ac.kr',
            group: 'A',
            phonenumber: '010-5555-2222',
          },
          {
            name: '이하이',
            id: 'hi',
            email: 'hi@khu.ac.kr',
            group: 'B',
            phonenumber: '010-6978-5656',
          },
          {
            name: '김경희',
            id: 'hee',
            email: 'hee@khu.ac.kr',
            group: 'B',
            phonenumber: '010-1231-4569',
          },
          {
            name: '김민석',
            id: 'min',
            email: 'min@khu.ac.kr',
            group: 'C',
            phonenumber: '010-1865-4457',
          },
         
        ]
      },

      editItem (item) {
        this.editedIndex = this.MemberName.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.MemberComDialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.MemberName.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
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
      },

      isNotEmpty() {
    return this.items && this.items.length > 0;
  },
    },
  }
</script>