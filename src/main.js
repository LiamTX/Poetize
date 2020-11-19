import Vue from 'vue'
import 'boxicons/css/boxicons.min.css'
import './assets/index.scss'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.use(Vuesax, {
  colors: {
    primary: '#fff',
    danger: '#8B0000',
    success: '#228B22'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
