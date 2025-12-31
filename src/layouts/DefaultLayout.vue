<template>
  <n-layout has-sider position="absolute">
    <!-- 侧边栏模式下的 Sider -->
    <n-layout-sider
      v-if="navMode === 'sider'"
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="logo-container h-64px flex items-center justify-center overflow-hidden">
        <img src="@/assets/vue.svg" class="w-32px h-32px" alt="Logo" />
        <span v-if="!collapsed" class="ml-12px font-bold text-18px whitespace-nowrap">Moon UI</span>
      </div>
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="activeKey"
      />
    </n-layout-sider>

    <n-layout>
      <n-layout-header bordered class="h-64px flex items-center justify-between px-24px">
        <div class="flex items-center gap-24px">
          <!-- 顶部模式下的 Logo -->
          <div v-if="navMode === 'top'" class="flex items-center">
            <img src="@/assets/vue.svg" class="w-32px h-32px" alt="Logo" />
            <span class="ml-12px font-bold text-18px whitespace-nowrap">Moon UI</span>
          </div>

          <!-- 顶部模式下的菜单 -->
          <n-menu
            v-if="navMode === 'top'"
            mode="horizontal"
            :options="menuOptions"
            :value="activeKey"
          />

          <!-- 面包屑 (仅侧边栏模式显示) -->
          <n-breadcrumb v-if="navMode === 'sider'">
            <n-breadcrumb-item>首页</n-breadcrumb-item>
            <n-breadcrumb-item v-if="route.path !== '/'">{{ route.name }}</n-breadcrumb-item>
          </n-breadcrumb>
        </div>
        <div class="flex items-center gap-12px">
          <!-- 布局切换 -->
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button quaternary circle @click="toggleNavMode">
                <template #icon>
                  <div :class="navMode === 'sider' ? 'i-solar-side-menu-linear' : 'i-solar-hamburger-menu-linear'" class="text-20px" />
                </template>
              </n-button>
            </template>
            切换布局模式
          </n-tooltip>

          <!-- 主题切换 -->
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button quaternary circle @click="toggleTheme">
                <template #icon>
                  <div :class="isDark ? 'i-solar-moon-linear' : 'i-solar-sun-2-linear'" class="text-20px" />
                </template>
              </n-button>
            </template>
            {{ isDark ? '切换到明亮模式' : '切换到暗黑模式' }}
          </n-tooltip>

          <!-- 设置按钮 -->
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button quaternary circle @click="handleSettings">
                <template #icon>
                  <div class="i-solar-settings-linear text-20px" />
                </template>
              </n-button>
            </template>
            系统设置
          </n-tooltip>

          <!-- 用户头像 -->
          <n-dropdown :options="userOptions">
            <n-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" class="cursor-pointer ml-4px" />
          </n-dropdown>
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;" :native-scrollbar="false">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout-content>
      <n-layout-footer bordered class="h-48px flex items-center justify-center text-gray-400 text-12px">
        © 2024 Moon UI - Built with Tauri & Vue
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { useMessage } from 'naive-ui'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const { isDark, toggleTheme } = useTheme()

const collapsed = ref(false)
const navMode = ref<'sider' | 'top'>('sider')
const activeKey = computed(() => route.path)

/** 切换导航模式 */
const toggleNavMode = () => {
  navMode.value = navMode.value === 'sider' ? 'top' : 'sider'
  message.info(`已切换为${navMode.value === 'sider' ? '侧边' : '顶部'}导航模式`)
}

/** 处理设置点击 */
const handleSettings = () => {
  message.info('系统设置功能开发中...')
}

function renderIcon(iconClass: string) {
  return () => h('div', { class: `${iconClass} text-20px` })
}

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => '仪表盘' }),
    key: '/',
    icon: renderIcon('i-solar-widget-2-linear')
  },
  {
    label: () => h(RouterLink, { to: '/about' }, { default: () => '关于项目' }),
    key: '/about',
    icon: renderIcon('i-solar-info-circle-linear')
  }
]

const userOptions = [
  { label: '个人中心', key: 'profile' },
  { label: '退出登录', key: 'logout' }
]
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
