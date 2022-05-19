<template>


<v-card-text>

  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="이름"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
     <v-text-field
      v-model="userid"
      :error-messages="idErros"
      :counter="10"
      label="아이디"
      required
      @input="$v.userid.$touch()"
      @blur="$v.userid.$touch()"
    ></v-text-field>
     <v-text-field
      v-model="userpass"
      :error-messages="passErros"
      :counter="10"
      label="비밀번호"
      required
      @input="$v.userpass.$touch()"
      @blur="$v.userpass.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="이메일"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="소속"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>


    <v-radio-group v-model="radioGroup">
       <v-radio
        label="강의자"
        value="teacher_radio"
      ></v-radio>
      <v-radio
        label="학생"
        value="student_radio"
      ></v-radio>
    </v-radio-group>

    <v-select
          v-model="select"          
          :items="items"
          item-text="item_text"
          item-value="item_value"
          label="소속"
          persistent-hint
          return-object
          single-line
        ></v-select>

    <v-btn
      class="submit_button"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn class="clear_button"
    @click="clear">
      clear
    </v-btn>
  </form>

</v-card-text>


</template>

<script>

export default {
    name: "SignUp",
  data() {
        return {

        items: [
          { item_text: '영업 1팀 ', item_value: 'FL' }, // 더미 데이터, 100~103줄은 백 붙이면 지우면 됨
          { item_text: '영업 2팀', item_value: 'FL' },
          { item_text: '메타버스 팀', item_value: 'FL' },
        ],
        
        }
    },
    methods: {
    }
}
</script>

