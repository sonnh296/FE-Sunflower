<template>
  <div
    class="fixed z-30 top-0 justify-between flex w-full h-20 bg-[#FFFEF5] transition-shadow duration-300"
    :class="{ 'shadow-lg': isScrolled }"
  >
    <div class="flex items-center cursor-pointer" @click="$router.push('/')">
      <img src="/logo1.png" alt="ball" class="w-40" />
    </div>

    <div class="flex flex-row justify-end items-center flex-1 px-10">
      <div class="flex flex-row justify-end items-end space-x-6">
        <span
          class="cursor-pointer text-gray-700 hover:text-pink-500 font-medium"
          @click="$router.push({ name: 'collections' })"
        >
          Bộ sưu tập
        </span>
        <span
          class="cursor-pointer text-gray-700 hover:text-pink-500 font-medium"
          @click="$router.push({ name: 'about' })"
        >
          Giới thiệu
        </span>
        <span
          class="cursor-pointer text-gray-700 hover:text-pink-500 font-medium"
          @click="$router.push({ name: 'contact' })"
        >
          Liên hệ
        </span>
        <span
          class="cursor-pointer text-gray-700 hover:text-pink-500 font-medium"
          @click="$router.push({ name: 'help' })"
        >
          Trợ giúp
        </span>
      </div>
    </div>

    <!-- Right side actions - Check auth status -->
    <div class="flex items-center gap-3">
      <!-- Show when NOT logged in -->
      <template v-if="!authStore.identified">
        <ActionButton
          class="h-8"
          value="Đăng nhập"
          @click="$router.push({ name: 'login-screen' })"
        />
      </template>

      <!-- Show when logged in -->
      <template v-else>
        <!-- Cart Icon with badge -->
        <div
          class="relative cursor-pointer text-gray-700 hover:text-pink-500 transition-colors"
          @click="$router.push({ name: 'user-cart' })"
        >
          <i class="pi pi-shopping-cart text-2xl"></i>
          <span
            v-if="cartStore.cartItems.length > 0"
            class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ cartStore.cartItems.length }}
          </span>
        </div>

        <!-- User Avatar/Menu -->
        <div class="relative">
          <div
            class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            @click="showUserMenu = !showUserMenu"
          >
            <img
              :src="authStore.identity?.avatarUrl || '/noavatar.png'"
              alt="Avatar"
              class="w-10 h-10 rounded-full object-cover border-2 border-pink-300"
            />
            <span class="text-gray-700 font-medium hidden md:block">
              {{ authStore.identity?.fullName || 'User' }}
            </span>
            <i class="pi pi-chevron-down text-sm text-gray-500"></i>
          </div>

          <!-- Dropdown Menu -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
          >
            <div
              class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
              @click="$router.push({ name: 'user-info' }); showUserMenu = false"
            >
              <i class="pi pi-user text-gray-600"></i>
              <span>Thông tin cá nhân</span>
            </div>
            <div
              class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
              @click="$router.push({ name: 'user-orders' }); showUserMenu = false"
            >
              <i class="pi pi-shopping-bag text-gray-600"></i>
              <span>Đơn hàng của tôi</span>
            </div>
            <div class="border-t border-gray-200 my-1"></div>
            <div
              class="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center gap-2 text-red-600"
              @click="handleLogout"
            >
              <i class="pi pi-sign-out"></i>
              <span>Đăng xuất</span>
            </div>
          </div>
        </div>
      </template>

      <img src="/logo2.png" alt="ball" class="w-20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '../buttons/ActionButton.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'

const authStore = useAuthStore()
const cartStore = useCartStore()
const isScrolled = ref(false)
const showUserMenu = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
}

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (showUserMenu.value && !target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)

  // Load cart if user is logged in
  if (authStore.identified) {
    cartStore.getCart()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>
