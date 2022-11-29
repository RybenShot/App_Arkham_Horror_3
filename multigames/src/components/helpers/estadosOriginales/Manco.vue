<template>
  <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGManco">
              <p class="modal-card-title has-text-white">Estado: Manco</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>Para el resto de la partida no podrás usar objetos ni hechizos que requieran de 2 manos.</h2>
              <p class="subtitle is-7 has-text-right mt-2">Expansion: Original</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column "><button @click="
                  (this.$store.state.modalManco = false)" 
                  class="button is-danger is-fullwidth">Volver</button></p>
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