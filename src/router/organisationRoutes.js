import { createRouter, createWebHistory } from 'vue-router'
import OrganisationView from '../views/organisationViews/OrganisationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/organisations',
      name: 'organisations',
      // route level code-splitting for lazy loading
      component: () => import('../views/organisationViews/OrganisationView.vue'),
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
      component: OrganisationView,
      props: true,
    },
    {
      path: '/organisation/:id/edit',
      name: 'editOrganisation',
      component: OrganisationView,
      props: true,
    },
  ],
})

export default router
