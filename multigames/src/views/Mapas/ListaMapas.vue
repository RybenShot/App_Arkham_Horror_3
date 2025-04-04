<template>
  <div class="BGGeneralAH">
    <!-- Notificación de activar o desactivar -->
    <poUp_Notificaciones/>

    <div>
      <!-- Seleccionar Mapa -->
      <div class="columns is-mobile mb-0 pt-3 centrarHero">
        <div class="column is-3 p-0" style="text-align: center;" @click="goBack">
          <i class="fa-2x fas fa-arrow-left has-text-white"></i>
        </div>
        <div class="column" style="margin: 0 auto;">
          <p class="has-text-centered title has-text-white">{{ textoInterfaz.titulo }}</p>
        </div>
        <div class="column is-3 p-0" style="text-align: center;">
          <router-link to="/">
            <i class="fa-2x fas fa-home has-text-white"></i>
          </router-link>
        </div>
      </div>

      <hr class="m-1 mx-4 linea-separacion">

      <!-- Colecciones y botones -->
      <h2 class="title is-4 has-text-white has-text-centered">{{ textoInterfaz.subtitulo }}</h2>
      <p class="subtitle is-6 has-text-white has-text-centered mb-2">
        {{ textoInterfaz.descripcion }}
      </p>
      
      <!-- Botones de expansión -->
      <div class="columns is-mobile pt-3 mx-1 buttons pl-4 pr-2">
        <button
          v-for="btn in expansionButtons"
          :key="btn.key"
          class="button"
          :class="[btn.buttonClass, { 'is-outlined': !$store.state[btn.key] }]"
          @click="handleToggle(btn.key)"
        >
          {{ btn.text }}
        </button>
      </div>
    </div>
    <br>

    <!-- Cartas de mapas filtradas -->
    <div class="PersonajesList">
      <MapCard v-for="mapa in mapsList" :key="mapa.id" :mapa="mapa" />
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler';
import { apiService } from '@/services/api.js';
import poUp_Notificaciones from '@/components/helpers/popUp/notificaciones.vue';
import MapCard from '@/components/mapas/MapCard.vue';

const sound = new Howl({
  src: require('@/assets/sound/SonidoTecla.mp3'),
});

export default {
  name: "lista_De_Mapas",
  data() {
    return {
      // Lista completa de mapas obtenidos desde el backend
      mapsListAll: [],
      // Lista filtrada según las expansiones activadas
      mapsList: [],
      textoInterfaz: {
        titulo: "",
        subtitulo: "",
        descripcion: "",
        botones: {
          base: "",
          mareas: "",
          noche: "",
          secretos: "",
        },
      },
    };
  },
  computed: {
    expansionButtons() {
      return [
        { key: 'stateExpansionBase', text: this.textoInterfaz.botones.base, buttonClass: 'is-success' },
        { key: 'stateExpansionWaves', text: this.textoInterfaz.botones.mareas, buttonClass: 'is-info' },
        { key: 'stateExpansionNigth', text: this.textoInterfaz.botones.noche, buttonClass: 'is-warning' },
        { key: 'stateExpansionSecrets', text: this.textoInterfaz.botones.secretos, buttonClass: 'is-link' },
      ];
    },
  },
  components: {
    poUp_Notificaciones,
    MapCard,
  },
  methods: {
    handleToggle(expansionKey) {
      this.SonidoTecla();
      const message = this.$store.state[expansionKey]
        ? "expansion desactivada"
        : "expansion activada";
      this.$store.commit('toggleExpansion', { key: expansionKey, value: !this.$store.state[expansionKey] });
      this.$store.dispatch('ejecutarFlashPopUp_Action', message);
      this.updateMapsList();
    },
    // Filtra mapsListAll según el estado de las expansiones activadas
    updateMapsList() {
      this.mapsList = this.mapsListAll.filter((map) => {
        if (map.expansion === "AHBase" && this.$store.state.stateExpansionBase) return true;
        if (map.expansion === "AHWaves" && this.$store.state.stateExpansionWaves) return true;
        if (map.expansion === "AHNigth" && this.$store.state.stateExpansionNigth) return true;
        if (map.expansion === "AHSecrets" && this.$store.state.stateExpansionSecrets) return true;
        return false;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    SonidoTecla() {
      sound.play();
    },
    rellenarTextosegunIdioma() {
      if (this.$store.state.lenguaje === 'español') {
        this.textoInterfaz.titulo = "Seleccionar Mapa";
        this.textoInterfaz.subtitulo = "Colecciones";
        this.textoInterfaz.descripcion = "Haz click para añadir o quitar la expansión que quieras y luego elige un mapa para verlo en detalle.";
        this.textoInterfaz.botones.base = "AH Base";
        this.textoInterfaz.botones.mareas = "AH Mareas";
        this.textoInterfaz.botones.noche = "AH Noche";
        this.textoInterfaz.botones.secretos = "AH Secretos";
      } else if (this.$store.state.lenguaje === 'ingles') {
        this.textoInterfaz.titulo = "Select Map";
        this.textoInterfaz.subtitulo = "Collections";
        this.textoInterfaz.descripcion = "Click to add or remove the expansion you want and then choose a map to view it in detail.";
        this.textoInterfaz.botones.base = "AH Base";
        this.textoInterfaz.botones.mareas = "AH Waves";
        this.textoInterfaz.botones.noche = "AH Nigth";
        this.textoInterfaz.botones.secretos = "AH Secrets";
      }
    },
    async getPreviewMapsList() {
      try {
        const maps = await apiService.obtainMapsByExpansion();
        // Guarda la lista completa de mapas
        this.mapsListAll = maps;
        // Inicializa la lista filtrada según el estado actual de las expansiones
        this.updateMapsList();
      } catch (error) {
        console.error("Error al cargar los mapas:", error);
      }
    },
  },
  mounted() {
    this.rellenarTextosegunIdioma();
    this.getPreviewMapsList();
  },
};
</script>

<style scoped>
.centrarHero {
  display: flex;
  justify-content: center;
  align-items: center;
}
.BGGeneralAH {
  background-image: url(@/assets/img/ZZOtros/BGAH.jpg)!important;
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}
.PersonajesList {
  display: grid;
  grid-template-columns: auto auto auto;
}
</style>
