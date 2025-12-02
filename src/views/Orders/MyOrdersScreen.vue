<template>
  <div class="orders-container max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Đơn hàng của tôi</h1>

    <div v-if="loading" class="text-center py-8">
      <p>Đang tải...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else-if="orders.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
      <p class="text-gray-500 mb-4">Bạn chưa có đơn hàng nào</p>
      <button @click="$router.push('/products')" class="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition">
        Mua sắm ngay
      </button>
    </div>

    <div v-else>
      <div v-for="order in orders" :key="order.id" class="bg-white rounded-lg shadow-md p-6 mb-4">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-semibold">Đơn hàng #{{ order.id.substring(0, 8) }}</h3>
            <p class="text-sm text-gray-600">{{ formatDate(order.createdAt) }}</p>
          </div>
          <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-sm font-medium">
            {{ getStatusText(order.status) }}
          </span>
        </div>

        <div class="border-t pt-4">
          <div v-for="item in order.orderItems" :key="item.id" class="flex items-center gap-4 mb-3">
            <img :src="item.productItem.imageUrl" :alt="item.productItem.product.name" class="w-16 h-16 object-cover rounded" />
            <div class="flex-1">
              <h4 class="font-medium">{{ item.productItem.product.name }}</h4>
              <p class="text-sm text-gray-600">Màu: {{ item.productItem.color }} | Size: {{ item.productItem.size }}</p>
              <p class="text-sm text-gray-600">Số lượng: {{ item.quantity }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold">{{ formatPrice(item.priceAtOrder * item.quantity) }}</p>
            </div>
          </div>
        </div>

        <div class="border-t pt-4 flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-600">Địa chỉ: {{ order.deliveryAddress }}</p>
            <p class="text-sm text-gray-600">SĐT: {{ order.phoneNumber }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">Tổng cộng:</p>
            <p class="text-xl font-bold text-primary">{{ formatPrice(order.totalPrice) }}</p>
          </div>
        </div>

        <div class="mt-4 flex gap-2 justify-end">
          <button
            @click="viewOrderDetails(order.id)"
            class="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            Chi tiết
          </button>
          <button
            v-if="order.status === 'PENDING' || order.status === 'CONFIRMED'"
            @click="handleCancelOrder(order.id)"
            class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Hủy đơn
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-6">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page - 1)"
          :class="currentPage === page - 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'"
          class="px-4 py-2 rounded hover:bg-primary hover:text-white transition"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

const router = useRouter()
const orderStore = useOrderStore()

const currentPage = ref(0)
const pageSize = ref(10)

const orders = computed(() => orderStore.orders)
const totalPages = computed(() => orderStore.totalPages)
const loading = computed(() => orderStore.loading)
const error = computed(() => orderStore.error)

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

const viewOrderDetails = (orderId: string) => {
  router.push(`/orders/${orderId}`)
}

const handleCancelOrder = async (orderId: string) => {
  if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
    try {
      await orderStore.cancelOrder(orderId)
      await orderStore.fetchMyOrders(currentPage.value, pageSize.value)
    } catch (err) {
      alert('Không thể hủy đơn hàng')
    }
  }
}

const changePage = async (page: number) => {
  currentPage.value = page
  await orderStore.fetchMyOrders(page, pageSize.value)
}

onMounted(async () => {
  await orderStore.fetchMyOrders(currentPage.value, pageSize.value)
})
</script>

<style scoped>
.orders-container {
  min-height: calc(100vh - 200px);
}
</style>
