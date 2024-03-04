<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalDeterminado = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head m-0 BGDeterminado">
              <p class="modal-card-title has-text-weight-bold has-text-light" v-if="this.$store.state.lenguaje == 'español'">Estado: <br> DETERMINADO</p>
              <p class="modal-card-title has-text-weight-bold" v-if="this.$store.state.lenguaje == 'ingles'">State: DETERMINED</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2 v-if="this.$store.state.lenguaje == 'español'">Tu límite de concentración aumenta en uno. Al final de tu turno, si nop estás Fatigado, puedes darle la vuelta a esta carta (quitar carta de determinado y activar carta de Fatigado) para realizar una acción adicional.</h2>
              <h2 v-if="this.$store.state.lenguaje == 'ingles'">Your concentration limit increases by one. At the end of your turn, if you are not Fatigued, you may flip this card (remove Determined card and activate Fatigued card) to take an additional action.</h2>

              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'español'">Expansion: Secretos de la Orden</p>
              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'ingles'">Expansion: Secrets</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">

                  <button @click="(this.$store.state.EstadoDeterminado = false) ,
                  (this.$store.state.modalDeterminado = false)"
                  class="button is-danger is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Descartar</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Remove</p>  
                  </button>
                </p>
                <p class="control column is-half">

                  <button @click="(this.$store.state.EstadoDeterminado = true) ,
                  (this.$store.state.modalDeterminado = false)"
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

}
</script>

<style>
.BGDeterminado{
  background-image: url(@/assets/img/Estados/Determinado.jpg);
  background-position: center;
  background-size: cover;
}

</style>