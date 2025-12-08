<template>
  <div class="px-3 fixed w-full top-0 z-30">
    <Menubar :model="items">
      <template #end>
        <div class="flex items-center space-x-2">
          <NotificationButton class="mr-2" />
          <button
            @click="handleLogout"
            class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-800 transition duration-150 ease-in-out"
          >
            <i class="pi pi-sign-out mr-2"></i>
            Đăng xuất
          </button>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NotificationButton from '../buttons/NotificationButton.vue'
const { t } = useI18n()

const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
}

const items = ref([
  {
    label: 'Trang chủ',
    icon: 'pi pi-home',
    command: () => navigate('/home')
  },
  {
    label: 'Sản phẩm',
    icon: 'pi pi-shopping-bag',
    command: () => navigate('/products')
  },
  {
    label: 'Đơn hàng',
    icon: 'pi pi-shopping-cart',
    command: () => navigate('/orders')
  },
  {
    label: 'Tin tức',
    icon: 'pi pi-newspaper',
    command: () => navigate('/news')
  },
  {
    label: 'Banner',
    icon: 'pi pi-images',
    command: () => navigate('/banners')
  },
  {
    label: 'Người dùng',
    icon: 'pi pi-users',
    command: () => navigate('/users')
  }
])

const navigate = (to: string) => {
  router.push('/admin' + to)
}
</script>
