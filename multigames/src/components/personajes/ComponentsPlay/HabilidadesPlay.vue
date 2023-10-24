<template>
  <section>
    <p class="title has-text-centered has-text-white">Habilidades</p>
    <div class="container mx-3 has-text-white">
      <p>{{ this.$store.state.datosPJactual.efecto1 }}</p>
      <p v-if="this.$store.state.datosPJactual.efecto2">{{ this.$store.state.datosPJactual.efecto2 }}</p>
      <p class="has-text-weight-semibold is-underlined pt-3">Limite de concentración: {{ this.$store.state.datosPJactual.limConcentracion }}</p>
    </div>

    <hr>

    <p class="title has-text-centered has-text-white">Dinero y Restos</p>
    <div class="columns is-mobile has-text-centered pt-2">
      <div class="column pb-1">
        <i class="fa-4x fas fa-money-bill-wave has-text-primary"></i>
        <p class="contadorVidaCordura title has-text-white pb-2">{{ this.$store.state.datosPJactual.dinero }}</p>
        <div class="columns is-mobile">
          <button @click="this.$store.state.datosPJactual.dinero --" class="column mx-5 button is-small p-0">-</button>
          <button @click="this.$store.state.datosPJactual.dinero ++" class="column mx-5 button is-small p-0">+</button>
        </div>
      </div>
      <div class="column pb-0">
        <i class="has-text-link fa-4x fas fa-poop"></i>
        <p class="contadorVidaCordura title has-text-white pt-2">{{ this.$store.state.datosPJactual.restos }}</p>
        <div class="columns is-mobile">
          <button @click="this.$store.state.datosPJactual.restos --" class="column mx-5 button is-small p-0">-</button>
          <button @click="this.$store.state.datosPJactual.restos ++" class="column mx-5 button is-small p-0">+</button>
        </div>
      </div>
    </div>

  
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>