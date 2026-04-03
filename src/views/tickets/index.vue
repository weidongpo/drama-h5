<template>
  <div class="tickets-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">观影券</div>
      <div class="header-right"></div>
    </header>

    <!-- 观影券余额 -->
    <div class="balance-card">
      <div class="balance-info">
        <div class="balance-label">当前观影券</div>
        <div class="balance-value">{{ tickets }}</div>
      </div>
      <van-button type="danger" round @click="handleBuy">购买观影券</van-button>
    </div>

    <!-- 使用记录 -->
    <div class="section">
      <div class="section-title">使用记录</div>
      <div class="record-list">
        <div class="record-item" v-for="item in records" :key="item.id">
          <div class="record-info">
            <div class="record-title">{{ item.title }}</div>
            <div class="record-time">{{ item.time }}</div>
          </div>
          <div class="record-amount" :class="{ expense: item.type === 'expense' }">
            {{ item.type === 'expense' ? '-' : '+' }}{{ item.amount }}
          </div>
        </div>
      </div>
    </div>

    <!-- 获取方式 -->
    <div class="section">
      <div class="section-title">如何获取观影券</div>
      <div class="ways-list">
        <div class="way-item" @click="goTo('/task')">
          <van-icon name="todo-list-o" size="24" color="#ff4757" />
          <div class="way-info">
            <div class="way-title">完成任务</div>
            <div class="way-desc">完成每日任务获取观影券</div>
          </div>
          <van-icon name="arrow" color="#666" />
        </div>
        <div class="way-item" @click="goTo('/invite')">
          <van-icon name="friends-o" size="24" color="#ff4757" />
          <div class="way-info">
            <div class="way-title">邀请好友</div>
            <div class="way-desc">每邀请一位好友获得观影券</div>
          </div>
          <van-icon name="arrow" color="#666" />
        </div>
        <div class="way-item" @click="handleBuy">
          <van-icon name="shopping-cart-o" size="24" color="#ff4757" />
          <div class="way-info">
            <div class="way-title">购买观影券</div>
            <div class="way-desc">充值购买观影券</div>
          </div>
          <van-icon name="arrow" color="#666" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tickets = ref(12)

const records = ref([
  { id: 1, title: '解锁《豪门千金的逆袭人生》第33集', time: '2026-04-02 10:30', amount: 1, type: 'expense' },
  { id: 2, title: '每日签到奖励', time: '2026-04-02 08:00', amount: 2, type: 'income' },
  { id: 3, title: '解锁《重生之商业女王》第57集', time: '2026-04-01 21:15', amount: 1, type: 'expense' },
  { id: 4, title: '邀请好友奖励', time: '2026-04-01 15:20', amount: 5, type: 'income' },
  { id: 5, title: '解锁《穿越之医妃倾天下》第45集', time: '2026-03-31 20:00', amount: 1, type: 'expense' }
])

function goBack() {
  router.back()
}

function goTo(path) {
  router.push(path)
}

function handleBuy() {
  router.push('/pay?type=tickets')
}
</script>

<style lang="scss" scoped>
.tickets-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 20px;
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

.back-btn, .header-right {
  position: absolute;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn {
  left: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.header-right {
  right: 16px;
}

.header-title {
  font-size: 17px;
  font-weight: 600;
}

.balance-card {
  margin: 60px 16px 16px;
  background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.balance-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.balance-value {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
}

.section {
  padding: 0 16px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
}

.record-list {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
}

.record-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-light);
  
  &:last-child {
    border-bottom: none;
  }
}

.record-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.record-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.record-amount {
  font-size: 16px;
  font-weight: 600;
  color: #4cd137;
  
  &.expense {
    color: #ff4757;
  }
}

.ways-list {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
}

.way-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:active {
    background: var(--bg-tertiary);
  }
}

.way-info {
  flex: 1;
}

.way-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.way-desc {
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
