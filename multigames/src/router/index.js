import { createRouter, createWebHashHistory } from 'vue-router'
// HOME
import Home from '../views/Home/Home.vue'
// OTROS
import EnProceso from '../views/ZOtros/EnProceso.vue'
import Error404 from '../views/ZOtros/Error404.vue'
import Pagina_De_Pruebas from '../views/ZOtros/ViewDePruebas.vue'
// PERSONAJES
import ListaPersonajes from '../views/Personajes/ListaPersonajes.vue'
import DetallePersonaje from '../views/Personajes/DetallePersonaje.vue'
import PlayAH from '../views/Personajes/Play.vue'
// MAPAS
import ListaMapas from '../views/Mapas/ListaMapas.vue'
import DetalleMapa from '../views/Mapas/DetalleMapa.vue'


// LEGACY
import MapasAHClasico from '../views/AHBase/MapasEnemigosAHClasico.vue'
import MapasEnemigosAHMareasTenebrosas from '../views/AHMareasTenebrosas/MapasEnemigosAHMareasTenebrosas.vue'

const routes = [
  // HOME
 {path: '/', name: 'home', component: Home},

  // PERSONAJES
  {path: '/ListaPersonajes', name: 'lista_Personajes', component: ListaPersonajes},
  {path: '/DetallePersonaje', name: 'detalle_personaje', component: DetallePersonaje},
  {path: '/PlayAH', name: 'jugar_ArkhamHorror', component: PlayAH},

  // MAPAS
  {path: '/ListaMapas', name: 'lista_Mapas', component: ListaMapas},
  {path: '/DetalleMapa', name: 'detalle_Mapa', component: DetalleMapa},


  // LEGACY
  {path: '/MapasAHClasico', name: 'mapasAHclasico', component: MapasAHClasico},
  {path: '/MapasAHMareasTenebrosas', name: 'mapasEnemigosAHMareasTenebrosas', component: MapasEnemigosAHMareasTenebrosas},

  // OTROS
  {path: '/enproceso', name: 'enProceso', component: EnProceso},
  {path: '/PaginaDePruebas', name: 'Pagina de Pruebas', component: Pagina_De_Pruebas},
  {path: "/:pathMatch(.*)*", name:'Error 404', component: Error404}
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
