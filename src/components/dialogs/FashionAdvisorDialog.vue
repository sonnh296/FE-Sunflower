<template>
  <Dialog
    v-model:visible="dialogVisible"
    modal
    :closable="true"
    :draggable="false"
    class="fashion-advisor-dialog"
    :style="{ width: '90vw', maxWidth: '1200px' }"
  >
    <template #header>
      <div class="w-full text-center py-4">
        <h2
          class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          <i class="pi pi-sparkles mr-2"></i>
          Tư vấn thời trang AI
        </h2>
        <p class="text-gray-600 mt-2 text-sm md:text-base">
          Nhận lời khuyên thời trang cá nhân hóa dựa trên số đo cơ thể và màu da của bạn
        </p>
      </div>
    </template>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      <!-- Form Section -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Thông tin của bạn</h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Skin Color -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Màu da <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="color in skinColorOptions"
                :key="color.value"
                type="button"
                @click="formData.skinColor = color.value"
                :class="[
                  'p-3 rounded-lg border-2 transition-all duration-200',
                  formData.skinColor === color.value
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-purple-300'
                ]"
              >
                <div :class="color.colorClass" class="w-10 h-10 rounded-full mx-auto mb-1"></div>
                <span class="text-xs font-medium text-gray-700">{{ color.label }}</span>
              </button>
            </div>
          </div>

          <!-- Body Measurements -->
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Vòng ngực (cm) <span class="text-red-500">*</span>
              </label>
              <InputText
                v-model="formData.bust"
                type="number"
                placeholder="85"
                class="w-full"
                :class="{ 'border-red-500': errors.bust }"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Vòng eo (cm) <span class="text-red-500">*</span>
              </label>
              <InputText
                v-model="formData.waist"
                type="number"
                placeholder="65"
                class="w-full"
                :class="{ 'border-red-500': errors.waist }"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Vòng mông (cm) <span class="text-red-500">*</span>
              </label>
              <InputText
                v-model="formData.hip"
                type="number"
                placeholder="90"
                class="w-full"
                :class="{ 'border-red-500': errors.hip }"
              />
            </div>
          </div>

          <!-- Height & Weight -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1"> Chiều cao (cm) </label>
              <InputText v-model="formData.height" type="number" placeholder="165" class="w-full" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1"> Cân nặng (kg) </label>
              <InputText v-model="formData.weight" type="number" placeholder="55" class="w-full" />
            </div>
          </div>

          <!-- Style Preference -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Phong cách yêu thích
            </label>
            <Dropdown
              v-model="formData.style"
              :options="styleOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Chọn phong cách"
              class="w-full"
            />
          </div>

          <!-- Occasion -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1"> Dịp </label>
            <Dropdown
              v-model="formData.occasion"
              :options="occasionOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Chọn dịp"
              class="w-full"
            />
          </div>

          <!-- Additional Info -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1"> Thông tin thêm </label>
            <Textarea
              v-model="formData.additionalInfo"
              rows="2"
              placeholder="Thêm bất kỳ sở thích hoặc yêu cầu đặc biệt nào..."
              class="w-full"
            />
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :loading="loading"
            :disabled="loading"
            label="Nhận lời khuyên"
            icon="pi pi-sparkles"
            class="w-full !py-3 !font-semibold !bg-gradient-to-r !from-purple-600 !to-pink-600 hover:!from-purple-700 hover:!to-pink-700 !border-0 !shadow-lg"
          />
        </form>
      </div>

      <!-- Results Section -->
      <div class="bg-white rounded-2xl p-6 overflow-y-auto max-h-[600px]">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Kết quả tư vấn</h3>

        <div v-if="loading" class="flex items-center justify-center py-20">
          <ProgressSpinner class="w-12 h-12" />
        </div>

        <div v-else-if="recommendation" class="space-y-4">
          <!-- Location Info -->
          <div
            v-if="recommendation.userLocation"
            class="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"
          >
            <i class="pi pi-map-marker"></i>
            <span>{{ recommendation.userLocation }}</span>
          </div>

          <!-- Body Type -->
          <div
            v-if="recommendation.bodyType"
            class="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg"
          >
            <p class="text-xs font-medium text-gray-700 mb-1">Dáng người của bạn</p>
            <p class="text-lg font-bold text-purple-800 capitalize">
              {{ recommendation.bodyType }}
            </p>
          </div>

          <!-- Main Recommendation -->
          <div class="prose max-w-none text-sm">
            <div class="text-gray-700 leading-relaxed" v-html="formattedRecommendation"></div>
          </div>

          <!-- Suggested Colors -->
          <div v-if="recommendation.suggestedColors && recommendation.suggestedColors.length > 0">
            <h4 class="text-base font-semibold text-gray-800 mb-2">Màu sắc phù hợp</h4>
            <div class="flex flex-wrap gap-2">
              <Tag
                v-for="color in recommendation.suggestedColors"
                :key="color"
                :value="color"
                class="!px-3 !py-1 !bg-purple-100 !text-purple-800 text-xs"
              />
            </div>
          </div>

          <!-- Suggested Styles -->
          <div v-if="recommendation.suggestedStyles && recommendation.suggestedStyles.length > 0">
            <h4 class="text-base font-semibold text-gray-800 mb-2">Phong cách đề xuất</h4>
            <div class="flex flex-wrap gap-2">
              <Tag
                v-for="style in recommendation.suggestedStyles"
                :key="style"
                :value="style"
                class="!px-3 !py-1 !bg-pink-100 !text-pink-800 text-xs"
              />
            </div>
          </div>

          <!-- Additional Tips -->
          <div
            v-if="recommendation.additionalTips"
            class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded"
          >
            <h4 class="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <i class="pi pi-lightbulb"></i>
              Mẹo bổ sung
            </h4>
            <p class="text-gray-700 leading-relaxed text-sm">{{ recommendation.additionalTips }}</p>
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
          <i class="pi pi-info-circle text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 text-sm">
            Điền vào biểu mẫu để nhận lời khuyên thời trang cá nhân hóa
          </p>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'
