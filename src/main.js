import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//Toasts
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { AUTH } from './utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

let app
const vuetify = createVuetify({
  components,
  directives,
})

onAuthStateChanged(AUTH, () => {
  if (!app) {
    // User is signed in
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(vuetify)
    app.use(ToastPlugin)

    app.mount('#app')
  } else {
    // User is signed out
  }
})
