import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const resourceHost = "http://163.180.117.22:8088"

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ],
    state: {
        id: null
    },
    getters: {
        isLogin(state){
            return state.id == null ? false: true;
        },
        getUserInfo(state) {
            return {
                id: state.id
            }
        }
    },
    mutations: {
        LOGIN(state, {id}) {
            state.id = id;

            localStorage.id = id;
        },
        LOGOUT(state) {
            state.id = null;

            localStorage.clear();
        }
    },
    actions: {
        LOGIN({commit}, {id, password, userMode}) {

            return axios
                .post(
                    `${resourceHost}/api/users/post/login`,
                    {
                        loginId: id,
                        password: password,
                        userMode: userMode
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then(res => {
                    var parsedData = res.data.data;
                    console.log(parsedData);

                    commit("LOGIN", {
                        id: parsedData.id
                        
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
})