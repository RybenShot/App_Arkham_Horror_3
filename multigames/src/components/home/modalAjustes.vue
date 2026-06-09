<template>
  <div class="modal is-active">
    <div class="modal-background" @click="this.$store.state.StoreModalAjustes = false"></div>
    <div class="mr-6">
      <div class="modal-card ajustes-card">

        <header class="columns is-mobile is-vcentered modal-card-head BGBendicion m-0 px-4 py-3">
          <p class="modal-card-title has-text-weight-bold has-text-white is-size-5 mb-0">
            <i class="fas fa-cog mr-2"></i>{{ textoInterfaz.titulo }}
          </p>
          <i
            class="fas fa-times-circle has-text-white is-size-4 cruzeta"
            @click="this.$store.state.StoreModalAjustes = false"
          ></i>
        </header>

        <section class="modal-card-body py-3 px-4">

          <p class="seccion-label has-text-grey is-size-7 has-text-weight-semibold mb-2">
            <i class="fas fa-volume-up mr-1"></i>{{ textoInterfaz.seccionSonido }}
          </p>

          <!-- Fila: Música Ambiente -->
          <div class="ajuste-fila is-flex is-justify-content-space-between is-align-items-center px-3 py-3 mb-1">
            <div class="is-flex is-align-items-center">
              <span class="ajuste-icono mr-3">
                <i :class="musicaActiva ? 'fas fa-music' : 'fas fa-volume-mute'" class="is-size-5"></i>
              </span>
              <p class="has-text-weight-medium is-size-6 mb-0">{{ textoInterfaz.musica }}</p>
            </div>

            <div class="buttons has-addons m-0">
              <button
                :class="{ 'is-outlined': !musicaActiva }"
                @click="setMusica(true)"
                class="button is-success is-small"
              >ON</button>
              <button
                :class="{ 'is-outlined': musicaActiva }"
                @click="setMusica(false)"
                class="button is-danger is-small"
              >OFF</button>
            </div>
          </div>

        </section>

        <footer class="modal-card-foot py-2 px-4 is-justify-content-flex-end">
          <b-button
            size="is-small"
            type="is-light"
            @click="this.$store.state.StoreModalAjustes = false"
          >
            {{ textoInterfaz.cerrar }}
          </b-button>
        </footer>

      </div>
    </div>
  </div>
</template>

<script>
import { audioService_soundTrack } from '@/services/GestionAudio/audioService_soundTrack.js';

export default {
  name: "ModalAjustes",
  data() {
    return {
      musicaActiva: false,
      textoInterfaz: {
        titulo: "",
        seccionSonido: "",
        musica: "",
        cerrar: "",
      },
    };
  },
  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === "español") {
        this.textoInterfaz.titulo        = "Ajustes";
        this.textoInterfaz.seccionSonido = "Sonido";
        this.textoInterfaz.musica        = "Música ambiente";
        this.textoInterfaz.cerrar        = "Cerrar";
      } else if (this.$store.state.lenguaje === "ingles") {
        this.textoInterfaz.titulo        = "Settings";
        this.textoInterfaz.seccionSonido = "Sound";
        this.textoInterfaz.musica        = "Ambient music";
        this.textoInterfaz.cerrar        = "Close";
      }
    },
    setMusica(valor) {
      if (valor === this.musicaActiva) return; // nada que cambiar
      this.musicaActiva = valor;
      if (valor) {
        audioService_soundTrack.play();
      } else {
        audioService_soundTrack.stop();
      }
      this.$store.commit("SET_MUSICA_ACTIVA", valor);
    },
  },
  mounted() {
    this.rellenarTextoSegunIdioma();
    this.musicaActiva = this.$store.state.musicaActiva ?? false;
  },
};
</script>

<style scoped>
.ajustes-card {
  border-radius: 14px;
  overflow: hidden;
  min-width: 300px;
  max-width: 360px;
}

.BGBendicion {
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}

.modal-card-head.BGBendicion::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 0;
}
.modal-card-head.BGBendicion * {
  position: relative;
  z-index: 1;
}

.cruzeta {
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s;
}
.cruzeta:hover {
  opacity: 1;
}

.seccion-label {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 4px;
}

.ajuste-fila {
  background: #f9f9f9;
  border-radius: 10px;
  transition: background 0.15s;
}
.ajuste-fila:hover {
  background: #f0f0f0;
}

.ajuste-icono {
  color: #7a7a7a;
  width: 26px;
  text-align: center;
}
</style>