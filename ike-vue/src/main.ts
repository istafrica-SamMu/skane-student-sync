import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'

import App from './App.vue'
import router from './router'

// Import PrimeIcons
import 'primeicons/primeicons.css'

// Import our custom styles
import './assets/main.css'

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'sv',
  messages: {
    en: {
      // We'll add translations later
    },
    sv: {
      // We'll add translations later
    }
  }
})

// Create Pinia store
const pinia = createPinia()

// Create Vue app
const app = createApp(App)

// Use plugins
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin)
app.use(PrimeVue, {
  ripple: true,
  inputStyle: 'outlined'
})
app.use(ToastService)
app.use(ConfirmationService)

// Register global components
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)

// Mount app
app.mount('#app')
