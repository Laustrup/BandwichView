import { createRouter, createWebHistory } from 'vue-router';
import BandRegisterView from '../views/bandViews/BandRegisterView.vue';
import BandView from '../views/bandViews/BandView.vue';
// import BandEditView from '../views/BandEditView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/bands',
      name: 'bands',
      // route level code-splitting for lazy loading
      component: () => import('../views/bandViews/BandView.vue')
    },
    {
      path: '/band/register',
      name: 'registerBand',
      component: BandRegisterView,
      props: true
    },
    {
      path: '/band/:id',
      name: 'band',
      component: BandView,
      props: true
    },
    {
      path: '/band/:id/edit',
      name: 'editBand',
      component: BandView,
      props: true
    }
  ]
});

export default router;
