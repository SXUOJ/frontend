import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'; // 2.1引入结构
import 'element-ui/lib/theme-chalk/index.css'; // 2.2引入样式

Vue.config.productionTip = false
Vue.use(ElementUI);

import axios from 'axios'
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
