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
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/views/pay/index.vue'),
    meta: { title: '支付' }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index.vue'),
    meta: { title: '搜索' }
  },
  {
    path: '/player/:id',
    name: 'Player',
    component: () => import('@/views/player/index.vue'),
    meta: { title: '播放' }
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('@/views/notification/index.vue'),
    meta: { title: '消息通知' }
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/category/index.vue'),
    meta: { title: '分类' }
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('@/views/activity/index.vue'),
    meta: { title: '活动' }
  },
  {
    path: '/invite',
    name: 'Invite',
    component: () => import('@/views/invite/index.vue'),
    meta: { title: '邀请好友' }
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('@/views/wallet/index.vue'),
    meta: { title: '我的钱包' }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/history/index.vue'),
    meta: { title: '观看历史' }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/setting/index.vue'),
    meta: { title: '设置' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue'),
    meta: { title: '关于我们' }
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
