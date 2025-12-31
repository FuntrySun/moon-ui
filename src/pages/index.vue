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
  <main class="flex-col-center pt-10vh">
    <h1 class="text-3xl font-bold mb-8">Welcome to Tauri + Vue</h1>

    <div class="flex justify-center mb-8">
      <a href="https://vite.dev" target="_blank" class="hover:drop-shadow-[0_0_2em_#747bff]">
        <img src="/vite.svg" class="h-24 p-6 transition-duration-750" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank" class="hover:drop-shadow-[0_0_2em_#24c8db]">
        <img src="/tauri.svg" class="h-24 p-6 transition-duration-750" alt="Tauri logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank" class="hover:drop-shadow-[0_0_2em_#249b73]">
        <img src="../assets/vue.svg" class="h-24 p-6 transition-duration-750" alt="Vue logo" />
      </a>
    </div>

    <p class="mb-8 text-gray-600">这是首页 (Root Page)</p>

    <form class="flex justify-center mb-8" @submit.prevent="greet">
      <n-input id="greet-input" v-model:value="name" placeholder="Enter a name..." class="mr-2 w-64" />
      <n-button type="primary" attr-type="submit">Greet</n-button>
    </form>

    <div class="flex-center gap-4">
      <n-button @click="$router.push('/about/about')">前往关于页面 (/about/about)</n-button>
    </div>

    <p class="mt-4 text-lg font-medium text-blue-500">{{ greetMsg }}</p>
  </main>
</template>
