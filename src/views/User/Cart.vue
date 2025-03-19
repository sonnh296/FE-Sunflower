<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Giỏ hàng</h1>
      <Button v-if="cartStore.cartItems.length" severity="danger" @click="cartStore.clearCart()">
        Xóa tất cả
      </Button>
    </div>

    <div v-if="cartStore.loading" class="flex justify-center">
      <ProgressSpinner />
    </div>

    <div v-else-if="!cartStore.cartItems.length" class="text-center py-8">
      <i class="pi pi-shopping-cart text-4xl text-gray-400"></i>
      <p class="mt-4 text-gray-500">Giỏ hàng trống</p>
    </div>

    <div v-else class="flex flex-col gap-4">
      <div
        v-for="item in cartStore.cartItems"
        :key="item.id"
        class="flex items-center justify-between p-4 border rounded-lg"
      >
        <div class="flex items-center gap-4">
          <img
            :src="item.productItem.url"
            :alt="item.productItem.gender"
            class="w-24 h-24 object-cover rounded"
          />
          <div>
            <h3 class="font-semibold">{{ item.productItem.gender }}</h3>
            <h3 class="font-semibold">{{ item.productItem.size }}</h3>
            <h3 class="font-semibold">{{ item.productItem.color }}</h3>
            <p class="text-gray-600">{{ item.productItem.price }}đ</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <Button
              icon="pi pi-minus"
              severity="secondary"
              @click="updateQuantity(item, item.quantity - 1)"
              :disabled="item.quantity <= 1"
            />
            <span class="mx-4">{{ item.quantity }}</span>
            <Button
              icon="pi pi-plus"
              severity="secondary"
              @click="updateQuantity(item, item.quantity + 1)"
            />
          </div>
          <Button icon="pi pi-trash" severity="danger" @click="cartStore.removeFromCart(item.id)" />
        </div>
      </div>

      <div class="flex justify-between items-center mt-4 p-4 border-t">
        <div>
          <p class="text-lg">Tổng tiền:</p>
          <p class="text-2xl font-bold">{{ cartStore.totalPrice }}đ</p>
        </div>
        <Button severity="success" size="large"> Thanh toán </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import type { CartItem } from '@/api/cartApi'

const cartStore = useCartStore()

const updateQuantity = async (item: CartItem, quantity: number) => {
  await cartStore.updateCartItem({
    cartItemId: item.id,
    quantity
  })
}

onMounted(async () => {
  await cartStore.getCart()
})
</script>
