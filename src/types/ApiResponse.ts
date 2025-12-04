export type ApiResponse<T> = {
  code: string | number
  result: T
  message?: string
  success?: boolean
}
