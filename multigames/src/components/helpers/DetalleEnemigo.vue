<template>
  <div class="modal is-active">
    <div class="modal-background" @click="this.$store.state.verDetalleEnemigo = false"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGEnemigos">
          <p class="modal-card-title has-text-white has-text-weight-bold" v-if="this.$store.state.lenguaje == 'español'">Detalle enemigo</p>
          <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">Enemy detail</p>

        </header>
        <section class="modal-card-body hero is-large py-2">
          <img :src="this.$store.state.SeleccionarURLEnemigo"  />
        </section>
        <footer class="modal-card-foot">
          <button @click="this.$store.state.verDetalleEnemigo = false" class="button column is-3 is-danger p-1" v-if="this.$store.state.lenguaje == 'español'"> Volver </button>
          <button @click="this.$store.state.verDetalleEnemigo = false" class="button column is-3 is-danger p-1" v-if="this.$store.state.lenguaje == 'ingles'"> Go back </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zoom de Enemigo"
}
</script>

<style>
.BGEnemigos{
  background-image: url(@/assets/img/4-Enemigos/Enemigos.jpg);
  background-position: center;
  background-size: cover;
}
.cruzeta {
  justify-content: space-between !important;
}
</style>