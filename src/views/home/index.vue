<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-title">🔥 追剧达人</div>
      <div class="header-icons">
        <van-icon name="bell" size="24" color="#fff" />
        <van-icon name="user-o" size="24" color="#fff" />
      </div>
    </header>

    <!-- 搜索栏 -->
    <div class="search-bar">
      <van-search 
        v-model="searchText" 
        placeholder="搜索短剧、演员、导演" 
        shape="round"
        background="transparent"
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
    <div class="banner" @click="handleBannerClick(banners[0])" v-if="banners.length">
      <van-image :src="banners[0].image" fit="cover" class="banner-image" />
      <div class="banner-tag" v-if="banners[0].tag">{{ banners[0].tag }}</div>
      <div class="banner-info">
        <div class="banner-title">{{ banners[0].title }}</div>
        <div class="banner-desc">播放量 {{ banners[0].views }} | 更新至第{{ banners[0].episodes }}集</div>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="section">
      <div class="section-title">
        <span>🔥 热门推荐</span>
        <span class="more">查看更多 ></span>
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

onMounted(async () => {
  // 加载数据
  banners.value = await dramaStore.fetchBanners()
  recommendList.value = await dramaStore.fetchRecommend()
})

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
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 70px;
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

.banner {
  margin: 0 $spacing-lg $spacing-xl;
  border-radius: $radius-lg;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16/9;
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

.section {
  padding: 0 $spacing-lg;
  margin-bottom: $spacing-xl;
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
}

.drama-meta {
  font-size: 11px;
  color: $text-tertiary;
  margin-top: $spacing-xs;
}
</style>
