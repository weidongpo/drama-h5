<template>
  <div class="favorite-page">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-title">我的收藏</div>
    </header>

    <!-- 分类标签 -->
    <van-tabs v-model:active="activeTab" sticky offset-top="50px" class="tabs">
      <van-tab title="短剧" :name="0">
        <div class="favorite-grid">
          <div 
            class="drama-card" 
            v-for="item in dramaList" 
            :key="item.id"
            @click="handleDramaClick(item)"
          >
            <div class="drama-cover">
              <van-image :src="item.cover" fit="cover" width="100%" height="100%" class="cover-image" />
              <div class="vip-tag" v-if="item.isVip">VIP</div>
              <div class="heart-icon">
                <van-icon name="like" color="#ff4757" />
              </div>
            </div>
            <div class="drama-title">{{ item.title }}</div>
            <div class="drama-meta">{{ item.views }}次播放</div>
          </div>
        </div>
      </van-tab>
      
      <van-tab title="演员" :name="1">
        <div class="actor-list">
          <div class="actor-item" v-for="item in actorList" :key="item.id">
            <van-image :src="item.avatar" round width="60" height="60" fit="cover" />
            <div class="actor-info">
              <div class="actor-name">{{ item.name }}</div>
              <div class="actor-works">{{ item.works }}部作品</div>
            </div>
            <van-button size="small" round>关注</van-button>
          </div>
        </div>
      </van-tab>
      
      <van-tab title="导演" :name="2">
        <div class="director-list">
          <div class="director-item" v-for="item in directorList" :key="item.id">
            <van-image :src="item.avatar" round width="60" height="60" fit="cover" />
            <div class="director-info">
              <div class="director-name">{{ item.name }}</div>
              <div class="director-works">{{ item.works }}部作品</div>
            </div>
            <van-button size="small" round>关注</van-button>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()

const activeTab = ref(0)
const dramaList = ref([])
const actorList = ref([])
const directorList = ref([])

onMounted(() => {
  // 模拟数据
  dramaList.value = [
    { id: 1, title: '豪门千金的逆袭', cover: 'https://picsum.photos/300/400?random=20', views: '1.8亿', isVip: true },
    { id: 2, title: '重生之商业女王', cover: 'https://picsum.photos/300/400?random=21', views: '1.2亿', isVip: false },
    { id: 3, title: '穿越之医妃倾天下', cover: 'https://picsum.photos/300/400?random=22', views: '9800万', isVip: true },
    { id: 4, title: '总裁的替身新娘', cover: 'https://picsum.photos/300/400?random=23', views: '8500万', isVip: false },
    { id: 5, title: '落魄千金复仇记', cover: 'https://picsum.photos/300/400?random=24', views: '7200万', isVip: true },
    { id: 6, title: '隐世高手在都市', cover: 'https://picsum.photos/300/400?random=25', views: '6800万', isVip: false },
    { id: 7, title: '消失的新娘', cover: 'https://picsum.photos/300/400?random=26', views: '5500万', isVip: true },
    { id: 8, title: '迷雾追踪', cover: 'https://picsum.photos/300/400?random=27', views: '4800万', isVip: false },
    { id: 9, title: '霸道总裁的小娇妻', cover: 'https://picsum.photos/300/400?random=28', views: '8900万', isVip: true },
    { id: 10, title: '凤逆天下：废材七小姐', cover: 'https://picsum.photos/300/400?random=29', views: '9200万', isVip: true },
    { id: 11, title: '绝世武神', cover: 'https://picsum.photos/300/400?random=30', views: '1.5亿', isVip: true },
    { id: 12, title: '国民老公带回家', cover: 'https://picsum.photos/300/400?random=31', views: '7800万', isVip: false }
  ]
  
  actorList.value = [
    { id: 1, name: '林雨晴', avatar: 'https://picsum.photos/120/120?random=30', works: 28 },
    { id: 2, name: '陈思远', avatar: 'https://picsum.photos/120/120?random=31', works: 35 },
    { id: 3, name: '苏婉儿', avatar: 'https://picsum.photos/120/120?random=32', works: 22 },
    { id: 4, name: '王浩然', avatar: 'https://picsum.photos/120/120?random=33', works: 42 },
    { id: 5, name: '李梦瑶', avatar: 'https://picsum.photos/120/120?random=34', works: 18 },
    { id: 6, name: '张子轩', avatar: 'https://picsum.photos/120/120?random=35', works: 31 }
  ]
  
  directorList.value = [
    { id: 1, name: '张艺', avatar: 'https://picsum.photos/120/120?random=40', works: 15 },
    { id: 2, name: '李明', avatar: 'https://picsum.photos/120/120?random=41', works: 12 },
    { id: 3, name: '王导', avatar: 'https://picsum.photos/120/120?random=42', works: 28 },
    { id: 4, name: '陈导', avatar: 'https://picsum.photos/120/120?random=43', works: 20 }
  ]
})

function handleDramaClick(item) {
  router.push(`/detail/${item.id}`)
}
</script>

<style lang="scss" scoped>
.favorite-page {
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
  background: $bg-color;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-bottom: 1px solid $border-light;
}

.header-title {
  font-size: 17px;
  font-weight: 600;
}

.tabs {
  padding-top: $header-height;
  
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

.favorite-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  padding: $spacing-lg;
}

.drama-card {
  cursor: pointer;
  transition: transform 0.3s;
  min-width: 0;
  overflow: hidden;
  
  &:active {
    transform: scale(0.95);
  }
}

.drama-cover {
  position: relative;
  width: 100%;
  padding-bottom: 133.33%;
  border-radius: $radius-md;
  overflow: hidden;
  margin-bottom: $spacing-sm;
}

.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

:deep(.cover-image .van-image__img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

.heart-icon {
  position: absolute;
  bottom: $spacing-sm;
  right: $spacing-sm;
  width: 24px;
  height: 24px;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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

.actor-list, .director-list {
  padding: $spacing-lg;
}

.actor-item, .director-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md 0;
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
  margin-bottom: $spacing-xs;
}

.actor-works, .director-works {
  font-size: 12px;
  color: $text-tertiary;
}
</style>
