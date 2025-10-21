<template>
  <div class="flex flex-col bg-white">
    <!-- Hero Header -->
    <div class="relative w-full h-[60vh] overflow-hidden">
      <!-- Background Images -->
      <div class="absolute inset-0 w-full h-full grid grid-cols-4 gap-0">
        <div class="w-full h-full overflow-hidden">
          <img
            src="/sample1.jpeg"
            alt="Collection 1"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div class="w-full h-full overflow-hidden">
          <img
            src="/sample2.jpeg"
            alt="Collection 2"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div class="w-full h-full overflow-hidden">
          <img
            src="/sample3.jpeg"
            alt="Collection 3"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div class="w-full h-full overflow-hidden">
          <img
            src="/sample4.jpeg"
            alt="Collection 4"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Header Content -->
      <div class="relative z-10 h-full flex items-center justify-center px-6">
        <div class="text-center space-y-4 animate-fade-in-up">
          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight"
          >
            Bộ sưu tập <span class="font-serif italic">Elsun</span>
          </h1>
          <p class="text-xl md:text-2xl text-white/90 font-light">
            Khám phá phong cách thanh lịch và năng động
          </p>
        </div>
      </div>
    </div>

    <!-- YouTube Video Section -->
    <div class="w-full py-24 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Khám phá bộ sưu tập
          </h2>
          <div class="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
          <p class="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            Xem video giới thiệu các sản phẩm mới nhất của chúng tôi
          </p>
        </div>

        <!-- YouTube Video Embed -->
        <div class="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/SrhbKG6J70Q?autoplay=1&mute=1&loop=1&playlist=SrhbKG6J70Q&controls=1&rel=0&modestbranding=1"
            class="absolute inset-0 w-full h-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
            title="Elsun Fashion Collection"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Creative Editorial Gallery -->
    <div class="w-full py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Phong cách
            <span
              class="font-serif italic text-gradient bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
            >
              Elsun
            </span>
          </h2>
          <div class="flex items-center justify-center gap-3 mb-6">
            <div class="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
            <div class="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"></div>
            <div class="w-12 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
          <p class="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            Khám phá vẻ đẹp thanh lịch và năng động trong từng thiết kế
          </p>
        </div>

        <!-- Creative Bento-Style Grid -->
        <div class="grid grid-cols-12 gap-4 md:gap-6">
          <!-- Large Featured Image - Top Left -->
          <div class="col-span-12 md:col-span-7 lg:col-span-5 row-span-2">
            <div
              class="group relative cursor-pointer overflow-hidden rounded-3xl bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-700 h-full min-h-[350px]"
            >
              <img
                src="/sample1.jpeg"
                alt="Featured Collection 1"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <div class="absolute bottom-6 left-6 text-white">
                  <p class="text-sm font-light mb-1 tracking-wide">NEW COLLECTION</p>
                  <h3 class="text-2xl font-semibold">Thanh Lịch</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Medium Image - Top Right -->
          <div class="col-span-6 md:col-span-5 lg:col-span-4">
            <div
              class="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-700 h-64 md:h-80"
            >
              <img
                src="/sample2.jpeg"
                alt="Featured Collection 2"
                class="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-1000 ease-out"
              />
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center"
              >
                <div
                  class="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <i class="pi pi-heart text-white text-3xl"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Small Square - Top Far Right -->
          <div class="col-span-6 md:col-span-12 lg:col-span-3">
            <div
              class="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 shadow-lg hover:shadow-2xl transition-all duration-700 h-64 md:h-80"
            >
              <img
                src="/sample3.jpeg"
                alt="Featured Collection 3"
                class="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 ease-out mix-blend-overlay"
              />
              <div
                class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900"
              >
                TRENDING
              </div>
            </div>
          </div>

          <!-- Wide Rectangle - Middle -->
          <div class="col-span-12 md:col-span-7 lg:col-span-7">
            <div
              class="group relative cursor-pointer overflow-hidden rounded-3xl bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-700 h-56 md:h-72"
            >
              <img
                src="/sample4.jpeg"
                alt="Featured Collection 4"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500"
              ></div>
            </div>
          </div>

          <!-- Tall Rectangle - Right -->
          <div class="col-span-6 md:col-span-5 lg:col-span-5 row-span-2">
            <div
              class="group relative cursor-pointer overflow-hidden rounded-3xl bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-700 h-full min-h-[400px]"
            >
              <img
                src="/sample5.jpeg"
                alt="Featured Collection 5"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div
                class="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <span
                  class="inline-block bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ✨ Best Seller
                </span>
              </div>
            </div>
          </div>

          <!-- Medium Bottom Left -->
          <div class="col-span-6 md:col-span-7 lg:col-span-4">
            <div
              class="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-700 h-56"
            >
              <img
                src="/sample6.jpeg"
                alt="Featured Collection 6"
                class="w-full h-full object-cover group-hover:scale-110 group-hover:-rotate-2 transition-all duration-1000 ease-out"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-indigo-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
              ></div>
            </div>
          </div>

          <!-- Decorative Text Box -->
          <div class="col-span-12 md:col-span-5 lg:col-span-3">
            <div
              class="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg hover:shadow-2xl transition-all duration-700 h-56 flex items-center justify-center p-8 hover:scale-105"
            >
              <div class="text-center text-white">
                <i class="pi pi-sparkles text-4xl mb-4 text-pink-300"></i>
                <h4 class="text-2xl font-serif italic mb-2">Mới mỗi ngày</h4>
                <p class="text-gray-300 text-sm font-light">Cập nhật xu hướng</p>
              </div>
            </div>
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
              <span class="italic font-semibold text-gray-900">"sun"</span> (mặt trời), mang đến
              những thiết kế rạng rỡ, toát lên vẻ đẹp tinh tế và năng động.
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
  </div>
</template>

<script setup lang="ts">
// No special logic needed for collections page
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

/* Text gradient */
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
