import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'; // 2.1引入结构
import 'element-ui/lib/theme-chalk/index.css'; // 2.2引入样式
import router from '@/router/index.js'
import VueRouter from 'vue-router'
import store from './store';
import axios from 'axios'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import { Boot } from '@wangeditor/editor'
import formulaModule from '@wangeditor/plugin-formula'

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(formulaModule)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(VueCodeMirror)

axios.defaults.baseURL='http://oj.niuwx.cn'
Vue.prototype.$axios = axios



// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization  = 'Bearer ' + localStorage.getItem('token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
 
// 添加响应拦截器，移除token
// axios.interceptors.response.use(
//   response =>{
//     return response;
//   },
//   error=>{
//     if(error.response){
//       switch(error.response.status){
//         case 500:
//           localStorage.removeItem('token');
//           this.$router.push('/login');
//       }
//     }
//   })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
