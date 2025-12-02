import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROLE, USER_ID } from '@/constants/storage'

export const debugAuthState = () => {
  console.log('=== Authentication Debug Info ===')
  console.log('Access Token:', Cookies.get(ACCESS_TOKEN_KEY))
  console.log('Refresh Token:', Cookies.get(REFRESH_TOKEN_KEY))
  console.log('Role:', Cookies.get(ROLE))
  console.log('User ID:', Cookies.get(USER_ID))
  console.log('LocalStorage Name:', localStorage.getItem('name'))
  console.log('LocalStorage Avatar:', localStorage.getItem('avatar'))
  console.log('All Cookies:', Cookies.get())
  console.log('================================')
}

