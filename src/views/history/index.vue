<template>
  <div class="history-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">观看历史</div>
      <div class="clear-btn" @click="clearHistory">清空</div>
    </header>

    <!-- 历史列表 -->
    <div class="history-list">
      <div 
        class="history-item" 
        v-for="item in historyList" 
        :key="item.id"
        @click="handlePlay(item)"
      >
        <div class="history-cover">
          <van-image :src="item.cover" fit="cover" class="cover-image" />
          <div class="play-progress">
            <div class="progress-bar" :style="{ width: item.progress + '%' }"></div>
          </div>
          <div class="play-icon">
            <van-icon name="play" size="20" color="#fff" />
          </div>
        </div>
        <div class="history-info">
          <div class="history-title">{{ item.title }}</div>
          <div class="history-episode">看到第{{ item.episode }}集</div>
          <div class="history-time">{{ item.watchTime }}</div>
        </div>
        <van-icon name="delete-o" size="20" color="#999" @click.stop="removeHistory(item)" />
      </div>
      
      <van-empty v-if="!historyList.length" description="暂无观看记录" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'

const router = useRouter()

const historyList = ref([
  { id: 1, title: '豪门千金的逆袭人生', cover: '/drama-h5/images/dramas/drama-8.jpg', episode: 32, progress: 65, watchTime: '2小时前' },
  { id: 2, title: '重生之商业女王', cover: '/drama-h5/images/dramas/drama-9.jpg', episode: 56, progress: 30, watchTime: '昨天' },
  { id: 3, title: '穿越之医妃倾天下', cover: '/drama-h5/images/dramas/drama-10.jpg', episode: 18, progress: 80, watchTime: '3天前' },
  { id: 4, title: '闪婚后千亿总裁宠上天', cover: '/drama-h5/images/dramas/drama-11.jpg', episode: 12, progress: 45, watchTime: '5天前' }
])

function handlePlay(item) {
  router.push(`/player/${item.id}?episode=${item.episode}`)
}

async function removeHistory(item) {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定删除该观看记录？'
    })
    historyList.value = historyList.value.filter(h => h.id !== item.id)
    showToast('已删除')
  } catch {
    // 取消
  }
}

async function clearHistory() {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定清空所有观看记录？'
    })
    historyList.value = []
    showToast('已清空')
  } catch {
    // 取消
  }
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.history-page {
  min-height: 100vh;
  background: var(--bg-color);
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-bottom: 1px solid var(--border-light);
}

.back-btn {
  position: absolute;
  left: 16px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  font-size: 17px;
  font-weight: 600;
}

.clear-btn {
  position: absolute;
  right: 16px;
  font-size: 14px;
  color: var(--text-tertiary);
}

.history-list {
  padding: 66px 16px 16px;
}

.history-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
}

.history-cover {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.cover-image {
  width: 100%;
  height: 100%;
}

.play-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
}

.progress-bar {
  height: 100%;
  background: var(--primary-color);
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.history-item:hover .play-icon {
  opacity: 1;
}

.history-info {
  flex: 1;
}

.history-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
}

.history-episode {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.history-time {
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
