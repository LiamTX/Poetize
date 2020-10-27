import Vue from 'vue'
import 'boxicons/css/boxicons.min.css'
import './assets/index.scss'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'shards-ui/dist/css/shards.css'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Card } from 'shards-vue/src/components'
Vue.use(Button)
Vue.use(Card)


Vue.use(Vuesax, {
  colors: {
    primary: '#2e8b9e'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
