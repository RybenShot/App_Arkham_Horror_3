<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="mr-6">
      <div class="modal-card">
        <!-- Switcher tipos eventos -->

        <!-- interaccion si es pelea -->
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold has-text-white">{{ textoInterfaz.titulo }}</p>
          <i class="fa-2x fas fa-times-circle has-text-success cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <h2 class="has-text-centered">{{ textoInterfaz.descripcion }}</h2>
          
          <div class="notification is-success mt-3">
            <p class="has-text-centered has-text-weight-bold">
              HELLO WORLD - INTERACCIÓN INICIADA
            </p>
          </div>
          
          <div class="box mt-3">
            <p><strong>Tipo de encuentro:</strong> {{ getInteractionType() }}</p>
            <p><strong>Estado:</strong> {{ this.$store.state.interactionData?.status }}</p>
            <p><strong>ID Interacción:</strong> {{ this.$store.state.interactionData?.idInteraccionOnLine }}</p>
          </div>
          
          <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
        </section>

        <footer class="">
          <div class="field">
            <p class="control">
              <button @click="closeModal" class="button is-success is-fullwidth">
                {{ textoInterfaz.botonContinuar }}
              </button>
            </p>
          </div>
        </footer>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HostAcceptedModal",
  props: {

  },
  data() {
    return {
      textoInterfaz: {
        titulo: "",
        descripcion: "",
        expansion: "",
        botonContinuar: ""
      },
    }
  },

  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje == 'español') {
        this.textoInterfaz.titulo = "¡Encuentro Aceptado!";
        this.textoInterfaz.descripcion = "El portal se abre y la conexión se establece...";
        this.textoInterfaz.expansion = "Expansión: Base";
        this.textoInterfaz.botonContinuar = "Continuar";
      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.titulo = "Encounter Accepted!";
        this.textoInterfaz.descripcion = "The portal opens and the connection is established...";
        this.textoInterfaz.expansion = "Expansion: Base";
        this.textoInterfaz.botonContinuar = "Continue";
      }
    },

    getInteractionType() {
      const type = this.$store.state.interactionData?.event?.type;
      if (this.$store.state.lenguaje === 'español') {
        const types = { fight: 'Combate', trade: 'Intercambio', resonance: 'Resonancia' };
        return types[type] || type;
      } else {
        const types = { fight: 'Fight', trade: 'Trade', resonance: 'Resonance' };
        return types[type] || type;
      }
    },

    closeModal() {
      const textoConfirmacion = this.$store.state.lenguaje === 'español' 
        ? `Si cierras la interaccion ahora, vas a perder automaticamente el encuentro, estas seguro de seguir?`
        : `If you close the interaction now, you will automatically lose the encounter, are you sure you want to proceed?`;

      this.$buefy.dialog.confirm({
        title: this.$store.state.lenguaje === 'español' ? 'Confirmar' : 'Confirm',
        message: textoConfirmacion,
        confirmText: this.$store.state.lenguaje === 'español' ? 'Confirmar' : 'Confirm',
        cancelText: this.$store.state.lenguaje === 'español' ? 'Cancelar' : 'Cancel',
        type: 'is-info',
        hasIcon: true,
        onConfirm: async () => {
          this.$store.state.showInteractionEventModal= false
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' ? `tu veras ...` : `as you wish...`,
            type: 'is-danger',
            duration: 2000
          });
          //TODO hayq ue mandar a back confirmacion de abandono para poner como ganador al otro jugador
          //TODO Aqui debemos poner el modal del objeto perdido
        }
      });

    }
  },

  mounted() {
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
.BGBendicion {
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}

.cruzeta {
  cursor: pointer;
}
</style>