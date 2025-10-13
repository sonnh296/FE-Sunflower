# Virtual Try-On - Before & After Comparison

## 🔄 Major Changes

### Data Source

**Before:**

```typescript
// Old: Using productItemStore
await productItemStore.getProductItemById(productItemId)
const productUrl = productItemStore.productItem?.url
```

**After:**

```typescript
// New: Direct API call with Product
const response = await getProductByIdApi(productId)
const product = response.data.result
const images = product.imageUrls // Array of all images!
```

### Product Display

**Before:**

- ❌ Single fixed product image
- ❌ No image selection
- ❌ Shows size badge

**After:**

- ✅ Multiple product images to choose from
- ✅ Thumbnail gallery with selection
- ✅ Shows product name badge
- ✅ Auto-selects first image as default

### File Upload

**Before:**

- 1MB max file size
- Generic error messages in English

**After:**

- 10MB max file size
- Detailed Vietnamese error messages
- Helper text for best results
- Toast notifications

## 🎨 UI Improvements

### Layout Structure

```
┌─────────────────────────────────────────────┐
│          AI Virtual Try-On                   │
│          ─────────────────                   │
│  Trải nghiệm công nghệ thử đồ ảo...        │
└─────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────┐
│  ① Chọn ảnh sản phẩm │  ② Tải ảnh của bạn   │
│                      │                      │
│  [Large Product Img] │  [Upload Area]       │
│  Product Name        │  Max 10MB            │
│                      │  Full body tip       │
│  Thumbnail Gallery:  │                      │
│  [img1][img2][img3]  │                      │
│  [img4][img5][img6]  │                      │
└──────────────────────┴──────────────────────┘

         [✨ Tạo ảnh thử đồ]

┌─────────────────────────────────────────────┐
│          ③ Kết quả tuyệt vời!                │
│                                             │
│  ⭐  [Generated Result Image]  ⭐          │
│                                             │
└─────────────────────────────────────────────┘
```

### Color Palette

