import { createApp } from 'vue'
import vuex from 'vuex'
import App from './App.vue'
import Buefy from 'buefy'
import './registerServiceWorker'
import 'buefy/dist/buefy.css'

import router from './router'
import store from './store'

createApp(App).use(store).use(router).use(vuex).use(Buefy).mount('#app')
