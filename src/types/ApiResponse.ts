// Backend ApiResponse type matching Spring Boot backend
export type ApiResponse<T> = {
  code: number
  message?: string
  result: T
}
