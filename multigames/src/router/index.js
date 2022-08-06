import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GameGeneral from '../views/ViewGameGeneral.vue'
import Practicas from '../views/VistaDePracticas.vue'
import EnProceso from '../views/EnProceso.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/GameGeneral',
    name: 'GameGeneral',
    component: GameGeneral
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
