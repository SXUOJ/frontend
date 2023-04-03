 
<template>
    <!-- <div>
      <input type="text" v-model="loginForm.username" placeholder="用户名"/>
      <input type="text" v-model="loginForm.password" placeholder="密码"/>
      <button @click="login">登录</button>
    </div> -->
    <div class="outer">
      <div class="container right-panel-active">
        <!-- Sign Up -->
        <div class="container__form container--signup">
          <form action="#" class="form" id="form1" @submit="submit1">
            <h2 class="form__title">Sign Up</h2>
            <input type="text" placeholder="truename" class="input" autocomplete="off" v-model="registerForm.truename"/>
            <input type="email" placeholder="Email" class="input" autocomplete="off" v-model="registerForm.Email"/>
            <input type="text" placeholder="username" class="input" autocomplete="off" v-model="registerForm.username"/>
            <input type="password" placeholder="Password" class="input" autocomplete="off" v-model="registerForm.password"/>
            <button class="btn" @click="register">Sign Up</button>
          </form>
        </div>

        <!-- Sign In -->
        <div class="container__form container--signin">
          <form action="#" class="form" id="form2" @submit="submit2">
            <h2 class="form__title">Sign In</h2>
            <!-- <input type="email" placeholder="Email" class="input" /> -->
            <input
              type="text"
              placeholder="username"
              class="input"
              v-model="loginForm.username"
              autocomplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              class="input"
              v-model="loginForm.password"
              autocomplete="off"
            />
            <a href="#" class="link" @click="miss">Forgot your password?</a>
            <button class="btn" @click="login">Sign In</button>
          </form>
        </div>

        <!-- Overlay -->
        <div class="container__overlay">
          <div class="overlay">
            <div class="overlay__panel overlay--right">
              <button class="btn" id="signIn" @click="click1">Sign In</button>
            </div>
            <div class="overlay__panel overlay--left">
              <button class="btn" id="signUp" @click="click2">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
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
        registerForm: {
          username: '',
          password: '',
          truename:'',
          Email:''

        },
        userToken: ''
      };
    },
   
    methods: {
      // 调用store 存储
      ...mapMutations(['changeLogin']),
      login () {
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
            console.log(res);
            if (res.data.code === 404) {
              alert('账号或密码错误');
            }
            else{
               _this.userToken = res.data.token;
              // 将用户token保存到vuex中
              _this.changeLogin({ token: _this.userToken });
              // 用户登入成功,自动跳转至系统首页
              _this.$router.push('/FrontPage');
              alert('登陆成功');
            }
           
          }).catch(error => {
            alert('账号或密码错误');
            console.log(error);
          });
        }
      },
      register () {
        let _this = this;
        if (this.registerForm.username === '' || this.registerForm.password === '' || this.registerForm.Email === '' || this.registerForm.truename === '') {
          alert('请在全部填写后注册');
        } else {
          // 发起登入请求
          this.$axios({
            method: 'post',
            url: '/api/user/register',
            data:{"username":_this.registerForm.username,"password":_this.registerForm.password,"usergroup":'0',"truename":_this.registerForm.truename,"email":_this.registerForm.Email,"school":'山西大学'},
          }).then(res => {
            console.log(res);
            if (res.data.code==404) {
              alert('此账号已存在');
            }
            else{
              alert('注册成功');
              const container = document.querySelector(".container");
              container.classList.add("right-panel-active");
            }
          }).catch(error => {
            alert('注册失败，请检查网络');
            console.log(error);
          });
        }
      },
      miss(){
        alert('开发中');
      },
      click1 () {
        const container = document.querySelector(".container");
        container.classList.add("right-panel-active");
      },
      click2 () {
        const container = document.querySelector(".container");
        container.classList.remove("right-panel-active");
      },
      submit1 (e) {
        e.preventDefault();
      },
      submit2 (e) {
        e.preventDefault();
      }
    }
  };
  </script>
  
<style>
:root {
    /* COLORS */
    --white: #e9e9e9;
    --gray: #333;
    --blue: #0367a6;
    --lightblue: #008997;

    /* RADII */
    --button-radius: 0.7rem;

    /* SIZES */
    --max-width: 758px;
    --max-height: 420px;

    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .outer{
    align-items: center;
    background-color: #e9e9e9;
    background: url(../img/planform.jpg);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    height: 100vh;
    place-items: center;
    overflow: hidden;
  }
 
  .form__title {
    font-weight: 300;
    margin: 0;
    margin-bottom: 1.25rem;
  }

  .link {
    color: var(--gray);
    font-size: 0.9rem;
    margin: 1.5rem 0;
    text-decoration: none;
  }

  .container {
    background-color: var(--white);
    border-radius: var(--button-radius);
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
      0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: var(--max-height);
    max-width: var(--max-width);
    width: var(--max-width);
    overflow: hidden;
    position: relative;
  }

  .container__form {
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.6s ease-in-out;
  }

  .container--signup {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .container--signup {
    transform: translateX(100%);
  }

  .container--signin {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
  }

  .container.right-panel-active .container--signin {
    animation: show 0.6s;
    opacity: 1;
    transform: translateX(100%);
    z-index: 5;
  }

  .container__overlay {
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
  }

  .container.right-panel-active .container__overlay {
    transform: translateX(-100%);
  }

  .overlay {
    background-color: var(--lightblue);
    background: url(../img/planform.jpg);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    left: -100%;
    position: relative;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 200%;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay__panel {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 50%;
  }

  .overlay--left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay--left {
    transform: translateX(0);
  }

  .overlay--right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay--right {
    transform: translateX(20%);
  }

  .btn {
    background-color: var(--blue);
    background-image: linear-gradient(
      90deg,
      var(--blue) 0%,
      var(--lightblue) 74%
    );
    border-radius: 20px;
    border: 1px solid var(--blue);
    color: var(--white);
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 0.9rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  .form > .btn {
    margin-top: 1.5rem;
  }

  .btn:active {
    transform: scale(0.95);
  }

  .btn:focus {
    outline: none;
  }

  .form {
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 3rem;
    height: 100%;
    text-align: center;
  }

  .input {
    background-color: #fff;
    border: none;
    padding: 0.9rem 0.9rem;
    margin: 0.5rem 0;
    width: 100%;
  }

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }
</style>