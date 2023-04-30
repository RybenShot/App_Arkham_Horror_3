import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EnProceso from '../views/EnProceso.vue'
import Error404 from '../views/Error404.vue'
import Pagina_De_Pruebas from '../views/ViewDePruebas.vue'

import DetallePersonaje from '../views/DetallePersonaje.vue'
import PlayAH from '../views/PlayAH.vue'

import HomeAHClasico from '../views/AHBase/HomeAHClasico.vue'
import MapasAHClasico from '../views/AHBase/MapasEnemigosAHClasico.vue'
import PersonajesAHClasico from '../views/AHBase/PersonajesAHClasico.vue'

import HomeAHMareasTenebrosas from '../views/AHMareasTenebrosas/HomeAHMareasTenebrosas.vue'
import MapasEnemigosAHMareasTenebrosas from '../views/AHMareasTenebrosas/MapasEnemigosAHMareasTenebrosas.vue'
import PersonajesAHMareasTenebrosas from '../views/AHMareasTenebrosas/PersonajesAHMareasTenebrosas.vue'

const routes = [
  {path: '/', name: 'home', component: Home},
  {path: '/enproceso', name: 'enProceso', component: EnProceso},

  {path: '/DetallePersonaje', name: 'detalle_personaje', component: DetallePersonaje},
  {path: '/PlayAH', name: 'jugar_ArkhamHorror', component: PlayAH},

  {path: '/HomeAHClasico', name: 'homeAHclasico', component: HomeAHClasico},
  {path: '/MapasAHClasico', name: 'mapasAHclasico', component: MapasAHClasico},
  {path: '/PersonajesAHClasico', name: 'personajesAHclasico', component: PersonajesAHClasico},

  {path: '/HomeAHMareasTenebrosas', name: 'homeAHMareasTenebrosas', component: HomeAHMareasTenebrosas},
  {path: '/MapasAHMareasTenebrosas', name: 'mapasEnemigosAHMareasTenebrosas', component: MapasEnemigosAHMareasTenebrosas},
  {path: '/PersonajesAHMareasTenebrosas', name: 'personajesAHMareasTenebrosas', component: PersonajesAHMareasTenebrosas},

  {path: '/PaginaDePruebas', name: 'Pagina de Pruebas', component: Pagina_De_Pruebas},
  {path: "/:pathMatch(.*)*", name:'Error 404', component: Error404}
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
