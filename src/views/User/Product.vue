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
            <!-- Simplified Add to Cart button -->
            <Button
              icon="pi pi-shopping-cart"
              label="Thêm vào giỏ hàng"
              class="w-full !bg-gradient-to-r !from-green-500 !to-emerald-500 hover:!from-green-600 hover:!to-emerald-600 !text-white !border-0 !font-semibold !py-4 !text-lg !rounded-2xl !shadow-xl hover:!shadow-2xl !transition-all !duration-300 hover:!scale-105"
              @click="addProductToCart"
            />
            <!-- Info text about automatic selection -->
            <p v-if="productItemStore.productItems.length > 0" class="text-sm text-gray-500 text-center">
              Sản phẩm sẽ được thêm tự động với size/màu mặc định
            </p>
            <Button
              v-if="productItemStore.productItems.length > 0"
              icon="pi pi-eye"
              label="Xem tất cả size và màu sắc"
              class="w-full !bg-gray-100 hover:!bg-gray-200 !text-gray-700 !border-0 !font-medium !py-3 !text-base !rounded-2xl !transition-all !duration-300"
              @click="viewProductItems"
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
          @click="router.push({ name: 'user-home' })"
        />
      </div>

      <!-- Product Items Section (Variants) -->
      <div v-if="product && productItemStore.productItems.length > 0" class="mt-16" id="product-items-section">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
            Các phiên bản sản phẩm
          </h2>
          <div class="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
          <p class="text-gray-600 text-lg font-light">
            Chọn size và màu sắc phù hợp với bạn
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="item in productItemStore.productItems"
            :key="item.id"
            class="group cursor-pointer"
          >
            <!-- Product Item Card -->
            <div
              class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
            >
              <!-- Image Container -->
              <div class="relative overflow-hidden bg-gradient-to-br from-white to-pink-50/30">
                <img
                  :src="item.url"
                  :alt="item.color"
                  class="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />

                <!-- Stock indicator -->
                <div class="absolute bottom-4 left-4">
                  <span
                    class="bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm"
                  >
                    Còn {{ item.stockQuantity }} sản phẩm
                  </span>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-6">
                <div class="mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-800">
                      {{ item.gender }}
                    </h3>
                    <span class="text-xl font-bold text-pink-600">
                      {{ new Intl.NumberFormat('vi-VN').format(parseInt(item.price.toString())) }}₫
                    </span>
                  </div>

                  <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <span class="flex items-center">
                      <i class="pi pi-tag mr-1"></i>
                      Size {{ item.size }}
                    </span>
                    <span class="flex items-center">
                      <div
                        class="w-3 h-3 rounded-full border border-gray-300 mr-1"
                        :style="{ backgroundColor: item.color }"
                      ></div>
                      {{ item.color }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-3">
                  <Button
                    icon="pi pi-sparkles"
                    label="Thử đồ"
                    @click="routeToTryOn(item.id as string)"
                    class="flex-1 !bg-gradient-to-r !from-pink-500 !to-rose-500 hover:!from-pink-600 hover:!to-rose-600 !text-white !border-0 !rounded-xl !py-3 !font-medium !transition-all !duration-300 hover:!shadow-lg hover:!-translate-y-0.5"
                  />
                  <Button
                    icon="pi pi-shopping-cart"
                    @click="addToCart(item)"
                    class="!bg-pink-50 hover:!bg-pink-100 !text-pink-700 !border-0 !rounded-xl !p-3 !transition-all !duration-300 hover:!shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Variant Selection Dialog -->
  <Dialog
    v-model:visible="showVariantDialog"
    modal
    :header="`Chọn phiên bản - ${product?.name}`"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="space-y-6">
      <!-- Variant Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        <div
          v-for="item in productItemStore.productItems"
          :key="item.id"
          @click="selectedVariant = item"
          :class="[
            'border-2 rounded-xl p-4 cursor-pointer transition-all duration-300',
            selectedVariant?.id === item.id
              ? 'border-pink-500 bg-pink-50'
              : 'border-gray-200 hover:border-pink-300'
          ]"
        >
          <div class="flex gap-4">
            <img
              :src="item.url"
              :alt="item.color"
              class="w-20 h-20 object-contain rounded-lg"
            />
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-gray-900">{{ item.gender }}</h4>
                <span class="text-lg font-bold text-pink-600">
                  {{ new Intl.NumberFormat('vi-VN').format(parseInt(item.price.toString())) }}₫
                </span>
              </div>
              <div class="space-y-1 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <i class="pi pi-tag text-xs"></i>
                  <span>Size: {{ item.size }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <div
                    class="w-3 h-3 rounded-full border border-gray-300"
                    :style="{ backgroundColor: item.color }"
                  ></div>
                  <span>{{ item.color }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="pi pi-box text-xs"></i>
                  <span>Còn {{ item.stockQuantity }} sản phẩm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quantity Selector -->
      <div v-if="selectedVariant" class="border-t pt-6">
        <label class="block text-sm font-semibold text-gray-900 mb-3">Số lượng:</label>
        <div class="flex items-center gap-4">
          <Button
            icon="pi pi-minus"
            @click="quantity = Math.max(1, quantity - 1)"
            class="!bg-gray-100 hover:!bg-gray-200 !text-gray-700 !border-0 !rounded-lg !w-10 !h-10"
            :disabled="quantity <= 1"
          />
          <input
            v-model.number="quantity"
            type="number"
            min="1"
            :max="selectedVariant.stockQuantity"
            class="w-20 text-center border-2 border-gray-300 rounded-lg py-2 font-semibold text-gray-900"
          />
          <Button
            icon="pi pi-plus"
            @click="quantity = Math.min(selectedVariant.stockQuantity, quantity + 1)"
            class="!bg-gray-100 hover:!bg-gray-200 !text-gray-700 !border-0 !rounded-lg !w-10 !h-10"
            :disabled="quantity >= selectedVariant.stockQuantity"
          />
          <span class="text-sm text-gray-600">
            (Tối đa: {{ selectedVariant.stockQuantity }})
          </span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <Button
          label="Hủy"
          icon="pi pi-times"
          @click="showVariantDialog = false"
          class="!bg-gray-100 hover:!bg-gray-200 !text-gray-700 !border-0 !rounded-xl"
        />
        <Button
          label="Thêm vào giỏ hàng"
          icon="pi pi-shopping-cart"
          @click="addSelectedVariantToCart"
          :disabled="!selectedVariant"
          class="!bg-gradient-to-r !from-pink-500 !to-rose-500 hover:!from-pink-600 hover:!to-rose-600 !text-white !border-0 !rounded-xl"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Galleria from 'primevue/galleria'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import { getProductByIdApi } from '@/api/productApi'
import { useProductItemStore } from '@/stores/productItemStore'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import type { Product, ProductItem } from '@/types/Product'
import { debugAuthState } from '@/utils/debugAuth'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY } from '@/constants/storage'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const productItemStore = useProductItemStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const loading = ref(true)
const product = ref<Product | null>(null)
const showVariantDialog = ref(false)
const selectedVariant = ref<ProductItem | null>(null)
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
      // Also load product items/variants
      try {
        await productItemStore.getProductItems(productId)
        console.log('Product items loaded:', productItemStore.productItems.length)
      } catch (error) {
        console.error('Error loading product items:', error)
        // Continue even if product items fail to load
      }
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
    router.push({ name: 'user-try-on', params: { id: product.value.id } })
  }
}

