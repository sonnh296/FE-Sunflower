<template>
  <div
    class="w-full fixed top-0 z-30 pt-2 px-5 pb-5"
    :class="{ 'bg-[#f5f5f5] shadow-lg': isScrolled }"
  >
    <Menubar class="w-full" :model="items">
      <template #end>
        <div class="flex">
          <div class="relative">
            <Button
              icon="pi pi-shopping-cart"
              label="Giỏ hàng"
              class="bg-green-400 mx-2"
              @click.stop="navigate('/cart')"
            />
            <!-- Cart Item Count Badge -->
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
            >
              {{ cartStore.totalItems }}
            </span>
          </div>
          <button ref="toggleProfile" class="relative">
            <div @click="openProfile = !openProfile" class="flex items-center pr-6 pb-1">
              <span>{{ authStore.name || authStore.identity?.fullName || 'User' }}</span>
              <i v-if="!openProfile" class="pi pi-angle-down pt-1" style="color: green"></i>
              <i v-if="openProfile" class="pi pi-angle-up pt-1" style="color: green"></i>
            </div>
            <div
              v-if="openProfile"
              class="absolute -bottom-24 flex flex-col h-20 w-full bg-white text-start rounded-md shadow-md border border-gray-200"
            >
              <div class="p-2" @click="navigate('/info')">
                <i class="pi pi-user"></i>
                <span class="font-bold ml-2">Hồ sơ</span>
              </div>
              <div class="p-2 flex items-center" @click="authStore.logout()">
                <i class="pi pi-sign-out"></i>
                <span class="font-bold ml-2">Đăng xuất</span>
              </div>
            </div>
          </button>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import Menubar from 'primevue/menubar'
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { onClickOutside } from '@vueuse/core'
import Button from 'primevue/button'
const { t } = useI18n()

const authStore = useAuthStore()
const cartStore = useCartStore()

const isScrolled = ref(false)
const openProfile = ref(false)
const toggleProfile = ref(null)
onClickOutside(toggleProfile, () => (openProfile.value = false))

const items = ref([
  {
    label: t('sidebar.user.home'),
    icon: 'pi pi-home',
    command: () => navigate('/home')
  }
])

const navigate = (to: string) => {
  router.push('/user' + to)
  openProfile.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Load cart items when component mounts
  if (authStore.identified) {
    cartStore.getCart()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.bg-\[\#f5f5f5\] {
  transition: background-color 0.3s ease;
}
</style>
