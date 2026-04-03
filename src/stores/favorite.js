import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  // 收藏的短剧 ID 集合
  const favoriteIds = ref(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
  
  // 收藏的短剧详情列表
  const favoriteDramas = ref([])

  // 判断是否已收藏
  function isFavorite(id) {
    return favoriteIds.value.has(id)
  }

  // 添加收藏
  function addFavorite(drama) {
    if (!favoriteIds.value.has(drama.id)) {
      favoriteIds.value.add(drama.id)
      favoriteDramas.value.push(drama)
    }
  }

  // 取消收藏
  function removeFavorite(id) {
    favoriteIds.value.delete(id)
    const index = favoriteDramas.value.findIndex(d => d.id === id)
    if (index > -1) {
      favoriteDramas.value.splice(index, 1)
    }
  }

  // 切换收藏状态
  function toggleFavorite(drama) {
    if (isFavorite(drama.id)) {
      removeFavorite(drama.id)
      return false
    } else {
      addFavorite(drama)
      return true
    }
  }

  // 获取收藏列表
  function getFavoriteList() {
    return favoriteDramas.value
  }

  // 设置收藏列表（初始化用）
  function setFavoriteList(list) {
    favoriteDramas.value = list
    favoriteIds.value = new Set(list.map(d => d.id))
  }

  return {
    favoriteIds,
    favoriteDramas,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    getFavoriteList,
    setFavoriteList
  }
})
