<template>
  <section class="hero is-danger is-fullheight" id="BGError404">
  <div class="hero-body">
    <div class="">
      <p class="title">Error 404</p>
      <p class="subtitle">{{textoInterfaz.perdido}}</p>
      <button class="button is-danger">
        <router-link to="/">{{textoInterfaz.botonVolver}}</router-link>
      </button>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'Error404',
  data() {
    return {
      textoInterfaz: {
        perdido: "",
        botonVolver: ""
      }
    };
  },
  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje == "español") {
        this.textoInterfaz.perdido = "¿Perdido en el espacio y el tiempo?";
        this.textoInterfaz.botonVolver = "Volver a estar seguro";
      } else if (this.$store.state.lenguaje == "ingles") {
        this.textoInterfaz.perdido = "Lost in space and time?";
        this.textoInterfaz.botonVolver = "Back to be safe";
      }
    },
  },
  mounted() {
    this.rellenarTextoSegunIdioma();
  },
}
</script>

<style>
#BGError404 {
  background-image: url(@/assets/img/ZZOtros/BGError404.2.jpg);
  min-height: 120vh;
  position: relative;
  background-position: center;
  background-size: cover;
}
</style>