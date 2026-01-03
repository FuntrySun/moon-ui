/**
 * 用户实体接口
 */
export interface User {
  /** 用户唯一标识符 */
  id: string
  /** 用户名 */
  username: string
  /** 密码哈希值 */
  passwordHash: string
  /** 账户创建时间戳 */
  createdAt: number
}

/**
 * 认证状态接口
 */
export interface AuthState {
  /** 是否已认证 */
  isAuthenticated: boolean
  /** 当前登录用户 */
  currentUser: User | null
  /** 认证令牌 */
  token: string | null
}

/**
 * 登录请求参数
 */
export interface LoginCredentials {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 是否记住我 */
  rememberMe?: boolean
}

/**
 * 注册请求参数
 */
export interface RegisterCredentials {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 确认密码 */
  confirmPassword: string
  /** 是否记住我 */
  rememberMe?: boolean
}

/**
 * 认证响应结果
 */
export interface AuthResult {
  /** 操作是否成功 */
  success: boolean
  /** 提示信息 */
  message: string
  /** 用户信息（登录成功时返回） */
  user?: User
  /** 认证令牌（登录成功时返回） */
  token?: string
}

/**
 * 表单验证结果
 */
export interface ValidationResult {
  /** 是否验证通过 */
  valid: boolean
  /** 错误信息 */
  message?: string
}
