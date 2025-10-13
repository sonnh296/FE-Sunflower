<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
      <!-- Back Button -->
      <button
        @click="router.back()"
        class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
      >
        <i class="pi pi-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        <span class="font-medium">Quay lại</span>
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <i class="pi pi-spin pi-spinner text-4xl text-pink-500"></i>
      </div>

      <!-- Product Detail -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left Side - Product Images Carousel -->
        <div class="space-y-6">
          <!-- Image Carousel -->
          <div v-if="product.imageUrls && product.imageUrls.length > 0">
            <Galleria
              :value="galleryImages"
              :numVisible="5"
              :circular="true"
              :showItemNavigators="true"
              :showThumbnails="true"
              :showIndicators="true"
              :changeItemOnIndicatorHover="true"
              containerClass="rounded-3xl shadow-xl overflow-hidden"
              :pt="{
                root: { class: 'rounded-3xl' },
                content: { class: 'rounded-3xl' },
                itemsContainer: { class: 'rounded-3xl' }
              }"
            >
              <template #item="slotProps">
                <div
                  class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-pink-50/30"
                >
                  <img
                    :src="slotProps.item.itemImageSrc"
                    :alt="slotProps.item.alt"
                    class="w-full h-[500px] object-cover"
                  />

                  <!-- Badges -->
                  <div class="absolute top-6 left-6 flex flex-col gap-2">
                    <span
                      class="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                    >
                      New Collection
                    </span>
                  </div>
                </div>
              </template>

              <template #thumbnail="slotProps">
                <img
                  :src="slotProps.item.thumbnailImageSrc"
                  :alt="slotProps.item.alt"
                  class="w-full h-20 object-cover rounded-lg"
                />
              </template>
            </Galleria>
          </div>

          <!-- Fallback if no images -->
          <div
            v-else
            class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-pink-50/30 shadow-xl border border-gray-100"
          >
            <img src="/noavatar.png" :alt="product.name" class="w-full h-[500px] object-cover" />
          </div>
        </div>

        <!-- Right Side - Product Information -->
        <div class="space-y-8">
          <!-- Product Title & Category -->
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
                Thời Trang
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              {{ product.name }}
            </h1>
            <p class="text-gray-600 text-lg leading-relaxed" v-if="product.description">
              {{ product.description }}
            </p>
          </div>

          <!-- Image Count Info -->
          <div
            class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
          >
            <div class="flex items-center gap-3">
              <i class="pi pi-images text-blue-600 text-xl"></i>
              <div>
                <p class="font-semibold text-gray-900">
                  {{ product.imageUrls?.length || 0 }} hình ảnh sản phẩm
                </p>
                <p class="text-sm text-gray-600">Xem chi tiết từ nhiều góc độ</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-4 pt-6">
            <Button
              icon="pi pi-sparkles"
              label="Thử đồ với AI"
              class="w-full !bg-gradient-to-r !from-pink-500 !via-purple-500 !to-indigo-500 hover:!from-pink-600 hover:!via-purple-600 hover:!to-indigo-600 !text-white !border-0 !font-semibold !py-4 !text-lg !rounded-2xl !shadow-xl hover:!shadow-2xl !transition-all !duration-300 hover:!scale-105 hover:!-translate-y-1"
              @click="goToTryOn"
            />
            <Button
              icon="pi pi-shopping-cart"
              label="Thêm vào giỏ hàng"
              class="w-full !bg-white hover:!bg-gray-50 !text-gray-900 !border-2 !border-gray-200 hover:!border-gray-300 !font-semibold !py-4 !text-lg !rounded-2xl !transition-all !duration-300"
              @click="addToCart"
            />
          </div>

          <!-- Product Features -->
          <div class="grid grid-cols-2 gap-4 pt-6">
            <div class="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <i class="pi pi-truck text-pink-500 text-2xl"></i>
              <div>
                <p class="font-semibold text-sm text-gray-900">Miễn phí vận chuyển</p>
                <p class="text-xs text-gray-600">Đơn từ 300.000đ</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <i class="pi pi-refresh text-pink-500 text-2xl"></i>
              <div>
                <p class="font-semibold text-sm text-gray-900">Đổi trả dễ dàng</p>
                <p class="text-xs text-gray-600">Trong vòng 7 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product not found -->
      <div v-else class="text-center py-20">
        <i class="pi pi-exclamation-circle text-6xl text-gray-400 mb-4"></i>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Không tìm thấy sản phẩm</h2>
        <p class="text-gray-600 mb-6">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Button
          label="Quay về trang chủ"
          icon="pi pi-home"
          class="!bg-pink-500 hover:!bg-pink-600 !text-white !border-0 !rounded-xl"
          @click="router.push({ name: 'guest-home' })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Galleria from 'primevue/galleria'
import { getProductByIdApi } from '@/api/productApi'
import type { Product } from '@/types/Product'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const product = ref<Product | null>(null)

// Computed property for gallery images
const galleryImages = computed(() => {
  if (!product.value?.imageUrls || product.value.imageUrls.length === 0) {
    return []
  }

  return product.value.imageUrls.map((url, index) => ({
    itemImageSrc: url,
    thumbnailImageSrc: url,
    alt: `${product.value?.name} - Image ${index + 1}`
  }))
})

// Methods
const loadProduct = async () => {
  loading.value = true
  try {
    const productId = route.params.id as string
    const response = await getProductByIdApi(productId)

    if (response.data.code === 1000 && response.data.result) {
      product.value = response.data.result
    } else {
      product.value = null
    }
  } catch (error) {
    console.error('Error loading product:', error)
    product.value = null
  } finally {
    loading.value = false
  }
}

const goToTryOn = () => {
  if (product.value?.id) {
    router.push({ name: 'guest-try-on', params: { id: product.value.id } })
  }
}

const addToCart = () => {
  // Add to cart logic here
  console.log('Add to cart:', {
    product: product.value
  })
  // You can implement your cart store logic here
  alert('Đã thêm vào giỏ hàng!')
}

onMounted(() => {
  loadProduct()
})
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
</style>
