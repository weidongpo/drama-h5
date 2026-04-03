<template>
  <div class="follow-page">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-title">我的追剧</div>
    </header>

    <!-- 追剧列表 -->
    <div class="drama-list">
      <div 
        class="drama-item" 
        v-for="item in followList" 
        :key="item.id"
        @click="handleDramaClick(item)"
      >
        <div class="drama-cover">
          <van-image :src="item.cover" fit="cover" class="cover-image" />
          <div class="vip-tag" v-if="item.isVip">VIP</div>
          <div class="price-tag" v-else>¥{{ item.price }}</div>
          <div class="update-badge">更新至{{ item.episodes }}集</div>
        </div>
        <div class="drama-info">
          <div class="info-top">
            <div class="drama-title">{{ item.title }}</div>
            <div class="drama-progress">已看到 <span>第{{ item.currentEpisode }}集</span> / 共{{ item.episodes }}集</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: (item.currentEpisode / item.episodes * 100) + '%' }"></div>
            </div>
            <div class="drama-meta">上次观看: {{ item.lastWatchTime }}</div>
          </div>
          <div class="drama-actions">
            <van-button type="danger" size="small" round @click.stop="handleContinue(item)">
              继续观看
            </van-button>
            <van-button size="small" round @click.stop="handleRemove(item)">
              移除
            </van-button>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <van-empty 
        v-if="!followList.length" 
        description="还没有追剧记录"
        image="search"
      >
        <van-button type="danger" round @click="goHome">去发现</van-button>
      </van-empty>
    </div>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()

const followList = ref([])

onMounted(() => {
  // 模拟数据
  followList.value = [
    { 
      id: 1, 
      title: '豪门千金的逆袭人生', 
      cover: '/drama-h5/images/dramas/drama-10.jpg',
      episodes: 86,
      currentEpisode: 32,
      lastWatchTime: '2小时前',
      isVip: true,
      price: 29.9
    },
    { 
      id: 2, 
      title: '重生之商业女王', 
      cover: '/drama-h5/images/dramas/drama-11.jpg',
      episodes: 98,
      currentEpisode: 56,
      lastWatchTime: '昨天',
      isVip: false,
      price: 19.9
    },
    { 
      id: 3, 
      title: '总裁的替身新娘', 
      cover: '/drama-h5/images/dramas/drama-12.jpg',
      episodes: 65,
      currentEpisode: 18,
      lastWatchTime: '3天前',
      isVip: true,
      price: 28.9
    },
    { 
      id: 4, 
      title: '穿越之医妃倾天下', 
      cover: '/drama-h5/images/dramas/drama-13.jpg',
      episodes: 80,
      currentEpisode: 45,
      lastWatchTime: '5天前',
      isVip: true,
      price: 25.9
    },
    { 
      id: 5, 
      title: '消失的新娘', 
      cover: '/drama-h5/images/dramas/drama-14.jpg',
      episodes: 36,
      currentEpisode: 36,
      lastWatchTime: '1周前',
      isVip: true,
      price: 26.9
    },
    { 
      id: 6, 
      title: '霸道总裁的小娇妻', 
      cover: '/drama-h5/images/dramas/drama-15.jpg',
      episodes: 65,
      currentEpisode: 28,
      lastWatchTime: '1周前',
      isVip: true,
      price: 27.9
    },
    { 
      id: 7, 
      title: '凤逆天下：废材七小姐', 
      cover: '/drama-h5/images/dramas/drama-16.jpg',
      episodes: 96,
      currentEpisode: 72,
      lastWatchTime: '2周前',
      isVip: true,
      price: 32.9
    },
    { 
      id: 8, 
      title: '绝世武神', 
      cover: '/drama-h5/images/dramas/drama-17.jpg',
      episodes: 200,
      currentEpisode: 88,
      lastWatchTime: '2周前',
      isVip: true,
      price: 35.9
    }
  ]
})

function handleDramaClick(item) {
  router.push(`/detail/${item.id}`)
}

function handleContinue(item) {
  router.push(`/detail/${item.id}?episode=${item.currentEpisode}`)
}

async function handleRemove(item) {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定要移除这部短剧吗？'
    })
    followList.value = followList.value.filter(i => i.id !== item.id)
    showToast('已移除')
  } catch {
    // 取消
  }
}

function goHome() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.follow-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 70px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-bottom: 1px solid var(--border-light);
}

.header-title {
  font-size: 17px;
  font-weight: 600;
}

.drama-list {
  padding: 60px $spacing-lg $spacing-lg;
}

.drama-item {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-lg 0;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  align-items: flex-start;
  
  &:last-child {
    border-bottom: none;
  }
}

.drama-cover {
  width: 100px;
  height: 140px;
  border-radius: $radius-md;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.cover-image {
  width: 100%;
  height: 100%;
}

.vip-tag {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  background: var(--vip-gradient);
  padding: 2px 6px;
  border-radius: $radius-sm;
  font-size: 10px;
  font-weight: 600;
  color: #000;
}

.price-tag {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  background: rgba(255, 71, 87, 0.9);
  padding: 2px 6px;
  border-radius: $radius-sm;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
}

.update-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(var(--primary-color), 0.9);
  font-size: 10px;
  padding: 3px 0;
  text-align: center;
}

.drama-info {
  flex: 1;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.info-top {
  flex: 1;
}

.drama-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: $spacing-sm;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.drama-progress {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: $spacing-xs;
  
  span {
    color: var(--primary-color);
  }
}

.drama-meta {
  font-size: 12px;
  color: var(--text-tertiary);
}

.progress-bar {
  height: 4px;
  background: var(--bg-tertiary);
  border-radius: 2px;
  margin: $spacing-sm 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
  transition: width 0.3s;
}

.drama-actions {
  display: flex;
  gap: $spacing-md;
  margin-top: $spacing-sm;
  
  :deep(.van-button) {
    flex: 1;
    max-width: 80px;
  }
}
</style>
