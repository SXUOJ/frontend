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


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(VueCodeMirror)

axios.defaults.baseURL='http://127.0.0.1:4523'
Vue.prototype.$axios = axios



// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
 
// 添加响应拦截器，移除token
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error=>{
    if(error.response){
      switch(error.response.status){
        case 500:
          localStorage.removeItem('token');
          this.$router.push('/login');
      }
    }
  })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
