export type MfResponse<T> = {
  code: string | number
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
