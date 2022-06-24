import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import 'vuetify/dist/vuetify.min.css'

// vuetify-dialog
// data tables 항목에 crud actions를 하기 위해서 
// 설치 필요 : npm install vuetify-dialog
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
import axios from "axios";

import store from "./store";


// Vue chart
import "chart.js";
//import "hchs-vue-charts";
//Vue.use(window.VueCharts);
//
//
Vue.use(store);
Vue.use(VuetifyDialog), {
        context: {
            vuetify
        }
    },

    'vue/valid-v-slot' ['error', {
        allowModifiers: true,
    }],



    Vue.config.productionTip = false
Vue.prototype.$http = axios;

// 유리추가 : 회원관리(MemberCom)에 넣을 정보
export const EventBus = new Vue()

new Vue({
    vuetify,
    router: router,
    store,
    render: h => h(App)
}).$mount('#app')