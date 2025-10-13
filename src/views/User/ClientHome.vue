<template>
  <div class="flex flex-col bg-contain !object-cover bg-no-repeat h-auto">
    <!-- Search bar -->
    <div class="w-full max-w-full min-h-[400px] flex flex-row px-4">
      <div
        class="bg-white px-10 opacity-80 flex-none rounded-md p-6 justify-center w-96 h-96 mb-4 md:mb-0 flex-shrink-0 flex items-center"
      >
        <div class="w-full">
          <h1 class="text-2xl font-bold text-pink-400 mb-2">Sử dụng AI để thử đồ</h1>
          <p class="text-gray-600 text-base md:text-sm">
            Chào mừng bạn đến với Elsun – Nền tảng thời trang ứng dụng AI thử đồ hiện đại nhất!
            <br />
            💡 Chỉ cần tải lên một bức ảnh, hệ thống AI của chúng tôi sẽ giúp bạn thử ngay những bộ
            trang phục yêu thích mà không cần đến cửa hàng.
          </p>
        </div>
      </div>

      <div class="items-center justify-center my-0 px-2 md:px-0 flex-1">
        <div class="w-[1000px]">
          <Carousel
            :value="bestSellingProducts"
            :numVisible="3"
            :numScroll="1"
            circular
            :autoplayInterval="2000"
          >
            <template #item="slotProps">
              <div
                class="bg-white h-96 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer mx-auto"
              >
                <div class="relative w-full h-full">
                  <img
                    :src="slotProps.data?.image"
                    :alt="slotProps.data?.name"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
    </div>
    <!-- Featured Products -->
    <div class="w-full px-5">
      <div class="bg-[#FEF1F6] rounded-[50px] p-5 flex flex-col lg:px-24 pt-10">
        <h2 class="text-3xl font-bold mb-8 text-center text-pink-400 mt-5">Sản phẩm</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="product in productStore.products"
            :key="product.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            :class="product.imageUrls && product.imageUrls.length > 0 ? '' : 'hidden'"
          >
            <div
              v-if="product.imageUrls && product.imageUrls.length > 0"
              class="flex flex-col w-full"
            >
              <img
                :src="product.imageUrls[0]"
                :alt="product.name"
                class="w-full h-48 object-contain mx-auto flex items-center justify-center"
              />
              <div class="p-4 flex flex-col justify-between">
                <div>
                  <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
                  <p class="text-gray-600 mb-2 text-sm">{{ product.description }}</p>
                </div>
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
    </div>
  </div>

  <div class="px-10 md:px-28 lg:px-44 pb-10">
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
    <h2 class="text-xl mt-8">
      🛒 DEAL SỐC FLASH SALE - GIÁ CHỈ TỪ 99K<br />
      🔔 Flash Sale mỗi ngày từ 12h - 14h và 20h - 22h!<br />
      👗 Áo thun, sơ mi, quần jeans giá chỉ từ 99K!<br />
      ⏳ Số lượng có hạn – Nhanh tay săn ngay!
    </h2>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import router from '@/router'
import { useProductStore } from '@/stores/productStore'
import Carousel from 'primevue/carousel'

const productStore = useProductStore()

const bestSellingProducts = ref([
  { id: 1, name: 'Áo len cao cấp', price: '799.000', discount: 20, image: '/sample1.jpeg' },
  { id: 2, name: 'Váy dạ hội', price: '1.299.000', discount: 15, image: '/sample2.jpeg' },
  { id: 3, name: 'Váy dạ hội', price: '1.299.000', discount: 15, image: '/sample3.jpeg' },
  { id: 4, name: 'Váy dạ hội', price: '1.299.000', discount: 15, image: '/sample4.jpeg' },
  { id: 5, name: 'Váy dạ hội', price: '1.299.000', discount: 15, image: '/sample5.jpeg' },
  { id: 6, name: 'Set đồ công sở', price: '899.000', discount: 25, image: '/sample6.jpeg' }
])

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
