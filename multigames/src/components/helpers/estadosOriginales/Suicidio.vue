<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalSuicidio = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGSuicidio">
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'español'">Estado: Al filo de la navaja</p>
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">State: On the edge of the knife</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2 v-if="this.$store.state.lenguaje == 'español'">Durante la partida, si el investigador falla 2 veces seguidas cualquier prueba, este acabará con su vida. Sin embargo, si consigue 2 aciertos seguidos, descarta esta carta.</h2>
              <h2 v-if="this.$store.state.lenguaje == 'ingles'">During the game, if the investigator fails any test twice in a row, it will end his life. However, if you get 2 hits in a row, discard this card.</h2>

              <p class="subtitle is-7 has-text-right mt-2" >Expansion: Original</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(
                  this.$store.state.EstadoSuicidio = false) ,
                  (this.$store.state.modalSuicidio = false)
                  " class="button is-danger is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Quitar Estado</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Remove State</p>
                  </button>
                </p>
                  
                <p class="control column is-half">
                  <button @click="this.$store.state.modalSuicidio = false" class="button is-link is-fullwidth">
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
  name:"EstadoSuicidio",

  methods:{
  }
}
</script>
<style>
.BGSuicidio{
  background-image: url(@/assets/img/Estados/Suicidio.jpg);
  background-position: center;
  background-size: cover;
}
</style>