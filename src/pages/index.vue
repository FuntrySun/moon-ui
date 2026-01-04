<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()

// 模拟统计数据
const statistics = [
  { title: '总用户数', value: '12,840', icon: 'i-carbon-user', color: 'text-blue-500', trend: '+12%' },
  { title: '活跃会话', value: '1,203', icon: 'i-carbon-activity', color: 'text-green-500', trend: '+5%' },
  { title: '系统负载', value: '24%', icon: 'i-carbon-meter', color: 'text-orange-500', trend: '-2%' },
  { title: '存储空间', value: '82.4 GB', icon: 'i-carbon-h-d-d', color: 'text-purple-500', trend: '稳定' }
]

// 模拟公告数据
const announcements = [
  { id: 1, title: '系统版本升级公告 (v0.2.0)', date: '2024-05-20', type: 'info' },
  { id: 2, title: '计划性维护通知：本周六凌晨', date: '2024-05-18', type: 'warning' },
  { id: 3, title: '关于安全策略更新的说明', date: '2024-05-15', type: 'error' },
  { id: 4, title: '新功能上线：数据导出工具', date: '2024-05-12', type: 'success' }
]

// 模拟快捷操作
const quickActionsData = [
  { title: '添加用户', icon: 'i-carbon-user-follow', color: 'bg-blue-100 text-blue-600' },
  { title: '导出报表', icon: 'i-carbon-document-export', color: 'bg-green-100 text-green-600' },
  { title: '系统日志', icon: 'i-carbon-catalog', color: 'bg-purple-100 text-purple-600' },
  { title: '安全扫描', icon: 'i-carbon-security', color: 'bg-orange-100 text-orange-600' },
  { title: '发送通知', icon: 'i-carbon-send-alt', color: 'bg-indigo-100 text-indigo-600' },
  { title: '数据配置', icon: 'i-carbon-settings-adjust', color: 'bg-pink-100 text-pink-600' }
]

const handleAction = (action: string) => {
  message.info(`触发操作: ${action}`)
}
</script>

<template>
  <div class="p-4 space-y-6">
    <!-- 头部欢迎语 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">工作台仪表盘</h1>
        <p class="text-gray-400 mt-1">欢迎回来，这是您今日的系统概览。</p>
      </div>
      <n-button type="primary" ghost @click="handleAction('刷新数据')">
        <template #icon>
          <div class="i-carbon-renew" />
        </template>
        刷新数据
      </n-button>
    </div>

    <!-- 统计卡片 -->
    <n-grid x-gap="12" y-gap="12" cols="1 s:2 m:4" responsive="screen">
      <n-gi v-for="item in statistics" :key="item.title">
        <StatisticCard :item="item" />
      </n-gi>
    </n-grid>

    <!-- 图表与公告 -->
    <n-grid x-gap="12" y-gap="12" cols="1 m:3" responsive="screen">
      <!-- 趋势图 -->
      <n-gi span="2">
        <TrendChart />
      </n-gi>

      <!-- 公告区域 -->
      <n-gi>
        <AnnouncementList :items="announcements" @click="handleAction" />
      </n-gi>
    </n-grid>

    <!-- 快捷操作 -->
    <QuickActions :actions="quickActionsData" @click="handleAction" />
  </div>
</template>

<style scoped>
:deep(.n-card-header__title) {
  font-weight: 600;
}
</style>

<style scoped>
/* 使用 UnoCSS 难以实现的微调样式 */
:deep(.n-card-header__title) {
  font-weight: 600;
}
</style>
