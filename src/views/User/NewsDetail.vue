<template>
  <div class="news-detail-container max-w-4xl mx-auto p-6">
    <div v-if="newsStore.loading" class="text-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else-if="news" class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <!-- News Image -->
      <div v-if="news.imageUrl" class="w-full h-96 overflow-hidden">
        <img
          :src="news.imageUrl"
          :alt="news.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- News Content -->
      <div class="p-8">
        <!-- Meta Info -->
        <div class="flex items-center gap-4 mb-6 text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <i class="pi pi-calendar"></i>
            <span>{{ formatDate(news.createdAt) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-clock"></i>
            <span>{{ formatTime(news.createdAt) }}</span>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-bold mb-6 text-gray-900">{{ news.title }}</h1>

        <!-- Content -->
        <div class="prose prose-lg max-w-none">
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ news.content }}</p>
        </div>

        <!-- Back Button -->
        <div class="mt-8 pt-8 border-t">
          <Button
            label="Quay lại danh sách tin tức"
            icon="pi pi-arrow-left"
            @click="$router.push('/user/news')"
            class="!bg-gray-200 !text-gray-700 !border-0"
          />
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <i class="pi pi-exclamation-circle text-6xl text-gray-400 mb-4"></i>
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Không tìm thấy tin tức</h2>
      <p class="text-gray-600 mb-6">Tin tức bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      <Button
        label="Quay về danh sách"
        icon="pi pi-arrow-left"
        @click="$router.push('/user/news')"
        class="!bg-primary !border-0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/newsStore'

const route = useRoute()
const newsStore = useNewsStore()

const news = computed(() => newsStore.currentNews)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  const newsId = route.params.id as string
  await newsStore.fetchNewsById(newsId)
})
</script>

<style scoped>
.prose {
  font-size: 1.125rem;
  line-height: 1.75;
}
</style>

