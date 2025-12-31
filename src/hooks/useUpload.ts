import { ref, watch } from 'vue'
import { useRequest } from 'alova/client'
import { readFile } from '@tauri-apps/plugin-fs'
import { dialogManager } from '../utils/sys'
import { http } from '../utils/http'

interface UploadOptions {
  /** 上传地址 */
  url: string
  /** 字段名，默认为 'file' */
  fieldName?: string
  /** 允许的文件类型限制 */
  filters?: { name: string; extensions: string[] }[]
  /** 是否允许多选 */
  multiple?: boolean
}

/**
 * 文件上传 Hook
 * 集成了 Tauri 原生文件选择和 alova 自动进度追踪
 */
export function useUpload(options: UploadOptions) {
  const { 
    url, 
    fieldName = 'file', 
    filters = [], 
    multiple = false 
  } = options

  const uploadProgress = ref(0)
  const isReading = ref(false)

  // 使用 alova 的 useRequest 来处理上传请求
  const { 
    loading: isUploading, 
    error, 
    send: executeUpload,
    onSuccess,
    onError,
    uploading
  } = useRequest(
    (formData: FormData) => http.post(url, formData, {
      // 标记为文件上传，alova 会自动处理 Content-Type
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
    { immediate: false }
  )

  // 通过监听 uploading 状态来更新进度
  watch(uploading, (val) => {
    if (val.total > 0) {
      uploadProgress.value = Math.floor((val.loaded / val.total) * 100)
    }
  }, { deep: true })

  /**
   * 选择并上传文件
   */
  const selectAndUpload = async () => {
    try {
      // 1. 调用系统对话框选择文件
      const selected = await dialogManager.selectFile({
        multiple,
        filters
      })

      if (!selected) return

      const filePaths = Array.isArray(selected) ? selected : [selected]
      
      for (const path of filePaths) {
        isReading.value = true
        uploadProgress.value = 0
        
        try {
          // 2. 读取文件二进制数据
          const content = await readFile(path)
          
          // 3. 构造 FormData
          const formData = new FormData()
          // 提取文件名
          const fileName = path.split(/[\\/]/).pop() || 'file'
          const blob = new Blob([content])
          formData.append(fieldName, blob, fileName)

          // 4. 执行上传
          await executeUpload(formData)
        } finally {
          isReading.value = false
        }
      }
    } catch (err: any) {
      console.error('Upload failed:', err)
      dialogManager.error(err.message || '文件处理或上传失败')
    }
  }

  return {
    selectAndUpload,
    uploadProgress,
    isUploading,
    isReading,
    error,
    onSuccess,
    onError
  }
}
