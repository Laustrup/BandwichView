import { createRouter, createWebHistory } from 'vue-router'
import EventView from '../views/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/events',
      name: 'events',
      // route level code-splitting for lazy loading
      component: () => import('../views/EventsView.vue'),
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventView,
      props: true,
    },
    {
      path: '/event/:id/register',
      name: 'registerEvent',
      component: () => import('../views/RegisterEventView.vue'),
      props: true,
    },
    {
      path: '/event/:id/edit',
      name: 'editEvent',
      component: () => import('../views/EditEventView.vue'),
      props: true,
    },
  ],
})

export default router
