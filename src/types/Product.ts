export type ProductVariant = {
  id?: string
  variantName: string // Name of the variant, e.g., color or type
  sizes: {
    sizeId?: string
    size: string
    price: number
    stock: number
  }[]
  // Optional category information on a per-variant basis
  categoryId?: string
  categoryName?: string
}

export type ProductImage = {
  id: string
  imageUrl: string
}

export type Product = {
  id: string
  name: string
  description: string
  // Category fields returned by backend
  categoryId?: string
  categoryName?: string
  // Backward-compatible simple category string used in some places
  category?: string
  imageUrl?: string
  imageUrls?: string[]
  thumbnailUrl?: string // Add thumbnailUrl
  images?: ProductImage[] // NEW: Include image IDs
  variants?: ProductVariant[] // New variants support
  productOptions?: {
    id: string
    name: string
    sizeIds: string[]
    sizeNames: string[]
  }[]
  optionsWithVariants?: OptionWithVariants[]
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
  categoryId?: string
  categoryName?: string
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
  // Optional category assignment
  categoryId?: string
}

export type ProductUpdateRequest = {
  id: string
  name: string
  description: string
  imageUrl?: string
  productItem?: ProductItem[]
  categoryId?: string
}

export type CartAddRequest = {
  productId: string
  productItemId?: string
  quantity: number
}

export type SizeVariant = {
  id: string
  sizeId: string
  size: string
  price: number
  stock: number
  productOptionId: string
  productOptionName: string
}

export type OptionWithVariants = {
  optionId: string
  optionName: string
  variants: SizeVariant[]
}
