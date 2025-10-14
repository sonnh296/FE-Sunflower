import { defineStore } from 'pinia'
import {
  activeAccountApi,
  changePassApi,
  forgotPassApi,
  getMeApi,
  googleAuthApi,
  loginApi,
  logoutApi,
  registerApi,
  resetPassApi,
  verifyTokenApi,
  type ChangePassRequest,
  type LoginRequest,
  type RegisterRequest,
  type ResetPasswordRequest
} from '@/api/authApi'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY, NAME, REFRESH_TOKEN_KEY, ROLE, USER_ID } from '@/constants/storage'
import type { Identity } from '@/types/Identity'
import type { AxiosError } from 'axios'
import router from '@/router'
import type { BadRequestResponse } from '@/api/types/BadRequestError'
import type { LoginResponse } from '@/api/types/LoginResponse'
import { useLocalStorage } from '@vueuse/core'

export interface State {
  loginError: boolean
  identity: Identity | null
  rootUrl: string
  name: string
  identified: boolean
  isLoggingIn: boolean
  isRegistering: boolean
  messageError: string | undefined
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): State => ({
    loginError: false,
    messageError: undefined,
    identity: null,
    isLoggingIn: false,
    identified: false,
    isRegistering: false,
    name: useLocalStorage(NAME, '').value,
    rootUrl: '/'
  }),
  actions: {
    async login(params: LoginRequest) {
      try {
        this.loginError = false
        this.isLoggingIn = true
        const { data } = await loginApi(params)
        this.isLoggingIn = false
        await this.loginSuccessfully(data.result)
      } catch (e: unknown) {
        console.error(e)
        this.messageError = (e as AxiosError<BadRequestResponse>).response?.data.message
        this.loginError = true
        this.isLoggingIn = false
      }
    },

    async googleLogin(code: string) {
      try {
        this.loginError = false
        this.isLoggingIn = true
        const { data } = await googleAuthApi(code)
        this.isLoggingIn = false
        await this.loginSuccessfully(data.result)
      } catch (e: unknown) {
        console.error(e)
        this.messageError = (e as AxiosError<BadRequestResponse>).response?.data.message
        this.loginError = true
        this.isLoggingIn = false
        throw e
      }
    },

    async logout() {
      console.log(Cookies.get(ACCESS_TOKEN_KEY))
      if (this.identity && Cookies.get(ACCESS_TOKEN_KEY))
        await logoutApi(Cookies.get(ACCESS_TOKEN_KEY) + '')
      Cookies.remove(ACCESS_TOKEN_KEY)
      Cookies.remove(REFRESH_TOKEN_KEY)
      Cookies.remove(ROLE)
      Cookies.remove(USER_ID)
      localStorage.clear()
      this.identified = false
      window.location.replace(this.rootUrl)
    },

    async getMe() {
      const { data } = await getMeApi()
      if (data.code) this.identity = data.result

      console.log(this.identity)
      return this.identity
    },

    async register(params: RegisterRequest) {
      this.isRegistering = true
      const { data } = await registerApi(params)
      this.isRegistering = false
      return data
    },

    async changePass(params: ChangePassRequest) {
      const { data } = await changePassApi(params)
      if (data) {
        window.location.replace(this.rootUrl)
      }
    },

    async forgetPassword(email: string) {
      const { data } = await forgotPassApi(email)
      return data
    },

    async vorifyToken(token: string, userId: number) {
      const { data } = await verifyTokenApi({
        token: token,
        userId: userId
      })
      return data
    },

    async activeAccount(token: string, userId: number) {
      const { data } = await activeAccountApi({
        token: token,
        userId: userId
      })
      return data
    },

    async resetPassword(params: ResetPasswordRequest) {
      const { data } = await resetPassApi(params)
      return data
    },

    async loginSuccessfully(data: LoginResponse) {
      Cookies.set(ACCESS_TOKEN_KEY, data.token)
      Cookies.set(REFRESH_TOKEN_KEY, data.token)
      await this.getMe()

      const role = this.identity?.user_roles[0].role.roleName
      Cookies.set(ROLE, role + '')
      Cookies.set(USER_ID, this.identity?.id + '')
      localStorage.setItem(NAME, this.identity?.fullName ?? '')
      this.name = this.identity?.fullName ?? ''
      this.identified = true
      localStorage.setItem('avatar', this.identity?.avatarUrl ?? '/noavatar.png')
      if (role === 'user') {
        router.push('/user/home')
      }
      if (role === 'admin') router.push('/admin/home')
    }
  }
})
