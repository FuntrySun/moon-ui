import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterCredentials } from '@/types/auth'
import { AuthService } from '@/services/authService'
import { StorageService } from '@/services/storageService'

/**
 * 用户认证 Store
 * 管理用户登录状态、用户信息和认证流程
 */
export const useAuthStore = defineStore('auth', () => {
  // ========== 状态 ==========
  const currentUser = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!currentUser.value && !!token.value)

  // ========== Actions ==========

  /**
   * 用户注册
   */
  async function register(credentials: RegisterCredentials): Promise<{ success: boolean; message: string }> {
    try {
      const result = await AuthService.register(credentials)
      
      if (result.success && result.user && result.token) {
        // 更新状态
        currentUser.value = result.user
        token.value = result.token
        
        // 持久化存储
        StorageService.setCurrentUser(result.user)
        StorageService.setAuthToken(result.token)
        StorageService.setRememberMe(true)
        
        return {
          success: true,
          message: result.message
        }
      }
      
      return {
        success: false,
        message: result.message
      }
    } catch (error) {
      console.error('注册错误:', error)
      return {
        success: false,
        message: '注册失败，请稍后重试'
      }
    }
  }

  /**
   * 用户登录
   */
  async function login(credentials: LoginCredentials): Promise<{ success: boolean; message: string }> {
    try {
      const result = await AuthService.login(credentials)
      
      if (result.success && result.user && result.token) {
        // 更新状态
        currentUser.value = result.user
        token.value = result.token
        
        // 持久化存储
        StorageService.setCurrentUser(result.user)
        StorageService.setAuthToken(result.token)
        StorageService.setRememberMe(credentials.rememberMe || false)
        
        return {
          success: true,
          message: result.message
        }
      }
      
      return {
        success: false,
        message: result.message
      }
    } catch (error) {
      console.error('登录错误:', error)
      return {
        success: false,
        message: '登录失败，请稍后重试'
      }
    }
  }

  /**
   * 用户登出
   */
  function logout(): void {
    // 清除状态
    currentUser.value = null
    token.value = null
    
    // 清除存储
    AuthService.logout()
  }

  /**
   * 检查认证状态
   * 应用启动时调用，从 localStorage 恢复登录状态，并检查 Token 是否过期
   */
  function checkAuth(): void {
    try {
      // 检查是否需要记住登录状态
      const rememberMe = StorageService.getRememberMe()
      if (!rememberMe) {
        // 如果未勾选记住我，清除所有认证信息
        logout()
        return
      }

      // 获取存储的令牌
      const storedToken = StorageService.getAuthToken()
      if (!storedToken) {
        logout()
        return
      }

      // 验证令牌（包含过期检查）
      const user = AuthService.validateToken(storedToken)
      if (user) {
        // Token 有效，恢复登录状态
        currentUser.value = user
        token.value = storedToken
        
        // 检查 Token 是否即将过期
        if (AuthService.isTokenExpiringSoon(storedToken)) {
          const remainingTime = AuthService.getTokenRemainingTime(storedToken)
          const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000))
          console.warn(`Token 将在 ${remainingHours} 小时后过期`)
          // 可以在这里添加提示用户重新登录的逻辑
        }
      } else {
        // Token 无效或已过期，清除所有认证信息
        console.log('Token 无效或已过期，已自动登出')
        logout()
      }
    } catch (error) {
      console.error('检查认证状态失败:', error)
      logout()
    }
  }

  /**
   * 获取当前用户信息
   */
  function getCurrentUser(): User | null {
    return currentUser.value
  }

  /**
   * 更新用户信息
   */
  function updateUser(user: User): void {
    currentUser.value = user
    StorageService.setCurrentUser(user)
    StorageService.saveUser(user)
  }

  return {
    // 状态
    currentUser,
    token,
    isAuthenticated,
    
    // 方法
    register,
    login,
    logout,
    checkAuth,
    getCurrentUser,
    updateUser
  }
})
