<template>
  <div class="p-2">
    <div><ModalsEstadosPlay/></div>

    <DatosBasicosPlay/>

    <hr class="my-2">

    <div v-if="this.$store.state.StoreTiradorDados == true"><TiradorDados/></div>
    <div v-if="this.$store.state.StoreEstadosPlay == true"><EstadosPlay/></div>
    <div v-if="this.$store.state.StoreHabilidades == true"><HabilidadesPlay/></div>
    <div v-if="this.$store.state.StoreAjustesPlay == true"><AjustesPlay/></div>
    
  </div>
</template>

<script>
import DatosBasicosPlay from "@/components/personajes/ComponentsPlay/DatosBasicosPlay.vue";

import TiradorDados from "@/components/personajes/ComponentsPlay/TiradorDadosPlay.vue";
import EstadosPlay from "@/components/personajes/ComponentsPlay/EstadosPlay.vue";
import HabilidadesPlay from "@/components/personajes/ComponentsPlay/HabilidadesPlay.vue";
import AjustesPlay from "@/components/personajes/ComponentsPlay/AjustesPlay.vue";

import ModalsEstadosPlay from "@/components/personajes/ComponentsPlay/ModalsEstadosPlay.vue";


export default {
  name: "Play",
  components:{
    DatosBasicosPlay,

    TiradorDados,
    EstadosPlay,
    HabilidadesPlay,
    AjustesPlay,

    ModalsEstadosPlay
  }

}
</script>

<style>

</style>