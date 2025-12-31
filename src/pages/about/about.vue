<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-zinc-900">
    <n-result status="info" title="关于我们" description="这是使用 Blank 布局展示的页面">
      <template #extra>
        <n-space>
          <n-button type="primary" @click="$router.push('/about/sub-pages/details')">查看详情</n-button>
          <n-button @click="router.back()">返回上一页</n-button>
        </n-space>
      </template>
    </n-result>
  </div>
</template>

<route lang="yaml">
layout: blank
meta:
  title: 关于
</route>
