<template>
  <UserHeader v-if="!authStore.identity" />
  <UserSideBar />

  <div class="min-w-full pt-24 bg-[#5c6c99]">
    <div class="w-full h-full min-h-screen px-10">
      <RouterView />
    </div>
  </div>
  <ScrollTop />
  <UserFooter />
</template>

<script setup lang="ts">
import UserFooter from '@/components/foodters/UserFooter.vue'
import UserHeader from '@/components/headers/UserHeader.vue'
import UserSideBar from '@/components/sidebars/UserSideBar.vue'
import { useAuthStore } from '@/stores/authStore'
import ScrollTop from 'primevue/scrolltop'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  // authStore.identity = {
  //   id: 1,
  //   name: 'John Doe',
  //   status: 'active',
  //   roleName: 'Player'
  // }
})
</script>
