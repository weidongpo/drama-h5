import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem('theme') || 'dark'
  }),
  
  getters: {
    isDark: (state) => state.theme === 'dark'
  },
  
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      this.applyTheme()
      localStorage.setItem('theme', this.theme)
    },
    
    setTheme(theme) {
      this.theme = theme
      this.applyTheme()
      localStorage.setItem('theme', this.theme)
    },
    
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    
    initTheme() {
      // 初始化时应用保存的主题
      this.applyTheme()
    }
  }
})
