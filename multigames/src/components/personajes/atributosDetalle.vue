<template>
<section>
  <div class="columns is-mobile has-text-centered">
    <div class="column pb-1">
      <i class="fa-5x fas fa-heartbeat has-text-danger"></i>
      <p class="contadorVidaCordura title has-text-white">{{ this.$store.state.datosPJactual.vida }}</p>
    </div>
    <div class="column pb-0">
      <i class="has-text-info fa-5x fas fa-brain"></i>
      <p class="contadorVidaCordura title has-text-white">{{ this.$store.state.datosPJactual.cordura }}</p>
    </div>
  </div>

  <div class="columns is-mobile has-text-centered has-text-white">
    <div class="column">
      <i class="fa-3x fas fa-book-open has-text-purple"></i>
      <p class="title is-4 has-text-white contadorAtributos">{{ this.$store.state.datosPJactual.saber }}</p>
      <p class="NombresAtributos">Saber</p>
    </div>
    <div class="column">
      <i class="fa-3x fas fa-handshake has-text-orange"></i>
      <p class="title is-4 has-text-white contadorAtributos">{{ this.$store.state.datosPJactual.influencia }}</p>
      <p class="NombresAtributos">Infl.</p>
    </div>
    <div class="column">
      <i class="fa-3x fas fa-eye has-text-primary"></i>
      <p class="title is-4 has-text-white contadorAtributos">{{ this.$store.state.datosPJactual.observacion }}</p>
      <p class="NombresAtributos">Observ.</p>
    </div>
    <div class="column">
      <i class="fa-3x fas fa-fist-raised has-text-danger"></i>
      <p class="title is-4 has-text-white contadorAtributos">{{ this.$store.state.datosPJactual.fuerza }}</p>
      <p class="NombresAtributos">fuer.</p>
    </div>
    <div class="column">
      <i class="fa-3x fab fa-hornbill has-text-info"></i>
      <p class="title is-4 has-text-white contadorAtributos">{{ this.$store.state.datosPJactual.voluntad }}</p>
      <p class="NombresAtributos">Vol.</p>
    </div>
  </div>

</section>
</template>

<script>
export default {

}
</script>

<style scoped>
.contadorVidaCordura{
  position: relative;
  top: -5vh;
  line-height: 0;
}

.contadorAtributos{
  position: relative;
  top: -3vh;
  line-height: 0;
}

.NombresAtributos{
  position: relative;
  top: -1vh;
  line-height: 0;
}

.has-text-purple{
  color:  #9b51e0 ;
}

.has-text-orange{
  color: #f2994a;
}
</style>