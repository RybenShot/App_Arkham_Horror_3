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
            <footer class="modal-card-foot">
              <!-- <button @click="(EstadoBendito = false), this.Bendecido()" class="button column is-3 is-danger p-1"> Descartar </button> -->
              <button @click="cerrarModal(false)" class="button column is-3 is-link p-1"> Volver </button>
            </footer>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name:"EstadoBendicion",

  methods:{
    cerrarModal(valueVistaModalBendicion){
      this.$emit("cerrarModalHijoBendicion", valueVistaModalBendicion)
    }
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