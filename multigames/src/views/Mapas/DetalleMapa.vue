<template>
  <div class="BGGeneralAH">
    <!-- Navegacion -->
    <nav class="columns is-mobile mb-0 pt-5 centrarHero">
      <div class="column is-3 p-0" style="text-align: center;" @click="goBack() "><i class="fa-2x fas fa-arrow-left has-text-white"></i></div>
      <div class="column " style="margin: 0 auto;"><p class="has-text-centered title is-4 has-text-white">{{ titulo }}</p></div>
      <div class="column is-3 p-0" style="text-align: center;"><router-link to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link></div>
    </nav>

    <!-- pop up notificacion -->
    <PopUpNotificaciones/>

    <!-- modals para datos de comunidad -->
    <div v-if="this.$store.state.modalInvRec == true"><ModalInvRec/></div>
    <div v-if="this.$store.state.modalComunityMap == true"><ModalComunityMap/></div>
    <div v-if="this.$store.state.modalDifficultyTime == true"><ModalDifficultyTime/></div>

    <!-- Crear Mapa On-Line -->
    <div v-if="this.$store.state.modalCrearMapaOnLine == true"><ModalPostOnLineMap/></div>

    <!-- Ver Loseta Mapa -->
    <div v-if="this.$store.state.modalVerLosetaMapa == true"><ModalLosetaMapa/></div>
    <!-- Switcher Enemigos -->
    <div v-if="this.$store.state.modalVerEnemigos == true"><ModalEnemigos/></div>
    <!-- Detalle de Mapa -->
    <div v-if="this.$store.state.viewDetalleMapa == true" >
      <div><RolloHistoriaMapa/></div>
      <div><EspecificacionesMapas/></div>
      <div><LosetasYBotones/></div>
    </div>

  </div>
</template>

<script>
import RolloHistoriaMapa from "@/components/mapas/RolloHistoriaMapa.vue";
import EspecificacionesMapas from "@/components/mapas/EspecificacionesMapa.vue";
import LosetasYBotones from "@/components/mapas/LosetasYBotones.vue";

import ModalInvRec from "@/components/mapas/modals/modalInvRec.vue";
import ModalComunityMap from "@/components/mapas/modals/modalComunityMap.vue";
import ModalDifficultyTime from "@/components/mapas/modals/modalDifficulty&Time.vue"

import PopUpNotificaciones from "@/components/helpers/popUp/notificaciones.vue";
import ModalEnemigos from "@/components/mapas/EnemigosSwitcher.vue";
import ModalLosetaMapa from "@/components/mapas/DetalleLosetaMapa.vue";
import ModalPostOnLineMap from "@/components/mapas/modalPostOnLineMap.vue";
import { onMounted } from "vue";

export default {
  name:"DetalleMapa",
  data(){
    return{
      titulo: "",
    }
  },
  components:{
      RolloHistoriaMapa,
      EspecificacionesMapas,
      LosetasYBotones,

      ModalInvRec,
      ModalComunityMap,
      ModalDifficultyTime,

      PopUpNotificaciones,
      ModalEnemigos,
      ModalLosetaMapa,
      ModalPostOnLineMap
    },
  methods:{
    goBack() {
      this.$store.state.mapaSeleccionado = false
      this.$router.push('/ListaMapas');
    },

    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.titulo = "Detalle de Mapa";
      }else{
        this.titulo = "Map Detail";
      }
    }
  },
  mounted(){
    // quitar este console
    console.log(this.$store.state.datosMapa);
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
/* Helers */
.centrarHero{
  display: flex; 
  justify-content: center; 
  align-items: center
}
.BGGeneralAH {
  background-image: url(@/assets/img/ZZOtros/newBGAH.png)!important;
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}
</style>