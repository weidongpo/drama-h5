import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dramaApi } from '@/api'

export const useDramaStore = defineStore('drama', () => {
  // 推荐列表
  const recommendList = ref([])
  
  // 轮播图
  const banners = ref([])
  
  // 分类
  const categories = ref([
    { id: 0, name: '推荐', active: true },
    { id: 1, name: '都市' },
    { id: 2, name: '古装' },
    { id: 3, name: '甜宠' },
    { id: 4, name: '霸总' },
    { id: 5, name: '逆袭' },
    { id: 6, name: '复仇' },
    { id: 7, name: '悬疑' }
  ])
  
  // 当前分类
  const currentCategory = ref(0)
  
  // 当前短剧详情
  const currentDrama = ref(null)
  
  // 加载状态
  const loading = ref(false)

  // 获取推荐列表
  async function fetchRecommend(categoryId = 0) {
    loading.value = true
    try {
      const res = await dramaApi.getRecommend({ category: categoryId })
      recommendList.value = res.data || []
      return res.data
    } catch (error) {
      console.error('获取推荐失败:', error)
      // 使用模拟数据
      recommendList.value = getMockDramas()
      return recommendList.value
    } finally {
      loading.value = false
    }
  }

  // 获取轮播图
  async function fetchBanners() {
    try {
      const res = await dramaApi.getBanners()
      banners.value = res.data || []
      return res.data
    } catch (error) {
      console.error('获取轮播图失败:', error)
      // 使用模拟数据
      banners.value = getMockBanners()
      return banners.value
    }
  }

  // 获取短剧详情
  async function fetchDetail(id) {
    loading.value = true
    try {
      const res = await dramaApi.getDetail(id)
      currentDrama.value = res.data
      return res.data
    } catch (error) {
      console.error('获取详情失败:', error)
      // 使用模拟数据
      currentDrama.value = getMockDetail(id)
      return currentDrama.value
    } finally {
      loading.value = false
    }
  }

  // 切换分类
  function setCategory(categoryId) {
    currentCategory.value = categoryId
    categories.value.forEach(cat => {
      cat.active = cat.id === categoryId
    })
  }

  return {
    recommendList,
    banners,
    categories,
    currentCategory,
    currentDrama,
    loading,
    fetchRecommend,
    fetchBanners,
    fetchDetail,
    setCategory
  }
})

// 模拟数据
function getMockDramas() {
  return [
    { id: 1, title: '重生之商业女王', cover: 'https://picsum.photos/300/400?random=2', views: '1.8亿', isVip: true, episodes: 98, status: 'updating' },
    { id: 2, title: '总裁的替身新娘', cover: 'https://picsum.photos/300/400?random=3', views: '1.2亿', isVip: false, episodes: 65, status: 'updating' },
    { id: 3, title: '穿越之医妃倾天下', cover: 'https://picsum.photos/300/400?random=4', views: '9800万', isVip: true, episodes: 80, status: 'completed' },
    { id: 4, title: '闪婚后千亿总裁宠上天', cover: 'https://picsum.photos/300/400?random=5', views: '8500万', isVip: false, episodes: 42, status: 'updating' },
    { id: 5, title: '落魄千金复仇记', cover: 'https://picsum.photos/300/400?random=6', views: '7200万', isVip: true, episodes: 60, status: 'completed' },
    { id: 6, title: '隐世高手在都市', cover: 'https://picsum.photos/300/400?random=7', views: '6800万', isVip: false, episodes: 55, status: 'updating' }
  ]
}

function getMockBanners() {
  return [
    { id: 1, image: 'https://picsum.photos/800/450?random=1', title: '豪门千金的逆袭人生', views: '2.3亿', episodes: 86, tag: '🔥 热播榜 TOP1' }
  ]
}

function getMockDetail(id) {
  return {
    id,
    title: '豪门千金的逆袭人生',
    cover: 'https://picsum.photos/800/450?random=1',
    description: '豪门千金苏晚晴被继母陷害，流落街头。五年后，她华丽归来，誓要让那些伤害过她的人付出代价。在这个过程中，她意外与冷面总裁陆景琛产生了交集，两人从互相看不顺眼到暗生情愫，最终携手走向幸福...',
    tags: ['都市', '逆袭', '甜宠', '霸总'],
    views: '2.3亿',
    episodes: 86,
    isVip: true,
    price: 19.9,
    vipPrice: 9.9
  }
}
