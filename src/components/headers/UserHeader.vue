<template>
  <div class="fixed z-30 top-0 justify-between flex w-full h-16 border-b bg-white">
    <div class="flex items-center cursor-pointer " @click="$router.push('/')">
      <img src="/sf_icon.png" alt="ball" class="w-24 pl-3 pr-3" />
      <span class="te xt-3xl flex items-center font-extrabold text-xl text-pink-400 d-avenue">
        Sunflower
      </span>
    </div>

    <div class="flex items-center">
      <ActionButton
        class="mr-2 h-8"
        value="Đăng nhập"
        @click="$router.push({ name: 'login-screen' })"
      />
      <!-- <img src="/homepage.jpg" alt="ball" class="w-20" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import ActionButton from '../buttons/ActionButton.vue'
import { onMounted } from 'vue'
const authStore = useAuthStore()

onMounted(() => {})
</script>

<style scoped>
.d-avenue {
  font-family: 'Dream Avenue', sans-serif;
  font-size: 45px;
}
</style>
