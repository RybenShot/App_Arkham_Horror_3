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
        <i class="title is-4 has-text-white fas fa-bars"> <p>Lista</p></i>
      </div>
      <div class="column">
        <router-link to="/PlayAH"><button class="button is-success my-2">Comenzar</button></router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import DatosBasicosDetalle from "@/components/personajes/datosBasicosDetalle.vue";
import AtributosDetalle from "@/components/personajes/atributosDetalle.vue";
import HabilidadesDetalle from "@/components/personajes/habilidadesDetalle.vue";

//modals
import Pertenencias from "@/components/personajes/ModalsDetallePersonaje/ModalPertenenciaDetalle.vue";
import Historia from "@/components/personajes/ModalsDetallePersonaje/ModalHistoriaDetalle.vue";
import Arquetipo from "@/components/personajes/ModalsDetallePersonaje/ModalArquetipoDetalle.vue";




export default {
  name:"",
  components:{
    DatosBasicosDetalle,
    AtributosDetalle,
    HabilidadesDetalle,
    
    //modals
    Pertenencias,
    Historia,
    Arquetipo
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
}
</script>

<style>
  .BGGeneralAH {
    background-image: url(@/assets/img/ZZOtros/BGAH.jpg)!important;
    min-height: 110vh;
    background-position: center;
    background-size: cover;
  }
</style>