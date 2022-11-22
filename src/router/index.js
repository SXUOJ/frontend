import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginL.vue'),
  },
  {
    path: '/logon',
    name: 'logon',
    component: () => import('../views/LogonL.vue'),
    }
]

const router = new VueRouter({
  routes
})

export default router
