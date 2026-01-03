<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { validateLoginForm } from '@/utils/validation'

// 定义路由元信息
definePage({
  meta: {
    layout: 'blank',
    requiresAuth: false
  }
})

const router = useRouter()
const route = useRoute()
const message = useMessage()
const authStore = useAuthStore()

// 表单数据
const formRef = ref()
const formData = ref({
  username: '',
  password: '',
  rememberMe: false
})

// 加载状态
const loading = ref(false)

// 表单验证规则
const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }
}

// 处理登录
const handleLogin = async () => {
  // 表单验证
  const validation = validateLoginForm(formData.value.username, formData.value.password)
  if (!validation.valid) {
    message.error(validation.message || '请填写完整的登录信息')
    return
  }

  try {
    loading.value = true
    
    // 调用认证 Store 登录
    const result = await authStore.login({
      username: formData.value.username,
      password: formData.value.password,
      rememberMe: formData.value.rememberMe
    })

    if (result.success) {
      message.success(result.message)
      
      // 获取重定向路径（从路由守卫传递过来的原访问路径）
      const redirect = (route.query.redirect as string) || '/'
      
      // 登录成功，跳转到原访问页面或首页
      router.push(redirect)
    } else {
      message.error(result.message)
    }
  } catch (error) {
    console.error('登录错误:', error)
    message.error('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 忘记密码
const handleForgotPassword = () => {
  message.info('忘记密码功能开发中...')
}

// 跳转到注册页面
const handleRegister = () => {
  router.push('/auth/register')
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div class="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
    </div>

    <!-- 登录卡片 -->
    <div class="relative z-10 w-full max-w-md mx-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <!-- Logo 和标题 -->
        <div class="text-center mb-8">
          <div class="flex-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex-center shadow-lg">
              <div class="i-carbon-user-avatar-filled text-white text-32px" />
            </div>
          </div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            欢迎回来
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            登录您的账号以继续
          </p>
        </div>

        <!-- 登录表单 -->
        <n-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          size="large"
        >
          <n-form-item path="username" :show-label="false">
            <n-input
              v-model:value="formData.username"
              placeholder="用户名"
              clearable
            >
              <template #prefix>
                <div class="i-carbon-user text-gray-400 text-18px" />
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="password" :show-label="false">
            <n-input
              v-model:value="formData.password"
              type="password"
              placeholder="密码"
              show-password-on="click"
              clearable
            >
              <template #prefix>
                <div class="i-carbon-password text-gray-400 text-18px" />
              </template>
            </n-input>
          </n-form-item>

          <!-- 记住我和忘记密码 -->
          <div class="flex items-center justify-between mb-6">
            <n-checkbox v-model:checked="formData.rememberMe">
              <span class="text-sm text-gray-600 dark:text-gray-400">记住我</span>
            </n-checkbox>
            <n-button
              text
              type="primary"
              size="small"
              @click="handleForgotPassword"
            >
              忘记密码?
            </n-button>
          </div>

          <!-- 登录按钮 -->
          <n-button
            type="primary"
            block
            size="large"
            :loading="loading"
            @click="handleLogin"
            class="mb-4 font-semibold"
          >
            <template #icon>
              <div class="i-carbon-login" />
            </template>
            登录
          </n-button>
        </n-form>

        <!-- 分割线 -->
        <div class="flex items-center my-6">
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600" />
          <span class="px-4 text-xs text-gray-400 dark:text-gray-500">或者</span>
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600" />
        </div>

        <!-- 第三方登录 -->
        <div class="flex gap-3 mb-6">
          <n-button
            quaternary
            class="flex-1"
            size="large"
          >
            <template #icon>
              <div class="i-carbon-email text-20px" />
            </template>
          </n-button>
          <n-button
            quaternary
            class="flex-1"
            size="large"
          >
            <template #icon>
              <div class="i-carbon-phone text-20px" />
            </template>
          </n-button>
          <n-button
            quaternary
            class="flex-1"
            size="large"
          >
            <template #icon>
              <div class="i-carbon-qr-code text-20px" />
            </template>
          </n-button>
        </div>

        <!-- 注册链接 -->
        <div class="text-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">还没有账号？</span>
          <n-button
            text
            type="primary"
            size="small"
            @click="handleRegister"
            class="ml-1"
          >
            立即注册
          </n-button>
        </div>
      </div>

      <!-- 返回首页按钮 -->
      <div class="text-center mt-6">
        <n-button
          text
          @click="router.push('/')"
          class="text-gray-600 dark:text-gray-400"
        >
          <template #icon>
            <div class="i-carbon-arrow-left" />
          </template>
          返回首页
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
