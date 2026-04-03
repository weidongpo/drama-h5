<template>
  <div class="setting-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">设置</div>
    </header>

    <!-- 设置列表 -->
    <div class="setting-section">
      <van-cell-group inset>
        <van-cell title="账号与安全" is-link @click="handleSetting('account')" />
        <van-cell title="隐私设置" is-link @click="handleSetting('privacy')" />
        <van-cell title="通知设置" is-link @click="handleSetting('notification')" />
      </van-cell-group>
    </div>

    <div class="setting-section">
      <van-cell-group inset>
        <van-cell title="播放设置" is-link @click="handleSetting('play')" />
        <van-cell title="下载设置" is-link @click="handleSetting('download')" />
        <van-cell title="清除缓存" is-link @click="clearCache">
          <template #value>
            <span class="cache-size">{{ cacheSize }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="setting-section">
      <van-cell-group inset>
        <van-cell title="关于我们" is-link @click="handleSetting('about')" />
        <van-cell title="用户协议" is-link @click="handleSetting('agreement')" />
        <van-cell title="隐私政策" is-link @click="handleSetting('policy')" />
        <van-cell title="检查更新" is-link @click="checkUpdate">
          <template #value>
            <span class="version">v1.0.0</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'

const router = useRouter()
const cacheSize = ref('128.5MB')

function handleSetting(type) {
  const routes = {
    account: '/setting/account',
    privacy: '/setting/privacy',
    notification: '/setting/notification',
    play: '/setting/play',
    download: '/setting/download',
    about: '/about',
    agreement: '/agreement',
    policy: '/policy'
  }
  
  if (routes[type]) {
    router.push(routes[type])
  }
}

async function clearCache() {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定清除缓存？'
    })
    showToast('清除成功')
    cacheSize.value = '0MB'
  } catch {
    // 取消
  }
}

function checkUpdate() {
  showToast('已是最新版本')
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.setting-page {
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

.setting-section {
  margin: 66px 16px 16px;
  
  &:first-of-type {
    margin-top: 66px;
  }
  
  &:not(:first-of-type) {
    margin-top: 16px;
  }
}

:deep(.van-cell-group--inset) {
  margin: 0;
  background: $bg-secondary;
  border-radius: 12px;
}

:deep(.van-cell) {
  background: transparent;
  color: $text-primary;
}

:deep(.van-cell::after) {
  border-color: $border-light;
}

:deep(.van-cell .van-cell__value) {
  color: $text-tertiary;
}

.cache-size, .version {
  font-size: 14px;
  color: $text-tertiary;
}

</style>
