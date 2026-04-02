<template>
  <div class="privacy-setting-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">隐私设置</div>
    </header>

    <!-- 隐私设置 -->
    <div class="section">
      <van-cell-group inset>
        <van-cell title="公开我的追剧列表">
          <template #right-icon>
            <van-switch v-model="settings.showFollowList" size="20" />
          </template>
        </van-cell>
        <van-cell title="公开我的收藏">
          <template #right-icon>
            <van-switch v-model="settings.showFavorite" size="20" />
          </template>
        </van-cell>
        <van-cell title="公开我的观看历史">
          <template #right-icon>
            <van-switch v-model="settings.showHistory" size="20" />
          </template>
        </van-cell>
        <van-cell title="允许他人查看我的主页">
          <template #right-icon>
            <van-switch v-model="settings.allowViewProfile" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 互动设置 -->
    <div class="section">
      <div class="section-title">互动设置</div>
      <van-cell-group inset>
        <van-cell title="允许他人给我发消息">
          <template #right-icon>
            <van-switch v-model="settings.allowMessage" size="20" />
          </template>
        </van-cell>
        <van-cell title="允许他人关注我">
          <template #right-icon>
            <van-switch v-model="settings.allowFollow" size="20" />
          </template>
        </van-cell>
        <van-cell title="评论需要审核">
          <template #right-icon>
            <van-switch v-model="settings.commentReview" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 黑名单 -->
    <div class="section">
      <van-cell-group inset>
        <van-cell title="黑名单管理" is-link @click="router.push('/setting/blacklist')">
          <template #value>
            <span>{{ blacklistCount }}人</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 个性化推荐 -->
    <div class="section">
      <div class="section-title">个性化推荐</div>
      <van-cell-group inset>
        <van-cell title="允许个性化推荐">
          <template #right-icon>
            <van-switch v-model="settings.allowRecommend" size="20" />
          </template>
        </van-cell>
        <van-cell title="允许使用我的观看记录推荐">
          <template #right-icon>
            <van-switch v-model="settings.useHistoryRecommend" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const settings = reactive({
  showFollowList: true,
  showFavorite: false,
  showHistory: false,
  allowViewProfile: true,
  allowMessage: true,
  allowFollow: true,
  commentReview: false,
  allowRecommend: true,
  useHistoryRecommend: true
})

const blacklistCount = ref(3)

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.privacy-setting-page {
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
