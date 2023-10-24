<template>
  <section>
    <div>
    <!-- MODAL PACTO SINIESTRO -->
    <div v-if="this.$store.state.modalPacto"><PactosSiniestros/></div>
    <!-- MODAL MALDITO -->
    <div v-if="this.$store.state.modalMaldito"><EstadoMaldicion/></div>
    <!-- MODAL BENDITO -->
    <div v-if="this.$store.state.modalBendicion" ><EstadoBendicion/></div>
    <!-- MODAL MANCILLADO  -->
    <div v-if="this.$store.state.modalMancillado" ><EstadoMancillado/></div>

    <!-- ORIGINALES -->
      <!-- MANCO -->
      <div v-if="this.$store.state.modalManco" ><EstadoManco/></div>
      <!-- SUICIDIO -->
      <div v-if="this.$store.state.modalSuicidio" ><EstadoSuicidio/></div>
      <!-- SEÑALADO -->
      <div v-if="this.$store.state.modalSeñalado" ><EstadoSeñalado/></div>
    </div>
  </section>
</template>

<script>
import EstadoMaldicion from "@/components/helpers/estados/Maldicion.vue"
import EstadoBendicion from "@/components/helpers/estados/Bendicion.vue"
import EstadoMancillado from "@/components/helpers/estados/Mancillado.vue"
import PactosSiniestros from "@/components/helpers/estados/pactosSiniestros.vue"
// Estados Originales
import EstadoManco from "@/components/helpers/estadosOriginales/Manco.vue"
import EstadoSuicidio from "@/components/helpers/estadosOriginales/Suicidio.vue"
import EstadoSeñalado from "@/components/helpers/estadosOriginales/Señalado.vue"

export default {
name: "Modals de Estados",
  components:{
    EstadoMaldicion,
    EstadoBendicion,
    EstadoMancillado,
    PactosSiniestros,

    EstadoManco,
    EstadoSuicidio,
    EstadoSeñalado
  },
}
</script>

<style>

</style>