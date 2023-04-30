<template>
  <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGBendicion">
              <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'español'">Estado: ENFERMO</p>
              <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">State: Sick</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2></h2>
              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'español'">Expansion: Original</p>
              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'ingles'">Expansion: Original</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(
                  this.$store.state.EstadoBendicion = false) ,
                  (this.$store.state.modalBendicion = false),
                   (this.$store.state.AvAcierto3 = null)
                  " class="button is-danger is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Quitar Enfermo</p> 
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Remove Sick</p> 
                  </button>
                </p>
                  
                <p class="control column is-half">
                  <button @click="this.$store.state.modalBendicion = false" class="button is-link is-fullwidth">
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
  name:"EstadoEnfermo",

  methods:{
  }
}
</script>
<style>
.BGBendicion{
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}
</style>