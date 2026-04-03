<template>
  <div class="edit-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">编辑资料</div>
      <div class="save-btn" @click="handleSave">保存</div>
    </header>

    <!-- 头像 -->
    <div class="avatar-section">
      <div class="avatar-wrapper" @click="handleAvatarClick">
        <van-image :src="userInfo.avatar" round width="80" height="80" fit="cover" />
        <div class="avatar-edit">
          <van-icon name="photograph" size="16" color="#fff" />
        </div>
      </div>
      <div class="avatar-tip">点击更换头像</div>
    </div>

    <!-- 表单 -->
    <div class="form-section">
      <van-cell-group inset>
        <van-field v-model="userInfo.name" label="昵称" placeholder="请输入昵称" />
        <van-field v-model="userInfo.signature" label="签名" placeholder="写点什么介绍自己吧" type="textarea" rows="2" autosize />
        <van-cell title="性别" is-link @click="showGenderPicker = true">
          <template #value>
            {{ genderText }}
          </template>
        </van-cell>
        <van-cell title="生日" is-link @click="showDatePicker = true">
          <template #value>
            {{ userInfo.birthday || '未设置' }}
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 其他设置 -->
    <div class="form-section">
      <van-cell-group inset>
        <van-cell title="手机号" is-link @click="showPhoneEdit = true">
          <template #value>
            {{ userInfo.phone || '未绑定' }}
          </template>
        </van-cell>
        <van-cell title="微信" is-link>
          <template #value>
            {{ userInfo.wechat ? '已绑定' : '未绑定' }}
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 手机号编辑弹窗 -->
    <van-popup v-model:show="showPhoneEdit" position="bottom" round :style="{ background: '#1a1a1a' }">
      <div class="phone-popup">
        <div class="popup-header">
          <h3>修改手机号</h3>
          <van-icon name="cross" size="24" color="#fff" @click="showPhoneEdit = false" />
        </div>
        
        <div class="popup-content">
          <van-field
            v-model="newPhone"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
            :error-message="phoneError"
            @blur="validatePhone"
          />
          <van-field
            v-model="verifyCode"
            type="digit"
            label="验证码"
            placeholder="请输入验证码"
            maxlength="6"
          >
            <template #button>
              <van-button 
                size="small" 
                type="primary" 
                :disabled="countdown > 0"
                @click="sendCode"
              >
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </van-button>
            </template>
          </van-field>
        </div>
        
        <div class="popup-actions">
          <van-button block round @click="showPhoneEdit = false">取消</van-button>
          <van-button type="danger" block round @click="confirmPhone">确定</van-button>
        </div>
      </div>
    </van-popup>

    <!-- 性别选择 -->
    <van-action-sheet v-model:show="showGenderPicker" :actions="genderActions" @select="onGenderSelect" />

    <!-- 日期选择 -->
    <van-popup v-model:show="showDatePicker" position="bottom" round>
      <van-date-picker
        v-model="selectedDate"
        title="选择生日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onDateConfirm"
        @cancel="showDatePicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const userInfo = reactive({
  avatar: '/drama-h5/images/actors/actor-1.jpg',
  name: '追剧小达人',
  signature: '热爱追剧，热爱生活',
  gender: 0,
  birthday: '1995-06-15',
  phone: '138****8888',
  wechat: true
})

const showGenderPicker = ref(false)
const showDatePicker = ref(false)
const showPhoneEdit = ref(false)
const newPhone = ref('')
const verifyCode = ref('')
const phoneError = ref('')
const countdown = ref(0)

const genderActions = [
  { name: '男', value: 1 },
  { name: '女', value: 2 },
  { name: '保密', value: 0 }
]

const genderText = computed(() => {
  const item = genderActions.find(g => g.value === userInfo.gender)
  return item?.name || '保密'
})

const selectedDate = ref([
  '1995', '06', '15'
])

const minDate = new Date(1950, 0, 1)
const maxDate = new Date(2020, 11, 31)

function goBack() {
  router.back()
}

function handleAvatarClick() {
  showToast('头像更换功能开发中')
}

function handleSave() {
  showToast('保存成功')
  router.back()
}

function onGenderSelect(action) {
  userInfo.gender = action.value
  showGenderPicker.value = false
}

function onDateConfirm({ selectedValues }) {
  userInfo.birthday = selectedValues.join('-')
  showDatePicker.value = false
}

// 验证手机号
function validatePhone() {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!newPhone.value) {
    phoneError.value = ''
    return false
  }
  if (!phoneRegex.test(newPhone.value)) {
    phoneError.value = '请输入正确的手机号'
    return false
  }
  phoneError.value = ''
  return true
}

// 发送验证码
function sendCode() {
  if (!validatePhone()) {
    showToast('请输入正确的手机号')
    return
  }
  
  showToast('验证码已发送')
  countdown.value = 60
  
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 确认修改手机号
function confirmPhone() {
  if (!validatePhone()) {
    showToast('请输入正确的手机号')
    return
  }
  
  if (!verifyCode.value || verifyCode.value.length !== 6) {
    showToast('请输入6位验证码')
    return
  }
  
  // 模拟验证成功
  userInfo.phone = newPhone.value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  showPhoneEdit.value = false
  newPhone.value = ''
  verifyCode.value = ''
  showToast('手机号修改成功')
}
</script>

<style lang="scss" scoped>
.edit-page {
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

.save-btn {
  position: absolute;
  right: 16px;
  font-size: 14px;
  color: $primary-color;
  font-weight: 500;
}

.header-title {
  font-size: 17px;
  font-weight: 600;
}

.avatar-section {
  padding: 80px 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-wrapper {
  position: relative;
  cursor: pointer;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: $primary-color;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid $bg-color;
}

.avatar-tip {
  font-size: 12px;
  color: $text-tertiary;
  margin-top: 8px;
}

.form-section {
  padding: 0 16px;
  margin-bottom: 16px;
  
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
  
  :deep(.van-field__label) {
    color: $text-secondary;
  }
  
  :deep(.van-field__control) {
    color: $text-primary;
  }
  
  :deep(.van-cell__value) {
    color: $text-tertiary;
  }
}

// 手机号编辑弹窗
.phone-popup {
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
    width: 60px;
  }
  
  :deep(.van-field__control) {
    color: $text-primary;
  }
}

.popup-actions {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid $border-light;
}
</style>
