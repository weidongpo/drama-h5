<template>
  <div class="about-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">关于我们</div>
    </header>

    <!-- Logo -->
    <div class="logo-section">
      <div class="logo">
        <van-icon name="video" size="48" color="#ff4757" />
      </div>
      <h2>追剧达人</h2>
      <p class="version">v1.0.0</p>
      <p class="slogan">海量短剧，精彩不断</p>
    </div>

    <!-- 信息 -->
    <div class="info-section">
      <van-cell-group inset>
        <van-cell title="应用名称" value="追剧达人" />
        <van-cell title="版本号" value="v1.0.0" />
        <van-cell title="开发商" value="追剧科技有限公司" />
        <van-cell title="客服电话" value="400-888-8888" @click="callService" />
        <van-cell title="官方邮箱" value="service@drama.com" @click="sendEmail" />
      </van-cell-group>
    </div>

    <!-- 链接 -->
    <div class="link-section">
      <van-cell-group inset>
        <van-cell title="用户协议" is-link @click="router.push('/agreement')" />
        <van-cell title="隐私政策" is-link @click="router.push('/policy')" />
        <van-cell title="给个好评" is-link @click="handleRate" />
      </van-cell-group>
    </div>

    <!-- 版权 -->
    <div class="copyright">
      <p>Copyright © 2026 追剧科技有限公司</p>
      <p>All Rights Reserved</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

function callService() {
  showToast('拨打客服电话: 400-888-8888')
}

function sendEmail() {
  showToast('发送邮件至: service@drama.com')
}

function handleRate() {
  router.push('/rate')
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.about-page {
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

.logo-section {
  padding: 80px 0 40px;
  text-align: center;
}

.logo {
  width: 80px;
  height: 80px;
  background: rgba($primary-color, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.version {
  font-size: 14px;
  color: $text-tertiary;
  margin-bottom: 4px;
}

.slogan {
  font-size: 14px;
  color: $text-secondary;
}

.info-section, .link-section {
  margin: 0 16px 16px;
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

.copyright {
  padding: 40px 16px;
  text-align: center;
  
  p {
    font-size: 12px;
    color: $text-tertiary;
    margin-bottom: 4px;
  }
}
</style>