const viewProductItems = () => {
  // Scroll to product items section
  const element = document.querySelector('#product-items-section')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const openAddToCartDialog = async () => {
  // First check if we're still loading product items
  if (productItemStore.loading) {
    toast.add({
      severity: 'info',
      summary: 'Đang tải',
      detail: 'Đang tải thông tin sản phẩm, vui lòng đợi...',
      life: 2000
    })
    return
  }

  // If no product items, try loading them again
  if (productItemStore.productItems.length === 0 && product.value?.id) {
    toast.add({
      severity: 'info',
      summary: 'Đang tải',
      detail: 'Đang tải các phiên bản sản phẩm...',
      life: 2000
    })

    try {
      await productItemStore.getProductItems(product.value.id)
      console.log('Reloaded product items:', productItemStore.productItems.length)

      if (productItemStore.productItems.length === 0) {
        toast.add({
          severity: 'warn',
          summary: 'Chưa có phiên bản',
          detail: 'Sản phẩm này chưa có phiên bản để thêm vào giỏ hàng. Vui lòng liên hệ quản trị viên.',
          life: 5000
        })
        return
      }
    } catch (error) {
      console.error('Error reloading product items:', error)
      toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể tải thông tin sản phẩm. Vui lòng thử lại!',
        life: 3000
      })
      return
    }
  }

  showVariantDialog.value = true
}

