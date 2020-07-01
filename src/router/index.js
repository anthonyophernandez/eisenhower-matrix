import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: async (to, from, next) => {
      let currentUser = window.localStorage.getItem('currentUser')
      if (currentUser !== null && currentUser !== '{}') {
        currentUser = JSON.parse(currentUser)
        const user = await store.dispatch('user/login', currentUser)
        if (!user.error) {
          next(`/${currentUser.username}`)
        } else {
          store.dispatch('user/logout')
          next('/login')
        }
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import(/* webpackChunkName: "UserLogin" */ '../views/UserLogin.vue'),
    beforeEnter: async (to, from, next) => {
      let currentUser = window.localStorage.getItem('currentUser')
      if (currentUser !== null && currentUser !== '{}') {
        currentUser = JSON.parse(currentUser)
        const user = await store.dispatch('user/login', currentUser)
        if (!user.error) {
          next(`/${currentUser.username}`)
        } else {
          store.dispatch('user/logout')
          next()
        }
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: () => import(/* webpackChunkName: "UserRegister" */ '../views/UserRegister.vue'),
    beforeEnter: async (to, from, next) => {
      let currentUser = window.localStorage.getItem('currentUser')
      if (currentUser !== null && currentUser !== '{}') {
        currentUser = JSON.parse(currentUser)
        const user = await store.dispatch('user/login', currentUser)
        if (!user.error) {
          next(`/${currentUser.username}`)
        } else {
          store.dispatch('user/logout')
          next()
        }
      } else {
        next()
      }
    }
  },
  {
    path: '/:username',
    name: 'UserView',
    component: () => import(/* webpackChunkName: "UserView" */ '../views/UserView.vue'),
    beforeEnter: async (to, from, next) => {
      let currentUser = window.localStorage.getItem('currentUser')
      if (currentUser !== null && currentUser !== '{}') {
        currentUser = JSON.parse(currentUser)
        const user = await store.dispatch('user/login', currentUser)
        if (!user.error) {
          next()
        } else {
          store.dispatch('user/logout')
          next('/')
        }
      } else {
        next('/')
      }
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
