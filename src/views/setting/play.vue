<template>
  <div class="play-setting-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">播放设置</div>
    </header>

    <!-- 播放设置 -->
    <div class="section">
      <van-cell-group inset>
        <van-cell title="默认画质" is-link @click="showQualityPicker = true">
          <template #value>
            <span>{{ qualityText }}</span>
          </template>
        </van-cell>
        <van-cell title="默认倍速" is-link @click="showSpeedPicker = true">
          <template #value>
            <span>{{ speedText }}</span>
          </template>
        </van-cell>
        <van-cell title="自动播放下一集">
          <template #right-icon>
            <van-switch v-model="settings.autoPlayNext" size="20" />
          </template>
        </van-cell>
        <van-cell title="跳过片头片尾">
          <template #right-icon>
            <van-switch v-model="settings.skipIntro" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 网络设置 -->
    <div class="section">
      <div class="section-title">网络设置</div>
      <van-cell-group inset>
        <van-cell title="仅WiFi下播放高清">
          <template #right-icon>
            <van-switch v-model="settings.wifiOnlyHd" size="20" />
          </template>
        </van-cell>
        <van-cell title="移动网络播放提醒">
          <template #right-icon>
            <van-switch v-model="settings.mobileDataWarning" size="20" />
          </template>
        </van-cell>
        <van-cell title="预加载视频">
          <template #right-icon>
            <van-switch v-model="settings.preload" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 字幕设置 -->
    <div class="section">
      <div class="section-title">字幕设置</div>
      <van-cell-group inset>
        <van-cell title="显示字幕">
          <template #right-icon>
            <van-switch v-model="settings.showSubtitle" size="20" />
          </template>
        </van-cell>
        <van-cell title="字幕大小" is-link @click="showSubtitleSizePicker = true">
          <template #value>
            <span>{{ subtitleSizeText }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 画质选择 -->
    <van-action-sheet v-model:show="showQualityPicker" :actions="qualityOptions" @select="onQualitySelect" />
    
    <!-- 倍速选择 -->
    <van-action-sheet v-model:show="showSpeedPicker" :actions="speedOptions" @select="onSpeedSelect" />
    
    <!-- 字幕大小选择 -->
    <van-action-sheet v-model:show="showSubtitleSizePicker" :actions="subtitleSizeOptions" @select="onSubtitleSizeSelect" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const settings = reactive({
  quality: 'auto',
  speed: '1.0',
  autoPlayNext: true,
  skipIntro: true,
  wifiOnlyHd: true,
  mobileDataWarning: true,
  preload: true,
  showSubtitle: true,
  subtitleSize: 'medium'
})

const showQualityPicker = ref(false)
const showSpeedPicker = ref(false)
const showSubtitleSizePicker = ref(false)

const qualityOptions = [
  { name: '自动', value: 'auto' },
  { name: '高清 720P', value: '720p' },
  { name: '超清 1080P', value: '1080p' },
  { name: '蓝光 4K', value: '4k' }
]

const speedOptions = [
  { name: '0.5x', value: '0.5' },
  { name: '0.75x', value: '0.75' },
  { name: '1.0x', value: '1.0' },
  { name: '1.25x', value: '1.25' },
  { name: '1.5x', value: '1.5' },
  { name: '2.0x', value: '2.0' }
]

const subtitleSizeOptions = [
  { name: '小', value: 'small' },
  { name: '中', value: 'medium' },
  { name: '大', value: 'large' }
]

const qualityText = computed(() => qualityOptions.find(q => q.value === settings.quality)?.name || '自动')
const speedText = computed(() => speedOptions.find(s => s.value === settings.speed)?.name || '1.0x')
const subtitleSizeText = computed(() => subtitleSizeOptions.find(s => s.value === settings.subtitleSize)?.name || '中')

function goBack() {
  router.back()
}

function onQualitySelect(action) {
  settings.quality = action.value
  showQualityPicker.value = false
}

function onSpeedSelect(action) {
  settings.speed = action.value
  showSpeedPicker.value = false
}

function onSubtitleSizeSelect(action) {
  settings.subtitleSize = action.value
  showSubtitleSizePicker.value = false
}
</script>

<style lang="scss" scoped>
.play-setting-page {
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
