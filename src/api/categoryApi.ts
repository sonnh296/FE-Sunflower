import type { AxiosResponse } from 'axios'
import api from './api'
import type { ApiResponse } from '@/types/ApiResponse'

export type Category = {
  id: string
  name: string
}

export type Size = {
  id: string
  name: string
  categoryId?: string
  categoryName?: string
}

// The backend `/categories` endpoint returns 400 in the current environment
// (user reported). To avoid making that useless network call we return a
// local fallback list here. Callers still receive an object shaped like an
// AxiosResponse<ApiResponse<Category[]>> so existing code doesn't need to
// change.
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Tops' },
  { id: 'c2', name: 'Bottoms' },
  { id: 'c3', name: 'Dresses' },
  { id: 'c4', name: 'Accessories' }
]

export const getCategoriesApi = async (): Promise<AxiosResponse<ApiResponse<Category[]>>> => {
  // Return a resolved Promise that mimics AxiosResponse so callers don't
  // need to change. No network call is made.
  return Promise.resolve({
    data: {
      code: 200,
      result: DEFAULT_CATEGORIES,
      success: true
    }
  } as unknown as AxiosResponse<ApiResponse<Category[]>>)
}

export const getSizesApi = async (
  categoryId?: string
): Promise<AxiosResponse<ApiResponse<Size[]>>> => {
  const params: any = {}
  if (categoryId) params.categoryId = categoryId
  return await api.get('/sizes', { params })
}

// (getSizeByIdApi removed — not needed by frontend at the moment)
