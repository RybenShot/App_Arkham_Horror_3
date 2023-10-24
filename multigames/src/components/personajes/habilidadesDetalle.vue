<template>
  <section class="mt-4 mb-4 has-text-white">
    <p>{{ this.$store.state.datosPJactual.efecto1 }}</p>
    <p v-if="this.$store.state.datosPJactual.efecto2">{{ this.$store.state.datosPJactual.efecto2 }}</p>
    <p class="is-italic pt-2 has-text-centered">{{ this.$store.state.datosPJactual.frase }}</p>
    <p class="has-text-weight-semibold is-underlined pt-3">Limite de concentración: {{ this.$store.state.datosPJactual.limConcentracion }}</p>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>