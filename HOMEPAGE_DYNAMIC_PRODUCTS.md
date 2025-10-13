# Homepage Dynamic Products Update

## Overview

The homepage has been updated to fetch and display products dynamically from the API instead of using hardcoded product data.

## Changes Made

### 1. **HomeView.vue** - Updated to Fetch Products from API

#### Script Section Changes:

```typescript
// Before: Fixed products array
const featuredProducts = ref([
  { id: 1, name: 'Váy Hồng', image: '/IMG_7054.JPG', ... },
  // ... more hardcoded products
])

// After: Dynamic products from API
const featuredProducts = ref<Product[]>([])
const isLoadingProducts = ref(false)

const fetchProducts = async () => {
  const response = await getProductsApi({
    pageSize: 6,
    pageNumber: 0
  })
  featuredProducts.value = response.data.result.content
}

onMounted(() => {
  fetchProducts()
})
```

#### Template Section Changes:

- ✅ Added loading state with spinner
- ✅ Added empty state when no products
- ✅ Dynamic product rendering with `v-for`
- ✅ Uses product images from `imageUrls` array
- ✅ Fallback image icon when no images available
- ✅ Dynamic color coding based on index
- ✅ Shows product description from API
- ✅ Displays first 5 products + "More Options" card

## Features

### Loading State

```vue
<div v-if="isLoadingProducts">
  <i class="pi pi-spin pi-spinner"></i>
  <span>Đang tải sản phẩm...</span>
</div>
```

Shows a spinner while products are being fetched from the API.

### Empty State

```vue
<div v-else-if="featuredProducts.length === 0">
  <i class="pi pi-inbox"></i>
  <p>Chưa có sản phẩm nào</p>
</div>
```

Displays a friendly message when no products are available.

### Dynamic Product Cards

Each product card displays:

- ✅ **Product Image** - First image from `imageUrls` array
- ✅ **Product Name** - From API
- ✅ **Product Description** - From API (with fallback text)
- ✅ **Color-Coded Badges** - Rotates through 5 colors
- ✅ **Special Labels** - "Best Seller" for first product, "Bộ Sưu Tập" for second
- ✅ **View Details Button** - Navigates to product detail page

### Image Handling

```vue
<img
  v-if="product.imageUrls && product.imageUrls.length > 0"
  :src="product.imageUrls[0]"
  :alt="product.name"
/>
<div v-else>
  <i class="pi pi-image"></i>
</div>
```

- Uses first image from product's `imageUrls` array
- Shows placeholder icon if no images available

### Color Rotation System

Products cycle through 5 color schemes:

1. **Pink** - Index 0, 5, 10... (bg-pink-500)
2. **Blue** - Index 1, 6, 11... (bg-blue-500)
3. **Purple** - Index 2, 7, 12... (bg-purple-500)
4. **Amber** - Index 3, 8, 13... (bg-amber-500)
5. **Rose** - Index 4, 9, 14... (bg-rose-500)

### Navigation

```typescript
const navigateToProduct = (product: Product) => {
  router.push({ name: 'product-guest', params: { id: product.id } })
}
```

Clicking any product navigates to its detail page using the product ID from the API.

## API Integration

### Endpoint Used

```typescript
GET /api/products?pageSize=6&pageNumber=0
```

### Response Structure

```json
{
  "result": {
    "content": [
      {
        "id": "uuid-string",
        "name": "Product Name",
        "description": "Product Description",
        "imageUrls": [
          "https://storage.blob.core.windows.net/.../image1.jpg",
          "https://storage.blob.core.windows.net/.../image2.jpg"
        ]
      }
    ],
    "totalElements": 10,
    "totalPages": 2
  }
}
```

## Benefits

### ✅ Dynamic Content

- Products automatically update when added/modified in admin
- No need to manually update homepage code
- Always shows latest products from database

### ✅ Better User Experience

- Loading indicator during fetch
- Empty state for better UX
- Smooth transitions and hover effects
- Responsive grid layout

### ✅ Scalable

- Easily adjust number of products shown (change `pageSize`)
- Can add pagination if needed
- Supports unlimited products via API

### ✅ Consistent Data

- Product names and descriptions come from single source of truth
- Images are from Azure Blob Storage
- All product data is synchronized

## Configuration

### Number of Products Displayed

Change the `pageSize` in `fetchProducts()`:

```typescript
const response = await getProductsApi({
  pageSize: 6, // Change this number
  pageNumber: 0
})
```

### Products Shown in Grid

Change `.slice(0, 5)` to show more/fewer products:

```vue
v-for="(product, index) in featuredProducts.slice(0, 5)" ↑ Change this
```

Note: One card is reserved for "Khám phá thêm" (More Options)

## Error Handling

The implementation includes:

- ✅ Try-catch block for API errors
- ✅ Console error logging
- ✅ Graceful fallback to empty array
- ✅ Empty state display

## Testing Checklist

- [ ] Homepage loads without errors
- [ ] Products display correctly from API
- [ ] Loading spinner shows during fetch
- [ ] Empty state shows when no products
- [ ] Product images display correctly
- [ ] Clicking product navigates to detail page
- [ ] "Khám phá thêm" card appears
- [ ] Responsive layout works on mobile
- [ ] Hover effects work properly
- [ ] Color rotation displays correctly

## Future Enhancements

Possible improvements:

- Add "Featured" flag in backend to prioritize certain products
- Implement product categories for filtering
- Add search functionality on homepage
- Show product pricing if available
- Add "Add to Cart" quick action
- Implement lazy loading for images
- Add product ratings/reviews display

## Migration Notes

### Before (Hardcoded):

- 5 fixed products with local images
- Manual updates required
- Static data

### After (Dynamic):

- Products fetched from API
- Automatic updates
- Real-time data
- Supports unlimited products
- Uses Azure Blob Storage images

---

**Last Updated:** October 13, 2025  
**Version:** 2.0 (Dynamic Products)
