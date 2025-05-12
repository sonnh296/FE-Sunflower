export type MfResponse<T> = {
  code: string
  result: T
  data: T
  message: 'true'
  meta?: {
    total: number
    page: number
    pageSize: number
    totalPage: number
  }
  success: 'true'
}
