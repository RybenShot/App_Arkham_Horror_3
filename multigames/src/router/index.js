import { createRouter, createWebHashHistory } from 'vue-router'
// HOME
import Home from '../views/Home/Home.vue'
import Credits from '../views/Home/creditos.vue'
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

const routes = [
  // HOME
 {path: '/', name: 'home', component: Home},
 {path: '/credits', name: 'credits', component: Credits},

  // PERSONAJES
  {path: '/ListaPersonajes', name: 'lista_Personajes', component: ListaPersonajes},
  {path: '/DetallePersonaje', name: 'detalle_personaje', component: DetallePersonaje},
  {path: '/PlayAH', name: 'jugar_ArkhamHorror', component: PlayAH},

  // MAPAS
  {path: '/ListaMapas', name: 'lista_Mapas', component: ListaMapas},
  {path: '/DetalleMapa', name: 'detalle_Mapa', component: DetalleMapa},

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
