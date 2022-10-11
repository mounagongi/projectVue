import { createRouter, createWebHistory } from 'vue-router'

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
      // children: [
      //      {
      //        path: '/:title',
      //        component: () => import('../views/Details.vue'),
      //     }
      //   ],
      
    },
    {
      path: '/entry/:title',
      name: 'entry',
      component: () => import('../views/Details.vue'),
    }
  ]
})

export default router
