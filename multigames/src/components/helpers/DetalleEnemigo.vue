<template>
  <div class="modal is-active">
    <div class="modal-background" @click="this.$store.state.verDetalleEnemigo = false"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGEnemigos">
          <p class="modal-card-title has-text-white has-text-weight-bold">{{ textoInterfaz.titulo }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.verDetalleEnemigo = false"></i>
        </header>
        <section class="modal-card-body hero is-large py-2">
          <img :src="this.$store.state.SeleccionarURLEnemigo"  />
        </section>
        <footer class="modal-card-foot">
          <button @click="this.$store.state.verDetalleEnemigo = false" class="button column is-3 is-danger p-1"> {{ textoInterfaz.botonVolver }} </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zoom de Enemigo",
  data(){
    return{
      textoInterfaz: {
        titulo: "",
        botonVolver:""
      }
    }
  },
  methods: {
    rellenarTextoSegunIdioma(){
      if (this.$store.state.lenguaje == "español") {
        this.textoInterfaz.titulo = "Detalle enemigo";
        this.textoInterfaz.botonVolver= "Volver";
      } else if (is.$store.state.lenguaje == "ingles") {
        this.textoInterfaz.titulo = "Enemy detail";
        this.textoInterfaz.botonVolver= "Go back";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
.BGEnemigos{
  background-image: url(@/assets/img/4-Enemigos/Enemigos.jpg);
  background-position: center;
  background-size: cover;
}
.cruzeta {
  justify-content: space-between !important;
}
</style>