<template>
  <div class="search-page">
    <!-- 搜索头部 -->
    <div class="search-header">
      <van-search
        v-model="searchText"
        placeholder="搜索短剧、演员、导演"
        shape="round"
        show-action
        autofocus
        @search="handleSearch"
        @cancel="goBack"
      />
    </div>

    <!-- 搜索历史 -->
    <div class="search-section" v-if="!searchText && searchHistory.length">
      <div class="section-header">
        <h3>搜索历史</h3>
        <van-icon name="delete-o" size="20" color="#999" @click="clearHistory" />
      </div>
      <div class="history-tags">
        <van-tag 
          v-for="item in searchHistory" 
          :key="item"
          size="large"
          round
          class="history-tag"
          @click="quickSearch(item)"
        >
          {{ item }}
        </van-tag>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div class="search-section" v-if="!searchText">
      <div class="section-header">
        <h3>🔥 热门搜索</h3>
      </div>
      <div class="hot-list">
        <div 
          class="hot-item" 
          v-for="(item, index) in hotSearchList" 
          :key="item.id"
          @click="quickSearch(item.keyword)"
        >
          <div class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</div>
          <div class="hot-content">
            <div class="hot-keyword">{{ item.keyword }}</div>
            <div class="hot-meta">
              <van-tag v-if="item.isHot" type="danger" size="small">热</van-tag>
              <van-tag v-if="item.isNew" type="primary" size="small">新</van-tag>
              <span class="hot-count">{{ item.searchCount }}人搜索</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="search-section" v-if="!searchText">
      <div class="section-header">
        <h3>💡 猜你喜欢</h3>
        <span class="refresh-btn" @click="refreshRecommend">
          <van-icon name="replay" size="16" />
          换一批
        </span>
      </div>
      <div class="recommend-grid">
        <div 
          class="recommend-item" 
          v-for="item in recommendList" 
          :key="item.id"
          @click="handleDramaClick(item)"
        >
          <div class="recommend-cover">
            <van-image :src="item.cover" fit="cover" class="cover-image" />
            <div class="vip-tag" v-if="item.isVip">VIP</div>
          </div>
          <div class="recommend-title">{{ item.title }}</div>
          <div class="recommend-meta">{{ item.views }}次播放</div>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search-results" v-if="searchText && hasSearched">
      <!-- 分类标签 -->
      <van-tabs v-model:active="resultTab" sticky offset-top="54px">
        <van-tab title="短剧" :name="'drama'">
          <div class="result-list">
            <div 
              class="drama-item" 
              v-for="item in dramaResults" 
              :key="item.id"
              @click="handleDramaClick(item)"
            >
              <div class="drama-cover">
                <van-image :src="item.cover" fit="cover" class="cover-image" />
                <div class="update-tag">{{ item.status === 'completed' ? '全' : '更新至' }}{{ item.episodes }}集</div>
              </div>
              <div class="drama-info">
                <div class="drama-title" v-html="highlightKeyword(item.title)"></div>
                <div class="drama-tags">
                  <van-tag v-for="tag in item.tags" :key="tag" plain type="primary" size="small">{{ tag }}</van-tag>
                </div>
                <div class="drama-desc">{{ item.description }}</div>
                <div class="drama-meta">
                  <span>{{ item.views }}次播放</span>
                  <span>{{ item.likes }}人点赞</span>
                </div>
              </div>
            </div>
            
            <van-empty v-if="!dramaResults.length" description="暂无相关短剧" />
          </div>
        </van-tab>
        
        <van-tab title="演员" :name="'actor'">
          <div class="actor-list">
            <div 
              class="actor-item" 
              v-for="item in actorResults" 
              :key="item.id"
              @click="handleActorClick(item)"
            >
              <van-image :src="item.avatar" round width="60" height="60" fit="cover" />
              <div class="actor-info">
                <div class="actor-name" v-html="highlightKeyword(item.name)"></div>
                <div class="actor-meta">
                  <span>{{ item.works }}部作品</span>
                  <span>{{ item.followers }}粉丝</span>
                </div>
                <div class="actor-works">
                  代表作: {{ item.representativeWorks }}
                </div>
              </div>
              <van-button size="small" round @click.stop="handleFollow(item)">
                {{ item.isFollowed ? '已关注' : '关注' }}
              </van-button>
            </div>
            
            <van-empty v-if="!actorResults.length" description="暂无相关演员" />
          </div>
        </van-tab>
        
        <van-tab title="导演" :name="'director'">
          <div class="director-list">
            <div 
              class="director-item" 
              v-for="item in directorResults" 
              :key="item.id"
              @click="handleDirectorClick(item)"
            >
              <van-image :src="item.avatar" round width="60" height="60" fit="cover" />
              <div class="director-info">
                <div class="director-name" v-html="highlightKeyword(item.name)"></div>
                <div class="director-meta">
                  <span>{{ item.works }}部作品</span>
                  <span>{{ item.followers }}粉丝</span>
                </div>
                <div class="director-works">
                  代表作: {{ item.representativeWorks }}
                </div>
              </div>
              <van-button size="small" round @click.stop="handleFollow(item)">
                {{ item.isFollowed ? '已关注' : '关注' }}
              </van-button>
            </div>
            
            <van-empty v-if="!directorResults.length" description="暂无相关导演" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const searchText = ref('')
