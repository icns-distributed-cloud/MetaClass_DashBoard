import Vue from "vue";
import VueRouter from "vue-router";
import CalendarPage from "../components/Calendar/CalendarPage.vue";
import LoginHome from "../components/Login/LoginHome.vue";
import Signup from "../components/Login/SignUp.vue"
import StudentPage from "../components/Student/StudentPage.vue";
import MemberPage from "../components/Member/MemberPage.vue";
import ClassMapPage from "../components/ClassMap/ClassMapPage.vue";
import ContentPgae from "../components/Content/ContentPage.vue";
import TestPage from "../components/TestComponent.vue";
// 학생 홈페이지
import StudentCalendarPage from "../components/StudentFolder/StudentCalendar/StudentCalendarPage.vue";
import StudentEvaluationPage from "../components/StudentFolder/StudentEvaluation/StudentEvaluationPage.vue";
import StudentInformationPage from "../components/StudentFolder/StudentInformation/StudentInformationPage.vue";


Vue.use(VueRouter);
const routes = [

    {
        path: "/",
        name: LoginHome,
        component: LoginHome
    },
    {
        path: "/Signup",
        name: Signup,
        component: Signup
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
    },
    {
        path: "/Test",
        name: TestPage,
        component: TestPage
    },
    {
        path: "/StudentCalendar",
        name: StudentCalendarPage,
        component: StudentCalendarPage
    },
    {
        path: "/StudentEvaluation",
        name: StudentEvaluationPage,
        component: StudentEvaluationPage
    },
    {
        path: "/StudentInformation",
        name: StudentInformationPage,
        component: StudentInformationPage
    },


];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;