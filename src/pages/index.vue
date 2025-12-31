<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

const greetMsg = ref("");
const name = ref("");

async function greet() {
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>
  <div class="p-24">
    <n-card title="欢迎使用 Moon UI" segmented>
      <div class="flex flex-col items-center py-40">
        <div class="flex justify-center mb-32">
          <a href="https://vite.dev" target="_blank" class="hover:drop-shadow-[0_0_2em_#646CFF]">
            <img src="/vite.svg" class="h-32 p-8" alt="Vite logo" />
          </a>
          <a href="https://tauri.app" target="_blank" class="hover:drop-shadow-[0_0_2em_#FFC131]">
            <img src="/tauri.svg" class="h-32 p-8" alt="Tauri logo" />
          </a>
          <a href="https://vuejs.org/" target="_blank" class="hover:drop-shadow-[0_0_2em_#4FC08D]">
            <img src="../assets/vue.svg" class="h-32 p-8" alt="Vue logo" />
          </a>
        </div>

        <p class="mb-32 text-16 text-gray-500">
          这是一个基于 Tauri 2.0 + Vue 3 + Naive UI 的现代化桌面应用模版
        </p>

        <n-space vertical align="center" size="large">
          <n-input-group>
            <n-input v-model:value="name" placeholder="输入你的名字..." style="width: 240px" />
            <n-button type="primary" @click="greet">打个招呼</n-button>
          </n-input-group>

          <p v-if="greetMsg" class="text-18 font-bold text-primary animate-bounce-in">
            {{ greetMsg }}
          </p>

          <n-divider />

          <n-button @click="$router.push('/about/about')">
            查看关于页面
          </n-button>
        </n-space>
      </div>
    </n-card>
  </div>
</template>

<route lang="yaml">
meta:
  title: 仪表盘
</route>
