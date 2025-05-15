<template>
  <div class="BGAHHome container">
    <div id="contenido">
      <!-- Modals de inicio -->
      <div v-if="this.resultadoAnuncio >= 2 ">
        <!-- modal bienvenida -->
        <div v-if="this.$store.state.StoreModalBienvenida"><ModalBienvenida/></div>
        <!-- modal donacion -->
        <div v-if="this.$store.state.StoreModalDonacion"><ModalDonacion/></div>
        
      </div>
      
      <!-- hero -->
      <div class="hero pt-3 pb-2">
        <div class="visit-counter">
          <i class="fas fa-eye pr-2"></i>
          <p class="counter-text">{{ textoInterfaz.textoVisitas }}: <span class="">{{ this.$store.state.contadorVisitasTotales }}</span></p>
          <i class="fas fa-eye pl-2"></i>
        </div>

        <div class=" columns is-mobile mx-6">
          <img class="column px-5" src="@/assets/img/ZZOtros/TituloArkhamHorror.png" alt="Logo de Arkham Horror"/>
        </div>
      </div>

      <!-- menu list -->
      <section class="mt-4">
        <div>
          <ul>
            <div class="has-text-centered">
              <SignedOut>
                <SignInButton class="icon-btn button is-info mx-2"/>
              </SignedOut>
              <SignedIn>
                <div class="has-text-centered ">
                  <p class="subtitle is-6 has-text-white m-0">{{ textoInterfaz.wellcome }}</p>
                    <hr class="p-0 my-0 mx-3">
                    <h1 class="title has-text-white my-1"><UserButton /> {{ user.username }}</h1>
                    <hr class="p-0 my-0 mx-3">
                </div>
                <router-link to="/profile"> 
                  <button class="icon-btn button is-info mx-2"> <i class="fas px-1 fa-user"></i> Mi Perfil <i class="fas px-1 fa-user"></i></button> 
                </router-link>
              </SignedIn>
            </div>
            
            <router-link to="/ListaMapas" @click="SonidoTecla()">
              <button class="buttonsHome ">{{ textoInterfaz.botones.textBotonMapa }}</button>
            </router-link>

            <router-link to="/ListaPersonajes" @click="SonidoTecla()">
              <button class="buttonsHome ">{{ textoInterfaz.botones.textBotonInvestigador }}</button>
            </router-link>

            <router-link to="/credits" @click="SonidoTecla()">
              <button class="buttonsHome" @click="SonidoTecla()">{{ textoInterfaz.botones.textBotonCreditos }}</button>
            </router-link>

            <li class="support-row mb-2">
              <a href="https://www.buymeacoffee.com/appArkhamHorror" target="_blank" @click="SonidoTecla()">
                <button class="buttonsHomeIB coffee-button">
                  <i class="fas fa-mug-hot mr-2"></i>
                  {{ textoInterfaz.botones.textBotonSupport }}
                </button>
              </a>
              <a href="https://instagram.com/apparkhamhorror" target="_blank" @click="SonidoTecla()">
                <button class="buttonsHomeIB instagram-button">
                  <i class="fab fa-instagram mr-2"></i>
                  Instagram
                </button>
              </a>
            </li>
            
          </ul>
        </div>

        <!-- Apartado para la versión de la aplicación -->
        <div class="app-version">Version: {{ textoInterfaz.versionApp }}</div>
        
        <!-- Noticias (Menu desplegable) -->
        <div class="app-version boxShadowYellow" id="ultimasNoticias">
          <div class="noticias-header" @click="toggleNoticias">
            <p>{{ textoInterfaz.ultimaActualizacion }} {{ textoInterfaz.fechaUltimaActualizacion }}</p>

            <i :class="{'fas fa-chevron-down': !noticias.isNoticiasOpen, 'fas fa-chevron-up': noticias.isNoticiasOpen}"></i>
          </div>
          <div v-if="noticias.isNoticiasOpen" class="noticias-list">
            <div class="box">
              <ul>
                <li v-for="(articulo, index) in noticias.articulos" :key="index" class="noticia-item">
                  <p><strong> {{ textoInterfaz.textoActualizacion }} {{ articulo.numeroActualizacion }}</strong></p>

                  <h4 v-if="this.$store.state.lenguaje == 'español'">{{ articulo.titulo }}</h4>
                  <h4 v-if="this.$store.state.lenguaje == 'ingles'">{{ articulo.ENtitulo }}</h4>

                  <p v-if="this.$store.state.lenguaje == 'español'">{{ articulo.descripcion }}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'">{{ articulo.ENdescripcion }}</p>
                  <hr class="my-2">
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>

    </div>

    <!-- botones para cambiar de lenguaje -->
    <footer>
      <div class="columns is-movile has-text-centered">
        <p class="column">
          <button @click="(this.SonidoTecla()),(this.$store.state.lenguaje = 'español'), (this.rellenarTextosegunIdioma())">
            <img class="buttonsBanderas" :class="{'buttonsBanderasDesactivado': this.$store.state.lenguaje == 'ingles'}" src="@/assets/img/ZZOtros/banderas/espana.png" alt="bandera español">
          </button>
          
          <button @click="(this.SonidoTecla()),(this.$store.state.lenguaje = 'ingles') , (this.rellenarTextosegunIdioma())">
            <img class="buttonsBanderas" :class="{'buttonsBanderasDesactivado': this.$store.state.lenguaje == 'español'}" src="@/assets/img/ZZOtros/banderas/reino-unido.png" alt="Ingles">
          </button>
        </p>
      </div>
    </footer>

  </div>
