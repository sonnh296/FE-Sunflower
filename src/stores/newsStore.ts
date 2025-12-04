import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getPublishedNewsApi,
  getNewsByIdApi,
  createNewsApi,
  updateNewsApi,
  deleteNewsApi,
  uploadNewsImageApi,
  type NewsRequest,
  type NewsResponse
} from '@/api/newsApi'

export const useNewsStore = defineStore('news', () => {
  const newsList = ref<NewsResponse[]>([])
  const currentNews = ref<NewsResponse | null>(null)
  const totalPages = ref(0)
  const totalElements = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPublishedNews = async (pageNumber: number = 0, pageSize: number = 10) => {
    loading.value = true
    error.value = null
    try {
      const response = await getPublishedNewsApi(pageNumber, pageSize)
      if (response.data.code === 1000) {
        newsList.value = response.data.result.content
        totalPages.value = response.data.result.totalPages
        totalElements.value = response.data.result.totalElements
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch news'
    } finally {
      loading.value = false
    }
  }

  const fetchNewsById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await getNewsByIdApi(id)
      if (response.data.code === 1000) {
        currentNews.value = response.data.result
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch news'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createNews = async (request: NewsRequest) => {
    loading.value = true
    error.value = null
    try {
      const response = await createNewsApi(request)
      if (response.data.code === 1000) {
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to create news'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateNews = async (id: string, request: NewsRequest) => {
    loading.value = true
    error.value = null
    try {
      const response = await updateNewsApi(id, request)
      if (response.data.code === 1000) {
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to update news'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteNews = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await deleteNewsApi(id)
      newsList.value = newsList.value.filter(n => n.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete news'
      throw err
    } finally {
      loading.value = false
    }
  }

  const uploadNewsImage = async (id: string, image: File) => {
    loading.value = true
    error.value = null
    try {
      const response = await uploadNewsImageApi(id, image)
      if (response.data.code === 1000) {
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to upload image'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    newsList,
    currentNews,
    totalPages,
    totalElements,
    loading,
    error,
    fetchPublishedNews,
    fetchNewsById,
    createNews,
    updateNews,
    deleteNews,
    uploadNewsImage
  }
})