const hasSearched = ref(false)
const resultTab = ref('drama')
const searchHistory = ref([])

// 热门搜索
const hotSearchList = ref([
  { id: 1, keyword: '豪门千金', searchCount: '128万', isHot: true },
  { id: 2, keyword: '重生逆袭', searchCount: '98万', isHot: true },
  { id: 3, keyword: '甜宠霸总', searchCount: '86万', isHot: true },
  { id: 4, keyword: '穿越古装', searchCount: '72万', isNew: true },
  { id: 5, keyword: '复仇爽剧', searchCount: '65万' },
  { id: 6, keyword: '都市言情', searchCount: '58万', isNew: true },
  { id: 7, keyword: '医妃穿越', searchCount: '52万' },
  { id: 8, keyword: '闪婚甜宠', searchCount: '48万' },
  { id: 9, keyword: '总裁替身', searchCount: '42万' },
  { id: 10, keyword: '落魄千金', searchCount: '38万' }
])

// 猜你喜欢
const recommendList = ref([])

// 搜索结果
const dramaResults = ref([])
const actorResults = ref([])
const directorResults = ref([])

onMounted(() => {
  loadHistory()
  loadRecommend()
})

// 加载历史
function loadHistory() {
  const history = localStorage.getItem('searchHistory')
  if (history) {
    searchHistory.value = JSON.parse(history)
  }
}

// 加载推荐
function loadRecommend() {
  recommendList.value = [
    { id: 1, title: '豪门千金的逆袭人生', cover: '/drama-h5/images/dramas/drama-13.jpg', views: '2.3亿', isVip: true },
    { id: 2, title: '重生之商业女王', cover: '/drama-h5/images/dramas/drama-14.jpg', views: '1.8亿', isVip: true },
    { id: 3, title: '总裁的替身新娘', cover: '/drama-h5/images/dramas/drama-15.jpg', views: '1.2亿', isVip: false },
    { id: 4, title: '穿越之医妃倾天下', cover: '/drama-h5/images/dramas/drama-16.jpg', views: '9800万', isVip: true },
    { id: 5, title: '闪婚后千亿总裁宠上天', cover: '/drama-h5/images/dramas/drama-17.jpg', views: '8500万', isVip: false },
    { id: 6, title: '落魄千金复仇记', cover: '/drama-h5/images/dramas/drama-6.jpg', views: '7200万', isVip: true }
  ]
}

// 搜索
function handleSearch() {
  if (!searchText.value.trim()) {
    showToast('请输入搜索内容')
    return
  }
  
  // 保存历史
  saveHistory(searchText.value.trim())
  
  // 模拟搜索结果
  hasSearched.value = true
  
  // 短剧结果
  dramaResults.value = [
    {
      id: 1,
      title: '豪门千金的逆袭人生',
      cover: '/drama-h5/images/dramas/drama-6.jpg',
      tags: ['都市', '逆袭', '甜宠'],
      description: '豪门千金苏晚晴被继母陷害，流落街头。五年后，她华丽归来...',
      views: '2.3亿',
      likes: '128万',
      episodes: 86,
      status: 'completed'
    },
    {
      id: 2,
      title: '重生之豪门千金',
      cover: '/drama-h5/images/dramas/drama-7.jpg',
      tags: ['重生', '复仇', '爽剧'],
      description: '前世被渣男和闺蜜联手害死，重生归来，她发誓要让所有人付出代价...',
      views: '1.8亿',
      likes: '98万',
      episodes: 72,
      status: 'updating'
    }
  ]
  
  // 演员结果
  actorResults.value = [
    {
      id: 1,
      name: '林雨晴',
      avatar: 'https://i.pravatar.cc/120?img=20',
      works: 28,
      followers: '256万',
      representativeWorks: '豪门千金、重生女王',
      isFollowed: false
    },
    {
      id: 2,
      name: '陈思远',
      avatar: 'https://i.pravatar.cc/120?img=21',
      works: 35,
      followers: '189万',
      representativeWorks: '总裁的替身新娘、闪婚甜宠',
      isFollowed: true
    }
  ]
  
  // 导演结果
  directorResults.value = [
    {
      id: 1,
      name: '张艺',
      avatar: 'https://i.pravatar.cc/120?img=30',
      works: 15,
      followers: '86万',
      representativeWorks: '豪门千金系列',
      isFollowed: false
    }
  ]
}

