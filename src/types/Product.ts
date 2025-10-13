export type Product = {
  id: string
  name: string
  description: string
  imageUrls?: string[]
}

export type ProductListItem = {
  id: string
  name: string
  description: string
  thumbnailUrl?: string // Only one image for list view
}

export type ProductImage = {
  id: string
  imageUrl: string
  productId: string
}

// Keep ProductItem for backward compatibility if needed
export type ProductItem = {
  id?: string
  price: number
  category: string
  gender: string
  size: string
  color: string
  stockQuantity: number
  url: string
  active: boolean
}
