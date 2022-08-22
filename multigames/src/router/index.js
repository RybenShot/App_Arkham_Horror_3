import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import HomeAHClasico from '../views/HomeAHClasico.vue'
import EnProceso from '../views/EnProceso.vue'
// import HomeArkhamHorror from '../views/ViewGameArkhamHorror.vue'
import MapasAHClasico from '../views/MapasEnemigosAHClasico.vue'

import PersonajesAHClasico from '../views/PersonajesAHClasico.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/HomeAHClasico',
    name: 'homeAHclasico',
    component: HomeAHClasico
  },
  // {
  //   path: '/HomeArkhamHorror',
  //   name: 'homearkhamhorror',
  //   component: HomeArkhamHorror
  // },
  {
    path: '/MapasAHClasico',
    name: 'mapasAHclasico',
    component: MapasAHClasico
  },
  {
    path: '/PersonajesAHClasico',
    name: 'personajesAHclasico',
    component: PersonajesAHClasico
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
