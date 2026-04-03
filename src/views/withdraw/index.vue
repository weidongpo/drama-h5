<template>
  <div class="withdraw-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">提现</div>
      <div class="header-right"></div>
    </header>

    <!-- 可提现余额 -->
    <div class="balance-card">
      <div class="balance-label">可提现积分</div>
      <div class="balance-value">{{ balance }}</div>
      <div class="balance-tip">100积分=1元</div>
    </div>

    <!-- 提现金额 -->
    <div class="section">
      <div class="section-title">提现金额</div>
      <van-field
        v-model="withdrawAmount"
        type="number"
        placeholder="请输入提现积分"
        class="amount-input"
      >
        <template #button>
          <span class="all-btn" @click="withdrawAmount = balance">全部提现</span>
        </template>
      </van-field>
      <div class="amount-info">
        <span>可提现金额：¥{{ canWithdraw }}</span>
        <span v-if="withdrawAmount">实际到账：¥{{ actualAmount }}</span>
      </div>
    </div>

    <!-- 提现方式 -->
    <div class="section">
      <div class="section-title">提现方式</div>
      <div class="method-list">
        <div 
          class="method-item" 
          :class="{ active: withdrawMethod === 'wechat' }"
          @click="withdrawMethod = 'wechat'"
        >
          <van-icon name="wechat-pay" size="24" color="#07c160" />
          <span>微信零钱</span>
          <van-icon v-if="withdrawMethod === 'wechat'" name="success" color="#ff4757" />
        </div>
        <div 
          class="method-item" 
          :class="{ active: withdrawMethod === 'alipay' }"
          @click="withdrawMethod = 'alipay'"
        >
          <van-icon name="alipay" size="24" color="#1677ff" />
          <span>支付宝</span>
          <van-icon v-if="withdrawMethod === 'alipay'" name="success" color="#ff4757" />
        </div>
        <div 
          class="method-item" 
          :class="{ active: withdrawMethod === 'bank' }"
          @click="withdrawMethod = 'bank'"
        >
          <van-icon name="balance-o" size="24" color="#ff4757" />
          <span>银行卡</span>
          <van-icon v-if="withdrawMethod === 'bank'" name="success" color="#ff4757" />
        </div>
      </div>
    </div>

    <!-- 提现账户 -->
    <div class="section" v-if="withdrawMethod !== 'wechat'">
      <div class="section-title">提现账户</div>
      <van-field
        v-model="accountInfo"
        :placeholder="accountPlaceholder"
        class="account-input"
      />
    </div>

    <!-- 提现记录 -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">提现记录</span>
        <span class="more-btn" @click="goToRecords">查看全部</span>
      </div>
      <div class="record-list">
        <div class="record-item" v-for="item in records" :key="item.id">
          <div class="record-info">
            <div class="record-title">提现到{{ item.method }}</div>
            <div class="record-time">{{ item.time }}</div>
          </div>
          <div class="record-amount">+¥{{ item.amount }}</div>
        </div>
      </div>
    </div>

    <!-- 提现说明 -->
    <div class="section">
      <div class="section-title">提现说明</div>
      <div class="notice-list">
        <p>1. 最低提现100积分（1元）</p>
        <p>2. 提现手续费：2%</p>
        <p>3. 提现到账时间：1-3个工作日</p>
        <p>4. 每日最多提现3次</p>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-bar">
      <van-button type="danger" block round @click="handleWithdraw">立即提现</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const balance = ref(2580)
const withdrawAmount = ref('')
const withdrawMethod = ref('wechat')
const accountInfo = ref('')

const records = ref([
  { id: 1, method: '微信零钱', amount: 50, time: '2026-04-01 15:30' },
  { id: 2, method: '支付宝', amount: 100, time: '2026-03-28 10:20' },
  { id: 3, method: '微信零钱', amount: 30, time: '2026-03-25 18:45' }
])

const canWithdraw = computed(() => {
  return (balance.value / 100).toFixed(2)
})

const actualAmount = computed(() => {
  if (!withdrawAmount.value) return '0.00'
  const amount = withdrawAmount.value / 100
  const fee = amount * 0.02
  return (amount - fee).toFixed(2)
})

const accountPlaceholder = computed(() => {
  if (withdrawMethod.value === 'alipay') return '请输入支付宝账号'
  if (withdrawMethod.value === 'bank') return '请输入银行卡号'
  return ''
})

function goBack() {
  router.back()
}

function goToRecords() {
  showToast('提现记录页面开发中')
}

function handleWithdraw() {
  const amount = parseInt(withdrawAmount.value)
  
  if (!amount || amount < 100) {
    showToast('最低提现100积分')
    return
  }
  
  if (amount > balance.value) {
    showToast('积分不足')
    return
  }
  
  if (withdrawMethod.value !== 'wechat' && !accountInfo.value) {
    showToast('请输入提现账户')
    return
  }
  
  showToast('提现申请已提交')
  setTimeout(() => {
    balance.value -= amount
    showToast('提现成功！')
    router.back()
  }, 1500)
}
</script>

<style lang="scss" scoped>
.withdraw-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 80px;
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
  background: linear-gradient(135deg, #4cd137 0%, #7bed9f 100%);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
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

.balance-tip {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 8px;
}

.section {
  padding: 0 16px;
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title {
  font-size: 14px;
  color: var(--text-tertiary);
}

.more-btn {
  font-size: 12px;
  color: var(--primary-color);
}

.amount-input {
  background: var(--bg-secondary);
  border-radius: 12px;
  
  :deep(.van-field__control) {
    color: var(--text-primary);
    font-size: 18px;
    font-weight: 600;
  }
}

.all-btn {
  font-size: 13px;
  color: var(--primary-color);
}

.amount-info {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.method-list {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
}

.method-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  span {
    flex: 1;
    font-size: 15px;
  }
}

.account-input {
  background: var(--bg-secondary);
  border-radius: 12px;
  
  :deep(.van-field__control) {
    color: var(--text-primary);
  }
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
}

.notice-list {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px;
  
  p {
    font-size: 12px;
    color: var(--text-tertiary);
    line-height: 2;
  }
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  padding: 12px 16px;
  border-top: 1px solid var(--border-light);
}
</style>
