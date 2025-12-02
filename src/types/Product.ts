export type Product = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  size: string
  imageUrl?: string
  imageUrls?: string[] // Add support for multiple images
}

export type ProductItem = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  size: string
  imageUrl?: string
  imageUrls?: string[]
  url?: string
  color?: string
  gender?: string
  stockQuantity?: number
}

export type ProductListItem = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  size: string
  thumbnailUrl?: string
  imageUrls?: string[]
}

export type ProductImage = {
  id: string
  imageUrl: string
  productId: string
}

export type ProductCreateRequest = {
  name: string
  description: string
  price: number
  quantity: number
  size: string
  imageUrl?: string
  productItem?: ProductItem[]
}

export type ProductUpdateRequest = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  size: string
  imageUrl?: string
  productItem?: ProductItem[]
}

export type CartAddRequest = {
  productId: string
  productItemId?: string
  quantity: number
}
