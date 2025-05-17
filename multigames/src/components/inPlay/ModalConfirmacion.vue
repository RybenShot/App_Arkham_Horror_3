<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="">
      <div class="modal-card">
        <header class="modal-card-head BGBendicion">
          <p class="modal-card-title">{{ textoInterfaz.titulo }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.ModalConfirmacion = false"></i>
        </header>
        <section class="modal-card-body hero is-large py-2">
          <!-- cambio de personaje -->
          <div v-if="this.$store.state.Terminarpartida == false">
            <h2 class="title">{{ textoInterfaz.cambiarPersonaje }}</h2>
            <p class="subtitle is-6">{{ textoInterfaz.descripcion }}</p>
            <router-link to="/ListaPersonajes">
              <button @click="(resetearNavegacion()),(this.$store.state.ModalConfirmacion = false)" class="button is-dark"><i class="fas fa-users mx-3"></i> {{ textoInterfaz.botones.confirmar }}</button>
            </router-link>
          </div>

          <div v-if="this.$store.state.Terminarpartida == true">
            <h2 class="title">{{ textoInterfaz.terminarPartida }}</h2>
            <p class="subtitle is-6">{{ textoInterfaz.descripcion2 }}</p>
            <router-link to="/">
              <button @click="(resetearNavegacion()),(this.$store.state.ModalConfirmacion = false)" class="button is-black"><i class="fas fa-power-off mx-3"></i>{{ textoInterfaz.botones.confirmar }}</button>
            </router-link>
          </div>
        </section>

        <footer class="modal-card-foot">
          <button @click="this.$store.state.ModalConfirmacion = false" class="button column is-3 is-link p-1"> {{ textoInterfaz.botones.volver }} </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal confirmacion terminar partida o cambiar personaje",
  data() {
    return {
      textoInterfaz: {
        titulo: "",
        titulo2 : "",
        terminarPartida: "",
        cambiarPersonaje: "",
        descripcion: "",
        descripcion2: "",
        botones: {
          confirmar: "",
          volver: "",
        },
      },
    };
  },
  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje == "español") {
        this.textoInterfaz.titulo = "Ya te vas?";
        this.textoInterfaz.cambiarPersonaje = "Cambiar personaje";
        this.textoInterfaz.terminarPartida = "Terminar partida";
        this.textoInterfaz.descripcion = "Con esto vas a resetear al personaje y elegir uno nuevo.";
        this.textoInterfaz.descripcion2 = "Con esto vas a terminar la partida e ir a menu principal";
        this.textoInterfaz.botones.confirmar = "Confirmar";
        this.textoInterfaz.botones.volver = "Volver";

      } else if (this.$store.state.lenguaje == "ingles") {
        this.textoInterfaz.titulo = "Sure?";
        this.textoInterfaz.cambiarPersonaje = "Change character";
        this.textoInterfaz.terminarPartida = "End game";
        this.textoInterfaz.descripcion= "With this you will reset the character and choose a new one.";
        this.textoInterfaz.descripcion2 = "With this you will end the game and go to the main menu";
        this.textoInterfaz.botones.confirmar = "Confirm";
        this.textoInterfaz.botones.volver = "Go back";
      }
    },
    // funcion repetida en el componente Components/personajes/ComponentsPlay/DatosBasicosPersonaje
    resetearNavegacion(){
      this.$store.state.StoreTiradorDados = true;
      this.$store.state.StoreEstadosPlay = false;
      this.$store.state.StoreHabilidades = false;
      this.$store.state.StoreAjustesPlay = false;
    }
  },
  mounted() {
    this.rellenarTextoSegunIdioma();
  },
}
</script>

<style scoped>

</style>