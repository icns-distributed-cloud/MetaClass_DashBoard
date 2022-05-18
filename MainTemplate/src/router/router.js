import Vue from "vue";
import VueRouter from "vue-router";
import CalendarPage from "../components/Calendar/CalendarPage.vue";
import LoginHome from "../components/Login/LoginHome.vue";
import StudentPage from "../components/Student/StudentPage.vue";
import MemberPage from "../components/Member/MemberPage.vue";
import ClassMapPage from "../components/ClassMap/ClassMapPage.vue";
import ContentPgae from "../components/Content/ContentPage.vue";

Vue.use(VueRouter);
const routes = [

    {
        path: "/",
        name: LoginHome,
        component: LoginHome
    },
    {
        path: "/CalendarPage",
        name: CalendarPage,
        component: CalendarPage,
    },
    {
        path: "/StudentPage",
        name: StudentPage,
        component: StudentPage
    },
    {
        path: "/MemberPage",
        name: MemberPage,
        component: MemberPage
    },
    {
        path: "/ClassMapPage",
        name: ClassMapPage,
        component: ClassMapPage,
    },
    {
        path: "/ContentPage",
        name: ContentPgae,
        component: ContentPgae
    }


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;