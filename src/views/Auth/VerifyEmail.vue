<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center">
        <ProgressSpinner />
        <p class="mt-4 text-gray-600">Đang xác minh email của bạn...</p>
      </div>

      <!-- Success State -->
      <div v-else-if="verified" class="text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <i class="pi pi-check text-4xl text-green-600"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Email đã được xác minh!</h1>
        <p class="text-gray-600 mb-6">
          Tài khoản của bạn đã được kích hoạt thành công. Bạn có thể đăng nhập và bắt đầu mua sắm ngay bây giờ.
        </p>
        <Button
          @click="$router.push('/auth')"
          class="!bg-gradient-to-r !from-purple-500 !to-pink-500 !border-0 !text-white w-full"
        >
          <i class="pi pi-sign-in mr-2"></i>
          Đăng nhập ngay
        </Button>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <i class="pi pi-times text-4xl text-red-600"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Xác minh thất bại</h1>
        <p class="text-gray-600 mb-6">{{ errorMessage }}</p>

        <div class="space-y-3">
          <Button
            v-if="canResend"
            @click="resendEmail"
            :loading="resending"
            class="!bg-gradient-to-r !from-purple-500 !to-pink-500 !border-0 !text-white w-full"
          >
            <i class="pi pi-envelope mr-2"></i>
            Gửi lại email xác minh
          </Button>
          <Button
            @click="$router.push('/auth')"
            severity="secondary"
            outlined
            class="w-full"
          >
            Quay lại đăng nhập
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { verifyEmailApi, resendVerificationEmailApi } from '@/api/authApi'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const loading = ref(true)
const verified = ref(false)
const error = ref(false)
const errorMessage = ref('')
const canResend = ref(false)
const resending = ref(false)
const userEmail = ref('')

const verifyEmail = async () => {
  const token = route.query.token as string

  if (!token) {
    error.value = true
    errorMessage.value = 'Link xác minh không hợp lệ. Vui lòng kiểm tra lại email của bạn.'
    loading.value = false
    return
  }

  try {
    const response = await verifyEmailApi(token)
    verified.value = true
    loading.value = false

    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Email của bạn đã được xác minh thành công!',
      life: 5000
    })
  } catch (err: any) {
    error.value = true
    loading.value = false

    const errorCode = err.response?.data?.code

    if (errorCode === 7003) {
      errorMessage.value = 'Link xác minh đã hết hạn. Vui lòng yêu cầu gửi lại email xác minh.'
      canResend.value = true
    } else if (errorCode === 7004) {
      errorMessage.value = 'Email này đã được xác minh trước đó. Bạn có thể đăng nhập ngay.'
      verified.value = true
      error.value = false
    } else if (errorCode === 7002) {
      errorMessage.value = 'Link xác minh không hợp lệ hoặc đã được sử dụng.'
    } else {
      errorMessage.value = err.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.'
    }
  }
}

const resendEmail = async () => {
  if (!userEmail.value) {
    toast.add({
      severity: 'warn',
      summary: 'Thông báo',
      detail: 'Vui lòng quay lại trang đăng ký để gửi lại email xác minh.',
      life: 5000
    })
    router.push('/auth')
    return
  }

  resending.value = true
  try {
    await resendVerificationEmailApi(userEmail.value)
    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Email xác minh đã được gửi lại. Vui lòng kiểm tra hộp thư của bạn.',
      life: 5000
    })
    error.value = false
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

onMounted(() => {
  verifyEmail()
})
</script>

<style scoped>
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
</style>

