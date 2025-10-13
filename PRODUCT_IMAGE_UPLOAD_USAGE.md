# Product Image Upload - Frontend Usage Guide

## Overview

I've added API calls to the frontend that allow you to upload, view, and delete images for each product. The images are stored in Azure Blob Storage.

## What's Been Added

### 1. API Functions (`src/api/productApi.ts`)

Three new API functions have been added:

#### `uploadProductImagesApi`

Upload multiple images at once to a product

```typescript
await uploadProductImagesApi({
  productId: '123',
  images: [file1, file2, file3]
})
```

#### `uploadProductSingleImageApi`

Upload a single image to a product (keeps existing images)

```typescript
await uploadProductSingleImageApi({
  productId: '123',
  image: file
})
```

#### `deleteProductImageApi`

Delete a specific image from a product

```typescript
await deleteProductImageApi('productId', 'imageId')
```

### 2. Updated Type (`src/types/Product.ts`)

The `Product` type now includes `imageUrls`:

```typescript
export type Product = {
  id: string
  name: string
  description: string
  imageUrls?: string[] // <-- New field
  productItem: ProductItem[]
}
```

### 3. Example Component (`src/components/ProductImageUpload.vue`)

A complete example component that demonstrates:

- Uploading multiple images
- Uploading a single image
- Displaying current images
- Deleting images
- Status messages and error handling

## How to Use in Your Views

### Example 1: Basic Usage

```vue
<template>
  <div>
    <h2>Product Management</h2>
    <ProductImageUpload
      :productId="currentProductId"
      :initialProduct="currentProduct"
      @productUpdated="handleProductUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductImageUpload from '@/components/ProductImageUpload.vue'
import type { Product } from '@/types/Product'

const currentProductId = ref('your-product-id')
const currentProduct = ref<Product | null>(null)

const handleProductUpdate = (updatedProduct: Product) => {
  currentProduct.value = updatedProduct
  console.log('Product updated:', updatedProduct)
}
</script>
```

### Example 2: Inline API Calls (without component)

If you prefer to use the API calls directly in your own component:

```vue
<template>
  <div>
    <input type="file" multiple @change="handleFileSelect" />
    <button @click="uploadImages">Upload Images</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { uploadProductImagesApi } from '@/api/productApi'

const selectedFiles = ref<File[]>([])
const productId = 'your-product-id'

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    selectedFiles.value = Array.from(target.files)
  }
}

const uploadImages = async () => {
  try {
    const response = await uploadProductImagesApi({
      productId: productId,
      images: selectedFiles.value
    })

    console.log('Images uploaded!', response.data.result)
    // response.data.result contains the updated Product with imageUrls
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
</script>
```

### Example 3: Upload Single Image with Drag & Drop

```vue
<template>
  <div class="dropzone" @drop.prevent="handleDrop" @dragover.prevent @dragenter.prevent>
    Drop an image here or click to upload
    <input type="file" @change="handleFileChange" />
  </div>
</template>

<script setup lang="ts">
import { uploadProductSingleImageApi } from '@/api/productApi'

const props = defineProps<{
  productId: string
}>()

const handleDrop = async (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    await uploadImage(files[0])
  }
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    await uploadImage(target.files[0])
  }
}

const uploadImage = async (file: File) => {
  try {
    const response = await uploadProductSingleImageApi({
      productId: props.productId,
      image: file
    })
    console.log('Image uploaded!', response.data.result)
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
</script>

<style scoped>
.dropzone {
  border: 2px dashed #ccc;
  padding: 40px;
  text-align: center;
  cursor: pointer;
}
</style>
```

### Example 4: Display Product Images in a Gallery

```vue
<template>
  <div class="product-gallery">
    <div v-if="product?.imageUrls && product.imageUrls.length > 0" class="images">
      <div v-for="(imageUrl, index) in product.imageUrls" :key="index" class="image-card">
        <img :src="imageUrl" :alt="`Product ${index + 1}`" />
        <button @click="deleteImage(imageUrl)">Remove</button>
      </div>
    </div>
    <p v-else>No images uploaded yet</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProductByIdApi, deleteProductImageApi } from '@/api/productApi'
import type { Product } from '@/types/Product'

const props = defineProps<{
  productId: string
}>()

const product = ref<Product | null>(null)

const fetchProduct = async () => {
  try {
    const response = await getProductByIdApi(props.productId)
    product.value = response.data.result
  } catch (error) {
    console.error('Failed to fetch product:', error)
  }
}

const deleteImage = async (imageUrl: string) => {
  // Extract imageId from URL
  const urlParts = imageUrl.split('/')
  const filename = urlParts[urlParts.length - 1]
  const imageId = filename.split('_')[0]

  try {
    const response = await deleteProductImageApi(props.productId, imageId)
    product.value = response.data.result
  } catch (error) {
    console.error('Failed to delete image:', error)
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.image-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
```

## API Response Structure

All endpoints return the updated product with the current imageUrls:

```typescript
{
  result: {
    id: "product-123",
    name: "Product Name",
    description: "Product Description",
    imageUrls: [
      "https://yourstorageaccount.blob.core.windows.net/product-images/products/product-123/uuid1_image1.jpg",
      "https://yourstorageaccount.blob.core.windows.net/product-images/products/product-123/uuid2_image2.jpg"
    ],
    productItem: [...]
  }
}
```

## Error Handling

Always wrap API calls in try-catch blocks:

```typescript
try {
  const response = await uploadProductImagesApi({
    productId: productId,
    images: files
  })
  // Handle success
} catch (error: any) {
  const errorMessage = error.response?.data?.message || 'Upload failed'
  console.error(errorMessage)
  // Show error to user
}
```

## Notes

1. **File Types**: The backend accepts common image formats (JPG, PNG, GIF, etc.)
2. **File Size**: Check your backend configuration for maximum file size limits
3. **Multiple Uploads**: Use `uploadProductImagesApi` to replace all images, or `uploadProductSingleImageApi` to add to existing images
4. **Image IDs**: The imageId is derived from the filename in the Azure Blob URL (UUID before the underscore)
5. **Authorization**: Make sure your API instance includes the JWT token in headers

## Integration Checklist

- [ ] Import the API functions you need
- [ ] Add file input or drag-drop UI
- [ ] Handle file selection
- [ ] Call the appropriate upload API
- [ ] Display uploaded images
- [ ] Add delete functionality
- [ ] Show loading states
- [ ] Handle errors appropriately
- [ ] Update product state after successful operations
