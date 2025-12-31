import { ref, computed, onMounted } from 'vue'
import { darkTheme } from 'naive-ui'

type ThemeMode = 'light' | 'dark' | 'auto'

/**
 * 主题管理 Hook
 * 支持 明亮/暗黑/跟随系统 模式
 */
export function useTheme() {
  const mode = ref<ThemeMode>((localStorage.getItem('theme-mode') as ThemeMode) || 'auto')
  
  // 系统是否处于暗黑模式
  const isSystemDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

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
    }
    mediaQuery.addEventListener('change', handler)
  })

  return {
    mode,
    theme,
    isDark,
    setMode,
    toggleTheme
  }
}
