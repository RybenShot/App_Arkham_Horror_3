<template>
  <div>
    <nav class="columns is-mobile mb-0 pt-5 centrarHero">
      <div class="column is-3 p-0" style="text-align: center;" @click="goBack"><i class="fa-2x fas fa-undo-alt has-text-white"></i></div>
      <div class="column " style="margin: 0 auto;"><p class="has-text-centered title is-4 has-text-white">Detalle Mapa</p></div>
      <div class="column is-3 p-0" style="text-align: center;"><router-link class="" to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link></div>
    </nav>

    <div v-if="this.$store.state.viewDetalleMapa == false">
      <ModalEnemigos/>
    </div>

    <div v-if="this.$store.state.viewDetalleMapa == true" >
      <div>
        <RolloHistoriaMapa/>
      </div>
      <div>
        <EspecificacionesMapas/>
      </div>
      <div>
        <LosetasYBotones/>
      </div>
    </div>

  </div>
</template>

<script>
import RolloHistoriaMapa from "@/components/mapas/RolloHistoriaMapa.vue";
import EspecificacionesMapas from "@/components/mapas/EspecificacionesMapa.vue";
import LosetasYBotones from "@/components/mapas/LosetasYBotones.vue";
import ModalEnemigos from "@/components/AHBase/enemigosAHBase.vue";

export default {
name:"DetalleMapa",
components:{
    RolloHistoriaMapa,
    EspecificacionesMapas,
    LosetasYBotones,

    ModalEnemigos
  },
methods:{
  goBack() {
      this.$router.go(-1);
    },
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
</style>