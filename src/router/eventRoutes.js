import { createRouter, createWebHistory } from 'vue-router';
import EventView from '../views/eventViews/EventView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/events',
      name: 'events',
      // route level code-splitting for lazy loading
      component: () => import('../views/eventViews/EventView.vue'),
    },
    {
      path: '/event/register',
      name: 'registerEvent',
      component: EventView,
      props: true,
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventView,
      props: true,
    },
    {
      path: '/event/:id/edit',
      name: 'editEvent',
      component: EventView,
      props: true,
    }
  ]
});

export default router
