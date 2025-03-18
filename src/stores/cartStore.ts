import { defineStore } from 'pinia'
import { LIMIT_PER_PAGE } from '@/constants/tableValues'
import {
  crateProductApi,
  getProductByIdApi,
  getProductsApi,
  type ProductCreateRequest,
  type ProductSearchRequest
} from '@/api/productApi'
import type { Product } from '@/types/Product'

interface State {
  search: ProductSearchRequest
  products: Product[]
  product: Product | undefined
  loading: boolean
  loadingDetail: boolean
  creating: boolean
  total: number
}

export const useProductStore = defineStore('productStore', {
  state: (): State => {
    return {
      search: {
        pageSize: LIMIT_PER_PAGE,
        pageNumber: 0
      },
      products: [],
      product: undefined,
      loadingDetail: false,
      loading: false,
      creating: false,
      total: 0
    }
  },
  actions: {
    async getProducts() {
      if (this.loading) return
      this.loading = true
      const { data } = await getProductsApi(this.search)
      this.products = data.result.content ?? []
      this.loading = false
      this.total = data.result?.totalElements ?? 0
      return data
    },

    async createProduct(product: ProductCreateRequest) {
      this.creating = true
      const { data } = await crateProductApi(product)
      this.creating = false
      return data
    },

    async getProductById(id: string) {
      if (this.loadingDetail) return
      this.loadingDetail = true
      this.product = undefined
      const { data } = await getProductByIdApi(id)
      this.product = data.result
      this.loadingDetail = false
      return data
    },

    async changePageBlogPost(page: number) {
      this.search.pageNumber = page
      await this.getProducts()
    }

    // async deletePost(id: number) {
    //   const { data } = await deletePostApi(id)
    //   return data
    // }
  }
})
