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
    { id: 1, title: '豪门千金的逆袭人生', cover: 'https://picsum.photos/300/400?random=2', views: '2.3亿', isVip: true, episodes: 86, status: 'completed', likes: 128000, description: '豪门千金苏晚晴被继母陷害，流落街头。五年后，她华丽归来，誓要让那些伤害过她的人付出代价。在这个过程中，她意外与冷面总裁陆景琛产生了交集...', tags: ['都市', '逆袭', '甜宠', '霸总'] },
    { id: 2, title: '重生之商业女王', cover: 'https://picsum.photos/300/400?random=3', views: '1.8亿', isVip: false, episodes: 98, status: 'updating', likes: 98000, description: '前世被渣男和闺蜜联手害死，重生归来，她发誓要让所有人付出代价。凭借前世的记忆，她在商界叱咤风云...', tags: ['重生', '逆袭', '商战'] },
    { id: 3, title: '穿越之医妃倾天下', cover: 'https://picsum.photos/300/400?random=4', views: '1.2亿', isVip: true, episodes: 80, status: 'completed', likes: 86000, description: '现代医学博士穿越成古代不受宠的嫡女，凭借精湛医术在古代混得风生水起...', tags: ['古装', '穿越', '医妃'] },
    { id: 4, title: '闪婚后千亿总裁宠上天', cover: 'https://picsum.photos/300/400?random=5', views: '9800万', isVip: false, episodes: 42, status: 'updating', likes: 72000, description: '被继母逼婚，她一怒之下随便拉了个男人领证，没想到对方竟然是千亿总裁...', tags: ['甜宠', '霸总', '闪婚'] },
    { id: 5, title: '落魄千金复仇记', cover: 'https://picsum.photos/300/400?random=6', views: '8500万', isVip: true, episodes: 60, status: 'completed', likes: 58000, description: '一夜之间家破人亡，她从天堂跌入地狱。十年后，她带着一身本领归来复仇...', tags: ['复仇', '逆袭', '都市'] },
    { id: 6, title: '隐世高手在都市', cover: 'https://picsum.photos/300/400?random=7', views: '7200万', isVip: false, episodes: 55, status: 'updating', likes: 45000, description: '隐世宗门传人下山历练，凭借一身绝技在都市中纵横捭阖...', tags: ['都市', '爽文', '热血'] },
    { id: 7, title: '替身新娘：总裁的契约妻', cover: 'https://picsum.photos/300/400?random=8', views: '6800万', isVip: true, episodes: 72, status: 'completed', likes: 52000, description: '为了替妹妹还债，她被迫成为他的契约妻子，却没想到假戏真做...', tags: ['甜宠', '契约', '霸总'] },
    { id: 8, title: '神医毒妃', cover: 'https://picsum.photos/300/400?random=9', views: '5800万', isVip: false, episodes: 68, status: 'updating', likes: 38000, description: '她是21世纪顶级毒医，一朝穿越成为被废的太子妃，从此开启开挂人生...', tags: ['古装', '穿越', '毒医'] },
    { id: 9, title: '千亿宠婚：总裁大人求放过', cover: 'https://picsum.photos/300/400?random=10', views: '5200万', isVip: true, episodes: 45, status: 'completed', likes: 35000, description: '一场意外，她惹上了这座城市最尊贵的男人，从此被他宠上天...', tags: ['甜宠', '霸总', '宠婚'] }
  ]
}

function getMockBanners() {
  return [
    { id: 1, image: 'https://picsum.photos/800/450?random=1', title: '豪门千金的逆袭人生', views: '2.3亿', episodes: 86, tag: '🔥 热播榜 TOP1', description: '豪门千金苏晚晴被继母陷害，流落街头。五年后，她华丽归来...' },
    { id: 2, image: 'https://picsum.photos/800/450?random=11', title: '重生之商业女王', views: '1.8亿', episodes: 98, tag: '⭐ 新剧推荐', description: '前世被渣男和闺蜜联手害死，重生归来...' },
    { id: 3, image: 'https://picsum.photos/800/450?random=12', title: '穿越之医妃倾天下', views: '1.2亿', episodes: 80, tag: '👑 古装热剧', description: '现代医学博士穿越成古代不受宠的嫡女...' }
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
