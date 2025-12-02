import { defineStore } from 'pinia'
import type { ProductItem } from '@/types/Product'

interface State {
  productItems: ProductItem[]
  loading: boolean
  error: string | null
}

export const useProductItemStore = defineStore('productItemStore', {
  state: (): State => {
    return {
      productItems: [],
      loading: false,
      error: null
    }
  },
  actions: {
    async getProductItems(productId: string) {
      this.loading = true
      this.error = null

      try {
        // For now, return empty array since the API endpoint might not exist yet
        // This can be updated when the backend API for product items is implemented
        this.productItems = []

        // Uncomment and update this when you have the actual API endpoint:
        // const { data } = await getProductItemsApi(productId)
        // this.productItems = data.result || []

        this.loading = false
      } catch (error) {
        console.error('Error fetching product items:', error)
        this.error = 'Failed to fetch product items'
        this.productItems = []
        this.loading = false
      }
    },

    clearProductItems() {
      this.productItems = []
      this.error = null
    }
  }
})
