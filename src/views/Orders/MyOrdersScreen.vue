<template>
  <div class="my-orders-container max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Đơn hàng của tôi</h1>

    <div v-if="orderStore.loading" class="text-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else-if="orderStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ orderStore.error }}
    </div>

    <div v-else-if="orderStore.orders.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
      <i class="pi pi-shopping-bag text-6xl text-gray-400 mb-4"></i>
      <p class="text-gray-500 mb-4">Bạn chưa có đơn hàng nào</p>
      <Button
        label="Mua sắm ngay"
        icon="pi pi-shopping-cart"
        @click="$router.push('/user/home')"
        class="!bg-primary !border-0"
      />
    </div>

    <div v-else>
      <div class="space-y-4">
        <div
          v-for="order in orderStore.orders"
          :key="order.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold">Đơn hàng #{{ order.id.substring(0, 8) }}</h3>
              <p class="text-sm text-gray-600">{{ formatDate(order.createdAt) }}</p>
            </div>
            <span :class="getStatusClass(order.status)" class="px-4 py-2 rounded-full text-sm font-medium">
              {{ getStatusLabel(order.status) }}
            </span>
          </div>

          <div class="border-t pt-4">
            <div class="mb-4">
              <p class="text-sm text-gray-600">Địa chỉ giao hàng:</p>
              <p class="font-medium">{{ order.deliveryAddress }}</p>
              <p class="text-sm text-gray-600">Số điện thoại: {{ order.phoneNumber }}</p>
            </div>

            <div class="mb-4">
              <p class="text-sm text-gray-600 mb-2">Sản phẩm:</p>
              <div class="space-y-2">
                <div v-for="item in order.orderItems" :key="item.id" class="flex items-center gap-3">
                  <img
                    :src="item.thumbnailUrl || '/noavatar.png'"
                    :alt="item.productName"
                    class="w-12 h-12 object-cover rounded"
                  />
                  <div class="flex-1">
                    <p class="font-medium text-sm">{{ item.productName }}</p>
                    <p class="text-xs text-gray-600" v-if="item.size">Size: {{ item.size }}</p>
                    <p class="text-xs text-gray-600">Số lượng: {{ item.quantity }}</p>
                  </div>
                  <p class="font-semibold">{{ formatPrice(item.priceAtOrder * item.quantity) }}</p>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t">
              <span class="text-lg font-bold">Tổng cộng:</span>
              <span class="text-2xl font-bold text-primary">{{ formatPrice(order.totalPrice) }}</span>
            </div>

            <div class="flex gap-2 mt-4">
              <Button
                label="Xem chi tiết"
                icon="pi pi-eye"
                @click="viewOrderDetail(order.id)"
                class="!bg-primary !border-0"
              />
              <Button
                v-if="order.status === 'PLACED' || order.status === 'PENDING'"
                label="Hủy đơn"
                icon="pi pi-times"
                severity="danger"
                outlined
                @click="confirmCancelOrder(order.id)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="orderStore.totalPages > 1" class="flex justify-center gap-2 mt-6">
        <Button
          v-for="page in orderStore.totalPages"
          :key="page"
          :label="String(page)"
          @click="changePage(page - 1)"
          :class="currentPage === page - 1 ? '!bg-primary !text-white' : '!bg-gray-200 !text-gray-700'"
          class="!border-0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import { OrderStatus } from '@/api/orderApi'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const orderStore = useOrderStore()
const confirm = useConfirm()
const toast = useToast()

const currentPage = ref(0)
const pageSize = ref(10)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('vi-VN')
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const getStatusLabel = (status: OrderStatus) => {
  const labels: Record<OrderStatus, string> = {
    PLACED: 'Đã đặt hàng',
    PENDING: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    PROCESSING: 'Đang xử lý',
    SHIPPING: 'Đang giao hàng',
    DELIVERED: 'Đã giao hàng',
    CANCELLED: 'Đã hủy'
  }
  return labels[status] || status
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

const viewOrderDetail = (orderId: string) => {
  router.push(`/user/orders/${orderId}`)
}

const confirmCancelOrder = (orderId: string) => {
  confirm.require({
    message: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
    header: 'Xác nhận hủy đơn',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await orderStore.cancelOrder(orderId)
        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đơn hàng đã được hủy',
          life: 3000
        })
        await orderStore.fetchMyOrders(currentPage.value, pageSize.value)
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể hủy đơn hàng',
          life: 3000
        })
      }
    }
  })
}

const changePage = async (page: number) => {
  currentPage.value = page
  await orderStore.fetchMyOrders(page, pageSize.value)
}

onMounted(async () => {
  await orderStore.fetchMyOrders(currentPage.value, pageSize.value)
})
</script>

