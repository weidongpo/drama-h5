// API 基础配置
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// 请求封装
async function request(url, options = {}) {
  const token = localStorage.getItem('token')
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  }
  
  const response = await fetch(`${BASE_URL}${url}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}

// 短剧相关 API
export const dramaApi = {
  // 获取首页推荐
  getRecommend(params) {
    return request('/drama/recommend', { 
      method: 'GET',
      params: new URLSearchParams(params)
    })
  },
  
  // 获取分类列表
  getCategories() {
    return request('/drama/categories')
  },
  
  // 获取轮播图
  getBanners() {
    return request('/drama/banners')
  },
  
  // 获取短剧详情
  getDetail(id) {
    return request(`/drama/${id}`)
  },
  
  // 获取剧集列表
  getEpisodes(dramaId) {
    return request(`/drama/${dramaId}/episodes`)
  },
  
  // 搜索短剧
  search(keyword) {
    return request('/drama/search', {
      method: 'POST',
      body: JSON.stringify({ keyword })
    })
  }
}

// 用户相关 API
export const userApi = {
  // 获取用户信息
  getProfile() {
    return request('/user/profile')
  },
  
  // 更新用户信息
  updateProfile(data) {
    return request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  
  // 获取追剧列表
  getFollowList() {
    return request('/user/follow')
  },
  
  // 添加追剧
  addFollow(dramaId) {
    return request('/user/follow', {
      method: 'POST',
      body: JSON.stringify({ dramaId })
    })
  },
  
  // 取消追剧
  removeFollow(dramaId) {
    return request(`/user/follow/${dramaId}`, {
      method: 'DELETE'
    })
  },
  
  // 获取收藏列表
  getFavoriteList(type = 'drama') {
    return request(`/user/favorite?type=${type}`)
  },
  
  // 添加收藏
  addFavorite(data) {
    return request('/user/favorite', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },
  
  // 取消收藏
  removeFavorite(id) {
    return request(`/user/favorite/${id}`, {
      method: 'DELETE'
    })
  },
  
  // 获取观看历史
  getHistory() {
    return request('/user/history')
  },
  
  // 更新观看进度
  updateProgress(dramaId, episodeId, progress) {
    return request('/user/progress', {
      method: 'POST',
      body: JSON.stringify({ dramaId, episodeId, progress })
    })
  }
}

// 任务相关 API
export const taskApi = {
  // 获取任务列表
  getTasks() {
    return request('/task/list')
  },
  
  // 领取任务奖励
  claimReward(taskId) {
    return request(`/task/${taskId}/claim`, {
      method: 'POST'
    })
  },
  
  // 签到
  checkIn() {
    return request('/task/checkin', {
      method: 'POST'
    })
  },
  
  // 获取积分信息
  getPoints() {
    return request('/user/points')
  }
}

export default request
