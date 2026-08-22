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

          <p class="seccion-label has-text-grey is-size-7 has-text-weight-semibold mb-2 mt-4">
            <i class="fas fa-dice mr-1"></i>{{ textoInterfaz.seccionDados }}
          </p>

          <div v-if="!idUser" class="ajuste-fila px-3 py-3 mb-1">
            <p class="has-text-grey is-size-7 mb-0">{{ textoInterfaz.dadosRequiereLogin }}</p>
          </div>

          <div v-else>
            <p class="has-text-grey is-size-7 mb-2">{{ textoInterfaz.dadosDescripcion }}</p>

            <div class="dados-grid">
              <div v-for="n in maxDiceImages" :key="n" class="dado-slot">
                <template v-if="diceImages[n - 1]">
                  <img :src="diceImages[n - 1].data" class="dado-thumb" alt="cara de dado personalizada" />
                  <button class="dado-remove" type="button" @click="eliminarImagen(diceImages[n - 1].id)" :title="textoInterfaz.eliminar">
                    <i class="fas fa-times"></i>
                  </button>
                </template>
                <label v-else class="dado-slot-empty" :class="{ 'is-loading': subiendoImagen }">
                  <i class="fas fa-plus"></i>
                  <input type="file" accept="image/*" class="dado-input" :disabled="subiendoImagen" @change="onFileSelected($event)" />
                </label>
              </div>
            </div>

            <p class="dados-hint has-text-grey is-size-7 mb-0">
              {{ diceImages.length }}/{{ maxDiceImages }} · {{ textoInterfaz.dadosMaxTam }}
            </p>
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
import { apiService } from '@/services/api.js';
import { cropImageToSquareDataUrl } from '@/services/imageCropHelper.js';