</template>

<script>
import { apiService } from '@/services/api.js';

// importamos clear para la gestion de usuarios
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/vue'

import ModalBienvenida from '@/components/home/modalBienvenida.vue';
import ModalDonacion from '@/components/home/modalDonacion.vue';
import { Howl } from 'howler';                  // dependencia para la reproduccion de sonidos

const sound = new Howl({                        // necesario para enlazar y ejecutar los sonidos
  src: require('@/assets/sound/SonidoTecla.mp3'),
});

export default {
  name: "view_Home",
  components:{
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    ModalBienvenida,
    ModalDonacion,
  },
  setup() {
    const { user } = useUser()
    // Exponemos user
    return { user }
  },
  data() {
    return {
      contadorVisitas: null,
      textoInterfaz: {
        wellcome: "",
        versionApp: "Beta 4.0.3",
        ultimaActualizacion: "",
        fechaUltimaActualizacion: "25/04/2025",
        textoVisitas: "",
        textoActualizacion: "",
        botones: {
          textBotonMapa: "",
          textBotonInvestigador: "",
          textBotonSupport: "",
          textBotonCreditos: "",
        },
      },
      noticias:{
        isNoticiasOpen: false,
        articulos: [
          {id: 4,
            numeroActualizacion: "4.0.3",
            titulo: "Nuevos investigadores!! , añadido pantalla de carga y Backend completado",
            ENtitulo: "New Investigators!! Added Loading Screen and Backend Completed",
            descripcion: "Se ha completado la migracion de datos y ya esta toda la aplicacion reactiva con su respectivo backend, lo que ahora dara paso mas adelante a mas ineracciones con los usuarios, como dar la posibilidad de guardar partida, creacion de personajes o interaccion entre jugadores. Para ello se ha necesitado hacer una pantalla de carga entre pestaña y pestaña y se ha emepzado a añadir personajes nuevos de la comunidad de BGG.",
            ENdescripcion: "Data migration is complete and the entire application is now fully reactive with its backend. This will pave the way for additional user interactions, such as saving games, character creation, and player-to-player interaction. A loading screen between tabs has been implemented, and new community-created investigators from BGG have started to be added.",
            fechaActualizacion: "25/04/2025" 
          },
          {id: 3,
            numeroActualizacion: "4.0.2",
            titulo: "Mejoras en Enemigos, recordatorios y Gestión de Datos",
            ENtitulo: "Improvements in Enemies, Reminders, and Data Management",
            descripcion: "Añadido indicador de expansion de cada enemigo. Añadido recordatorio para bendición y maldición. Añadido gestion de fichas de concentracón. Corregido algunas traducciones. Añadido gestion de datos por backend.",
            ENdescripcion: "Added expansion indicator for each enemy. Added reminder for Blessing and Curse. Added management of concentration tokens. Fixed some translations. Added data management via backend.",
            fechaActualizacion: "28/03/2025" 
          },
          {id: 2,
            numeroActualizacion: "4.0.1",
            titulo: "Nueva interfaz de zona de juego de Investigador, reserva de mitos y apartado de noticias.",
            ENtitulo: "New investigator play area interface, mythos reserve, and news section.",
            descripcion: 'Se ha reajustado la interfaz de la página de personaje para mejorar la visibilidad de los contadores de vida, cordura, dinero, restos y añadir el contador de pistas. Además, se ha añadido la sección "Reserva de Mitos", para gestionas las reserva de mitos durante el juego. Se añade apartado de noticias para informar de las nuevas actualizaciones.',
            ENdescripcion: 'The character page interface has been adjusted to improve the visibility of the health, sanity, money, and clue counters, as well as to add a clue counter. Additionally, the "Mythos Reserve" section has been added to manage the mythos reserve during the game. A news section has also been included to inform about new updates.',
            fechaActualizacion: "14/03/2025" 
          },
          {id: 1,
            numeroActualizacion: "4.0.0",
            titulo: "Correccion de traducciones y nuevo apartado de versiones.",
            ENtitulo: "Correction of translations and new versions section.",
            descripcion: "Se han completado las traducciones al inglés de todos los elementos, incluyendo cartas de estados, interfaz, investigadores y mapas. Se incluye control de version en Home.",
            ENdescripcion: "All elements have been fully translated into English, including status cards, interface, investigators, and maps. Version control has been added to the Home page.",
            fechaActualizacion: "24/04/2025"
          }
          
        ],
      },
      resultadoAnuncio: 0,
    };
  },
  methods: {
    SonidoTecla() {sound.play();},
    rellenarTextosegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.botones.textBotonMapa = "Mapas";
        this.textoInterfaz.botones.textBotonInvestigador = "Investigadores";
        this.textoInterfaz.botones.textBotonSupport = "Apoyanos";
        this.textoInterfaz.botones.textBotonCreditos = "Creditos";
        this.textoInterfaz.wellcome = "Bienvenido";
        this.textoInterfaz.ultimaActualizacion = "Ultima actualización:";
        this.textoInterfaz.textoVisitas = "Visitas totales";
        this.textoInterfaz.textoActualizacion = "Actualización V";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.botones.textBotonMapa = "Maps";
        this.textoInterfaz.botones.textBotonInvestigador = "Investigators";
        this.textoInterfaz.botones.textBotonSupport = "Support";
        this.textoInterfaz.botones.textBotonCreditos = "Credits";
        this.textoInterfaz.wellcome = "Wellcome";
        this.textoInterfaz.ultimaActualizacion = "Last update:";
        this.textoInterfaz.textoVisitas = "Total visits";
        this.textoInterfaz.textoActualizacion = "Update V";
      }
    },
    toggleNoticias() {
      this.noticias.isNoticiasOpen = !this.noticias.isNoticiasOpen;
    },
  },
  async mounted(){
    //Esta función tonta es una manera de que salga o no el anuncion al principio
    this.resultadoAnuncio = Math.floor(Math.random() * (1, 3)) + 1;
    console.log("El resultado de la tirada de los modals ha sido", this.resultadoAnuncio)
    this.rellenarTextosegunIdioma();
  },
  updated(){
    this.rellenarTextosegunIdioma();
  }
};
</script>

