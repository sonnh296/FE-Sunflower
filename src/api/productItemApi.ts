import type { AxiosResponse } from 'axios'
import api from './api'
import type { MfResponse } from '@/types/MatchFinderResponse'
import type { ProductItem } from '@/types/Product'

export type ProductItemSearchRequest = {
  productId?: string
}

export type ProductItemCreateRequest = {
  price: number
  category: string
  productId: string
  gender: string
  size: string
  color: string
  stockQuantity: number
  url: string
}

export type ProductItemUpdateRequest = {
  id: string
  price: number
  category: string
  gender: string
  size: string
  color: string
  stockQuantity: number
  isActive: boolean
  url: string
}

export type ProductItemResponse = {
  content: ProductItem[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export const getProductItemByIdApi = async (
  id: string
): Promise<AxiosResponse<MfResponse<ProductItem>>> => {
  return await api.get('/product-items/' + id)
}

export const getProductItemsApi = async (
  params: ProductItemSearchRequest
): Promise<AxiosResponse<MfResponse<ProductItemResponse>>> => {
  return await api.get('/product-items', { params })
}

export const createProductItemApi = async (
  value: ProductItemCreateRequest
): Promise<AxiosResponse<MfResponse<ProductItem>>> => {
  return await api.post('/product-items', value)
}

export const updateProductItemApi = async (
  value: ProductItemUpdateRequest
): Promise<AxiosResponse<MfResponse<ProductItem>>> => {
  return await api.put('/product-items/' + value.id, value)
}

export const deleteProductItemApi = async (
  id: string
): Promise<AxiosResponse<MfResponse<ProductItem>>> => {
  return await api.delete('/product-items/' + id)
}
