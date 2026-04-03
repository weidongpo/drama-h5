<template>
  <div class="pay-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">支付中心</div>
    </header>

    <!-- 订单信息 -->
    <div class="order-card">
      <div class="order-type">
        <van-icon :name="orderInfo.type === 'vip' ? 'shield-o' : 'video-o'" size="24" color="#ff4757" />
        <span>{{ orderInfo.type === 'vip' ? 'VIP会员' : '解锁剧集' }}</span>
      </div>
      
      <div class="order-detail" v-if="orderInfo.type === 'vip'">
        <h3>开通VIP会员</h3>
        <p>畅享全站短剧，无广告观看</p>
        <div class="vip-options">
          <div 
            class="vip-option" 
            :class="{ active: selectedVip === 'month' }"
            @click="selectedVip = 'month'"
          >
            <div class="vip-duration">月卡</div>
            <div class="vip-price">¥9.9</div>
            <div class="vip-tip">推荐</div>
          </div>
          <div 
            class="vip-option" 
            :class="{ active: selectedVip === 'quarter' }"
            @click="selectedVip = 'quarter'"
          >
            <div class="vip-duration">季卡</div>
            <div class="vip-price">¥28</div>
            <div class="vip-tip">省2元</div>
          </div>
          <div 
            class="vip-option" 
            :class="{ active: selectedVip === 'year' }"
            @click="selectedVip = 'year'"
          >
            <div class="vip-duration">年卡</div>
            <div class="vip-price">¥98</div>
            <div class="vip-tip">省20元</div>
          </div>
        </div>
      </div>
      
      <div class="order-detail" v-else>
        <div class="drama-info">
          <van-image :src="orderInfo.cover" fit="cover" class="drama-cover" />
          <div class="drama-content">
            <h3>{{ orderInfo.title }}</h3>
            <p>解锁全剧 {{ orderInfo.episodes }} 集</p>
          </div>
        </div>
        <div class="unlock-price">
          <span class="original">原价 ¥{{ orderInfo.originalPrice }}</span>
          <span class="current">¥{{ orderInfo.price }}</span>
        </div>
      </div>
    </div>

    <!-- 支付方式 -->
    <div class="payment-section">
      <h3>选择支付方式</h3>
      <div class="payment-list">
        <div 
          class="payment-item" 
          :class="{ active: paymentMethod === 'wechat' }"
          @click="paymentMethod = 'wechat'"
        >
          <div class="payment-icon wechat">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#07c160">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.036 2.533c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
            </svg>
          </div>
          <span class="payment-name">微信支付</span>
          <van-icon v-if="paymentMethod === 'wechat'" name="success" color="#ff4757" />
        </div>
        
        <div 
          class="payment-item" 
          :class="{ active: paymentMethod === 'alipay' }"
          @click="paymentMethod = 'alipay'"
        >
          <div class="payment-icon alipay">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#1677ff">
              <path d="M21.422 15.358c-1.426-.541-4.394-1.59-5.838-2.142-.166-.064-.33-.127-.493-.19C16.2 11.51 17.093 9.32 17.093 7.5c0-3.038-2.462-5.5-5.5-5.5s-5.5 2.462-5.5 5.5c0 2.316 1.438 4.296 3.472 5.107-.14.328-.28.656-.428.98-.78 1.7-1.692 3.413-2.637 4.913 1.312.5 2.712.75 4.137.75 1.425 0 2.825-.25 4.137-.75-.945-1.5-1.857-3.213-2.637-4.913-.148-.324-.288-.652-.428-.98 2.034-.811 3.472-2.791 3.472-5.107 0-3.038-2.462-5.5-5.5-5.5s-5.5 2.462-5.5 5.5c0 1.82.892 4.01 1.902 5.526-.163.063-.327.126-.493.19-1.444.552-4.412 1.601-5.838 2.142A2.5 2.5 0 000 17.5v2C0 20.881 1.119 22 2.5 22h19c1.381 0 2.5-1.119 2.5-2.5v-2a2.5 2.5 0 00-1.578-2.142z"/>
            </svg>
          </div>
          <span class="payment-name">支付宝</span>
          <van-icon v-if="paymentMethod === 'alipay'" name="success" color="#ff4757" />
        </div>
        
        <div 
          class="payment-item" 
          :class="{ active: paymentMethod === 'balance' }"
          @click="paymentMethod = 'balance'"
        >
          <div class="payment-icon balance">
            <van-icon name="balance-o" size="24" color="#ff9500" />
          </div>
          <div class="payment-info">
            <span class="payment-name">余额支付</span>
            <span class="balance-amount">余额: ¥{{ userBalance }}</span>
          </div>
          <van-icon v-if="paymentMethod === 'balance'" name="success" color="#ff4757" />
        </div>
      </div>
    </div>

    <!-- 优惠券 -->
    <div class="coupon-section" v-if="coupons.length">
      <div class="coupon-header" @click="showCoupons = true">
        <span>优惠券</span>
        <div class="coupon-info">
          <span class="coupon-count">{{ selectedCoupon ? `-¥${selectedCoupon.amount}` : `${coupons.length}张可用` }}</span>
          <van-icon name="arrow" color="#999" />
        </div>
      </div>
    </div>

    <!-- 支付金额 -->
    <div class="amount-section">
      <div class="amount-row">
        <span>商品金额</span>
        <span>¥{{ orderInfo.originalPrice || getVipPrice() }}</span>
      </div>
      <div class="amount-row" v-if="orderInfo.price">
        <span>优惠</span>
        <span class="discount">-¥{{ (orderInfo.originalPrice - orderInfo.price).toFixed(1) }}</span>
      </div>
      <div class="amount-row" v-if="selectedCoupon">
        <span>优惠券</span>
        <span class="discount">-¥{{ selectedCoupon.amount }}</span>
      </div>
      <div class="amount-total">
        <span>实付金额</span>
        <span class="total-price">¥{{ finalAmount }}</span>
      </div>
    </div>

    <!-- 底部支付按钮 -->
    <div class="pay-footer">
      <div class="pay-info">
        <span class="pay-label">应付:</span>
        <span class="pay-amount">¥{{ finalAmount }}</span>
      </div>
      <van-button type="danger" round block @click="handlePay">
        立即支付
      </van-button>
    </div>

    <!-- 优惠券弹窗 -->
    <van-popup v-model:show="showCoupons" position="bottom" round>
      <div class="coupon-popup">
        <div class="popup-header">
          <h3>选择优惠券</h3>
          <van-icon name="cross" size="24" @click="showCoupons = false" />
        </div>
        <div class="coupon-list">
          <div 
            class="coupon-item" 
            :class="{ selected: selectedCoupon?.id === coupon.id }"
            v-for="coupon in coupons" 
            :key="coupon.id"
            @click="selectCoupon(coupon)"
          >
            <div class="coupon-left">
              <span class="coupon-sign">¥</span>
              <span class="coupon-value">{{ coupon.amount }}</span>
            </div>
            <div class="coupon-right">
              <div class="coupon-name">{{ coupon.name }}</div>
              <div class="coupon-condition">满{{ coupon.minAmount }}元可用</div>
              <div class="coupon-expire">{{ coupon.expireTime }}到期</div>
            </div>
            <div class="coupon-check" v-if="selectedCoupon?.id === coupon.id">
              <van-icon name="success" color="#ff4757" />
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 支付成功弹窗 -->
    <van-popup v-model:show="showSuccess" round :close-on-click-overlay="false">
      <div class="success-popup">
        <van-icon name="passed" size="60" color="#07c160" />
        <h3>支付成功</h3>
        <p>{{ orderInfo.type === 'vip' ? 'VIP会员已开通' : '剧集已解锁' }}</p>
        <van-button type="danger" round block @click="handleSuccess">
          {{ orderInfo.type === 'vip' ? '开始追剧' : '立即观看' }}
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'

