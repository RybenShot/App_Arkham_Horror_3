<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalFatigado = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head m-0 BGFatigado">
              <p class="modal-card-title has-text-weight-bold has-text-light" v-if="this.$store.state.lenguaje == 'español'">Estado: <br> FATIGADO</p>
              <p class="modal-card-title has-text-weight-bold" v-if="this.$store.state.lenguaje == 'ingles'">State: TIRED</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2 v-if="this.$store.state.lenguaje == 'español'">Si estás Determinado, descarta esa carta. No puedes ganar Determinado. Cuendo estés resolkviendo una prueba, como coste adicional para volver a tirar uno o más dados quita un dado de esa prueba. Después de que realices una acción de concentración, descarta esta carta.</h2>
              <h2 v-if="this.$store.state.lenguaje == 'ingles'">If you are Determined, discard this card. You cannot fail while Determined. When resolving a test, as an additional cost to reroll one or more dice, remove one die from that test. After you perform a Concentrate action, discard this card.</h2>

              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'español'">Expansion: Secretos de la Orden</p>
              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'ingles'">Expansion: Secrets</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">

                  <button @click="(this.$store.state.EstadoFatigado = false) ,
                  (this.$store.state.modalFatigado = false)"
                  class="button is-danger is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Descartar</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Remove</p>  
                  </button>
                </p>
                <p class="control column is-half">

                  <button @click="(this.$store.state.EstadoFatigado = true) ,
                  (this.$store.state.modalFatigado = false)"
                  class="button is-link is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Añadir</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Añadir</p>
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
name: "modal Fatigado"
}
</script>

<style>
.BGFatigado{
  background-image: url(@/assets/img/Estados/Fatigado.jpg);
  background-position: center;
  background-size: cover;
}

</style>