import Vue from 'vue'
import App from './App.vue'
import './assets/index.scss'
import VueIziToast from 'vue-izitoast';
import izitoastOptions from './util/iziToast'
import 'izitoast/dist/css/iziToast.min.css';
import router from './router/index'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.use(VueIziToast, izitoastOptions);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
