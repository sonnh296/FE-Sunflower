<template>
  <div class="banner-management-container max-w-5xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Quản lý Banner trang chủ</h1>

    <div v-if="bannerStore.loading" class="text-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else>
      <!-- Current Active Banner -->
      <div v-if="bannerStore.activeBanner" class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Banner hiện tại</h2>
        <div class="space-y-4">
          <img
            v-if="bannerStore.activeBanner.imageUrl"
            :src="bannerStore.activeBanner.imageUrl"
            :alt="bannerStore.activeBanner.title"
            class="w-full h-64 object-cover rounded-lg"
          />
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold">{{ bannerStore.activeBanner.title }}</h3>
              <p class="text-sm text-gray-600">
                Tạo lúc: {{ formatDate(bannerStore.activeBanner.createdAt) }}
              </p>
            </div>
            <span class="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
              Đang hoạt động
            </span>
          </div>
          <div class="flex gap-2">
            <Button
              label="Thay đổi hình ảnh"
              icon="pi pi-image"
              @click="showImageUpload = true"
              class="!bg-blue-500 !border-0"
            />
            <Button
              label="Chỉnh sửa"
              icon="pi pi-pencil"
              @click="editBanner(bannerStore.activeBanner)"
              class="!bg-primary !border-0"
            />
            <Button
              label="Xóa"
              icon="pi pi-trash"
              severity="danger"
              @click="confirmDelete(bannerStore.activeBanner.id)"
            />
          </div>
        </div>
      </div>

      <!-- Create Banner Button -->
      <div v-else class="bg-white rounded-lg shadow-md p-8 text-center">
        <i class="pi pi-image text-6xl text-gray-400 mb-4"></i>
        <p class="text-gray-500 mb-4">Chưa có banner nào được tạo</p>
        <Button
          label="Tạo banner mới"
          icon="pi pi-plus"
          @click="showCreateDialog = true"
          class="!bg-primary !border-0"
        />
      </div>
    </div>

    <!-- Create/Edit Dialog -->
    <Dialog
      v-model:visible="showCreateDialog"
      :header="editingBanner ? 'Sửa banner' : 'Tạo banner mới'"
      :style="{ width: '40rem' }"
      :modal="true"
    >
      <div class="space-y-4">
        <div>
          <label class="block mb-2 font-medium">Tiêu đề *</label>
          <InputText v-model="bannerForm.title" class="w-full" placeholder="Nhập tiêu đề banner" />
        </div>
        <div class="flex items-center gap-2">
          <Checkbox v-model="bannerForm.isActive" binary :inputId="'active'" />
          <label for="active">Kích hoạt ngay</label>
        </div>
      </div>
      <template #footer>
        <Button label="Hủy" @click="closeDialog" class="!bg-gray-200 !text-gray-700 !border-0" />
        <Button
          :label="editingBanner ? 'Cập nhật' : 'Tạo'"
          @click="saveBanner"
          :loading="saving"
          class="!bg-primary !border-0"
        />
      </template>
    </Dialog>

    <!-- Image Upload Dialog -->
    <Dialog
      v-model:visible="showImageUpload"
      header="Thay đổi hình ảnh banner"
      :style="{ width: '40rem' }"
      :modal="true"
    >
      <div class="space-y-4">
        <div>
          <label class="block mb-2 font-medium">Chọn hình ảnh</label>
          <input
            type="file"
            @change="handleImageSelect"
            accept="image/*"
            class="w-full border rounded p-2"
          />
          <img
            v-if="previewImage"
            :src="previewImage"
            class="mt-4 w-full h-64 object-cover rounded"
          />
        </div>
      </div>
      <template #footer>
        <Button label="Hủy" @click="showImageUpload = false" class="!bg-gray-200 !text-gray-700 !border-0" />
        <Button
          label="Tải lên"
          @click="uploadImage"
          :loading="uploading"
          :disabled="!selectedImage"
          class="!bg-primary !border-0"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBannerStore } from '@/stores/bannerStore'
import type { BannerRequest, BannerResponse } from '@/api/bannerApi'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const bannerStore = useBannerStore()
const toast = useToast()
const confirm = useConfirm()

const showCreateDialog = ref(false)
const showImageUpload = ref(false)
const editingBanner = ref<BannerResponse | null>(null)
const saving = ref(false)
const uploading = ref(false)
const selectedImage = ref<File | null>(null)
const previewImage = ref<string>('')

const bannerForm = ref<BannerRequest>({
  title: '',
  content: '',
  isActive: true
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('vi-VN')
}

const handleImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedImage.value = target.files[0]
    // Preview
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(target.files[0])
  }
}

const editBanner = (banner: BannerResponse) => {
  editingBanner.value = banner
  bannerForm.value = {
    title: banner.title,
    content: banner.content,
    isActive: banner.isActive
  }
  showCreateDialog.value = true
}

const closeDialog = () => {
  showCreateDialog.value = false
  editingBanner.value = null
  bannerForm.value = {
    title: '',
    content: '',
    isActive: true
  }
}

const saveBanner = async () => {
  saving.value = true
  try {
    if (editingBanner.value) {
      await bannerStore.updateBanner(editingBanner.value.id, bannerForm.value)
    } else {
      await bannerStore.createBanner(bannerForm.value)
    }

    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: editingBanner.value ? 'Cập nhật banner thành công' : 'Tạo banner thành công',
      life: 3000
    })

    closeDialog()
    await bannerStore.fetchActiveBanner()
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: error.message || 'Có lỗi xảy ra',
      life: 3000
    })
  } finally {
    saving.value = false
  }
}

const uploadImage = async () => {
  if (!selectedImage.value || !bannerStore.activeBanner) return

  uploading.value = true
  try {
    await bannerStore.uploadBannerImage(bannerStore.activeBanner.id, selectedImage.value)
    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Tải lên hình ảnh thành công',
      life: 3000
    })
    showImageUpload.value = false
    selectedImage.value = null
    previewImage.value = ''
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: error.message || 'Không thể tải lên hình ảnh',
      life: 3000
    })
  } finally {
    uploading.value = false
  }
}

const confirmDelete = (id: string) => {
  confirm.require({
    message: 'Bạn có chắc chắn muốn xóa banner này?',
    header: 'Xác nhận xóa',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await bannerStore.deleteBanner(id)
        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Xóa banner thành công',
          life: 3000
        })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể xóa banner',
          life: 3000
        })
      }
    }
  })
}

onMounted(async () => {
  await bannerStore.fetchActiveBanner()
})
</script>

