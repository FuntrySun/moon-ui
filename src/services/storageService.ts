import type { User } from '@/types/auth'

/**
 * LocalStorage 键名常量
 */
const STORAGE_KEYS = {
  USERS: 'moon_ui_users',
  CURRENT_USER: 'moon_ui_current_user',
  AUTH_TOKEN: 'moon_ui_auth_token',
  REMEMBER_ME: 'moon_ui_remember_me'
} as const

/**
 * LocalStorage 封装服务
 * 提供类型安全的存储接口
 */
export class StorageService {
  /**
   * 保存用户到用户列表
   */
  static saveUser(user: User): void {
    try {
      const users = this.getUsers()
      const existingIndex = users.findIndex(u => u.id === user.id)
      
      if (existingIndex >= 0) {
        users[existingIndex] = user
      } else {
        users.push(user)
      }
      
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    } catch (error) {
      console.error('保存用户失败:', error)
      throw new Error('保存用户数据失败')
    }
  }

  /**
   * 获取所有用户列表
   */
  static getUsers(): User[] {
    try {
      const usersJson = localStorage.getItem(STORAGE_KEYS.USERS)
      return usersJson ? JSON.parse(usersJson) : []
    } catch (error) {
      console.error('读取用户列表失败:', error)
      return []
    }
  }

  /**
   * 根据用户名查找用户
   */
  static getUserByUsername(username: string): User | null {
    const users = this.getUsers()
    return users.find(u => u.username === username) || null
  }

  /**
   * 根据ID查找用户
   */
  static getUserById(id: string): User | null {
    const users = this.getUsers()
    return users.find(u => u.id === id) || null
  }

  /**
   * 保存当前登录用户
   */
  static setCurrentUser(user: User | null): void {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
      }
    } catch (error) {
      console.error('保存当前用户失败:', error)
    }
  }

  /**
   * 获取当前登录用户
   */
  static getCurrentUser(): User | null {
    try {
      const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
      return userJson ? JSON.parse(userJson) : null
    } catch (error) {
      console.error('读取当前用户失败:', error)
      return null
    }
  }

  /**
   * 保存认证令牌
   */
  static setAuthToken(token: string | null): void {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      }
    } catch (error) {
      console.error('保存令牌失败:', error)
    }
  }

  /**
   * 获取认证令牌
   */
  static getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }

  /**
   * 保存"记住我"设置
   */
  static setRememberMe(remember: boolean): void {
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, String(remember))
  }

  /**
   * 获取"记住我"设置
   */
  static getRememberMe(): boolean {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true'
  }

  /**
   * 清除所有认证相关数据
   */
  static clearAuth(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME)
  }

  /**
   * 清除所有数据（包括用户列表）
   */
  static clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  }
}
