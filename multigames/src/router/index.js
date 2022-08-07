import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GameGeneral from '../views/ViewGameGeneral.vue'
import EnProceso from '../views/EnProceso.vue'
import HomeArkhamHorror from '../views/ViewGameArkhamHorror.vue'
import MapasArkhamHorror from '../views/ViewGameArkhamHorrorMapas.vue'

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
    path: '/HomeArkhamHorror',
    name: 'homearkhamhorror',
    component: HomeArkhamHorror
  },
  {
    path: '/MapasArkhamHorror',
    name: 'mapasarkhamhorror',
    component: MapasArkhamHorror
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
