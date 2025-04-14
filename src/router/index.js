import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './authRoutes'
import bandRouter from './bandRoutes'
import baseRouter from './baseRoutes'
import eventRouter from './eventRoutes'
import organisationRouter from './organisationRoutes'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  ...authRouter.options.routes,
  ...bandRouter.options.routes,
  ...baseRouter.options.routes,
  ...eventRouter.options.routes,
  ...organisationRouter.options.routes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Optional: Add navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // Your auth logic here

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
