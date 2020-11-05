import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
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
        path: '/Login',
        name: 'Login',
        component: () => import('../views/Public/Login.vue')
      }
    ]
  },
  {
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
