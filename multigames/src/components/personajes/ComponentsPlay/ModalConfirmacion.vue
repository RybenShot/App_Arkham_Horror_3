<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGBendicion">
          <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'español'">Ya te vas?</p>
          <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">Sure?</p>
        </header>
        <section class="modal-card-body hero is-large py-2">
          <!-- cambio de personaje -->
          <div v-if="this.$store.state.Terminarpartida == false">
            <h2 class="title">Cambiar personaje.</h2>
            <p class="subtitle is-6">Con esto vas a resetear al personaje y elegir uno nuevo.</p>
            <router-link to="/ListaPersonajes"><button class="button is-dark"><i class="fas fa-users mx-3"></i> Confirmar</button></router-link>
          </div>

          <div v-if="this.$store.state.Terminarpartida == true">
            <h2 class="title">Terminar partida</h2>
            <p class="subtitle is-6">Con esto vas a terminar la partida e ir a menu principal</p>
            <router-link to="/"><button class="button is-black"><i class="fas fa-power-off mx-3"></i>Confirmar</button></router-link>
          </div>
        </section>

        <footer class="modal-card-foot">
          <button @click="this.$store.state.ModalConfirmacion = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'español'"> Volver </button>
          <button @click="this.$store.state.ModalConfirmacion = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'ingles'"> Go back </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "modal confirmacion terminar partida o cambiar personaje"
}
</script>

<style>

</style>