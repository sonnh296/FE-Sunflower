<template>
  <div class="flex flex-col bg-header bg-contain !object-cover pt-24 h-auto">
    <!-- Search bar -->
    <div class="w-full h-[400px] relative mx-auto">
      <div class="absolute top-0 w-96 h-96 bg-white opacity-90 rounded-md left-12 p-10">
        <h1 class="text-2xl font-bold text-pink-400">Sử dụng AI để thử đồ</h1>
        <p class="text-gray-600">
          Chào mừng bạn đến với Subflower – Nền tảng thời trang ứng dụng AI thử đồ hiện đại nhất!
          <br />
          💡 Chỉ cần tải lên một bức ảnh, hệ thống AI của chúng tôi sẽ giúp bạn thử ngay những bộ
          trang phục yêu thích mà không cần đến cửa hàng.
          <br />
          <br />
          <a
            href="https://klingai.com/try-on/try-on/new"
            target="_blank"
            class="text-pink-400 font-bold"
          >
            Được hỗ trợ bởi Kling AI
          </a>
        </p>
      </div>
    </div>
    <!-- Featured Products -->
    <div class="bg-[#FEF1F6] w-full rounded-t-[50px] p-5 flex flex-col lg:px-24 pt-10">
      <div class="flex gap-4">
        <!-- 
        <div class="items-center w-full flex flex-col pt-16">
          <h1 class="text-3xl font-extrabold text-white mb-2">
            Thời trang phong cách, giá cả hợp lý
          </h1>

          <div class="mx-auto flex items-center">
            <InputText
              type="text"
              class="bg-transparent text-white !rounded-full w-96 mx-auto border-2 border-white !placeholder-slate-300"
              v-model="searchKeyword"
              placeholder="Tìm kiếm quần áo..."
            />
            <i
              class="pi pi-search ml-2 text-white cursor-pointer"
              @click="onSearch"
              style="font-size: 1.5rem"
            ></i>
          </div>
        </div> -->
      </div>
      <h2 class="text-3xl font-bold mb-8 text-center text-pink-400 mt-10">Sản phẩm</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="product in productStore.products"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
        >
          <img
            :src="product.productItem[0].url"
            :alt="product.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 mb-2">{{ product.productItem[0].price }} đ</p>
            <Button
              label="Chi tiết"
              icon="pi pi-arrow-up-right"
              class="w-full"
              @click="goToProduct(product.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr />

  <div class="px-10 md:px-28 lg:px-44">
    <h2 class="text-2xl font-bold my-8">Tin tức & Khuyến mãi</h2>
    <hr class="border-pink-400 border-1" />
    <h2 class="text-xl my-8">
      🎉 SIÊU SALE THÁNG 3 - GIẢM ĐẾN 50% 🎉 <br />
      💥 Mừng tháng mới, săn sale cực sốc! <br />
      🛍️ Giảm giá đến 50% tất cả sản phẩm thời trang nam & nữ. <br />
      🔥 Mua 2 tặng 1 – Áp dụng cho các mẫu hot trend 2025! <br />
      ⏳ Chương trình chỉ diễn ra từ 20/03 - 31/03, đừng bỏ lỡ!
    </h2>
    <hr class="border-pink-400 border-1" />
    <h2 class="text-xl my-8">
      🛒 DEAL SỐC FLASH SALE - GIÁ CHỈ TỪ 99K<br />
      🔔 Flash Sale mỗi ngày từ 12h - 14h và 20h - 22h!<br />
      👗 Áo thun, sơ mi, quần jeans giá chỉ từ 99K!<br />
      ⏳ Số lượng có hạn – Nhanh tay săn ngay!
    </h2>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { onMounted } from 'vue'
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import router from '@/router'
import Dropdown from 'primevue/dropdown'
import { useProductStore } from '@/stores/productStore'

const selectedCategory = ref()
const selectedPriceRange = ref()

const productStore = useProductStore()

const submit = async () => {
  router.push({ name: 'search-results' })
}

const onSearch = async () => {
  if (router.currentRoute.value.name === 'search-results') return
  router.push({ name: 'search-results' })
}

const goToProduct = (productId: string) => {
  router.push({ name: 'user-product', params: { id: productId } })
}

onMounted(async () => {
  await productStore.getProducts()
})
</script>

<style scoped>
.bg-header {
  background-image: url('/homepage.jpg');
}
</style>
