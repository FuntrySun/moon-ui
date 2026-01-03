<template>
  <n-layout has-sider position="absolute" style="height: 100vh">
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

    <n-layout style="height: 100%" content-style="display: flex; flex-direction: column; min-height: 100%">
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
          <div 
            v-if="navMode === 'sider'" 
            class="flex items-center bg-gray-100/60 dark:bg-white/5 px-16px py-6px rounded-8px border border-gray-200/50 dark:border-white/10 transition-all duration-300 hover:shadow-md"
          >
            <n-breadcrumb>
              <n-breadcrumb-item>
                <div class="flex items-center gap-4px">
                  <div class="i-carbon-home text-14px" />
                  <span>首页</span>
                </div>
              </n-breadcrumb-item>
              <n-breadcrumb-item v-if="route.path !== '/'">
                <div class="flex items-center gap-4px">
                  <div class="i-carbon-document text-14px" />
                  <span>{{ route.name }}</span>
                </div>
              </n-breadcrumb-item>
            </n-breadcrumb>
          </div>
        </div>
        <div class="flex items-center gap-12px">
          <!-- 布局切换 -->
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button quaternary circle @click="toggleNavMode">
                <template #icon>
                  <div :class="navMode === 'sider' ? 'i-carbon-side-panel-open' : 'i-carbon-menu'" class="text-20px" />
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
                  <div :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" class="text-20px" />
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
                  <div class="i-carbon-settings text-20px" />
                </template>
              </n-button>
            </template>
            系统设置
          </n-tooltip>

          <!-- 用户头像 -->
          <n-dropdown :options="userOptions" @select="handleUserMenuSelect">
            <n-avatar 
              round 
              size="small" 
              class="cursor-pointer ml-4px"
            >
              <div class="i-carbon-user-avatar-filled" />
            </n-avatar>
          </n-dropdown>
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px; flex: 1" :native-scrollbar="false">
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
import { useMessage, useDialog } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const dialog = useDialog()
const { isDark, toggleTheme } = useTheme()
const authStore = useAuthStore()

const collapsed = ref(true)
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

/** 处理用户菜单点击 */
const handleUserMenuSelect = (key: string) => {
  if (key === 'logout') {
    dialog.warning({
      title: '确认登出',
      content: '确定要退出登录吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        authStore.logout()
        message.success('已退出登录')
        router.push('/auth/login')
      }
    })
  } else if (key === 'profile') {
    message.info('个人中心功能开发中...')
  }
}

function renderIcon(iconClass: string) {
  return () => h('div', { class: `${iconClass} text-20px` })
}

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => '仪表盘' }),
    key: '/',
    icon: renderIcon('i-carbon-dashboard')
  },
  {
    label: () => h(RouterLink, { to: '/about/about' }, { default: () => '关于项目' }),
    key: '/about/about',
    icon: renderIcon('i-carbon-information')
  }
]

// 用户下拉菜单选项
const userOptions = computed(() => {
  if (authStore.isAuthenticated) {
    return [
      { 
        label: authStore.currentUser?.username || '用户',
        key: 'username',
        disabled: true
      },
      { type: 'divider' },
      { 
        label: '个人中心',
        key: 'profile',
        icon: renderIcon('i-carbon-user')
      },
      { 
        label: '退出登录',
        key: 'logout',
        icon: renderIcon('i-carbon-logout')
      }
    ]
  } else {
    return [
      {
        label: '登录',
        key: 'login',
        icon: renderIcon('i-carbon-login')
      },
      {
        label: '注册',
        key: 'register',
        icon: renderIcon('i-carbon-user-follow')
      }
    ]
  }
})
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
