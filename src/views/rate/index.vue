<template>
  <div class="rate-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">给个好评</div>
    </header>

    <!-- 内容 -->
    <div class="content">
      <div class="logo">
        <van-icon name="video" size="48" color="#ff4757" />
      </div>
      <h3>喜欢追剧达人吗？</h3>
      <p class="desc">您的支持是我们前进的动力！</p>
      
      <!-- 评分 -->
      <div class="rating-section">
        <van-rate 
          v-model="rating" 
          :size="32" 
          color="#ffd700" 
          void-color="#333"
          @change="handleRatingChange"
        />
        <p class="rating-text">{{ ratingText }}</p>
      </div>
      
      <!-- 评价标签 -->
      <div class="tags-section" v-if="rating >= 4">
        <div class="section-title">您喜欢追剧达人的哪些方面？</div>
        <div class="tags-list">
          <div 
            class="tag-item" 
            :class="{ active: selectedTags.includes(tag) }"
            v-for="tag in tagOptions" 
            :key="tag"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </div>
        </div>
      </div>
      
      <!-- 评价内容 -->
      <div class="feedback-section">
        <van-field
          v-model="feedback"
          rows="3"
          autosize
          type="textarea"
          placeholder="说说您的使用感受吧..."
          class="feedback-input"
        />
      </div>
      
      <!-- 提交按钮 -->
      <van-button type="danger" block round @click="handleSubmit">
        {{ rating >= 4 ? '提交好评' : '提交反馈' }}
      </van-button>
      
      <!-- 去应用商店评分 -->
      <div class="store-rating" v-if="rating >= 4">
        <p>如果您喜欢追剧达人，请到应用商店给我们评分吧！</p>
        <van-button plain round @click="goToStore">去应用商店评分</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const rating = ref(5)
const feedback = ref('')
const selectedTags = ref([])

const tagOptions = [
  '内容丰富', '播放流畅', '界面美观', '更新及时', 
  'VIP划算', '客服态度好', '无广告', '画质清晰'
]

const ratingText = computed(() => {
  const texts = {
    1: '非常不满意',
    2: '不太满意',
    3: '一般般',
    4: '比较满意',
    5: '非常满意'
  }
  return texts[rating.value] || ''
})

function goBack() {
  router.back()
}

function handleRatingChange(value) {
  if (value >= 4) {
    showToast('感谢您的支持！')
  }
}

function toggleTag(tag) {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

function handleSubmit() {
  if (rating.value >= 4) {
    showToast('感谢您的好评！')
  } else {
    showToast('感谢您的反馈，我们会努力改进！')
  }
  router.back()
}

function goToStore() {
  showToast('正在跳转应用商店...')
}
</script>

<style lang="scss" scoped>
.rate-page {
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

.content {
  padding: 70px 16px 20px;
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

h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.desc {
  font-size: 14px;
  color: $text-secondary;
  margin-bottom: 24px;
}

.rating-section {
  margin-bottom: 24px;
  
  .rating-text {
    font-size: 14px;
    color: $text-tertiary;
    margin-top: 12px;
  }
}

.tags-section {
  margin-bottom: 20px;
  text-align: left;
}

.section-title {
  font-size: 14px;
  color: $text-tertiary;
  margin-bottom: 12px;
  text-align: center;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.tag-item {
  padding: 8px 16px;
  background: $bg-secondary;
  border-radius: 20px;
  font-size: 13px;
  color: $text-secondary;
  cursor: pointer;
  
  &.active {
    background: rgba($primary-color, 0.15);
    color: $primary-color;
  }
}

.feedback-section {
  margin-bottom: 20px;
}

.feedback-input {
  background: $bg-secondary;
  border-radius: 12px;
  
  :deep(.van-field__control) {
    color: $text-primary;
  }
}

.store-rating {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid $border-light;
  
  p {
    font-size: 14px;
    color: $text-tertiary;
    margin-bottom: 12px;
  }
}
</style>
