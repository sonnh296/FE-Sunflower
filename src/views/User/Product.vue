<template>
  <div class="mx-20">
    <!-- Product Items List -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Các mẫu sản phẩm</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in productItemStore.productItems"
          :key="item.id"
          class="border rounded-lg p-4 hover:shadow-lg transition"
        >
          <img
            :src="item.url"
            :alt="item.color"
            class="w-full h-48 object-contain rounded-md mb-3"
          />

          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold">{{ item.gender }}</h3>
            <span class="text-lg font-bold text-green-600">{{ item.price }}đ</span>
          </div>

          <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ item.size }}</p>

          <div class="flex items-center">
            <span class="mr-2">Kho:</span>
            <span class="mr-2">{{ item.stockQuantity }}</span>
          </div>
          <div class="flex items-center justify-between">
            <Button
              icon="pi pi-sparkles"
              label="Thử đồ"
              @click="routeToTryOn(item.id as string)"
              class="p-button-success w-32 bg-gradient-to-br from-primary to-blue-700 hover:from-blue-700 hover:to-primary text-white border-none cursor-pointer transition-allwhite"
            />
            <Button
              icon="pi pi-shopping-cart"
              label="Thêm"
              @click="addToCart(item)"
              class="p-button-success w-32"
            />
          </div>
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
const cartStore = useCartStore()
const route = useRoute()

const addToCart = (item: ProductItem) => {
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
  router.push({ name: 'user-try-on', params: { id } })
}

onMounted(async () => {
  await productItemStore.getProductItems(route.params.id as string)
})
</script>
