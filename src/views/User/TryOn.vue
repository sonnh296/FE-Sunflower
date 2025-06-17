<template>
  <div class="tryon-bg min-h-screen flex items-center justify-center py-10">
    <div
      class="tryon-card bg-white p-10 rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col gap-8"
    >
      <h2 class="text-3xl font-extrabold text-center mb-2 tracking-tight text-blue-700">
        Thử Đồ Ảo
      </h2>
      <div class="flex flex-col md:flex-row gap-8 items-stretch w-full">
        <!-- Step 1: Product Image -->
        <div
          class="tryon-step flex-1 flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-blue-100 bg-blue-50 relative"
        >
          <div class="tryon-step-badge">1</div>
          <span class="font-semibold text-blue-600">Sản phẩm</span>
          <div class="w-32 h-14"></div>
          <div class="tryon-img-frame">
            <Image
              :src="productItemStore.productItem?.url"
              alt="productItemStore.productItem?.size"
              width="180"
              height="180"
              preview
              class="tryon-img"
              :previewImageStyle="{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain' }"
            />
          </div>
        </div>
        <!-- Step 2: Upload User Image -->
        <div
          class="tryon-step flex-1 flex flex-col items-center gap-6 p-6 rounded-2xl border-2 border-blue-100 bg-blue-50 relative"
        >
          <div class="tryon-step-badge">2</div>
          <span class="font-semibold text-blue-600">Chọn ảnh của bạn</span>
          <div class="w-32 h-8">
            <FileUpload
              mode="basic"
              name="demo[]"
              :showUploadButton="false"
              accept="image/png, image/jpeg"
              :maxFileSize="1000000"
              @select="onImageSelect"
            />
          </div>

          <div v-if="selectedImgTemp" class="mt-2 tryon-img-frame">
            <Image
              :src="selectedImgTemp"
              alt="selectedImgTemp"
              preview
              class="tryon-img"
              :previewImageStyle="{ objectFit: 'cover' }"
            />
          </div>
        </div>
      </div>
      <!-- Button outside the steps -->
      <div class="flex justify-center mt-2">
        <button
          @click="generateImage"
          :disabled="!selectedImage || tryOnStore.generating"
          class="tryon-btn w-40 py-2 rounded-lg text-lg font-semibold transition-all duration-200"
        >
          {{ tryOnStore.generating ? 'Đang tạo...' : 'Tạo ảnh' }}
        </button>
      </div>
      <ProgressBar
        v-if="tryOnStore.generating"
        mode="indeterminate"
        style="height: 6px"
        class="mt-2"
      ></ProgressBar>
      <!-- Step 3: Result -->
      <div
        v-if="generatedImageUrl"
        class="tryon-result flex flex-col items-center justify-center w-full border-4 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 mt-2 shadow-lg animate-fade-in"
      >
        <div class="tryon-step-badge">3</div>
        <span class="font-semibold text-blue-700 mb-2 text-lg">Kết quả thử đồ</span>
        <div class="tryon-img-frame-large">
          <Image
            :src="generatedImageUrl"
            alt="Generated try-on image"
            width="220"
            height="220"
            preview
            class="tryon-img"
            :previewImageStyle="{ maxHeight: '80vh', objectFit: 'contain' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useProductItemStore } from '@/stores/productItemStore'
import { useRoute } from 'vue-router'
import { useTryOnStore } from '@/stores/tryOnStore'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Image from 'primevue/image'
import ProgressBar from 'primevue/progressbar'

const toast = useToast()
const productItemStore = useProductItemStore()
const route = useRoute()
const tryOnStore = useTryOnStore()

const selectedImgTemp = ref<string>('')
const selectedImage = ref<File>()
const generatedImageUrl = ref<string>('')
const isError = ref<boolean>(false)

const generateImage = async () => {
  if (!selectedImage.value || !productItemStore.productItem?.url) return

  try {
    const response = await tryOnStore.generateImage(
      selectedImage.value,
      productItemStore.productItem.url.replace('http://', 'https://')
    )
    generatedImageUrl.value = response.imageUrl
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to generate try-on image',
      life: 3000
    })
  }
}

const onImageSelect = (event: FileUploadSelectEvent) => {
  selectedImage.value = event.files[event.files.length - 1]
  selectedImgTemp.value = URL.createObjectURL(event.files[event.files.length - 1])
}

onMounted(async () => {
  await productItemStore.getProductItemById(route.params.id as string)
})
</script>

<style scoped>
.tryon-bg {
  background: linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 100%);
}
.tryon-card {
  box-shadow: 0 8px 32px 0 rgba(31, 72, 182, 0.12);
}
.tryon-step {
  min-height: 320px;
  position: relative;
  transition: box-shadow 0.2s;
}
.tryon-step-badge {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  background: #2563eb;
  color: #fff;
  font-weight: bold;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
  z-index: 2;
}
.tryon-btn {
  background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
}
.tryon-btn:disabled {
  background: #cbd5e1;
  color: #64748b;
  cursor: not-allowed;
  opacity: 0.7;
}
.tryon-img-frame {
  width: 180px;
  height: 180px;
  background: #fff;
  border: 2px solid #c7d2fe;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(37, 99, 235, 0.07);
}
.tryon-img-frame-large {
  width: 220px;
  height: 220px;
  background: #fff;
  border: 2.5px solid #60a5fa;
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.1);
}
.tryon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  border: none;
}
.tryon-result {
  animation: fadeIn 0.7s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
