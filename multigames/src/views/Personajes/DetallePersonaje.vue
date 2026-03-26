<template>
  <div class="BGGeneralAH px-2">
    <DatosBasicosDetalle/>

    <AtributosDetalle/>

    <HabilidadesDetalle/>

    <!-- Modals -->
    <div v-if="this.$store.state.modalPertenenciasDetalle == true"><Pertenencias/></div>
    <div v-if="this.$store.state.modalHistoriaDetalle == true"><Historia/></div>
    <div v-if="this.$store.state.modalArquetipoDetalle == true"><Arquetipo/></div>
    <!-- Modal de selección de objetos -->
    <div v-if="$store.state.modalSeleccionObjetosIniciales"><ModalSeleccionObjetosIniciales/></div>
  

    <footer class="columns is-mobile has-text-centered has-text-white">
      <div @click="goBack" class="column">
        <i class="title is-4 has-text-white fas fa-bars"> <p>{{ textoInterfaz.lista }}</p></i>
      </div>
      <div class="column">
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

// datos
import DatosBasicosDetalle from "@/components/personajes/datosBasicosDetalle.vue";
import AtributosDetalle from "@/components/personajes/atributosDetalle.vue";
import HabilidadesDetalle from "@/components/personajes/habilidadesDetalle.vue";

// modals
import Pertenencias from "@/components/personajes/ModalsDetallePersonaje/ModalPertenenciaDetalle.vue";
import Historia from "@/components/personajes/ModalsDetallePersonaje/ModalHistoriaDetalle.vue";
import Arquetipo from "@/components/personajes/ModalsDetallePersonaje/ModalArquetipoDetalle.vue";
import ModalSeleccionObjetosIniciales from "@/components/personajes/ModalsDetallePersonaje/ModalSeleccionObjetosIniciales.vue";

export default {
  name:"Detalle de Personajes",
  components:{
    // datos
    DatosBasicosDetalle,
    AtributosDetalle,
    HabilidadesDetalle,
    
    // modals
    Pertenencias,
    Historia,
    Arquetipo,
    ModalSeleccionObjetosIniciales
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

    // funciones para la gestion de objetos del investigador
    iniciarSeleccionObjetos() {  
      this.SonidoTecla()
      // Si el investigador ya tiene una id, significa que es un investigador OnLine y no necesita seleccionar objetos
      if (this.$store.state.datosPJactual.id) {
        // Redirigimos a la zona de juego
        this.$router.push('/PlayAH');
        audioService_soundTrack.stop()
      }
      else{
        // Abrir modal de selección de objetos
      this.$store.state.modalSeleccionObjetosIniciales = true;
      }
    },
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
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