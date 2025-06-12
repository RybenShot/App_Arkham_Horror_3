<template>
  <div class="BGGeneralAH">
    <!-- Notificación de activar o desactivar -->
    <popUp_Notificaciones/>
    <div v-if="this.$store.state.modalJoinMapInPlay"><modalJoinMapInPlay/></div>
    

    <div>
      <!-- Seleccionar Mapa -->
      <div class="columns is-mobile mb-0 pt-3 centrarHero">
        <div class="column is-3 p-0" style="text-align: center;" @click="goBack"><i class="fa-2x fas fa-arrow-left has-text-white"></i></div>
        <div class="column" style="margin: 0 auto;"><p class="has-text-centered title has-text-white">{{ textoInterfaz.titulo }}</p></div>
        <div class="column is-3 p-0" style="text-align: center;"><router-link to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link></div>
      </div>

      <hr class="m-1 mx-4 linea-separacion">

      <!-- Botones de expansión -->
      <div class="columns is-mobile pt-3 mx-1 buttons pl-4 pr-2">
        <!-- Colecciones y botones -->
        <p class="subtitle is-6 has-text-white has-text-centered mb-2">{{ textoInterfaz.descripcionLocal }}</p>
        
        <!-- Botones de expansión -->
        <div class="columns is-mobile pt-3 mx-1 buttons pl-4 pr-2 has-text-centered">
          <button v-for="btn in expansionButtons" :key="btn.key"
            class="button p-3 column" :class="[btn.buttonClass, { 'is-outlined': !$store.state[btn.key] }]"
            @click="handleToggle(btn.key)" >
            {{ btn.text }}
          </button>
          <button class=" py-0 join-btn column button" @click="this.$store.state.modalJoinMapInPlay = true">
            <img class="gifIMG" src="@/assets/img/GIFs/wired-outline-726-wireless-connection-loop-wave.gif" alt="">
            On-Line 
            <img class="gifIMG" src="@/assets/img/GIFs/wired-outline-726-wireless-connection-loop-wave.gif" alt="">
          </button>
        </div>
      </div>

      <hr class="m-1 mx-4 linea-separacion">

    </div>

    <!-- Cartas de mapas filtradas -->
    <div class="PersonajesList">
      <MapCard v-for="map in mapsList" :key="map.id" :map="map" />
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler';
import { apiService } from '@/services/api.js';
import popUp_Notificaciones from '@/components/helpers/popUp/notificaciones.vue';
import MapCard from '@/components/mapas/MapCard.vue';
import modalJoinMapInPlay from '@/components/mapas/modalJoinMapInPlay.vue';

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
        tituloLocal: "",
        descripcionLocal: "",
        tituloOL: "",
        descripcionOL: "",
        botones: {
          base: "",
          mareas: "",
          noche: "",
          secretos: "",
        },
      }
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
    popUp_Notificaciones,
    MapCard,
    modalJoinMapInPlay
  },
  methods: {
    handleToggle(expansionKey) {
      this.SonidoTecla();
      const activada = !this.$store.state[expansionKey];
      this.$store.commit('toggleExpansion', { key: expansionKey, value: activada });

      if (activada) {
        this.$buefy.toast.open({ message: 'Expansión activada', type: 'is-success', duration: 2000 });
      } else{
        this.$buefy.toast.open({ message: 'Expansión desactivada', type: 'is-danger', duration: 2000 });
      }

      this.updateMapsList();
    },

    // Filtra mapsListAll según el estado de las expansiones activadas
    updateMapsList() {
      const all = this.normalizeMapsList();
      this.mapsList = all.filter((map) => {
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
        this.textoInterfaz.tituloLocal = "Local";
        this.textoInterfaz.descripcionLocal = "Selecciona un mapa para ver su detalle. Si quieres jugar con amigos, puedes unirte a ellos en un mismo mapa en la opcion ON-LINE.";
        this.textoInterfaz.tituloOL = "On-Line";
        this.textoInterfaz.descripcionOL = "Crea una partida o unete a una para jugar con tus amigos en el mismo mapa";

        this.textoInterfaz.botones.base = "AH Base";
        this.textoInterfaz.botones.mareas = "AH Mareas";
        this.textoInterfaz.botones.noche = "AH Noche";
        this.textoInterfaz.botones.secretos = "AH Secretos";
      } else if (this.$store.state.lenguaje === 'ingles') {
        this.textoInterfaz.titulo = "Select Map";
        this.textoInterfaz.tituloLocal = "Collections";
        this.textoInterfaz.descripcionLocal = "Click to add or remove the expansion you want and then choose a map to view it in detail.";
        this.textoInterfaz.tituloOL = "On-Line";
        this.textoInterfaz.descripcionOL = "____";

        this.textoInterfaz.botones.base = "AH Base";
        this.textoInterfaz.botones.mareas = "AH Waves";
        this.textoInterfaz.botones.noche = "AH Nigth";
        this.textoInterfaz.botones.secretos = "AH Secrets";
      }
    },
    async getPreviewMapsList() {
      try {
        const maps = await apiService.obtainMaps();
        // Guarda la lista completa de mapas
        this.mapsListAll = maps;
        // Inicializa la lista filtrada según el estado actual de las expansiones
        this.updateMapsList();
      } catch (error) {
        console.error("Error al cargar los mapas:", error);
      }
    },
    // funcion para asegurar que tenemos un array de mapas, incluso si es con solo 1 objeto
    normalizeMapsList() {
      return Array.isArray(this.mapsListAll)
        ? this.mapsListAll
        : [this.mapsListAll].filter(m => m); // descarta null/undefined
    }
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
  background-image: url(@/assets/img/ZZOtros/newBGAH.png)!important;
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}
.PersonajesList {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 10px;
  row-gap: 10px;
  justify-items: center;
  margin-left: 10px;
  margin-right: 10px;
}

.join-btn {
  display: block;
  width: 80%;
  max-width: 260px;
  margin: 0.5rem auto;
  padding: 0.75rem 1rem;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  /* Animación de pulso */
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%   { transform: scale(1);     }
  50%  { transform: scale(1.05);  }
  100% { transform: scale(1);     }
}
.gifIMG{
  width: 30px;
}
</style>
