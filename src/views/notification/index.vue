<template>
  <div class="notification-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">消息通知</div>
    </header>

    <!-- 消息分类 -->
    <van-tabs v-model:active="activeTab" sticky offset-top="50px">
      <van-tab title="全部" :name="'all'">
        <div class="notification-list">
          <div 
            class="notification-item" 
            v-for="item in allNotifications" 
            :key="item.id"
            @click="handleNotificationClick(item)"
          >
            <div class="notification-icon" :class="item.type">
              <van-icon :name="getIconName(item.type)" size="24" />
            </div>
            <div class="notification-content">
              <div class="notification-title">{{ item.title }}</div>
              <div class="notification-desc">{{ item.content }}</div>
              <div class="notification-time">{{ item.time }}</div>
            </div>
            <div class="notification-badge" v-if="!item.read"></div>
          </div>
          
          <van-empty v-if="!allNotifications.length" description="暂无消息" />
        </div>
      </van-tab>
      
      <van-tab title="系统" :name="'system'">
        <div class="notification-list">
          <div 
            class="notification-item" 
            v-for="item in systemNotifications" 
            :key="item.id"
            @click="handleNotificationClick(item)"
          >
            <div class="notification-icon system">
              <van-icon name="info-o" size="24" />
            </div>
            <div class="notification-content">
              <div class="notification-title">{{ item.title }}</div>
              <div class="notification-desc">{{ item.content }}</div>
              <div class="notification-time">{{ item.time }}</div>
            </div>
          </div>
          
          <van-empty v-if="!systemNotifications.length" description="暂无系统消息" />
        </div>
      </van-tab>
      
      <van-tab title="活动" :name="'activity'">
        <div class="notification-list">
          <div 
            class="notification-item" 
            v-for="item in activityNotifications" 
            :key="item.id"
            @click="handleNotificationClick(item)"
          >
            <div class="notification-icon activity">
              <van-icon name="gift-o" size="24" />
            </div>
            <div class="notification-content">
              <div class="notification-title">{{ item.title }}</div>
              <div class="notification-desc">{{ item.content }}</div>
              <div class="notification-time">{{ item.time }}</div>
            </div>
          </div>
          
          <van-empty v-if="!activityNotifications.length" description="暂无活动消息" />
        </div>
      </van-tab>
      
      <van-tab title="更新" :name="'update'">
        <div class="notification-list">
          <div 
            class="notification-item" 
            v-for="item in updateNotifications" 
            :key="item.id"
            @click="handleNotificationClick(item)"
          >
            <div class="notification-icon update">
              <van-icon name="tv-o" size="24" />
            </div>
            <div class="notification-content">
              <div class="notification-title">{{ item.title }}</div>
              <div class="notification-desc">{{ item.content }}</div>
              <div class="notification-time">{{ item.time }}</div>
            </div>
          </div>
          
          <van-empty v-if="!updateNotifications.length" description="暂无更新消息" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const activeTab = ref('all')

const notifications = ref([
  { id: 1, type: 'update', title: '《豪门千金的逆袭人生》更新啦', content: '第87集已上线，快来看看吧！', time: '刚刚', read: false },
  { id: 2, type: 'activity', title: '限时活动：VIP年卡5折', content: '仅限今天，错过再等一年！', time: '10分钟前', read: false },
  { id: 3, type: 'system', title: '账户安全提醒', content: '您的账户在新设备登录，如非本人操作请及时修改密码', time: '1小时前', read: true },
  { id: 4, type: 'update', title: '《重生之商业女王》更新啦', content: '第99集已上线，大结局精彩呈现！', time: '2小时前', read: true },
  { id: 5, type: 'activity', title: '签到奖励已发放', content: '连续签到7天，获得50积分奖励', time: '昨天', read: true },
  { id: 6, type: 'system', title: '新功能上线', content: '支持离线下载啦，随时随地追剧！', time: '昨天', read: true },
  { id: 7, type: 'update', title: '《穿越之医妃倾天下》更新啦', content: '第81集已上线，快来看看吧！', time: '2天前', read: true },
  { id: 8, type: 'activity', title: '邀请好友得奖励', content: '每邀请一位好友注册，双方各得20积分', time: '3天前', read: true }
])

const allNotifications = computed(() => notifications.value)
const systemNotifications = computed(() => notifications.value.filter(n => n.type === 'system'))
const activityNotifications = computed(() => notifications.value.filter(n => n.type === 'activity'))
const updateNotifications = computed(() => notifications.value.filter(n => n.type === 'update'))

function getIconName(type) {
  const icons = {
    system: 'info-o',
    activity: 'gift-o',
    update: 'tv-o'
  }
  return icons[type] || 'info-o'
}

function handleNotificationClick(item) {
  item.read = true
  
  if (item.type === 'update') {
    // 跳转到详情页
    router.push('/detail/1')
  } else if (item.type === 'activity') {
    // 跳转到活动页
    router.push('/activity')
  } else {
    showToast(item.content)
  }
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.notification-page {
  min-height: 100vh;
  background: var(--bg-color);
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

:deep(.van-tabs__nav) {
  background: var(--bg-color);
}

:deep(.van-tab) {
  color: var(--text-tertiary);
}

:deep(.van-tab--active) {
  color: var(--text-primary);
}

:deep(.van-tabs__line) {
  background: var(--primary-color);
}

.notification-list {
  padding: 12px 16px;
  margin-top: 44px; // 为 sticky tabs 留出空间
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  position: relative;
  
  &:active {
    background: var(--bg-tertiary);
  }
}

.notification-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &.system {
    background: rgba(#1677ff, 0.15);
    color: #1677ff;
  }
  
  &.activity {
    background: rgba(#ff9500, 0.15);
    color: #ff9500;
  }
  
  &.update {
    background: rgba(var(--primary-color), 0.15);
    color: var(--primary-color);
  }
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
}

.notification-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notification-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.notification-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
}
</style>
