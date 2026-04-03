<template>
  <div class="activity-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">活动中心</div>
    </header>

    <!-- 活动轮播 -->
    <div class="activity-banner">
      <van-image :src="currentActivity.banner" fit="cover" class="banner-image" />
      <div class="banner-info">
        <h2>{{ currentActivity.title }}</h2>
        <p>{{ currentActivity.subtitle }}</p>
        <van-button type="danger" round @click="joinActivity(currentActivity)">立即参与</van-button>
      </div>
    </div>

    <!-- 活动列表 -->
    <div class="activity-section">
      <h3>🔥 限时活动</h3>
      <div class="activity-list">
        <div 
          class="activity-item" 
          v-for="item in limitedActivities" 
          :key="item.id"
          @click="handleActivityClick(item)"
        >
          <van-image :src="item.image" fit="cover" class="activity-image" />
          <div class="activity-info">
            <div class="activity-title">{{ item.title }}</div>
            <div class="activity-time">
              <van-icon name="clock-o" size="14" />
              {{ item.remainTime }}
            </div>
            <div class="activity-reward">
              <van-tag type="danger" size="small">{{ item.reward }}</van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 常规活动 -->
    <div class="activity-section">
      <h3>🎁 常规活动</h3>
      <div class="activity-list">
        <div 
          class="activity-item" 
          v-for="item in normalActivities" 
          :key="item.id"
          @click="handleActivityClick(item)"
        >
          <van-image :src="item.image" fit="cover" class="activity-image" />
          <div class="activity-info">
            <div class="activity-title">{{ item.title }}</div>
            <div class="activity-desc">{{ item.description }}</div>
            <div class="activity-reward">
              <van-tag type="warning" size="small">{{ item.reward }}</van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const currentActivity = ref({
  id: 1,
  title: 'VIP年卡5折',
  subtitle: '限时特惠，错过再等一年',
  banner: '/drama-h5/images/activities/activity-1.jpg'
})

const limitedActivities = ref([
  { id: 1, title: 'VIP年卡5折', image: '/drama-h5/images/activities/activity-1.jpg', remainTime: '剩余23小时', reward: '限时5折' },
  { id: 2, title: '新用户专享礼包', image: '/drama-h5/images/activities/activity-2.jpg', remainTime: '剩余3天', reward: '送50积分' },
  { id: 3, title: '邀请好友得奖励', image: '/drama-h5/images/activities/activity-3.jpg', remainTime: '长期有效', reward: '双方各得20积分' }
])

const normalActivities = ref([
  { id: 4, title: '每日签到', image: '/drama-h5/images/activities/activity-4.jpg', description: '连续签到7天额外奖励', reward: '最高50积分' },
  { id: 5, title: '观看有礼', image: '/drama-h5/images/activities/activity-5.jpg', description: '观看短剧获得积分', reward: '每集5积分' },
  { id: 6, title: '分享有奖', image: '/drama-h5/images/activities/activity-1.jpg', description: '分享短剧给好友', reward: '每次10积分' }
])

function joinActivity(activity) {
  if (activity.title.includes('VIP')) {
    router.push('/pay?type=vip')
  } else {
    showToast('已参与活动')
  }
}

function handleActivityClick(item) {
  if (item.title === '每日签到') {
    router.push('/task')
  } else if (item.title.includes('VIP')) {
    router.push('/pay?type=vip')
  } else if (item.title === '邀请好友得奖励') {
    router.push('/invite')
  } else {
    showToast(item.title)
  }
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.activity-page {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 20px;
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

.activity-banner {
  margin: 66px 16px 16px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 2/1;
}

.banner-image {
  width: 100%;
  height: 100%;
}

.banner-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 12px;
  }
}

.activity-section {
  padding: 0 16px;
  margin-bottom: 24px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  gap: 12px;
  background: $bg-secondary;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  
  &:active {
    background: $bg-tertiary;
  }
}

.activity-image {
  width: 120px;
  height: 80px;
  flex-shrink: 0;
}

.activity-info {
  flex: 1;
  padding: 12px 12px 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.activity-title {
  font-size: 15px;
  font-weight: 500;
}

.activity-time {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: $primary-color;
}

.activity-desc {
  font-size: 12px;
  color: $text-tertiary;
}

.activity-reward {
  :deep(.van-tag) {
    margin-top: 4px;
  }
}
</style>
