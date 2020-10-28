import Vue from 'vue'
import Vuex from 'vuex'

import VuexSignup from './modules/VuexSignup'
import VuexLogin from './modules/VuexLogin'
import VuexFeed from './modules/VuexFeed'
import VuexPoem from './modules/VuexPoem'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {
  },
  modules: {
    VuexSignup,
    VuexLogin,
    VuexFeed,
    VuexPoem
  }
})