import {
  getFashionRecommendation,
  type FashionAdvisorRequest,
  type FashionAdvisorResponse
} from '@/api/fashionAdvisorApi'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const loading = ref(false)
const recommendation = ref<FashionAdvisorResponse | null>(null)

const formData = reactive<FashionAdvisorRequest>({
  skinColor: '',
  bust: '',
  waist: '',
  hip: '',
  height: '',
  weight: '',
  style: '',
  occasion: '',
  additionalInfo: ''
})

const errors = reactive({
  skinColor: false,
  bust: false,
  waist: false,
  hip: false
})

const skinColorOptions = [
  { value: 'Fair', label: 'Sáng', colorClass: 'bg-amber-100' },
  { value: 'Light', label: 'Trung bình', colorClass: 'bg-amber-200' },
  { value: 'Medium', label: 'Ngăm', colorClass: 'bg-amber-400' },
  { value: 'Tan', label: 'Rám nắng', colorClass: 'bg-amber-600' },
  { value: 'Dark', label: 'Tối', colorClass: 'bg-amber-800' },
  { value: 'Deep', label: 'Rất tối', colorClass: 'bg-amber-900' }
]

const styleOptions = [
  { value: 'casual', label: 'Thoải mái' },
  { value: 'formal', label: 'Trang trọng' },
  { value: 'sporty', label: 'Thể thao' },
  { value: 'elegant', label: 'Thanh lịch' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'minimalist', label: 'Tối giản' },
  { value: 'vintage', label: 'Cổ điển' }
]

const occasionOptions = [
  { value: 'daily', label: 'Hàng ngày' },
  { value: 'work', label: 'Công việc' },
  { value: 'party', label: 'Tiệc tối' },
  { value: 'wedding', label: 'Đám cưới' },
  { value: 'date', label: 'Hẹn hò' },
  { value: 'sport', label: 'Thể thao' },
  { value: 'travel', label: 'Du lịch' }
]

const validateForm = (): boolean => {
  errors.skinColor = !formData.skinColor
  errors.bust = !formData.bust
  errors.waist = !formData.waist
  errors.hip = !formData.hip

  return !errors.skinColor && !errors.bust && !errors.waist && !errors.hip
}

// Convert markdown to HTML
const parseMarkdown = (text: string): string => {
  if (!text) return ''

  return (
    text
      // Headers
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-base font-semibold text-gray-800 mt-3 mb-2">$1</h3>'
      )
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold text-gray-800 mt-3 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-gray-800 mt-3 mb-2">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Unordered lists
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      // Line breaks
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>')
  )
}

const formattedRecommendation = computed(() => {
  if (!recommendation.value?.recommendation) return ''
  return parseMarkdown(recommendation.value.recommendation)
})

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.add({
      severity: 'warn',
      summary: 'Thiếu thông tin',
      detail: 'Vui lòng điền đầy đủ các trường bắt buộc',
      life: 3000
    })
    return
  }

  loading.value = true
  recommendation.value = null

  try {
    const response = await getFashionRecommendation(formData)

    if (response.code === 1000) {
      recommendation.value = response.result
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã nhận được lời khuyên thời trang!',
        life: 3000
      })
    } else {
      throw new Error(response.message || 'Không thể nhận lời khuyên')
    }
  } catch (error: any) {
    console.error('Error getting fashion recommendation:', error)
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: error.message || 'Không thể nhận lời khuyên thời trang. Vui lòng thử lại.',
      life: 5000
    })
  } finally {
    loading.value = false
  }
}

// Reset form when dialog closes
watch(dialogVisible, (newVal) => {
  if (!newVal) {
    // Reset form after a delay to avoid visual glitch
    setTimeout(() => {
      Object.assign(formData, {
        skinColor: '',
        bust: '',
        waist: '',
        hip: '',
        height: '',
        weight: '',
        style: '',
        occasion: '',
        additionalInfo: ''
      })
      recommendation.value = null
      Object.assign(errors, {
        skinColor: false,
        bust: false,
        waist: false,
        hip: false
      })
    }, 300)
  }
})
</script>

<style>
.fashion-advisor-dialog .p-dialog-content {
  padding: 0 !important;
}

.fashion-advisor-dialog .p-dialog-header {
  padding: 1rem 1.5rem 0 1.5rem !important;
}
</style>
