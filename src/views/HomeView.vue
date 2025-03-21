<template>
  <div class="flex flex-col bg-header bg-contain !object-cover bg-no-repeat pt-24 h-auto">
    <!-- Search bar -->
    <div class="w-full h-[400px] relative mx-auto">
      <div class="absolute top-0 w-96 h-96 bg-white opacity-90 rounded-md left-12 p-10">
        <h1 class="text-2xl font-bold text-pink-400">Sử dụng AI để thử đồ</h1>
        <p class="text-gray-600">
          Chào mừng bạn đến với Subflower – Nền tảng thời trang ứng dụng AI thử đồ hiện đại nhất!
          <br />
          💡 Chỉ cần tải lên một bức ảnh, hệ thống AI của chúng tôi sẽ giúp bạn thử ngay những bộ
          trang phục yêu thích mà không cần đến cửa hàng.
        </p>
      </div>
    </div>
    <!-- Featured Products -->
    <div class="bg-[#FEF1F6] w-full rounded-t-[50px] p-5 flex flex-col lg:px-24 pt-10">
      <div class="flex gap-4">
        <div class="flex flex-col lg:col-span-1">
          <span>Chọn danh mục</span>
          <Dropdown
            class="w-52 rounded-lg border-[3px] border-blue-300"
            v-model="selectedCategory"
            :options="categoryOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Chọn danh mục quần áo"
          />
        </div>

        <div class="flex flex-col lg:col-span-1">
          <span>Khoảng giá</span>
          <Dropdown
            class="w-52 rounded-lg border-[3px] border-blue-300"
            v-model="selectedPriceRange"
            :options="priceRangeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Chọn khoảng giá"
          />
        </div>

        <div class="flex items-end lg:col-span-1">
          <Button
            class="w-52 flex flex-col !bg-blue-300 border-[3px] !border-blue-400"
            value="search"
            @click="submit"
          >
            <div class="flex items-center justify-center">
              <i class="pi pi-search mr-2" />Tìm kiếm
            </div>
          </Button>
        </div>
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
      <h2 class="text-3xl font-bold mb-8 text-center text-pink-400 mt-10">Sản phẩm nổi bật</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="product in productStore.products"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          :class="product.productItem.length > 0 ? '' : 'hidden'"
        >
          <div v-if="product.productItem.length > 0" class="flex flex-col w-full">
            <img
              :src="product.productItem[0].url"
              :alt="product.name"
              class="w-full h-48 object-contain mx-auto flex items-center justify-center"
            />
            <div class="p-4 flex flex-col justify-between">
              <div>
                <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
                <p class="text-gray-600 mb-2">{{ product.productItem[0].price }} đ</p>
              </div>
              <Button
                label="Chi tiết"
                icon="pi pi-arrow-up-right"
                class="w-full"
                @click="router.push({ name: 'login-screen' })"
              />
            </div>
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

  <main class="px-44 mt-20">
    <div class="my-20">
      <h1
        class="font-semibold mb-2 text-2xl text-center w-full text-pink-400 whitespace-nowrap mx-2"
      >
        <i class="pi pi-angle-double-up text-pink-400" style="font-size: 1rem"></i>
        Xu hướng thời trang
        <i class="pi pi-angle-double-up text-pink-400" style="font-size: 1rem"></i>
      </h1>
      <Carousel
        :value="bestSellingProducts"
        :numVisible="3"
        :numScroll="1"
        circular
        :autoplayInterval="2000"
      >
        <template #item="slotProps">
          <div
            class="bg-white w-80 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer mx-auto"
          >
            <div class="relative h-44">
              <img
                :src="slotProps.data?.image"
                :alt="slotProps.data?.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg">
                -{{ slotProps.data?.discount }}%
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2">{{ slotProps.data?.name }}</h3>
              <p class="text-gray-600 line-clamp-2 mb-2">{{ slotProps.data?.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-red-500 font-bold">{{ slotProps.data?.price }} đ</span>
                <Button icon="pi pi-shopping-cart" class="p-button-rounded" />
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import router from '@/router'
import Dropdown from 'primevue/dropdown'
import { useProductStore } from '@/stores/productStore'

const { t } = useI18n()
const productStore = useProductStore()

const selectedCategory = ref()
const selectedPriceRange = ref()

const categoryOptions = [
  { label: 'Áo', value: 'shirts' },
  { label: 'Quần', value: 'pants' },
  { label: 'Váy', value: 'dresses' },
  { label: 'Phụ kiện', value: 'accessories' }
]

const priceRangeOptions = [
  { label: 'Dưới 200.000đ', value: '0-200000' },
  { label: '200.000đ - 500.000đ', value: '200000-500000' },
  { label: '500.000đ - 1.000.000đ', value: '500000-1000000' },
  { label: 'Trên 1.000.000đ', value: '1000000-up' }
]

const featuredProducts = ref([
  { id: 1, name: 'Áo sơ mi nam', price: '299.000', image: '/tets.jpeg' },
  { id: 2, name: 'Váy hoa nữ', price: '399.000', image: '/tets.jpeg' },
  { id: 3, name: 'Quần jean nam', price: '499.000', image: '/tets.jpeg' },
  { id: 4, name: 'Áo khoác nữ', price: '599.000', image: '/tets.jpeg' }
])

const bestSellingProducts = ref([
  { id: 1, name: 'Áo len cao cấp', price: '799.000', discount: 20, image: '/tets.jpeg' },
  { id: 2, name: 'Váy dạ hội', price: '1.299.000', discount: 15, image: '/tets.jpeg' },
  { id: 3, name: 'Set đồ công sở', price: '899.000', discount: 25, image: '/tets.jpeg' }
])

const submit = async () => {
  router.push({ name: 'search-results' })
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
