import { createApp } from 'vue'
import vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'

import router from './router'
import store from './store'


createApp(App).use(store).use(router).use(vuex).mount('#app')
