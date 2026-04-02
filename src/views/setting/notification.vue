<template>
  <div class="notification-setting-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">通知设置</div>
    </header>

    <!-- 消息通知 -->
    <div class="section">
      <van-cell-group inset>
        <van-cell title="接收推送通知">
          <template #right-icon>
            <van-switch v-model="settings.enablePush" size="20" />
          </template>
        </van-cell>
        <van-cell title="接收短信通知">
          <template #right-icon>
            <van-switch v-model="settings.enableSms" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 通知类型 -->
    <div class="section">
      <div class="section-title">通知类型</div>
      <van-cell-group inset>
        <van-cell title="更新提醒">
          <template #right-icon>
            <van-switch v-model="settings.updateNotify" size="20" />
          </template>
        </van-cell>
        <van-cell title="活动通知">
          <template #right-icon>
            <van-switch v-model="settings.activityNotify" size="20" />
          </template>
        </van-cell>
        <van-cell title="系统消息">
          <template #right-icon>
            <van-switch v-model="settings.systemNotify" size="20" />
          </template>
        </van-cell>
        <van-cell title="互动消息">
          <template #right-icon>
            <van-switch v-model="settings.interactNotify" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 免打扰 -->
    <div class="section">
      <div class="section-title">免打扰时段</div>
      <van-cell-group inset>
        <van-cell title="开启免打扰">
          <template #right-icon>
            <van-switch v-model="settings.enableDnd" size="20" />
          </template>
        </van-cell>
        <van-cell title="开始时间" :value="settings.dndStartTime" is-link @click="showStartTime = true" v-if="settings.enableDnd" />
        <van-cell title="结束时间" :value="settings.dndEndTime" is-link @click="showEndTime = true" v-if="settings.enableDnd" />
      </van-cell-group>
    </div>

    <!-- 时间选择器 -->
    <van-popup v-model:show="showStartTime" position="bottom" round>
      <van-time-picker v-model="startTimeArr" title="选择开始时间" @confirm="onStartTimeConfirm" @cancel="showStartTime = false" />
    </van-popup>
    
    <van-popup v-model:show="showEndTime" position="bottom" round>
      <van-time-picker v-model="endTimeArr" title="选择结束时间" @confirm="onEndTimeConfirm" @cancel="showEndTime = false" />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const settings = reactive({
  enablePush: true,
  enableSms: false,
  updateNotify: true,
  activityNotify: true,
  systemNotify: true,
  interactNotify: true,
  enableDnd: false,
  dndStartTime: '22:00',
  dndEndTime: '08:00'
})

const showStartTime = ref(false)
const showEndTime = ref(false)
const startTimeArr = ref(['22', '00'])
const endTimeArr = ref(['08', '00'])

function goBack() {
  router.back()
}

function onStartTimeConfirm({ selectedValues }) {
  settings.dndStartTime = selectedValues.join(':')
  showStartTime.value = false
}

function onEndTimeConfirm({ selectedValues }) {
  settings.dndEndTime = selectedValues.join(':')
  showEndTime.value = false
}
</script>

<style lang="scss" scoped>
.notification-setting-page {
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
    margin-top: 16px;
  }
}

.section-title {
  font-size: 14px;
  color: $text-tertiary;
  margin-bottom: 12px;
  padding-left: 4px;
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

:deep(.van-switch--on) {
  background: $primary-color;
}
</style>
