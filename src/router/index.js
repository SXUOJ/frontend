import VueRouter from 'vue-router'

const routes = [
  {
      path: '/',
      redirect: '/login'
  },
  {
    path:'/login',
    name:'login',
    component:()=> import('../views/LoginA.vue')
  },

  {
    path:'/page',
    name:'page',
    component:()=> import('../views/RouterJump.vue'),
    children:
      [{
        path: '/FrontPage',
        name: 'FrontPage',
        component: () => import('../views/home/FrontPage.vue')
      },
      {
        path: '/HomeForum',
        name: 'HomeForum',
        component: () => import('../views/home/HomeForum.vue')
      },
      {
        path: '/HomePage',
        name: 'HomePage',
        component: () => import('../views/home/HomePage.vue'),
      },
      {
        path: '/QuestionBank',
        name: 'QuestionBank',
        component: () => import('../views/home/QuestionBank.vue'),
      },
      {
        path: '/SubmitResult/:submit_id',
        name: 'SubmitResult',
        component: () => import('../views/home/SubmitResult.vue'),
      },
      {
        path: '/RankOI',
        name: 'RankOI',
        component: () => import('../views/home/RankOI.vue'),
      },
      {
        path: '/AddQuestion',
        name: 'AddQuestion',
        component: () => import('../views/home/AddQuestion.vue'),
      },
      {
        path: '/QuestionPage/:question_id',
        name: 'QuestionPage',
        component: () => import('../views/home/QuestionPage.vue'),
      },
      {
        path: '/QuestionPage/MySubmission/:question_id',
        name: 'MySubmission',
        component: () => import('../views/home/MySubmission.vue'),
      }]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
