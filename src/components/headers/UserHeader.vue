<template>
  <div class="fixed z-30 top-0 justify-between flex w-full h-20 border-b bg-slate-200">
    <div class="flex items-center cursor-pointer" @click="$router.push('/')">
      <img src="/logo1.png" alt="ball" class="w-40" />
    </div>

    <div class="flex flex-row justify-end items-center flex-1 px-10">
      <div class="flex flex-row justify-end items-end space-x-6">
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
    <div class="flex items-center">
      <ActionButton
        class="mr-2 h-8"
        value="Đăng nhập"
        @click="$router.push({ name: 'login-screen' })"
      />
      <img src="/logo2.png" alt="ball" class="w-20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import ActionButton from '../buttons/ActionButton.vue'
import { onMounted } from 'vue'

onMounted(() => {})
</script>
