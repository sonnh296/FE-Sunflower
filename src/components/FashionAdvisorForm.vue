<template>
  <div class="fashion-advisor-container w-full bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Tư vấn thời trang AI
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Nhận lời khuyên thời trang cá nhân hóa dựa trên số đo cơ thể và màu da của bạn
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Form Section -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-semibold text-gray-800 mb-6">Thông tin của bạn</h3>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Skin Color -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Màu da <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="color in skinColorOptions"
                  :key="color.value"
                  type="button"
                  @click="formData.skinColor = color.value"
                  :class="[
                    'p-4 rounded-lg border-2 transition-all duration-200',
                    formData.skinColor === color.value
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300'
                  ]"
                >
                  <div :class="color.colorClass" class="w-12 h-12 rounded-full mx-auto mb-2"></div>
                  <span class="text-sm font-medium text-gray-700">{{ color.label }}</span>
                </button>
              </div>
            </div>

            <!-- Body Measurements -->
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Vòng ngực (cm) <span class="text-red-500">*</span>
                </label>
                <InputText
                  v-model="formData.bust"
                  type="number"
                  placeholder="85"
                  class="w-full"
                  :class="{'border-red-500': errors.bust}"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Vòng eo (cm) <span class="text-red-500">*</span>
                </label>
                <InputText
                  v-model="formData.waist"
                  type="number"
                  placeholder="65"
                  class="w-full"
                  :class="{'border-red-500': errors.waist}"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Vòng mông (cm) <span class="text-red-500">*</span>
                </label>
                <InputText
                  v-model="formData.hip"
                  type="number"
                  placeholder="90"
                  class="w-full"
                  :class="{'border-red-500': errors.hip}"
                />
              </div>
            </div>

            <!-- Height & Weight -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Chiều cao (cm)
                </label>
                <InputText
                  v-model="formData.height"
                  type="number"
                  placeholder="165"
                  class="w-full"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Cân nặng (kg)
                </label>
                <InputText
                  v-model="formData.weight"
                  type="number"
                  placeholder="55"
                  class="w-full"
                />
              </div>
            </div>

            <!-- Style Preference -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
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
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Dịp
              </label>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Thông tin thêm
              </label>
              <Textarea
                v-model="formData.additionalInfo"
                rows="3"
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
              class="w-full !py-4 !text-lg !font-semibold !bg-gradient-to-r !from-purple-600 !to-pink-600 hover:!from-purple-700 hover:!to-pink-700 !border-0 !shadow-lg"
            />
          </form>
        </div>

        <!-- Results Section -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-semibold text-gray-800 mb-6">Kết quả tư vấn</h3>
          
          <div v-if="loading" class="flex items-center justify-center py-20">
            <ProgressSpinner class="w-12 h-12" />
          </div>

          <div v-else-if="recommendation" class="space-y-6">
            <!-- Location Info -->
            <div v-if="recommendation.userLocation" class="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <i class="pi pi-map-marker"></i>
              <span>{{ recommendation.userLocation }}</span>
            </div>

            <!-- Body Type -->
            <div v-if="recommendation.bodyType" class="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
              <p class="text-sm font-medium text-gray-700 mb-1">Dáng người của bạn</p>
              <p class="text-xl font-bold text-purple-800 capitalize">{{ recommendation.bodyType }}</p>
            </div>

            <!-- Main Recommendation -->
            <div class="prose max-w-none">
              <div class="text-gray-700 leading-relaxed" v-html="formattedRecommendation"></div>
            </div>

            <!-- Suggested Colors -->
            <div v-if="recommendation.suggestedColors && recommendation.suggestedColors.length > 0">
              <h4 class="text-lg font-semibold text-gray-800 mb-3">Màu sắc phù hợp</h4>
              <div class="flex flex-wrap gap-2">
                <Tag
                  v-for="color in recommendation.suggestedColors"
                  :key="color"
                  :value="color"
                  class="!px-4 !py-2 !bg-purple-100 !text-purple-800"
                />
              </div>
            </div>

            <!-- Suggested Styles -->
            <div v-if="recommendation.suggestedStyles && recommendation.suggestedStyles.length > 0">
              <h4 class="text-lg font-semibold text-gray-800 mb-3">Phong cách đề xuất</h4>
              <div class="flex flex-wrap gap-2">
                <Tag
                  v-for="style in recommendation.suggestedStyles"
                  :key="style"
                  :value="style"
                  class="!px-4 !py-2 !bg-pink-100 !text-pink-800"
                />
              </div>
            </div>

            <!-- Additional Tips -->
            <div v-if="recommendation.additionalTips" class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 class="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <i class="pi pi-lightbulb"></i>
                Mẹo bổ sung
              </h4>
              <p class="text-gray-700 leading-relaxed">{{ recommendation.additionalTips }}</p>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center py-20 text-center">
            <i class="pi pi-info-circle text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-500">Điền vào biểu mẫu để nhận lời khuyên thời trang cá nhân hóa</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'
import { getFashionRecommendation, type FashionAdvisorRequest, type FashionAdvisorResponse } from '@/api/fashionAdvisorApi'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

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
  
  return text
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-gray-800 mt-4 mb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-800 mt-4 mb-2">$1</h1>')
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
</script>

<style scoped>
/* Animation for fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fashion-advisor-container > div {
  animation: fadeIn 0.6s ease-out;
}
</style>
