<template>
  <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGSeñalado">
              <p class="modal-card-title has-text-white">Estado: Señalado</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>Para el resto de la partida eres el objetivo de todas las criaturas, ignorando lo que ponga la tarjeta de dicha criatura. Te seguirán hasta alcanzarte y matarte. Mientras esta carta permanezca activa, TODAS LAS CRIATURAS TIENEN +1 DE VELOCIDAD. Si por el camino una criatura se topa con otro investigador, dicha criatura se enfrentará a ese investigador.</h2>
              <hr class="my-2">
              <h2>Para librarte de esta carta, tienes que descartar un estado de Bendición.</h2>
              <p class="subtitle is-7 has-text-right mt-2">Expansion: Original</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half"><button @click="(
                  this.$store.state.EstadoSeñalado = false) ,
                  (this.$store.state.modalSeñalado = false)
                  " class="button is-danger is-fullwidth">Quitar Estado</button></p>
                  
                <p class="control column is-half"><button @click="this.$store.state.modalSeñalado = false" class="button is-link is-fullwidth">Volver</button></p>
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