<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div class="text-center space-y-6">
          <div
            class="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm"
          >
            <i class="pi pi-star-fill text-yellow-300 mr-2"></i>
            Thương hiệu thời trang Việt Nam
          </div>
          <h1 class="text-4xl md:text-6xl font-bold leading-tight">
            <span class="block">Elsun</span>
            <span class="block text-2xl md:text-3xl font-light text-amber-100 mt-2">
              Thời trang độc bản, công nghệ dẫn đầu
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto font-light">
            Nơi thời trang gặp gỡ công nghệ, tạo nên trải nghiệm mua sắm hoàn toàn mới
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              class="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors"
            >
              Khám phá bộ sưu tập
            </button>
            <button
              class="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Thử đồ ảo AI
            </button>
          </div>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div
        class="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"
      ></div>
      <div class="absolute top-1/2 right-1/4 w-16 h-16 bg-orange-300/20 rounded-full blur-lg"></div>
    </div>

    <!-- About Content -->
    <div class="max-w-6xl mx-auto px-4 py-16">
      <!-- Story Section -->
      <div class="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div class="space-y-6">
          <div
            class="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
          >
            <i class="pi pi-heart mr-2"></i>
            Câu chuyện của chúng tôi
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
            Hành trình tạo nên <span class="text-amber-600">điều khác biệt</span>
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Tại Elsun, chúng tôi không chỉ là một shop quần áo thông thường. Chúng tôi là nhà thiết
            kế, nhà sản xuất và là người kể câu chuyện thời trang qua từng đường kim mũi chỉ.
          </p>
          <p class="text-gray-600 leading-relaxed">
            Mỗi sản phẩm tại Elsun đều là thiết kế độc quyền, mang đậm dấu ấn sáng tạo của đội ngũ
            thiết kế nội bộ – giúp bạn khẳng định cá tính và gu thẩm mỹ riêng biệt trong từng
            outfit.
          </p>
        </div>
        <div class="relative">
          <div
            class="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 transform rotate-3 shadow-lg"
          >
            <img
              src="/sample1.jpeg"
              alt="Elsun Design Process"
              class="w-full h-80 object-cover rounded-2xl shadow-lg transform -rotate-3"
            />
          </div>
          <div class="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-gray-700">100% Thiết kế riêng</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-20">
        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
          <div
            class="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="pi pi-palette text-2xl text-white"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Thiết kế độc quyền</h3>
          <p class="text-gray-600 leading-relaxed">
            Không chạy theo số đông, chúng tôi tập trung phát triển những bộ sưu tập riêng biệt, từ
            ý tưởng đến thành phẩm đều được chăm chút kỹ lưỡng.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
          <div
            class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="pi pi-mobile text-2xl text-white"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Công nghệ AI tiên tiến</h3>
          <p class="text-gray-600 leading-relaxed">
            Tiên phong ứng dụng công nghệ AI Virtual Try-On, cho phép bạn thử đồ ảo ngay trên
            website một cách chân thực và tiện lợi.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
          <div
            class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="pi pi-shield text-2xl text-white"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Chất lượng đảm bảo</h3>
          <p class="text-gray-600 leading-relaxed">
            Mỗi sản phẩm đều trải qua quy trình kiểm soát chất lượng nghiêm ngặt, đảm bảo mang đến
            cho bạn những trải nghiệm tốt nhất.
          </p>
        </div>
      </div>

      <!-- AI Try-On Demo Section -->
      <div
        class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div class="p-8 md:p-12 text-white">
          <div class="text-center mb-12">
            <div
              class="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <i class="pi pi-sparkles text-yellow-300 mr-2"></i>
              Công nghệ AI Virtual Try-On
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Trải nghiệm thử đồ ảo với Elsun</h2>
            <p class="text-xl text-purple-100 max-w-3xl mx-auto">
              Chỉ với vài cú click, bạn có thể nhìn thấy chính mình trong các thiết kế mới nhất –
              như đang đứng trước gương.
            </p>
          </div>

          <!-- Demo Process -->
          <div class="grid md:grid-cols-3 gap-8 items-center">
            <div class="text-center space-y-4">
              <div class="relative mx-auto w-fit">
                <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <img
                    src="/sample3.jpeg"
                    alt="Ảnh model"
                    class="w-40 h-52 object-cover rounded-xl shadow-lg mx-auto"
                  />
                </div>
                <div
                  class="absolute -top-3 -right-3 bg-yellow-400 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm"
                >
                  1
                </div>
              </div>
              <h3 class="text-lg font-semibold">Tải ảnh của bạn</h3>
              <p class="text-purple-100 text-sm">Chọn ảnh chân dung rõ nét</p>
            </div>

            <div class="text-center space-y-4">
              <div class="flex items-center justify-center mb-4">
                <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <i class="pi pi-plus text-purple-800 font-bold"></i>
                </div>
              </div>
              <div class="relative mx-auto w-fit">
                <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <img
                    src="/sampleDress.png"
                    alt="Ảnh áo"
                    class="w-24 h-24 object-contain rounded-xl mx-auto bg-white/20"
                  />
                </div>
                <div
                  class="absolute -top-3 -right-3 bg-yellow-400 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm"
                >
                  2
                </div>
              </div>
              <h3 class="text-lg font-semibold">Chọn sản phẩm</h3>
              <p class="text-purple-100 text-sm">Từ bộ sưu tập Elsun</p>
            </div>

            <div class="text-center space-y-4">
              <div class="flex items-center justify-center mb-4">
                <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <i class="pi pi-arrow-right text-purple-800 font-bold"></i>
                </div>
              </div>
              <div class="relative mx-auto w-fit">
                <div
                  class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border-2 border-yellow-400/50"
                >
                  <img
                    src="/afterGenerate.png"
                    alt="Ảnh sau khi thử đồ AI"
                    class="w-40 h-52 object-cover rounded-xl shadow-lg mx-auto"
                  />
                </div>
                <div
                  class="absolute -top-3 -right-3 bg-yellow-400 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm"
                >
                  <i class="pi pi-check font-bold"></i>
                </div>
                <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div
                    class="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse"
                  >
                    AI Magic ✨
                  </div>
                </div>
              </div>
              <h3 class="text-lg font-semibold">Kết quả tuyệt vời!</h3>
              <p class="text-purple-100 text-sm">Xem ngay kết quả thử đồ</p>
            </div>
          </div>

          <div class="text-center mt-12">
            <button
              class="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors transform hover:scale-105"
            >
              <i class="pi pi-sparkles mr-2"></i>
              Thử ngay bây giờ
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-lg">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div class="space-y-2">
            <div class="text-3xl md:text-4xl font-bold text-amber-600">1000+</div>
            <div class="text-gray-600">Thiết kế độc quyền</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl md:text-4xl font-bold text-purple-600">50K+</div>
            <div class="text-gray-600">Khách hàng hài lòng</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl md:text-4xl font-bold text-emerald-600">98%</div>
            <div class="text-gray-600">Độ chính xác AI</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl md:text-4xl font-bold text-rose-600">24/7</div>
            <div class="text-gray-600">Hỗ trợ khách hàng</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Trang giới thiệu Elsun
</script>
