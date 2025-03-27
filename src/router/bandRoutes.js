import { createRouter, createWebHistory } from 'vue-router'
import BandView from '../views/BandView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/bands',
      name: 'bands',
      // route level code-splitting for lazy loading
      component: () => import('../views/BandsView.vue'),
    },
    {
      path: '/band/:id',
      name: 'band',
      component: BandView,
      props: true,
    },
    {
      path: '/band/:id/register',
      name: 'registerBand',
      component: () => import('../views/RegisterBandView.vue'),
      props: true,
    },
    {
      path: '/band/:id/edit',
      name: 'editBand',
      component: () => import('../views/EditBandView.vue'),
      props: true,
    },
  ],
})

export default router
