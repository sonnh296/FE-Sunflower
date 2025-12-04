import type { AxiosResponse } from 'axios'
import api from './api'
import type { MfResponse } from '@/types/MatchFinderResponse'

export type CartSearchRequest = {
  pageSize: number
  pageNumber: number
}

export type CartAddRequest = {
  cartItem: {
    quantity: number
    productId?: string
    productVariantId?: string
  }
}

export type CartUpdateRequest = {
  quantity: number
}

export type CartItemResponse = {
  id: string
  quantity: number
  addedAt: string
  thumbnailUrl: string
  price: number
  productId: string
  productName: string
  variantId: string | null
  size: string | null
  availableStock: number
}

export type CartPageResponse = {
  content: CartItemResponse[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export const getCartItemsApi = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  sort: string = 'DESC'
): Promise<AxiosResponse<MfResponse<CartPageResponse>>> => {
  return await api.get('/cart/items', {
    params: {
      field: 'addedAt',
      pageNumber,
      pageSize,
      sort
    }
  })
}

export const addToCartApi = async (
  request: CartAddRequest
): Promise<AxiosResponse<MfResponse<any>>> => {
  return await api.post('/cart', request)
}

export const updateCartItemQuantityApi = async (
  cartItemId: string,
  request: CartUpdateRequest
): Promise<AxiosResponse<MfResponse<CartItemResponse>>> => {
  return await api.patch(`/cart/items/${cartItemId}/quantity`, request)
}

export const removeFromCartApi = async (
  cartItemId: string
): Promise<AxiosResponse<MfResponse<string>>> => {
  return await api.delete(`/cart/items/${cartItemId}`)
}
