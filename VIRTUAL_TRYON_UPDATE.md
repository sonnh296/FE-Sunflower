# Virtual Try-On Page Update

## Overview

The Virtual Try-On page has been completely updated to work with the new Product structure (using `imageUrls` array instead of `productItem` array). The page now features a beautified UI and allows users to select which product image they want to try on.

## Key Changes

### 1. **Product Structure Migration**

- **Old**: Used `productItemStore` with `productItem.url`
- **New**: Uses direct API call to fetch `Product` with `imageUrls` array
- Users can now select from multiple product images for try-on

### 2. **New Features**

#### Product Image Selection

- Displays all product images as thumbnails
- Users can click any thumbnail to select which image to try on
- Selected image is highlighted with purple border and checkmark
- Shows image count (e.g., "Chọn ảnh sản phẩm khác (5 ảnh)")

#### Improved Loading States

- Loading spinner while fetching product details
- Error handling with toast notifications
- Better feedback messages in Vietnamese

#### Enhanced UI/UX

- Increased file size limit to 10MB (from 1MB)
- Added helper text: "Chọn ảnh toàn thân để có kết quả tốt nhất"
- Product name badge instead of size badge
- Better visual hierarchy with steps 1, 2, 3
- Smooth animations and transitions

### 3. **API Integration**

#### Product Fetching

```typescript
// Fetches product by ID with all images
const response = await getProductByIdApi(productId)
if (response.data.code === 1000) {
  product.value = response.data.result
  selectedProductImage.value = product.value.imageUrls[0] // Default first image
}
```

#### Try-On Generation

```typescript
// Uses selected product image (not hardcoded)
await tryOnStore.generateImage(
  selectedImage.value,
  selectedProductImage.value.replace('http://', 'https://')
)
```

## File Structure

### Route Configuration

```
/try-on/:id → TryOn.vue
- :id is the product ID (not productItem ID)
```

### Data Flow

```
1. User clicks "Try On with AI" from ProductDetail page
2. Routes to /try-on/{productId}
3. TryOn page fetches product via getProductByIdApi
4. Displays all product images for selection
5. User selects product image + uploads their photo
6. Clicks "Generate" → calls virtual try-on API
7. Displays result image
```

## UI Components

### Step 1: Product Image Selection

- **Main Display**: Large product image (280x280px)
- **Thumbnail Grid**: 4 columns, shows all available images
- **Selection State**:
  - Active: Purple border + ring + scale effect + checkmark icon
  - Inactive: Gray border + hover effect
- **Badge**: Product name at bottom center

### Step 2: User Image Upload

- **File Accept**: PNG, JPEG
- **Max Size**: 10MB (increased from 1MB)
- **Upload Area**: Dashed border, purple gradient on hover
- **Icon**: Upload icon in gradient circle
- **Feedback**: File size limit and best practice hint

### Step 3: Result Display

- **Celebration Icons**: Animated stars around result
- **Preview**: Click to enlarge
- **Background**: Emerald/teal gradient
- **Animation**: Fade-in effect when result appears

## Toast Notifications

### Success Messages

```typescript
{
  severity: 'success',
  summary: 'Thành công',
  detail: 'Đã tạo ảnh thử đồ thành công!',
  life: 3000
}
```

### Error Messages

```typescript
// Product loading error
{
  severity: 'error',
  summary: 'Lỗi',
  detail: 'Không thể tải thông tin sản phẩm',
  life: 3000
}

// Try-on generation error
{
  severity: 'error',
  summary: 'Lỗi',
  detail: 'Không thể tạo ảnh thử đồ. Vui lòng thử lại!',
  life: 3000
}
```

## API Response Format

### Product API (Updated)

```typescript
GET /products/{productId}

Response: {
  code: 1000,          // number, not string
  message: null,
  result: {
    id: "product-123",
    name: "Áo Thun Nữ",
    description: "...",
    imageUrls: [       // Array of image URLs
      "https://...image1.jpg",
      "https://...image2.jpg",
      "https://...image3.jpg"
    ]
  }
}
```

### Try-On API (Unchanged)

```typescript
POST /api/virtual-try-on

Request:
- humanImage: File
- clothImage: string (URL)

Response: {
  imageUrl: string    // Direct result, not wrapped in ApiResponse
}
```

**Note**: The try-on API doesn't follow the standard `ApiResponse` wrapper pattern. It returns a simple object with `imageUrl` directly.

## Removed Features

Since we migrated from `productItem` to `imageUrls`:

