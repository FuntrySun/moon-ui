<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { validateRegisterForm } from '@/utils/validation'

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
  confirmPassword: '',
  rememberMe: true  // 注册默认勾选记住我
})

// 加载状态
const loading = ref(false)

// 表单验证规则
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 20,
      message: '用户名长度为 3-20 个字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 6,
      message: '密码至少需要 6 个字符',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur'
    }
  ]
}

// 处理注册
const handleRegister = async () => {
  // 表单验证
  const validation = validateRegisterForm(
    formData.value.username,
    formData.value.password,
    formData.value.confirmPassword
  )
  
  if (!validation.valid) {
    message.error(validation.message || '请填写完整的注册信息')
    return
  }

  try {
    loading.value = true
    
    // 调用认证 Store 注册
    const result = await authStore.register({
      username: formData.value.username,
      password: formData.value.password,
      confirmPassword: formData.value.confirmPassword,
      rememberMe: formData.value.rememberMe
    })

    if (result.success) {
      message.success(result.message)
      
      // 获取重定向路径（从路由守卫传递过来的原访问路径）
      const redirect = (route.query.redirect as string) || '/'
      
      // 注册成功，跳转到原访问页面或首页
      setTimeout(() => {
        router.push(redirect)
      }, 1000)
    } else {
      message.error(result.message)
    }
  } catch (error) {
    console.error('注册错误:', error)
    message.error('注册失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 跳转到登录页面
const handleGoToLogin = () => {
  router.push('/auth/login')
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div class="absolute top-40 left-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
    </div>

    <!-- 注册卡片 -->
    <div class="relative z-10 w-full max-w-md mx-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <!-- Logo 和标题 -->
        <div class="text-center mb-8">
          <div class="flex-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex-center shadow-lg">
              <div class="i-carbon-user-follow text-white text-32px" />
            </div>
          </div>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            创建账号
          </h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            填写信息以注册新账号
          </p>
        </div>

        <!-- 注册表单 -->
        <n-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          size="large"
        >
          <n-form-item path="username" :show-label="false">
            <n-input
              v-model:value="formData.username"
              placeholder="用户名（3-20个字符）"
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
              placeholder="密码（至少6个字符）"
              show-password-on="click"
              clearable
            >
              <template #prefix>
                <div class="i-carbon-password text-gray-400 text-18px" />
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="confirmPassword" :show-label="false">
            <n-input
              v-model:value="formData.confirmPassword"
              type="password"
              placeholder="确认密码"
              show-password-on="click"
              clearable
            >
              <template #prefix>
                <div class="i-carbon-security text-gray-400 text-18px" />
              </template>
            </n-input>
          </n-form-item>

          <!-- 密码要求提示 -->
          <div class="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">密码要求：</p>
            <ul class="text-xs text-gray-500 dark:text-gray-500 space-y-1">
              <li class="flex items-center gap-2">
                <div class="i-carbon-checkmark-filled text-green-500 text-14px" />
                至少 6 个字符
              </li>
              <li class="flex items-center gap-2">
                <div class="i-carbon-checkmark-filled text-green-500 text-14px" />
                包含字母和数字
              </li>
            </ul>
          </div>

          <!-- 注册按钮 -->
          <n-button
            type="primary"
            block
            size="large"
            :loading="loading"
            @click="handleRegister"
            class="mb-4 font-semibold"
          >
            <template #icon>
              <div class="i-carbon-user-follow" />
            </template>
            立即注册
          </n-button>
        </n-form>

        <!-- 登录链接 -->
        <div class="text-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">已有账号？</span>
          <n-button
            text
            type="primary"
            size="small"
            @click="handleGoToLogin"
            class="ml-1"
          >
            立即登录
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
