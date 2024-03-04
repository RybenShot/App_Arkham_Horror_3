<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGBendicion">
          <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'español'">Ver Pertenencia</p>
          <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">Ver Pertenencia</p>
        </header>
        <section class="modal-card-body hero is-large py-2">
          <img :src="this.$store.state.SeleccionarURLPertenencia"  />
        </section>

        <footer class="modal-card-foot">
          <button @click="this.$store.state.verDetallePertenencia = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'español'"> Volver </button>
          <button @click="this.$store.state.verDetallePertenencia = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'ingles'"> Go back </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ver detalle de pertenencias"
}
</script>

<style>

</style>