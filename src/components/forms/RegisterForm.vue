<template>
  <div class="bg-white p-10 rounded-md">
    <div>
      <h1 class="font-semibold text-center text-xl mb-2">Đăng ký tài khoản</h1>
      <div class="h-14">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText v-model="userName" placeholder="Tên của bạn" />
        </InputGroup>
        <small class="text-red-400 flex items-start">{{ errors.userName }}</small>
      </div>
      <div class="h-14">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-envelope"></i>
          </InputGroupAddon>
          <InputText v-model="email" placeholder="Email của bạn" />
        </InputGroup>
        <small class="text-red-400 flex items-start">{{ errors.email }}</small>
      </div>
      <div class="h-14">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-phone"></i>
          </InputGroupAddon>
          <InputText
            v-model="phoneNumber"
            inputId="withoutgrouping"
            placeholder="Số điện thoại"
            :useGrouping="false"
            class="rounded-none"
          />
        </InputGroup>
        <small class="text-red-400 flex items-start">{{ errors.phoneNumber }}</small>
      </div>
      <div class="h-14 flex flex-col w-full">
        <Password
          class="w-full"
          v-model="password"
          toggleMask
          :feedback="false"
          placeholder="Mật khẩu"
        />
        <small class="text-red-400 flex items-start">{{ errors.password }}</small>
      </div>
      <div class="h-14 flex flex-col w-full">
        <Password
          v-model="confirmPassword"
          toggleMask
          :feedback="false"
          placeholder="Xác nhận mật khẩu"
        />
        <small class="text-red-400 flex items-start">{{ errors.confirmPassword }}</small>
      </div>
      <div class="h-5">
        <h1 v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</h1>
        <h1 v-if="registerSuccess && !errorMessage" class="text-green-500 text-center">
          Đã đăng ký thành công, vui lòng kiểm tra email để xác nhận tài khoản!
        </h1>
      </div>
      <div class="w-full flex mt-6">
        <ActionButton
          class="mx-auto"
          :value="'Đăng nhập'"
          isOutlined
          @click.prevent="emit('changeMode', 'login')"
        />
        <ActionButton
          class="mx-auto"
          :disable="!meta.valid || authStore.isRegistering"
          :value="'Đăng ký'"
          @click.prevent="submit"
        />
      </div>

      <!-- Divider -->
      <div class="flex items-center my-6">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="px-4 text-gray-500 text-sm">hoặc</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <!-- Google Sign Up -->
      <button
        @click="handleGoogleLogin"
        type="button"
        class="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Đăng ký với Google</span>
      </button>
    </div>
    <ProgressBar
      v-if="authStore.isRegistering"
      class="mt-2"
      mode="indeterminate"
      style="height: 6px"
    ></ProgressBar>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { handleGoogleLogin } from '@/utils/googleOAuth'
import type { RegisterRequest } from '@/api/authApi'
import { ref } from 'vue'
import ActionButton from '../buttons/ActionButton.vue'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import ProgressBar from 'primevue/progressbar'

const authStore = useAuthStore()

const { t } = useI18n()

const emit = defineEmits<(e: 'changeMode', id: 'login' | 'register') => void>()

const userType = ref('Người dùng')

const registerSuccess = ref(false)
const errorMessage = ref('')

const schema = yup.object({
  userName: yup.string().required(t('validation.required')).max(50, 'Tên tối đa 50 ký tự'),
  email: yup.string().required(t('validation.required')).email('Email không hợp lệ'),
  password: yup
    .string()
    .required(t('validation.required'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Mật khẩu chứa ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt'
    ),
  phoneNumber: yup
    .string()
    .required(t('validation.required'))
    .matches(/^[0-9]*$/, t('validation.phoneNumber'))
    .max(11, 'Số điện thoại tối đa 11 số'),
  confirmPassword: yup
    .string()
    .required(t('validation.required'))
    .min(8, t('validation.passwordLength'))
    .oneOf([yup.ref('password')], t('validation.passwordNotMatch'))
})

const { meta, errors, defineField, handleSubmit } = useForm<RegisterRequest>({
  initialValues: {
    userName: '',
    // role: 3,
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  },
  validationSchema: schema
})

const [userName] = defineField('userName')
const [email] = defineField('email')
const [password] = defineField('password')
const [phoneNumber] = defineField('phoneNumber')
const [confirmPassword] = defineField('confirmPassword')

const submit = handleSubmit((values) => {
  authStore.register({ ...values }).then((response) => {
    if (response.success) {
      registerSuccess.value = true
      errorMessage.value = ''
    } else {
      errorMessage.value = response.message
    }
  })
})
</script>
