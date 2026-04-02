<template>
  <div class="recharge-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">充值积分</div>
      <div class="header-right"></div>
    </header>

    <!-- 当前余额 -->
    <div class="balance-card">
      <div class="balance-label">当前积分</div>
      <div class="balance-value">{{ balance }}</div>
    </div>

    <!-- 充值金额选择 -->
    <div class="section">
      <div class="section-title">选择充值金额</div>
      <div class="amount-grid">
        <div 
          class="amount-item" 
          :class="{ active: selectedAmount === item.amount }"
          v-for="item in amountOptions" 
          :key="item.amount"
          @click="selectedAmount = item.amount"
        >
          <div class="amount-value">{{ item.amount }}积分</div>
          <div class="amount-price">¥{{ item.price }}</div>
          <div class="amount-bonus" v-if="item.bonus">送{{ item.bonus }}积分</div>
        </div>
      </div>
    </div>

    <!-- 自定义金额 -->
    <div class="section">
      <div class="section-title">自定义金额</div>
      <van-field
        v-model="customAmount"
        type="number"
        placeholder="请输入充值金额（元）"
        class="custom-input"
      >
        <template #button>
          <span class="input-tip">1元=10积分</span>
        </template>
      </van-field>
    </div>

    <!-- 支付方式 -->
    <div class="section">
      <div class="section-title">支付方式</div>
      <div class="payment-list">
        <div 
          class="payment-item" 
          :class="{ active: paymentMethod === 'wechat' }"
          @click="paymentMethod = 'wechat'"
        >
          <van-icon name="wechat-pay" size="24" color="#07c160" />
          <span>微信支付</span>
          <van-icon v-if="paymentMethod === 'wechat'" name="success" color="#ff4757" />
        </div>
        <div 
          class="payment-item" 
          :class="{ active: paymentMethod === 'alipay' }"
          @click="paymentMethod = 'alipay'"
        >
          <van-icon name="alipay" size="24" color="#1677ff" />
          <span>支付宝</span>
          <van-icon v-if="paymentMethod === 'alipay'" name="success" color="#ff4757" />
        </div>
      </div>
    </div>

    <!-- 充值说明 -->
    <div class="section">
      <div class="section-title">充值说明</div>
      <div class="notice-list">
        <p>1. 充值成功后积分即时到账</p>
        <p>2. 充值金额不支持退款</p>
        <p>3. 如有问题请联系客服</p>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-bar">
      <div class="pay-info">
        <span>应付：</span>
        <span class="pay-amount">¥{{ finalPrice }}</span>
      </div>
      <van-button type="danger" round @click="handlePay">立即充值</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const route = useRoute()

const balance = ref(2580)
const selectedAmount = ref(100)
const customAmount = ref('')
const paymentMethod = ref('wechat')

const amountOptions = [
  { amount: 100, price: 10 },
  { amount: 500, price: 50, bonus: 20 },
  { amount: 1000, price: 100, bonus: 50 },
  { amount: 2000, price: 200, bonus: 120 },
  { amount: 5000, price: 500, bonus: 350 },
  { amount: 10000, price: 1000, bonus: 800 }
]

const finalPrice = computed(() => {
  if (customAmount.value) {
    return customAmount.value
  }
  const item = amountOptions.find(a => a.amount === selectedAmount.value)
  return item?.price || 0
})

function goBack() {
  router.back()
}

function handlePay() {
  const price = finalPrice.value
  if (!price || price <= 0) {
    showToast('请选择或输入充值金额')
    return
  }
  
  showToast(`正在支付 ¥${price}...`)
  setTimeout(() => {
    showToast('充值成功！')
    balance.value += selectedAmount.value || (customAmount.value * 10)
    router.back()
  }, 1500)
}
</script>

<style lang="scss" scoped>
.recharge-page {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 80px;
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

.section {
  padding: 0 16px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 14px;
  color: $text-tertiary;
  margin-bottom: 12px;
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.amount-item {
  background: $bg-secondary;
  border-radius: 12px;
  padding: 16px 8px;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  position: relative;
  
  &.active {
    border-color: $primary-color;
    background: rgba($primary-color, 0.1);
  }
}

.amount-value {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.amount-price {
  font-size: 13px;
  color: $text-tertiary;
}

.amount-bonus {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ffd700;
  color: #000;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 500;
}

.custom-input {
  background: $bg-secondary;
  border-radius: 12px;
  
  :deep(.van-field__control) {
    color: $text-primary;
  }
}

.input-tip {
  font-size: 12px;
  color: $text-tertiary;
}

.payment-list {
  background: $bg-secondary;
  border-radius: 12px;
  overflow: hidden;
}

.payment-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid $border-light;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  span {
    flex: 1;
    font-size: 15px;
  }
}

.notice-list {
  background: $bg-secondary;
  border-radius: 12px;
  padding: 16px;
  
  p {
    font-size: 12px;
    color: $text-tertiary;
    line-height: 2;
  }
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: $bg-secondary;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid $border-light;
}

.pay-info {
  font-size: 14px;
}

.pay-amount {
  font-size: 20px;
  font-weight: 700;
  color: $primary-color;
}
</style>