// 快速搜索
function quickSearch(keyword) {
  searchText.value = keyword
  handleSearch()
}

// 保存历史
function saveHistory(keyword) {
  const history = searchHistory.value.filter(item => item !== keyword)
  history.unshift(keyword)
  searchHistory.value = history.slice(0, 10)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

// 清除历史
function clearHistory() {
  searchHistory.value = []
  localStorage.removeItem('searchHistory')
  showToast('已清除')
}

// 刷新推荐
function refreshRecommend() {
  loadRecommend()
  showToast('已刷新')
}

// 高亮关键词
function highlightKeyword(text) {
  if (!searchText.value) return text
  const regex = new RegExp(`(${searchText.value})`, 'gi')
  return text.replace(regex, '<span style="color: #ff4757;">$1</span>')
}

// 点击短剧
function handleDramaClick(item) {
  router.push(`/detail/${item.id}`)
}

// 点击演员
function handleActorClick(item) {
  showToast('演员详情页开发中')
}

// 点击导演
function handleDirectorClick(item) {
  showToast('导演详情页开发中')
}

// 关注
function handleFollow(item) {
  item.isFollowed = !item.isFollowed
  showToast(item.isFollowed ? '关注成功' : '已取消关注')
}

// 返回
function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.search-page {
  min-height: 100vh;
  background: $bg-color;
}

.search-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: $bg-color;
  z-index: 100;
  
  :deep(.van-search) {
    background: $bg-color;
  }
  
  :deep(.van-search__content) {
    background: $bg-secondary;
  }
  
  :deep(.van-field__control) {
    color: $text-primary;
  }
  
  :deep(.van-field__control::placeholder) {
    color: $text-tertiary;
  }
  
  :deep(.van-search__action) {
    color: $text-secondary;
  }
}

.search-section {
  padding: 70px 16px 16px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
  }
  
  .refresh-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: $text-tertiary;
  }
}

.history-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-tag {
  background: $bg-secondary;
  color: $text-secondary;
  padding: 8px 16px;
}

.hot-list {
  background: $bg-secondary;
  border-radius: 12px;
  overflow: hidden;
}

.hot-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid $border-light;
  
  &:last-child {
    border-bottom: none;
  }
}

.hot-rank {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: $text-tertiary;
  margin-right: 12px;
  
  &.top {
    color: #ff4757;
  }
}

.hot-content {
  flex: 1;
}

.hot-keyword {
  font-size: 15px;
  margin-bottom: 4px;
}

.hot-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .hot-count {
    font-size: 12px;
    color: $text-tertiary;
  }
}

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.recommend-item {
  cursor: pointer;
}

.recommend-cover {
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
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

.recommend-title {
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend-meta {
  font-size: 11px;
  color: $text-tertiary;
  margin-top: 4px;
}

// 搜索结果
.search-results {
  padding-top: 54px;
  
  :deep(.van-tabs__nav) {
    background: $bg-color;
  }
  
  :deep(.van-tab) {
    color: $text-tertiary;
  }
  
  :deep(.van-tab--active) {
    color: $text-primary;
  }
  
  :deep(.van-tabs__line) {
    background: $primary-color;
  }
}

.result-list, .actor-list, .director-list {
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
  width: 100px;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.update-tag {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(#ff4757, 0.9);
  font-size: 10px;
  padding: 3px 0;
  text-align: center;
}

.drama-info {
  flex: 1;
}

.drama-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
}

.drama-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
  
  :deep(.van-tag) {
    background: $bg-secondary;
    border-color: transparent;
    color: $text-secondary;
  }
}

.drama-desc {
  font-size: 12px;
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
  font-size: 11px;
  color: $text-tertiary;
}

.actor-item, .director-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid $border-light;
  
  &:last-child {
    border-bottom: none;
  }
}

.actor-info, .director-info {
  flex: 1;
}

.actor-name, .director-name {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
}

.actor-meta, .director-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: $text-tertiary;
  margin-bottom: 4px;
}

.actor-works, .director-works {
  font-size: 12px;
  color: $text-secondary;
}
</style>
