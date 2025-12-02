<template>
  <div class="checkout-container max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Thanh toán đơn hàng</h1>

    <div v-if="loading" class="text-center py-8">
      <p>Đang xử lý...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else>
      <!-- Order Summary -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
        <div v-if="cartItems.length === 0" class="text-gray-500">
          Giỏ hàng trống
        </div>
        <div v-else>
          <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-4 mb-4 pb-4 border-b">
            <img :src="item.product.thumbnailUrl" :alt="item.product.name" class="w-20 h-20 object-cover rounded" />
            <div class="flex-1">
              <h3 class="font-medium">{{ item.product.name }}</h3>
              <p class="text-sm text-gray-600">Size: {{ item.product.size }}</p>
              <p class="text-sm text-gray-600">Số lượng: {{ item.quantity }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold">{{ formatPrice(item.product.price * item.quantity) }}</p>
            </div>
          </div>
          <div class="flex justify-between items-center pt-4 border-t-2 border-gray-300">
            <span class="text-xl font-bold">Tổng cộng:</span>
            <span class="text-2xl font-bold text-primary">{{ formatPrice(totalPrice) }}</span>
          </div>
        </div>
      </div>

      <!-- Delivery Information Form -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="deliveryAddress">
              Địa chỉ giao hàng *
            </label>
            <textarea
              id="deliveryAddress"
              v-model="formData.deliveryAddress"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
              placeholder="Nhập địa chỉ giao hàng"
              required
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" for="phoneNumber">
              Số điện thoại *
            </label>
            <input
              id="phoneNumber"
              v-model="formData.phoneNumber"
              type="tel"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2" for="notes">
              Ghi chú (tùy chọn)
            </label>
            <textarea
              id="notes"
              v-model="formData.notes"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
              placeholder="Ghi chú cho đơn hàng"
            ></textarea>
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p class="text-sm text-yellow-800">
              <strong>Lưu ý:</strong> Đơn hàng sẽ được thanh toán khi nhận hàng (COD).
            </p>
          </div>

          <div class="flex gap-4">
            <button
              type="button"
              @click="$router.push('/cart')"
              class="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Quay lại giỏ hàng
            </button>
            <button
              type="submit"
              :disabled="submitting || cartItems.length === 0"
              class="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-dark transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ submitting ? 'Đang xử lý...' : 'Đặt hàng' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
import type { OrderCreationRequest } from '@/api/orderApi'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const loading = ref(false)
const error = ref<string | null>(null)
const submitting = ref(false)

const formData = ref<OrderCreationRequest>({
  deliveryAddress: '',
  phoneNumber: '',
  notes: ''
})

const cartItems = computed(() => cartStore.cartItems)
const totalPrice = computed(() => cartStore.totalPrice)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const handleSubmit = async () => {
  if (cartItems.value.length === 0) {
    error.value = 'Giỏ hàng trống'
    return
  }

  submitting.value = true
  error.value = null

  try {
    const order = await orderStore.createOrder(formData.value)
    // Clear cart after successful order
    await cartStore.fetchCart()
    // Navigate to order success page
    router.push(`/orders/${order.id}`)
  } catch (err: any) {
    error.value = err.message || 'Đặt hàng thất bại. Vui lòng thử lại.'
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await cartStore.fetchCart()
  } catch (err: any) {
    error.value = 'Không thể tải giỏ hàng'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.checkout-container {
  min-height: calc(100vh - 200px);
}
</style>
