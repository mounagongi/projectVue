import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import EntriesView from '../views/EntriesView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue')
    },
    {
      path: '/',
      name: 'entries',
      component: () => import('../views/EntriesView.vue'),
      
    },
    {
      path: '/entry/:title',
      name: 'entry',
      component: () => import('../views/Details.vue'),
      // children: [
      //   {
      //     path: 'details',
      //     component: () => import('../views/Details.vue'),
      //   }
      // ],
    }
  ]
})

export default router
