import axios from 'axios'

/**
 * Fetch products from a Shopee shop by shopId.
 * @param shopId Shopee shop ID
 * @param page Page number (0-based)
 * @param pageSize Number of products per page
 */
export async function getShopeeProducts(shopId: number, page = 0, pageSize = 30) {
  const url = `https://shopee.vn/api/v4/shop/search_items?offset=${page * pageSize}&limit=${pageSize}&shopid=${shopId}`
  const response = await axios.get(url, {
    headers: {
      // Shopee may require a User-Agent header
      'User-Agent': 'Mozilla/5.0'
    }
  })
  return response.data
}
