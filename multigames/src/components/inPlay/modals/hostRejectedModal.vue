<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold has-text-white">{{ textoInterfaz.titulo }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <h2 class="has-text-centered">{{ textoInterfaz.descripcion }}</h2>
          
          <div class="notification is-dark mt-3">
            <p class="has-text-centered">
              {{ textoInterfaz.mensaje }}
            </p>
          </div>
          
          <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
        </section>

        <footer class="">
          <div class="field">
            <p class="control">
              <button @click="closeModal" class="button is-danger is-fullwidth">
                {{ textoInterfaz.botonCerrar }}
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
  name: "HostRejectedModal",
  data() {
    return {
      textoInterfaz: {
        titulo: "",
        descripcion: "",
        mensaje: "",
        expansion: "",
        botonCerrar: ""
      },
    }
  },

  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje == 'español') {
        this.textoInterfaz.titulo = "Encuentro Rechazado";
        this.textoInterfaz.descripcion = "El portal se cierra abruptamente...";
        this.textoInterfaz.mensaje = "Sientes que algo dentro del portal te empuja con violencia. La presencia del otro lado ha rechazado tu llamada y el umbral se desvanece en la oscuridad.";
        this.textoInterfaz.expansion = "Expansión: Base";
        this.textoInterfaz.botonCerrar = "Aceptar el destino";
      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.titulo = "Encounter Rejected";
        this.textoInterfaz.descripcion = "The portal closes abruptly...";
        this.textoInterfaz.mensaje = "You feel something inside the portal pushing you violently. The presence on the other side has rejected your call and the threshold fades into darkness.";
        this.textoInterfaz.expansion = "Expansion: Base";
        this.textoInterfaz.botonCerrar = "Accept fate";
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