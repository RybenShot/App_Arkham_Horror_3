<template>
  <div class="modal is-active">
        <div class="modal-background" @click="
                  (this.$store.state.modalManco = false)"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGManco">
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'español'">Estado: Manco</p>
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">State: One-armed</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2 v-if="this.$store.state.lenguaje == 'español'">Para el resto de la partida no podrás usar objetos ni hechizos que requieran de 2 manos.</h2>
              <h2 v-if="this.$store.state.lenguaje == 'ingles'">For the rest of the game you will not be able to use objects or spells that require 2 hands.</h2>

              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'español'">Expansion: Original</p>
              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'ingles'">Expansion: Original</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column ">
                  <button @click="
                  (this.$store.state.modalManco = false)" 
                  class="button is-danger is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Volver</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Go back</p> 
                  </button>
                </p>
              </div>
            </footer>

          </div>
        </div>
      </div>
</template>

<script>
export default {
  name:"EstadoManco",
  methods:{
  }
}
</script>
<style>
.BGManco{
  background-image: url(@/assets/img/Estados/Manco.jpg);
  background-position: center;
  background-size: cover;
}
</style>