export default {
  name: "ModalAjustes",
  data() {
    return {
      musicaActiva: false,
      diceImages: [],
      maxDiceImages: 5,
      // Salvaguarda solo para no intentar procesar en el navegador un archivo absurdamente
      // grande: el recorte a cuadrado va aquí, y el backend ya garantiza el peso final (150 KB).
      maxInputBytes: 8 * 1024 * 1024,
      subiendoImagen: false,
      textoInterfaz: {
        titulo: "",
        seccionSonido: "",
        musica: "",
        cerrar: "",
        seccionDados: "",
        dadosDescripcion: "",
        dadosRequiereLogin: "",
        dadosMaxTam: "",
        dadosLimiteAlcanzado: "",
        dadosTipoInvalido: "",
        dadosDemasiadoGrande: "",
        dadosSubidaOk: "",
        dadosErrorSubida: "",
        dadosErrorEliminar: "",
        eliminar: "",
      },
    };
  },
  computed: {
    idUser() {
      return this.$store.state.IDUserHost;
    },
  },
  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === "español") {
        this.textoInterfaz.titulo        = "Ajustes";
        this.textoInterfaz.seccionSonido = "Sonido";
        this.textoInterfaz.musica        = "Música ambiente";
        this.textoInterfaz.cerrar        = "Cerrar";

        this.textoInterfaz.seccionDados         = "Dados";
        this.textoInterfaz.dadosDescripcion     = "Personaliza la cara del 6 en tus dados. Toca un hueco para subir una imagen: se recorta a cuadrado y se comprime automáticamente.";
        this.textoInterfaz.dadosRequiereLogin   = "Inicia sesión para personalizar tus dados.";
        this.textoInterfaz.dadosMaxTam          = "recorte y compresión automáticos";
        this.textoInterfaz.dadosLimiteAlcanzado = "Ya tienes las 5 imágenes permitidas. Elimina una para subir otra.";
        this.textoInterfaz.dadosTipoInvalido    = "El archivo debe ser una imagen.";
        this.textoInterfaz.dadosDemasiadoGrande = "El archivo es demasiado grande (máx. 8 MB).";
        this.textoInterfaz.dadosSubidaOk        = "Imagen guardada";
        this.textoInterfaz.dadosErrorSubida     = "No se pudo subir la imagen";
        this.textoInterfaz.dadosErrorEliminar   = "No se pudo eliminar la imagen";
        this.textoInterfaz.eliminar             = "Eliminar";
      } else if (this.$store.state.lenguaje === "ingles") {
        this.textoInterfaz.titulo        = "Settings";
        this.textoInterfaz.seccionSonido = "Sound";
        this.textoInterfaz.musica        = "Ambient music";
        this.textoInterfaz.cerrar        = "Close";

        this.textoInterfaz.seccionDados         = "Dice";
        this.textoInterfaz.dadosDescripcion     = "Customize the 6 face on your dice. Tap a slot to upload an image: it's cropped to a square and compressed automatically.";
        this.textoInterfaz.dadosRequiereLogin   = "Sign in to customize your dice.";
        this.textoInterfaz.dadosMaxTam          = "auto-cropped and compressed";
        this.textoInterfaz.dadosLimiteAlcanzado = "You already have all 5 allowed images. Remove one to upload another.";
        this.textoInterfaz.dadosTipoInvalido    = "The file must be an image.";
        this.textoInterfaz.dadosDemasiadoGrande = "The file is too large (max 8 MB).";
        this.textoInterfaz.dadosSubidaOk        = "Image saved";
        this.textoInterfaz.dadosErrorSubida     = "Couldn't upload the image";
        this.textoInterfaz.dadosErrorEliminar   = "Couldn't delete the image";
        this.textoInterfaz.eliminar             = "Remove";
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

    async cargarImagenesDados() {
      if (!this.idUser) return;
      try {
        const images = await apiService.getDiceImages(this.idUser);
        this.diceImages = images || [];
        this.$store.commit('setDiceImages', this.diceImages);
      } catch (error) {
        console.error('❌ Error al cargar las imágenes de dados', error);
      }
    },

    async onFileSelected(event) {
      const file = event.target.files[0];
      event.target.value = ''; // permite volver a elegir el mismo archivo después

      if (!file || this.subiendoImagen) return;

      if (this.diceImages.length >= this.maxDiceImages) {
        this.$buefy.toast.open({ message: this.textoInterfaz.dadosLimiteAlcanzado, type: 'is-warning', duration: 3000 });
        return;
      }
      if (!file.type.startsWith('image/')) {
        this.$buefy.toast.open({ message: this.textoInterfaz.dadosTipoInvalido, type: 'is-danger', duration: 3000 });
        return;
      }
      if (file.size > this.maxInputBytes) {
        this.$buefy.toast.open({ message: this.textoInterfaz.dadosDemasiadoGrande, type: 'is-danger', duration: 3000 });
        return;
      }

      try {
        // Recorte a cuadrado en el propio navegador; la compresión final la hace el backend
        const dataUrl = await cropImageToSquareDataUrl(file);
        await this.subirImagen(dataUrl);
      } catch (error) {
        console.error('❌ Error al recortar la imagen', error);
        this.$buefy.toast.open({ message: this.textoInterfaz.dadosErrorSubida, type: 'is-danger', duration: 3000 });
      }
    },

    async subirImagen(dataUrl) {
      this.subiendoImagen = true;
      try {
        const images = await apiService.uploadDiceImage(this.idUser, dataUrl);
        this.diceImages = images;
        this.$store.commit('setDiceImages', this.diceImages);
        this.$buefy.toast.open({ message: this.textoInterfaz.dadosSubidaOk, type: 'is-success', duration: 2500 });
      } catch (error) {
        const msg = error.response?.data?.message || this.textoInterfaz.dadosErrorSubida;
        this.$buefy.toast.open({ message: msg, type: 'is-danger', duration: 3500 });
      } finally {
        this.subiendoImagen = false;
      }
    },

    async eliminarImagen(imageId) {
      try {
        const images = await apiService.deleteDiceImage(this.idUser, imageId);
        this.diceImages = images;
        this.$store.commit('setDiceImages', this.diceImages);
      } catch (error) {
        console.error('❌ Error al eliminar la imagen de dado', error);
        this.$buefy.toast.open({ message: this.textoInterfaz.dadosErrorEliminar, type: 'is-danger', duration: 3000 });
      }
    },
  },
  mounted() {
    this.rellenarTextoSegunIdioma();
    this.musicaActiva = this.$store.state.musicaActiva ?? false;
    this.cargarImagenesDados();
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

/* ─── Dados ──────────────────────────────────────────────── */
.dados-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.dado-slot {
  position: relative;
  aspect-ratio: 1 / 1;
}

.dado-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.dado-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: #f14668;
  color: #fff;
  font-size: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.dado-slot-empty {
  width: 100%;
  height: 100%;
  border: 1px dashed #bbb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.dado-slot-empty:hover {
  border-color: #888;
  color: #666;
}
.dado-slot-empty.is-loading {
  opacity: 0.5;
  pointer-events: none;
}

.dado-input {
  display: none;
}

.dados-hint {
  margin-top: 6px;
}
</style>