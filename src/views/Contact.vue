<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div class="text-center space-y-6">
          <div
            class="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm"
          >
            <i class="pi pi-heart text-pink-300 mr-2"></i>
            Kết nối với chúng tôi
          </div>
          <h1 class="text-4xl md:text-5xl font-bold leading-tight">
            Liên hệ với <span class="text-yellow-300">Elsun</span>
          </h1>
          <p class="text-xl text-amber-100 max-w-3xl mx-auto font-light">
            Đội ngũ Elsun luôn sẵn sàng lắng nghe và đồng hành cùng bạn trên hành trình khẳng định
            phong cách cá nhân
          </p>
        </div>
      </div>

      <!-- Decorative elements -->
      <div
        class="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-8 right-8 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-300"
      ></div>
    </div>

    <!-- Contact Content -->
    <div class="max-w-6xl mx-auto px-4 py-16">
      <!-- Contact Methods Grid -->
      <div class="grid lg:grid-cols-3 gap-8 mb-16">
        <!-- Primary Contact -->
        <div class="lg:col-span-2">
          <div
            class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 h-full"
          >
            <div class="flex items-center space-x-3 mb-8">
              <div
                class="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center"
              >
                <i class="pi pi-phone text-white text-xl"></i>
              </div>
              <h2 class="text-2xl font-bold text-gray-800">Liên hệ trực tiếp</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <a
                href="mailto:elsunxinh@gmail.com"
                class="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div class="flex items-center space-x-4">
                  <div
                    class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <i class="pi pi-envelope text-white text-2xl"></i>
                  </div>
                  <div>
                    <div class="font-bold text-gray-800 text-lg mb-1">Email</div>
                    <div class="text-blue-600 font-medium">elsunxinh@gmail.com</div>
                    <div class="text-gray-500 text-sm mt-1">Phản hồi trong 24h</div>
                  </div>
                </div>
              </a>

              <a
                href="tel:0834210670"
                class="group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div class="flex items-center space-x-4">
                  <div
                    class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <i class="pi pi-phone text-white text-2xl"></i>
                  </div>
                  <div>
                    <div class="font-bold text-gray-800 text-lg mb-1">Hotline</div>
                    <div class="text-emerald-600 font-medium">0834 210 670</div>
                    <div class="text-gray-500 text-sm mt-1">8:00 - 22:00 hàng ngày</div>
                  </div>
                </div>
              </a>
            </div>

            <!-- Quick Contact Info -->
            <div
              class="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100"
            >
              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-info-circle text-white"></i>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-2">Thông tin liên hệ</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Nếu bạn có bất kỳ thắc mắc, góp ý hoặc mong muốn hợp tác, đừng ngần ngại liên hệ
                    với chúng tôi. Đội ngũ Elsun luôn sẵn sàng hỗ trợ và tư vấn cho bạn!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Business Hours -->
        <div class="space-y-8">
          <div
            class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8"
          >
            <div class="flex items-center space-x-3 mb-6">
              <div
                class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
              >
                <i class="pi pi-clock text-white text-xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Giờ làm việc</h3>
            </div>

            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">Thứ 2 - Thứ 6</span>
                <span class="font-semibold text-gray-800">8:00 - 22:00</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">Thứ 7 - Chủ nhật</span>
                <span class="font-semibold text-gray-800">9:00 - 21:00</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600">Lễ, Tết</span>
                <span class="font-semibold text-gray-800">10:00 - 18:00</span>
              </div>
            </div>

            <div class="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-green-700 font-medium text-sm"
                  >Đang online - Sẵn sàng hỗ trợ</span
                >
              </div>
            </div>
          </div>

          <!-- Support Card -->
          <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <div class="text-center space-y-4">
              <div
                class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto"
              >
                <i class="pi pi-headphones text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold">Hỗ trợ 24/7</h3>
              <p class="text-purple-100 text-sm">
                Đội ngũ chăm sóc khách hàng luôn sẵn sàng giải đáp mọi thắc mắc của bạn
              </p>
              <button
                class="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-purple-50 transition-colors"
              >
                Chat ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Media Section -->
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 md:p-12"
      >
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6"
          >
            <i class="pi pi-share-alt mr-2"></i>
            Kết nối qua mạng xã hội
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Theo dõi Elsun</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Kết nối với chúng tôi trên các nền tảng mạng xã hội để cập nhật những xu hướng thời
            trang mới nhất và những ưu đãi độc quyền
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="https://www.facebook.com/profile.php?id=61576868692347"
            target="_blank"
            rel="noopener"
            class="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
          >
            <div
              class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
            >
              <i class="pi pi-facebook text-white text-2xl"></i>
            </div>
            <div class="font-bold text-gray-800 mb-1">Facebook</div>
            <div class="text-blue-600 text-sm font-medium">facebook.com/elsun</div>
            <div class="text-gray-500 text-xs mt-2">Tin tức & cập nhật</div>
          </a>

          <a
            href="https://www.instagram.com/elsunxinh"
            target="_blank"
            rel="noopener"
            class="group bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100 hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
          >
            <div
              class="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
            >
              <i class="pi pi-instagram text-white text-2xl"></i>
            </div>
            <div class="font-bold text-gray-800 mb-1">Instagram</div>
            <div class="text-pink-600 text-sm font-medium">@elsunxinh</div>
            <div class="text-gray-500 text-xs mt-2">Lookbook & style</div>
          </a>

          <a
            href="https://vt.tiktok.com/ZSkfA5hC6/?page=TikTokShop"
            target="_blank"
            rel="noopener"
            class="group bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
          >
            <div
              class="w-16 h-16 bg-gradient-to-r from-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
            >
              <i class="pi pi-video text-white text-2xl"></i>
            </div>
            <div class="font-bold text-gray-800 mb-1">TikTok</div>
            <div class="text-gray-700 text-sm font-medium">@elsunxinh</div>
            <div class="text-gray-500 text-xs mt-2">Video thời trang</div>
          </a>

          <a
            href="https://shopee.vn/elsun.studio?categoryId=100017&entryPoint=ShopByPDP&itemId=40753356114"
            target="_blank"
            rel="noopener"
            class="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
          >
            <div
              class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
            >
              <i class="pi pi-shopping-cart text-white text-2xl"></i>
            </div>
            <div class="font-bold text-gray-800 mb-1">Shopee</div>
            <div class="text-orange-600 text-sm font-medium">shopee.vn/elsunxinh</div>
            <div class="text-gray-500 text-xs mt-2">Mua sắm online</div>
          </a>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div
        class="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 md:p-12"
      >
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-medium mb-6"
          >
            <i class="pi pi-send mr-2"></i>
            Gửi tin nhắn cho chúng tôi
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Liên hệ ngay</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Có câu hỏi hoặc muốn hợp tác? Hãy để lại tin nhắn và chúng tôi sẽ phản hồi trong thời
            gian sớm nhất
          </p>
        </div>

        <div class="max-w-2xl mx-auto">
          <form class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="fullName" class="block text-sm font-semibold text-gray-700 mb-2"
                  >Họ và tên</label
                >
                <input
                  id="fullName"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2"
                  >Email</label
                >
                <input
                  id="email"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div>
              <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2"
                >Chủ đề</label
              >
              <input
                id="subject"
                type="text"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="Chủ đề tin nhắn"
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-semibold text-gray-700 mb-2"
                >Tin nhắn</label
              >
              <textarea
                id="message"
                rows="5"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                placeholder="Nhập tin nhắn của bạn..."
              ></textarea>
            </div>
            <div class="text-center">
              <button
                type="submit"
                class="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <i class="pi pi-send mr-2"></i>
                Gửi tin nhắn
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Footer Message -->
      <div class="mt-16 text-center">
        <div class="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 text-white">
          <div class="max-w-3xl mx-auto">
            <div class="flex items-center justify-center space-x-2 mb-4">
              <i class="pi pi-heart-fill text-pink-300"></i>
              <span class="font-bold text-lg">Cảm ơn bạn đã quan tâm đến Elsun!</span>
              <i class="pi pi-heart-fill text-pink-300"></i>
            </div>
            <p class="text-amber-100">
              Elsun luôn trân trọng mọi ý kiến đóng góp và sự tin tưởng của bạn. Hãy kết nối với
              chúng tôi để cùng nhau tạo nên những trải nghiệm thời trang độc bản, hiện đại và đầy
              cảm hứng!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Trang liên hệ Elsun
</script>

<!-- eslint-disable-next-line vue/multi-word-component-names -->