- **Primary Gradient**: Purple (#8b5cf6) → Pink (#ec4899)
- **Background**: Purple-Pink-Rose gradient
- **Success**: Emerald (#10b981) → Teal (#14b8a6)
- **Accent**: Pink (#ec4899) → Rose (#f43f5e)

### Interactive Elements

- **Product Image Selection**:
  - Inactive: Gray border, hover effect
  - Active: Purple border + ring + scale + checkmark
- **Generate Button**:
  - Idle: Purple-Pink gradient
  - Hover: Scale 1.05 + larger shadow
  - Generating: Shimmer animation overlay
  - Disabled: Gray gradient

## 📱 Responsive Design

### Desktop (1024px+)

```
[Product Selection]  [Upload Area]
     (50%)              (50%)
```

### Tablet (768px - 1023px)

```
[Product Selection]  [Upload Area]
     (50%)              (50%)

Thumbnail: 4 columns grid
```

### Mobile (< 768px)

```
[Product Selection]
    (100%)

[Upload Area]
    (100%)

Thumbnail: 4 columns grid
```

## ✨ New Features Showcase

### 1. Multi-Image Selection

```vue
<!-- Product can have 1 to N images -->
<div v-for="(imageUrl, index) in product.imageUrls">
  <img :src="imageUrl" @click="selectImage(imageUrl)" />
</div>

<!-- Visual feedback -->
<div v-if="isSelected" class="border-purple-500 ring-2">
  <i class="pi pi-check"></i>
</div>
```

### 2. Loading States

```vue
<!-- Initial product loading -->
<div v-if="loadingProduct">
  <i class="pi pi-spin pi-spinner"></i>
</div>

<!-- Try-on generation -->
<button :disabled="generating">
  {{ generating ? 'Đang tạo ma thuật...' : 'Tạo ảnh thử đồ' }}
</button>

<ProgressBar v-if="generating" mode="indeterminate" />
```

### 3. Toast Notifications

```typescript
// Success
toast.add({
  severity: 'success',
  summary: 'Thành công',
  detail: 'Đã tạo ảnh thử đồ thành công!'
})

// Error
toast.add({
  severity: 'error',
  summary: 'Lỗi',
  detail: 'Không thể tải thông tin sản phẩm'
})
```

## 🔧 Technical Details

### API Calls

```typescript
// 1. Load product
GET /products/{productId}
Response: ApiResponse<Product>

// 2. Generate try-on
POST /api/virtual-try-on
Body: { humanImage: File, clothImage: string }
Response: { imageUrl: string }
```

### Component Props & Events

```typescript
// FileUpload
<FileUpload
  accept="image/png, image/jpeg"
  :maxFileSize="10000000"
  @select="onImageSelect"
/>

// Image Preview
<Image
  :src="imageUrl"
  preview
  :previewImageStyle="{
    maxWidth: '90vw',
    maxHeight: '80vh'
  }"
/>
```

### State Management

```typescript
// Reactive refs
const loadingProduct = ref(true)
const product = ref<Product | null>(null)
const selectedProductImage = ref<string>('')
const selectedImgTemp = ref<string>('')
const selectedImage = ref<File>()
const generatedImageUrl = ref<string>('')
```

## 🎯 User Journey

### Flow Diagram

```
Start
  ↓
Load Product (API call)
  ↓
Select Product Image (from thumbnails)
  ↓
Upload User Photo
  ↓
Click "Generate"
  ↓
[Processing Animation]
  ↓
Show Result Image
  ↓
[Option: Change & Regenerate]
```

### Edge Cases Handled

1. **No product found**: Shows error toast
2. **Single product image**: Hides thumbnail gallery
3. **Upload fails**: Shows error toast
4. **Generation fails**: Shows error toast
5. **Large file**: Rejected with message

## 📊 Performance Optimizations

- Uses `URL.createObjectURL()` for instant user image preview
- Lazy loads product images
- Only fetches single product (not all products)
- Thumbnail images use same URLs (no extra downloads)
- Result image cached in component state

## 🧪 Test Scenarios

### Happy Path

1. ✅ Navigate from ProductDetail
2. ✅ Product loads with 3+ images
3. ✅ Select second image thumbnail
4. ✅ Upload 5MB user photo
5. ✅ Click generate
6. ✅ See loading animation
7. ✅ See result image
8. ✅ Success toast appears

### Error Paths

1. ❌ Product not found → Error toast
2. ❌ Upload 15MB file → Rejection message
3. ❌ Try-on API fails → Error toast
4. ❌ Network error → Error toast

### UI/UX Tests

1. 🎨 Thumbnail selection highlights correctly
2. 🎨 Animations play smoothly
3. 🎨 Responsive on mobile/tablet
4. 🎨 Preview/zoom works on all images
5. 🎨 Loading states show/hide correctly

## 📝 Migration Notes

### For Developers

```typescript
// OLD CODE (Delete this)
import { useProductItemStore } from '@/stores/productItemStore'
const productItemStore = useProductItemStore()
await productItemStore.getProductItemById(id)
const imageUrl = productItemStore.productItem?.url

// NEW CODE (Use this)
import { getProductByIdApi } from '@/api/productApi'
const response = await getProductByIdApi(id)
const product = response.data.result
const imageUrls = product.imageUrls
```

### Breaking Changes

- Route param changed from `productItemId` to `productId`
- No longer uses `productItemStore`
- ProductItem fields (size, color, price) not available
- Must select from `imageUrls` array

### Backward Compatibility

- ❌ Old links with productItemId won't work
- ❌ Old product structure incompatible
- ✅ Try-on API unchanged (still works same way)

## 🎉 Benefits Summary

1. **Better UX**: Select from multiple product angles
2. **Larger Files**: 10MB vs 1MB limit
3. **Better Errors**: Vietnamese messages + toasts
4. **Cleaner Code**: Direct API calls, no store dependency
5. **Consistent**: Matches ProductDetail structure
6. **Scalable**: Works with any number of product images
