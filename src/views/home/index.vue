<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-title">🔥 追剧达人</div>
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
      <div class="banner-list">
        <div 
          class="banner" 
          :class="{ active: index === currentBanner }"
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
      <div class="banner-dots" v-if="banners.length > 1">
        <span 
          class="dot" 
          :class="{ active: index === currentBanner }"
          v-for="(banner, index) in banners" 
          :key="index"
          @click="currentBanner = index"
        ></span>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="section">
      <div class="section-title">
        <span>🔥 热门推荐</span>
        <span class="more" @click="handleMoreClick">查看更多 ></span>
      </div>
      
      <div class="drama-grid">
        <div 
          class="drama-card" 
          v-for="drama in recommendList" 
          :key="drama.id"
          @click="handleDramaClick(drama)"
        >
          <div class="drama-cover">
            <van-image :src="drama.cover" fit="cover" class="cover-image" />
            <div class="vip-tag" v-if="drama.isVip">VIP</div>
            <div class="update-tag">{{ drama.status === 'completed' ? '全' : '更新至' }}{{ drama.episodes }}集</div>
          </div>
          <div class="drama-title">{{ drama.title }}</div>
          <div class="drama-meta">{{ drama.views }}次播放</div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDramaStore } from '@/stores/drama'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const dramaStore = useDramaStore()

const searchText = ref('')
const categories = ref(dramaStore.categories)
const banners = ref([])
const recommendList = ref([])
const currentBanner = ref(0)

onMounted(async () => {
  // 加载数据
  banners.value = await dramaStore.fetchBanners()
  recommendList.value = await dramaStore.fetchRecommend()
  
  // 自动轮播
  setInterval(() => {
    if (banners.value.length > 1) {
      currentBanner.value = (currentBanner.value + 1) % banners.value.length
    }
  }, 3000)
})

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

// 切换分类
function handleCategoryClick(categoryId) {
  dramaStore.setCategory(categoryId)
  // 重新加载数据
  dramaStore.fetchRecommend(categoryId).then(data => {
    recommendList.value = data
  })
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
  background: $bg-color;
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
  color: $primary-color;
}

.header-icons {
  display: flex;
  gap: $spacing-lg;
}

.search-bar {
  margin: 60px $spacing-lg $spacing-md;
  
  :deep(.van-search__content) {
    background: $bg-secondary;
    border-radius: 20px;
  }
  
  :deep(.van-field__control) {
    color: $text-primary;
  }
  
  :deep(.van-field__control::placeholder) {
    color: $text-tertiary;
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
    background: $bg-secondary;
    color: $text-secondary;
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
}

.banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.5s;
  cursor: pointer;
  
  &.active {
    opacity: 1;
  }
}

.banner-image {
  width: 100%;
  height: 100%;
}

.banner-tag {
  position: absolute;
  top: $spacing-md;
  left: $spacing-md;
  background: $primary-color;
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
  color: $text-secondary;
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
    background: $bg-tertiary;
    cursor: pointer;
    transition: all 0.3s;
    
    &.active {
      width: 20px;
      border-radius: 3px;
      background: $primary-color;
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
    color: $text-tertiary;
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
  background: $vip-gradient;
  padding: 2px 6px;
  border-radius: $radius-sm;
  font-size: 10px;
  font-weight: 600;
  color: #000;
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
  color: $text-tertiary;
  margin-top: $spacing-xs;
}
</style>
