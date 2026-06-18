<template>
    <div>
      <!-- Evento Pelea -->
      <div v-if="this.$store.state.interactionData.event.type == 'fight'"> <event_figth/> </div>

      <!-- Evento Resonancia -->
      <div v-else-if="this.$store.state.interactionData.event.type == 'resonance'"> <event_resonance/> </div>

      <!-- Evento Intercambio -->
      <div v-else-if="this.$store.state.interactionData.event.type == 'trade'"> <event_trade/> </div>

      <!-- Evento fractura temporal -->
      <div v-else-if="this.$store.state.interactionData.event.type == 'temporalFracture'"> <event_temporalFracture/> </div>

      <!-- Evento Espejo Dimensional (oculto) -->
      <div v-else-if="this.$store.state.interactionData.event.type == 'dimensionalMirror'"> <event_dimensionalMirror/> </div>

    </div>
</template>

<script>
import event_figth from "@/components/inPlay/modals/events/figth.vue";
import event_resonance from "@/components/inPlay/modals/events/resonance.vue";
import event_temporalFracture from "@/components/inPlay/modals/events/temporalFracture.vue";
import event_trade from "@/components/inPlay/modals/events/trade.vue";
import event_dimensionalMirror from "@/components/inPlay/modals/events/dimensionalMirror.vue";

export default {
  name:"switcher Eventos OnLine entre usuarios",
  components:{
    event_figth,
    event_resonance,
    event_temporalFracture,
    event_trade,
    event_dimensionalMirror
  },
  data(){
    return{}
  },

  methods:{},
  mounted(){
    // console.error("se ha aceptado la invitacion")
    // console.error(this.$store.state.interactionData)
  }
}
</script>