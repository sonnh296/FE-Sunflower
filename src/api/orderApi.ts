import type { AxiosResponse } from 'axios'
import api from './api'
import type { MfResponse } from '@/types/MatchFinderResponse'

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export type OrderCreationRequest = {
  deliveryAddress: string
  phoneNumber: string
  notes?: string
}

export type OrderStatusUpdateRequest = {
  status: OrderStatus
}

export type OrderItemResponse = {
  id: string
  productItem: {
    id: string
    product: {
      id: string
      name: string
      description: string
    }
    size: string
    color: string
    price: number
    quantity: number
    imageUrl: string
  }
  quantity: number
  priceAtOrder: number
}

export type OrderResponse = {
  id: string
  user: {
    id: string
    username: string
    email: string
    fullName: string
  }
  orderItems: OrderItemResponse[]
  totalPrice: number
  status: OrderStatus
  deliveryAddress: string
  phoneNumber: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type OrderPageResponse = {
  content: OrderResponse[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export const createOrderApi = async (
  request: OrderCreationRequest
): Promise<AxiosResponse<MfResponse<OrderResponse>>> => {
  return await api.post('/orders', request)
}

export const getOrderByIdApi = async (
  orderId: string
): Promise<AxiosResponse<MfResponse<OrderResponse>>> => {
  return await api.get(`/orders/${orderId}`)
}

export const getMyOrdersApi = async (
  pageNumber: number = 0,
  pageSize: number = 10,
  sort: string = 'DESC'
): Promise<AxiosResponse<MfResponse<OrderPageResponse>>> => {
  return await api.get('/orders/my-orders', {
    params: {
      field: 'createdAt',
      pageNumber,
      pageSize,
      sort
    }
  })
}

export const getAllOrdersApi = async (
  pageNumber: number = 0,
  pageSize: number = 10,
  sort: string = 'DESC'
): Promise<AxiosResponse<MfResponse<OrderPageResponse>>> => {
  return await api.get('/orders', {
    params: {
      field: 'createdAt',
      pageNumber,
      pageSize,
      sort
    }
  })
}

export const getOrdersByStatusApi = async (
  status: OrderStatus,
  pageNumber: number = 0,
  pageSize: number = 10,
  sort: string = 'DESC'
): Promise<AxiosResponse<MfResponse<OrderPageResponse>>> => {
  return await api.get(`/orders/status/${status}`, {
    params: {
      field: 'createdAt',
      pageNumber,
      pageSize,
      sort
    }
  })
}

export const updateOrderStatusApi = async (
  orderId: string,
  request: OrderStatusUpdateRequest
): Promise<AxiosResponse<MfResponse<OrderResponse>>> => {
  return await api.patch(`/orders/${orderId}/status`, request)
}

export const cancelOrderApi = async (
  orderId: string
): Promise<AxiosResponse<MfResponse<string>>> => {
  return await api.delete(`/orders/${orderId}`)
}

