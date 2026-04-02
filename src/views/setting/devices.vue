<template>
  <div class="devices-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">登录设备管理</div>
    </header>

    <!-- 当前设备 -->
    <div class="section">
      <div class="section-title">当前设备</div>
      <div class="device-item current">
        <div class="device-icon">
          <van-icon name="phone-o" size="24" color="#ff4757" />
        </div>
        <div class="device-info">
          <div class="device-name">{{ currentDevice.name }}</div>
          <div class="device-detail">{{ currentDevice.model }} · {{ currentDevice.os }}</div>
          <div class="device-time">当前在线</div>
        </div>
        <div class="device-tag">当前设备</div>
      </div>
    </div>

    <!-- 其他设备 -->
    <div class="section">
      <div class="section-title">其他登录设备</div>
      <div class="device-list" v-if="otherDevices.length">
        <div class="device-item" v-for="device in otherDevices" :key="device.id">
          <div class="device-icon">
            <van-icon name="phone-o" size="24" color="#666" />
          </div>
          <div class="device-info">
            <div class="device-name">{{ device.name }}</div>
            <div class="device-detail">{{ device.model }} · {{ device.os }}</div>
            <div class="device-time">最后登录: {{ device.lastLogin }}</div>
          </div>
          <van-button size="small" round @click="handleRemoveDevice(device)">下线</van-button>
        </div>
      </div>
      <van-empty v-else description="暂无其他登录设备" />
    </div>

    <!-- 提示 -->
    <div class="tips">
      <p>• 如发现陌生设备登录，请及时修改密码</p>
      <p>• 下线后该设备需要重新登录</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'

const router = useRouter()

const currentDevice = ref({
  id: 1,
  name: '我的iPhone',
  model: 'iPhone 15 Pro',
  os: 'iOS 17.4'
})

const otherDevices = ref([
  { id: 2, name: 'iPad Pro', model: 'iPad Pro 12.9', os: 'iPadOS 17.3', lastLogin: '2026-04-01 15:30' },
  { id: 3, name: '安卓手机', model: '小米14', os: 'Android 14', lastLogin: '2026-03-28 10:20' }
])

function goBack() {
  router.back()
}

async function handleRemoveDevice(device) {
  try {
    await showConfirmDialog({
      title: '提示',
      message: `确定要让"${device.name}"下线吗？`
    })
    otherDevices.value = otherDevices.value.filter(d => d.id !== device.id)
    showToast('已下线')
  } catch {
    // 取消
  }
}
</script>

<style lang="scss" scoped>
.devices-page {
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

.section {
  padding: 0 16px;
  margin-top: 66px;
  
  &:not(:first-of-type) {
    margin-top: 24px;
  }
}

.section-title {
  font-size: 14px;
  color: $text-tertiary;
  margin-bottom: 12px;
  padding-left: 4px;
}

.device-list {
  background: $bg-secondary;
  border-radius: 12px;
  overflow: hidden;
}

.device-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid $border-light;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.current {
    background: rgba($primary-color, 0.05);
  }
}

.device-icon {
  width: 48px;
  height: 48px;
  background: $bg-tertiary;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-info {
  flex: 1;
}

.device-name {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
}

.device-detail {
  font-size: 12px;
  color: $text-tertiary;
  margin-bottom: 2px;
}

.device-time {
  font-size: 12px;
  color: $text-tertiary;
}

.device-tag {
  font-size: 12px;
  color: $primary-color;
  background: rgba($primary-color, 0.15);
  padding: 4px 8px;
  border-radius: 4px;
}

.tips {
  padding: 24px 16px;
  
  p {
    font-size: 12px;
    color: $text-tertiary;
    line-height: 2;
  }
}
</style>
