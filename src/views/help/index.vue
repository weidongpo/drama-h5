<template>
  <div class="help-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">帮助与反馈</div>
      <div class="header-right"></div>
    </header>

    <!-- 常见问题 -->
    <div class="section">
      <div class="section-title">常见问题</div>
      <div class="faq-list">
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item title="如何开通VIP会员？" name="1">
            进入"我的"页面，点击VIP卡片或"开通VIP"按钮，选择合适的套餐完成支付即可开通VIP会员。
          </van-collapse-item>
          <van-collapse-item title="观影券有什么用？" name="2">
            观影券可以用于解锁VIP剧集，每解锁一集消耗1张观影券。观影券可以通过完成任务、邀请好友或购买获得。
          </van-collapse-item>
          <van-collapse-item title="如何下载短剧？" name="3">
            在短剧详情页，点击"下载"按钮即可下载剧集。已下载的内容可以在"我的下载"中查看和播放。
          </van-collapse-item>
          <van-collapse-item title="视频播放卡顿怎么办？" name="4">
            请检查网络连接是否正常，尝试切换WiFi或4G网络。如果问题仍然存在，可以尝试清除缓存或联系客服。
          </van-collapse-item>
          <van-collapse-item title="如何联系客服？" name="5">
            您可以通过本页面的"意见反馈"功能提交问题，或发送邮件至客服邮箱：support@drama.com。
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>

    <!-- 意见反馈 -->
    <div class="section">
      <div class="section-title">意见反馈</div>
      <div class="feedback-form">
        <van-field
          v-model="feedbackContent"
          rows="4"
          autosize
          type="textarea"
          placeholder="请描述您遇到的问题或建议..."
          class="feedback-input"
        />
        <div class="feedback-type">
          <div class="type-label">问题类型</div>
          <div class="type-options">
            <div 
              class="type-option" 
              :class="{ active: feedbackType === type }"
              v-for="type in typeOptions" 
              :key="type"
              @click="feedbackType = type"
            >
              {{ type }}
            </div>
          </div>
        </div>
        <van-button type="danger" block round @click="handleSubmit">提交反馈</van-button>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="section">
      <div class="section-title">联系我们</div>
      <div class="contact-list">
        <div class="contact-item">
          <van-icon name="envelop-o" size="20" color="#ff4757" />
          <span>客服邮箱：support@drama.com</span>
        </div>
        <div class="contact-item">
          <van-icon name="phone-o" size="20" color="#ff4757" />
          <span>客服电话：400-888-8888</span>
        </div>
        <div class="contact-item">
          <van-icon name="clock-o" size="20" color="#ff4757" />
          <span>工作时间：周一至周日 9:00-21:00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const activeNames = ref([])
const feedbackContent = ref('')
const feedbackType = ref('功能建议')
const typeOptions = ['功能建议', '问题反馈', '内容投诉', '其他']

function goBack() {
  router.back()
}

function handleSubmit() {
  if (!feedbackContent.value.trim()) {
    showToast('请输入反馈内容')
    return
  }
  
  showToast('提交成功，感谢您的反馈！')
  feedbackContent.value = ''
}
</script>

<style lang="scss" scoped>
.help-page {
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

.back-btn, .header-right {
  position: absolute;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn {
  left: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.header-right {
  right: 16px;
}

.header-title {
  font-size: 17px;
  font-weight: 600;
}

.section {
  padding: 0 16px;
  margin-top: 60px;
  margin-bottom: 20px;
  
  &:first-of-type {
    margin-top: 60px;
  }
}

.section-title {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
}

.faq-list {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  
  :deep(.van-collapse-item__content) {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    font-size: 13px;
    line-height: 1.6;
  }
  
  :deep(.van-cell) {
    background: transparent;
    color: var(--text-primary);
  }
  
  :deep(.van-cell::after) {
    border-color: var(--border-light);
  }
}

.feedback-form {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px;
}

.feedback-input {
  background: var(--bg-tertiary);
  border-radius: 8px;
  margin-bottom: 16px;
  
  :deep(.van-field__control) {
    color: var(--text-primary);
  }
}

.feedback-type {
  margin-bottom: 16px;
}

.type-label {
  font-size: 14px;
  margin-bottom: 12px;
}

.type-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.type-option {
  padding: 8px 16px;
  background: var(--bg-tertiary);
  border-radius: 20px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  
  &.active {
    background: rgba(var(--primary-color), 0.15);
    color: var(--primary-color);
  }
}

.contact-list {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
  
  &:last-child {
    border-bottom: none;
  }
  
  span {
    font-size: 14px;
    color: var(--text-secondary);
  }
}
</style>
