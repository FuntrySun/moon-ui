<script setup lang="ts">
interface StatItem {
  title: string
  value: string
  icon: string
  color: string
  trend: string
}

defineProps<{
  item: StatItem
}>()
</script>

<template>
  <n-card hoverable class="transition-all duration-300 transform hover:-translate-y-1 !rd-16px">
    <div class="flex items-center justify-between">
      <div>
        <div class="text-gray-400 text-sm mb-1">{{ item.title }}</div>
        <div class="text-2xl font-bold">{{ item.value }}</div>
        <div 
          class="mt-2 text-xs flex items-center gap-1" 
          :class="item.trend.startsWith('+') ? 'text-green-500' : (item.trend.startsWith('-') ? 'text-red-500' : 'text-gray-400')"
        >
          <div v-if="item.trend.startsWith('+')" class="i-carbon-caret-up" />
          <div v-if="item.trend.startsWith('-')" class="i-carbon-caret-down" />
          {{ item.trend }} 较上周
        </div>
      </div>
      <div :class="[item.icon, item.color, 'text-4xl opacity-80']" />
    </div>
  </n-card>
</template>
