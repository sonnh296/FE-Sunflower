import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createOrderApi,
  getMyOrdersApi,
  getAllOrdersApi,
  getOrderByIdApi,
  updateOrderStatusApi,
  cancelOrderApi,
  getOrdersByStatusApi,
  type OrderCreationRequest,
  type OrderResponse,
  type OrderStatus,
  type OrderStatusUpdateRequest
} from '@/api/orderApi'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<OrderResponse[]>([])
  const currentOrder = ref<OrderResponse | null>(null)
  const totalPages = ref(0)
  const totalElements = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Helper function to check if response is successful
  const isSuccessResponse = (code: any): boolean => {
    return code === 1000 || code === '1000' || String(code) === '1000'
  }

  const createOrder = async (request: OrderCreationRequest) => {
    loading.value = true
    error.value = null
    try {
      const response = await createOrderApi(request)
      if (isSuccessResponse(response.data.code)) {
        currentOrder.value = response.data.result
        return response.data.result
      } else {
        throw new Error(response.data.message || 'Failed to create order')
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to create order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchMyOrders = async (pageNumber: number = 0, pageSize: number = 10) => {
    loading.value = true
    error.value = null
    try {
      const response = await getMyOrdersApi(pageNumber, pageSize)
      if (isSuccessResponse(response.data.code)) {
        orders.value = response.data.result.content
        totalPages.value = response.data.result.totalPages
        totalElements.value = response.data.result.totalElements
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch orders'
    } finally {
      loading.value = false
    }
  }

  const fetchAllOrders = async (pageNumber: number = 0, pageSize: number = 10) => {
    loading.value = true
    error.value = null
    try {
      const response = await getAllOrdersApi(pageNumber, pageSize)
      if (isSuccessResponse(response.data.code)) {
        orders.value = response.data.result.content
        totalPages.value = response.data.result.totalPages
        totalElements.value = response.data.result.totalElements
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch orders'
    } finally {
      loading.value = false
    }
  }

  const fetchOrdersByStatus = async (status: OrderStatus, pageNumber: number = 0, pageSize: number = 10) => {
    loading.value = true
    error.value = null
    try {
      const response = await getOrdersByStatusApi(status, pageNumber, pageSize)
      if (isSuccessResponse(response.data.code)) {
        orders.value = response.data.result.content
        totalPages.value = response.data.result.totalPages
        totalElements.value = response.data.result.totalElements
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch orders'
    } finally {
      loading.value = false
    }
  }

  const fetchOrderById = async (orderId: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await getOrderByIdApi(orderId)
      if (isSuccessResponse(response.data.code)) {
        currentOrder.value = response.data.result
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateOrderStatus = async (orderId: string, request: OrderStatusUpdateRequest) => {
    loading.value = true
    error.value = null
    try {
      const response = await updateOrderStatusApi(orderId, request)
      if (isSuccessResponse(response.data.code)) {
        // Update the order in the list
        const index = orders.value.findIndex(o => o.id === orderId)
        if (index !== -1) {
          orders.value[index] = response.data.result
        }
        if (currentOrder.value?.id === orderId) {
          currentOrder.value = response.data.result
        }
        return response.data.result
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to update order status'
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelOrder = async (orderId: string) => {
    loading.value = true
    error.value = null
    try {
      await cancelOrderApi(orderId)
      // Remove from list or update status
      const index = orders.value.findIndex(o => o.id === orderId)
      if (index !== -1) {
        orders.value[index].status = 'CANCELLED' as OrderStatus
      }
      if (currentOrder.value?.id === orderId) {
        currentOrder.value.status = 'CANCELLED' as OrderStatus
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to cancel order'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    currentOrder,
    totalPages,
    totalElements,
    loading,
    error,
    createOrder,
    fetchMyOrders,
    fetchAllOrders,
    fetchOrdersByStatus,
    fetchOrderById,
    updateOrderStatus,
    cancelOrder
  }
})
