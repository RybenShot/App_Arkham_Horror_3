<template>
  <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGSeñalado">
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'español'">Estado: Señalado</p>
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">State: Pointed</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2 v-if="this.$store.state.lenguaje == 'español'">Para el resto de la partida eres el objetivo de todas las criaturas, ignorando lo que ponga la tarjeta de dicha criatura. Te seguirán hasta alcanzarte y matarte. Mientras esta carta permanezca activa, TODAS LAS CRIATURAS TIENEN +1 DE VELOCIDAD. Si por el camino una criatura se topa con otro investigador, dicha criatura se enfrentará a ese investigador.</h2>
              <h2 v-if="this.$store.state.lenguaje == 'ingles'">For the rest of the game you are the target of all creatures, ignoring what the card of that creature puts. They will follow you until they reach you and kill you. As long as this card remains active, ALL CREATURES HAVE +1 SPEED. If along the way a creature encounters another researcher, that creature will face that researcher.</h2>

              <hr class="my-2">
              <h2 v-if="this.$store.state.lenguaje == 'español'">Para librarte de esta carta, tienes que descartar un estado de Bendición.</h2>
              <h2 v-if="this.$store.state.lenguaje == 'ingles'">To get rid of this letter, you have to discard a state of Blessing.</h2>

              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'español'">Expansion: Original</p>
              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'ingles'">Expansion: Original</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(
                  this.$store.state.EstadoSeñalado = false) ,
                  (this.$store.state.modalSeñalado = false)
                  " class="button is-danger is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Quitar Estado</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Remove state</p> 
                  </button>
                </p>
                  
                <p class="control column is-half">
                  <button @click="this.$store.state.modalSeñalado = false" class="button is-link is-fullwidth">
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
.BGSeñalado{
  background-image: url(@/assets/img/Estados/Señalado.jpg);
  background-position: center;
  background-size: cover;
}
</style>