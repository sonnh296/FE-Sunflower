export type LoginResponse = {
  code: string
  result: {
    token: string
    authenticated: boolean
  }
}
