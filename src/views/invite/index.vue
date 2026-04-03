<template>
  <div class="invite-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">邀请好友</div>
    </header>

    <!-- 邀请卡片 -->
    <div class="invite-card">
      <div class="card-bg">
        <div class="card-title">邀请好友得奖励</div>
        <div class="card-reward">
          <div class="reward-item">
            <div class="reward-value">20</div>
            <div class="reward-label">积分/人</div>
          </div>
          <div class="reward-divider"></div>
          <div class="reward-item">
            <div class="reward-value">{{ inviteStats.invitedCount }}</div>
            <div class="reward-label">已邀请</div>
          </div>
          <div class="reward-divider"></div>
          <div class="reward-item">
            <div class="reward-value">{{ inviteStats.totalPoints }}</div>
            <div class="reward-label">累计获得</div>
          </div>
        </div>
        
        <div class="invite-code">
          <div class="code-label">我的邀请码</div>
          <div class="code-value">{{ inviteCode }}</div>
          <van-button type="primary" size="small" round @click="copyCode">复制</van-button>
        </div>
      </div>
    </div>

    <!-- 邀请方式 -->
    <div class="share-section">
      <h3>邀请方式</h3>
      <div class="share-options">
        <div class="share-item" @click="shareToWechat">
          <div class="share-icon wechat">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#07c160">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.036 2.533c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
            </svg>
          </div>
          <span>微信好友</span>
        </div>
        <div class="share-item" @click="shareToMoments">
          <div class="share-icon moments">
            <van-icon name="circle" size="32" color="#07c160" />
          </div>
          <span>朋友圈</span>
        </div>
        <div class="share-item" @click="shareToQQ">
          <div class="share-icon qq">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#12b7f5">
              <path d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29.43 2.213 0 6.29.256 6.29-.43 0-.687-1.77-1.182-1.77-1.182 2.085-1.77 1.904-3.967 1.904-3.967.846 1.588 1.634 2.072 1.748 2.072.111 0 .281-.36.281-1.025 0-2.514-2.164-6.954-2.164-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"/>
            </svg>
          </div>
          <span>QQ好友</span>
        </div>
        <div class="share-item" @click="copyLink">
          <div class="share-icon link">
            <van-icon name="link-o" size="32" color="#ff9500" />
          </div>
          <span>复制链接</span>
        </div>
      </div>
    </div>

    <!-- 邀请规则 -->
    <div class="rules-section">
      <h3>邀请规则</h3>
      <div class="rules-list">
        <div class="rule-item">
          <span class="rule-num">1</span>
          <span class="rule-text">分享邀请链接给好友</span>
        </div>
        <div class="rule-item">
          <span class="rule-num">2</span>
          <span class="rule-text">好友通过链接注册成功</span>
        </div>
        <div class="rule-item">
          <span class="rule-num">3</span>
          <span class="rule-text">双方各获得20积分奖励</span>
        </div>
      </div>
    </div>

    <!-- 邀请记录 -->
    <div class="record-section">
      <h3>邀请记录</h3>
      <div class="record-list">
        <div class="record-item" v-for="item in inviteRecords" :key="item.id">
          <van-image :src="item.avatar" round width="40" height="40" fit="cover" />
          <div class="record-info">
            <div class="record-name">{{ item.name }}</div>
            <div class="record-time">{{ item.time }}</div>
          </div>
          <div class="record-reward">+{{ item.reward }}积分</div>
        </div>
        
        <van-empty v-if="!inviteRecords.length" description="暂无邀请记录" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const inviteCode = ref('ABC123XYZ')
const inviteStats = ref({
  invitedCount: 12,
  totalPoints: 240
})

const inviteRecords = ref([
  { id: 1, name: '用户***123', avatar: 'https://i.pravatar.cc/80?img=1', time: '2026-04-01 14:30', reward: 20 },
  { id: 2, name: '用户***456', avatar: 'https://i.pravatar.cc/80?img=2', time: '2026-03-30 10:15', reward: 20 },
  { id: 3, name: '用户***789', avatar: 'https://i.pravatar.cc/80?img=3', time: '2026-03-28 18:20', reward: 20 },
  { id: 4, name: '用户***012', avatar: 'https://i.pravatar.cc/80?img=4', time: '2026-03-25 09:45', reward: 20 }
])

function copyCode() {
  navigator.clipboard?.writeText(inviteCode.value)
  showToast('邀请码已复制')
}

function shareToWechat() {
  showToast('请安装微信客户端')
}

function shareToMoments() {
  showToast('请安装微信客户端')
}

function shareToQQ() {
  showToast('请安装QQ客户端')
}

function copyLink() {
  const link = `https://drama.example.com/invite?code=${inviteCode.value}`
  navigator.clipboard?.writeText(link)
  showToast('链接已复制')
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.invite-page {
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

.invite-card {
  margin: 66px 16px 16px;
}

.card-bg {
  background: linear-gradient(135deg, var(--primary-color) 0%, #ff6b81 100%);
  border-radius: 16px;
  padding: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
}

.card-reward {
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
}

.reward-item {
  text-align: center;
}

.reward-value {
  font-size: 32px;
  font-weight: 700;
}

.reward-label {
  font-size: 12px;
  opacity: 0.8;
}

.reward-divider {
  width: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.invite-code {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.code-label {
  font-size: 13px;
  opacity: 0.8;
}

.code-value {
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}

.share-section, .rules-section, .record-section {
  padding: 0 16px;
  margin-bottom: 24px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }
}

.share-options {
  display: flex;
  justify-content: space-around;
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 20px;
}

.share-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  span {
    font-size: 12px;
    color: var(--text-secondary);
  }
}

.share-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.wechat, &.moments {
    background: rgba(#07c160, 0.1);
  }
  
  &.qq {
    background: rgba(#12b7f5, 0.1);
  }
  
  &.link {
    background: rgba(#ff9500, 0.1);
  }
}

.rules-list {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px;
}

.rule-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
  
  &:last-child {
    border-bottom: none;
  }
}

.rule-num {
  width: 24px;
  height: 24px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.rule-text {
  font-size: 14px;
}

.record-list {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px;
}

.record-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
  
  &:last-child {
    border-bottom: none;
  }
}

.record-info {
  flex: 1;
}

.record-name {
  font-size: 14px;
  margin-bottom: 4px;
}

.record-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.record-reward {
  font-size: 14px;
  color: var(--primary-color);
  font-weight: 500;
}
</style>
