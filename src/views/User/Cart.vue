<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
          <p class="text-gray-500 mt-1">{{ cartStore.cartItems.length }} sản phẩm</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="cartStore.loading" class="flex justify-center py-20">
        <ProgressSpinner />
      </div>

      <!-- Empty Cart -->
      <div v-else-if="!cartStore.cartItems.length" class="text-center py-20 bg-white rounded-2xl shadow-sm">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
          <i class="pi pi-shopping-cart text-5xl text-purple-500"></i>
        </div>
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">Giỏ hàng trống</h2>
        <p class="text-gray-500 mb-6">Hãy thêm sản phẩm yêu thích vào giỏ hàng!</p>
        <Button
          @click="$router.push('/user/home')"
          class="!bg-gradient-to-r !from-purple-500 !to-pink-500 !border-0 !text-white"
        >
          <i class="pi pi-shopping-bag mr-2"></i>
          Khám phá sản phẩm
        </Button>
      </div>

      <!-- Cart Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Items List -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartStore.cartItems"
            :key="item.id"
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div class="p-6">
              <div class="flex gap-6">
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <div class="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      :src="item.thumbnailUrl || '/noavatar.png'"
                      :alt="item.productName"
                      class="w-full h-full object-cover"
                      @error="(event) => (event.target as HTMLImageElement).src = '/noavatar.png'"
                    />
                  </div>
                </div>

                <!-- Product Details -->
                <div class="flex-grow">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        {{ item.productName }}
                      </h3>
                      <div class="flex flex-wrap gap-2">
                        <!-- Size Badge -->
                        <span v-if="item.size" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                          <i class="pi pi-tag mr-1 text-xs"></i>
                          Size: {{ item.size }}
                        </span>
                        <!-- Stock Badge -->
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                          <i class="pi pi-box mr-1 text-xs"></i>
                          Còn: {{ item.availableStock }}
                        </span>
                      </div>
                    </div>

                    <!-- Delete Button -->
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      text
                      rounded
                      @click="cartStore.removeFromCart(item.id)"
                      class="!text-red-500 hover:!bg-red-50"
                    />
                  </div>

                  <!-- Price & Quantity Row -->
                  <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <p class="text-sm text-gray-500 mb-1">Đơn giá</p>
                      <p class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        {{ (item.price || 0).toLocaleString('vi-VN') }}đ
                      </p>
                    </div>

                    <!-- Quantity Controls -->
                    <div class="flex items-center gap-3">
                      <span class="text-sm text-gray-500">Số lượng:</span>
                      <div class="flex items-center bg-gray-100 rounded-lg">
                        <Button
                          icon="pi pi-minus"
                          text
                          rounded
                          size="small"
                          @click="updateQuantity(item.id, item.quantity - 1)"
                          :disabled="item.quantity <= 1"
                          class="!text-gray-600 hover:!bg-gray-200"
                        />
                        <span class="px-4 font-semibold text-gray-800 min-w-[2rem] text-center">
                          {{ item.quantity }}
                        </span>
                        <Button
                          icon="pi pi-plus"
                          text
                          rounded
                          size="small"
                          @click="updateQuantity(item.id, item.quantity + 1)"
                          :disabled="item.quantity >= item.availableStock"
                          class="!text-gray-600 hover:!bg-gray-200"
                        />
                      </div>
                    </div>

                    <!-- Subtotal -->
                    <div class="text-right">
                      <p class="text-sm text-gray-500 mb-1">Thành tiền</p>
                      <p class="text-xl font-bold text-gray-800">
                        {{ ((item.price || 0) * item.quantity).toLocaleString('vi-VN') }}đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-4 border border-gray-100">
            <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="pi pi-receipt mr-2 text-purple-500"></i>
              Tóm tắt đơn hàng
            </h2>

            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Tổng sản phẩm:</span>
                <span class="font-semibold">{{ cartStore.cartItems.length }}</span>
              </div>

              <div class="flex justify-between text-gray-600">
                <span>Tổng số lượng:</span>
                <span class="font-semibold">
                  {{ cartStore.cartItems.reduce((acc, item) => acc + item.quantity, 0) }}
                </span>
              </div>

              <div class="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span class="font-semibold">{{ cartStore.totalPrice.toLocaleString('vi-VN') }}đ</span>
              </div>

              <div class="flex justify-between text-gray-600">
                <span>Phí vận chuyển:</span>
                <span class="text-green-600 font-semibold">Miễn phí</span>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-800">Tổng thanh toán:</span>
                <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {{ cartStore.totalPrice.toLocaleString('vi-VN') }}đ
                </span>
              </div>
            </div>

            <Button
              class="w-full !bg-gradient-to-r !from-purple-500 !to-pink-500 !border-0 !text-white !font-semibold !py-3 !text-lg hover:!from-purple-600 hover:!to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              @click="handleCheckout"
            >
              <i class="pi pi-credit-card mr-2"></i>
              Đặt hàng
            </Button>

            <div class="mt-4 text-center">
              <Button
                text
                class="!text-gray-600 hover:!text-purple-600"
                @click="$router.push('/user/home')"
              >
                <i class="pi pi-arrow-left mr-2"></i>
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const router = useRouter()

const updateQuantity = async (cartItemId: string, quantity: number) => {
  if (quantity < 1) return
  await cartStore.updateCartItem(cartItemId, quantity)
}

const handleCheckout = () => {
  router.push('/user/checkout')
}

onMounted(async () => {
  await cartStore.getCart()
})
</script>

<style scoped>
/* Add smooth animations */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
</style>
