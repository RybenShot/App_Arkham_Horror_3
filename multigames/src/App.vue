<template>
  <div id="app" class="BGGeneralAH">
    <LoadingPage v-if="$store.state.loadingPageState" />
    <div v-else id="VistaMovil">
      <router-view />
    </div>

    <!-- Overlay de fundido a negro -->
    <div class="black-fade" :class="{ visible: fadeOverlay }"></div>
  </div>
</template>

<script>
import LoadingPage from '@/components/helpers/loadingPage.vue';
import { apiService } from '@/services/api.js';
import { initTour, updateLang } from '@/services/tourService.js';

export default {
  name: 'app',
  data() {
    return {
      titulo: "",
      descripcion: "",
      parrafo: "",
      fadeOverlay: false,
    }
  },
  components: {
    LoadingPage
  },
  methods: {
    rellenarTextosegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.titulo = "Vista en PC no disponible";
        this.descripcion = "La aplicación está en una fase Beta y ha sido diseñada (en principio) para la vista móvil. Al ser solo 1 persona cuesta mucho llevar un proyecto tan amplio adelante, así que he decidido focalizar todo el esfuerzo en perfeccionar primero en vista móvil, después ya me centraré en el responsive.";
        this.parrafo = "Por favor, inicie la aplicación en un móvil o ponga el buscador en modo móvil para poder disfrutarla. Muchas gracias.";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.titulo = "View on PC not available";
        this.descripcion = "The app is in a Beta phase and has been designed (in principle) for mobile viewing. Being only 1 person it costs a lot to take such a wide project forward, so I decided to focus all the effort on perfecting first in mobile view, then I will focus on the responsive.";
        this.parrafo = "Please start the application on a mobile or put the search engine in mobile mode to enjoy it. Thank you very much.";
      }
    },
    async obtainWellcomeApi() {
      this.apiData = await apiService.wellcome(); // Llamada a la API
    },
    async obtainVisitsApi() {
      this.$store.state.contadorVisitasTotales = await apiService.obtainVisits(); // Llamada a la API
    },

    getRandomDelay() {
      const min = 2000;
      const max = 4000;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  created() {
    const FADE = 350

    this.$router.beforeEach((_to, _from, next) => {
      // 1. Fundir a negro
      this.fadeOverlay = true
      setTimeout(() => {
        // 2. Mostrar loading y navegar
        this.$store.state.loadingPageState = true
        next()
        // 3. Salir del negro (loading page ya visible)
        setTimeout(() => { this.fadeOverlay = false }, 50)
      }, FADE)
    })

    this.$router.afterEach(() => {
      const delay = this.getRandomDelay()
      setTimeout(() => {
        // 4. Fundir a negro de nuevo
        this.fadeOverlay = true
        setTimeout(() => {
          // 5. Quitar loading y salir del negro
          this.$store.state.loadingPageState = false
          setTimeout(() => { this.fadeOverlay = false }, 50)
        }, FADE)
      }, delay)
    })
  },
  async mounted() {
    this.rellenarTextosegunIdioma();
    initTour(this.$router, this.$store, this.$store.state.lenguaje);
    await this.obtainWellcomeApi();
    await this.obtainVisitsApi();
    this.$store.state.loadingPageState = false;
  },
  watch: {
    '$store.state.lenguaje'(val) { updateLang(val); }
  }
}
</script>

<style >
/* Fondo negro para evitar flash blanco durante transiciones */
html, body, #app {
  background-color: #000;
}
@import "./views/CssHome.css";
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap');
 * {
   padding: 0; 
   margin: 0;
   box-sizing: border-box;
 }

#app {
  font-family: 'Roboto Flex', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
}

#imgWorking{
  display: block;
  margin: auto;
}

/* Overlay de fundido a negro */
.black-fade {
  position: fixed;
  inset: 0;
  background: #000;
  opacity: 0;
  pointer-events: none;
  z-index: 9999;
  transition: opacity 0.35s ease;
}
.black-fade.visible {
  opacity: 1;
}

.BGGeneralAH {
  background-image: url(@/assets/img/ZZOtros/BGAH.jpg)!important;
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}

/* ── Driver.js — tema Arkham Horror ───────────────────────── */
.ah-tour-popover {
  background: rgba(6, 3, 14, 0.97) !important;
  border: 1px solid rgba(200, 144, 42, 0.55) !important;
  border-radius: 6px !important;
  box-shadow: 0 0 24px rgba(200, 144, 42, 0.2), 0 8px 32px rgba(0,0,0,0.8) !important;
  max-width: 300px !important;
  font-family: Georgia, serif !important;
}
.ah-tour-popover .driver-popover-title {
  color: #e8d5a3 !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  border-bottom: 1px solid rgba(200, 144, 42, 0.25) !important;
  padding-bottom: 6px !important;
  margin-bottom: 6px !important;
}
.ah-tour-popover .driver-popover-description {
  color: rgba(220, 210, 195, 0.88) !important;
  font-size: 0.82rem !important;
  line-height: 1.55 !important;
}
.ah-tour-popover .driver-popover-progress-text {
  color: rgba(200, 144, 42, 0.6) !important;
  font-size: 0.72rem !important;
}
.ah-tour-popover .driver-popover-next-btn,
.ah-tour-popover .driver-popover-done-btn {
  background: rgba(200, 144, 42, 0.18) !important;
  border: 1px solid rgba(200, 144, 42, 0.55) !important;
  color: #e8d5a3 !important;
  border-radius: 4px !important;
  font-size: 0.78rem !important;
}
.ah-tour-popover .driver-popover-prev-btn {
  background: transparent !important;
  border: 1px solid rgba(255,255,255,0.15) !important;
  color: rgba(220, 210, 195, 0.6) !important;
  border-radius: 4px !important;
  font-size: 0.78rem !important;
}
.ah-tour-popover .driver-popover-close-btn {
  color: rgba(200, 144, 42, 0.5) !important;
  font-size: 1rem !important;
}
.ah-tour-popover .driver-popover-arrow-side-left.driver-popover-arrow {
  border-left-color: rgba(200, 144, 42, 0.55) !important;
}
.ah-tour-popover .driver-popover-arrow-side-right.driver-popover-arrow {
  border-right-color: rgba(200, 144, 42, 0.55) !important;
}
.ah-tour-popover .driver-popover-arrow-side-top.driver-popover-arrow {
  border-top-color: rgba(200, 144, 42, 0.55) !important;
}
.ah-tour-popover .driver-popover-arrow-side-bottom.driver-popover-arrow {
  border-bottom-color: rgba(200, 144, 42, 0.55) !important;
}