<style scoped>
.boxShadowYellow{
  animation: glowing 1s linear infinite;
}

@keyframes glowing{
  0% {box-shadow: 0px 0px 10px #04ff0000;}
  50% {box-shadow: 0px 0px 10px rgb(0, 195, 255);}
  100% {box-shadow: 0px 0px 20px 20px #04ff0000;}
}

@font-face {
  font-family: tituloSeleccion;
  src: url("@/assets/fonts/home/Stranger back in the Night.ttf");
}
/* Helpers */
.buttonsBanderas{
  max-height: 50px;
}
.buttonsBanderasDesactivado{
  opacity: 30%;
}

.app-version {
  margin-left: 20px ;
  margin-right: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: #fff;
  font-size: 1em;
}

/* Noticias */
/* Estilos para las noticias */
.noticias-list {
  max-height: 30vh;          /* Máximo 20% de la altura de la ventana */
  overflow-y: auto;          /* Habilita el scroll si hay muchas noticias */
}

.noticias-header {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.noticias-header i {
  font-size: 20px;           /* Tamaño de la flecha */
}

.noticia-item h4 {
  font-size: 16px;
  font-weight: bold;
}

.noticia-item p {
  font-size: 14px;
}

.box {
  margin-top: 10px;
  padding: 15px;
}

/* Estilos para el contador de visitas */
.visit-counter {
  background: linear-gradient(45deg, #6bff8b, #bbf065);
  padding: 10px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 10px auto;
  width: 90%;
}

.visit-counter i {
  animation: blink 1s infinite;
}
/* Efecto parpadeante para el icono */
@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0.5; }
}



#BGAHHome {
  background-image: url(@/assets/img/ZZOtros/BG-App-AH-Home.jpg);
  min-height: 120vh;
  position: relative;
  background-position: center;
  background-size: cover;
}

#contenido{
  position: relative;
  z-index: 2;
}

button{
  background: none;
  border: 0;
  color: inherit;
  padding: 5px;
}

.buttonsHome{
  display: block;
  width: 50%;
  margin: 10px auto;
  padding: 10px;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 1em;
  border: thick double #272727;
  border-radius: 5px;
  background: rgb(80, 80, 80);
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  margin-bottom: 10px;
}

.support-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 5px;
}

.coffee-button {
  background: #FFDD00;
  color: #333;
}

.instagram-button {
  background: linear-gradient(45deg, #F58529, #DD2A7B, #8134AF);
  color: #fff;
}

/* Ajustes comunes */
.buttonsHomeIB {
  width: auto;
  padding: 10px 20px;
}

.icon-btn {
  align-items: center;
  width: 50%;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
  border: none;
  cursor: pointer;
  margin: 10px auto;
}

</style>