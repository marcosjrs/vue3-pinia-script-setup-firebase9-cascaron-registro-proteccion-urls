import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/user'

const requiredAuth = (to, from, next) => {
  // https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
  const userStore = useUserStore(); 
  if(userStore.isLogged) next(); 
  else next({name:'login'});
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: requiredAuth
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: 'register',
    }
  ]
})

export default router