const addToCart = async (item: ProductItem) => {
  if (!authStore.identified) {
    toast.add({
      severity: 'warn',
      summary: 'Cần đăng nhập',
      detail: 'Vui lòng đăng nhập để thêm vào giỏ hàng',
      life: 3000
    })
    return
  }

  try {
    await cartStore.addToCart({
      productItemId: item.id as string,
      quantity: 1
    })

    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: `Đã thêm ${item.color} - Size ${item.size} vào giỏ hàng`,
      life: 3000
    })
  } catch (error) {
    console.error('Error adding to cart:', error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể thêm vào giỏ hàng. Vui lòng thử lại!',
      life: 3000
    })
  }
}

const addProductToCart = async () => {
  console.log('=== Add Product To Cart Debug ===')
  debugAuthState()
  console.log('authStore.identified:', authStore.identified)
  console.log('authStore.identity:', authStore.identity)

  const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
  console.log('Access Token from Cookies:', accessToken)
  console.log('Product ID:', product.value?.id)

  // Check both authStore.identified AND access token (for redundancy)
  if (!authStore.identified && !accessToken) {
    toast.add({
      severity: 'warn',
      summary: 'Cần đăng nhập',
      detail: 'Vui lòng đăng nhập để thêm vào giỏ hàng',
      life: 3000
    })
    return
  }

  // If we have a token but identified is false, try to initialize auth
  if (accessToken && !authStore.identified) {
    console.log('Token exists but not identified, initializing auth...')
    try {
      await authStore.initializeAuth()
    } catch (error) {
      console.error('Failed to initialize auth:', error)
    }
  }

  if (!product.value?.id) {
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không tìm thấy thông tin sản phẩm!',
      life: 3000
    })
    return
  }

  try {
    console.log('Adding PRODUCT directly to cart with productId:', product.value.id)

    toast.add({
      severity: 'info',
      summary: 'Đang thêm sản phẩm',
      detail: 'Đang thêm sản phẩm vào giỏ hàng...',
      life: 2000
    })

    // NEW: Send productId instead of productItemId
    const result = await cartStore.addToCart({
      productId: product.value.id, // Send PRODUCT ID, not product item ID!
      quantity: 1
    })

    console.log('Cart API response:', result)
    console.log('Successfully added product to cart!')

    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: `Đã thêm "${product.value.name}" vào giỏ hàng`,
      life: 3000
    })
  } catch (error: any) {
    console.error('Error adding product to cart:', error)
    console.error('Error response:', error.response?.data)
    console.error('Error status:', error.response?.status)

    let errorMessage = 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!'

    if (error.response?.status === 401) {
      errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!'
      setTimeout(() => {
        authStore.logout()
      }, 2000)
    } else if (error.response?.status === 400) {
      errorMessage = error.response?.data?.message || 'Yêu cầu không hợp lệ. Vui lòng thử lại!'
    } else if (error.response?.status === 404) {
      errorMessage = 'Không tìm thấy sản phẩm!'
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    }

    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: errorMessage,
      life: 5000
    })
  }
}

const addSelectedVariantToCart = async () => {
  if (!selectedVariant.value) {
    toast.add({
      severity: 'warn',
      summary: 'Chưa chọn phiên bản',
      detail: 'Vui lòng chọn một phiên bản sản phẩm',
      life: 3000
    })
    return
  }

  if (!authStore.identified) {
    toast.add({
      severity: 'warn',
      summary: 'Cần đăng nhập',
      detail: 'Vui lòng đăng nhập để thêm vào giỏ hàng',
      life: 3000
    })
    return
  }

  try {
    await cartStore.addToCart({
      productItemId: selectedVariant.value.id as string,
      quantity: quantity.value
    })

    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: `Đã thêm ${quantity.value} sản phẩm vào giỏ hàng`,
      life: 3000
    })

    // Reset and close dialog
    showVariantDialog.value = false
    selectedVariant.value = null
    quantity.value = 1
  } catch (error) {
    console.error('Error adding to cart:', error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể thêm vào giỏ hàng. Vui lòng thử lại!',
      life: 3000
    })
  }
}

const routeToTryOn = (id: string) => {
  if (!id) {
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không tìm thấy sản phẩm để thử đồ',
      life: 3000
    })
    return
  }
  router.push({ name: 'user-try-on', params: { id } })
}

onMounted(() => {
  loadProduct()
})
</script>

<style scoped>
/* Custom styles for the product detail page */
</style>