/* Botón Skip del tour */
.ah-tour-skip-btn {
  background: transparent !important;
  border: 1px solid rgba(200, 144, 42, 0.2) !important;
  color: rgba(220, 210, 195, 0.4) !important;
  border-radius: 4px !important;
  font-size: 0.68rem !important;
  padding: 2px 7px !important;
  cursor: pointer !important;
  font-family: Georgia, serif !important;
  white-space: nowrap !important;
  transition: all 0.2s !important;
}
.ah-tour-skip-btn:hover {
  border-color: rgba(200, 144, 42, 0.5) !important;
  color: rgba(220, 210, 195, 0.7) !important;
  background: rgba(200, 144, 42, 0.06) !important;
}

/* Botón ✕ salir del tour (esquina del popover) */
.ah-tour-exit-btn {
  position: absolute !important;
  top: 8px !important;
  right: 8px !important;
  background: transparent !important;
  border: none !important;
  color: rgba(200, 144, 42, 0.45) !important;
  font-size: 0.85rem !important;
  cursor: pointer !important;
  line-height: 1 !important;
  padding: 2px 4px !important;
  transition: color 0.2s !important;
  z-index: 10 !important;
}
.ah-tour-exit-btn:hover {
  color: rgba(200, 144, 42, 0.85) !important;
}

/* Ocultar el ✕ nativo de driver.js (lo reemplazamos por el nuestro) */
.ah-tour-popover .driver-popover-close-btn {
  display: none !important;
}

/* Pista de toque para pasos sin botón Siguiente */
.ah-tap-hint {
  margin-top: 10px !important;
  padding: 6px 10px !important;
  background: rgba(200, 144, 42, 0.12) !important;
  border: 1px solid rgba(200, 144, 42, 0.3) !important;
  border-radius: 6px !important;
  color: #e8d5a3 !important;
  font-size: 0.78rem !important;
  text-align: center !important;
  font-style: italic !important;
  animation: tap-pulse 1.8s ease-in-out infinite !important;
}
@keyframes tap-pulse {
  0%, 100% { opacity: 0.75; }
  50%       { opacity: 1; }
}

/* Overlay de confirmación al salir del tour */
/* driver.js usa z-index:1000000000 y pointer-events:none en todo el DOM */
.ah-tour-confirm {
  position: fixed !important;
  inset: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: rgba(0, 0, 0, 0.65) !important;
  z-index: 2000000000 !important;
  padding: 20px !important;
  pointer-events: auto !important;
}
.ah-tour-confirm-box {
  background: rgba(6, 3, 14, 0.97) !important;
  border: 1px solid rgba(200, 144, 42, 0.55) !important;
  border-radius: 12px !important;
  padding: 24px 20px !important;
  max-width: 300px !important;
  width: 100% !important;
  box-shadow: 0 0 32px rgba(200, 144, 42, 0.2) !important;
  text-align: center !important;
}
.ah-tour-confirm-title {
  color: #e8d5a3 !important;
  font-family: Georgia, serif !important;
  font-size: 1rem !important;
  font-weight: 700 !important;
  margin-bottom: 10px !important;
}
.ah-tour-confirm-text {
  color: rgba(220, 210, 195, 0.75) !important;
  font-size: 0.8rem !important;
  line-height: 1.5 !important;
  margin-bottom: 18px !important;
}
.ah-tour-confirm-box,
.ah-tour-confirm-btns,
.ah-tour-confirm-yes,
.ah-tour-confirm-no {
  pointer-events: auto !important;
}
.ah-tour-confirm-btns {
  display: flex !important;
  gap: 10px !important;
  justify-content: center !important;
}
.ah-tour-confirm-yes {
  background: rgba(180, 50, 50, 0.25) !important;
  border: 1px solid rgba(200, 80, 80, 0.55) !important;
  color: rgba(255, 180, 180, 0.9) !important;
  border-radius: 6px !important;
  padding: 7px 18px !important;
  font-size: 0.82rem !important;
  cursor: pointer !important;
  font-family: Georgia, serif !important;
}
.ah-tour-confirm-no {
  background: rgba(200, 144, 42, 0.18) !important;
  border: 1px solid rgba(200, 144, 42, 0.55) !important;
  color: #e8d5a3 !important;
  border-radius: 6px !important;
  padding: 7px 18px !important;
  font-size: 0.82rem !important;
  cursor: pointer !important;
  font-family: Georgia, serif !important;
}
</style>
