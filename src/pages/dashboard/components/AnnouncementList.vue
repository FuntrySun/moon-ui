<script setup lang="ts">
interface Announcement {
  id: number
  title: string
  date: string
  type: string
}

defineProps<{
  items: Announcement[]
}>()

const emit = defineEmits<{
  (e: 'click', title: string): void
}>()
</script>

<template>
  <n-card title="系统公告" :bordered="false" class="h-full shadow-sm !rd-16px">
    <template #header-extra>
      <n-button text type="primary">更多</n-button>
    </template>
    <n-list hoverable clickable>
      <n-list-item v-for="info in items" :key="info.id" @click="emit('click', info.title)">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <n-badge dot :type="info.type as any" />
            <span class="truncate font-medium flex-1">{{ info.title }}</span>
          </div>
          <span class="text-xs text-gray-400 pl-4">{{ info.date }}</span>
        </div>
      </n-list-item>
    </n-list>
  </n-card>
</template>
