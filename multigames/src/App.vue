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

/* ── El Archivista — personaje del tour ───────────────────── */
.ah-deity-header {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  padding-bottom: 10px !important;
  margin-bottom: 10px !important;
  border-bottom: 1px solid rgba(200, 144, 42, 0.2) !important;
}

/* Avatar: ojo + tentáculos */
.ah-deity-avatar {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 4px !important;
  flex-shrink: 0 !important;
}
.ah-deity-eye {
  width: 46px !important;
  height: 28px !important;
  /* borde rojo-ámbar, más amenazante */
  border: 2px solid rgba(190, 80, 15, 0.95) !important;
  border-radius: 50% !important;
  background: rgba(4, 1, 8, 0.98) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
  /* venas rojas internas + halo exterior */
  box-shadow:
    0 0 16px rgba(180, 60, 10, 0.55),
    0 0  5px rgba(255, 30,  0, 0.35),
    inset 0  0 14px rgba(110, 5, 5, 0.75),
    inset 5px 2px 6px rgba(70, 0, 0, 0.6),
    inset -5px 3px 5px rgba(70, 0, 0, 0.5),
    inset 0 -4px 5px rgba(40, 0, 0, 0.7) !important;
  animation: ah-eye-blink 7s ease-in-out infinite !important;
}
/* pupila en hendidura vertical — reptiliana / cósmica */
.ah-deity-pupil {
  width: 5px !important;
  height: 19px !important;
  background: linear-gradient(
    to bottom,
    #000 0%,
    rgba(130, 10, 10, 1) 35%,
    rgba(190, 70, 10, 0.9) 65%,
    #000 100%
  ) !important;
  border-radius: 50% !important;
  box-shadow: 0 0 8px rgba(200, 60, 10, 1), 0 0 4px rgba(255, 30, 0, 0.8) !important;
  animation: ah-pupil-move 10s ease-in-out infinite !important;
}
.ah-deity-tentacles {
  display: flex !important;
  gap: 3px !important;
  align-items: flex-end !important;
}
/* tentáculos más largos y rojizos */
.ah-deity-tentacles span {
  display: block !important;
  width: 5px !important;
  background: linear-gradient(to bottom, rgba(150, 55, 15, 0.85), rgba(70, 5, 5, 0.95)) !important;
  border-radius: 0 0 3px 3px !important;
}
.ah-deity-tentacles span:nth-child(1) { height: 8px  !important; animation: ah-tentacle 1.8s ease-in-out 0.0s infinite !important; }
.ah-deity-tentacles span:nth-child(2) { height: 13px !important; animation: ah-tentacle 1.8s ease-in-out 0.3s infinite !important; }
.ah-deity-tentacles span:nth-child(3) { height: 17px !important; animation: ah-tentacle 1.8s ease-in-out 0.6s infinite !important; }
.ah-deity-tentacles span:nth-child(4) { height: 13px !important; animation: ah-tentacle 1.8s ease-in-out 0.9s infinite !important; }
.ah-deity-tentacles span:nth-child(5) { height: 8px  !important; animation: ah-tentacle 1.8s ease-in-out 1.2s infinite !important; }

/* Nombre y subtítulo */
.ah-deity-id {
  flex: 1 !important;
  min-width: 0 !important;
}
.ah-deity-name {
  display: block !important;
  color: #e8d5a3 !important;
  font-family: Georgia, serif !important;
  font-size: 0.8rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.07em !important;
}
.ah-deity-sub {
  display: block !important;
  color: rgba(200, 144, 42, 0.65) !important;
  font-size: 0.62rem !important;
  font-style: italic !important;
  letter-spacing: 0.04em !important;
  margin-top: 2px !important;
}

/* Botón ✕ salir (dentro del deity header, empujado a la derecha) */
.ah-tour-exit-btn {
  margin-left: auto !important;
  flex-shrink: 0 !important;
  background: transparent !important;
  border: none !important;
  color: rgba(200, 144, 42, 0.4) !important;
  font-size: 0.9rem !important;
  cursor: pointer !important;
  padding: 2px 4px !important;
  line-height: 1 !important;
  transition: color 0.2s !important;
  pointer-events: auto !important;
}
.ah-tour-exit-btn:hover {
  color: rgba(200, 144, 42, 0.85) !important;
}

