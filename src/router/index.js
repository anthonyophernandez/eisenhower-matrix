import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const currentUser = JSON.parse(window.localStorage.currentUser)
      if (currentUser.username) {
        next(`/${currentUser.username}`)
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import(/* webpackChunkName: "UserLogin" */ '../views/UserLogin.vue'),
    beforeEnter: (to, from, next) => {
      const currentUser = JSON.parse(window.localStorage.currentUser)
      if (currentUser.username) {
        next(`/${currentUser.username}`)
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: () => import(/* webpackChunkName: "UserRegister" */ '../views/UserRegister.vue'),
    beforeEnter: (to, from, next) => {
      const currentUser = JSON.parse(window.localStorage.currentUser)
      if (currentUser.username) {
        next(`/${currentUser.username}`)
      } else {
        next()
      }
    }
  },
  {
    path: '/:username',
    name: 'UserView',
    component: () => import(/* webpackChunkName: "UserView" */ '../views/UserView.vue'),
    beforeEnter: (to, from, next) => {
      const currentUser = JSON.parse(window.localStorage.currentUser)
      if (currentUser.username) {
        next()
      } else {
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
