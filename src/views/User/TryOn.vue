<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-light text-gray-800 mb-4">
          <span
            class="font-serif italic bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            AI Virtual Try-On
          </span>
        </h1>
        <div
          class="w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-6"
        ></div>
        <p class="text-gray-600 text-lg font-light max-w-2xl mx-auto">
          Trải nghiệm công nghệ thử đồ ảo hiện đại. Xem bạn trông như thế nào với sản phẩm yêu thích
          chỉ trong vài giây.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loadingProduct" class="flex justify-center items-center py-20">
        <i class="pi pi-spin pi-spinner text-4xl text-purple-500"></i>
      </div>

      <!-- Main Try-On Interface -->
      <div
        v-else-if="product"
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
      >
        <div class="p-8 md:p-12">
          <!-- When no image is uploaded, show the original layout -->
          <div v-if="!selectedImgTemp" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <!-- Step 1: Product Display with Image Selection -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                >
                  1
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Chọn ảnh sản phẩm</h3>
              </div>

              <!-- Selected Product Image -->
              <div class="relative group">
                <div
                  class="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-8 border border-gray-200/50 shadow-sm"
                >
                  <!-- Decorative corner -->
                  <div
                    class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-100 to-transparent opacity-60 rounded-tr-2xl"
                  ></div>

                  <div class="flex justify-center">
                    <div class="relative">
                      <Image
                        :src="selectedProductImage"
                        :alt="product.name"
                        width="280"
                        height="280"
                        preview
                        class="rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                        :previewImageStyle="{
                          maxWidth: '90vw',
                          maxHeight: '80vh',
                          objectFit: 'contain'
                        }"
                      />
                      <!-- Product name badge -->
                      <div
                        class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg whitespace-nowrap"
                      >
                        {{ product.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Image Thumbnails Selection -->
              <div v-if="product.imageUrls && product.imageUrls.length > 1" class="space-y-3">
                <p class="text-sm font-medium text-gray-700 text-center">
                  Chọn ảnh sản phẩm khác ({{ product.imageUrls.length }} ảnh)
                </p>
                <div class="grid grid-cols-4 gap-3">
                  <button
                    v-for="(imageUrl, index) in product.imageUrls"
                    :key="index"
                    @click="selectedProductImage = imageUrl"
                    :class="[
                      'relative overflow-hidden rounded-lg transition-all duration-300 border-2',
                      selectedProductImage === imageUrl
                        ? 'border-purple-500 ring-2 ring-purple-200 scale-105'
                        : 'border-gray-200 hover:border-purple-300 hover:scale-105'
                    ]"
                  >
                    <img
                      :src="imageUrl"
                      :alt="`${product.name} - ${index + 1}`"
                      class="w-full h-20 object-cover"
                    />
                    <!-- Selected indicator -->
                    <div
                      v-if="selectedProductImage === imageUrl"
                      class="absolute top-1 right-1 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      <i class="pi pi-check text-xs"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 2: User Image Upload -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                >
                  2
                </div>
                <h3 class="text-xl font-semibold text-gray-800">Tải ảnh của bạn</h3>
              </div>

              <!-- Upload Area -->
              <div class="relative">
                <div
                  class="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-8 border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors duration-300"
                >
                  <div class="text-center space-y-4">
                    <div
                      class="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center"
                    >
                      <i class="pi pi-upload text-2xl text-purple-600"></i>
                    </div>

                    <FileUpload
                      mode="basic"
                      name="demo[]"
                      :showUploadButton="false"
                      accept="image/png, image/jpeg"
                      :maxFileSize="10000000"
                      @select="onImageSelect"
                      class="custom-file-upload"
                    />

                    <p class="text-sm text-gray-600">Chọn ảnh của bạn (PNG, JPEG tối đa 10MB)</p>
                    <p class="text-xs text-gray-500">
                      Lưu ý: Chọn ảnh toàn thân để có kết quả tốt nhất
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- When image is uploaded, show both images in a row -->
          <div v-else class="space-y-8">
            <div class="text-center">
              <h3 class="text-2xl font-semibold text-gray-800 mb-2">Hình ảnh đã chuẩn bị</h3>
              <p class="text-gray-600">Sản phẩm và ảnh của bạn đã sẵn sàng để thử đồ</p>
            </div>

            <!-- Images in a row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <!-- Product Image -->
              <div class="space-y-4">
                <div class="flex items-center space-x-3 justify-center">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    1
                  </div>
                  <h4 class="text-lg font-semibold text-gray-800">Sản phẩm</h4>
                </div>

                <div class="relative group">
                  <div
                    class="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-6 border border-gray-200/50 shadow-sm"
                  >
                    <div class="flex justify-center">
                      <div class="relative">
                        <Image
                          :src="selectedProductImage"
                          :alt="product.name"
                          width="240"
                          height="240"
                          preview
                          class="rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                          :previewImageStyle="{
                            maxWidth: '90vw',
                            maxHeight: '80vh',
                            objectFit: 'contain'
                          }"
                        />
                        <!-- Product name badge -->
                        <div
                          class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg whitespace-nowrap"
                        >
                          {{ product.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- User Image -->
              <div class="space-y-4">
                <div class="flex items-center space-x-3 justify-center">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    2
                  </div>
                  <h4 class="text-lg font-semibold text-gray-800">Ảnh của bạn</h4>
                </div>

                <div class="relative group">
                  <div
                    class="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-6 border border-gray-200/50 shadow-sm"
                  >
                    <div class="flex justify-center">
                      <div class="relative">
                        <Image
                          :src="selectedImgTemp"
                          alt="Ảnh đã chọn"
                          preview
                          width="240"
                          height="240"
                          class="rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                          :previewImageStyle="{ objectFit: 'cover' }"
                        />
                        <!-- Success checkmark -->
                        <div
                          class="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          <i class="pi pi-check text-xs"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Change Image Button -->
            <div class="flex justify-center">
              <div class="relative">
                <div
                  class="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-6 border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors duration-300"
                >
                  <div class="text-center space-y-3">
                    <div
                      class="mx-auto w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center"
                    >
                      <i class="pi pi-refresh text-lg text-purple-600"></i>
                    </div>

                    <FileUpload
                      mode="basic"
                      name="demo[]"
                      :showUploadButton="false"
                      accept="image/png, image/jpeg"
                      :maxFileSize="1000000"
                      @select="onImageSelect"
                      class="custom-file-upload-small"
                      chooseLabel="Đổi ảnh khác"
                    />

                    <p class="text-xs text-gray-600">Chọn ảnh khác nếu muốn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Generate Button -->
          <div class="flex justify-center mt-12">
            <button
              @click="generateImage"
              :disabled="!selectedImage || tryOnStore.generating"
              class="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <span class="flex items-center space-x-3">
                <i class="pi pi-sparkles text-lg"></i>
                <span class="text-lg">
                  {{ tryOnStore.generating ? 'Đang tạo ma thuật...' : 'Tạo ảnh thử đồ' }}
                </span>
              </span>

              <!-- Loading animation -->
              <div
                v-if="tryOnStore.generating"
                class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                ></div>
              </div>
            </button>
          </div>

          <!-- Progress Bar -->
          <div v-if="tryOnStore.generating" class="mt-6">
            <ProgressBar
              mode="indeterminate"
              style="height: 6px"
              class="rounded-full overflow-hidden"
            />
            <p class="text-center text-sm text-gray-600 mt-2">
              AI đang xử lý ảnh của bạn, vui lòng đợi...
            </p>
          </div>
        </div>
      </div>

      <!-- Step 3: Result Section -->
      <div
        v-if="generatedImageUrl"
        class="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden animate-fade-in"
      >
        <div class="p-8 md:p-12">
          <div class="text-center space-y-6">
            <div class="flex items-center justify-center space-x-3 mb-8">
              <div
                class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold"
              >
                3
              </div>
              <h3 class="text-2xl font-semibold text-gray-800">Kết quả tuyệt vời!</h3>
            </div>

            <div class="flex justify-center">
              <div class="relative group">
                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 shadow-lg">
                  <!-- Celebration sparkles -->
                  <div class="absolute -top-2 -left-2 text-yellow-400 animate-pulse">
                    <i class="pi pi-star-fill text-sm"></i>
                  </div>
                  <div class="absolute -top-1 -right-3 text-yellow-400 animate-pulse delay-150">
                    <i class="pi pi-star-fill text-xs"></i>
                  </div>
                  <div class="absolute -bottom-2 -left-1 text-yellow-400 animate-pulse delay-300">
                    <i class="pi pi-star-fill text-sm"></i>
                  </div>

                  <Image
                    :src="generatedImageUrl"
                    alt="Kết quả thử đồ"
                    width="320"
                    height="320"
                    preview
                    class="rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                    :previewImageStyle="{ maxHeight: '80vh', objectFit: 'contain' }"
                  />
                </div>
              </div>
            </div>

            <p class="text-gray-600 text-lg max-w-md mx-auto">
              Tuyệt vời! Đây là kết quả thử đồ ảo của bạn. Bạn có thích không?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRoute } from 'vue-router'
import { useTryOnStore } from '@/stores/tryOnStore'
import { getProductByIdApi } from '@/api/productApi'
import type { Product } from '@/types/Product'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Image from 'primevue/image'
import ProgressBar from 'primevue/progressbar'

const toast = useToast()
const route = useRoute()
const tryOnStore = useTryOnStore()

const loadingProduct = ref(true)
const product = ref<Product | null>(null)
const selectedProductImage = ref<string>('')
const selectedImgTemp = ref<string>('')
const selectedImage = ref<File>()
const generatedImageUrl = ref<string>('')

const generateImage = async () => {
  if (!selectedImage.value || !selectedProductImage.value) return

  try {
    const response = await tryOnStore.generateImage(
      selectedImage.value,
      selectedProductImage.value.replace('http://', 'https://')
    )
    generatedImageUrl.value = response.imageUrl

    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã tạo ảnh thử đồ thành công!',
      life: 3000
    })
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể tạo ảnh thử đồ. Vui lòng thử lại!',
      life: 3000
    })
  }
}

