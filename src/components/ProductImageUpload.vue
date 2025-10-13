<template>
  <div class="product-image-upload">
    <h3>Upload Product Images</h3>

    <!-- Upload Multiple Images -->
    <div class="upload-section">
      <h4>Upload Multiple Images</h4>
      <input
        ref="multipleFileInput"
        type="file"
        multiple
        accept="image/*"
        @change="handleMultipleFileSelect"
      />
      <button @click="uploadMultipleImages" :disabled="isUploading || selectedFiles.length === 0">
        {{ isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Image(s)` }}
      </button>
    </div>

    <!-- Upload Single Image -->
    <div class="upload-section">
      <h4>Upload Single Image</h4>
      <input ref="singleFileInput" type="file" accept="image/*" @change="handleSingleFileSelect" />
      <button @click="uploadSingleImage" :disabled="isUploading || !selectedSingleFile">
        {{ isUploading ? 'Uploading...' : 'Upload Single Image' }}
      </button>
    </div>

    <!-- Display Current Images -->
    <div v-if="product?.imageUrls && product.imageUrls.length > 0" class="image-gallery">
      <h4>Current Images</h4>
      <div class="image-grid">
        <div v-for="(imageUrl, index) in product.imageUrls" :key="index" class="image-item">
          <img :src="imageUrl" :alt="`Product ${index + 1}`" />
          <button @click="deleteImage(imageUrl)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>

    <!-- Status Messages -->
    <div v-if="statusMessage" :class="['status-message', statusType]">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { Product } from '@/types/Product'
import {
  uploadProductImagesApi,
  uploadProductSingleImageApi,
  deleteProductImageApi,
  getProductByIdApi
} from '@/api/productApi'

const props = defineProps({
  productId: {
    type: String,
    required: true
  },
  initialProduct: {
    type: Object as PropType<Product>,
    default: null
  }
})

const emit = defineEmits<{
  productUpdated: [product: Product]
}>()

const product = ref<Product | null>(props.initialProduct)
const selectedFiles = ref<File[]>([])
const selectedSingleFile = ref<File | null>(null)
const isUploading = ref(false)
const statusMessage = ref('')
const statusType = ref<'success' | 'error'>('success')

const multipleFileInput = ref<HTMLInputElement | null>(null)
const singleFileInput = ref<HTMLInputElement | null>(null)

const handleMultipleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    selectedFiles.value = Array.from(target.files)
  }
}

const handleSingleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedSingleFile.value = target.files[0]
  }
}

const uploadMultipleImages = async () => {
  if (selectedFiles.value.length === 0) return

  isUploading.value = true
  statusMessage.value = ''

  try {
    const response = await uploadProductImagesApi({
      productId: props.productId,
      images: selectedFiles.value
    })

    if (response.data.result) {
      product.value = response.data.result
      emit('productUpdated', response.data.result)
      statusMessage.value = `Successfully uploaded ${selectedFiles.value.length} image(s)!`
      statusType.value = 'success'

      // Reset file input
      selectedFiles.value = []
      if (multipleFileInput.value) {
        multipleFileInput.value.value = ''
      }
    }
  } catch (error: any) {
    statusMessage.value = error.response?.data?.message || 'Failed to upload images'
    statusType.value = 'error'
    console.error('Error uploading images:', error)
  } finally {
    isUploading.value = false
  }
}

const uploadSingleImage = async () => {
  if (!selectedSingleFile.value) return

  isUploading.value = true
  statusMessage.value = ''

  try {
    const response = await uploadProductSingleImageApi({
      productId: props.productId,
      image: selectedSingleFile.value
    })

    if (response.data.result) {
      product.value = response.data.result
      emit('productUpdated', response.data.result)
      statusMessage.value = 'Successfully uploaded image!'
      statusType.value = 'success'

      // Reset file input
      selectedSingleFile.value = null
      if (singleFileInput.value) {
        singleFileInput.value.value = ''
      }
    }
  } catch (error: any) {
    statusMessage.value = error.response?.data?.message || 'Failed to upload image'
    statusType.value = 'error'
    console.error('Error uploading image:', error)
  } finally {
    isUploading.value = false
  }
}

const deleteImage = async (imageUrl: string) => {
  if (!confirm('Are you sure you want to delete this image?')) return

  // Extract image ID from URL (last part of the path before the filename)
  const urlParts = imageUrl.split('/')
  const filename = urlParts[urlParts.length - 1]
  const imageId = filename.split('_')[0] // Assuming format: uuid_filename.jpg

  isUploading.value = true
  statusMessage.value = ''

  try {
    const response = await deleteProductImageApi(props.productId, imageId)

    if (response.data.result) {
      product.value = response.data.result
      emit('productUpdated', response.data.result)
      statusMessage.value = 'Successfully deleted image!'
      statusType.value = 'success'
    }
  } catch (error: any) {
    statusMessage.value = error.response?.data?.message || 'Failed to delete image'
    statusType.value = 'error'
    console.error('Error deleting image:', error)
  } finally {
    isUploading.value = false
  }
}

// Fetch product data if not provided initially
const fetchProduct = async () => {
  try {
    const response = await getProductByIdApi(props.productId)
    if (response.data.result) {
      product.value = response.data.result
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}

// Fetch product on mount if not provided
if (!product.value) {
  fetchProduct()
}
</script>

<style scoped>
.product-image-upload {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h3 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

h4 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
}

.upload-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.upload-section input[type='file'] {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
}

.upload-section button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.upload-section button:hover:not(:disabled) {
  background-color: #45a049;
}

.upload-section button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.image-gallery {
  margin-top: 30px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.image-item {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.image-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  background-color: #da190b;
}

.status-message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  font-weight: 500;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
