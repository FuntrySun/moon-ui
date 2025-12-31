import { ref, onUnmounted } from 'vue'

/**
 * 定时器管理 Hook
 * 在组件卸载时自动清理定时器，防止内存泄漏
 */
export function useInterval(fn: () => void, delay: number | null) {
  const timer = ref<ReturnType<typeof setInterval> | null>(null)

  const stop = () => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  const start = () => {
    stop()
    if (delay !== null) {
      timer.value = setInterval(fn, delay)
    }
  }

  // 如果初始有延迟，则自动启动
  if (delay !== null) {
    start()
  }

  onUnmounted(stop)

  return { start, stop }
}
