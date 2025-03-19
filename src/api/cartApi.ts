import type { AxiosResponse } from 'axios'
import api from './api'
import type { MfResponse } from '@/types/MatchFinderResponse'
import type { ProductItem } from '@/types/Product'

export type CartSearchRequest = {
  pageSize: number
  pageNumber: number
}

export type CartAddRequest = {
  productItemId: string
  quantity: number
}

export type CartUpdateRequest = {
  cartItemId: string
  quantity: number
}

export type CartResponse = {
  content: CartItem[]
  totalPrice: number
  totalItems: number
}

export type CartItem = {
  id: string
  productItem: ProductItem
  quantity: number
}

export const getCartApi = async (): Promise<AxiosResponse<MfResponse<CartResponse>>> => {
  return await api.get('/cart/items')
}

export const addToCartApi = async (
  value: CartAddRequest
): Promise<AxiosResponse<MfResponse<CartResponse>>> => {
  return await api.post('/cart', {
    cartItem: value
  })
}

export const updateCartItemApi = async (
  value: CartUpdateRequest
): Promise<AxiosResponse<MfResponse<CartResponse>>> => {
  return await api.patch('/cart/items/' + value.cartItemId + '/quantity', value)
}

export const removeFromCartApi = async (
  cartItemId: string
): Promise<AxiosResponse<MfResponse<CartResponse>>> => {
  return await api.delete(`/cart/items/${cartItemId}`)
}

export const clearCartApi = async (): Promise<AxiosResponse<MfResponse<CartResponse>>> => {
  return await api.delete('/cart')
}
