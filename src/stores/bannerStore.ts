import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getBannersApi,
  getActiveBannerApi,
  getBannerByIdApi,
  createBannerApi,
  updateBannerApi,
  deleteBannerApi,
  uploadBannerImageApi,
  type BannerRequest,
  type BannerResponse
} from '@/api/bannerApi'

export const useBannerStore = defineStore('banner', () => {
  const bannerList = ref<BannerResponse[]>([])
  const activeBanner = ref<BannerResponse | null>(null)
  const currentBanner = ref<BannerResponse | null>(null)
  const totalPages = ref(0)
  const totalElements = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBanners = async (pageNumber: number = 0, pageSize: number = 10) => {
    loading.value = true
    error.value = null
    try {
      const response = await getBannersApi(pageNumber, pageSize)
      if (response.data.code === 1000) {
        bannerList.value = response.data.result.content
        totalPages.value = response.data.result.totalPages
        totalElements.value = response.data.result.totalElements
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch banners'
    } finally {
      loading.value = false
    }
  }

  const fetchActiveBanner = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await getActiveBannerApi()
      if (response.data.code === 1000) {
        activeBanner.value = response.data.result
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch active banner'
      activeBanner.value = null
    } finally {
      loading.value = false
    }
  }

  const fetchBannerById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await getBannerByIdApi(id)
      if (response.data.code === 1000) {
        currentBanner.value = response.data.result
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch banner'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createBanner = async (request: BannerRequest) => {
    loading.value = true
    error.value = null
    try {
      const response = await createBannerApi(request)
      if (response.data.code === 1000) {
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to create banner'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateBanner = async (id: string, request: BannerRequest) => {
    loading.value = true
    error.value = null
    try {
      const response = await updateBannerApi(id, request)
      if (response.data.code === 1000) {
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to update banner'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteBanner = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await deleteBannerApi(id)
      bannerList.value = bannerList.value.filter(b => b.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete banner'
      throw err
    } finally {
      loading.value = false
    }
  }

  const uploadBannerImage = async (id: string, image: File) => {
    loading.value = true
    error.value = null
    try {
      const response = await uploadBannerImageApi(id, image)
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
    bannerList,
    activeBanner,
    currentBanner,
    totalPages,
    totalElements,
    loading,
    error,
    fetchBanners,
    fetchActiveBanner,
    fetchBannerById,
    createBanner,
    updateBanner,
    deleteBanner,
    uploadBannerImage
  }
})