const onImageSelect = (event: FileUploadSelectEvent) => {
  selectedImage.value = event.files[event.files.length - 1]
  selectedImgTemp.value = URL.createObjectURL(event.files[event.files.length - 1])
}

const loadProduct = async () => {
  loadingProduct.value = true
  try {
    const productId = route.params.id as string
    const response = await getProductByIdApi(productId)

    if (response.data.code === 1000 && response.data.result) {
      product.value = response.data.result

      // Set the first image as default selected image
      if (product.value.imageUrls && product.value.imageUrls.length > 0) {
        selectedProductImage.value = product.value.imageUrls[0]
      }
    } else {
      toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể tải thông tin sản phẩm',
        life: 3000
      })
    }
  } catch (error) {
    console.error('Error loading product:', error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể tải thông tin sản phẩm',
      life: 3000
    })
  } finally {
    loadingProduct.value = false
  }
}

onMounted(async () => {
  await loadProduct()
})
</script>

<style scoped>
/* Custom file upload styling */
:deep(.custom-file-upload .p-fileupload-choose) {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.3s ease;
}

:deep(.custom-file-upload .p-fileupload-choose:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

/* Smaller file upload styling for change image */
:deep(.custom-file-upload-small .p-fileupload-choose) {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
}

:deep(.custom-file-upload-small .p-fileupload-choose:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

/* Loading shimmer effect */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

/* Progress bar styling */
:deep(.p-progressbar) {
  background: linear-gradient(90deg, #f3e8ff 0%, #fce7f3 100%);
}

:deep(.p-progressbar .p-progressbar-value) {
  background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%);
}

/* Hover effects for images */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Custom animations for stars */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-150 {
  animation-delay: 150ms;
}

.delay-300 {
  animation-delay: 300ms;
}
</style>
