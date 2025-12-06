<template>
  <div
    class="w-full fixed top-0 z-30 pt-2 px-5 pb-5"
    :class="{ 'bg-[#f5f5f5] shadow-lg': isScrolled }"
  >
    <Menubar class="w-full" :model="items">
      <template #end>
        <div class="flex items-center gap-3">
          <button ref="toggleProfile" class="relative">
            <div
              @click="openProfile = !openProfile"
              class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span class="font-medium">{{
                authStore.name || authStore.identity?.fullName || 'User'
              }}</span>
              <i
                :class="openProfile ? 'pi pi-angle-up' : 'pi pi-angle-down'"
                class="text-sm"
                style="color: green"
              ></i>
            </div>
            <div
              v-if="openProfile"
              class="absolute right-0 mt-2 w-56 bg-white text-start rounded-lg shadow-xl border border-gray-200 py-2 z-50"
            >
              <div
                class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3"
                @click="navigate('/info')"
              >
                <i class="pi pi-user text-gray-600"></i>
                <span class="font-medium">Hồ sơ</span>
              </div>
              <div
                class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3"
                @click="navigate('/orders')"
              >
                <i class="pi pi-shopping-bag text-gray-600"></i>
                <span class="font-medium">Đơn hàng của tôi</span>
              </div>
              <div class="border-t border-gray-200 my-1"></div>
              <div
                class="px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors flex items-center gap-3 text-red-600"
                @click="authStore.logout()"
              >
                <i class="pi pi-sign-out"></i>
                <span class="font-medium">Đăng xuất</span>
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
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { onClickOutside } from '@vueuse/core'
import Button from 'primevue/button'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

const authStore = useAuthStore()
const cartStore = useCartStore()

const isScrolled = ref(false)
const openProfile = ref(false)
const toggleProfile = ref(null)
onClickOutside(toggleProfile, () => (openProfile.value = false))

// Check if current page is an order page
const isOrderPage = computed(() => {
  return route.name === 'user-orders' || route.name === 'user-order-detail'
})

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
