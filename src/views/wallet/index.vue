<template>
  <div class="wallet-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">我的钱包</div>
    </header>

    <!-- 余额卡片 -->
    <div class="balance-card">
      <div class="balance-info">
        <div class="balance-label">账户余额(元)</div>
        <div class="balance-value">{{ balance }}</div>
      </div>
      <div class="balance-actions">
        <van-button type="primary" round @click="handleRecharge">充值</van-button>
        <van-button round @click="handleWithdraw">提现</van-button>
      </div>
    </div>

    <!-- 收支明细 -->
    <div class="record-section">
      <van-tabs v-model:active="activeTab">
        <van-tab title="全部" :name="'all'">
          <div class="record-list">
            <div class="record-item" v-for="item in allRecords" :key="item.id">
              <div class="record-icon" :class="item.type">
                <van-icon :name="getIconName(item.type)" size="24" />
              </div>
              <div class="record-info">
                <div class="record-title">{{ item.title }}</div>
                <div class="record-time">{{ item.time }}</div>
              </div>
              <div class="record-amount" :class="{ income: item.amount > 0 }">
                {{ item.amount > 0 ? '+' : '' }}{{ item.amount }}
              </div>
            </div>
            
            <van-empty v-if="!allRecords.length" description="暂无记录" />
          </div>
        </van-tab>
        
        <van-tab title="收入" :name="'income'">
          <div class="record-list">
            <div class="record-item" v-for="item in incomeRecords" :key="item.id">
              <div class="record-icon income">
                <van-icon name="plus" size="24" />
              </div>
              <div class="record-info">
                <div class="record-title">{{ item.title }}</div>
                <div class="record-time">{{ item.time }}</div>
              </div>
              <div class="record-amount income">+{{ item.amount }}</div>
            </div>
            
            <van-empty v-if="!incomeRecords.length" description="暂无收入记录" />
          </div>
        </van-tab>
        
        <van-tab title="支出" :name="'expense'">
          <div class="record-list">
            <div class="record-item" v-for="item in expenseRecords" :key="item.id">
              <div class="record-icon expense">
                <van-icon name="minus" size="24" />
              </div>
              <div class="record-info">
                <div class="record-title">{{ item.title }}</div>
                <div class="record-time">{{ item.time }}</div>
              </div>
              <div class="record-amount">{{ item.amount }}</div>
            </div>
            
            <van-empty v-if="!expenseRecords.length" description="暂无支出记录" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const balance = ref(258.50)
const activeTab = ref('all')

const records = ref([
  { id: 1, type: 'income', title: '邀请好友奖励', amount: 20, time: '2026-04-02 10:30' },
  { id: 2, type: 'expense', title: '解锁《豪门千金的逆袭人生》', amount: -19.9, time: '2026-04-01 15:20' },
  { id: 3, type: 'income', title: '签到奖励', amount: 5, time: '2026-04-01 09:00' },
  { id: 4, type: 'income', title: '观看奖励', amount: 10, time: '2026-03-31 20:15' },
  { id: 5, type: 'expense', title: '开通VIP月卡', amount: -9.9, time: '2026-03-30 12:00' },
  { id: 6, type: 'income', title: '充值', amount: 100, time: '2026-03-28 14:30' },
  { id: 7, type: 'income', title: '邀请好友奖励', amount: 20, time: '2026-03-25 16:45' },
  { id: 8, type: 'expense', title: '解锁《重生之商业女王》', amount: -15, time: '2026-03-22 11:20' }
])

const allRecords = computed(() => records.value)
const incomeRecords = computed(() => records.value.filter(r => r.amount > 0))
const expenseRecords = computed(() => records.value.filter(r => r.amount < 0))

function getIconName(type) {
  return type === 'income' ? 'plus' : 'minus'
}

function handleRecharge() {
  router.push('/recharge')
}

function handleWithdraw() {
  router.push('/withdraw')
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.wallet-page {
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

.balance-card {
  margin: 66px 16px 16px;
  background: linear-gradient(135deg, var(--primary-color) 0%, #ff6b81 100%);
  border-radius: 16px;
  padding: 24px;
}

.balance-info {
  margin-bottom: 20px;
}

.balance-label {
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 8px;
}

.balance-value {
  font-size: 36px;
  font-weight: 700;
}

.balance-actions {
  display: flex;
  gap: 12px;
  
  .van-button {
    flex: 1;
  }
}

.record-section {
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
}

.record-list {
  padding: 16px;
}

.record-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  margin-bottom: 12px;
}

.record-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.income {
    background: rgba(#07c160, 0.15);
    color: #07c160;
  }
  
  &.expense {
    background: rgba(var(--primary-color), 0.15);
    color: var(--primary-color);
  }
}

.record-info {
  flex: 1;
}

.record-title {
  font-size: 15px;
  margin-bottom: 4px;
}

.record-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.record-amount {
  font-size: 18px;
  font-weight: 600;
  
  &.income {
    color: #07c160;
  }
}
</style>
