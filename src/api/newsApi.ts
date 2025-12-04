import type { AxiosResponse } from 'axios'
import api from './api'
import type { MfResponse } from '@/types/MatchFinderResponse'

export type NewsRequest = {
  title: string
  content: string
  published: boolean
  imageUrl?: string
}

export type NewsResponse = {
  id: string
  title: string
  content: string
  imageUrl: string | null
  published: boolean
  createdAt: string
  updatedAt: string
}

export type NewsPageResponse = {
  content: NewsResponse[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export const getPublishedNewsApi = async (
  pageNumber: number = 0,
  pageSize: number = 10,
  sort: string = 'DESC'
): Promise<AxiosResponse<MfResponse<NewsPageResponse>>> => {
  return await api.get('/news', {
    params: {
      field: 'createdAt',
      pageNumber,
      pageSize,
      sort
    }
  })
}

export const getNewsByIdApi = async (
  id: string
): Promise<AxiosResponse<MfResponse<NewsResponse>>> => {
  return await api.get(`/news/${id}`)
}

export const createNewsApi = async (
  request: NewsRequest
): Promise<AxiosResponse<MfResponse<NewsResponse>>> => {
  return await api.post('/news', request)
}

export const updateNewsApi = async (
  id: string,
  request: NewsRequest
): Promise<AxiosResponse<MfResponse<NewsResponse>>> => {
  return await api.put(`/news/${id}`, request)
}

export const deleteNewsApi = async (
  id: string
): Promise<AxiosResponse<MfResponse<string>>> => {
  return await api.delete(`/news/${id}`)
}

export const uploadNewsImageApi = async (
  id: string,
  image: File
): Promise<AxiosResponse<MfResponse<NewsResponse>>> => {
  const formData = new FormData()
  formData.append('image', image)
  return await api.post(`/news/${id}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
