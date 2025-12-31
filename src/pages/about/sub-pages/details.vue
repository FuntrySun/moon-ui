<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="flex-col-center h-screen">
    <h1 class="text-2xl font-bold mb-4">这是关于页面的子页面</h1>
    <p class="mb-6 text-gray-500">路径应该是 /about/details</p>
    <n-button type="info" @click="router.back()">返回</n-button>
  </div>
</template>
