<template>
  <div class="mx-20">
    <!-- Product Items List -->
    <div class="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 class="text-2xl font-bold mb-4">Thử đồ</h2>

      <div class="flex flex-col gap-4 items-center w-full">
        <div class="flex gap-4 w-full">
          <div
            class="flex flex-col gap-4 w-1/3 items-center border-dashed border-2 border-gray-300 rounded-md p-4"
          >
            <Image
              :src="productItemStore.productItem?.url"
              alt="productItemStore.productItem?.size"
              width="180"
              height="180"
              preview
              class="rounded-md w-1/3"
            />
          </div>

          <div class="flex flex-col gap-4 items-center m-1 w-1/3">
            <h1>Chọn ảnh để thử đồ</h1>
            <FileUpload
              mode="basic"
              name="demo[]"
              :showUploadButton="false"
              accept="image/png, image/jpeg"
              :maxFileSize="1000000"
              @select="onImageSelect"
              class="w-28 py-1"
            />
            <button
              @click="generateImage"
              :disabled="!selectedImage || tryOnStore.generating"
              class="bg-blue-500 text-white px-4 py-1.5 disabled:opacity-50 w-28 rounded-md"
            >
              {{ tryOnStore.generating ? 'Đang tạo...' : 'Tạo' }}
            </button>
          </div>
          <div
            class="flex flex-col gap-4 w-1/3 items-center border-dashed border-2 border-gray-300 rounded-md p-4"
          >
            <Image
              v-if="selectedImgTemp"
              :src="selectedImgTemp"
              alt="selectedImgTemp"
              width="180"
              height="180"
              preview
              class="rounded-md"
            />
          </div>
        </div>
        <ProgressBar
          v-if="tryOnStore.generating"
          mode="indeterminate"
          style="height: 6px"
        ></ProgressBar>

        <div
          v-if="generatedImageUrl"
          class="flex justify-center items-center w-full border-dashed border-2 border-blue-300 rounded-md p-4"
        >
          <Image
            v-if="generatedImageUrl"
            :src="generatedImageUrl"
            alt="Generated try-on image"
            width="180"
            height="180"
            preview
            class="rounded-md"
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
