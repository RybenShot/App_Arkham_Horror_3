<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGBendicion">
          <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'español'">Detalle enemigo</p>
          <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">Enemy detail</p>
        </header>
        <section class="modal-card-body hero is-large py-2">
          <img :src="this.$store.state.SeleccionarURLEnemigo"  />
        </section>
        <footer class="modal-card-foot">
          <button @click="this.$store.state.verDetalleEnemigo = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'español'"> Volver </button>
          <button @click="this.$store.state.verDetalleEnemigo = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'ingles'"> Go back </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>