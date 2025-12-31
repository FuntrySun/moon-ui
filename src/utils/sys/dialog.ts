import { message, confirm, ask, open, save } from '@tauri-apps/plugin-dialog'

/**
 * 对话框工具类
 */
export const dialogManager = {
  /**
   * 显示普通信息提示框
   * @param content 提示内容
   * @param title 标题
   */
  async info(content: string, title: string = '提示') {
    await message(content, { title, kind: 'info' })
  },

  /**
   * 显示错误提示框
   * @param content 错误内容
   * @param title 标题
   */
  async error(content: string, title: string = '错误') {
    await message(content, { title, kind: 'error' })
  },

  /**
   * 显示确认对话框 (确认/取消)
   * @param content 询问内容
   * @param title 标题
   * @returns 用户是否点击了确认
   */
  async confirm(content: string, title: string = '确认'): Promise<boolean> {
    return await confirm(content, { title })
  },

  /**
   * 显示询问对话框 (是/否)
   * @param content 询问内容
   * @param title 标题
   * @returns 用户是否点击了是
   */
  async ask(content: string, title: string = '请选择'): Promise<boolean> {
    return await ask(content, { title })
  },

  /**
   * 打开文件/目录选择器
   * @param options 配置项
   */
  async selectFile(options: Parameters<typeof open>[0]) {
    return await open(options)
  },

  /**
   * 打开文件保存对话框
   * @param options 配置项
   */
  async saveFile(options: Parameters<typeof save>[0]) {
    return await save(options)
  }
}
