<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
          <i class="pi pi-envelope text-4xl text-blue-600"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Kiểm tra email của bạn</h1>
        <p class="text-gray-600 mb-6">
          Chúng tôi đã gửi một email xác minh đến <strong>{{ email }}</strong>.
          Vui lòng kiểm tra hộp thư và nhấp vào link xác minh để kích hoạt tài khoản.
        </p>

        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p class="text-sm text-yellow-800">
            <i class="pi pi-info-circle mr-2"></i>
            Link xác minh sẽ hết hạn sau 24 giờ.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-sm text-gray-500">Không nhận được email?</p>
          <Button
            @click="resendEmail"
            :loading="resending"
            severity="secondary"
            outlined
            class="w-full"
          >
            <i class="pi pi-refresh mr-2"></i>
            Gửi lại email xác minh
          </Button>
          <Button
            @click="$router.push('/auth')"
            text
            class="w-full !text-gray-600"
          >
            Quay lại đăng nhập
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { resendVerificationEmailApi } from '@/api/authApi'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const email = ref(route.query.email as string || '')
const resending = ref(false)

const resendEmail = async () => {
  if (!email.value) {
    toast.add({
      severity: 'warn',
      summary: 'Thông báo',
      detail: 'Không tìm thấy email. Vui lòng đăng ký lại.',
      life: 5000
    })
    router.push('/auth')
    return
  }

  resending.value = true
  try {
    await resendVerificationEmailApi(email.value)
    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Email xác minh đã được gửi lại. Vui lòng kiểm tra hộp thư của bạn.',
      life: 5000
    })
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: err.response?.data?.message || 'Không thể gửi email. Vui lòng thử lại.',
      life: 5000
    })
  } finally {
    resending.value = false
  }
}

// Redirect to login if no email
if (!email.value) {
  router.push('/auth')
}
</script>

<style scoped>
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
</style>

