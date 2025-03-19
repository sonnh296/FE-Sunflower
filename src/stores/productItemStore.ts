import { defineStore } from 'pinia'
import {
  createProductItemApi,
  getProductItemByIdApi,
  getProductItemsApi,
  type ProductItemCreateRequest,
  type ProductItemSearchRequest,
  type ProductItemUpdateRequest,
  updateProductItemApi,
  deleteProductItemApi
} from '@/api/productItemApi'
import type { ProductItem } from '@/types/Product'

interface State {
  search: ProductItemSearchRequest
  productItems: ProductItem[]
  productItem: ProductItem | undefined
  loading: boolean
  loadingDetail: boolean
  creating: boolean
  updating: boolean
}

export const useProductItemStore = defineStore('productItemStore', {
  state: (): State => {
    return {
      search: {
        productId: undefined
      },
      productItems: [],
      productItem: undefined,
      loadingDetail: false,
      loading: false,
      creating: false,
      updating: false
    }
  },
  actions: {
    async getProductItems(productId: string) {
      if (this.loading) return
      this.loading = true
      this.search.productId = productId
      const { data } = await getProductItemsApi(this.search)
      this.productItems = data.result.content ?? []
      this.loading = false
      return data
    },

    async createProductItem(productItem: ProductItemCreateRequest) {
      this.creating = true
      const { data } = await createProductItemApi(productItem)
      this.creating = false
      return data
    },

    async updateProductItem(productItem: ProductItemUpdateRequest) {
      this.updating = true
      const { data } = await updateProductItemApi(productItem)
      this.updating = false
      return data
    },

    async getProductItemById(id: string) {
      if (this.loadingDetail) return
      this.loadingDetail = true
      this.productItem = undefined
      const { data } = await getProductItemByIdApi(id)
      this.productItem = data.result
      this.loadingDetail = false
      return data
    },

    async deleteProductItem(id: string) {
      const { data } = await deleteProductItemApi(id)
      return data
    }
  }
})
