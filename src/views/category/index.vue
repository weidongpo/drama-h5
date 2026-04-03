<template>
  <div class="category-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">{{ currentCategory?.name || '全部短剧' }}</div>
      <div class="filter-btn" @click="showFilter = true">
        <van-icon name="filter-o" size="20" color="#fff" />
      </div>
    </header>

    <!-- 分类标签 -->
    <div class="category-tabs">
      <div 
        class="category-tab" 
        :class="{ active: activeCategory === 0 }"
        @click="changeCategory(0)"
      >
        全部
      </div>
      <div 
        class="category-tab" 
        :class="{ active: activeCategory === cat.id }"
        v-for="cat in categories" 
        :key="cat.id"
        @click="changeCategory(cat.id)"
      >
        {{ cat.name }}
      </div>
    </div>

    <!-- 排序 -->
    <div class="sort-bar">
      <div 
        class="sort-item" 
        :class="{ active: sortBy === 'hot' }"
        @click="changeSort('hot')"
      >
        最热
      </div>
      <div 
        class="sort-item" 
        :class="{ active: sortBy === 'new' }"
        @click="changeSort('new')"
      >
        最新
      </div>
      <div 
        class="sort-item" 
        :class="{ active: sortBy === 'rating' }"
        @click="changeSort('rating')"
      >
        评分
      </div>
    </div>

    <!-- 短剧列表 -->
    <div class="drama-list">
      <div 
        class="drama-item" 
        v-for="item in dramaList" 
        :key="item.id"
        @click="handleDramaClick(item)"
      >
        <div class="drama-cover">
          <van-image :src="item.cover" fit="cover" class="cover-image" />
          <div class="vip-tag" v-if="item.isVip">VIP</div>
          <div class="update-tag">{{ item.status === 'completed' ? '全' : '更新至' }}{{ item.episodes }}集</div>
          <div class="rating" v-if="item.rating">
            <van-icon name="star" color="#ffd700" size="12" />
            {{ item.rating }}
          </div>
        </div>
        <div class="drama-info">
          <div class="drama-title">{{ item.title }}</div>
          <div class="drama-tags">
            <van-tag v-for="tag in item.tags?.slice(0, 3)" :key="tag" plain type="primary" size="small">{{ tag }}</van-tag>
          </div>
          <div class="drama-desc">{{ item.description }}</div>
          <div class="drama-meta">
            <span>{{ item.views }}次播放</span>
            <span>{{ item.likes }}人点赞</span>
          </div>
        </div>
      </div>
      
      <van-empty v-if="!dramaList.length" description="暂无相关短剧" />
    </div>

    <!-- 筛选弹窗 -->
    <van-popup 
      v-model:show="showFilter" 
      position="bottom" 
      round 
      teleport="body"
      :style="{ background: '#1a1a1a' }"
    >
      <div class="filter-popup">
        <div class="popup-header">
          <h3>筛选</h3>
          <van-icon name="cross" size="24" color="#fff" @click="showFilter = false" />
        </div>
        
        <div class="filter-section">
          <h4>状态</h4>
          <div class="filter-options">
            <div 
              class="filter-option" 
              :class="{ active: filterStatus === 'all' }"
              @click="filterStatus = 'all'"
            >
              全部
            </div>
            <div 
              class="filter-option" 
              :class="{ active: filterStatus === 'updating' }"
              @click="filterStatus = 'updating'"
            >
              更新中
            </div>
            <div 
              class="filter-option" 
              :class="{ active: filterStatus === 'completed' }"
              @click="filterStatus = 'completed'"
            >
              已完结
            </div>
          </div>
        </div>
        
        <div class="filter-section">
          <h4>类型</h4>
          <div class="filter-options">
            <div 
              class="filter-option" 
              :class="{ active: filterType === 'all' }"
              @click="filterType = 'all'"
            >
              全部
            </div>
            <div 
              class="filter-option" 
              :class="{ active: filterType === 'vip' }"
              @click="filterType = 'vip'"
            >
              VIP
            </div>
            <div 
              class="filter-option" 
              :class="{ active: filterType === 'free' }"
              @click="filterType = 'free'"
            >
              免费
            </div>
          </div>
        </div>
        
        <div class="filter-actions">
          <van-button block round @click="resetFilter">重置</van-button>
          <van-button type="danger" block round @click="applyFilter">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDramaStore } from '@/stores/drama'

