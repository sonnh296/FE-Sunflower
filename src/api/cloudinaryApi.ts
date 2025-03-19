import type { AxiosResponse } from 'axios'
import api from './api'

export const uploadImageApi = async (value: {
  image: File
}): Promise<AxiosResponse<{ url: string }>> => {
  return await api.post('/cloudinary/upload/image', value, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
