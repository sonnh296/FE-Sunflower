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
        <!-- Left Side - Product Images -->
        <div class="space-y-6">
          <!-- Main Image -->
          <div
            class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-pink-50/30 shadow-xl border border-gray-100 group"
          >
            <img
              :src="selectedImage || product.productItem[0]?.url || '/noavatar.png'"
              :alt="product.name"
              class="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />

            <!-- Badges -->
            <div class="absolute top-6 left-6 flex flex-col gap-2">
              <span
                v-if="product.productItem[0]?.stockQuantity > 0"
                class="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                Còn hàng
              </span>
              <span
                class="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                New Collection
              </span>
            </div>
          </div>

          <!-- Thumbnail Gallery -->
          <div class="grid grid-cols-4 gap-4" v-if="product.productItem.length > 1">
            <div
              v-for="(item, index) in product.productItem.slice(0, 4)"
              :key="index"
              @click="selectedImage = item.url"
              :class="[
                'relative overflow-hidden rounded-xl cursor-pointer border-2 transition-all duration-300',
                selectedImage === item.url
                  ? 'border-pink-500 ring-2 ring-pink-200'
                  : 'border-gray-200 hover:border-gray-300'
              ]"
            >
              <img
                :src="item.url"
                :alt="`${product.name} - ${index + 1}`"
                class="w-full h-24 object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Right Side - Product Information -->
        <div class="space-y-8">
          <!-- Product Title & Category -->
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="bg-pink-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
                {{ product.productItem[0]?.category || 'Thời Trang' }}
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              {{ product.name }}
            </h1>
            <p class="text-gray-600 text-lg leading-relaxed" v-if="product.description">
              {{ product.description }}
            </p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-4 pb-6 border-b border-gray-200">
            <span class="text-4xl font-bold text-gray-900">
              {{
                product.productItem[0]?.price
                  ? new Intl.NumberFormat('vi-VN').format(
                      parseInt(product.productItem[0].price.toString())
                    )
                  : '0'
              }}đ
            </span>
          </div>

          <!-- Available Variants -->
          <div class="space-y-6">
            <!-- Color Selection -->
            <div v-if="availableColors.length > 0">
              <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Màu sắc có sẵn
              </h3>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="color in availableColors"
                  :key="color"
                  @click="selectedColor = color"
                  :class="[
                    'px-4 py-2 rounded-xl border-2 transition-all duration-300 font-medium',
                    selectedColor === color
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  ]"
                >
                  {{ color }}
                </button>
              </div>
            </div>

            <!-- Size Selection -->
            <div v-if="availableSizes.length > 0">
              <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Kích thước
              </h3>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="size in availableSizes"
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'px-5 py-2 rounded-xl border-2 transition-all duration-300 font-medium min-w-[60px]',
                    selectedSize === size
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Gender -->
            <div v-if="product.productItem[0]?.gender">
              <h3 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Giới tính
              </h3>
              <span class="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-xl font-medium">
                {{ product.productItem[0].gender }}
              </span>
            </div>
          </div>

          <!-- Stock Information -->
          <div
            class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100"
          >
            <div class="flex items-center gap-3">
              <i class="pi pi-check-circle text-emerald-600 text-xl"></i>
              <div>
                <p class="font-semibold text-gray-900">Còn {{ totalStock }} sản phẩm</p>
                <p class="text-sm text-gray-600">Sẵn sàng giao hàng</p>
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
import { useProductStore } from '@/stores/productStore'
import type { Product, ProductItem } from '@/types/Product'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const toast = useToast()

const loading = ref(true)
const product = ref<Product | null>(null)
const selectedImage = ref<string>('')
const selectedColor = ref<string>('')
const selectedSize = ref<string>('')

// Computed properties
const availableColors = computed<string[]>(() => {
  if (!product.value) return []
  return [...new Set(product.value.productItem.map((item: ProductItem) => item.color))]
})

const availableSizes = computed<string[]>(() => {
  if (!product.value) return []
  return [...new Set(product.value.productItem.map((item: ProductItem) => item.size))]
})

const totalStock = computed(() => {
  if (!product.value) return 0
  return product.value.productItem.reduce(
    (sum: number, item: ProductItem) => sum + (item.stockQuantity || 0),
    0
  )
})

const selectedVariant = computed<ProductItem | undefined>(() => {
  if (!product.value) return undefined
  return product.value.productItem.find(
    (item: ProductItem) => item.color === selectedColor.value && item.size === selectedSize.value
  )
})

// Methods
const loadProduct = async () => {
  loading.value = true
  try {
    await productStore.getProducts()
    const productId = route.params.id as string
    product.value = productStore.products.find((p) => p.id === productId) || null

    if (product.value && product.value.productItem.length > 0) {
      selectedImage.value = product.value.productItem[0].url
      if (availableColors.value.length > 0) {
        selectedColor.value = availableColors.value[0] as string
      }
      if (availableSizes.value.length > 0) {
        selectedSize.value = availableSizes.value[0] as string
      }
    }
  } catch (error) {
    console.error('Error loading product:', error)
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
  if (!authStore.identified) {
    toast.add({
      severity: 'warn',
      summary: 'Cần đăng nhập',
      detail: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng',
      life: 3000
    })
    router.push({ name: 'login-screen' })
    return
  }

  const variant = selectedVariant.value

  if (!variant || !variant.id) {
    toast.add({
      severity: 'error',
      summary: 'Không thể thêm vào giỏ hàng',
      detail: 'Vui lòng chọn màu sắc và kích thước hợp lệ',
      life: 3000
    })
    return
  }

  const existingItem = cartStore.cartItems.find(
    (cartItem) => cartItem.productItem.id === variant.id
  )

  if (existingItem) {
    await cartStore.updateCartItem({
      cartItemId: existingItem.id,
      quantity: existingItem.quantity + 1
    })
  } else {
    await cartStore.addToCart({
      productItemId: variant.id,
      quantity: 1
    })
  }

  toast.add({
    severity: 'success',
    summary: 'Thành công',
    detail: 'Sản phẩm đã được thêm vào giỏ hàng',
    life: 3000
  })
}

onMounted(async () => {
  await Promise.all([
    loadProduct(),
    authStore.identified ? cartStore.getCart() : Promise.resolve()
  ])
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
