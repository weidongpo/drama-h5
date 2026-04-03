<template>
  <div class="download-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">我的下载</div>
      <div class="header-right"></div>
    </header>

    <!-- 下载列表 -->
    <div class="download-list" v-if="downloadList.length">
      <div class="download-item" v-for="item in downloadList" :key="item.id">
        <div class="download-cover">
          <van-image :src="item.cover" fit="cover" class="cover-image" />
          <div class="download-badge">{{ item.downloadedEpisodes }}集</div>
        </div>
        <div class="download-info">
          <div class="download-title">{{ item.title }}</div>
          <div class="download-meta">
            <span>已下载 {{ item.downloadedEpisodes }}/{{ item.totalEpisodes }}集</span>
          </div>
          <div class="download-size">占用空间: {{ item.size }}</div>
        </div>
        <div class="download-actions">
          <van-button type="danger" size="small" round @click="handlePlay(item)">播放</van-button>
          <van-button size="small" round @click="handleDelete(item)">删除</van-button>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <van-empty v-else description="还没有下载内容" image="search">
      <van-button type="danger" round @click="goHome">去发现</van-button>
    </van-empty>

    <!-- 存储信息 -->
    <div class="storage-info" v-if="downloadList.length">
      <div class="storage-bar">
        <div class="storage-used" :style="{ width: storagePercent + '%' }"></div>
      </div>
      <div class="storage-text">
        已使用 {{ usedStorage }} / 总共 {{ totalStorage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'

const router = useRouter()

const downloadList = ref([
  { 
    id: 1, 
    title: '豪门千金的逆袭人生', 
    cover: '/drama-h5/images/dramas/drama-18.jpg',
    downloadedEpisodes: 20,
    totalEpisodes: 86,
    size: '1.2GB'
  },
  { 
    id: 2, 
    title: '重生之商业女王', 
    cover: '/drama-h5/images/dramas/drama-19.jpg',
    downloadedEpisodes: 15,
    totalEpisodes: 98,
    size: '856MB'
  }
])

const usedStorage = ref('2.1GB')
const totalStorage = ref('10GB')
const storagePercent = computed(() => 21)

function goBack() {
  router.back()
}

function goHome() {
  router.push('/')
}

function handlePlay(item) {
  router.push(`/detail/${item.id}`)
}

async function handleDelete(item) {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定要删除已下载的内容吗？'
    })
    downloadList.value = downloadList.value.filter(i => i.id !== item.id)
    showToast('已删除')
  } catch {
    // 取消
  }
}
</script>

<style lang="scss" scoped>
.download-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 100px;
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

.back-btn, .header-right {
  position: absolute;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn {
  left: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.header-right {
  right: 16px;
}

.header-title {
  font-size: 17px;
  font-weight: 600;
}

.download-list {
  padding: 60px 16px 16px;
}

.download-item {
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-light);
}

.download-cover {
  width: 80px;
  height: 110px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.cover-image {
  width: 100%;
  height: 100%;
}

.download-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(var(--primary-color), 0.9);
  font-size: 10px;
  padding: 2px 0;
  text-align: center;
}

.download-info {
  flex: 1;
  min-width: 0;
}

.download-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
}

.download-meta {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.download-size {
  font-size: 12px;
  color: var(--text-tertiary);
}

.download-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  
  :deep(.van-button) {
    width: 60px;
  }
}

.storage-info {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  padding: 16px;
  border-top: 1px solid var(--border-light);
}

.storage-bar {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.storage-used {
  height: 100%;
  background: var(--primary-color);
  border-radius: 4px;
}

.storage-text {
  font-size: 12px;
  color: var(--text-tertiary);
  text-align: center;
}
</style>
