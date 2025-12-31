import { ref, computed, onMounted } from 'vue'
import { darkTheme } from 'naive-ui'

type ThemeMode = 'light' | 'dark' | 'auto'

// 使用全局单例状态，确保所有调用 useTheme 的地方共享同一个响应式变量
const mode = ref<ThemeMode>((localStorage.getItem('theme-mode') as ThemeMode) || 'auto')
const isSystemDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

/**
 * 主题管理 Hook
 * 支持 明亮/暗黑/跟随系统 模式
 */
export function useTheme() {
  // 最终应用的主题对象（传给 n-config-provider）
  const theme = computed(() => {
    if (mode.value === 'auto') {
      return isSystemDark.value ? darkTheme : null
    }
    return mode.value === 'dark' ? darkTheme : null
  })

  // 是否是暗黑模式（布尔值，方便业务逻辑判断）
  const isDark = computed(() => !!theme.value)

  /** 切换模式 */
  const setMode = (newMode: ThemeMode) => {
    mode.value = newMode
    localStorage.setItem('theme-mode', newMode)
    
    // 同时更新 html 的 class，方便 UnoCSS 或原生 CSS 适配
    if (mode.value === 'dark' || (mode.value === 'auto' && isSystemDark.value)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /** 切换明亮/暗黑 */
  const toggleTheme = () => {
    setMode(isDark.value ? 'light' : 'dark')
  }

  // 监听系统主题变化
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      isSystemDark.value = e.matches
      if (mode.value === 'auto') {
        if (e.matches) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
      }
    }
    mediaQuery.addEventListener('change', handler)
    
    // 初始化时同步一次 html class
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  return {
    mode,
    theme,
    isDark,
    setMode,
    toggleTheme
  }
}
