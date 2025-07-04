<template>
  <div class="flex flex-col bg-contain !object-cover bg-no-repeat pt-24 h-auto">
    <!-- Search bar -->
    <div class="w-full min-h-[400px] flex flex-row px-10 md:px-20 py-5">
      <div
        class="bg-gradient-to-br from-[#5c6c99] via-indigo-400 to-purple-700 rounded-3xl flex-none pt-5 justify-center mx-auto h-96 mb-4 md:mb-0 flex items-center shadow-xl border border-white/10 backdrop-blur-sm relative overflow-hidden px-10 w-full"
      >
        <div class="w-1/2 relative z-10">
          <h1 class="text-2xl font-bold text-white mb-4 drop-shadow-md animate-fade-in-up">
            <span
              class="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
            >
              Tìm quần áo phù hợp
            </span>
            <br />
            <span class="text-white">không cần đến cửa hàng</span>
          </h1>
          <h1
            class="text-blue-100 text-base mb-6 drop-shadow-sm animate-fade-in-up animation-delay-200"
          >
            sẵn sàng với
            <span class="text-4xl">AI virtual try on</span>
          </h1>
          <Button
            label="Thử đồ ngay"
            icon="pi pi-microchip-ai"
            class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-5 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 animate-fade-in-up animation-delay-400"
            @click="scrollToProducts"
          />
        </div>
        <div class="w-1/2 h-full relative z-10">
          <div class="relative">
            <img
              src="/bg-sample-model.png"
              alt="Homepage"
              class="object-contain rounded-lg transform hover:scale-102 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#EBD96B] py-10 my-10 px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <a
            href="mailto:elsunxinh@gmail.com"
            class="flex flex-col items-center p-4 rounded-lg hover:bg-yellow-200/50 transition group"
          >
            <i class="pi pi-envelope text-amber-600 text-2xl mb-2 group-hover:text-amber-700"></i>
            <div class="font-semibold text-gray-800 text-sm">Email</div>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61576868692347"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center p-4 rounded-lg hover:bg-yellow-200/50 transition group"
          >
            <i class="pi pi-facebook text-blue-600 text-2xl mb-2 group-hover:text-blue-800"></i>
            <div class="font-semibold text-gray-800 text-sm">Facebook</div>
          </a>
          <a
            href="https://www.instagram.com/elsunxinh"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center p-4 rounded-lg hover:bg-yellow-200/50 transition group"
          >
            <i class="pi pi-instagram text-pink-500 text-2xl mb-2 group-hover:text-pink-600"></i>
            <div class="font-semibold text-gray-800 text-sm">Instagram</div>
          </a>
          <a
            href="https://vt.tiktok.com/ZSkfA5hC6/?page=TikTokShop"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center p-4 rounded-lg hover:bg-yellow-200/50 transition group"
          >
            <i class="pi pi-tiktok text-black text-2xl mb-2 group-hover:text-gray-700"></i>
            <div class="font-semibold text-gray-800 text-sm">TikTok</div>
          </a>
          <a
            href="https://shopee.vn/elsun.studio?categoryId=100017&entryPoint=ShopByPDP&itemId=40753356114"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center p-4 rounded-lg hover:bg-yellow-200/50 transition group"
          >
            <i
              class="pi pi-shopping-cart text-orange-500 text-2xl mb-2 group-hover:text-orange-600"
            ></i>
            <div class="font-semibold text-gray-800 text-sm">Shopee</div>
          </a>
        </div>
      </div>
    </div>
    <div id="san-pham"></div>
    <!-- Featured Products -->
    <div class="w-full px-5 pb-20">
      <div class="bg-[#fffef5] rounded-[50px] p-5 flex flex-col lg:px-24 pt-10">
        <h2 class="text-3xl font-bold mb-8 text-center text-pink-400 mt-5">Sản phẩm</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="product in productStore.products"
            :key="product.id"
            class="group cursor-pointer"
            :class="product.productItem.length > 0 ? '' : 'hidden'"
          >
            <div v-if="product.productItem.length > 0" class="flex flex-col w-full">
              <div
                class="relative overflow-hidden border border-gray-200/60 rounded-xl p-4 bg-white/50 backdrop-blur-sm shadow-sm group-hover:border-gray-300 group-hover:shadow-md transition-all duration-300"
              >
                <!-- Subtle corner accent -->
                <div
                  class="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-gray-100 to-transparent opacity-50"
                ></div>

                <img
                  :src="product.productItem[0].url"
                  :alt="product.name"
                  class="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                />

                <!-- Subtle bottom gradient -->
                <div
                  class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-gray-50/20 to-transparent rounded-b-xl"
                ></div>
              </div>

              <div class="flex justify-between items-end mt-4 px-1">
                <div class="flex-1">
                  <h3 class="font-semibold text-lg text-gray-800 mb-1">{{ product.name }}</h3>
                  <p class="text-gray-600 text-sm font-medium">
                    {{ product.productItem[0].price }} đ
                  </p>
                </div>
                <div class="flex items-center h-full">
                  <Button
                    icon="pi pi-arrow-up-right"
                    class="rounded-full bg-gray-800 hover:bg-gray-900 text-white border-0 ml-3 shadow-md hover:shadow-lg transition-all duration-200"
                    @click="goToProduct(product.id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="relative bg-gradient-to-b from-gray-50 to-white py-20">
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-30">
      <div
        class="w-full h-full"
        style="
          background-image: radial-gradient(
            circle at 1px 1px,
            rgba(156, 163, 175, 0.3) 1px,
            transparent 0
          );
          background-size: 20px 20px;
        "
      ></div>
    </div>

    <div class="relative max-w-4xl mx-auto px-10 md:px-28 lg:px-44">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-wide">
          <span class="font-serif italic">Elsun</span>
        </h1>
        <p class="text-lg text-gray-600 font-light italic mb-8">Empower Your Feminine Grace</p>
        <div
          class="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-8"
        ></div>
      </div>

      <div
        class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-white/20"
      >
        <p class="text-gray-700 leading-relaxed text-center text-lg font-light">
          Elsun là thương hiệu thời trang nữ được lấy cảm hứng từ sự kết hợp hoàn hảo giữa
          <span class="italic font-medium">"elegant"</span> (thanh lịch) và
          <span class="italic font-medium">"sun"</span> (mặt trời), mang đến những thiết kế rạng rỡ,
          toát lên vẻ đẹp tinh tế và năng động.
        </p>

        <div class="flex items-center justify-center my-8">
          <div class="w-12 h-px bg-gray-300"></div>
          <div class="w-2 h-2 bg-gray-300 rounded-full mx-4"></div>
          <div class="w-12 h-px bg-gray-300"></div>
        </div>

        <p class="text-gray-700 leading-relaxed text-center text-lg font-light mb-8">
          Với phong cách cá tính, trẻ trung và sang trọng, chúng tôi cam kết mang đến cho bạn những
          sản phẩm chất lượng cao, giúp bạn tự tin thể hiện cá tính riêng biệt trong mọi khoảnh
          khắc.
        </p>

        <div class="text-center">
          <div class="inline-flex items-center space-x-2 text-gray-600">
            <i class="pi pi-clock text-sm"></i>
            <span class="text-sm font-medium tracking-wider">ELSUN ONLINE STORE: 8AM - 10PM</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Button from 'primevue/button'
import router from '@/router'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

const scrollToProducts = () => {
  const element = document.getElementById('san-pham')
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const goToProduct = (productId: string) => {
  router.push({ name: 'product-guest', params: { id: productId } })
}

onMounted(async () => {
  await productStore.getProducts()
})
</script>

<style scoped>
.bg-header {
  background-image: url('/homepage.jpg');
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}

/* Enhanced hover effects */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
