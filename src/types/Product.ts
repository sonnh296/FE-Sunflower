export type ProductVariant = {
  id?: string
  size: string
  price: number
  stock: number
}

export type ProductImage = {
  id: string
  imageUrl: string
}

export type Product = {
  id: string
  name: string
  description: string
  imageUrl?: string
  imageUrls?: string[]
  thumbnailUrl?: string // Add thumbnailUrl
  images?: ProductImage[] // NEW: Include image IDs
  variants?: ProductVariant[] // New variants support
  availableFrom?: string // ISO date string
  availableTo?: string // ISO date string
}

export type ProductItem = {
  id: string
  name: string
  description: string
  imageUrl?: string
  imageUrls?: string[]
  url?: string
  color?: string
  gender?: string
  size?: string // Add size
  price?: number // Add price
  stockQuantity?: number // Add stockQuantity
  variants?: ProductVariant[] // New variants support
  availableFrom?: string
  availableTo?: string
}

export type ProductListItem = {
  id: string
  name: string
  description: string
  imageUrl?: string
  imageUrls?: string[]
  thumbnailUrl?: string // Add thumbnailUrl
  variants?: ProductVariant[] // New variants support
  availableFrom?: string
  availableTo?: string
}

export type ProductCreateRequest = {
  name: string
  description: string
  imageUrl?: string
  productItem?: ProductItem[]
}

export type ProductUpdateRequest = {
  id: string
  name: string
  description: string
  imageUrl?: string
  productItem?: ProductItem[]
}

export type CartAddRequest = {
  productId: string
  productItemId?: string
  quantity: number
}
