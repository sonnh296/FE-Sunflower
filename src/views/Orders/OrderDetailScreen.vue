<template>
  <div class="order-detail-container max-w-4xl mx-auto p-6">
    <div v-if="loading" class="text-center py-8">
      <p>Đang tải...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else-if="order">
      <!-- Header -->
      <div class="mb-6">
        <button @click="$router.back()" class="text-primary hover:text-primary-dark mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Quay lại
        </button>
        <h1 class="text-3xl font-bold">Chi tiết đơn hàng #{{ order.id.substring(0, 8) }}</h1>
      </div>

      <!-- Order Info -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 class="text-lg font-semibold mb-3">Thông tin đơn hàng</h2>
            <div class="space-y-2">
              <p><span class="font-medium">Mã đơn hàng:</span> #{{ order.id }}</p>
              <p><span class="font-medium">Ngày tạo:</span> {{ formatDate(order.createdAt) }}</p>
              <p><span class="font-medium">Cập nhật lần cuối:</span> {{ formatDate(order.updatedAt) }}</p>
              <p>
                <span class="font-medium">Trạng thái:</span>
                <span :class="getStatusClass(order.status)" class="ml-2 px-3 py-1 rounded-full text-sm font-medium">
                  {{ getStatusText(order.status) }}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-semibold mb-3">Thông tin khách hàng</h2>
            <div class="space-y-2">
              <p><span class="font-medium">Tên:</span> {{ order.user.fullName || order.user.username }}</p>
              <p><span class="font-medium">Email:</span> {{ order.user.email }}</p>
              <p><span class="font-medium">Số điện thoại:</span> {{ order.phoneNumber }}</p>
              <p><span class="font-medium">Địa chỉ giao hàng:</span> {{ order.deliveryAddress }}</p>
              <p v-if="order.notes"><span class="font-medium">Ghi chú:</span> {{ order.notes }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Sản phẩm</h2>
        <div class="space-y-4">
          <div v-for="item in order.orderItems" :key="item.id" class="flex items-center gap-4 pb-4 border-b last:border-0">
            <img :src="item.productItem.imageUrl" :alt="item.productItem.product.name" class="w-24 h-24 object-cover rounded" />
            <div class="flex-1">
              <h3 class="font-medium text-lg">{{ item.productItem.product.name }}</h3>
              <p class="text-sm text-gray-600">{{ item.productItem.product.description }}</p>
              <p class="text-sm text-gray-600">Màu: {{ item.productItem.color }} | Size: {{ item.productItem.size }}</p>
              <p class="text-sm text-gray-600">Số lượng: {{ item.quantity }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">{{ formatPrice(item.priceAtOrder) }} x {{ item.quantity }}</p>
              <p class="font-bold text-lg">{{ formatPrice(item.priceAtOrder * item.quantity) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Total -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex justify-between items-center text-xl">
          <span class="font-bold">Tổng cộng:</span>
          <span class="font-bold text-2xl text-primary">{{ formatPrice(order.totalPrice) }}</span>
        </div>
        <p class="text-sm text-gray-600 mt-2">Thanh toán khi nhận hàng (COD)</p>
      </div>

      <!-- Actions -->
      <div v-if="isAdmin && order.status !== 'CANCELLED' && order.status !== 'DELIVERED'" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold mb-4">Cập nhật trạng thái</h2>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="status in availableStatuses"
            :key="status.value"
            @click="handleUpdateStatus(status.value)"
            class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            {{ status.label }}
          </button>
        </div>
      </div>

      <div v-else-if="!isAdmin && (order.status === 'PENDING' || order.status === 'CONFIRMED')" class="bg-white rounded-lg shadow-md p-6">
        <button
          @click="handleCancelOrder"
          class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition w-full md:w-auto"
        >
          Hủy đơn hàng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import { useAuthStore } from '@/stores/authStore'
import { OrderStatus } from '@/api/orderApi'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const orderId = route.params.id as string
const order = computed(() => orderStore.currentOrder)
const loading = computed(() => orderStore.loading)
const error = computed(() => orderStore.error)

const isAdmin = computed(() => {
  return authStore.user?.user_roles?.some(role => role.role.roleName === 'ADMIN') || false
})

const orderStatuses = [
  { value: OrderStatus.PENDING, label: 'Chờ xác nhận' },
  { value: OrderStatus.CONFIRMED, label: 'Xác nhận' },
  { value: OrderStatus.PROCESSING, label: 'Đang xử lý' },
  { value: OrderStatus.SHIPPING, label: 'Giao hàng' },
  { value: OrderStatus.DELIVERED, label: 'Đã giao' },
  { value: OrderStatus.CANCELLED, label: 'Hủy' }
]

const availableStatuses = computed(() => {
  if (!order.value) return []

  const statusFlow: Record<string, OrderStatus[]> = {
    PENDING: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    CONFIRMED: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    PROCESSING: [OrderStatus.SHIPPING],
    SHIPPING: [OrderStatus.DELIVERED]
  }

  const nextStatuses = statusFlow[order.value.status] || []
  return orderStatuses.filter(s => nextStatuses.includes(s.value))
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('vi-VN')
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    PENDING: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    PROCESSING: 'Đang xử lý',
    SHIPPING: 'Đang giao hàng',
    DELIVERED: 'Đã giao hàng',
    CANCELLED: 'Đã hủy'
  }
  return statusMap[status] || status
}

const getStatusClass = (status: string) => {
  const classMap: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    PROCESSING: 'bg-purple-100 text-purple-800',
    SHIPPING: 'bg-indigo-100 text-indigo-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800'
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const handleUpdateStatus = async (newStatus: OrderStatus) => {
  if (confirm(`Bạn có chắc chắn muốn cập nhật trạng thái sang "${getStatusText(newStatus)}"?`)) {
    try {
      await orderStore.updateOrderStatus(orderId, { status: newStatus })
      await orderStore.fetchOrderById(orderId)
    } catch (err) {
      alert('Không thể cập nhật trạng thái')
    }
  }
}

const handleCancelOrder = async () => {
  if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
    try {
      await orderStore.cancelOrder(orderId)
      await orderStore.fetchOrderById(orderId)
    } catch (err) {
      alert('Không thể hủy đơn hàng')
    }
  }
}

onMounted(async () => {
  await orderStore.fetchOrderById(orderId)
})
</script>

<style scoped>
.order-detail-container {
  min-height: calc(100vh - 200px);
}
</style>
