import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import adapterFetch from 'alova/fetch'
import type { ResponseData } from './types'
import { dialogManager } from '../sys'
import { useAuthStore } from '../../store'

/**
 * alova 请求工具封装
 * 
 * 特性：
 * 1. 自动处理 Token 注入
 * 2. 统一处理 HTTP 状态码错误
 * 3. 统一处理业务逻辑错误码 (默认 200/0 为成功)
 * 4. 支持 TypeScript 类型定义
 * 5. 集成 VueHook 实现响应式请求
 */
export const alovaInstance = createAlova({
  // 基础路径，优先从环境变量获取
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  // 状态管理钩子，使用 VueHook
  statesHook: VueHook,
  
  // 请求适配器，使用 fetch
  requestAdapter: adapterFetch(),
  
  // 请求超时时间 (10秒)
  timeout: 10000,
  
  // 请求拦截器
  beforeRequest(method) {
    // 从 store 获取 token
    const authStore = useAuthStore()
    const token = authStore.token
    if (token) {
      method.config.headers.Authorization = `Bearer ${token}`
    }
    
    // 设置默认的内容类型
    if (!method.config.headers['Content-Type']) {
      method.config.headers['Content-Type'] = 'application/json'
    }
  },
  
  // 响应拦截器
  responded: {
    /**
     * 请求成功拦截器
     * 可以统一处理业务逻辑错误
     */
    onSuccess: async (response: Response, method) => {
      // 1. 检查 HTTP 状态码
      if (!response.ok) {
        const errorMsg = `HTTP Error: ${response.status} ${response.statusText}`
        throw new Error(errorMsg)
      }
      
      // 2. 解析数据
      const result: ResponseData = await response.json()
      
      // 3. 统一处理业务逻辑错误码
      // 假设 200 或 0 是成功，其他都是错误
      const { code, message, data } = result
      if (code !== 200 && code !== 0) {
        // 这里可以根据不同的 code 进行特殊处理，例如 401 跳转登录
        if (code === 401) {
          await dialogManager.error('登录已过期，请重新登录')
          // 使用 store 清理 token
          const authStore = useAuthStore()
          authStore.clearToken()
        }
        throw new Error(message || '请求业务错误')
      }
      
      // 返回实际的数据部分
      return data
    },
    
    /**
     * 请求失败拦截器
     * 处理网络错误、超时等
     */
    onError: (err, method) => {
      // 如果是业务逻辑中已经弹窗处理过的错误（如 401），则不再重复弹窗
      if (err.message === '登录已过期，请重新登录') {
        throw err
      }
      // 网络断开或超时
      dialogManager.error(err.message || '网络连接失败，请检查网络设置')
      throw err
    }
  }
})

/**
 * 封装常用的请求方法
 */
export const http = {
  get<T = any>(url: string, config?: any) {
    return alovaInstance.Get<T>(url, config)
  },
  
  post<T = any>(url: string, data?: any, config?: any) {
    return alovaInstance.Post<T>(url, data, config)
  },
  
  put<T = any>(url: string, data?: any, config?: any) {
    return alovaInstance.Put<T>(url, data, config)
  },
  
  delete<T = any>(url: string, config?: any) {
    return alovaInstance.Delete<T>(url, config)
  }
}
