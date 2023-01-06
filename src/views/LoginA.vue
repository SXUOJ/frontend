 
<template>
    <div>
      <input type="text" v-model="loginForm.username" placeholder="用户名"/>
      <input type="text" v-model="loginForm.password" placeholder="密码"/>
      <button @click="login">登录</button>
    </div>
  </template>
   
  <script>
  import { mapMutations } from 'vuex';
  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        userToken: ''
      };
    },
   
    methods: {
      // 调用store 存储
      ...mapMutations(['changeLogin']),
      login () {
        this.$router.push('/FrontPage')
        let _this = this;
        if (this.loginForm.username === '' || this.loginForm.password === '') {
          alert('账号或密码不能为空');
        } else {
          // 发起登入请求
          this.$axios({
            method: 'post',
            url: '/api/user/login',
            data:{"username":_this.loginForm.username,"password":_this.loginForm.password},
          }).then(res => {
            console.log('123456');
            console.log(res);
            _this.userToken = res.token;
            // 将用户token保存到vuex中
            _this.changeLogin({ token: _this.userToken });
            // 用户登入成功,自动跳转至系统首页
            _this.$router.push('/FrontPage');
            alert('登陆成功');
          }).catch(error => {
            alert('账号或密码错误');
            console.log(error);
          });
        }
      }
    }
  };
  </script>
   