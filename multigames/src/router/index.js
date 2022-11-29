import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EnProceso from '../views/EnProceso.vue'
import Error404 from '../views/Error404.vue'

import HomeAHClasico from '../views/HomeAHClasico.vue'
import MapasAHClasico from '../views/MapasEnemigosAHClasico.vue'
import PersonajesAHClasico from '../views/AHBase/PersonajesAHClasico.vue'

import HomeAHMareasTenebrosas from '../views/AHMareasTenebrosas/HomeAHMareasTenebrosas.vue'
import MapasEnemigosAHMareasTenebrosas from '../views/AHMareasTenebrosas/MapasEnemigosAHMareasTenebrosas.vue'
import PersonajesAHMareasTenebrosas from '../views/AHMareasTenebrosas/PersonajesAHMareasTenebrosas.vue'

const routes = [
  {path: '/', name: 'home', component: Home},
  {path: '/enproceso', name: 'enProceso', component: EnProceso},

  {path: '/HomeAHClasico', name: 'homeAHclasico', component: HomeAHClasico},
  {path: '/MapasAHClasico', name: 'mapasAHclasico', component: MapasAHClasico},
  {path: '/PersonajesAHClasico', name: 'personajesAHclasico', component: PersonajesAHClasico},

  {path: '/HomeAHMareasTenebrosas', name: 'homeAHMareasTenebrosas', component: HomeAHMareasTenebrosas},
  {path: '/MapasAHMareasTenebrosas', name: 'mapasEnemigosAHMareasTenebrosas', component: MapasEnemigosAHMareasTenebrosas},
  {path: '/PersonajesAHMareasTenebrosas', name: 'personajesAHMareasTenebrosas', component: PersonajesAHMareasTenebrosas},

  {path: "/:pathMatch(.*)*", name:'Error 404', component: Error404}
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
