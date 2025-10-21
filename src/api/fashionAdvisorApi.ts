import api from './api'
import type { ApiResponse } from '@/types/ApiResponse'

export interface FashionAdvisorRequest {
  skinColor: string
  bust: string
  waist: string
  hip: string
  height?: string
  weight?: string
  style?: string
  occasion?: string
  additionalInfo?: string
}

export interface FashionAdvisorResponse {
  recommendation: string
  userCountry: string
  userLocation: string
  suggestedColors: string[]
  suggestedStyles: string[]
  bodyType: string
  additionalTips: string
}

export const getFashionRecommendation = async (
  request: FashionAdvisorRequest
): Promise<ApiResponse<FashionAdvisorResponse>> => {
  const response = await api.post<ApiResponse<FashionAdvisorResponse>>(
    '/api/fashion-advisor/recommend',
    request
  )
  return response.data
}

export const getUserLocation = async (): Promise<ApiResponse<string>> => {
  const response = await api.get<ApiResponse<string>>('/api/fashion-advisor/location')
  return response.data
}
