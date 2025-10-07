<template>
  <div class="flex flex-col bg-white">
    <!-- Video Hero Section -->
    <!-- Hero Section with YouTube Video Background -->
    <div class="relative w-full h-screen overflow-hidden">
      <!-- YouTube Video Background -->
      <div class="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/SrhbKG6J70Q?autoplay=1&mute=1&loop=1&playlist=SrhbKG6J70Q&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          class="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

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

            <div class="pt-4 animate-fade-in-up animation-delay-400">
              <Button
                label="Khám phá ngay"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="!bg-white !text-gray-900 hover:!bg-gray-100 !border-0 !font-semibold !py-4 !px-8 !text-lg !rounded-full !shadow-2xl hover:!shadow-3xl !transition-all !duration-300 hover:!scale-105"
                @click="scrollToNextSection"
              />
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

    <!-- Creative Editorial Gallery -->
    <div class="w-full py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Phong cách
            <span
              class="font-serif italic text-gradient bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
              >Elsun</span
            >
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

        <!-- Call to Action -->
        <div class="text-center mt-20">
          <Button
            label="Xem toàn bộ bộ sưu tập"
            icon="pi pi-arrow-right"
            iconPos="right"
            class="!bg-gradient-to-r !from-pink-500 !via-purple-500 !to-indigo-500 hover:!from-pink-600 hover:!via-purple-600 hover:!to-indigo-600 !text-white !border-0 !font-semibold !py-4 !px-10 !text-lg !rounded-full !shadow-2xl hover:!shadow-3xl !transition-all !duration-500 hover:!scale-110 hover:!-translate-y-1"
            @click="scrollToNextSection"
          />
        </div>
      </div>
    </div>

    <!-- Featured Products Showcase -->
    <div class="w-full py-24 bg-gradient-to-b from-gray-50 to-white">
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Product 1: Váy Hồng -->
          <div
            class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            @click="navigateToProduct(0)"
          >
            <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                :src="featuredProducts[0].image"
                alt="Váy Hồng"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  Váy Hồng
                </span>
              </div>
              <h3 class="font-semibold text-xl text-gray-900 mb-3">
                {{ featuredProducts[0].name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                Thiết kế váy hồng nữ tính, thanh lịch và trẻ trung, phù hợp cho nhiều dịp
              </p>
              <div class="flex items-baseline gap-3 mb-4">
                <span class="text-2xl font-bold text-gray-900">459.000đ</span>
              </div>
              <Button
                label="Xem chi tiết"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="w-full !bg-pink-500 hover:!bg-pink-600 !text-white !border-0 !font-medium !py-3 !rounded-xl !transition-all !duration-300"
                @click.stop="navigateToProduct(0)"
              />
            </div>
          </div>

          <!-- Product 2: Áo Phông -->
          <div
            class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            @click="navigateToProduct(1)"
          >
            <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                :src="featuredProducts[1].image"
                alt="Áo Phông"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  Áo Phông
                </span>
              </div>
              <h3 class="font-semibold text-xl text-gray-900 mb-3">
                {{ featuredProducts[1].name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                Áo phông basic, dễ phối đồ, chất liệu mềm mại thoáng mát
              </p>
              <div class="flex items-baseline gap-3 mb-4">
                <span class="text-2xl font-bold text-gray-900">359.000đ</span>
              </div>
              <Button
                label="Xem chi tiết"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="w-full !bg-blue-500 hover:!bg-blue-600 !text-white !border-0 !font-medium !py-3 !rounded-xl !transition-all !duration-300"
                @click.stop="navigateToProduct(1)"
              />
            </div>
          </div>

          <!-- Product 3: Chân váy -->
          <div
            class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            @click="navigateToProduct(2)"
          >
            <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                :src="featuredProducts[2].image"
                alt="Chân váy"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  Chân váy
                </span>
              </div>
              <h3 class="font-semibold text-xl text-gray-900 mb-3">
                {{ featuredProducts[2].name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                Chân váy họa tiết sọc đỏ năng động, phong cách trẻ trung
              </p>
              <div class="flex items-baseline gap-3 mb-4">
                <span class="text-2xl font-bold text-gray-900">339.000đ</span>
              </div>
              <Button
                label="Xem chi tiết"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="w-full !bg-purple-500 hover:!bg-purple-600 !text-white !border-0 !font-medium !py-3 !rounded-xl !transition-all !duration-300"
                @click.stop="navigateToProduct(2)"
              />
            </div>
          </div>

          <!-- Product 4: Cả set -->
          <div
            class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            @click="navigateToProduct(3)"
          >
            <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                :src="featuredProducts[3].image"
                alt="Cả set"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                class="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                Bộ Sưu Tập
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  Cả set
                </span>
              </div>
              <h3 class="font-semibold text-xl text-gray-900 mb-3">
                {{ featuredProducts[3].name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                Bộ đồ chấm bi đáng yêu, phối hợp hoàn hảo cho set đồ hoàn chỉnh
              </p>
              <div class="flex items-baseline gap-3 mb-4">
                <span class="text-2xl font-bold text-gray-900">639.000đ</span>
              </div>
              <Button
                label="Xem chi tiết"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="w-full !bg-amber-500 hover:!bg-amber-600 !text-white !border-0 !font-medium !py-3 !rounded-xl !transition-all !duration-300"
                @click.stop="navigateToProduct(3)"
              />
            </div>
          </div>

          <!-- Product 5: Set chấm bi -->
          <div
            class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            @click="navigateToProduct(4)"
          >
            <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                :src="featuredProducts[4].image"
                alt="Set chấm bi"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                class="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                Best Seller
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="bg-rose-100 text-rose-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  Set chấm bi
                </span>
              </div>
              <h3 class="font-semibold text-xl text-gray-900 mb-3">
                {{ featuredProducts[4].name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                Bộ set chấm bi sang trọng, thiết kế tinh tế với chất liệu cao cấp
              </p>
              <div class="flex items-baseline gap-3 mb-4">
                <span class="text-2xl font-bold text-gray-900">799.000đ</span>
              </div>
              <Button
                label="Xem chi tiết"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="w-full !bg-rose-500 hover:!bg-rose-600 !text-white !border-0 !font-medium !py-3 !rounded-xl !transition-all !duration-300"
                @click.stop="navigateToProduct(4)"
              />
            </div>
          </div>

          <!-- Product 6: More Options -->
          <div
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const productStore = useProductStore()

// Featured products with their images mapped
const featuredProducts = ref([
  { id: '', name: 'Váy Hồng Thanh Lịch', image: '/vay-hong.jpg', keyword: 'váy' },
  { id: '', name: 'Áo Phông Thời Trang', image: '/ao-phong.png', keyword: 'áo' },
  { id: '', name: 'Chân Váy Sọc Đỏ', image: '/chan-vay.png', keyword: 'chân' },
  { id: '', name: 'Set Chấm Bi', image: '/set-chambi-1.jpg', keyword: 'set' },
  { id: '', name: 'Set Chấm Bi Cao Cấp', image: '/set-chambi-2.jpg', keyword: 'set' }
])

const scrollToNextSection = () => {
  window.scrollBy({
    top: window.innerHeight - 100,
    behavior: 'smooth'
  })
}

const navigateToProduct = (index: number) => {
  const product = featuredProducts.value[index]
  if (product.id) {
    router.push({ name: 'product-guest', params: { id: product.id } })
  } else {
    // Fallback: find product by keyword
    navigateToFirstProduct(product.keyword)
  }
}

const navigateToFirstProduct = async (keyword: string) => {
  // Make sure products are loaded
  if (productStore.products.length === 0) {
    await productStore.getProducts()
  }

  // Find product that matches the keyword
  const product = productStore.products.find((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  )

  if (product && product.id) {
    router.push({ name: 'product-guest', params: { id: product.id } })
  } else if (productStore.products.length > 0) {
    // Navigate to first product if no match
    router.push({ name: 'product-guest', params: { id: productStore.products[0].id } })
  }
}

// Map products to featured items
const mapProductsToFeatured = () => {
  productStore.products.forEach((product) => {
    const featured = featuredProducts.value.find(
      (f) =>
        product.name.toLowerCase().includes(f.keyword) ||
        f.keyword.includes(product.name.toLowerCase())
    )
    if (featured && !featured.id) {
      featured.id = product.id
      featured.name = product.name
    }
  })
}

onMounted(async () => {
  await productStore.getProducts()
  mapProductsToFeatured()
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-300 {
  animation-delay: 0.3s;
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

/* Text gradient */
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
