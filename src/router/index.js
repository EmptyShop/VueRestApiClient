import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ref } from 'vue'

//referencias para los enlaces del menú de la página principal
export const homeLink = ref("/");
export const createLink = ref("/create");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/CreateView.vue')
    },
    {
      path: '/edit/:id(\\d+)',
      name: 'edit',
      component: () => import('@/views/EditView.vue')
    },
    // Rutas para la API alterna
    {
      path: '/HomeNet',
      name: 'homeNet',
      component: () => import('@/viewsNet/HomeView.vue')
    },
    {
      path: '/createNet',
      name: 'createNet',
      component: () => import('@/viewsNet/CreateView.vue')
    },
    {
      path: '/editNet/:id(\\d+)',
      name: 'editNet',
      component: () => import('@/viewsNet/EditView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/NotFound.vue')
    }
  ]
})

export default router