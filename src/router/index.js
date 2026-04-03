import { createRouter, createWebHistory } from 'vue-router'

// 获取 base 路径，与 vite.config.js 保持一致
const base = import.meta.env.BASE_URL

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
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: () => import('@/views/profile-edit/index.vue'),
    meta: { title: '编辑资料' }
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
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: () => import('@/views/tickets/index.vue'),
    meta: { title: '观影券' }
  },
  {
    path: '/download',
    name: 'Download',
    component: () => import('@/views/download/index.vue'),
    meta: { title: '我的下载' }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/help/index.vue'),
    meta: { title: '帮助与反馈' }
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: () => import('@/views/recharge/index.vue'),
    meta: { title: '充值积分' }
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    component: () => import('@/views/withdraw/index.vue'),
    meta: { title: '提现' }
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('@/views/agreement/index.vue'),
    meta: { title: '用户协议' }
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('@/views/policy/index.vue'),
    meta: { title: '隐私政策' }
  },
  {
    path: '/rate',
    name: 'Rate',
    component: () => import('@/views/rate/index.vue'),
    meta: { title: '给个好评' }
  },
  {
    path: '/setting/account',
    name: 'SettingAccount',
    component: () => import('@/views/setting/account.vue'),
    meta: { title: '账号与安全' }
  },
  {
    path: '/setting/privacy',
    name: 'SettingPrivacy',
    component: () => import('@/views/setting/privacy.vue'),
    meta: { title: '隐私设置' }
  },
  {
    path: '/setting/notification',
    name: 'SettingNotification',
    component: () => import('@/views/setting/notification.vue'),
    meta: { title: '通知设置' }
  },
  {
    path: '/setting/play',
    name: 'SettingPlay',
    component: () => import('@/views/setting/play.vue'),
    meta: { title: '播放设置' }
  },
  {
    path: '/setting/download',
    name: 'SettingDownload',
    component: () => import('@/views/setting/download.vue'),
    meta: { title: '下载设置' }
  },

]

const router = createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 视界剧场` : '视界剧场'
  next()
})

export default router
