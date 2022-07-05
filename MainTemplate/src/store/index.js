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
        id: null,
        name: null,
        userMode: null,
        loginId: null,
        email: null,
        departmentName: null,
        phone: null
    },
    getters: {
        isLogin(state){
            return state.id == null ? false: true;
        },
        getUserInfo(state) {
            return {
                id: state.id,
                name: state.name,
                userMode: state.userMode,
                loginId: state.loginId,
                email: state.email,
                departmentName: state.departmentName,
                phone: state.phone
            }
        }
    },
    mutations: {
        LOGIN(state, {id, name, userMode, loginId, email, departmentName, phone}) {
            state.id = id;
            state.name = name;
            state.userMode = userMode;
            state.loginId = loginId;
            state.email = email;
            state.departmentName = departmentName;
            state.phone = phone;

            localStorage.id = id;
            localStorage.name = name;
            localStorage.userMode = userMode;
            localStorage.loginId = loginId;
            localStorage.email = email;
            localStorage.departmentName = departmentName;
            localStorage.phone = phone;
        },
        LOGOUT(state) {
            state.id = null;
            state.name = null;
            state.userMode = null;
            state.loginId = null;
            state.email = null;
            state.departmentName = null;
            state.phone = null;

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
                    if (res.data.success === true) {
                        var parsedData = res.data.data;
                        console.log(parsedData);

                        commit("LOGIN", {
                            id: parsedData.id,
                            name: parsedData.name,
                            userMode: userMode,
                            loginId: parsedData.loginId,
                            email: parsedData.email,
                            departmentName: parsedData.departmentName,
                            phone: parsedData.phone
                        })
                        return "success";
                    } else {
                        return "fail";
                    }
                    
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