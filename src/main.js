import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/tailwind.css'

import setupMirage from './mirage/server-setup'

setupMirage()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