/* Ocultar el ✕ nativo de driver.js */
.ah-tour-popover .driver-popover-close-btn {
  display: none !important;
}

/* ── Animaciones del ojo ─────────────────────────────────────
   Ciclo de 7s: parpadeo agresivo a ~50% + secuencia glitch a ~80-87%
   ─────────────────────────────────────────────────────────── */
@keyframes ah-eye-blink {
  /* estado normal */
  0%, 42%   { transform: scaleY(1);    filter: none; }
  /* cierre rápido y brusco */
  46%       { transform: scaleY(0.25); filter: none; }
  48%, 52%  { transform: scaleY(0.04); filter: none; }
  /* reapertura repentina */
  56%       { transform: scaleY(1);    filter: none; }
  /* período normal largo */
  78%       { transform: scaleY(1);    filter: none; }
  /* ── GLITCH ───────────────────────────────────────────── */
  /* aberración cromática: sombra roja izquierda + cian derecha */
  79%  {
    transform: scaleY(1) translateX(-3px);
    filter: drop-shadow(-4px 0 0 rgba(255, 0, 55, 0.95))
            drop-shadow( 4px 0 0 rgba(0, 220, 255, 0.75));
  }
  80%  {
    transform: scaleY(1) translateX(4px);
    filter: drop-shadow( 4px 0 0 rgba(255, 0, 55, 0.95))
            drop-shadow(-4px 0 0 rgba(0, 220, 255, 0.75));
  }
  /* destello blanco + medio parpadeo corrupto */
  81%  { transform: scaleY(0.22) translateX(-2px); filter: brightness(4) contrast(5) saturate(0); }
  82%  { transform: scaleY(1) translateX(2px);     filter: drop-shadow(-2px 0 0 rgba(255, 0, 55, 0.65)); }
  83%  { transform: scaleY(1);                     filter: none; }
  /* eco residual */
  84%  { transform: scaleY(1) translateX(3px);     filter: drop-shadow(3px 0 0 rgba(255, 0, 55, 0.4)); }
  85%, 100% { transform: scaleY(1);               filter: none; }
}

/* movimiento de pupila más errático y nervioso */
@keyframes ah-pupil-move {
  0%   { transform: translate( 0,    0);   }
  8%   { transform: translate( 5px, -3px); }
  17%  { transform: translate(-7px,  1px); }
  26%  { transform: translate( 3px,  5px); }
  35%  { transform: translate(-4px, -5px); }
  43%  { transform: translate( 6px,  2px); }
  50%  { transform: translate( 0,    0);   }  /* centrada al parpadear */
  58%  { transform: translate(-6px, -2px); }
  67%  { transform: translate( 4px,  4px); }
  76%  { transform: translate(-3px, -1px); }
  85%  { transform: translate( 7px,  0);   }  /* mira al frente en el glitch */
  93%  { transform: translate(-5px,  3px); }
  100% { transform: translate( 0,    0);   }
}

/* tentáculos — squirm asimétrico */
@keyframes ah-tentacle {
  0%, 100% { transform: scaleY(1)   scaleX(1);   opacity: 0.75; }
  33%      { transform: scaleY(0.4) scaleX(1.4); opacity: 0.95; }
  66%      { transform: scaleY(1.3) scaleX(0.7); opacity: 0.65; }
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

/* Texto mínimo en modo hidePopover (popover reducido a cabecera + mensaje) */
.ah-popover-mini-msg {
  color: rgba(210, 165, 75, 0.9) !important;
  font-size: 0.75rem !important;
  text-align: center !important;
  font-style: italic !important;
  margin: 4px 0 2px !important;
  animation: tap-pulse 1.8s ease-in-out infinite !important;
}

/* Overlay de confirmación al salir del tour */
/* driver.js usa z-index:1000000000 y pointer-events:none en todo el DOM */
/* Máscara que bloquea clicks en el elemento resaltado por driver.js.
   z-index < 1000000000 (popover de driver) para que los botones del popover sigan funcionando,
   pero > el elemento resaltado que driver eleva por encima de su propio overlay. */
.ah-block-mask {
  position: fixed;
  inset: 0;
  z-index: 999999999;
  pointer-events: auto;
  background: transparent;
  cursor: default;
}

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
