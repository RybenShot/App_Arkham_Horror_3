<template>
  <div class="modal is-active" v-if="investigator">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card-wrapper p-2">
      <div class="modal-card m-0">
        <header class="modal-card-head BGArquetipos">
          <p class="modal-card-title has-text-white">{{ textoInterfaz.titulo }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <p class="has-text-centered title is-italic mb-0">{{ investigator.name || investigator.nombrePJ }}</p>
          <div class="lineaSeparatoria mx-6">
            <div class="columns is-mobile" style="position: relative; top: 4px">
              <i class="fas fa-dot-circle column p-0 has-text-left"></i>
              <i class="fas fa-dot-circle column p-0 has-text-right"></i>
            </div>
          </div>
          <br />

          <!-- Primer arquetipo -->
          <div v-if="textoInterfaz.tituloArquetipo1" class="containerArquetipos mx-3">
            <div class="columns is-mobile mb-0">
              <p class="column has-text-left title mb-0 pb-0">{{ textoInterfaz.tituloArquetipo1 }}</p>
              <div class="column has-text-right is-2">
                <component :is="iconComponent(textoInterfaz.tituloArquetipo1)" />
              </div>
            </div>
            <p class="subtitle is-6">{{ textoInterfaz.descripcionArquetipo1 }}</p>
          </div>

          <!-- Segundo arquetipo, si existe -->
          <div v-if="textoInterfaz.tituloArquetipo2" class="containerArquetipos mx-3">
            <hr />
            <div class="columns is-mobile mb-0">
              <p class="column has-text-left title mb-0 pb-0">{{ textoInterfaz.tituloArquetipo2 }}</p>
              <div class="column has-text-right is-2">
                <component :is="iconComponent(textoInterfaz.tituloArquetipo2)" />
              </div>
            </div>
            <p class="subtitle is-6">{{ textoInterfaz.descripcionArquetipo2 }}</p>
          </div>
        </section>

        <footer class="modal-card-foot">
          <button class="button is-link is-fullwidth" @click="closeModal">
            {{ textoInterfaz.volver }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ModalArquetipoDetalle',

  computed: {
    ...mapState(['datosPJactual', 'lenguaje']),
    investigator() {
      return this.datosPJactual || null;
    }
  },

  data() {
    return {
      textoInterfaz: {
        titulo: '',
        volver: '',
        tituloArquetipo1: '',
        descripcionArquetipo1: '',
        tituloArquetipo2: '',
        descripcionArquetipo2: ''
      }
    };
  },

  methods: {
    ...mapMutations({ hideModal: 'setModalArquetipoDetalle' }),

    closeModal() {
      this.$store.state.modalArquetipoDetalle = false;
    },

    iconComponent(role) {
      const icons = {
        Defensor: 'FaShieldAlt',
        Experto: 'FaCrown',
        Superviviente: 'FaUserNinja',
        Mistico: 'FaHatWizard',
        Buscador: 'FaUserSecret',
        Expert: 'FaCrown',
        Survivor: 'FaUserNinja',
        Mystic: 'FaHatWizard',
        Seeker: 'FaUserSecret'
      };
      return icons[role] || 'span';
    },

    rellenarTextoSegunIdioma() {
      if (!this.investigator) return;
      // Ajustar títulos según idioma
      if (this.lenguaje === 'español') {
        this.textoInterfaz.titulo = 'Arquetipos principales';
        this.textoInterfaz.volver = 'Volver';
        const roles = this.investigator.translations?.es?.rol ?? [];
        if (roles[0]) {
          this.textoInterfaz.tituloArquetipo1 = roles[0].rol;
          this.textoInterfaz.descripcionArquetipo1 = roles[0].description;
        }
        if (roles[1]) {
          this.textoInterfaz.tituloArquetipo2 = roles[1].rol;
          this.textoInterfaz.descripcionArquetipo2 = roles[1].description;
        }
      } else {
        this.textoInterfaz.titulo = 'Main Archetypes';
        this.textoInterfaz.volver = 'Go back';
        const roles = this.investigator.rol ?? [];
        if (roles[0]) {
          this.textoInterfaz.tituloArquetipo1 = roles[0].rol;
          this.textoInterfaz.descripcionArquetipo1 = roles[0].description;
        }
        if (roles[1]) {
          this.textoInterfaz.tituloArquetipo2 = roles[1].rol;
          this.textoInterfaz.descripcionArquetipo2 = roles[1].description;
        }
      }
    }
  },

  watch: {
    investigator: {
      immediate: true,
      handler() {
        this.rellenarTextoSegunIdioma();
      }
    },
    lenguaje() {
      this.rellenarTextoSegunIdioma();
    }
  }
};
</script>

<style scoped>
.modal-card-wrapper { max-width: 600px; margin: auto; }
.BGArquetipos {
  background-image: url('@/assets/img/ZZOtros/BGModals/IMGModalArquetipos.jpg');
  background-position: center;
  background-size: cover;
}
.lineaSeparatoria {
  max-height: 1px;
  border: solid 1px black;
  padding: 0;
}
</style>
