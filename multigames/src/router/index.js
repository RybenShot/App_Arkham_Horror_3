import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Ruleta from '../views/Ruleta.vue'
import Dados from '../views/Dados.vue'
import Practicas from '../views/VistaDePracticas.vue'
import EnProceso from '../views/EnProceso.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ruleta',
    name: 'ruleta',
    component: Ruleta
  },
  {
    path: '/dados',
    name: 'dados',
    component: Dados
  },
  {
    path: '/practicas',
    name: 'practicas',
    component: Practicas
  },
  {
    path: '/enproceso',
    name: 'enProceso',
    component: EnProceso
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
