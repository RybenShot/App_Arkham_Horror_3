<template>
  <section>
    <div>
    <!-- MODAL RECORDATORIO POPUP (por ahora usado para recordar los efectos de la retribucion) -->
    <div v-if="this.$store.state.modalPopUpNotificacion"><PopUpNotificacion/></div>

    <!-- MODAL PACTO SINIESTRO -->
    <div v-if="this.$store.state.modalPacto"><PactosSiniestros/></div>
    <!-- MODAL MALDITO -->
    <div v-if="this.$store.state.modalMaldito"><EstadoMaldicion/></div>
    <!-- MODAL BENDITO -->
    <div v-if="this.$store.state.modalBendicion" ><EstadoBendicion/></div>
    <!-- MODAL MANCILLADO  -->
    <div v-if="this.$store.state.modalMancillado" ><EstadoMancillado/></div>
    <!-- MODAL DETERMINADO  -->
    <div v-if="this.$store.state.modalDeterminado" ><EstadoDeterminado/></div>
    <!-- MODAL FATIGADO  -->
    <div v-if="this.$store.state.modalFatigado" ><EstadoFatigado/></div>
    <!-- MODAL PERSEGUIDO -->
    <div v-if="this.$store.state.modalPerseguido" ><EstadoPerseguido/></div>
    <!-- MODAL PERSEGUIDO-AGITADO -->
    <div v-if="this.$store.state.modalPerseguido_Agitado"><EstadoPerseguidoAgitado/></div>


    <!-- ORIGINALES -->
      <!-- MANCO -->
      <div v-if="this.$store.state.modalManco" ><EstadoManco/></div>
      <!-- SUICIDIO -->
      <div v-if="this.$store.state.modalSuicidio" ><EstadoAlFilo/></div>
      <!-- SEÑALADO -->
      <div v-if="this.$store.state.modalSeñalado" ><EstadoSeñalado/></div>
    </div>
  </section>
</template>

<script>
import PopUpNotificacion from "@/components/helpers/modals/popUpNotificacion.vue";

import EstadoMaldicion from "@/components/helpers/estados/Maldicion.vue"
import EstadoBendicion from "@/components/helpers/estados/Bendicion.vue"
import EstadoMancillado from "@/components/helpers/estados/Mancillado.vue"
import PactosSiniestros from "@/components/helpers/estados/pactosSiniestros.vue"
import EstadoDeterminado from "@/components/helpers/estados/Determinado.vue"
import EstadoFatigado from "@/components/helpers/estados/Fatigado.vue"
import EstadoPerseguido from "@/components/helpers/estados/Perseguido.vue"
import EstadoPerseguidoAgitado from "@/components/helpers/estados/Perseguido_Agitado.vue"
// Estados Originales
import EstadoManco from "@/components/helpers/estadosOriginales/Manco.vue"
import EstadoAlFilo from "@/components/helpers/estadosOriginales/AlFilo.vue"
import EstadoSeñalado from "@/components/helpers/estadosOriginales/Señalado.vue"

export default {
name: "Modals de Estados",
  components:{
    PopUpNotificacion,

    EstadoMaldicion,
    EstadoBendicion,
    EstadoMancillado,
    PactosSiniestros,
    EstadoDeterminado,
    EstadoFatigado,
    EstadoPerseguido,
    EstadoPerseguidoAgitado,

    EstadoManco,
    EstadoAlFilo,
    EstadoSeñalado
  },
}
</script>
