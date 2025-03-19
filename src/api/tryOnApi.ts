import type { AxiosResponse } from 'axios'
import api from './api'

export type TryOnRequest = {
  humanImage: File | undefined
  clothImage: string
}

export const generateImageTryOnApi = async (
  value: TryOnRequest
): Promise<AxiosResponse<{ imageUrl: string }>> => {
  return await api.post('/api/virtual-try-on', value, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
