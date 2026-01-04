<script setup lang="ts">
interface Action {
  title: string
  icon: string
  color: string
}

defineProps<{
  actions: Action[]
}>()

const emit = defineEmits<{
  (e: 'click', title: string): void
}>()
</script>

<template>
  <n-card title="快捷操作" :bordered="false" class="shadow-sm !rd-16px">
    <n-grid x-gap="12" y-gap="12" cols="2 s:3 m:6" responsive="screen">
      <n-gi v-for="action in actions" :key="action.title">
        <div 
          class="flex flex-col items-center justify-center p-4 !rd-16px cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent hover:border-gray-100 dark:hover:border-white/10"
          @click="emit('click', action.title)"
        >
          <div :class="[action.icon, action.color, 'text-28px p-3 !rd-16px mb-3']" />
          <span class="text-sm font-medium">{{ action.title }}</span>
        </div>
      </n-gi>
    </n-grid>
  </n-card>
</template>
