export type Product = {
  id: string
  name: string
  description: string
  productItem: ProductItem[]
}

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
