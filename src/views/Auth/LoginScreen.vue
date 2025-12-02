<template>
  <div class="bg-cover pt-32 bg-guest flex items-center">
    <!-- Loading state for OAuth -->
    <div v-if="isProcessingOAuth" class="w-96 py-10 mx-auto h-full">
      <div class="bg-white p-10 rounded-md text-center">
        <i class="pi pi-spin pi-spinner text-4xl text-purple-500 mb-4"></i>
        <h2 class="text-xl font-semibold mb-2">Đang xử lý đăng nhập...</h2>
        <p class="text-gray-600">Vui lòng đợi trong giây lát</p>
      </div>
    </div>

    <div v-else-if="mode === 'login'" class="w-96 py-10 mx-auto h-full">
      <LoginForm @change-mode="changeMode" />
    </div>
    <div v-else-if="mode === 'forgot'" class="w-96 py-10 mx-auto h-full">
      <ForgotPasswordForm @change-mode="changeMode" />
    </div>
    <div v-else-if="mode === 'register'" class="w-96 py-10 mx-auto h-full">
      <RegisterForm @change-mode="changeMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'primevue/usetoast'
import LoginForm from '@/components/forms/LoginForm.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm.vue'

const mode = ref<'login' | 'forgot' | 'register'>('login')
const isProcessingOAuth = ref(false)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const changeMode = (to: 'login' | 'forgot' | 'register') => {
  mode.value = to
}

// Handle Google OAuth callback
onMounted(async () => {
  const code = route.query.code as string

  if (code) {
    isProcessingOAuth.value = true

    try {
      await authStore.googleLogin(code)

      toast.add({
        severity: 'success',
        summary: 'Đăng nhập thành công',
        detail: 'Chào mừng bạn quay trở lại!',
        life: 3000
      })

      // The authStore.loginSuccessfully already handles the redirect based on role
      // So we don't need to manually redirect here
    } catch (error) {
      console.error('Google OAuth error:', error)
      isProcessingOAuth.value = false

      toast.add({
        severity: 'error',
        summary: 'Đăng nhập thất bại',
        detail: 'Không thể đăng nhập với Google. Vui lòng thử lại!',
        life: 3000
      })

      // Clear the code from URL
      router.replace({ name: 'login-screen', query: {} })
    }
  }
})
</script>

<style scoped>
.bg-guest {
  background-image: url(/bg-login.jpg);
  height: 100vh;
}
</style>
