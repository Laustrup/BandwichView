import { createRouter, createWebHistory } from 'vue-router'
import OrganisationView from '../views/OrganisationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/organisations',
      name: 'organisations',
      // route level code-splitting for lazy loading
      component: () => import('../views/OrganisationsView.vue'),
    },
    {
      path: '/organisation/:id',
      name: 'organisation',
      component: OrganisationView,
      props: true,
    },
    {
      path: '/organisation/:id/register',
      name: 'registerOrganisation',
      component: () => import('../views/RegisterOrganisationView.vue'),
      props: true,
    },
    {
      path: '/organisation/:id/edit',
      name: 'editOrganisation',
      component: () => import('../views/EditOrganisationView.vue'),
      props: true,
    },
  ],
})

export default router
