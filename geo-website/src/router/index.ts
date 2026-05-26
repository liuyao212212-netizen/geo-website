import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '智优康赛 - GEO生成式引擎优化' }
  },
  {
    path: '/solutions',
    name: 'Solutions',
    component: () => import('../views/SolutionsView.vue'),
    meta: { title: '解决方案 - 智优康赛' }
  },
  {
    path: '/cases',
    name: 'Cases',
    component: () => import('../views/CasesView.vue'),
    meta: { title: '客户案例 - 智优康赛' }
  },
  {
    path: '/platform',
    name: 'Platform',
    component: () => import('../views/PlatformView.vue'),
    meta: { title: '智优平台 - 智优康赛' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { title: '关于我们 - 智优康赛' }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import('../views/ResourcesView.vue'),
    meta: { title: '资源中心 - 智优康赛' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
