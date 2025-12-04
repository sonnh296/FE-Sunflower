<template>
  <div class="news-management-container max-w-7xl mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Quản lý tin tức</h1>
      <Button
        label="Tạo tin tức mới"
        icon="pi pi-plus"
        @click="showCreateDialog = true"
        class="!bg-primary !border-0"
      />
    </div>

    <div v-if="newsStore.loading" class="text-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="news in newsStore.newsList"
          :key="news.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            :src="news.imageUrl || '/noavatar.png'"
            :alt="news.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <div class="flex items-center gap-2 mb-2">
              <span
                :class="news.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                class="text-xs px-2 py-1 rounded-full"
              >
                {{ news.published ? 'Đã xuất bản' : 'Nháp' }}
              </span>
            </div>
            <h3 class="font-bold text-lg mb-2">{{ news.title }}</h3>
            <p class="text-sm text-gray-600 line-clamp-2 mb-4">{{ news.content }}</p>
            <div class="flex gap-2">
              <Button
                label="Sửa"
                icon="pi pi-pencil"
                size="small"
                @click="editNews(news)"
                class="!bg-blue-500 !border-0 flex-1"
              />
              <Button
                label="Xóa"
                icon="pi pi-trash"
                size="small"
                severity="danger"
                @click="confirmDelete(news.id)"
                class="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Dialog -->
    <Dialog
      v-model:visible="showCreateDialog"
      :header="editingNews ? 'Sửa tin tức' : 'Tạo tin tức mới'"
      :style="{ width: '50rem' }"
      :modal="true"
    >
      <div class="space-y-4">
        <div>
          <label class="block mb-2 font-medium">Tiêu đề *</label>
          <InputText v-model="newsForm.title" class="w-full" placeholder="Nhập tiêu đề" />
        </div>
        <div>
          <label class="block mb-2 font-medium">Nội dung *</label>
          <Textarea v-model="newsForm.content" class="w-full" rows="6" placeholder="Nhập nội dung" />
        </div>
        <div>
          <label class="block mb-2 font-medium">Hình ảnh</label>
          <input
            type="file"
            @change="handleImageSelect"
            accept="image/*"
            class="w-full border rounded p-2"
          />
          <img
            v-if="newsForm.imageUrl"
            :src="newsForm.imageUrl"
            class="mt-2 w-32 h-32 object-cover rounded"
          />
        </div>
        <div class="flex items-center gap-2">
          <Checkbox v-model="newsForm.published" binary :inputId="'published'" />
          <label for="published">Xuất bản ngay</label>
        </div>
      </div>
      <template #footer>
        <Button label="Hủy" @click="closeDialog" class="!bg-gray-200 !text-gray-700 !border-0" />
        <Button
          :label="editingNews ? 'Cập nhật' : 'Tạo'"
          @click="saveNews"
          :loading="saving"
          class="!bg-primary !border-0"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNewsStore } from '@/stores/newsStore'
import type { NewsRequest, NewsResponse } from '@/api/newsApi'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import ProgressSpinner from 'primevue/progressspinner'

const newsStore = useNewsStore()
const toast = useToast()
const confirm = useConfirm()

const showCreateDialog = ref(false)
const editingNews = ref<NewsResponse | null>(null)
const saving = ref(false)
const selectedImage = ref<File | null>(null)

const newsForm = ref<NewsRequest>({
  title: '',
  content: '',
  published: false,
  imageUrl: undefined
})

const handleImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedImage.value = target.files[0]
    // Preview
    const reader = new FileReader()
    reader.onload = (e) => {
      newsForm.value.imageUrl = e.target?.result as string
    }
    reader.readAsDataURL(target.files[0])
  }
}

const editNews = (news: NewsResponse) => {
  editingNews.value = news
  newsForm.value = {
    title: news.title,
    content: news.content,
    published: news.published,
    imageUrl: news.imageUrl || undefined
  }
  selectedImage.value = null
  showCreateDialog.value = true
}

const closeDialog = () => {
  showCreateDialog.value = false
  editingNews.value = null
  newsForm.value = {
    title: '',
    content: '',
    published: false,
    imageUrl: undefined
  }
  selectedImage.value = null
}

const saveNews = async () => {
  saving.value = true
  try {
    let savedNews
    if (editingNews.value) {
      savedNews = await newsStore.updateNews(editingNews.value.id, newsForm.value)
    } else {
      savedNews = await newsStore.createNews(newsForm.value)
    }

    // Upload image if selected
    if (selectedImage.value && savedNews) {
      await newsStore.uploadNewsImage(savedNews.id, selectedImage.value)
    }

    toast.add({
      severity: 'success',
      summary: 'Thành công',
      detail: editingNews.value ? 'Cập nhật tin tức thành công' : 'Tạo tin tức thành công',
      life: 3000
    })

    closeDialog()
    await newsStore.fetchPublishedNews()
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

const confirmDelete = (id: string) => {
  confirm.require({
    message: 'Bạn có chắc chắn muốn xóa tin tức này?',
    header: 'Xác nhận xóa',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      try {
        await newsStore.deleteNews(id)
        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Xóa tin tức thành công',
          life: 3000
        })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể xóa tin tức',
          life: 3000
        })
      }
    }
  })
}

onMounted(async () => {
  await newsStore.fetchPublishedNews(0, 50)
})
</script>
