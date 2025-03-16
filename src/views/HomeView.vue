<template>
  <div class="flex flex-col bg-header bg-contain !object-cover pt-24 h-auto">
    <!-- Search bar -->
    <div class="w-full h-[400px] mx-auto">
      <div class="bg-white p-4 bg-opacity-20 mt-4 w-full lg:w-[1000px] mx-auto rounded-md py-6">
        <div class="w-[70%] mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 text-white">
            <div class="flex flex-col lg:col-span-1">
              <span>Chọn danh mục</span>
              <Dropdown
                class="w-full rounded-lg border-[3px] border-blue-300"
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
                class="w-full rounded-lg border-[3px] border-blue-300"
                v-model="selectedPriceRange"
                :options="priceRangeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Chọn khoảng giá"
              />
            </div>

            <div class="flex flex-col lg:col-span-1">
              <span>Chọn tỉnh</span>
              <AutoComplete
                forceSelection
                v-model="selectedProvince"
                :suggestions="filteredProvince"
                @complete="searchProvince"
                @item-select="onProvinceChange"
                optionLabel="full_name"
                dropdown
                :disabled="locationStore.isProvinceLoading"
                :dropdownIcon="
                  locationStore.isProvinceLoading
                    ? 'pi pi-spinner pi-spin animate-spin'
                    : 'pi pi-chevron-down'
                "
                :pt:input:class="'text-base leading-none appearance-none rounded-md rounded-tr-none rounded-br-none m-0 py-2 px-3 text-surface-700 dark:text-white/80 border bg-surface-0 dark:bg-surface-950 border-surface-300 dark:border-surface-700 focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10 transition-colors duration-200 w-full'"
                class="border-[3px] !border-blue-300 rounded-lg"
              />
            </div>

            <div class="flex items-end lg:col-span-1">
              <Button
                class="w-full flex flex-col !bg-blue-300 border-[3px] !border-blue-400"
                value="search"
                @click="submit"
              >
                <div class="flex items-center justify-center">
                  <i class="pi pi-search mr-2" />Tìm kiếm
                </div>
              </Button>
            </div>
          </div>
        </div>
        <ProgressBar
          v-if="locationStore.isProvinceLoading"
          mode="indeterminate"
          style="height: 6px"
        ></ProgressBar>
      </div>

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
      </div>
    </div>

    <!-- Featured Products -->
    <div class="bg-[#FEF1F6] w-full rounded-t-[50px] p-5 flex flex-col lg:px-24 lg:pt-24">
      <h2 class="text-2xl font-bold mb-8 text-center">Sản phẩm nổi bật</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
        >
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 mb-2">{{ product.price }} đ</p>
            <Button label="Thêm vào giỏ" icon="pi pi-shopping-cart" class="w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr />

  <div class="px-10 md:px-28 lg:px-44">
    <h2 class="text-2xl font-bold my-8">Tin tức & Khuyến mãi</h2>
    <ListBlogPosts />
  </div>

  <main class="px-44 mt-20">
    <div class="my-20">
      <h1 class="font-semibold text-xl text-center w-full text-gray-600 whitespace-nowrap mx-2">
        Xu hướng thời trang
        <i class="pi pi-star-fill text-yellow-400" style="font-size: 1rem"></i>
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
import AutoComplete, { type AutoCompleteItemSelectEvent } from 'primevue/autocomplete'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import router from '@/router'
import { useLocationStore } from '@/stores/locationStore'
import ProgressBar from 'primevue/progressbar'
import ListBlogPosts from '@/components/information/ListBlogPosts.vue'
import Dropdown from 'primevue/dropdown'

const { t } = useI18n()
const locationStore = useLocationStore()

const searchKeyword = ref('')
const selectedCategory = ref()
const selectedPriceRange = ref()
const filteredProvince = ref<any[]>([])
const selectedProvince = ref()

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
  { id: 1, name: 'Áo sơ mi nam', price: '299.000', image: '/shirt1.jpg' },
  { id: 2, name: 'Váy hoa nữ', price: '399.000', image: '/dress1.jpg' },
  { id: 3, name: 'Quần jean nam', price: '499.000', image: '/pants1.jpg' },
  { id: 4, name: 'Áo khoác nữ', price: '599.000', image: '/jacket1.jpg' }
])

const bestSellingProducts = ref([
  { id: 1, name: 'Áo len cao cấp', price: '799.000', discount: 20, image: '/sweater.jpg' },
  { id: 2, name: 'Váy dạ hội', price: '1.299.000', discount: 15, image: '/gown.jpg' },
  { id: 3, name: 'Set đồ công sở', price: '899.000', discount: 25, image: '/suit.jpg' }
])

const submit = async () => {
  router.push({ name: 'search-results' })
}

const searchProvince = async (event: any) => {
  if (locationStore.allProvince.length > 0) {
    filteredProvince.value = locationStore.allProvince.filter((item) =>
      item.full_name.toLowerCase().includes(event.query.toLowerCase())
    )
  } else {
    await locationStore.getAllProvinces()
  }
}

const onProvinceChange = (event: AutoCompleteItemSelectEvent) => {
  selectedProvince.value = event.value
}

const onSearch = async () => {
  if (router.currentRoute.value.name === 'search-results') return
  router.push({ name: 'search-results' })
}

onMounted(async () => {
  await locationStore.fetchCurrentLocationDetails()
  if (locationStore.enableLocation) {
    filteredProvince.value = locationStore.allProvince
    selectedProvince.value = locationStore.currentProvince
  }
})
</script>

<style scoped>
.bg-header {
  background-image: url('/homepage.jpg');
}
</style>
