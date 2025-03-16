<template>
  <div class="fixed z-30 top-0 justify-between flex w-full h-16 border-b bg-white">
    <div class="flex items-center cursor-pointer" @click="$router.push('/')">
      <img src="/logo.png" alt="ball" class="w-14" />
      <span class="te xt-3xl flex items-center font-extrabold text-xl text-pink-400">
        Sunflower
      </span>
    </div>

    <div class="flex items-center">
      <ActionButton
        class="mr-2 h-8"
        value="Đăng nhập"
        @click="$router.push({ name: 'login-screen' })"
      />
      <img src="/homepage.jpg" alt="ball" class="w-20" />
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
