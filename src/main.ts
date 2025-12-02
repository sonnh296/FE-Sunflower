import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import vn from './locales/vn.json'
import App from './App.vue'
import router from './router'
import './style.css'
import FontAwesomeIcon from '@/plugins/fontawesome-icons'
import PrimeVue from 'primevue/config'

// @ts-ignore
import Aura from '@/presets/aura' //import preset
import ToastService from 'primevue/toastservice'
import BadgeDirective from 'primevue/badgedirective'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import { useFavicon } from '@vueuse/core'
import { useAuthStore } from '@/stores/authStore'

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({
  locale: 'vn',
  fallbackLocale: 'vn',
  messages: {
    en,
    vn
  }
})
const icon = useFavicon()
icon.value = '/logo2.png'
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  unstyled: true,
  pt: Aura //apply preset
})
app.use(ToastService)
app.use(ConfirmationService)
app.directive('badge', BadgeDirective)
app.directive('tooltip', Tooltip)
app.mount('#app')

// Initialize auth state after app is mounted
const authStore = useAuthStore()
authStore.initializeAuth()
