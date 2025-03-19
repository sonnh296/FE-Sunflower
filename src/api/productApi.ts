import type { AxiosResponse } from 'axios'
import api from './api'
import type { MfResponse } from '@/types/MatchFinderResponse'
import type { BlogPost } from '@/types/Post'
import type { Product, ProductItem } from '@/types/Product'

export type ProductSearchRequest = {
  pageSize: number
  pageNumber: number
}

export type ProductCreateRequest = {
  name: string
  description: string
  productItem: ProductItem[]
}

export type ProductUpdateRequest = {
  id: number
  name: string
  description: string
}

export type ProductResponse = {
  content: Product[]
  totalElements: number
  totalPages: number
}

export type OneProductResponse = {
  totalElements: number
  totalPages: number
}

export const getProductByIdApi = async (
  id: string
): Promise<AxiosResponse<MfResponse<Product>>> => {
  return await api.get('/products/' + id)
}

export const getProductsApi = async (
  params: ProductSearchRequest
): Promise<AxiosResponse<MfResponse<ProductResponse>>> => {
  return await api.get('/products', { params })
}

export const crateProductApi = async (
  value: ProductCreateRequest
): Promise<AxiosResponse<MfResponse<OneProductResponse>>> => {
  return await api.post('/products', value)
}

export const updateProductApi = async (
  value: ProductUpdateRequest
): Promise<AxiosResponse<MfResponse<OneProductResponse>>> => {
  return await api.put('/products/' + value.id, value)
}

export const deleteProductApi = async (id: number): Promise<AxiosResponse<MfResponse<Product>>> => {
  return await api.delete('/products/' + id)
}
