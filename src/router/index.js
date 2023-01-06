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
        path: '/QuestionList',
        name: 'QuestionList',
        component: () => import('../views/home/QuestionList.vue'),
      },
      {
        path: '/RankOI',
        name: 'RankOI',
        component: () => import('../views/home/RankOI.vue'),
      }]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
