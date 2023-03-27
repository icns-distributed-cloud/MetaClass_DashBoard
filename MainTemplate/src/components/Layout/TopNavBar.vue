<template>
<v-toolbar 
    style="background-color: #f8f9fc"
>
    <v-spacer></v-spacer>
    <v-btn
    @click=signout()
    >로그아웃</v-btn>
</v-toolbar>    
<!--
<v-app-bar color="blue lighten-1" dark app clipped-left>
    <v-toolbar-title>Project</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn elevation="2" @click=signout()>로그아웃</v-btn>
</v-app-bar>
-->
</template>

<script>
export default {
    methods: {
        signout() {
            this.$store
                .dispatch("LOGOUT")
                .then(() => this.redirect())
                .catch(() => this.redirect())
        },
        redirect() {
            alert("로그아웃 되었습니다.");
            this.$router.push("/");
        }
    }   
}
</script>