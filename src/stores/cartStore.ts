import { defineStore } from 'pinia'
import {
  addToCartApi,
  clearCartApi,
  getCartApi,
  removeFromCartApi,
  updateCartItemApi,
  type CartAddRequest,
  type CartItem,
  type CartUpdateRequest
} from '@/api/cartApi'

interface State {
  cartItems: CartItem[]
  loading: boolean
  totalPrice: number
  totalItems: number
}

export const useCartStore = defineStore('cartStore', {
  state: (): State => {
    return {
      cartItems: [],
      loading: false,
      totalPrice: 0,
      totalItems: 0
    }
  },
  actions: {
    async getCart() {
      if (this.loading) return
      this.loading = true
      const { data } = await getCartApi()
      this.cartItems = data.result.content ?? []
      this.totalPrice = data.result.content.reduce(
        (acc, item: CartItem) => acc + Number(item.productItem.price ?? 0) * item.quantity,
        0
      )
      this.totalItems = data.result.totalItems
      this.loading = false
      return data
    },

    async addToCart(request: CartAddRequest) {
      this.loading = true
      const { data } = await addToCartApi(request)
      this.cartItems = data.result.content ?? []
      this.totalPrice = data.result.totalPrice
      this.totalItems = data.result.totalItems
      this.loading = false
      return data
    },

    async updateCartItem(request: CartUpdateRequest) {
      this.loading = true
      const { data } = await updateCartItemApi(request)
      this.cartItems = data.result.content ?? []
      this.totalPrice = data.result.totalPrice
      this.totalItems = data.result.totalItems
      this.loading = false
      return data
    },

    async removeFromCart(cartItemId: string) {
      this.loading = true
      const { data } = await removeFromCartApi(cartItemId)
      this.cartItems = data.result.content ?? []
      this.totalPrice = data.result.totalPrice
      this.totalItems = data.result.totalItems
      this.loading = false
      return data
    },

    async clearCart() {
      this.loading = true
      const { data } = await clearCartApi()
      this.cartItems = []
      this.totalPrice = 0
      this.totalItems = 0
      this.loading = false
      return data
    }
  }
})
