import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  
  routes: [
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
          path: '/Login',
          name: 'Login',
          component: () => import('../views/Public/Login.vue')
        },
        {
          path: '/Signup',
          name: 'Signup',
          component: () => import('../views/Public/Signup.vue')
        }
      ]
    },
    {
      beforeEnter: (to, from, next) => {
        if(localStorage.token == undefined){
         
          router.push('/Login');
          return;
        };  
        next();
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
          component: () => import('../views/Private/Poem.vue')
        },
        {
          path: '/Profile',
          name: 'Profile',
          component: () => import('../views/Private/Profile.vue')
        }
      ]
    }
  ]
})

export default router
