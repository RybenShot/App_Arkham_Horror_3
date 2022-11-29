<template>
  <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGMaldicion">
              <p class="modal-card-title has-text-light">Estado: MALDICIÓN</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>Cuando estés resolviendo una prueba, sólo obtienes Éxitos sacando 6. Después de que superes una prueba, descarta esta carta. Si tienes que adquirir el Estado Bendición, en vez de eso descarta esta carta. </h2>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half"><button @click="(
                  this.$store.state.EstadoMaldito = false) ,
                  (this.$store.state.modalMaldito = false),
                   (this.$store.state.AvAcierto2 = 5)
                  " class="button is-danger is-fullwidth">Quitar Maldición</button></p>

                <p class="control column is-half"><button @click="this.$store.state.modalMaldito = false" class="button is-link is-fullwidth">Volver</button></p>
              </div>
            </footer>

          </div>
        </div>
      </div>
</template>
<script>
export default {
  name:"EstadoMaldicion",
  methods:{
  }
}
</script>
<style>
.BGMaldicion{
  background-image: url(@/assets/img/Estados/Maldicion.jpg);
  background-position: center;
  background-size: cover;
}
</style>