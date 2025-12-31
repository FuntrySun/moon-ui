<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme'

const { theme } = useTheme()
</script>

<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <router-view />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
}
</style>
