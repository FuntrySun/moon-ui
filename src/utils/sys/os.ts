import { 
  arch, 
  platform, 
  type, 
  version,
  family,
  locale
} from '@tauri-apps/plugin-os'

/**
 * 操作系统信息工具类
 */
export const osManager = {
  /**
   * 获取操作系统架构 (例如: "x86_64", "aarch64")
   */
  getArch() {
    return arch()
  },

  /**
   * 获取操作系统平台 (例如: "macos", "windows", "linux")
   */
  getPlatform() {
    return platform()
  },

  /**
   * 获取操作系统类型 (例如: "macos", "windows", "linux", "ios", "android")
   */
  getType() {
    return type()
  },

  /**
   * 获取操作系统版本
   */
  getVersion() {
    return version()
  },

  /**
   * 获取操作系统家族 (例如: "unix", "windows")
   */
  getFamily() {
    return family()
  },

  /**
   * 获取当前系统语言区域 (例如: "zh-CN")
   */
  getLocale() {
    return locale()
  }
}
