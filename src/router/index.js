import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from '../utils/axios';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Public/Home.vue')
  },
  {

    path: '/Public',
    component: () => import('../views/ViewsPublic.vue'),
    children: [
      {
        path: '/Signup',
        name: 'Signup',
        component: () => import('../views/Public/Signup.vue')
      },
      {
        beforeEnter: async (to, from, next) => {
          try {
            await axios.get(process.env.VUE_APP_BASE_URL + '/users/auth/token');

            next('/Feed');
          } catch (error) {
            next();
          }
        },
        path: '/Login',
        name: 'Login',
        component: () => import('../views/Public/Login.vue')
      }
    ]
  },
  {
    beforeEnter: async (to, from, next) => {
      try {
        await axios.get(process.env.VUE_APP_BASE_URL + '/users/auth/token');
        next();
      } catch (error) {
        if (error.message == "Request failed with status code 401") {
          next('/Login')
        }
      }
    },
    path: '/Private',
    component: () => import('../views/ViewsPrivate.vue'),
    children: [
      {
        path: '/Feed',
        name: 'Feed',
        component: () => import('../views/Private/Feed.vue')
      },
      {
        path: '/Poem',
        name: 'Poem',
        component: () => import('../views/Private/PoemRegister.vue')
      },
      {
        path: '/Profile',
        name: 'Profile',
        component: () => import('../views/Private/Profile.vue')
      },
      {
        path: '/Help',
        name: 'Help',
        component: () => import('../views/Private/FAQ.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
