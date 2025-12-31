import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref<string | null>(null)

  // 计算属性：是否已登录
  const isLoggedIn = computed(() => !!token.value)

  /**
   * 设置 Token
   * @param newToken 新的 token 字符串
   */
  function setToken(newToken: string) {
    token.value = newToken
  }

  /**
   * 清除 Token
   */
  function clearToken() {
    token.value = null
  }

  return {
    token,
    isLoggedIn,
    setToken,
    clearToken
  }
}, {
  persist: true
})
