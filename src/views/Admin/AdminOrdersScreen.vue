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
      <ProgressSpinner />
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
                  :value="order.status"
                  @change="updateStatus(order.id, ($event.target as HTMLSelectElement).value)"
                  :disabled="order.status === 'CANCELLED' || order.status === 'DELIVERED'"
                  :class="getStatusClass(order.status)"
                  class="px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-primary disabled:opacity-50 cursor-pointer"
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import { OrderStatus } from '@/api/orderApi'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const orderStore = useOrderStore()
const toast = useToast()

const orders = ref(orderStore.orders)
const loading = ref(false)
const error = ref<string | null>(null)
const selectedStatus = ref<OrderStatus | null>(null)
const currentPage = ref(0)
const totalPages = ref(0)

const orderStatuses = [
  { value: 'PLACED' as OrderStatus, label: 'Đã đặt hàng' },
  { value: 'PENDING' as OrderStatus, label: 'Chờ xác nhận' },
  { value: 'CONFIRMED' as OrderStatus, label: 'Đã xác nhận' },
  { value: 'PROCESSING' as OrderStatus, label: 'Đang xử lý' },
  { value: 'SHIPPING' as OrderStatus, label: 'Đang giao hàng' },
  { value: 'DELIVERED' as OrderStatus, label: 'Đã giao hàng' },
  { value: 'CANCELLED' as OrderStatus, label: 'Đã hủy' }
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('vi-VN')
}

const getStatusClass = (status: OrderStatus) => {
  const classes: Record<OrderStatus, string> = {
    PLACED: 'bg-blue-100 text-blue-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-purple-100 text-purple-800',
    PROCESSING: 'bg-indigo-100 text-indigo-800',
    SHIPPING: 'bg-cyan-100 text-cyan-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const filterByStatus = async (status: OrderStatus | null) => {
  selectedStatus.value = status
  currentPage.value = 0
  await loadOrders()
}

const loadOrders = async () => {
  loading.value = true
  error.value = null
  try {
    if (selectedStatus.value) {
      await orderStore.fetchOrdersByStatus(selectedStatus.value, currentPage.value, 10)
    } else {
      await orderStore.fetchAllOrders(currentPage.value, 10)
    }
    orders.value = orderStore.orders
    totalPages.value = orderStore.totalPages
  } catch (err: any) {
    error.value = err.message || 'Failed to load orders'
  } finally {
    loading.value = false
  }
}

const updateStatus = async (orderId: string, newStatus: string) => {
  try {
    await orderStore.updateOrderStatus(orderId, { status: newStatus as OrderStatus })
    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Cập nhật trạng thái đơn hàng thành công',
      life: 3000
    })
    await loadOrders()
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: err.message || 'Không thể cập nhật trạng thái',
      life: 3000
    })
  }
}

const viewOrderDetails = (orderId: string) => {
  router.push(`/admin/orders/${orderId}`)
}

const changePage = async (page: number) => {
  currentPage.value = page
  await loadOrders()
}

onMounted(async () => {
  await loadOrders()
})
</script>

<style scoped>
.admin-orders-container {
  min-height: calc(100vh - 200px);
}
</style>