const router = useRouter()
const route = useRoute()
const dramaStore = useDramaStore()

const activeCategory = ref(0)
const sortBy = ref('hot')
const showFilter = ref(false)
const filterStatus = ref('all')
const filterType = ref('all')

const categories = computed(() => dramaStore.categories.filter(c => c.id !== 0))
const currentCategory = computed(() => categories.value.find(c => c.id === activeCategory.value))

const allDramas = ref([
  { id: 1, title: '豪门千金的逆袭人生', cover: '/drama-h5/images/dramas/drama-1.jpg', views: '2.3亿', isVip: true, episodes: 86, status: 'completed', likes: '128万', rating: 9.2, description: '豪门千金苏晚晴被继母陷害，流落街头。五年后，她华丽归来...', tags: ['都市', '逆袭', '甜宠'] },
  { id: 2, title: '重生之商业女王', cover: '/drama-h5/images/dramas/drama-2.jpg', views: '1.8亿', isVip: false, episodes: 98, status: 'updating', likes: '98万', rating: 9.0, description: '前世被渣男和闺蜜联手害死，重生归来...', tags: ['重生', '逆袭', '商战'] },
  { id: 3, title: '穿越之医妃倾天下', cover: '/drama-h5/images/dramas/drama-3.jpg', views: '1.2亿', isVip: true, episodes: 80, status: 'completed', likes: '86万', rating: 8.8, description: '现代医学博士穿越成古代不受宠的嫡女...', tags: ['古装', '穿越', '医妃'] },
  { id: 4, title: '闪婚后千亿总裁宠上天', cover: '/drama-h5/images/dramas/drama-4.jpg', views: '9800万', isVip: false, episodes: 42, status: 'updating', likes: '72万', rating: 8.5, description: '被继母逼婚，她一怒之下随便拉了个男人领证...', tags: ['甜宠', '霸总', '闪婚'] },
  { id: 5, title: '落魄千金复仇记', cover: '/drama-h5/images/dramas/drama-5.jpg', views: '8500万', isVip: true, episodes: 60, status: 'completed', likes: '58万', rating: 8.6, description: '一夜之间家破人亡，她从天堂跌入地狱...', tags: ['复仇', '逆袭', '都市'] },
  { id: 6, title: '隐世高手在都市', cover: '/drama-h5/images/dramas/drama-6.jpg', views: '7200万', isVip: false, episodes: 55, status: 'updating', likes: '45万', rating: 8.3, description: '隐世宗门传人下山历练...', tags: ['都市', '爽文', '热血'] },
  { id: 7, title: '替身新娘：总裁的契约妻', cover: '/drama-h5/images/dramas/drama-7.jpg', views: '6800万', isVip: true, episodes: 72, status: 'completed', likes: '52万', rating: 8.4, description: '为了替妹妹还债，她被迫成为他的契约妻子...', tags: ['甜宠', '契约', '霸总'] },
  { id: 8, title: '神医毒妃', cover: '/drama-h5/images/dramas/drama-8.jpg', views: '5800万', isVip: false, episodes: 68, status: 'updating', likes: '38万', rating: 8.2, description: '她是21世纪顶级毒医，一朝穿越成为被废的太子妃...', tags: ['古装', '穿越', '毒医'] }
])

