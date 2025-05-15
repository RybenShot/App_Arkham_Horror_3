import { createApp } from 'vue'
import vuex from 'vuex'
import App from './App.vue'
import Buefy from 'buefy'
import './registerServiceWorker'
import 'buefy/dist/buefy.css'

import router from './router'
import store from './store'

// configuracion de clerk para gestion de inicio de sesion
import { clerkPlugin, useAuth } from '@clerk/vue'

const PUBLISHABLE_KEY = process.env.VUE_APP_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Añade VUE_APP_CLERK_PUBLISHABLE_KEY en tu .env');
}

const app = createApp(App)

// 1) Instala Clerk PRIMERO
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })

// 1) Registrar Clerk junto con el resto de plugins
app.use(store).use(router).use(vuex).use(Buefy)

// 3) Ahora que Clerk ya está instalado, registrar el guardia
// registerAuthGuard(router, useAuth)  // ← aquí sí se puede usar useAuth()

app.mount('#app')
