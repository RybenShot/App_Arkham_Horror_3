<template>
  <div class="p-2 BGGeneralPlay">
     <!-- recordatorio sobre Bendicion y maldicion -->
     <div v-if="$store.state.ModalPopUp_Notificaciones"><PopUpNotificaciones/></div>
     <!-- Modal para ver el detalle de un objeto al ser clicado -->
     <div v-if="this.$store.state.verDetallePertenencia == true"><ModalVerDetallePertenencia/></div>

    <!-- Confirmacion al intentar salir de terminar partida -->
    <div v-if="$store.state.ModalConfirmacion"><ModalConfirmacion/></div>
    <!-- Modals de los estados para verlos -->
    <div><ModalsEstadosPlay/></div>

    <!-- Navegacion -->
    <b-tabs position="is-centered" class="block mb-0">
        <b-tab-item label="Player">
          <viewPlayer/>
        </b-tab-item>
        <b-tab-item label="Map">
          <!-- No mapa OnLine -->
          <div v-if="!this.$store.state.datosMapa.id" class="has-text-centered">
            <p class="title has-text-white pt-6">{{ textoInterfaz.textNoLogin }}</p>
            <router-link to="/"> {{ textoInterfaz.goHome }} </router-link>
          </div>
          <!-- Si es un mapa OnLine -->
          <div v-else><viewMap/></div>
        </b-tab-item>
    </b-tabs>

    
  </div>
</template>

<script>
import viewPlayer from "@/views/inPlay/viewPlayer.vue";
import viewMap from "@/views/inPlay/viewMap.vue";

import PopUpNotificaciones from "@/components/helpers/popUp/notificaciones.vue";
import ModalVerDetallePertenencia  from "@/components/personajes/ModalsDetallePersonaje/ModalVerDetallePertenencia.vue";

import ModalConfirmacion from "@/components/inPlay/ModalConfirmacion.vue";
import ModalsEstadosPlay from "@/components/inPlay/ModalsEstadosPlay.vue";

import { apiService } from '@/services/api.js';


export default {
  name: "Play",
  components:{
    viewPlayer,
    viewMap,

    PopUpNotificaciones,
    ModalVerDetallePertenencia,

    ModalConfirmacion,
    ModalsEstadosPlay
  },
  data(){
    return{
      textoInterfaz: {
        textNoLogin: '',
        goHome: '',
      }
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.textNoLogin = "Para poder usar esta parte debes iniciar sesion y crear un mapa.";
        this.textoInterfaz.goHome = "Ir a Home";
      } else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.textNoLogin = "To use this section, you must log in and create a map.";
        this.textoInterfaz.goHome = "Go Home";
      }
    },
    async serchInitialObjectsInv(){
      try {
        let idInv = this.$store.state.datosPJactual.idInv;
        const { objects = [], optionalObjects = [] } = await apiService.obtainPertenencesInv(idInv);

        // 1) Limpiar el array global de objetos en juego
        this.$store.commit('clearResponseObjectsInPlay');

        // 2) Añadir cada objeto "obligatorio"
        objects.forEach(obj => { this.$store.commit('addResponseObjectInPlay', obj) });

        // 3) Añadir cada objeto "opcional"
        optionalObjects.forEach(obj => { this.$store.commit('addResponseObjectInPlay', obj) });
        
      } catch (error) {
        console.error("Error al cargar los objetos principales del investigador", error);
      }
    },
  },
  mounted(){
    this.serchInitialObjectsInv();
    this.rellenarTextoSegunIdioma()
  },
}
</script>

<style scoped>

.BGGeneralPlay{
  background-image: url(@/assets/img/ZZOtros/newBGAH.png)!important;
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}
</style>