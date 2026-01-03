import type { User, AuthResult, LoginCredentials, RegisterCredentials } from '@/types/auth'
import { StorageService } from './storageService'

/**
 * 认证服务类
 * 处理用户注册、登录、密码加密等核心业务逻辑
 */
export class AuthService {
  /**
   * 密码哈希加密
   * 使用简单的 Base64 + 盐值方式（生产环境应使用更安全的加密算法）
   */
  static hashPassword(password: string): string {
    // 添加盐值
    const salt = 'moon_ui_salt_2024'
    const saltedPassword = password + salt
    
    // Base64 编码
    return btoa(saltedPassword)
  }

  /**
   * 生成唯一的用户ID
   */
  static generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
  }

  /**
   * Token 过期时间（7天，单位：毫秒）
   */
  static readonly TOKEN_EXPIRY_DAYS = 7
  static readonly TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000

  /**
   * 生成认证令牌
   * @param userId 用户ID
   * @param rememberMe 是否记住我（如果为true，过期时间延长到7天）
   */
  static generateToken(userId: string, rememberMe: boolean = false): string {
    const timestamp = Date.now()
    const expiresAt = timestamp + (rememberMe ? this.TOKEN_EXPIRY_MS : this.TOKEN_EXPIRY_MS)
    const random = Math.random().toString(36).substring(2, 11)
    // Token 格式: userId_timestamp_expiresAt_random
    return btoa(`${userId}_${timestamp}_${expiresAt}_${random}`)
  }

  /**
   * 用户注册
   */
  static async register(credentials: RegisterCredentials): Promise<AuthResult> {
    try {
      const { username, password, rememberMe } = credentials

      // 检查用户名是否已存在
      const existingUser = StorageService.getUserByUsername(username)
      if (existingUser) {
        return {
          success: false,
          message: '用户名已存在，请选择其他用户名'
        }
      }

      // 创建新用户
      const newUser: User = {
        id: this.generateUserId(),
        username,
        passwordHash: this.hashPassword(password),
        createdAt: Date.now()
      }

      // 保存用户
      StorageService.saveUser(newUser)

      // 生成令牌（根据 rememberMe 设置过期时间）
      const token = this.generateToken(newUser.id, rememberMe)

      return {
        success: true,
        message: '注册成功！',
        user: newUser,
        token
      }
    } catch (error) {
      console.error('注册失败:', error)
      return {
        success: false,
        message: '注册失败，请稍后重试'
      }
    }
  }

  /**
   * 用户登录
   */
  static async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const { username, password, rememberMe } = credentials

      // 查找用户
      const user = StorageService.getUserByUsername(username)
      if (!user) {
        return {
          success: false,
          message: '用户名或密码错误'
        }
      }

      // 验证密码
      const passwordHash = this.hashPassword(password)
      if (passwordHash !== user.passwordHash) {
        return {
          success: false,
          message: '用户名或密码错误'
        }
      }

      // 生成令牌（根据 rememberMe 设置过期时间）
      const token = this.generateToken(user.id, rememberMe)

      return {
        success: true,
        message: '登录成功！',
        user,
        token
      }
    } catch (error) {
      console.error('登录失败:', error)
      return {
        success: false,
        message: '登录失败，请稍后重试'
      }
    }
  }

  /**
   * 验证令牌
   * 检查令牌是否有效（未过期），并返回对应的用户
   */
  static validateToken(token: string): User | null {
    try {
      // 解码令牌
      const decoded = atob(token)
      const parts = decoded.split('_')
      
      // Token 格式: userId_timestamp_expiresAt_random
      // 向后兼容旧格式: userId_timestamp_random
      let userId: string
      let expiresAt: number
      
      if (parts.length >= 4) {
        // 新格式: 包含过期时间
        userId = parts[0]
        expiresAt = parseInt(parts[2])
      } else if (parts.length >= 3) {
        // 旧格式: 使用创建时间 + 7天作为过期时间
        userId = parts[0]
        const timestamp = parseInt(parts[1])
        expiresAt = timestamp + this.TOKEN_EXPIRY_MS
      } else {
        return null
      }
      
      // 检查 Token 是否过期
      const now = Date.now()
      if (now > expiresAt) {
        console.log('Token 已过期')
        return null
      }

      // 查找用户
      const user = StorageService.getUserById(userId)
      return user
    } catch (error) {
      console.error('令牌验证失败:', error)
      return null
    }
  }

  /**
   * 检查 Token 是否即将过期（剩余时间小于1天）
   */
  static isTokenExpiringSoon(token: string): boolean {
    try {
      const decoded = atob(token)
      const parts = decoded.split('_')
      
      let expiresAt: number
      
      if (parts.length >= 4) {
        expiresAt = parseInt(parts[2])
      } else if (parts.length >= 3) {
        const timestamp = parseInt(parts[1])
        expiresAt = timestamp + this.TOKEN_EXPIRY_MS
      } else {
        return false
      }
      
      const now = Date.now()
      const timeLeft = expiresAt - now
      const oneDayMs = 24 * 60 * 60 * 1000
      
      return timeLeft > 0 && timeLeft < oneDayMs
    } catch (error) {
      return false
    }
  }

  /**
   * 获取 Token 剩余有效时间（毫秒）
   */
  static getTokenRemainingTime(token: string): number {
    try {
      const decoded = atob(token)
      const parts = decoded.split('_')
      
      let expiresAt: number
      
      if (parts.length >= 4) {
        expiresAt = parseInt(parts[2])
      } else if (parts.length >= 3) {
        const timestamp = parseInt(parts[1])
        expiresAt = timestamp + this.TOKEN_EXPIRY_MS
      } else {
        return 0
      }
      
      const now = Date.now()
      const timeLeft = expiresAt - now
      
      return Math.max(0, timeLeft)
    } catch (error) {
      return 0
    }
  }

  /**
   * 登出
   */
  static logout(): void {
    StorageService.clearAuth()
  }
}
