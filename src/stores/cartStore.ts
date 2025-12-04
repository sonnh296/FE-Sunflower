import { defineStore } from 'pinia'
import {
  addToCartApi,
  getCartItemsApi,
  removeFromCartApi,
  updateCartItemQuantityApi,
  type CartAddRequest,
  type CartItemResponse,
  type CartUpdateRequest
} from '@/api/cartApi'
import { useToast } from 'primevue/usetoast'

interface State {
  cartItems: CartItemResponse[]
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
      try {
        const { data } = await getCartItemsApi()
        this.cartItems = data.result.content ?? []
        this.totalPrice = this.cartItems.reduce(
          (acc, item) => acc + Number(item.price ?? 0) * item.quantity,
          0
        )
        this.totalItems = this.cartItems.length
      } catch (error) {
        console.error('Failed to fetch cart:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchCart() {
      return this.getCart()
    },

    async addToCart(request: CartAddRequest) {
      const toast = useToast()
      this.loading = true
      try {
        await addToCartApi(request)
        await this.getCart() // Refresh cart
        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đã thêm sản phẩm vào giỏ hàng',
          life: 3000
        })
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: error.response?.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng',
          life: 3000
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCartItem(cartItemId: string, quantity: number) {
      const toast = useToast()
      this.loading = true
      try {
        await updateCartItemQuantityApi(cartItemId, { quantity })
        await this.getCart() // Refresh cart
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: error.response?.data?.message || 'Không thể cập nhật giỏ hàng',
          life: 3000
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async removeFromCart(cartItemId: string) {
      const toast = useToast()
      this.loading = true
      try {
        await removeFromCartApi(cartItemId)
        await this.getCart() // Refresh cart
        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đã xóa sản phẩm khỏi giỏ hàng',
          life: 3000
        })
      } catch (error: any) {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: error.response?.data?.message || 'Không thể xóa sản phẩm',
          life: 3000
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    clearCartLocally() {
      this.cartItems = []
      this.totalPrice = 0
      this.totalItems = 0
    }
  }
})
