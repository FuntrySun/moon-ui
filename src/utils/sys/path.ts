import { 
  appConfigDir, 
  appDataDir, 
  appLogDir, 
  downloadDir, 
  homeDir, 
  tempDir 
} from '@tauri-apps/api/path'

/**
 * 系统路径工具类
 * 提供获取常用系统目录的方法
 */
export const pathManager = {
  /**
   * 获取应用配置目录
   * Windows: AppData\Roaming\bundle_identifier
   * macOS: Library/Application Support/bundle_identifier
   */
  async getAppConfigDir() {
    return await appConfigDir()
  },

  /**
   * 获取应用数据目录
   */
  async getAppDataDir() {
    return await appDataDir()
  },

  /**
   * 获取应用日志目录
   */
  async getAppLogDir() {
    return await appLogDir()
  },

  /**
   * 获取用户下载目录
   */
  async getDownloadDir() {
    return await downloadDir()
  },

  /**
   * 获取用户主目录
   */
  async getHomeDir() {
    return await homeDir()
  },

  /**
   * 获取系统临时目录
   */
  async getTempDir() {
    return await tempDir()
  }
}
