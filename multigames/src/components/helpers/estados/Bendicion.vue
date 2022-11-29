<template>
  <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGBendicion">
              <p class="modal-card-title">Estado: BENDICIÓN</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2> Cuando estés resolviendo una prueba, obtienes Éxitos sacando 4, 5 y 6. Después de que falles una prueba, descarta esta carta. Si tienes que adquirir el Estado Maldición, en vez de eso descarta esta carta. </h2>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half"><button @click="(
                  this.$store.state.EstadoBendicion = false) ,
                  (this.$store.state.modalBendicion = false),
                   (this.$store.state.AvAcierto3 = null)
                  " class="button is-danger is-fullwidth">Quitar Bendición</button></p>
                  
                <p class="control column is-half"><button @click="this.$store.state.modalBendicion = false" class="button is-link is-fullwidth">Volver</button></p>
              </div>
            </footer>

          </div>
        </div>
      </div>
</template>

<script>
export default {
  name:"EstadoBendicion",

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