<template>
  <div id="app">
    <!-- Transición suave entre loader y contenido -->
    <transition name="fade" mode="out-in">
      <!-- Loader con key para animación -->
      <LoadingPage
        v-if="$store.state.loadingPageState"
        key="loader"
      />

      <!-- Contenido principal con key único por ruta -->
      <div v-else key="content">
        <div id="VistaMovil">
          <router-view />
        </div>

        <div id="VistaNoValida">
          <section class="container is-fullhd has-background-dark hero is-fullheight">
            <div class="hero-body">
              <div>
                <p class="title has-text-white has-text-centered">{{ titulo }}</p>
                <p class="subtitle has-text-white has-text-centered">{{ descripcion }}</p>
                <img
                  src="@/assets/img/ZZOtros/70242-man-working.gif"
                  alt=""
                  style="height: 400px"
                  id="imgWorking"
                />
                <p class="title has-text-white is-4 has-text-centered mt-4">{{ parrafo }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import LoadingPage from '@/components/helpers/loadingPage.vue';
import { apiService } from '@/services/api.js';

export default {
  name: 'app',
  data() {
    return {
      titulo: "",
      descripcion: "",
      parrafo: ""
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
    // Transición "fake" de 10s entre rutas
    this.$router.beforeEach((to, from, next) => {
      this.$store.state.loadingPageState = true;
      const delay = this.getRandomDelay();
      setTimeout(() => next(), delay);
    });
    this.$router.afterEach(() => {
      this.$store.state.loadingPageState = false;
    });
  },
  async mounted() {
    this.rellenarTextosegunIdioma();
    await this.obtainWellcomeApi();
    // llamamos a la API para obtener las visitas totales
    await this.obtainVisitsApi();
    this.$store.state.loadingPageState = false;
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
}

#imgWorking{
  display: block;
  margin: auto;
}

/* Transición fade más lenta y suave */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
