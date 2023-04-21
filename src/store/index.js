import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    // 用户组 判断权限
    usergroup: localStorage.getItem('usergroup') ? localStorage.getItem('usergroup') : ''
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.token = user.token;
      localStorage.setItem('token', user.token);
    },
    changeUserGroup (state, user) {
      state.usergroup = user.usergroup;
      localStorage.setItem('usergroup', user.usergroup);
    }
  }
});
 
export default store;