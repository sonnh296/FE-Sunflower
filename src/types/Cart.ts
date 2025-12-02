import type { Product } from './Product'

export type CartItem = {
  id: string
  quantity: number
  addedAt: string
  thumbnailUrl: string
  price: number
  product: Product
}

export type Cart = {
  id: string
  items: CartItem[]
  totalAmount: number
  updatedAt: string
}
