/*const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ],
})*/

module.exports = {
    devServer: {
        proxy: { // proxyTable 설정
            '/api': {
                target: 'https://163.180.117.47:8088', // 오픈 api 주소
                // target: 'http://localhost:8088/',
                changeOrigin: true, // api로 호출시 target으로 변경할 것이다
            },
        },
    },
};