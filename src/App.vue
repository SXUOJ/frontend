<template>
  <div id="app">
    <Login/>
  </div>
</template>

<script>
import Login from './views/LoginL.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<!-- import md5 from "md5";//在使用的页面引入加密插件

let passWord="jiaomaster";//设置加密字符串
md5(passWord); -->

