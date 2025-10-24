import type { AxiosResponse } from 'axios'
import api from './api'
import type { MfResponse } from '@/types/MatchFinderResponse'
import type { ApiResponse } from '@/types/ApiResponse'
import type { Product, ProductListItem } from '@/types/Product'

export type ProductSearchRequest = {
  pageSize: number
  pageNumber: number
}

export type ProductItemRequest = {
  price: number
  productId?: string
  category: string
  gender: string
  size: string
  color: string
  stockQuantity: number
  isActive: boolean
  url: string
}

export type ProductCreateRequest = {
  name: string
  description: string
  imageUrls?: string[]
  productItem?: ProductItemRequest[]
}

export type ProductUpdateRequest = {
  id: string
  name: string
  description: string
  imageUrls?: string[]
  productItem?: ProductItemRequest[]
}

export type ProductResponse = {
  content: ProductListItem[]
  totalElements: number
  totalPages: number
}

export type OneProductResponse = {
  totalElements: number
  totalPages: number
}

export const getProductByIdApi = async (
  id: string
): Promise<AxiosResponse<ApiResponse<Product>>> => {
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

export const deleteProductApi = async (id: string): Promise<AxiosResponse<MfResponse<Product>>> => {
  return await api.delete('/products/' + id)
}

// Product Image APIs
export type ProductImageUploadRequest = {
  productId: string
  images: File[]
}

export type ProductSingleImageUploadRequest = {
  productId: string
  image: File
}

export const uploadProductImagesApi = async (
  value: ProductImageUploadRequest
): Promise<AxiosResponse<ApiResponse<Product>>> => {
  const formData = new FormData()

  value.images.forEach((image) => {
    formData.append('images', image)
  })

  return await api.post(`/products/${value.productId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const uploadProductSingleImageApi = async (
  value: ProductSingleImageUploadRequest
): Promise<AxiosResponse<ApiResponse<Product>>> => {
  const formData = new FormData()

  formData.append('image', value.image)

  return await api.post(`/products/${value.productId}/images/single`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const deleteProductImageApi = async (
  productId: string,
  imageId: string
): Promise<AxiosResponse<ApiResponse<Product>>> => {
  return await api.delete(`/products/${productId}/images/${imageId}`)
}
