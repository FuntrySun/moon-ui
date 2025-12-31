import { ref } from 'vue'
import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager'
import { useMessage } from 'naive-ui'

/**
 * 剪贴板操作 Hook
 * 集成了 Naive UI 的消息反馈
 */
export function useClipboard() {
  const message = useMessage()
  const isCopying = ref(false)

  /**
   * 写入文本到剪贴板
   * @param text 要复制的文本
   * @param successMsg 成功后的提示文字
   */
  const copy = async (text: string, successMsg = '已复制到剪贴板') => {
    if (!text) return
    isCopying.value = true
    try {
      await writeText(text)
      message?.success(successMsg)
    } catch (err) {
      console.error('Failed to copy:', err)
      message?.error('复制失败')
    } finally {
      isCopying.value = false
    }
  }

  /**
   * 从剪贴板读取文本
   */
  const read = async () => {
    try {
      return await readText()
    } catch (err) {
      console.error('Failed to read clipboard:', err)
      message?.error('读取剪贴板失败')
      return ''
    }
  }

  return {
    copy,
    read,
    isCopying
  }
}
