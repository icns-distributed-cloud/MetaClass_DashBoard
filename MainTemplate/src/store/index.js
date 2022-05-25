import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const resourceHost = "http://163.180.117.47:8088"

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ],
    state: {
        id: null,
        name: null,
        userMode: null
    },
    getters: {
        isLogin(state){
            return state.id == null ? false: true;
        },
        getUserInfo(state) {
            return {
                id: state.id,
                name: state.name,
                userMode: state.userMode
            }
        }
    },
    mutations: {
        LOGIN(state, {id, name, userMode}) {
            state.id = id;
            state.name = name;
            state.userMode = userMode;

            localStorage.id = id;
            localStorage.name = name;
            localStorage.userMode = userMode;
        },
        LOGOUT(state) {
            state.id = null;
            state.name = null;
            state.userMode = null;

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
                        id: parsedData.id,
                        name: parsedData.name,
                        userMode: userMode
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        },
        LOGOUT({commit}) {
            commit("LOGOUT");
        }
    }
})