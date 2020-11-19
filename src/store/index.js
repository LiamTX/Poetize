import Vue from 'vue'
import Vuex from 'vuex'

import VuexSignup from './modules/VuexSignup'
import VuexLogin from './modules/VuexLogin'
import VuexFeed from './modules/VuexFeed'
import VuexPoem from './modules/VuexPoem'
import VuexProfile from './modules/VuexProfile'
import VuexFAQ from './modules/VuexFAQ'

import axios from '../utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiLoading: false
    // user: ''
  },
  mutations: {
    // setUser(state, data){
    //   state.user = data
    // }

    setApiLoading(state, data){
      state.apiLoading = data;
    }
  },
  actions: {
    // async getThisUser(context){
    //   const user = await axios.get(process.env.VUE_APP_BASE_URL+'/users/this');

    //   await context.commit('setUser', user.data);
    // }

    async uploadAvatar(context, data) {
      const response = await axios.post(process.env.VUE_APP_BASE_URL + '/users/upload_avatar', data);

      return response;
    }
  },
  modules: {
    VuexSignup,
    VuexLogin,
    VuexFeed,
    VuexPoem,
    VuexProfile,
    VuexFAQ
  }
})
