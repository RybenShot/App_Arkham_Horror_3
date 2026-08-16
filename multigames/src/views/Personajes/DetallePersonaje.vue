<template>
  <div class="BGGeneralAH px-2">
    <div data-tour="detalle-img"><DatosBasicosDetalle/></div>
    <div data-tour="detalle-stats"><EspecificacionesInv/><AtributosDetalle/></div>
    <div data-tour="detalle-habilidades"><HabilidadesDetalle/></div>
    

    <!-- Modals -->
    <div v-if="this.$store.state.modalPertenenciasDetalle == true"><Pertenencias/></div>
    <div v-if="this.$store.state.modalHistoriaDetalle == true"><Historia/></div>
    <div v-if="this.$store.state.modalArquetipoDetalle == true"><Arquetipo/></div>
    <div v-if="$store.state.modalSeleccionObjetosIniciales"><ModalSeleccionObjetosIniciales/></div>
    <div v-if="$store.state.modalComunityInv"><ModalComunityInv/></div>

    <footer class="columns is-mobile has-text-centered has-text-white">
      <div @click="goBack" class="column">
        <i class="title is-4 has-text-white fas fa-bars"> <p>{{ textoInterfaz.lista }}</p></i>
      </div>
      <div class="column" data-tour="detalle-comenzar">
        <button @click="iniciarSeleccionObjetos" class="button is-success is-fullwidth is-large">
          <i class="fas fa-play mr-2"></i>{{ textoInterfaz.comenzar }}
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import { audioService_soundTrack } from '@/services/GestionAudio/audioService_soundTrack.js';
import { audioService_effects } from '@/services/GestionAudio/audioService_effects.js';
import { continueTourIfNeeded } from '@/services/tourService.js';

import DatosBasicosDetalle from "@/components/personajes/datosBasicosDetalle.vue";
import AtributosDetalle from "@/components/personajes/atributosDetalle.vue";
import HabilidadesDetalle from "@/components/personajes/habilidadesDetalle.vue";
import EspecificacionesInv from "@/components/personajes/EspecificacionesInv.vue";

import Pertenencias from "@/components/personajes/ModalsDetallePersonaje/ModalPertenenciaDetalle.vue";
import Historia from "@/components/personajes/ModalsDetallePersonaje/ModalHistoriaDetalle.vue";
import Arquetipo from "@/components/personajes/ModalsDetallePersonaje/ModalArquetipoDetalle.vue";
import ModalSeleccionObjetosIniciales from "@/components/personajes/ModalsDetallePersonaje/ModalSeleccionObjetosIniciales.vue";
import ModalComunityInv from "@/components/personajes/ModalsDetallePersonaje/ModalComunityInv.vue";

export default {
  name:"Detalle de Personajes",
  components:{
    DatosBasicosDetalle,
    AtributosDetalle,
    HabilidadesDetalle,
    EspecificacionesInv,
    Pertenencias,
    Historia,
    Arquetipo,
    ModalSeleccionObjetosIniciales,
    ModalComunityInv
  },
  data(){
    return{
      textoInterfaz: {
        lista: "",
        comenzar: ""
      }
    }
  },
  methods: {
    SonidoTecla() {audioService_effects.playTecla()},
    goBack() {
      this.SonidoTecla()
      this.$router.go(-1);
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.lista = "Lista";
        this.textoInterfaz.comenzar = "Comenzar";
      }else{
        this.textoInterfaz.lista = "List";
        this.textoInterfaz.comenzar = "Start";
      }
    },
    iniciarSeleccionObjetos() {
      this.SonidoTecla()
      if (this.$store.state.datosPJactual.id) {
        this.$router.push('/PlayAH');
        audioService_soundTrack.stop()
      } else {
        this.$store.state.modalSeleccionObjetosIniciales = true;
      }
    },
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
    continueTourIfNeeded('/DetallePersonaje');
  },
}
</script>

<style>
  .BGGeneralAH {
    background-image: url(@/assets/img/ZZOtros/newBGAH.png)!important;
    min-height: 110vh;
    background-position: center;
    background-size: cover;
  }
</style>