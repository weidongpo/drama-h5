import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '@/api'

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref(null)
  const isLoggedIn = computed(() => !!userInfo.value)
  const token = ref(localStorage.getItem('token') || '')
  
  // 用户统计
  const stats = ref({
    followCount: 0,
    favoriteCount: 0,
    points: 0,
    tickets: 0
  })

  // 获取用户信息
  async function fetchProfile() {
    try {
      const res = await userApi.getProfile()
      userInfo.value = res.data
      stats.value = res.data.stats || stats.value
      return res.data
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }

  // 更新用户信息
  async function updateProfile(data) {
    try {
      const res = await userApi.updateProfile(data)
      userInfo.value = { ...userInfo.value, ...res.data }
      return res.data
    } catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    }
  }

  // 登录
  function login(tokenValue, user) {
    token.value = tokenValue
    userInfo.value = user
    localStorage.setItem('token', tokenValue)
  }

  // 登出
  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  // 更新积分
  function updatePoints(value) {
    stats.value.points = value
  }

  return {
    userInfo,
    isLoggedIn,
    token,
    stats,
    fetchProfile,
    updateProfile,
    login,
    logout,
    updatePoints
  }
})
