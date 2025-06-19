import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(ToastService)

const authStore = useAuthStore()
authStore.initAuth()

router.afterEach(() => {
  document.body.style.overflow = 'auto'
  document.documentElement.style.overflow = 'auto'

  document.body.classList.remove('p-overflow-hidden')
  document.documentElement.classList.remove('p-overflow-hidden')

  const previewWrapper = document.querySelector('.p-image-preview-wrapper')
  if (previewWrapper) {
    previewWrapper.remove()
  }
})
app.mount('#app')
