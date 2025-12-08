import type { AxiosResponse } from 'axios'
import api from './api'
import type { MfResponse } from '@/types/MatchFinderResponse'
import type { RefreshResponse } from './types/ResreshResponse'
import type { Identity } from '@/types/Identity'
import type { LoginResponse } from './types/LoginResponse'

export type LoginRequest = {
  username: string
  password: string
}

export type LogoutRequest = {
  username: string
  password: string
}

export type VerifyPasswordTokenRequest = {
  token: string
  userId: number
}

export type ActiveAccountRequest = {
  token: string
  userId: number
}

export type ResetPasswordRequest = {
  username?: string
  newPassword?: string
  confirmPassword?: string
  email?: string
}

export type RegisterRequest = {
  userName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

export type RefreshRequest = {
  userId: number
  refreshToken: string
}

export type ChangePassRequest = {
  email: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export const loginApi = async (
  params: LoginRequest
): Promise<AxiosResponse<MfResponse<LoginResponse>>> => {
  return await api.post('auth/token', params)
}

export const logoutApi = async (token: string): Promise<AxiosResponse<MfResponse<Object>>> => {
  return await api.post('auth/logout', { token })
}

export const registerApi = async (
  params: RegisterRequest
): Promise<AxiosResponse<MfResponse<Object>>> => {
  // Use email as username for login consistency
  const requestData = {
    username: params.email, // Username = email để đăng nhập bằng email
    email: params.email,
    password: params.password,
    fullName: params.userName,
    ...(params.phoneNumber && { phoneNumber: params.phoneNumber })
  }
  return await api.post('auth/register', requestData)
}

export const changePassApi = async (
  params: ChangePassRequest
): Promise<AxiosResponse<MfResponse<Object>>> => {
  return await api.post('auths/change-password', params)
}

export const forgotPassApi = async (email: string): Promise<AxiosResponse<MfResponse<Object>>> => {
  return await api.post('auths/forget-password', { email: email })
}

export const verifyTokenApi = async (
  params: VerifyPasswordTokenRequest
): Promise<AxiosResponse<MfResponse<Object>>> => {
  return await api.get('auth/refresh', { params })
}

export const activeAccountApi = async (
  params: ActiveAccountRequest
): Promise<AxiosResponse<MfResponse<Object>>> => {
  return await api.post('auths/active-account', params)
}

export const resetPassApi = async (
  params: ResetPasswordRequest
): Promise<AxiosResponse<MfResponse<Object>>> => {
  return await api.post('auths/new-password', params)
}

export const verifyEmailApi = async (
  token: string
): Promise<AxiosResponse<MfResponse<string>>> => {
  return await api.get('auth/verify-email', { params: { token } })
}

export const resendVerificationEmailApi = async (
  email: string
): Promise<AxiosResponse<MfResponse<string>>> => {
  return await api.post('auth/resend-verification', null, { params: { email } })
}

export const refreshTokenApi = async (
  params: RefreshRequest
): Promise<AxiosResponse<MfResponse<RefreshResponse>>> => {
  return await api.post('auths/refresh-token', params)
}

export const getMeApi = async (): Promise<AxiosResponse<MfResponse<Identity>>> => {
  return await api.get('users/my-info')
}

// Google OAuth
export const googleAuthApi = async (
  code: string
): Promise<AxiosResponse<MfResponse<LoginResponse>>> => {
  return await api.post('auth/outbound/authentication', null, {
    params: { code }
  })
}
