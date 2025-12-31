import { ref, onMounted, onUnmounted } from 'vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { windowManager } from '@/utils/sys'

/**
 * 窗口控制 Hook
 * 封装了常用的窗口操作和状态监听
 */
export function useAppWindow() {
  const isMaximized = ref(false)
  const isFullscreen = ref(false)
  const appWindow = getCurrentWindow()

  // 更新窗口状态
  const updateState = async () => {
    isMaximized.value = await appWindow.isMaximized()
    isFullscreen.value = await appWindow.isFullscreen()
  }

  let unlistenResized: (() => void) | undefined

  onMounted(async () => {
    await updateState()
    // 监听窗口大小变化
    unlistenResized = await appWindow.onResized(() => {
      updateState()
    })
  })

  onUnmounted(() => {
    if (unlistenResized) unlistenResized()
  })

  return {
    isMaximized,
    isFullscreen,
    /** 最小化 */
    minimize: windowManager.minimize,
    /** 切换最大化 */
    toggleMaximize: windowManager.toggleMaximize,
    /** 关闭 */
    close: windowManager.close,
    /** 切换全屏 */
    toggleFullscreen: async () => {
      const fullscreen = await appWindow.isFullscreen()
      await appWindow.setFullscreen(!fullscreen)
      isFullscreen.value = !fullscreen
    },
    /** 开始拖拽窗口（用于自定义标题栏） */
    startDragging: async () => {
      await appWindow.startDragging()
    }
  }
}
