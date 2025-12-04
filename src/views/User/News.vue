<template>
  <div class="news-container max-w-7xl mx-auto p-6">
    <h1 class="text-4xl font-bold mb-8 text-center">Tin tức & Sự kiện</h1>

    <div v-if="newsStore.loading" class="text-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else-if="newsStore.newsList.length === 0" class="text-center py-12">
      <i class="pi pi-inbox text-6xl text-gray-400 mb-4"></i>
      <p class="text-gray-500">Chưa có tin tức nào</p>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="news in newsStore.newsList"
          :key="news.id"
          @click="viewNews(news.id)"
          class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
        >
          <div class="relative overflow-hidden h-48">
            <img
              :src="news.imageUrl || '/noavatar.png'"
              :alt="news.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div class="absolute top-4 right-4">
              <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                {{ formatDate(news.createdAt) }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-bold text-xl mb-3 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {{ news.title }}
            </h3>
            <p class="text-gray-600 text-sm line-clamp-3 mb-4">
              {{ news.content }}
            </p>
            <div class="flex items-center text-primary font-medium text-sm">
              Đọc thêm
              <i class="pi pi-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="newsStore.totalPages > 1" class="flex justify-center gap-2 mt-8">
        <Button
          v-for="page in newsStore.totalPages"
          :key="page"
          :label="String(page)"
          @click="changePage(page - 1)"
          :class="currentPage === page - 1 ? '!bg-primary !text-white' : '!bg-gray-200 !text-gray-700'"
          class="!border-0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '@/stores/newsStore'

const router = useRouter()
const newsStore = useNewsStore()

const currentPage = ref(0)
const pageSize = ref(12)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const viewNews = (id: string) => {
  router.push(`/user/news/${id}`)
}

const changePage = async (page: number) => {
  currentPage.value = page
  await newsStore.fetchPublishedNews(page, pageSize.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await newsStore.fetchPublishedNews(currentPage.value, pageSize.value)
})
</script>

