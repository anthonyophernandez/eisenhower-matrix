import Vue from 'vue'
import Vuex from 'vuex'

import userModule from './user'
import matrixModule from './matrix'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: userModule,
    matrix: matrixModule
  }
})
