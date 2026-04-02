<template>
  <div class="detail-page">
    <!-- 顶部封面 -->
    <div class="detail-header">
      <van-image :src="drama.cover" fit="cover" class="header-image" />
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="play-btn" @click="handlePlay">
        <van-icon name="play" size="28" color="#fff" />
      </div>
    </div>

    <!-- 详情信息 -->
    <div class="detail-info">
      <h1 class="detail-title">{{ drama.title }}</h1>
      <div class="detail-tags">
        <van-tag v-for="tag in drama.tags" :key="tag" plain type="primary">{{ tag }}</van-tag>
      </div>
      <p class="detail-desc">{{ drama.description }}</p>

      <!-- 剧集选择 -->
      <div class="episode-section">
        <h3>📺 选集播放 (共{{ drama.episodes }}集)</h3>
        <div class="episode-grid">
          <div 
            class="episode-item" 
            :class="{ free: ep <= 10, vip: ep > 10 && ep <= 18, locked: ep > 18 }"
            v-for="ep in drama.episodes" 
            :key="ep"
            @click="handleEpisode(ep)"
          >
            {{ ep > 18 ? '🔒' : ep }}
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="detail-actions">
      <div class="action-btn" @click="handleFavorite">
        <van-icon :name="isFavorite ? 'like' : 'like-o'" :color="isFavorite ? '#ff4757' : '#999'" size="22" />
        <span>收藏</span>
      </div>
      <div class="action-btn" @click="handleShare">
        <van-icon name="share-o" size="22" color="#999" />
        <span>分享</span>
      </div>
      <van-button type="danger" round class="buy-btn" @click="handleBuy">
        解锁全剧 ¥{{ drama.price }}
      </van-button>
      <van-button type="warning" round class="vip-btn" @click="handleVip">
        开通VIP ¥{{ drama.vipPrice }}/月
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'

const route = useRoute()
const router = useRouter()

const drama = reactive({
  id: 1,
  title: '豪门千金的逆袭人生',
  cover: 'https://picsum.photos/800/450?random=1',
  description: '豪门千金苏晚晴被继母陷害，流落街头。五年后，她华丽归来，誓要让那些伤害过她的人付出代价。在这个过程中，她意外与冷面总裁陆景琛产生了交集，两人从互相看不顺眼到暗生情愫，最终携手走向幸福...',
  tags: ['都市', '逆袭', '甜宠', '霸总'],
  episodes: 86,
  price: 19.9,
  vipPrice: 9.9
})

const isFavorite = ref(false)

onMounted(() => {
  const id = route.params.id
  // TODO: 根据 id 获取详情
  console.log('Drama ID:', id)
})

function goBack() {
  router.back()
}

function handlePlay() {
  showToast('开始播放...')
}

function handleEpisode(ep) {
  if (ep > 18) {
    showToast('请先开通VIP或解锁全剧')
  } else {
    showToast(`开始播放第 ${ep} 集`)
  }
}

async function handleFavorite() {
  isFavorite.value = !isFavorite.value
  showToast(isFavorite.value ? '已收藏' : '已取消收藏')
}

function handleShare() {
  showToast('分享功能开发中')
}

async function handleBuy() {
  try {
    await showConfirmDialog({
      title: '解锁全剧',
      message: `确认支付 ¥${drama.price} 解锁全剧？`
    })
    showToast('支付功能开发中')
  } catch {
    // 取消
  }
}

async function handleVip() {
  try {
    await showConfirmDialog({
      title: '开通VIP',
      message: `确认支付 ¥${drama.vipPrice}/月 开通VIP？`
    })
    showToast('支付功能开发中')
  } catch {
    // 取消
  }
}
</script>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 80px;
}

.detail-header {
  position: relative;
  aspect-ratio: 16/9;
}

.header-image {
  width: 100%;
  height: 100%;
}

.back-btn {
  position: absolute;
  top: $spacing-md;
  left: $spacing-md;
  width: 36px;
  height: 36px;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba($primary-color, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  .van-icon {
    margin-left: 4px;
  }
}

.detail-info {
  padding: $spacing-lg;
}

.detail-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: $spacing-sm;
}

.detail-tags {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
  
  :deep(.van-tag) {
    background: $bg-secondary;
    border-color: transparent;
    color: $text-secondary;
  }
}

.detail-desc {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.6;
  margin-bottom: $spacing-xl;
}

.episode-section {
  h3 {
    font-size: 16px;
    margin-bottom: $spacing-md;
  }
}

.episode-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: $spacing-sm;
}

.episode-item {
  aspect-ratio: 1;
  background: $bg-secondary;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  
  &.free {
    background: $bg-secondary;
  }
  
  &.vip {
    background: linear-gradient(135deg, $bg-tertiary 0%, $bg-secondary 100%);
    color: #ffd700;
  }
  
  &.locked {
    background: $bg-secondary;
    color: $text-tertiary;
  }
  
  &:active {
    transform: scale(0.9);
  }
}

.detail-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: $bg-card;
  display: flex;
  align-items: center;
  padding: 0 $spacing-lg;
  gap: $spacing-md;
  border-top: 1px solid $border-color;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  
  span {
    font-size: 10px;
    color: $text-tertiary;
  }
}

.buy-btn, .vip-btn {
  flex: 1;
}
</style>
