import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'

// vuetify-dialog
// data tables 항목에 crud actions를 하기 위해서 
// 설치 필요 : npm install vuetify-dialog
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'



// Vue chart
import "chart.js";
//import "hchs-vue-charts";
//Vue.use(window.VueCharts);
//
//
Vue.use(VuetifyDialog), {
        context: {
            vuetify
        }
    },

    'vue/valid-v-slot' ['error', {
        allowModifiers: true,
    }],


    Vue.config.productionTip = false

new Vue({
    vuetify,
    router: router,
    render: h => h(App)
}).$mount('#app')