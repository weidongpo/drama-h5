import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/follow',
    name: 'Follow',
    component: () => import('@/views/follow/index.vue'),
    meta: { title: '追剧' }
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import('@/views/favorite/index.vue'),
    meta: { title: '收藏' }
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import('@/views/task/index.vue'),
    meta: { title: '任务' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue'),
    meta: { title: '我的' }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/detail/index.vue'),
    meta: { title: '详情' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 追剧达人` : '追剧达人'
  next()
})

export default router
