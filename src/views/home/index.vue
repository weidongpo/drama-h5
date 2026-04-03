<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-left">
        <div class="back-btn" @click="goBackToMiniProgram">
          <van-icon name="arrow-left" size="18" color="#fff" />
          <span>返回</span>
        </div>
      </div>
      <div class="header-title">🔥 视界剧场</div>
      <div class="header-icons">
        <van-icon name="bell" size="24" color="#fff" @click="handleNotification" />
        <van-icon name="user-o" size="24" color="#fff" @click="goProfile" />
      </div>
    </header>

    <!-- 搜索栏 -->
    <div class="search-bar" @click="goSearch">
      <van-search 
        v-model="searchText" 
        placeholder="搜索短剧、演员、导演" 
        shape="round"
        background="transparent"
        readonly
      />
    </div>

    <!-- 分类标签 -->
    <div class="categories">
      <van-tag 
        v-for="cat in categories" 
        :key="cat.id"
        :type="cat.active ? 'danger' : 'default'"
        round
        size="medium"
        class="category-tag"
        @click="handleCategoryClick(cat.id)"
      >
        {{ cat.name }}
      </van-tag>
    </div>

    <!-- 轮播图 -->
    <div class="banner-section">
      <div 
        class="banner-list" 
        ref="bannerListRef"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div 
          class="banner-wrapper"
          :style="{ transform: `translateX(-${currentBanner * 100}%)` }"
        >
          <div 
            class="banner" 
            v-for="(banner, index) in banners" 
            :key="banner.id"
            @click="handleBannerClick(banner)"
          >
            <van-image :src="banner.image" fit="cover" class="banner-image" />
            <div class="banner-tag" v-if="banner.tag">{{ banner.tag }}</div>
            <div class="banner-info">
              <div class="banner-title">{{ banner.title }}</div>
              <div class="banner-desc">播放量 {{ banner.views }} | 更新至第{{ banner.episodes }}集</div>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-dots" v-if="banners.length > 1">
        <span 
          class="dot" 
          :class="{ active: index === currentBanner }"
          v-for="(banner, index) in banners" 
          :key="index"
          @click.stop="currentBanner = index"
        ></span>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="section">
      <div class="section-title">
        <span>🔥 热门推荐</span>
        <span class="more" @click="handleMoreClick">查看更多 ></span>
      </div>
      
      <!-- 加载中 -->
      <div class="loading-wrapper" v-if="loading">
        <van-loading size="24px" color="#ff4757">加载中...</van-loading>
      </div>
      
      <!-- 空状态 -->
      <van-empty 
        v-else-if="!recommendList.length" 
        description="暂无相关短剧"
        image="search"
      >
        <van-button type="danger" round size="small" @click="handleCategoryClick(0)">查看全部</van-button>
      </van-empty>
      
      <!-- 列表 -->
      <transition name="fade" mode="out-in">
        <div class="drama-grid" :key="currentCategory" v-if="!loading && recommendList.length">
          <div 
            class="drama-card" 
            v-for="drama in recommendList" 
            :key="drama.id"
            @click="handleDramaClick(drama)"
          >
            <div class="drama-cover">
              <van-image :src="drama.cover" fit="cover" class="cover-image" />
              <div class="vip-tag" v-if="drama.isVip">VIP</div>
              <div class="price-tag" v-else>¥{{ drama.price }}</div>
              <div class="update-tag">{{ drama.status === 'completed' ? '全' : '更新至' }}{{ drama.episodes }}集</div>
            </div>
            <div class="drama-title">{{ drama.title }}</div>
            <div class="drama-meta">{{ drama.views }}次播放</div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useDramaStore } from '@/stores/drama'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const dramaStore = useDramaStore()

const searchText = ref('')
const categories = ref(dramaStore.categories)
const banners = ref([])
const recommendList = ref([])
const currentBanner = ref(0)
const loading = ref(false)
const currentCategory = computed(() => dramaStore.currentCategory)

// 触摸相关
const touchStartX = ref(0)
const touchEndX = ref(0)
const bannerListRef = ref(null)

onMounted(async () => {
  // 检查是否已初始化（有缓存数据）
  if (dramaStore.initialized && dramaStore.recommendList.length > 0) {
    // 使用缓存数据，不显示 loading
    banners.value = dramaStore.banners.length > 0 ? dramaStore.banners : await dramaStore.fetchBanners()
    recommendList.value = dramaStore.recommendList
  } else {
    // 首次加载，显示 loading
    loading.value = true
    try {
      banners.value = await dramaStore.fetchBanners()
      recommendList.value = await dramaStore.fetchRecommend()
    } finally {
      loading.value = false
    }
  }
})

// 触摸开始
function handleTouchStart(e) {
  touchStartX.value = e.touches[0].clientX
}

// 触摸移动
function handleTouchMove(e) {
  touchEndX.value = e.touches[0].clientX
}

