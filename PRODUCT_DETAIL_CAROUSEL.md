# Product Detail Page with Image Carousel

## Overview

The product detail page has been completely updated to work with the new product structure (using `imageUrls` array instead of `productItem` array) and now features a beautiful image carousel/slider.

## Key Changes

### 1. **Updated Data Fetching**

- **Old**: Fetched all products from store and filtered by ID
- **New**: Direct API call to fetch single product by ID using `getProductByIdApi`
- More efficient and fetches the full product details with all image URLs

### 2. **Image Carousel Implementation**

- Uses **PrimeVue Galleria** component for professional image carousel
- Features:
  - Large main image display (500px height)
  - Thumbnail navigation strip
  - Circular navigation (loops through images)
  - Item indicators (dots)
  - Next/Previous navigation buttons
  - Click on thumbnails to jump to specific image
  - Responsive design

### 3. **Product Structure Update**

- **Removed**: All references to `productItem` array (colors, sizes, stock, price)
- **Updated**: Now uses `Product` type with `imageUrls` string array
- **Simplified**: Focuses on displaying product images and basic information

## File Changes

### `/MFFE/src/views/Guest/ProductDetail.vue`

**Script Changes:**

```typescript
// OLD - Using product store
import { useProductStore } from '@/stores/productStore'
const productStore = useProductStore()

// NEW - Direct API call
import { getProductByIdApi } from '@/api/productApi'

// OLD - Loading from store
await productStore.getProducts()
product.value = productStore.products.find((p) => p.id === productId) || null

// NEW - Direct fetch
const response = await getProductByIdApi(productId)
product.value = response.data.result
```

**Template Changes:**

```vue
<!-- OLD - Manual image selection -->
<img :src="selectedImage || product.productItem[0]?.url || '/noavatar.png'" />
<div v-for="item in product.productItem.slice(0, 4)">
  <img :src="item.url" @click="selectedImage = item.url" />
</div>

<!-- NEW - Galleria carousel -->
<Galleria
  :value="galleryImages"
  :numVisible="5"
  :circular="true"
  :showItemNavigators="true"
  :showThumbnails="true"
>
  <template #item="slotProps">
    <img :src="slotProps.item.itemImageSrc" />
  </template>
  <template #thumbnail="slotProps">
    <img :src="slotProps.item.thumbnailImageSrc" />
  </template>
</Galleria>
```

## User Flow

1. **Homepage** → User browses products with thumbnails
2. **Click Product** → Navigates to `/product/:id` route
3. **Product Detail Page** →
   - Fetches full product details via API
   - Displays all images in carousel
   - Shows product name and description
   - Provides "Try On with AI" button
   - Provides "Add to Cart" button

## API Integration

**Endpoint Used:**

```
GET /products/{productId}
```

**Response Structure:**

```typescript
{
  code: "1000",
  result: {
    id: string,
    name: string,
    description: string,
    imageUrls: string[] // Array of Azure Blob Storage URLs
  }
}
```

## Carousel Configuration

**PrimeVue Galleria Settings:**

- `numVisible`: 5 thumbnails visible at once
- `circular`: true (loop back to first image after last)
- `showItemNavigators`: true (next/prev buttons)
- `showThumbnails`: true (thumbnail strip below main image)
- `showIndicators`: true (dot indicators)
- `changeItemOnIndicatorHover`: true (change image on hover)

**Custom Styling:**

- Rounded corners (`rounded-3xl`)
- Shadow effects (`shadow-xl`)
- Gradient background (`from-gray-50 to-pink-50/30`)
- Fixed height main image: 500px
- Thumbnail height: 80px (h-20)

## Responsive Behavior

- **Desktop (lg+)**: Two columns - images left, info right
- **Mobile/Tablet**: Single column - images on top, info below
- **Carousel**: Adapts thumbnail size and visibility based on screen size

## Features Removed

Since we no longer use `productItem` array, the following features were removed:

- ❌ Color selection
- ❌ Size selection
- ❌ Price display
- ❌ Stock quantity
- ❌ Gender selection

These can be re-added later if you decide to implement product variants/options in a different way.

## Features Retained

- ✅ Product name and description
- ✅ Image gallery/carousel
- ✅ "Try On with AI" button (navigates to try-on page)
- ✅ "Add to Cart" button (placeholder functionality)
- ✅ Back button
- ✅ Loading state
- ✅ Error state (product not found)
- ✅ "New Collection" badge
- ✅ Free shipping and easy returns info

## Testing Checklist

- [ ] Click product from homepage → Should navigate to detail page
- [ ] Product images load in carousel
- [ ] Can navigate through images using arrows
- [ ] Can click thumbnails to jump to specific image
- [ ] Carousel loops back to first image after last
- [ ] Back button returns to homepage
- [ ] Loading spinner shows while fetching
- [ ] Error message shows if product not found
- [ ] "Try On with AI" button navigates correctly
- [ ] "Add to Cart" shows alert (placeholder)

## Next Steps (Optional Enhancements)

1. **Product Variants**: If you want to add back colors/sizes/prices:

   - Create a new `ProductVariant` type
   - Add variants array to Product type
   - Update backend to support variants
   - Re-add selection UI in detail page

2. **Shopping Cart**: Implement full cart functionality:

   - Create cart store (Pinia)
   - Add cart API endpoints
   - Handle cart state management
   - Update "Add to Cart" button logic

3. **Image Zoom**: Add image magnification on hover/click

   - Use PrimeVue Image component with preview
   - Or implement custom zoom logic

4. **Related Products**: Show similar/related products

   - Add API endpoint for recommendations
   - Display carousel of related products below

5. **Reviews & Ratings**: Add customer reviews section
   - Create review API endpoints
   - Add review display and submission UI

## Notes

- All product images are stored in Azure Blob Storage
- Image URLs are returned directly from backend
- No image processing needed in frontend
- Carousel automatically handles any number of images (1 to unlimited)
- If product has no images, shows fallback placeholder image
