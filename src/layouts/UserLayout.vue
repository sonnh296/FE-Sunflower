<template>
  <UserSideBar />

  <div class="min-w-full pt-24 bg-[#fffef5]">
    <div class="w-full h-full min-h-screen px-10">
      <RouterView />
    </div>
  </div>
  <ScrollTop />
  <UserFooter />
</template>

<script setup lang="ts">
import UserFooter from '@/components/foodters/UserFooter.vue'
import UserSideBar from '@/components/sidebars/UserSideBar.vue'
import { useAuthStore } from '@/stores/authStore'
import ScrollTop from 'primevue/scrolltop'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(async () => {
  // Ensure user identity is loaded
  if (!authStore.identity) {
    await authStore.getMe()
  }
})
</script>
