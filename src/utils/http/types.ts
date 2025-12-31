export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

export interface HttpRequestConfig {
  /** 是否显示加载条 */
  loading?: boolean
  /** 是否显示错误消息 */
  showErrorMessage?: boolean
}
