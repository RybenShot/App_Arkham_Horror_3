<template>
  <div class="BGGeneralAH px-2">
    <DatosBasicosDetalle/>

    <AtributosDetalle/>

    <HabilidadesDetalle/>

    <!-- Modals -->
    <div v-if="this.$store.state.modalPertenenciasDetalle == true"><Pertenencias/></div>
    <div v-if="this.$store.state.modalHistoriaDetalle == true"><Historia/></div>
    <div v-if="this.$store.state.modalArquetipoDetalle == true"><Arquetipo/></div>

    <footer class="columns is-mobile has-text-centered has-text-white">
      <div @click="goBack" class="column">
        <i class="title is-4 has-text-white fas fa-bars"> <p>{{ textoInterfaz.lista }}</p></i>
      </div>
      <div class="column">
        <router-link to="/PlayAH"><button class="button is-success my-2">{{ textoInterfaz.comenzar }}</button></router-link>
      </div>
    </footer>
  </div>
</template>

<script>
// datos
import DatosBasicosDetalle from "@/components/personajes/datosBasicosDetalle.vue";
import AtributosDetalle from "@/components/personajes/atributosDetalle.vue";
import HabilidadesDetalle from "@/components/personajes/habilidadesDetalle.vue";

// modals
import Pertenencias from "@/components/personajes/ModalsDetallePersonaje/ModalPertenenciaDetalle.vue";
import Historia from "@/components/personajes/ModalsDetallePersonaje/ModalHistoriaDetalle.vue";
import Arquetipo from "@/components/personajes/ModalsDetallePersonaje/ModalArquetipoDetalle.vue";

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
    Arquetipo
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
    goBack() {
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
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
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