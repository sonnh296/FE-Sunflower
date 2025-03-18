export type Product = {
  id: number
  name: string
  description: string
  productItem: ProductItem[]
}

export type ProductItem = {
  id?: number
  price: string
  category: string
  gender: string
  size: string
  color: string
  stockQuantity: number
  url: string
  active: boolean
}
