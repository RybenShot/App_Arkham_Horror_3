<template>
  <div class="modal is-active">
    <div class="modal-background" @click="this.$store.state.modalVerLosetaMapa = false"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGLosetaMapa py-5">
          <p class="modal-card-title has-text-white has-text-weight-bold" v-if="this.$store.state.lenguaje == 'español'">Detalle Loseta</p>
          <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">Map detail</p>
        </header>
        <section class="modal-card-body hero is-large py-2">
          <img :src="this.$store.state.datosMapa.imgMapa"  />
        </section>
        <footer class="modal-card-foot">
          <button @click="this.$store.state.modalVerLosetaMapa = false" class="button column is-3 is-danger p-1" v-if="this.$store.state.lenguaje == 'español'"> Volver </button>
          <button @click="this.$store.state.modalVerLosetaMapa = false" class="button column is-3 is-danger p-1" v-if="this.$store.state.lenguaje == 'ingles'"> Go back </button>
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
.BGLosetaMapa{
  background-image: url(@/assets/img/3-Mapas/bannerModalLosetas.jpg);
  background-position: center;
  background-size: cover;
}
</style>