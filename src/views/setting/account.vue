<template>
  <div class="account-setting-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">账号与安全</div>
    </header>

    <!-- 账号信息 -->
    <div class="section">
      <van-cell-group inset>
        <van-cell title="账号" :value="userInfo.account" />
        <van-cell title="手机号" :value="userInfo.phone" is-link @click="router.push('/profile/edit')" />
        <van-cell title="微信" :value="userInfo.wechat ? '已绑定' : '未绑定'" is-link />
        <van-cell title="QQ" :value="userInfo.qq ? '已绑定' : '未绑定'" is-link />
      </van-cell-group>
    </div>

    <!-- 安全设置 -->
    <div class="section">
      <div class="section-title">安全设置</div>
      <van-cell-group inset>
        <van-cell title="修改密码" is-link @click="showPasswordModal = true" />
        <van-cell title="支付密码" is-link @click="showPayPasswordModal = true">
          <template #value>
            <span :class="{ 'text-warning': !hasPayPassword }">{{ hasPayPassword ? '已设置' : '未设置' }}</span>
          </template>
        </van-cell>

      </van-cell-group>
    </div>

    <!-- 注销账号 -->
    <div class="section">
      <van-cell-group inset>
        <van-cell title="注销账号" is-link @click="handleDeleteAccount" />
      </van-cell-group>
    </div>

    <!-- 修改密码弹窗 -->
    <van-popup v-model:show="showPasswordModal" position="bottom" round :style="{ background: '#1a1a1a' }">
      <div class="modal-popup">
        <div class="popup-header">
          <h3>修改密码</h3>
          <van-icon name="cross" size="24" color="#fff" @click="showPasswordModal = false" />
        </div>
        <div class="popup-content">
          <van-field v-model="oldPassword" type="password" label="原密码" placeholder="请输入原密码" />
          <van-field v-model="newPassword" type="password" label="新密码" placeholder="请输入新密码" />
          <van-field v-model="confirmPassword" type="password" label="确认密码" placeholder="请再次输入新密码" />
        </div>
        <div class="popup-actions">
          <van-button type="danger" block round @click="handleChangePassword">确认修改</van-button>
        </div>
      </div>
    </van-popup>

    <!-- 设置支付密码弹窗 -->
    <van-popup v-model:show="showPayPasswordModal" position="bottom" round :style="{ background: '#1a1a1a' }">
      <div class="modal-popup">
        <div class="popup-header">
          <h3>{{ hasPayPassword ? '修改支付密码' : '设置支付密码' }}</h3>
          <van-icon name="cross" size="24" color="#fff" @click="showPayPasswordModal = false" />
        </div>
        <div class="popup-content">
          <van-field v-model="payPassword" type="digit" label="支付密码" placeholder="请输入6位数字密码" maxlength="6" />
          <van-field v-model="confirmPayPassword" type="digit" label="确认密码" placeholder="请再次输入支付密码" maxlength="6" />
        </div>
        <div class="popup-actions">
          <van-button type="danger" block round @click="handleSetPayPassword">确认</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'

const router = useRouter()

const userInfo = reactive({
  account: '88866688',
  phone: '138****8888',
  wechat: true,
  qq: false
})

const hasPayPassword = ref(true)
const showPasswordModal = ref(false)
const showPayPasswordModal = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const payPassword = ref('')
const confirmPayPassword = ref('')

function goBack() {
  router.back()
}

function handleChangePassword() {
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    showToast('请填写完整信息')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    showToast('两次密码不一致')
    return
  }
  showToast('密码修改成功')
  showPasswordModal.value = false
  oldPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}

function handleSetPayPassword() {
  if (payPassword.value.length !== 6 || confirmPayPassword.value.length !== 6) {
    showToast('请输入6位数字密码')
    return
  }
  if (payPassword.value !== confirmPayPassword.value) {
    showToast('两次密码不一致')
    return
  }
  hasPayPassword.value = true
  showToast('设置成功')
  showPayPasswordModal.value = false
  payPassword.value = ''
  confirmPayPassword.value = ''
}

async function handleDeleteAccount() {
  try {
    await showConfirmDialog({
      title: '警告',
      message: '注销账号后，您的所有数据将被删除且无法恢复，确定要注销吗？'
    })
    showToast('账号注销申请已提交')
  } catch {
    // 取消
  }
}
</script>

<style lang="scss" scoped>
.account-setting-page {
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

:deep(.van-cell .van-cell__value) {
  color: $text-tertiary;
}

.text-warning {
  color: #ff4757;
}

.modal-popup {
  padding-bottom: env(safe-area-inset-bottom);
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid $border-light;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: $text-primary;
  }
}

.popup-content {
  padding: 16px;
  
  :deep(.van-cell) {
    background: $bg-tertiary;
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 12px;
  }
  
  :deep(.van-field__label) {
    color: $text-secondary;
  }
  
  :deep(.van-field__control) {
    color: $text-primary;
    letter-spacing: 4px;
  }
  
  :deep(.van-field__control::-webkit-text-security) {
    color: #fff;
  }
}

.popup-actions {
  padding: 16px;
  border-top: 1px solid $border-light;
}
</style>
