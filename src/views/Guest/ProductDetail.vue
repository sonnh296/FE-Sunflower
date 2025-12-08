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

          <!-- Product Variants (Size & Price) -->
          <div v-if="product.variants && product.variants.length > 0" class="space-y-6">
            <!-- Price Display -->
            <div
              class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100"
            >
              <div class="flex items-center gap-3">
                <i class="pi pi-tag text-pink-600 text-xl"></i>
                <div>
                  <p class="font-semibold text-gray-900 text-2xl">
                    {{ formatPrice(selectedVariant?.price || product.variants[0]?.price) }}
                  </p>
                  <p class="text-sm text-gray-600">
                    Kích cỏ: {{ selectedVariant?.size || product.variants[0]?.size }} • Còn lại:
                    {{ selectedVariant?.stock || product.variants[0]?.stock }} sản phẩm
                  </p>
                </div>
              </div>
            </div>

            <!-- Size Selection -->
            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700"> Chọn kích cỡ: </label>
              <div class="grid grid-cols-4 gap-3">
                <button
                  v-for="variant in product.variants"
                  :key="variant.id"
                  @click="selectVariant(variant)"
                  :disabled="variant.stock === 0"
                  class="relative p-3 rounded-xl border-2 transition-all duration-200 text-center"
                  :class="{
                    'border-pink-500 bg-pink-50 text-pink-900': selectedVariant?.id === variant.id,
                    'border-gray-200 bg-white text-gray-700 hover:border-gray-300':
                      selectedVariant?.id !== variant.id && variant.stock > 0,
                    'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed':
                      variant.stock === 0
                  }"
                >
                  <div class="font-semibold text-lg">{{ variant.size }}</div>
                  <div class="text-xs mt-1">{{ formatPrice(variant.price) }}</div>
                  <div
                    v-if="variant.stock === 0"
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Hết hàng</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Quantity Selection -->
            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700"> Số lượng: </label>
              <div class="flex items-center gap-3">
                <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="pi pi-minus text-sm"></i>
                </button>
                <span class="w-16 text-center text-lg font-semibold">{{ quantity }}</span>
                <button
                  @click="increaseQuantity"
                  :disabled="quantity >= (selectedVariant?.stock || 0)"
                  class="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="pi pi-plus text-sm"></i>
                </button>
                <span class="text-sm text-gray-500 ml-2">
                  Tối đa {{ selectedVariant?.stock || 0 }} sản phẩm
                </span>
              </div>
            </div>
          </div>

          <!-- No variants available -->
          <div v-else class="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div class="flex items-center gap-3">
              <i class="pi pi-exclamation-triangle text-yellow-600 text-xl"></i>
              <div>
                <p class="font-semibold text-yellow-900">Sản phẩm chưa có thông tin kích cỡ</p>
                <p class="text-sm text-yellow-800">Vui lòng liên hệ để biết thêm chi tiết.</p>
              </div>
            </div>
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
import type { Product, ProductVariant } from '@/types/Product'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const toast = useToast()

const loading = ref(true)
const product = ref<Product | null>(null)
const selectedVariant = ref<ProductVariant | null>(null)
const quantity = ref(1)

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
      selectedVariant.value = response.data.result.variants?.[0] || null
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

const addToCart = async () => {
  // Check if variant is selected
  if (!selectedVariant.value) {
    return toast.add({
      severity: 'warn',
      summary: 'Chưa chọn size',
      detail: 'Vui lòng chọn kích cỡ trước khi thêm vào giỏ hàng!',
      life: 3000
    })
  }

  // Check authentication
  if (!authStore.identified) {
    toast.add({
      severity: 'warn',
      summary: 'Cần đăng nhập',
      detail: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
      life: 3000
    })

    // Redirect to login after 1 second
    setTimeout(() => {
      router.push({ name: 'login-screen' })
    }, 1000)
    return
  }

  // Add to cart
  try {
    await cartStore.addToCart({
      cartItem: {
        quantity: quantity.value,
        productId: product.value!.id,
        productVariantId: selectedVariant.value.id
      }
    })

    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: `Đã thêm ${quantity.value} sản phẩm (${selectedVariant.value.size}) vào giỏ hàng!`,
      life: 3000
    })
  } catch (error: any) {
    console.error('Error adding to cart:', error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: error.response?.data?.message || 'Không thể thêm vào giỏ hàng. Vui lòng thử lại!',
      life: 3000
    })
  }
}

const selectVariant = (variant: ProductVariant) => {
  selectedVariant.value = variant
  quantity.value = 1 // Reset quantity when changing variant
}

const increaseQuantity = () => {
  if (quantity.value < (selectedVariant.value?.stock || 0)) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const formatPrice = (price: number) => {
  if (!price) return '0đ'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
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
