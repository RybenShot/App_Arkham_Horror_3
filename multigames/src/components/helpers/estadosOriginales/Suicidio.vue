<template>
  <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGSuicidio">
              <p class="modal-card-title has-text-white">Estado: Al filo de la navaja</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>Durante la partida, si el investigador falla 2 veces seguidas cualquier prueba, este acabará con su vida. Sin embargo, si consigue 2 aciertos seguidos, descarta esta carta.</h2>
              <p class="subtitle is-7 has-text-right mt-2">Expansion: Original</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half"><button @click="(
                  this.$store.state.EstadoSuicidio = false) ,
                  (this.$store.state.modalSuicidio = false)
                  " class="button is-danger is-fullwidth">Quitar Estado</button></p>
                  
                <p class="control column is-half"><button @click="this.$store.state.modalSuicidio = false" class="button is-link is-fullwidth">Volver</button></p>
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