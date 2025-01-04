import { createRouter, createWebHistory } from 'vue-router'
import ErrorPage from '@/components/error/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: ErrorPage
    }
    // ... your other routes
  ]
})

export default router
