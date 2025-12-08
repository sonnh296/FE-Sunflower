import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: () => import('@/layouts/GuestLayout.vue'),
      path: '/',
      name: 'home',
      children: [
        {
          path: '',
          name: 'guest-home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'auth',
          name: 'login-screen',
          component: () => import('../views/Auth/LoginScreen.vue')
        },
        {
          path: 'auth/verify-email',
          name: 'verify-email',
          component: () => import('../views/Auth/VerifyEmail.vue')
        },
        {
          path: 'auth/check-email',
          name: 'check-email',
          component: () => import('../views/Auth/CheckEmail.vue')
        },
        {
          path: 'post/:id',
          name: 'post-detail-public',
          component: () => import('../views/Guest/PostBlog.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/About.vue')
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('../views/Contact.vue')
        },
        {
          path: 'collections',
          name: 'collections',
          component: () => import('../views/CollectionsView.vue')
        },
        {
          path: 'product/:id',
          name: 'product-guest',
          component: () => import('../views/Guest/ProductDetail.vue')
        },
        {
          path: 'try-on/:id',
          name: 'guest-try-on',
          component: () => import('../views/User/TryOn.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/layouts/UserLayout.vue'),
      // beforeEnter: (to, from) => {
      //   const authStore = useAuthStore()
      //   if (authStore.identity && authStore.identity.roleName == 'Player') {
      //     return true
      //   }

      //   return { name: 'home' }
      // },
      children: [
        {
          path: 'home',
          name: 'user-home',
          // Redirect to guest home - use the same component
          redirect: { name: 'guest-home' }
        },
        {
          path: 'cart',
          name: 'user-cart',
          component: () => import('../views/User/Cart.vue')
        },
        {
          path: 'checkout',
          name: 'user-checkout',
          component: () => import('../views/Checkout/CheckoutScreen.vue')
        },
        {
          path: 'orders',
          name: 'user-orders',
          component: () => import('../views/Orders/MyOrdersScreen.vue')
        },
        {
          path: 'orders/:id',
          name: 'user-order-detail',
          component: () => import('../views/Orders/OrderDetailScreen.vue')
        },
        {
          path: 'product/:id',
          name: 'user-product',
          // Redirect to guest product detail - use the same component
          redirect: (to) => ({ name: 'product-guest', params: to.params })
        },
        {
          path: 'try-on/:id',
          name: 'user-try-on',
          component: () => import('../views/User/TryOn.vue')
        },
        {
          path: 'forget-password',
          name: 'user-forget-password',
          component: () => import('../views/User/ForgetPassword.vue')
        },
        {
          path: 'info',
          name: 'user-info',
          component: () => import('../views/User/ProfileUser.vue')
        },
        {
          path: 'post/:id',
          name: 'user-post-detail',
          component: () => import('../views/User/BlogPost.vue')
        },
        {
          path: 'news',
          name: 'user-news',
          component: () => import('../views/User/News.vue')
        },
        {
          path: 'news/:id',
          name: 'user-news-detail',
          component: () => import('../views/User/NewsDetail.vue')
        }
      ]
    },

    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      // beforeEnter: (to, from) => {
      //   const authStore = useAuthStore()
      //   if (authStore.identity && authStore.identity.roleName == 'Admin') {
      //     return true
      //   }
      //   return { name: 'home' }
      // },
      children: [
        {
          path: 'home',
          name: 'admin-home',
          component: () => import('../views/Admin/HomeAdmin.vue')
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/Admin/ProductAdmin.vue')
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/Admin/AdminOrdersScreen.vue')
        },
        {
          path: 'orders/:id',
          name: 'admin-order-detail',
          component: () => import('../views/Orders/OrderDetailScreen.vue')
        },
        {
          path: 'news',
          name: 'admin-news',
          component: () => import('../views/Admin/NewsManagement.vue')
        },
        {
          path: 'banners',
          name: 'admin-banners',
          component: () => import('../views/Admin/BannerManagement.vue')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/Admin/users/Users.vue')
        },
        {
          path: 'user/:id',
          name: 'user-detail',
          component: () => import('../views/Admin/users/UserDetail.vue')
        },
        {
          path: 'posts',
          name: 'admin-posts',
          component: () => import('../views/Admin/posts/BlogPosts.vue')
        },
        {
          path: 'post-create',
          name: 'admin-posts-create',
          component: () => import('../views/Admin/posts/BlogPostCreate.vue')
        },
        {
          path: 'post/:id',
          name: 'admin-posts-detail',
          component: () => import('../views/Admin/posts/BlogPostDetail.vue')
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/Page404.vue')
    },
    {
      path: '/verify-token/:token/:userId',
      name: 'verify-token',
      component: () => import('@/views/Auth/VerifyTokenPassword.vue')
    },
    {
      path: '/active/:token/:userId',
      name: 'active-account',
      component: () => import('@/views/Auth/VerifyRegister.vue')
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/Auth/ResetPassword.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
