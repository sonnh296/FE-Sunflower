<template>
  <div class="admin-orders-container max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>

    <!-- Filter by status -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div class="flex gap-2 flex-wrap">
        <button
          @click="filterByStatus(null)"
          :class="selectedStatus === null ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'"
          class="px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
        >
          Tất cả
        </button>
        <button
          v-for="status in orderStatuses"
          :key="status.value"
          @click="filterByStatus(status.value)"
          :class="selectedStatus === status.value ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'"
          class="px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
        >
          {{ status.label }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p>Đang tải...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else-if="orders.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
      <p class="text-gray-500">Không có đơn hàng nào</p>
    </div>

    <div v-else>
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in orders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ order.id.substring(0, 8) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>{{ order.user.fullName || order.user.username }}</div>
                <div class="text-xs text-gray-400">{{ order.phoneNumber }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                {{ formatPrice(order.totalPrice) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  v-model="order.status"
                  @change="updateStatus(order.id, order.status)"
                  :disabled="order.status === 'CANCELLED' || order.status === 'DELIVERED'"
                  :class="getStatusClass(order.status)"
                  class="px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-primary disabled:opacity-50"
                >
                  <option v-for="status in orderStatuses" :key="status.value" :value="status.value">
                    {{ status.label }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(order.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewOrderDetails(order.id)"
                  class="text-primary hover:text-primary-dark"
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
import { OrderStatus } from '@/api/orderApi'

const router = useRouter()
const orderStore = useOrderStore()

const currentPage = ref(0)
const pageSize = ref(20)
const selectedStatus = ref<OrderStatus | null>(null)

const orders = computed(() => orderStore.orders)
const totalPages = computed(() => orderStore.totalPages)
const loading = computed(() => orderStore.loading)
const error = computed(() => orderStore.error)

const orderStatuses = [
  { value: OrderStatus.PENDING, label: 'Chờ xác nhận' },
  { value: OrderStatus.CONFIRMED, label: 'Đã xác nhận' },
  { value: OrderStatus.PROCESSING, label: 'Đang xử lý' },
  { value: OrderStatus.SHIPPING, label: 'Đang giao hàng' },
  { value: OrderStatus.DELIVERED, label: 'Đã giao hàng' },
  { value: OrderStatus.CANCELLED, label: 'Đã hủy' }
]

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

const filterByStatus = async (status: OrderStatus | null) => {
  selectedStatus.value = status
  currentPage.value = 0
  await fetchOrders()
}

const fetchOrders = async () => {
  if (selectedStatus.value) {
    await orderStore.fetchOrdersByStatus(selectedStatus.value, currentPage.value, pageSize.value)
  } else {
    await orderStore.fetchAllOrders(currentPage.value, pageSize.value)
  }
}

const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
  try {
    await orderStore.updateOrderStatus(orderId, { status: newStatus })
  } catch (err) {
    alert('Không thể cập nhật trạng thái đơn hàng')
    await fetchOrders()
  }
}

const viewOrderDetails = (orderId: string) => {
  router.push(`/admin/orders/${orderId}`)
}

const changePage = async (page: number) => {
  currentPage.value = page
  await fetchOrders()
}

onMounted(async () => {
  await fetchOrders()
})
</script>

<style scoped>
.admin-orders-container {
  min-height: calc(100vh - 200px);
}
</style>

