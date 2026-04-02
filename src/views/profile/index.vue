<template>
  <div class="profile-page">
    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="user-info">
        <van-image :src="userInfo.avatar" round width="64" height="64" fit="cover" class="user-avatar" />
        <div class="user-detail">
          <div class="user-name">{{ userInfo.name }}</div>
          <div class="user-id">ID: {{ userInfo.id }}</div>
          <div class="user-vip" v-if="userInfo.isVip">
            <van-icon name="shield-o" />
            VIP会员
          </div>
        </div>
        <van-button size="small" round @click="handleEdit">编辑</van-button>
      </div>

      <div class="user-stats">
        <div class="stat-item" @click="goTo('/follow')">
          <div class="stat-value">{{ stats.followCount }}</div>
          <div class="stat-label">追剧</div>
        </div>
        <div class="stat-item" @click="goTo('/favorite')">
          <div class="stat-value">{{ stats.favoriteCount }}</div>
          <div class="stat-label">收藏</div>
        </div>
        <div class="stat-item" @click="goTo('/task')">
          <div class="stat-value">{{ stats.points }}</div>
          <div class="stat-label">积分</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.tickets }}</div>
          <div class="stat-label">观影券</div>
        </div>
      </div>
    </div>

    <!-- VIP 卡片 -->
    <div class="vip-card">
      <div class="vip-info">
        <div class="vip-icon">
          <van-icon name="shield-o" size="28" color="#000" />
        </div>
        <div class="vip-text">
          <h3>开通VIP会员</h3>
          <p>畅享全站短剧，无广告观看</p>
        </div>
      </div>
      <van-button type="warning" round size="small" @click="handleVip">立即开通</van-button>
    </div>

    <!-- 我的服务 -->
    <div class="menu-section">
      <div class="section-title">我的服务</div>
      <van-cell-group inset>
        <van-cell title="我的钱包" icon="balance-o" is-link @click="handleMenu('wallet')">
          <template #right-icon>
            <van-tag type="danger">提现</van-tag>
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-cell title="观影券" icon="coupon-o" is-link @click="handleMenu('tickets')" />
        <van-cell title="观看历史" icon="clock-o" is-link @click="handleMenu('history')" />
        <van-cell title="我的下载" icon="down" is-link @click="handleMenu('download')" />
      </van-cell-group>
    </div>

    <!-- 更多功能 -->
    <div class="menu-section">
      <div class="section-title">更多功能</div>
      <van-cell-group inset>
        <van-cell title="帮助与反馈" icon="question-o" is-link @click="handleMenu('help')" />
        <van-cell title="设置" icon="setting-o" is-link @click="handleMenu('setting')" />
        <van-cell title="关于我们" icon="info-o" is-link @click="handleMenu('about')" />
      </van-cell-group>
    </div>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()

const userInfo = reactive({
  name: '追剧小达人',
  id: '88866688',
  avatar: 'https://picsum.photos/128/128?random=100',
  isVip: true
})

const stats = reactive({
  followCount: 128,
  favoriteCount: 56,
  points: 2580,
  tickets: 12
})

function goTo(path) {
  router.push(path)
}

function handleEdit() {
  router.push('/profile/edit')
}

function handleVip() {
  router.push('/pay?type=vip')
}

function handleMenu(type) {
  const routes = {
    wallet: '/wallet',
    tickets: '/tickets',
    history: '/history',
    download: '/download',
    help: '/help',
    setting: '/setting',
    about: '/about'
  }
  
  if (routes[type]) {
    router.push(routes[type])
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 70px;
}

.user-card {
  background: linear-gradient(180deg, $bg-secondary 0%, $bg-color 100%);
  padding: 40px $spacing-lg $spacing-xxl;
}

.user-info {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;
}

.user-avatar {
  border: 2px solid $primary-color;
}

.user-detail {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: $spacing-xs;
}

.user-id {
  font-size: 12px;
  color: $text-tertiary;
}

.user-vip {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  background: $vip-gradient;
  padding: $spacing-xs $spacing-md;
  border-radius: $radius-round;
  font-size: 11px;
  font-weight: 600;
  color: #000;
  margin-top: $spacing-sm;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  padding: $spacing-lg 0;
  border-top: 1px solid $border-light;
  border-bottom: 1px solid $border-light;
}

.stat-item {
  text-align: center;
  cursor: pointer;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: $spacing-xs;
}

.stat-label {
  font-size: 12px;
  color: $text-tertiary;
}

.vip-card {
  margin: $spacing-lg;
  background: linear-gradient(135deg, $bg-tertiary 0%, $bg-secondary 100%);
  border-radius: $radius-lg;
  padding: $spacing-lg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #333;
}

.vip-info {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.vip-icon {
  width: 48px;
  height: 48px;
  background: $vip-gradient;
  border-radius: $radius-lg;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vip-text {
  h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: $spacing-xs;
  }
  
  p {
    font-size: 12px;
    color: $text-tertiary;
  }
}

.menu-section {
  padding: 0 $spacing-lg;
  margin-bottom: $spacing-lg;
}

.section-title {
  font-size: 14px;
  color: $text-tertiary;
  margin-bottom: $spacing-md;
  padding-left: $spacing-xs;
}

:deep(.van-cell-group--inset) {
  margin: 0;
  background: $bg-secondary;
  border-radius: $radius-lg;
}

:deep(.van-cell) {
  background: transparent;
  color: $text-primary;
}

:deep(.van-cell::after) {
  border-color: $border-light;
}

:deep(.van-cell .van-cell__left-icon) {
  color: $primary-color;
}

:deep(.van-cell .van-cell__value) {
  color: $text-tertiary;
}
</style>
