<template>
  <div class="download-setting-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">下载设置</div>
    </header>

    <!-- 下载设置 -->
    <div class="section">
      <van-cell-group inset>
        <van-cell title="下载画质" is-link @click="showQualityPicker = true">
          <template #value>
            <span>{{ qualityText }}</span>
          </template>
        </van-cell>
        <van-cell title="同时下载封面">
          <template #right-icon>
            <van-switch v-model="settings.downloadCover" size="20" />
          </template>
        </van-cell>
        <van-cell title="下载完成后通知">
          <template #right-icon>
            <van-switch v-model="settings.downloadNotify" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 网络设置 -->
    <div class="section">
      <div class="section-title">网络设置</div>
      <van-cell-group inset>
        <van-cell title="仅WiFi下下载">
          <template #right-icon>
            <van-switch v-model="settings.wifiOnlyDownload" size="20" />
          </template>
        </van-cell>
        <van-cell title="移动网络下载提醒">
          <template #right-icon>
            <van-switch v-model="settings.mobileDataWarning" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 存储设置 -->
    <div class="section">
      <div class="section-title">存储设置</div>
      <van-cell-group inset>
        <van-cell title="存储位置" is-link @click="showStoragePicker = true">
          <template #value>
            <span>{{ storageText }}</span>
          </template>
        </van-cell>
        <van-cell title="最大缓存空间" is-link @click="showCachePicker = true">
          <template #value>
            <span>{{ cacheText }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 下载任务 -->
    <div class="section">
      <div class="section-title">下载任务</div>
      <van-cell-group inset>
        <van-cell title="最大同时下载数" is-link @click="showMaxTaskPicker = true">
          <template #value>
            <span>{{ maxTaskText }}</span>
          </template>
        </van-cell>
        <van-cell title="下载失败自动重试">
          <template #right-icon>
            <van-switch v-model="settings.autoRetry" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 选择器 -->
    <van-action-sheet v-model:show="showQualityPicker" :actions="qualityOptions" @select="onQualitySelect" />
    <van-action-sheet v-model:show="showStoragePicker" :actions="storageOptions" @select="onStorageSelect" />
    <van-action-sheet v-model:show="showCachePicker" :actions="cacheOptions" @select="onCacheSelect" />
    <van-action-sheet v-model:show="showMaxTaskPicker" :actions="maxTaskOptions" @select="onMaxTaskSelect" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const settings = reactive({
  quality: '720p',
  downloadCover: true,
  downloadNotify: true,
  wifiOnlyDownload: true,
  mobileDataWarning: true,
  storage: 'internal',
  maxCache: '2GB',
  maxTask: 3,
  autoRetry: true
})

const showQualityPicker = ref(false)
const showStoragePicker = ref(false)
const showCachePicker = ref(false)
const showMaxTaskPicker = ref(false)

const qualityOptions = [
  { name: '高清 720P', value: '720p' },
  { name: '超清 1080P', value: '1080p' },
  { name: '蓝光 4K', value: '4k' }
]

const storageOptions = [
  { name: '手机存储', value: 'internal' },
  { name: 'SD卡', value: 'sdcard' }
]

const cacheOptions = [
  { name: '1GB', value: '1GB' },
  { name: '2GB', value: '2GB' },
  { name: '4GB', value: '4GB' },
  { name: '8GB', value: '8GB' },
  { name: '无限制', value: 'unlimited' }
]

const maxTaskOptions = [
  { name: '1个', value: 1 },
  { name: '2个', value: 2 },
  { name: '3个', value: 3 },
  { name: '5个', value: 5 }
]

const qualityText = computed(() => qualityOptions.find(q => q.value === settings.quality)?.name || '高清 720P')
const storageText = computed(() => storageOptions.find(s => s.value === settings.storage)?.name || '手机存储')
const cacheText = computed(() => settings.maxCache)
const maxTaskText = computed(() => `${settings.maxTask}个`)

function goBack() {
  router.back()
}

function onQualitySelect(action) {
  settings.quality = action.value
  showQualityPicker.value = false
}

function onStorageSelect(action) {
  settings.storage = action.value
  showStoragePicker.value = false
}

function onCacheSelect(action) {
  settings.maxCache = action.value
  showCachePicker.value = false
}

function onMaxTaskSelect(action) {
  settings.maxTask = action.value
  showMaxTaskPicker.value = false
}
</script>

<style lang="scss" scoped>
.download-setting-page {
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
    margin-top: 16px;
  }
}

.section-title {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
  padding-left: 4px;
}

:deep(.van-cell-group--inset) {
  margin: 0;
  background: var(--bg-secondary);
  border-radius: 12px;
}

:deep(.van-cell) {
  background: transparent;
  color: var(--text-primary);
}

:deep(.van-cell::after) {
  border-color: var(--border-light);
}

:deep(.van-switch--on) {
  background: var(--primary-color);
}
</style>
