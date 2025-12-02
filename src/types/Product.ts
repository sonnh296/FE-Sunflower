export type Product = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  size: string
  imageUrl?: string
}

export type ProductListItem = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  size: string
  thumbnailUrl?: string // Only one image for list view
}

export type ProductImage = {
  id: string
  imageUrl: string
  productId: string
}
