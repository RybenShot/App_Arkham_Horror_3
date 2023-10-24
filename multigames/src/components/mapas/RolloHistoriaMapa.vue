<template>
  <div class="mt-3">
    <div class="mx-3 has-background-grey-light py-1"></div>
    <div class="columns is-mobile mb-0">
      <div class="column mx-6 mt-3 has-background-light">
        <div class="columns is-mobile m-0">
          <p class="column title is-size-5  is-underlined mb-0">{{ this.$store.state.datosMapa.title }}</p>
          <p class="column is-2"><i class="fa-2x fas fa-volume-up has-text-dark"></i></p>
        </div>
        <p class="subtitle is-size-7">{{ this.$store.state.datosMapa.description }}</p>
      </div>
    </div>
    <div class="mx-3 has-background-grey-light py-1"></div>
  </div>
</template>

<script>
export default {
  name: 'Detalle-Mapa'
}
</script>

<style>

</style>