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
import { GOOGLE_REDIRECT_URI } from '@/utils/googleOAuth'
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
  getters: {
    user: (state) => state.identity,
    isAuthenticated: (state) => state.identified && !!state.identity
  },
  actions: {
    // Initialize auth state from cookies
    async initializeAuth() {
      const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
      const userId = Cookies.get(USER_ID)

      if (accessToken && userId) {
        console.log('Found existing auth token, initializing...')
        try {
          await this.getMe()
          this.identified = true
          console.log('Auth initialized successfully, identified:', this.identified)

          // Set up cross-tab sync
          this.setupCrossTabSync()
        } catch (error) {
          console.error('Failed to initialize auth:', error)
          // Token might be invalid, clear it
          await this.logout()
        }
      } else {
        // Still setup cross-tab sync even if not logged in
        this.setupCrossTabSync()
      }
    },

    // Setup cross-tab synchronization
    setupCrossTabSync() {
      // Listen for storage changes from other tabs
      window.addEventListener('storage', (event) => {
        // Check if access token was added/removed
        if (event.key === ACCESS_TOKEN_KEY) {
          console.log('Access token changed in another tab')

          if (event.newValue) {
            // Token was added - user logged in another tab
            console.log('User logged in another tab, syncing...')
            this.initializeAuth()
          } else if (event.oldValue && !event.newValue) {
            // Token was removed - user logged out in another tab
            console.log('User logged out in another tab, syncing...')
            this.syncLogout()
          }
        }
      })

      // Use BroadcastChannel for better cross-tab communication
      if (typeof BroadcastChannel !== 'undefined') {
        const authChannel = new BroadcastChannel('auth-channel')

        authChannel.onmessage = (event) => {
          console.log('Received auth message from another tab:', event.data)

          if (event.data.type === 'LOGIN') {
            console.log('Login detected in another tab')
            this.initializeAuth()
          } else if (event.data.type === 'LOGOUT') {
            console.log('Logout detected in another tab')
            this.syncLogout()
          }
        }
      }
    },

    // Sync logout from other tabs
    syncLogout() {
      Cookies.remove(ACCESS_TOKEN_KEY)
      Cookies.remove(REFRESH_TOKEN_KEY)
      Cookies.remove(ROLE)
      Cookies.remove(USER_ID)
      localStorage.clear()
      this.identified = false
      this.identity = null
      window.location.reload()
    },

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
        const { data } = await googleAuthApi(code, GOOGLE_REDIRECT_URI)
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
      try {
        console.log('Logging out...')
        const token = Cookies.get(ACCESS_TOKEN_KEY)

        if (!token) {
          console.log('No token found, skipping logout API call')
          router.push('/')
          return
        }

        if (token) {
          try {
            await logoutApi(token)
          } catch (error) {
            console.error('Error calling logout API:', error)
            // Continue with logout even if API call fails
          }
        }

        // Clear all auth data
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REFRESH_TOKEN_KEY)
        Cookies.remove(ROLE)
        Cookies.remove(USER_ID)
        localStorage.clear()
        this.identified = false
        this.identity = null
        // Notify other tabs about logout
        if (typeof BroadcastChannel !== 'undefined') {
          const authChannel = new BroadcastChannel('auth-channel')

          authChannel.postMessage({ type: 'LOGOUT' })
          authChannel.close()
        }
        console.log('Logout complete, redirecting to home page')
        router.push('/')

        console.log('Logout complete, redirecting to home page')
      } catch (error) {
        console.error('Error during logout:', error)
        // Force logout even if there's an error
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REFRESH_TOKEN_KEY)
        Cookies.remove(ROLE)
        Cookies.remove(USER_ID)
        localStorage.clear()
        this.identified = false
        this.identity = null
        window.location.replace('/')
      }
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

      // Notify other tabs about login
      if (typeof BroadcastChannel !== 'undefined') {
        const authChannel = new BroadcastChannel('auth-channel')
        authChannel.postMessage({ type: 'LOGIN', userId: this.identity?.id })
        authChannel.close()
      }

      if (role === 'user') {
        router.push('/user/home')
      }
      if (role === 'admin') router.push('/admin/products')
    }
  }
})
