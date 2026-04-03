<template>
  <div class="detail-page">
    <!-- 播放选择弹窗 -->
    <van-dialog 
      v-model:show="showPlayDialog" 
      title="提示"
      :show-confirm-button="false"
      close-on-click-overlay
    >
      <div class="play-dialog-content">
        <p class="dialog-message">本剧所有剧集均需VIP或付费观看，是否立即开通？</p>
        <div class="dialog-buttons">
          <van-button type="warning" round @click="handleSingleBuy">单集购买</van-button>
          <van-button type="danger" round @click="handleOpenVip">开通VIP</van-button>
          <van-button type="default" round @click="showPlayDialog = false">取消</van-button>
        </div>
      </div>
    </van-dialog>

    <!-- 顶部封面 -->
    <div class="detail-header">
      <div class="header-bg">
        <van-image :src="drama.cover" fit="cover" class="bg-image" />
      </div>
      <van-image :src="drama.cover" fit="contain" class="header-image" />
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
            v-for="(ep, index) in episodeList" 
            :key="index"
            @click="handleEpisode(ep)"
          >
            <span class="ep-num">{{ ep.num }}</span>
            <span class="ep-tag" :class="{ price: !ep.isVip }">{{ ep.isVip ? 'VIP' : '¥' + ep.price }}</span>
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
      <van-button v-if="drama.isVip" type="warning" round class="vip-btn" @click="handleVip">
        开通VIP ¥{{ drama.vipPrice }}/月
      </van-button>
      <van-button v-else type="danger" round class="buy-btn" @click="handleBuy">
        解锁全剧 ¥{{ drama.price }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import { useDramaStore } from '@/stores/drama'
import { useFavoriteStore } from '@/stores/favorite'

const route = useRoute()
const router = useRouter()
const dramaStore = useDramaStore()
const favoriteStore = useFavoriteStore()

// 从store获取短剧数据
const dramaId = computed(() => Number(route.params.id) || 1)
const dramaData = computed(() => {
  const allDramas = dramaStore.recommendList.length > 0 
    ? dramaStore.recommendList 
    : getMockDramasLocal()
  return allDramas.find(d => d.id === dramaId.value) || getMockDramasLocal()[0]
})

const drama = reactive({
  id: dramaData.value?.id || 1,
  title: dramaData.value?.title || '豪门千金的逆袭人生',
  cover: dramaData.value?.cover || '/drama-h5/images/banners/banner-1.jpg',
  description: dramaData.value?.description || '豪门千金苏晚晴被继母陷害...',
  tags: dramaData.value?.tags || ['都市', '逆袭', '甜宠', '霸总'],
  episodes: dramaData.value?.episodes || 86,
  isVip: dramaData.value?.isVip ?? true, // 从短剧数据获取
  price: dramaData.value?.price || 19.9,
  vipPrice: 9.9
})

// 从 store 获取收藏状态
const isFavorite = ref(false)
const episodeList = ref([])
const showPlayDialog = ref(false)

// 本地模拟数据
function getMockDramasLocal() {
  return [
    { id: 1, title: '豪门千金的逆袭人生', isVip: true, price: 29.9, episodes: 86, cover: '/drama-h5/images/banners/banner-1.jpg', description: '豪门千金苏晚晴被继母陷害...', tags: ['都市', '逆袭'] },
    { id: 2, title: '重生之商业女王', isVip: false, price: 19.9, episodes: 98, cover: '/drama-h5/images/banners/banner-2.jpg', description: '前世被渣男和闺蜜联手害死...', tags: ['重生', '逆袭'] },
    { id: 3, title: '穿越之医妃倾天下', isVip: true, price: 25.9, episodes: 80, cover: '/drama-h5/images/banners/banner-3.jpg', description: '现代医学博士穿越成古代不受宠的嫡女...', tags: ['古装', '穿越'] },
    { id: 4, title: '闪婚后千亿总裁宠上天', isVip: false, price: 18.9, episodes: 42, cover: '/drama-h5/images/banners/banner-4.jpg', description: '被继母逼婚...', tags: ['甜宠', '霸总'] },
    { id: 5, title: '落魄千金复仇记', isVip: true, price: 22.9, episodes: 60, cover: '/drama-h5/images/banners/banner-5.jpg', description: '一夜之间家破人亡...', tags: ['复仇', '逆袭'] },
    { id: 6, title: '隐世高手在都市', isVip: false, price: 15.9, episodes: 55, cover: '/drama-h5/images/banners/banner-1.jpg', description: '隐世宗门传人下山历练...', tags: ['都市', '爽文'] },
    { id: 7, title: '替身新娘：总裁的契约妻', isVip: true, price: 28.9, episodes: 72, cover: '/drama-h5/images/banners/banner-1.jpg', description: '为了替妹妹还债...', tags: ['甜宠', '契约'] },
    { id: 8, title: '神医毒妃', isVip: false, price: 16.9, episodes: 68, cover: '/drama-h5/images/banners/banner-2.jpg', description: '她是21世纪顶级毒医...', tags: ['古装', '穿越'] },
    { id: 9, title: '千亿宠婚：总裁大人求放过', isVip: true, price: 24.9, episodes: 45, cover: '/drama-h5/images/banners/banner-3.jpg', description: '一场意外...', tags: ['甜宠', '霸总'] },
    { id: 10, title: '消失的新娘', isVip: true, price: 26.9, episodes: 36, cover: '/drama-h5/images/banners/banner-4.jpg', description: '婚礼当天新娘离奇失踪...', tags: ['悬疑', '推理'] }
  ]
}

onMounted(() => {
  // 更新drama数据
  const data = dramaData.value
  if (data) {
    drama.id = data.id
    drama.title = data.title
    drama.cover = data.cover
    drama.description = data.description
    drama.tags = data.tags
    drama.episodes = data.episodes
    drama.isVip = data.isVip
    drama.price = data.price
  }
  
  // 从 store 初始化收藏状态
  isFavorite.value = favoriteStore.isFavorite(drama.id)
  
  // 根据短剧类型生成剧集列表
  const episodes = []
  // 计算单集价格（总价/集数，保留1位小数）
  const episodePrice = drama.isVip ? null : Math.max(1, Math.round(drama.price / drama.episodes * 10) / 10)
  for (let i = 1; i <= drama.episodes; i++) {
    episodes.push({
      num: i,
      isVip: drama.isVip, // 根据短剧类型决定
      price: episodePrice // 单集价格一致
    })
  }
  episodeList.value = episodes
})

function goBack() {
  router.back()
}

function handlePlay() {
  showPlayDialog.value = true
}

function handleSingleBuy() {
  showPlayDialog.value = false
  if (episodeList.value.length > 0) {
    const firstEp = episodeList.value[0]
    handleEpisode(firstEp)
  }
}

function handleOpenVip() {
  showPlayDialog.value = false
  router.push('/pay?type=vip')
}

function handleEpisode(ep) {
  if (drama.isVip) {
    // VIP短剧，所有剧集需要VIP
    showConfirmDialog({
      title: 'VIP专享',
      message: `《${drama.title}》为VIP专享短剧，开通VIP即可观看全集`,
      confirmButtonText: '开通VIP',
      cancelButtonText: '取消'
    }).then(() => {
      router.push('/pay?type=vip')
    }).catch(() => {})
  } else {
    // 付费短剧，所有剧集需要付费
    showConfirmDialog({
      title: '付费解锁',
      message: `第${ep.num}集需要付费¥${ep.price}解锁，是否购买？`,
      confirmButtonText: '立即购买',
      cancelButtonText: '取消'
    }).then(() => {
      router.push(`/pay?type=episode&id=${drama.id}&ep=${ep.num}&price=${ep.price}`)
    }).catch(() => {})
  }
}

async function handleFavorite() {
  // 构造短剧数据用于收藏
  const dramaInfo = {
    id: drama.id,
    title: drama.title,
    cover: drama.cover,
    views: drama.views || '0',
    isVip: drama.isVip,
    price: drama.price
  }
  
  // 通过 store 切换收藏状态
  const newState = favoriteStore.toggleFavorite(dramaInfo)
  isFavorite.value = newState
  showToast(newState ? '已收藏' : '已取消收藏')
}

function handleShare() {
  showToast('分享功能开发中')
}

async function handleBuy() {
  router.push({
    path: '/pay',
    query: {
      type: 'drama',
      id: drama.id,
      title: drama.title,
      cover: drama.cover,
      episodes: drama.episodes,
      price: drama.price
    }
  })
}

async function handleVip() {
  router.push('/pay?type=vip')
}
</script>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 80px;
}

.play-dialog-content {
  padding: 24px 20px;
  
  .dialog-message {
    text-align: center;
    color: #333;
    margin-bottom: 24px;
    font-size: 15px;
    line-height: 1.6;
  }
  
  .dialog-buttons {
    display: flex;
    gap: 8px;
    
    .van-button {
      flex: 1;
      height: 44px;
      font-size: 13px;
      padding: 0 8px;
      
      &:last-child {
        flex: 0.8;
      }
    }
  }
}

.detail-header {
  position: relative;
  aspect-ratio: 16/9;
  background: #000;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  
  .bg-image {
    width: 100%;
    height: 100%;
    filter: blur(20px);
    transform: scale(1.2);
    opacity: 0.6;
  }
}

.header-image {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
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
  z-index: 10;
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
  z-index: 10;
  
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  
  .ep-num {
    font-size: 14px;
    font-weight: 500;
  }
  
  .ep-tag {
    font-size: 10px;
    padding: 1px 4px;
    border-radius: 2px;
    margin-top: 2px;
    background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
    color: #000;
    
    &.price {
      background: rgba(255, 71, 87, 0.9);
      color: #fff;
    }
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
