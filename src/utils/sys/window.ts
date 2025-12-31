import { getCurrentWindow } from '@tauri-apps/api/window'

/**
 * 窗口管理工具类
 */
export const windowManager = {
  /**
   * 最小化当前窗口
   */
  async minimize() {
    await getCurrentWindow().minimize()
  },

  /**
   * 最大化/还原当前窗口
   */
  async toggleMaximize() {
    const win = getCurrentWindow()
    if (await win.isMaximized()) {
      await win.unmaximize()
    } else {
      await win.maximize()
    }
  },

  /**
   * 关闭当前窗口
   */
  async close() {
    await getCurrentWindow().close()
  },

  /**
   * 显示窗口
   */
  async show() {
    await getCurrentWindow().show()
  },

  /**
   * 隐藏窗口
   */
  async hide() {
    await getCurrentWindow().hide()
  },

  /**
   * 设置窗口置顶状态
   * @param alwaysOnTop 是否始终置顶
   */
  async setAlwaysOnTop(alwaysOnTop: boolean) {
    await getCurrentWindow().setAlwaysOnTop(alwaysOnTop)
  },

  /**
   * 窗口居中显示
   */
  async center() {
    await getCurrentWindow().center()
  },

  /**
   * 设置窗口标题
   * @param title 标题内容
   */
  async setTitle(title: string) {
    await getCurrentWindow().setTitle(title)
  }
}
