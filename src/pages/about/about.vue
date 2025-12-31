<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="flex-col-center h-screen">
    <h1 class="text-2xl font-bold mb-4">这是关于页面</h1>
    <p class="mb-6 text-gray-500">路径是 /about/about</p>
    <div class="flex gap-4">
      <n-button type="primary" @click="$router.push('/about/sub-pages/details')">查看子页面 (/about/sub-pages/details)</n-button>
      <n-button type="info" @click="router.back()">返回首页</n-button>
    </div>
  </div>
</template>
