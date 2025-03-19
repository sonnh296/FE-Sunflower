<template>
  <div class="mx-20">
    <!-- Product Items List -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Sản phẩm</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in productItemStore.productItems"
          :key="item.id"
          class="border rounded-lg p-4 hover:shadow-lg transition"
        >
          <img :src="item.url" :alt="item.color" class="w-full h-48 object-cover rounded-md mb-3" />

          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold">{{ item.gender }}</h3>
            <span class="text-lg font-bold text-green-600">${{ item.price }}</span>
          </div>

          <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ item.size }}</p>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="mr-2">Số lượng:</span>
              <input
                type="number"
                v-model="item.stockQuantity"
                min="1"
                class="w-16 px-2 py-1 border rounded"
              />
            </div>

            <Button
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              @click="addToCart(item)"
              class="p-button-success"
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
    summary: 'Added to Cart',
    detail: `1 x ${item.color} added to cart`,
    life: 3000
  })
}

onMounted(async () => {
  await productItemStore.getProductItems(route.params.id as string)
})
</script>
