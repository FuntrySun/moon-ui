import type { ValidationResult } from '@/types/auth'

/**
 * 验证用户名
 * 规则：
 * - 长度 3-20 个字符
 * - 只能包含字母、数字、下划线
 * - 必须以字母开头
 */
export function validateUsername(username: string): ValidationResult {
  if (!username || username.trim().length === 0) {
    return {
      valid: false,
      message: '用户名不能为空'
    }
  }

  if (username.length < 3) {
    return {
      valid: false,
      message: '用户名至少需要3个字符'
    }
  }

  if (username.length > 20) {
    return {
      valid: false,
      message: '用户名不能超过20个字符'
    }
  }

  // 必须以字母开头
  if (!/^[a-zA-Z]/.test(username)) {
    return {
      valid: false,
      message: '用户名必须以字母开头'
    }
  }

  // 只能包含字母、数字、下划线
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(username)) {
    return {
      valid: false,
      message: '用户名只能包含字母、数字和下划线'
    }
  }

  return {
    valid: true
  }
}

/**
 * 验证密码强度
 * 规则：
 * - 长度至少 6 个字符
 * - 至少包含一个字母
 * - 至少包含一个数字
 */
export function validatePassword(password: string): ValidationResult {
  if (!password || password.trim().length === 0) {
    return {
      valid: false,
      message: '密码不能为空'
    }
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: '密码至少需要6个字符'
    }
  }

  if (password.length > 50) {
    return {
      valid: false,
      message: '密码不能超过50个字符'
    }
  }

  // 至少包含一个字母
  if (!/[a-zA-Z]/.test(password)) {
    return {
      valid: false,
      message: '密码必须包含至少一个字母'
    }
  }

  // 至少包含一个数字
  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: '密码必须包含至少一个数字'
    }
  }

  return {
    valid: true
  }
}

/**
 * 验证两次密码是否一致
 */
export function validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
  if (password !== confirmPassword) {
    return {
      valid: false,
      message: '两次输入的密码不一致'
    }
  }

  return {
    valid: true
  }
}

/**
 * 验证注册表单
 */
export function validateRegisterForm(
  username: string,
  password: string,
  confirmPassword: string
): ValidationResult {
  // 验证用户名
  const usernameResult = validateUsername(username)
  if (!usernameResult.valid) {
    return usernameResult
  }

  // 验证密码
  const passwordResult = validatePassword(password)
  if (!passwordResult.valid) {
    return passwordResult
  }

  // 验证密码一致性
  const matchResult = validatePasswordMatch(password, confirmPassword)
  if (!matchResult.valid) {
    return matchResult
  }

  return {
    valid: true
  }
}

/**
 * 验证登录表单
 */
export function validateLoginForm(username: string, password: string): ValidationResult {
  if (!username || username.trim().length === 0) {
    return {
      valid: false,
      message: '请输入用户名'
    }
  }

  if (!password || password.trim().length === 0) {
    return {
      valid: false,
      message: '请输入密码'
    }
  }

  return {
    valid: true
  }
}