- ❌ Size badge (was `productItem.size`)
- ❌ Category information
- ❌ Stock quantity
- ❌ Color/size variant selection

These were part of the old `productItem` structure and are no longer applicable.

## Retained Features

- ✅ Product image display with preview
- ✅ User image upload
- ✅ Generate try-on button
- ✅ Loading states and animations
- ✅ Result display with preview
- ✅ Change image option
- ✅ Error handling

## New Features

- ✨ **Multi-image selection** - Choose from any product image
- ✨ **Thumbnail gallery** - Visual picker for product images
- ✨ **Improved loading state** - Product loading indicator
- ✨ **Better error messages** - Vietnamese messages with toast
- ✨ **10MB file limit** - Up from 1MB
- ✨ **Helper text** - Best practice hints for users
- ✨ **Product name display** - Shows which product you're trying on

## Component States

### 1. Loading State

```vue
<div v-if="loadingProduct">
  <i class="pi pi-spin pi-spinner text-4xl text-purple-500"></i>
</div>
```

### 2. Before Upload (No User Image)

- Shows product selection on left
- Shows upload area on right
- Generate button disabled

### 3. After Upload (User Image Selected)

- Shows product image and user image side-by-side
- Shows "change image" button
- Generate button enabled

### 4. Generating (Processing)

- Generate button shows shimmer animation
- Progress bar appears
- Button text: "Đang tạo ma thuật..."

### 5. Result Ready

- Shows result image in Step 3 section
- Fade-in animation
- Can still change images and regenerate

## Styling Updates

### Gradient Colors

- **Primary**: Purple 500 → Pink 500
- **Background**: Purple 50 → Pink 50 → Rose 50
- **Success**: Emerald 500 → Teal 500
- **Accent**: Pink 500 → Rose 500

### Border Radius

- **Cards**: 24px (rounded-3xl)
- **Buttons**: 16px (rounded-2xl)
- **Images**: 12px (rounded-xl)
- **Thumbnails**: 8px (rounded-lg)

### Shadows

- **Cards**: shadow-2xl
- **Images**: shadow-lg → shadow-xl on hover
- **Buttons**: shadow-lg → shadow-xl on hover

## Responsive Behavior

- **Desktop (lg+)**:
  - 2 columns for steps 1 & 2
  - Max width 1152px container
- **Tablet (md)**:
  - 2 columns for product + user image after upload
  - 4 columns for thumbnail grid
- **Mobile**:
  - Single column stack
  - Full width images
  - Vertical layout

## Testing Checklist

- [ ] Navigate from ProductDetail page to Try-On
- [ ] Product loads with all images
- [ ] Can select different product images
- [ ] Selected image highlights correctly
- [ ] Can upload user image (< 10MB)
- [ ] Generate button enables after both images selected
- [ ] Try-on generation works and shows result
- [ ] Can change user image and regenerate
- [ ] Error messages show for failures
- [ ] Success toast shows on completion
- [ ] Loading states display correctly
- [ ] Preview/zoom works on all images
- [ ] Responsive design works on mobile

## Performance Notes

- Product images are loaded from Azure Blob Storage
- Thumbnail grid only shows when multiple images available
- First image auto-selected as default
- User upload creates local object URL for preview
- Try-on API processes images server-side

## Navigation Flow

```
HomePage
  → ProductDetail (click "Try On with AI")
    → TryOn/:productId
```

Previous flow (deprecated):

```
HomePage
  → ProductDetail
    → ProductItemDetail (no longer exists)
      → TryOn/:productItemId
```

## Backend API Used

1. **GET /products/{productId}** - Fetch product with images
2. **POST /api/virtual-try-on** - Generate try-on result

## Dependencies

- PrimeVue Components:

  - `FileUpload` - Image upload
  - `Image` - Image preview
  - `ProgressBar` - Loading indicator
  - `Toast` - Notifications

- Stores:
  - `tryOnStore` - Try-on generation logic
- APIs:
  - `getProductByIdApi` - Product fetching
  - `generateImageTryOnApi` - Try-on generation

## Common Issues & Solutions

### Issue: "Cannot read property 'url' of undefined"

**Solution**: Updated to use `product.imageUrls[index]` instead of `productItem.url`

### Issue: Product not loading

**Solution**: Changed from `productItemStore.getProductItemById()` to `getProductByIdApi()`

### Issue: Try-on fails with 404

**Solution**: Ensure product ID is passed (not productItem ID) and product has valid imageUrls

### Issue: File upload rejected

**Solution**: Increased max file size to 10MB and added proper error messages
