import Vue from "vue";
import VueRouter from "vue-router";
import CalendarPage from "../components/Calendar/CalendarPage.vue";
import LoginHome from "../components/Login/LoginHome.vue";
import Signup from "../components/Login/SignUp.vue"
import StudentPage from "../components/Student/StudentPage.vue";
import MemberPage from "../components/Member/MemberPage.vue";
import ClassMapPage from "../components/ClassMap/ClassMapPage.vue";
import ContentPgae from "../components/Content/ContentPage.vue";
import QuizPage from "../components/Quiz/QuizPage.vue";
import DepartmentPage from "../components/Department/DepartmentPage.vue"
import DashboardLayout from "../components/Layout/DashboardLayout.vue";
// 추가 : ServerPage
import ServerPage from "../components/ServerRegister/ServerPage.vue";
import ServerManagePage from "../components/ServerManage/ServerManagePage.vue";
// 학생 홈페이지
import StudentCalendarPage from "../components/StudentFolder/StudentCalendar/StudentCalendarPage.vue";
import StudentEvaluationPage from "../components/StudentFolder/StudentEvaluation/StudentEvaluationPage.vue";
import StudentInformationPage from "../components/StudentFolder/StudentInformation/StudentInformationPage.vue";
import store from "@/store";


const teacherAuth = () => (from, to, next) => {
    if (
        store.getters.getUserInfo.userMode != null
    ) {
        if (store.getters.getUserInfo.userMode === 0) {
            return next();
        } else {
            console.log("Unauthorized. (Only teachers are authorized)");
            alert("선생님용 메뉴입니다.");
            next("/");
        }
    } else {
        console.log("Unauthorized.");
        alert("로그인이 필요한 서비스입니다.");
        next("/");
    }
}

const studentAuth = () => (from, to, next) => {
    if (
        store.getters.getUserInfo.userMode != null
    ) {
        if (store.getters.getUserInfo.userMode === 1) {
            return next();
        } else {
            console.log("Unauthorized. (Only students are authorized)");
            alert("학생용 메뉴입니다.");
            next("/");
        }
    } else {
        console.log("Unauthorized.");
        alert("로그인이 필요한 서비스입니다.");
        next("/");
    }
}

const serverManagerAuth = () => (from, to, next) => {
    if (
        store.getters.getUserInfo.userMode != null
    ) {
        if (store.getters.getUserInfo.userMode === 2) {
            return next();
        } else {
            console.log("Unauthorized. (Only server managers are authorized)");
            alert("서버 관리자용 메뉴입니다.");
            next("/");
        }
    } else {
        console.log("Unauthorized.");
        alert("로그인이 필요한 서비스입니다.");
        next("/");
    }
}




Vue.use(VueRouter);
const routes = [
    /* 사이드바가 없는 route들 */
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
    /* 사이드바가 있는 route들 */
    {
        path: "/aaa",
        component: DashboardLayout,
        redirect: "/home",
        children: [{
                path: "/CalendarPage",
                name: CalendarPage,
                component: CalendarPage,
                beforeEnter: teacherAuth()
            },
            {
                path: "/StudentPage",
                name: StudentPage,
                component: StudentPage,
                beforeEnter: teacherAuth()
            },
            {
                path: "/MemberPage",
                name: MemberPage,
                component: MemberPage,
                beforeEnter: teacherAuth()
            },
            {
                path: "/ClassMapPage",
                name: ClassMapPage,
                component: ClassMapPage,
                beforeEnter: teacherAuth()
            },
            {
                path: "/ContentPage",
                name: ContentPgae,
                component: ContentPgae,
                beforeEnter: teacherAuth()
            },
            {
                path: "/Department",
                name: DepartmentPage,
                component: DepartmentPage,
                beforeEnter: teacherAuth()
            },
            {
                path: "/StudentCalendar",
                name: StudentCalendarPage,
                component: StudentCalendarPage,
                beforeEnter: studentAuth()
            },
            {
                path: "/StudentEvaluation",
                name: StudentEvaluationPage,
                component: StudentEvaluationPage,
                beforeEnter: studentAuth()
            },
            {
                path: "/StudentInformation",
                name: StudentInformationPage,
                component: StudentInformationPage,
                beforeEnter: studentAuth()
            },
            {
                path: "/ServerRegister",
                name: ServerPage,
                component: ServerPage,
                beforeEnter: serverManagerAuth()
            },
            {
                path: "/ServerManage",
                name: serverManagerAuth,
                component: ServerManagePage,
                beforeEnter: serverManagerAuth()
            },
            {
                path: "/QuizPage",
                name: QuizPage,
                component: QuizPage,
                beforeEnter: teacherAuth()
            }
        ]
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;