const dramaList = computed(() => {
  let list = [...allDramas.value]
  
  // 分类筛选
  if (activeCategory.value !== 0) {
    const categoryMap = {
      1: '都市',
      2: '古装',
      3: '甜宠',
      4: '霸总',
      5: '逆袭',
      6: '复仇',
      7: '悬疑'
    }
    const categoryName = categoryMap[activeCategory.value]
    if (categoryName) {
      list = list.filter(d => d.tags?.includes(categoryName))
    }
  }
  
  // 状态筛选
  if (filterStatus.value !== 'all') {
    list = list.filter(d => d.status === filterStatus.value)
  }
  
  // 类型筛选
  if (filterType.value === 'vip') {
    list = list.filter(d => d.isVip)
  } else if (filterType.value === 'free') {
    list = list.filter(d => !d.isVip)
  }
  
  // 排序
  if (sortBy.value === 'hot') {
    list.sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
  } else if (sortBy.value === 'rating') {
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }
  
  return list
})

onMounted(() => {
  const categoryId = parseInt(route.query.category)
  if (categoryId) {
    activeCategory.value = categoryId
  }
})

function changeCategory(id) {
  activeCategory.value = id
}

function changeSort(type) {
  sortBy.value = type
}

function resetFilter() {
  filterStatus.value = 'all'
  filterType.value = 'all'
}

function applyFilter() {
  showFilter.value = false
}

function handleDramaClick(item) {
  router.push(`/detail/${item.id}`)
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.category-page {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 20px;
  overflow-x: hidden;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: $bg-color;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-bottom: 1px solid $border-light;
}

.back-btn, .filter-btn {
  position: absolute;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn {
  left: 16px;
}

.filter-btn {
  right: 16px;
}

.header-title {
  font-size: 17px;
  font-weight: 600;
}

.category-tabs {
  display: flex;
  gap: 12px;
  padding: 60px 16px 12px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.category-tab {
  flex-shrink: 0;
  padding: 8px 20px;
  background: $bg-secondary;
  border-radius: 20px;
  font-size: 14px;
  color: $text-secondary;
  cursor: pointer;
  
  &.active {
    background: $primary-color;
    color: #fff;
  }
}

.sort-bar {
  display: flex;
  gap: 24px;
  padding: 12px 16px;
  border-bottom: 1px solid $border-light;
}

.sort-item {
  font-size: 14px;
  color: $text-tertiary;
  cursor: pointer;
  
  &.active {
    color: $primary-color;
    font-weight: 500;
  }
}

.drama-list {
  padding: 16px;
}

.drama-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid $border-light;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
}

.drama-cover {
  width: 120px;
  height: 160px;
  border-radius: 8px;
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
  top: 6px;
  right: 6px;
  background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #000;
}

.update-tag {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($primary-color, 0.9);
  font-size: 10px;
  padding: 3px 0;
  text-align: center;
}

.rating {
  position: absolute;
  top: 6px;
  left: 6px;
  background: rgba(0, 0, 0, 0.7);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.drama-info {
  flex: 1;
}

.drama-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
}

.drama-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
  
  :deep(.van-tag) {
    background: $bg-tertiary;
    border-color: transparent;
    color: $text-secondary;
  }
}

.drama-desc {
  font-size: 13px;
  color: $text-tertiary;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
}

.drama-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: $text-tertiary;
}

// 筛选弹窗
.filter-popup {
  background: $bg-secondary;
  padding-bottom: env(safe-area-inset-bottom);
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid $border-light;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: $text-primary;
  }
}

.filter-section {
  padding: 16px;
  
  h4 {
    font-size: 14px;
    color: $text-tertiary;
    margin-bottom: 12px;
  }
}

.filter-options {
  display: flex;
  gap: 12px;
}

.filter-option {
  padding: 8px 20px;
  background: $bg-tertiary;
  border-radius: 20px;
  font-size: 14px;
  color: $text-secondary;
  cursor: pointer;
  
  &.active {
    background: rgba($primary-color, 0.15);
    color: $primary-color;
  }
}

.filter-actions {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid $border-light;
}
</style>