const route = useRoute()
const router = useRouter()

const paymentMethod = ref('wechat')
const selectedVip = ref('month')
const selectedCoupon = ref(null)
const showCoupons = ref(false)
const showSuccess = ref(false)
const userBalance = ref(58.5)

// 订单信息
const orderInfo = ref({
  type: 'vip', // vip | drama
  title: '',
  cover: '',
  episodes: 0,
  originalPrice: 0,
  price: 0
})

// 优惠券
const coupons = ref([
  { id: 1, name: '新用户专享', amount: 5, minAmount: 10, expireTime: '2026-04-30' },
  { id: 2, name: 'VIP专享券', amount: 3, minAmount: 9.9, expireTime: '2026-05-15' }
])

// VIP价格
const vipPrices = {
  month: { original: 19.9, price: 9.9 },
  quarter: { original: 59.7, price: 28 },
  year: { original: 118.8, price: 98 }
}

// 计算最终金额
const finalAmount = computed(() => {
  let amount = orderInfo.value.price || getVipPrice()
  if (selectedCoupon.value && amount >= selectedCoupon.value.minAmount) {
    amount = Math.max(0, amount - selectedCoupon.value.amount)
  }
  return amount.toFixed(1)
})

onMounted(() => {
  // 从路由参数获取订单信息
  const { type, id, title, cover, episodes, price } = route.query
  
  if (type === 'drama') {
    orderInfo.value = {
      type: 'drama',
      title: title || '豪门千金的逆袭人生',
      cover: cover || '/drama-h5/images/dramas/drama-1.jpg',
      episodes: episodes || 86,
      originalPrice: 29.9,
      price: parseFloat(price) || 19.9
    }
  } else {
    orderInfo.value.type = 'vip'
  }
})

function getVipPrice() {
  return vipPrices[selectedVip.value].price
}

function selectCoupon(coupon) {
  if (selectedCoupon.value?.id === coupon.id) {
    selectedCoupon.value = null
  } else {
    selectedCoupon.value = coupon
  }
  showCoupons.value = false
}

