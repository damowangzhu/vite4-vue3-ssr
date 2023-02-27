import type { RouteRecordRaw } from 'vue-router'
import { createRouter as _createRrouter, createMemoryHistory, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue')
  }
]

export function createRouter() {
  return _createRrouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
