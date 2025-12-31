import { openUrl, openPath, revealItemInDir } from '@tauri-apps/plugin-opener'

/**
 * 外部操作工具类
 */
export const shellManager = {
  /**
   * 使用系统默认浏览器打开外部链接
   * @param url 目标链接
   */
  async openExternal(url: string) {
    await openUrl(url)
  },

  /**
   * 使用默认应用程序打开文件或目录
   * @param path 文件或目录路径
   */
  async openItem(path: string) {
    await openPath(path)
  },

  /**
   * 在文件管理器中显示文件（即“在文件夹中显示”）
   * @param path 文件路径
   */
  async reveal(path: string) {
    await revealItemInDir(path)
  }
}
