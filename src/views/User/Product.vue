<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8">
    <!-- Header Section -->
    <div class="max-w-7xl mx-auto px-6 mb-8">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-light text-gray-800 mb-4">
          <span class="font-serif italic">Bộ sản phẩm</span>
        </h1>
        <div
          class="w-24 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-6"
        ></div>
      </div>
    </div>

    <!-- Product Items Grid -->
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div
          v-for="item in productItemStore.productItems"
          :key="item.id"
          class="group cursor-pointer"
        >
          <!-- Product Card -->
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

              <!-- Overlay with quick actions -->
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"
              >
                <div
                  class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div class="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <i
                      class="pi pi-heart text-gray-600 hover:text-pink-500 cursor-pointer transition-colors"
                    ></i>
                  </div>
                </div>
              </div>

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
                  <h3
                    class="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors"
                  >
                    {{ item.gender }}
                  </h3>
                  <span class="text-xl font-bold text-gray-900">
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
                  class="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 rounded-xl py-3 font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                />
                <Button
                  icon="pi pi-shopping-cart"
                  @click="addToCart(item)"
                  class="bg-pink-50 hover:bg-pink-100 text-pink-700 border-0 rounded-xl p-3 transition-all duration-300 hover:shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="productItemStore.productItems.length === 0" class="text-center py-16">
        <div class="max-w-sm mx-auto">
          <i class="pi pi-box text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Chưa có sản phẩm nào</h3>
          <p class="text-gray-500">Hãy quay lại sau để khám phá những sản phẩm mới</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useProductItemStore } from '@/stores/productItemStore'
import { useCartStore } from '@/stores/cartStore'
import { useRoute } from 'vue-router'
import type { ProductItem } from '@/types/Product'
import router from '@/router'
const toast = useToast()
const productItemStore = useProductItemStore()
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const cartStore = useCartStore()
const route = useRoute()

const addToCart = (item: ProductItem) => {
  if (!authStore.identified) {
    toast.add({
      severity: 'warn',
      summary: 'Cần đăng nhập',
      detail: 'Vui lòng đăng nhập để thêm vào giỏ hàng',
      life: 3000
    })
    return
  }

  const existingItem = cartStore.cartItems.find((cartItem) => cartItem.id === item.id)

  if (existingItem) {
    existingItem.quantity += 1
    cartStore.updateCartItem({
      cartItemId: existingItem.id as string,
      quantity: existingItem.quantity
    })
  } else {
    cartStore.addToCart({
      productItemId: item.id as string,
      quantity: 1
    })
  }

  toast.add({
    severity: 'success',
    summary: 'Thêm vào giỏ hàng',
    detail: `${item.color} đã được thêm vào giỏ hàng`,
    life: 3000
  })
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
  if (!authStore.identified) {
    router.push({ name: 'guest-try-on', params: { id } })
    return
  }
  router.push({ name: 'user-try-on', params: { id } })
}

onMounted(async () => {
  await productItemStore.getProductItems(route.params.id as string)
})
</script>