// 触摸结束
function handleTouchEnd() {
  const diff = touchStartX.value - touchEndX.value
  const threshold = 50 // 滑动阈值
  
  if (diff > threshold) {
    // 向左滑动，下一张
    if (currentBanner.value < banners.value.length - 1) {
      currentBanner.value++
    } else {
      // 从最后一个跳到第一个
      currentBanner.value = 0
    }
  } else if (diff < -threshold) {
    // 向右滑动，上一张
    if (currentBanner.value > 0) {
      currentBanner.value--
    } else {
      // 从第一个跳到最后一个
      currentBanner.value = banners.value.length - 1
    }
  }
  
  // 重置
  touchStartX.value = 0
  touchEndX.value = 0
}

// 跳转搜索
function goSearch() {
  router.push('/search')
}

// 通知
function handleNotification() {
  router.push('/notification')
}

// 个人中心
function goProfile() {
  router.push('/profile')
}

// 返回小程序
function goBackToMiniProgram() {
  // 判断是否在小程序环境
  if (typeof wx !== 'undefined' && wx.miniProgram) {
    wx.miniProgram.navigateBack()
  } else {
    // 非小程序环境，提示用户
    showToast('请在小程序中使用此功能')
  }
}

// 切换分类
async function handleCategoryClick(categoryId) {
  dramaStore.setCategory(categoryId)
  loading.value = true
  
  // 模拟加载延迟
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // 重新加载数据
  const data = await dramaStore.fetchRecommend(categoryId)
  recommendList.value = data || []
  loading.value = false
}

// 点击轮播图
function handleBannerClick(banner) {
  router.push(`/detail/${banner.id || 1}`)
}

// 点击短剧
function handleDramaClick(drama) {
  router.push(`/detail/${drama.id}`)
}

// 查看更多
function handleMoreClick() {
  router.push('/category')
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 70px;
  overflow-x: hidden;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $spacing-lg;
  z-index: 100;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-color);
}

.header-left {
  display: flex;
  align-items: center;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  
  span {
    font-size: 14px;
    color: #fff;
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
}

.header-icons {
  display: flex;
  gap: $spacing-lg;
}

.search-bar {
  margin: 60px $spacing-lg $spacing-md;
  
  :deep(.van-search__content) {
    background: var(--bg-secondary);
    border-radius: 20px;
  }
  
  :deep(.van-field__control) {
    color: var(--text-primary);
  }
  
  :deep(.van-field__control::placeholder) {
    color: var(--text-tertiary);
  }
}

.categories {
  display: flex;
  gap: $spacing-md;
  padding: 0 $spacing-lg;
  margin-bottom: $spacing-xl;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.category-tag {
  flex-shrink: 0;
  cursor: pointer;
  
  &.van-tag--default {
    background: var(--bg-secondary);
    color: var(--text-secondary);
  }
}

.banner-section {
  margin: 0 $spacing-lg $spacing-xl;
  position: relative;
  width: calc(100% - 32px);
  max-width: 100%;
}

.banner-list {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: $radius-lg;
  overflow: hidden;
  cursor: grab;
}

.banner-wrapper {
  display: flex;
  height: 100%;
  transition: transform 0.3s ease;
}

.banner {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-tag {
  position: absolute;
  top: $spacing-md;
  left: $spacing-md;
  background: var(--primary-color);
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-sm;
  font-size: 11px;
  font-weight: 500;
}

.banner-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px $spacing-lg $spacing-lg;
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
}

.banner-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: $spacing-xs;
}

.banner-desc {
  font-size: 12px;
  color: var(--text-secondary);
}

.banner-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--bg-tertiary);
    cursor: pointer;
    transition: all 0.3s;
    
    &.active {
      width: 20px;
      border-radius: 3px;
      background: var(--primary-color);
    }
  }
}

.section {
  padding: 0 $spacing-lg;
  margin-bottom: $spacing-xl;
  width: 100%;
  box-sizing: border-box;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-lg;
  font-size: 16px;
  font-weight: 600;
  
  .more {
    font-size: 12px;
    color: var(--text-tertiary);
  }
}

.drama-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
}

.drama-card {
  cursor: pointer;
  transition: transform 0.3s;
  min-width: 0;
  
  &:active {
    transform: scale(0.95);
  }
}

.drama-cover {
  position: relative;
  aspect-ratio: 3/4;
  border-radius: $radius-md;
  overflow: hidden;
  margin-bottom: $spacing-sm;
  width: 100%;
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

.update-tag {
  position: absolute;
  bottom: $spacing-sm;
  left: $spacing-sm;
  background: rgba(0,0,0,0.7);
  padding: 2px 6px;
  border-radius: $radius-sm;
  font-size: 10px;
}

.drama-title {
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.drama-meta {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: $spacing-xs;
}

.loading-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
