<script setup lang="ts">
import { h, ref, Component } from 'vue'
import { NIcon } from 'naive-ui'
import { HomeOutline, InformationCircleOutline, SettingsOutline } from '@vicons/ionicons5'
import { RouterLink, useRoute } from 'vue-router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const route = useRoute()
const collapsed = ref(false)

const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => '首页' }),
    key: '/',
    icon: renderIcon(HomeOutline)
  },
  {
    label: () => h(RouterLink, { to: '/about' }, { default: () => '关于' }),
    key: '/about',
    icon: renderIcon(InformationCircleOutline)
  },
  {
    label: '设置',
    key: 'settings',
    icon: renderIcon(SettingsOutline)
  }
]
</script>

<template>
  <n-layout has-sider position="absolute">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="logo-container h-64 flex items-center justify-center overflow-hidden">
        <img src="@/assets/vue.svg" class="w-32 h-32" alt="Logo" />
        <span v-if="!collapsed" class="ml-12 text-18 font-bold whitespace-nowrap">Moon UI</span>
      </div>
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="route.path"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered class="h-64 flex items-center px-24 justify-between">
        <div class="text-18 font-medium">
          {{ route.meta?.title || '控制台' }}
        </div>
        <div class="flex items-center gap-16">
          <n-button quaternary circle>
            <template #icon>
              <n-icon><SettingsOutline /></n-icon>
            </template>
          </n-button>
        </div>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;" :native-scrollbar="false">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

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
