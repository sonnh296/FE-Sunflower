<template>
  <div class="order-detail-container max-w-5xl mx-auto p-6">
    <div v-if="orderStore.loading" class="text-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else-if="orderStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ orderStore.error }}
    </div>

    <div v-else-if="order" class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold mb-2">Chi tiết đơn hàng</h1>
          <p class="text-gray-600">Mã đơn hàng: #{{ order.id.substring(0, 8) }}</p>
          <p class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</p>
        </div>
        <span :class="getStatusClass(order.status)" class="px-4 py-2 rounded-full text-sm font-medium">
          {{ getStatusLabel(order.status) }}
        </span>
      </div>

      <!-- Customer Information -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-600">Địa chỉ giao hàng</p>
            <p class="font-medium">{{ order.deliveryAddress }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Số điện thoại</p>
            <p class="font-medium">{{ order.phoneNumber }}</p>
          </div>
          <div v-if="order.notes" class="md:col-span-2">
            <p class="text-sm text-gray-600">Ghi chú</p>
            <p class="font-medium">{{ order.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Sản phẩm đã đặt</h2>

        <!-- Show message if no items -->
        <div v-if="!order.orderItems || order.orderItems.length === 0" class="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <i class="pi pi-exclamation-triangle text-4xl text-yellow-600 mb-3"></i>
          <p class="text-yellow-800 font-medium">Không thể tải thông tin sản phẩm</p>
          <p class="text-sm text-yellow-600 mt-2">Vui lòng thử tải lại trang hoặc liên hệ hỗ trợ</p>
        </div>

        <!-- Show items if available -->
        <div v-else class="space-y-4">
          <div
            v-for="item in order.orderItems"
            :key="item.id"
            class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <img
              :src="item.thumbnailUrl || '/noavatar.png'"
              :alt="item.productName"
              class="w-28 h-28 object-cover rounded-md border-2 border-gray-300"
              @error="(e) => (e.target as HTMLImageElement).src = '/noavatar.png'"
            />
            <div class="flex-1">
              <h3 class="font-bold text-lg mb-2">{{ item.productName || 'Sản phẩm không xác định' }}</h3>
              <div class="space-y-1">
                <p class="text-sm text-gray-600" v-if="item.size">
                  <span class="font-semibold">Size:</span> {{ item.size }}
                </p>
                <p class="text-sm text-gray-600">
                  <span class="font-semibold">Số lượng:</span> {{ item.quantity }}
                </p>
                <p class="text-sm text-gray-600">
                  <span class="font-semibold">Đơn giá:</span> {{ formatPrice(item.priceAtOrder) }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500 mb-1">Thành tiền</p>
              <p class="text-2xl font-bold text-primary">{{ formatPrice(item.priceAtOrder * item.quantity) }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t">
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold">Tổng cộng:</span>
            <span class="text-3xl font-bold text-primary">{{ formatPrice(order.totalPrice) }}</span>
          </div>
        </div>
      </div>

      <!-- Order Timeline -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Trạng thái đơn hàng</h2>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div :class="isStatusReached('PLACED') ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'"
                 class="w-8 h-8 rounded-full flex items-center justify-center">
              <i class="pi pi-check text-sm"></i>
            </div>
            <div>
              <p class="font-medium">Đã đặt hàng</p>
              <p class="text-xs text-gray-500">Đơn hàng đã được tạo</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div :class="isStatusReached('CONFIRMED') ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'"
                 class="w-8 h-8 rounded-full flex items-center justify-center">
              <i class="pi pi-check text-sm"></i>
            </div>
            <div>
              <p class="font-medium">Đã xác nhận</p>
              <p class="text-xs text-gray-500">Shop đã xác nhận đơn hàng</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div :class="isStatusReached('PROCESSING') ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'"
                 class="w-8 h-8 rounded-full flex items-center justify-center">
              <i class="pi pi-check text-sm"></i>
            </div>
            <div>
              <p class="font-medium">Đang xử lý</p>
              <p class="text-xs text-gray-500">Đơn hàng đang được chuẩn bị</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div :class="isStatusReached('SHIPPING') ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'"
                 class="w-8 h-8 rounded-full flex items-center justify-center">
              <i class="pi pi-check text-sm"></i>
            </div>
            <div>
              <p class="font-medium">Đang giao hàng</p>
              <p class="text-xs text-gray-500">Đơn hàng đang trên đường giao đến bạn</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div :class="isStatusReached('DELIVERED') ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'"
                 class="w-8 h-8 rounded-full flex items-center justify-center">
              <i class="pi pi-check text-sm"></i>
            </div>
            <div>
              <p class="font-medium">Đã giao hàng</p>
              <p class="text-xs text-gray-500">Đơn hàng đã được giao thành công</p>
            </div>
          </div>

          <div v-if="order.status === 'CANCELLED'" class="flex items-center gap-3">
            <div class="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
              <i class="pi pi-times text-sm"></i>
            </div>
            <div>
              <p class="font-medium">Đã hủy</p>
              <p class="text-xs text-gray-500">Đơn hàng đã bị hủy</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <Button
          label="Quay lại"
          icon="pi pi-arrow-left"
          @click="$router.back()"
          class="!bg-gray-200 !text-gray-700 !border-0"
        />
        <Button
          v-if="order.status === 'PLACED' || order.status === 'PENDING'"
          label="Hủy đơn hàng"
          icon="pi pi-times"
          severity="danger"
          @click="confirmCancelOrder"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import { OrderStatus } from '@/api/orderApi'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const orderStore = useOrderStore()
const confirm = useConfirm()
const toast = useToast()

const order = computed(() => orderStore.currentOrder)

const statusOrder = ['PLACED', 'CONFIRMED', 'PROCESSING', 'SHIPPING', 'DELIVERED']

const isStatusReached = (status: string) => {
  if (!order.value) return false
  if (order.value.status === 'CANCELLED') return false

  const currentIndex = statusOrder.indexOf(order.value.status)
  const checkIndex = statusOrder.indexOf(status)
  return currentIndex >= checkIndex
}

const formatDate = (dateString: string | number[]) => {
  try {
    // Handle array format from backend [2025, 12, 6, 19, 13, 17, 710043000]
    if (Array.isArray(dateString)) {
      const [year, month, day, hour, minute, second] = dateString
      const date = new Date(year, month - 1, day, hour, minute, second)
      return date.toLocaleString('vi-VN')
    }
    // Handle ISO string format
    return new Date(dateString).toLocaleString('vi-VN')
  } catch (error) {
    console.error('Error formatting date:', dateString, error)
    return 'Ngày không hợp lệ'
  }
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

const confirmCancelOrder = () => {
  confirm.require({
    message: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
    header: 'Xác nhận hủy đơn',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await orderStore.cancelOrder(order.value!.id)
        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đơn hàng đã được hủy',
          life: 3000
        })
        // Refresh order details
        await orderStore.fetchOrderById(order.value!.id)
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

onMounted(async () => {
  const orderId = route.params.id as string
  console.log('Loading order details for orderId:', orderId)
  await orderStore.fetchOrderById(orderId)
  console.log('Order loaded:', order.value)
  console.log('Order items:', order.value?.orderItems)
  console.log('Number of items:', order.value?.orderItems?.length)
})
</script>
