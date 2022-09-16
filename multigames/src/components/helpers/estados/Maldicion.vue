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
            <footer class="modal-card-foot">
              <!-- <button @click="(EstadoMaldito = false), this.Maldito()" class="button column is-3 is-danger p-1"> Descartar </button> -->
              <button @click="cerrarModal(false)" class="button column is-3 is-link p-1" > Volver </button>
            </footer>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name:"EstadoMaldicion",

  methods:{
    cerrarModal(valueVistaModalMaldicion){
      this.$emit("cerrarModalHijoMaldicion", valueVistaModalMaldicion)
    }
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