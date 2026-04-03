<template>
  <van-tabbar v-model="active" active-color="#ff4757" :inactive-color="inactiveColor" fixed>
    <van-tabbar-item v-for="item in navItems" :key="item.path" :to="item.path">
      <template #icon="props">
        <component :is="item.icon(props.active)" />
      </template>
      {{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { computed, h } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// 根据主题设置非激活状态颜色
const inactiveColor = computed(() => themeStore.isDark ? '#666' : '#999')

// 获取图标颜色
const getIconColor = (isActive) => isActive ? '#ff4757' : (themeStore.isDark ? '#666' : '#999')

// SVG 图标组件工厂函数
const createIcon = (pathD) => (isActive) => h('svg', { 
  viewBox: '0 0 24 24', 
  width: 24, 
  height: 24,
  fill: getIconColor(isActive)
}, [
  h('path', { d: pathD })
])

const navItems = [
  { name: '首页', path: '/', icon: createIcon('M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z') },
  { name: '追剧', path: '/follow', icon: createIcon('M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z') },
  { name: '收藏', path: '/favorite', icon: createIcon('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z') },
  { name: '任务', path: '/task', icon: createIcon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z') },
  { name: '我的', path: '/profile', icon: createIcon('M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z') }
]

const route = useRoute()
const active = computed(() => {
  const index = navItems.findIndex(item => item.path === route.path)
  return index >= 0 ? index : 0
})
</script>

<style lang="scss" scoped>
:deep(.van-tabbar) {
  background: var(--bg-card) !important;
  border-top: 1px solid var(--border-color);
}

:deep(.van-tabbar-item) {
  background: transparent !important;
}

:deep(.van-tabbar-item__text) {
  color: var(--text-tertiary);
}

:deep(.van-tabbar-item--active .van-tabbar-item__text) {
  color: var(--primary-color) !important;
}
</style>