async function handlePay() {
  if (paymentMethod.value === 'balance' && userBalance.value < parseFloat(finalAmount.value)) {
    showToast('余额不足')
    return
  }
  
  showLoadingToast({
    message: '支付中...',
    forbidClick: true
  })
  
  // 模拟支付过程
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  closeToast()
  showSuccess.value = true
}

function handleSuccess() {
  showSuccess.value = false
  
  if (orderInfo.value.type === 'vip') {
    router.replace('/')
  } else {
    router.replace(`/player/${route.query.id || 1}`)
  }
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.pay-page {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 100px;
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

.order-card {
  margin: 66px 16px 16px;
  background: $bg-secondary;
  border-radius: 12px;
  padding: 16px;
}

.order-type {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid $border-light;
  
  span {
    font-size: 16px;
    font-weight: 600;
  }
}

.order-detail {
  h3 {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 13px;
    color: $text-tertiary;
    margin-bottom: 16px;
  }
}

.vip-options {
  display: flex;
  gap: 12px;
}

.vip-option {
  flex: 1;
  background: $bg-tertiary;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  border: 2px solid transparent;
  cursor: pointer;
  
  &.active {
    border-color: $primary-color;
    background: rgba($primary-color, 0.1);
  }
}

.vip-duration {
  font-size: 14px;
  margin-bottom: 8px;
}

.vip-price {
  font-size: 20px;
  font-weight: 600;
  color: $primary-color;
}

.vip-tip {
  font-size: 11px;
  color: $text-tertiary;
  margin-top: 4px;
}

.drama-info {
  display: flex;
  gap: 12px;
}

.drama-cover {
  width: 80px;
  height: 110px;
  border-radius: 8px;
  overflow: hidden;
}

.drama-content {
  flex: 1;
  
  h3 {
    font-size: 15px;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 13px;
    color: $text-tertiary;
  }
}

.unlock-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 16px;
  
  .original {
    font-size: 13px;
    color: $text-tertiary;
    text-decoration: line-through;
  }
  
  .current {
    font-size: 24px;
    font-weight: 600;
    color: $primary-color;
  }
}

.payment-section {
  margin: 16px;
  
  h3 {
    font-size: 14px;
    color: $text-tertiary;
    margin-bottom: 12px;
  }
}

.payment-list {
  background: $bg-secondary;
  border-radius: 12px;
  overflow: hidden;
}

.payment-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid $border-light;
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.active {
    background: rgba($primary-color, 0.05);
  }
}

.payment-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  
  &.wechat {
    background: rgba(#07c160, 0.1);
  }
  
  &.alipay {
    background: rgba(#1677ff, 0.1);
  }
  
  &.balance {
    background: rgba(#ff9500, 0.1);
  }
}

.payment-name {
  flex: 1;
  font-size: 15px;
}

.payment-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.balance-amount {
  font-size: 12px;
  color: $text-tertiary;
}

.coupon-section {
  margin: 16px;
}

.coupon-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $bg-secondary;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
}

.coupon-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.coupon-count {
  font-size: 14px;
  color: $primary-color;
}

.amount-section {
  margin: 16px;
  background: $bg-secondary;
  border-radius: 12px;
  padding: 16px;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: $text-secondary;
  
  .discount {
    color: $primary-color;
  }
}

.amount-total {
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid $border-light;
  
  .total-price {
    font-size: 20px;
    font-weight: 600;
    color: $primary-color;
  }
}

.pay-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: $bg-card;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-top: 1px solid $border-light;
}

.pay-info {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.pay-label {
  font-size: 14px;
  color: $text-secondary;
}

.pay-amount {
  font-size: 24px;
  font-weight: 600;
  color: $primary-color;
}

// 优惠券弹窗
.coupon-popup {
  max-height: 60vh;
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
  }
}

.coupon-list {
  padding: 16px;
  max-height: 50vh;
  overflow-y: auto;
}

.coupon-item {
  display: flex;
  background: $bg-secondary;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  border: 2px solid transparent;
  
  &.selected {
    border-color: $primary-color;
  }
}

.coupon-left {
  width: 100px;
  background: linear-gradient(135deg, $primary-color 0%, #ff6b81 100%);
  display: flex;
  align-items: baseline;
  justify-content: center;
  padding: 16px;
}

.coupon-sign {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.coupon-value {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
}

.coupon-right {
  flex: 1;
  padding: 12px;
}

.coupon-name {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
}

.coupon-condition {
  font-size: 12px;
  color: $text-tertiary;
  margin-bottom: 4px;
}

.coupon-expire {
  font-size: 11px;
  color: $text-tertiary;
}

.coupon-check {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

// 成功弹窗
.success-popup {
  width: 280px;
  padding: 32px 24px;
  text-align: center;
  
  h3 {
    font-size: 18px;
    margin: 16px 0 8px;
  }
  
  p {
    font-size: 14px;
    color: $text-tertiary;
    margin-bottom: 24px;
  }
}
</style>
