<template>
  <div class="task-page">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-title">任务中心</div>
    </header>

    <!-- 积分卡片 -->
    <div class="points-card">
      <div class="points-label">我的积分</div>
      <div class="points-value">{{ points }} <span>个</span></div>
      <div class="points-actions">
        <van-button type="primary" round size="small" @click="handleRecharge">充值积分</van-button>
        <van-button round size="small" @click="handleWithdraw">提现</van-button>
      </div>
    </div>

    <!-- 每日任务 -->
    <div class="task-section">
      <div class="section-title">📅 每日任务</div>
      
      <div class="task-item" v-for="task in dailyTasks" :key="task.id">
        <div class="task-icon">{{ task.icon }}</div>
        <div class="task-info">
          <div class="task-name">{{ task.name }}</div>
          <div class="task-desc">{{ task.desc }}</div>
          <div class="task-reward">+{{ task.reward }} 积分</div>
          <div class="task-progress" v-if="task.progress !== undefined">
            <van-progress 
              :percentage="(task.progress / task.total) * 100" 
              stroke-width="4"
              color="linear-gradient(90deg, #ff4757, #ff6b81)"
            />
            <div class="progress-text">{{ task.progress }}/{{ task.total }} {{ task.unit }}</div>
          </div>
        </div>
        <van-button 
          :type="task.status === 'done' ? 'default' : (task.status === 'claim' ? 'warning' : 'danger')" 
          size="small" 
          round
          :disabled="task.status === 'done'"
          @click="handleTaskClick(task)"
        >
          {{ task.status === 'done' ? '已完成' : (task.status === 'claim' ? '领取' : '去完成') }}
        </van-button>
      </div>
    </div>

    <!-- 成长任务 -->
    <div class="task-section">
      <div class="section-title">🎯 成长任务</div>
      
      <div class="task-item" v-for="task in growthTasks" :key="task.id">
        <div class="task-icon">{{ task.icon }}</div>
        <div class="task-info">
          <div class="task-name">{{ task.name }}</div>
          <div class="task-desc">{{ task.desc }}</div>
          <div class="task-reward">+{{ task.reward }} 积分</div>
          <div class="task-progress">
            <van-progress 
              :percentage="(task.progress / task.total) * 100" 
              stroke-width="4"
              color="linear-gradient(90deg, #ff4757, #ff6b81)"
            />
            <div class="progress-text">{{ task.progress }}/{{ task.total }} {{ task.unit }}</div>
          </div>
        </div>
        <van-button type="danger" size="small" round @click="handleTaskClick(task)">
          去完成
        </van-button>
      </div>
    </div>

    <!-- 底部导航 -->
    <BottomNav />

    <!-- 分享弹窗 -->
    <van-share-sheet
      v-model:show="showShareSheet"
      title="立即分享给好友"
      :options="shareOptions"
      @select="handleShareSelect"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()

const points = ref(2580)
const dailyTasks = ref([])
const growthTasks = ref([])

onMounted(() => {
  // 模拟数据
  dailyTasks.value = [
    { 
      id: 1, 
      icon: '👀', 
      name: '观看短剧', 
      desc: '观看任意短剧5分钟', 
      reward: 10,
      progress: 3,
      total: 5,
      unit: '分钟',
      status: 'go',
      type: 'watch'
    },
    { 
      id: 2, 
      icon: '📤', 
      name: '分享短剧', 
      desc: '分享短剧给好友', 
      reward: 20,
      status: 'go',
      type: 'share'
    },
    { 
      id: 3, 
      icon: '❤️', 
      name: '收藏短剧', 
      desc: '收藏任意3部短剧', 
      reward: 15,
      progress: 3,
      total: 3,
      unit: '部',
      status: 'claim',
      type: 'favorite'
    },
    { 
      id: 4, 
      icon: '✅', 
      name: '每日签到', 
      desc: '连续签到7天额外奖励', 
      reward: 5,
      status: 'done',
      type: 'checkin'
    }
  ]
  
  growthTasks.value = [
    { 
      id: 5, 
      icon: '🎬', 
      name: '观剧达人', 
      desc: '累计观看100集短剧', 
      reward: 100,
      progress: 45,
      total: 100,
      unit: '集',
      status: 'go',
      type: 'watch'
    },
    { 
      id: 6, 
      icon: '👥', 
      name: '邀请好友', 
      desc: '邀请5位好友', 
      reward: 200,
      progress: 1,
      total: 5,
      unit: '人',
      status: 'go',
      type: 'invite'
    }
  ]
})

function handleRecharge() {
  router.push('/recharge')
}

function handleWithdraw() {
  router.push('/withdraw')
}

function handleTaskClick(task) {
  if (task.status === 'claim') {
    // 领取奖励
    points.value += task.reward
    task.status = 'done'
    showToast(`恭喜获得 ${task.reward} 积分！`)
    return
  }
  
  if (task.status === 'go') {
    // 根据任务类型跳转
    switch (task.type) {
      case 'watch':
        // 跳转首页观看短剧
        router.push('/')
        break
      case 'share':
        // 显示分享弹窗
        showShareSheet.value = true
        break
      case 'favorite':
        // 跳转收藏页
        router.push('/favorite')
        break
      case 'checkin':
        // 签到
        handleCheckin(task)
        break
      case 'invite':
        // 跳转邀请页
        router.push('/invite')
        break
      default:
        showToast('任务页面开发中')
    }
  }
}

function handleCheckin(task) {
  points.value += task.reward
  task.status = 'done'
  showToast('签到成功！')
}

const showShareSheet = ref(false)

const shareOptions = [
  { name: '微信', icon: 'wechat' },
  { name: '朋友圈', icon: 'wechat-moments' },
  { name: '复制链接', icon: 'link' }
]

function handleShareSelect(option) {
  showShareSheet.value = false
  showToast(`分享到${option.name}`)
}
</script>

<style lang="scss" scoped>
.task-page {
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

.points-card {
  margin: 60px $spacing-lg $spacing-xl;
  background: $primary-gradient;
  border-radius: $radius-xl;
  padding: $spacing-xxl;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
  }
}

.points-label {
  font-size: 13px;
  color: rgba(255,255,255,0.8);
  margin-bottom: $spacing-sm;
}

.points-value {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: $spacing-lg;
  
  span {
    font-size: 14px;
    font-weight: 400;
  }
}

.points-actions {
  display: flex;
  gap: $spacing-md;
  
  .van-button {
    flex: 1;
  }
}

.task-section {
  padding: 0 $spacing-lg;
  margin-bottom: $spacing-xl;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: $spacing-lg;
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.task-item {
  display: flex;
  align-items: center;
  padding: $spacing-lg;
  background: $bg-secondary;
  border-radius: $radius-lg;
  margin-bottom: $spacing-md;
}

.task-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, $bg-tertiary 0%, $bg-secondary 100%);
  border-radius: $radius-lg;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: $spacing-md;
  font-size: 24px;
}

.task-info {
  flex: 1;
}

.task-name {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: $spacing-xs;
}

.task-desc {
  font-size: 12px;
  color: $text-tertiary;
}

.task-reward {
  font-size: 14px;
  color: #ffd700;
  font-weight: 500;
  margin-bottom: $spacing-xs;
}

.task-progress {
  margin-top: $spacing-sm;
}

.progress-text {
  font-size: 11px;
  color: $text-tertiary;
  margin-top: $spacing-xs;
}
</style>
