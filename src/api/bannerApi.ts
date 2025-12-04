import type { AxiosResponse } from 'axios'
import api from './api'
import type { MfResponse } from '@/types/MatchFinderResponse'

export type BannerRequest = {
  title: string
  content: string
  imageUrl?: string
  linkUrl?: string
  isActive: boolean
  startDate?: string
  endDate?: string
}

export type BannerResponse = {
  id: string
  title: string
  content: string
  imageUrl: string | null
  linkUrl: string | null
  isActive: boolean
  startDate: string | null
  endDate: string | null
  createdAt: string
  updatedAt: string
}

export type BannerPageResponse = {
  content: BannerResponse[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export const getBannersApi = async (
  pageNumber: number = 0,
  pageSize: number = 10,
  sort: string = 'DESC'
): Promise<AxiosResponse<MfResponse<BannerPageResponse>>> => {
  return await api.get('/banners', {
    params: {
      field: 'createdAt',
      pageNumber,
      pageSize,
      sort
    }
  })
}

export const getActiveBannerApi = async (): Promise<AxiosResponse<MfResponse<BannerResponse>>> => {
  return await api.get('/banners/active')
}

export const getBannerByIdApi = async (
  id: string
): Promise<AxiosResponse<MfResponse<BannerResponse>>> => {
  return await api.get(`/banners/${id}`)
}

export const createBannerApi = async (
  request: BannerRequest
): Promise<AxiosResponse<MfResponse<BannerResponse>>> => {
  return await api.post('/banners', request)
}

export const updateBannerApi = async (
  id: string,
  request: BannerRequest
): Promise<AxiosResponse<MfResponse<BannerResponse>>> => {
  return await api.put(`/banners/${id}`, request)
}

export const deleteBannerApi = async (
  id: string
): Promise<AxiosResponse<MfResponse<string>>> => {
  return await api.delete(`/banners/${id}`)
}

export const uploadBannerImageApi = async (
  id: string,
  image: File
): Promise<AxiosResponse<MfResponse<BannerResponse>>> => {
  const formData = new FormData()
  formData.append('image', image)
  return await api.post(`/banners/${id}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
