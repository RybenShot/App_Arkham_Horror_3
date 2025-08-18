<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="mr-6">
      <div class="modal-card">
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
            <p><strong>Estado:</strong> {{ interactionData?.status }}</p>
            <p><strong>ID Interacción:</strong> {{ interactionData?.idInteraccionOnLine }}</p>
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
    interactionData: {
      type: Object,
      default: null
    }
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
      const type = this.interactionData?.event?.type;
      if (this.$store.state.lenguaje === 'español') {
        const types = { fight: 'Combate', trade: 'Intercambio', resonance: 'Resonancia' };
        return types[type] || type;
      } else {
        const types = { fight: 'Fight', trade: 'Trade', resonance: 'Resonance' };
        return types[type] || type;
      }
    },

    closeModal() {
      this.$emit('modal-closed');
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