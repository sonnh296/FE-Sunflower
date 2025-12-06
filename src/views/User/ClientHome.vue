<template>
  <div class="flex flex-col bg-white">
    <!-- Hero Section with Image Grid -->
    <div class="relative w-full h-screen overflow-hidden">
      <!-- Image Grid Background -->
      <div class="absolute inset-0 w-full h-full grid grid-cols-4 gap-0">
        <!-- Image 1 -->
        <div class="w-full h-full overflow-hidden">
          <img
            src="/sample1.jpeg"
            alt="Fashion Collection 1"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>
        <!-- Image 2 -->
        <div class="w-full h-full overflow-hidden">
          <img
            src="/sample2.jpeg"
            alt="Fashion Collection 2"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>
        <!-- Image 3 -->
        <div class="w-full h-full overflow-hidden">
          <img
            src="/sample3.jpeg"
            alt="Fashion Collection 3"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>
        <!-- Image 4 -->
        <div class="w-full h-full overflow-hidden">
          <img
            src="/sample4.jpeg"
            alt="Fashion Collection 4"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Hero Content -->
      <div class="relative z-10 h-full flex items-center justify-center px-6 md:px-12 lg:px-20">
        <div class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="text-left space-y-8 animate-fade-in-up">
            <div class="space-y-4">
              <h1
                class="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight"
              >
                Tìm quần áo<br />
                <span class="font-serif italic">phù hợp</span>
              </h1>
              <p class="text-xl md:text-2xl text-white/90 font-light">không cần đến cửa hàng</p>
            </div>

            <div class="flex items-baseline gap-3 animate-fade-in-up animation-delay-200">
              <span class="text-white/80 text-lg font-light">sẵn sàng với</span>
              <span
                class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
              >
                AI Virtual Try-On
              </span>
            </div>

            <div class="pt-4 flex flex-col gap-4 animate-fade-in-up animation-delay-400">
              <!-- Main Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <Button
                  label="Khám phá ngay"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="!bg-white !text-gray-900 hover:!bg-gray-100 !border-0 !font-semibold !py-4 !px-8 !text-lg !rounded-full !shadow-2xl hover:!shadow-3xl !transition-all !duration-300 hover:!scale-105"
                  @click="scrollToProducts"
                />
                <Button
                  label="Xem bộ sưu tập"
                  icon="pi pi-images"
                  iconPos="right"
                  class="!bg-transparent !text-white hover:!bg-white/10 !border-2 !border-white !font-semibold !py-4 !px-8 !text-lg !rounded-full !shadow-xl !transition-all !duration-300 hover:!scale-105"
                  @click="navigateToCollections"
                />
              </div>

              <!-- AI Fashion Advisor Button -->
              <div class="flex flex-col sm:flex-row gap-3 items-center">
                <Button
                  label="Tư vấn thời trang AI"
                  icon="pi pi-sparkles"
                  class="!bg-gradient-to-r !from-purple-500 !to-pink-500 hover:!from-purple-600 hover:!to-pink-600 !text-white !border-0 !font-semibold !py-3 !px-6 !text-base !rounded-full !shadow-xl hover:!shadow-2xl !transition-all !duration-300 hover:!scale-105"
                  @click="showFashionAdvisor"
                />
                <span class="text-white/70 text-sm italic">
                  Nhận gợi ý phù hợp với dáng người của bạn
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div
          class="flex flex-col items-center gap-2 text-white/60 cursor-pointer"
          @click="scrollToNextSection"
        >
          <span class="text-sm uppercase tracking-widest font-light">Khám phá</span>
          <i class="pi pi-chevron-down text-xl"></i>
        </div>
      </div>
    </div>

    <!-- Featured Products Showcase -->
    <div id="products-section" class="w-full py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Sản phẩm nổi bật
          </h2>
          <div class="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
          <p class="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            Những thiết kế được yêu thích nhất với mức giá đặc biệt
          </p>
        </div>

        <!-- Products Grid -->
        <div v-if="isLoadingProducts" class="flex justify-center items-center py-20">
          <i class="pi pi-spin pi-spinner text-4xl text-gray-400"></i>
          <span class="ml-4 text-gray-600">Đang tải sản phẩm...</span>
        </div>

        <div v-else-if="productStore.products.length === 0" class="text-center py-20">
          <i class="pi pi-inbox text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 text-lg">Chưa có sản phẩm nào</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Dynamic Products from API -->
          <div
            v-for="(product, index) in productStore.products.slice(0, 5)"
            :key="product.id"
            class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            @click="navigateToProduct(product)"
          >
            <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                v-if="product.imageUrls && product.imageUrls.length > 0"
                :src="product.imageUrls[0]"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                <i class="pi pi-image text-6xl text-gray-400"></i>
              </div>
              <div
                v-if="index === 0"
                class="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                Best Seller
              </div>
              <div
                v-else-if="index === 1"
                class="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                Bộ Sưu Tập
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span
                  :class="[
                    'text-xs font-medium px-2.5 py-0.5 rounded-full',
                    index % 5 === 0
                      ? 'bg-pink-100 text-pink-800'
                      : index % 5 === 1
                        ? 'bg-blue-100 text-blue-800'
                        : index % 5 === 2
                          ? 'bg-purple-100 text-purple-800'
                          : index % 5 === 3
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                  ]"
                >
                  {{ product.name }}
                </span>
              </div>
              <h3 class="font-semibold text-xl text-gray-900 mb-3">
                {{ product.name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ product.description || 'Sản phẩm chất lượng cao, thiết kế đẹp mắt' }}
              </p>
              <Button
                label="Xem chi tiết"
                icon="pi pi-arrow-right"
                iconPos="right"
                :class="[
                  'w-full !text-white !border-0 !font-medium !py-3 !rounded-xl !transition-all !duration-300',
                  index % 5 === 0
                    ? '!bg-pink-500 hover:!bg-pink-600'
                    : index % 5 === 1
                      ? '!bg-blue-500 hover:!bg-blue-600'
                      : index % 5 === 2
                        ? '!bg-purple-500 hover:!bg-purple-600'
                        : index % 5 === 3
                          ? '!bg-amber-500 hover:!bg-amber-600'
                          : '!bg-rose-500 hover:!bg-rose-600'
                ]"
                @click.stop="navigateToProduct(product)"
              />
            </div>
          </div>

          <!-- More Options Card -->
          <div
            v-if="productStore.products.length > 0"
            class="group bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex items-center justify-center p-8 cursor-pointer"
            @click="scrollToNextSection"
          >
            <div class="text-center text-white">
              <i
                class="pi pi-arrow-right text-5xl mb-4 group-hover:translate-x-2 transition-transform duration-300"
              ></i>
              <h3 class="font-semibold text-2xl mb-2">Khám phá thêm</h3>
              <p class="text-gray-300 text-sm">Xem toàn bộ bộ sưu tập</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Social Media Section -->
    <div class="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 py-16 px-6">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-center text-2xl font-light text-gray-800 mb-3 tracking-wide">
          Kết nối với <span class="font-serif italic">Elsun</span>
        </h3>
        <p class="text-center text-gray-600 mb-10 text-sm">
          Theo dõi chúng tôi để cập nhật xu hướng mới nhất
        </p>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          <a
            href="mailto:elsunxinh@gmail.com"
            class="flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 group border border-amber-100/50"
          >
            <i
              class="pi pi-envelope text-amber-600 text-3xl mb-3 group-hover:scale-110 transition-transform"
            ></i>
            <div class="font-medium text-gray-800 text-sm">Email</div>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61576868692347"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 group border border-amber-100/50"
          >
            <i
              class="pi pi-facebook text-blue-600 text-3xl mb-3 group-hover:scale-110 transition-transform"
            ></i>
            <div class="font-medium text-gray-800 text-sm">Facebook</div>
          </a>
          <a
            href="https://www.instagram.com/elsunxinh"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 group border border-amber-100/50"
          >
            <i
              class="pi pi-instagram text-pink-500 text-3xl mb-3 group-hover:scale-110 transition-transform"
            ></i>
            <div class="font-medium text-gray-800 text-sm">Instagram</div>
          </a>
          <a
            href="https://vt.tiktok.com/ZSkfA5hC6/?page=TikTokShop"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 group border border-amber-100/50"
          >
            <i
              class="pi pi-tiktok text-gray-900 text-3xl mb-3 group-hover:scale-110 transition-transform"
            ></i>
            <div class="font-medium text-gray-800 text-sm">TikTok</div>
          </a>
          <a
            href="https://shopee.vn/elsun.studio?categoryId=100017&entryPoint=ShopByPDP&itemId=40753356114"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 group border border-amber-100/50"
          >
            <i
              class="pi pi-shopping-cart text-orange-500 text-3xl mb-3 group-hover:scale-110 transition-transform"
            ></i>
            <div class="font-medium text-gray-800 text-sm">Shopee</div>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- About Section -->
  <div class="relative bg-gradient-to-b from-white via-gray-50 to-white py-32">
    <!-- Elegant background pattern -->
    <div class="absolute inset-0 opacity-20">
      <div
        class="w-full h-full"
        style="
          background-image: radial-gradient(
            circle at 2px 2px,
            rgba(156, 163, 175, 0.15) 1px,
            transparent 0
          );
          background-size: 40px 40px;
        "
      ></div>
    </div>

    <div class="relative max-w-5xl mx-auto px-6 md:px-12">
      <!-- Brand Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
          <span class="font-serif italic">Elsun</span>
        </h1>
        <p class="text-xl text-gray-600 font-light italic mb-8 tracking-wide">
          Empower Your Feminine Grace
        </p>
        <div
          class="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"
        ></div>
      </div>

      <!-- Content Card -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-2xl border border-gray-100"
      >
        <div class="space-y-8">
          <p class="text-gray-700 leading-relaxed text-center text-lg md:text-xl font-light">
            Elsun là thương hiệu thời trang nữ được lấy cảm hứng từ sự kết hợp hoàn hảo giữa
            <span class="italic font-semibold text-gray-900">"elegant"</span> (thanh lịch) và
            <span class="italic font-semibold text-gray-900">"sun"</span> (mặt trời), mang đến những
            thiết kế rạng rỡ, toát lên vẻ đẹp tinh tế và năng động.
          </p>

          <!-- Decorative Divider -->
          <div class="flex items-center justify-center py-4">
            <div class="w-16 h-px bg-gray-300"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full mx-6"></div>
            <div class="w-16 h-px bg-gray-300"></div>
          </div>

          <p class="text-gray-700 leading-relaxed text-center text-lg md:text-xl font-light">
            Với phong cách cá tính, trẻ trung và sang trọng, chúng tôi cam kết mang đến cho bạn
            những sản phẩm chất lượng cao, giúp bạn tự tin thể hiện bản sắc riêng biệt trong mọi
            khoảnh khắc.
          </p>

          <!-- Store Hours -->
          <div class="pt-8 text-center">
            <div class="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-full">
              <i class="pi pi-clock text-gray-600"></i>
              <span class="text-sm font-medium tracking-wider text-gray-700 uppercase">
                ELSUN Online Store: 8AM - 10PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fashion Advisor Dialog -->
  <FashionAdvisorDialog v-model:visible="showAdvisorDialog" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import router from '@/router'
import { useProductStore } from '@/stores/productStore'
import FashionAdvisorDialog from '@/components/dialogs/FashionAdvisorDialog.vue'

const productStore = useProductStore()
const isLoadingProducts = ref(false)

// Fashion Advisor Dialog
const showAdvisorDialog = ref(false)

const navigateToProduct = (product: any) => {
  router.push({ name: 'product-guest', params: { id: product.id } })
}

const scrollToNextSection = () => {
  window.scrollBy({
    top: window.innerHeight - 100,
    behavior: 'smooth'
  })
}

const scrollToProducts = () => {
  const productsSection = document.getElementById('products-section')
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const navigateToCollections = () => {
  router.push({ name: 'collections' })
}

const showFashionAdvisor = () => {
  showAdvisorDialog.value = true
}

onMounted(async () => {
  isLoadingProducts.value = true
  await productStore.getProducts()
  isLoadingProducts.value = false
})
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Enhanced shadows */
.hover\:shadow-3xl:hover {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}
</style>
