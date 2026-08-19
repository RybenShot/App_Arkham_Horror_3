<template>
  <div class="BGAHHome container">

    <!-- ── Tour FAB (aparece tras 3 s) ───────────────────────── -->
    <div :class="['tour-fab', { visible: showTourButton }]">
      <button class="tour-fab-btn" @click="showTourModal = true" :title="textoInterfaz.lenguaje === 'español' ? 'Tour interactivo' : 'Interactive tour'">
        <div class="fab-deity">
          <div class="ah-deity-eye"><div class="ah-deity-pupil"></div></div>
          <div class="ah-deity-tentacles">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </button>
    </div>

    <!-- ── Modal Tour (gracioso) ─────────────────────────────── -->
    <div v-if="showTourModal" class="tour-modal-overlay" @click.self="showTourModal = false">
      <div class="tour-modal-card">
        <button class="tour-modal-close" @click="showTourModal = false">×</button>
        <div class="tour-modal-icon">
          <div class="modal-deity">
            <div class="ah-deity-eye"><div class="ah-deity-pupil"></div></div>
            <div class="ah-deity-tentacles">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>
        <template v-if="$store.state.lenguaje === 'español'">
          <h2 class="tour-modal-title">¡Alto ahí, investigador!</h2>
          <p class="tour-modal-text">
            Nuevo en Arkham, ¿verdad?<br>
            <em>Los Dioses Exteriores no vienen con manual de instrucciones...</em><br><br>
            ¿Te apetece un tour interactivo antes de que la locura te absorba?
          </p>
          <div class="tour-modal-buttons">
            <button class="tour-btn-yes" @click="launchTour">¡Sí, ilumíname! 🔦</button>
            <button class="tour-btn-no"  @click="showTourModal = false; showTourButton = false">No, lo tengo controlado 🎩</button>
          </div>
        </template>
        <template v-else>
          <h2 class="tour-modal-title">Hold it right there, investigator!</h2>
          <p class="tour-modal-text">
            New to Arkham, huh?<br>
            <em>The Ancient Ones don't come with a user manual...</em><br><br>
            Want an interactive tour before madness takes you?
          </p>
          <div class="tour-modal-buttons">
            <button class="tour-btn-yes" @click="launchTour">Yes, show me the way! 🔦</button>
            <button class="tour-btn-no"  @click="showTourModal = false; showTourButton = false">I know what I'm doing 🎩</button>
          </div>
        </template>
      </div>
    </div>

    <div id="contenido">
      <!-- Modals de inicio -->
      <div v-if="this.resultadoAnuncio >= 2">
        <div v-if="this.$store.state.StoreModalBienvenida"><ModalBienvenida/></div>
        <div v-if="this.$store.state.StoreModalDonacion"><ModalDonacion/></div>
        <div v-if="this.$store.state.StoreModalAjustes"><ModalAjustes/></div>
      </div>

      <!-- ── HERO: visitas + logo ─────────────────────── -->
      <div class="home-hero">
        <div class="visit-bar" data-tour="visit-counter">
          <span @click="infoTotalVisits()">
            <i class="fas fa-eye"></i> {{ $store.state.contadorVisitasTotales }}
          </span>
          <span @click="infoUsersActive()">
            <i class="fas fa-circle pulse-red"></i> {{ contadorUsuariosActivos }}
          </span>
        </div>
        <img class="home-logo" src="@/assets/img/ZZOtros/TituloArkhamHorror.png" alt="Arkham Horror"/>
      </div>

      <!-- ── ZONA USUARIO ────────────────────────────── -->
      <div class="user-zone" data-tour="login-section">
        <SignedOut>
          <SignInButton class="sign-in-pill"/>
        </SignedOut>
        <SignedIn>
          <div class="user-row">
            <UserButton />
            <span class="user-greeting">{{ textoInterfaz.wellcome }},&nbsp;<strong>{{ user.username }}</strong></span>
            <router-link to="/profile">
              <button class="profile-arrow"><i class="fas fa-chevron-right"></i></button>
            </router-link>
          </div>
        </SignedIn>
      </div>

      <!-- ── ACCIONES PRINCIPALES ────────────────────── -->
      <div class="main-actions">
        <router-link to="/ListaMapas" class="action-card" @click="SonidoTecla()" data-tour="btn-mapas">
          <i class="fas fa-map action-icon"></i>
          <span class="action-label">{{ textoInterfaz.botones.textBotonMapa }}</span>
        </router-link>
        <router-link to="/ListaPersonajes" class="action-card" @click="SonidoTecla()" data-tour="btn-investigadores">
          <i class="fas fa-user-secret action-icon"></i>
          <span class="action-label">{{ textoInterfaz.botones.textBotonInvestigador }}</span>
        </router-link>
      </div>

      <!-- ── ACCIONES SECUNDARIAS ────────────────────── -->
      <div class="secondary-actions">
        <router-link to="/tutoriales" class="sec-btn" @click="SonidoTecla()" data-tour="btn-tutoriales">
          <i class="fas fa-book-open"></i>
          <span>{{ textoInterfaz.botones.textBotonTutoriales }}</span>
        </router-link>
        <router-link to="/credits" class="sec-btn" @click="SonidoTecla()">
          <i class="fas fa-award"></i>
          <span>{{ textoInterfaz.botones.textBotonCreditos }}</span>
        </router-link>
        <button class="sec-btn" @click="abrirAjustes()">
          <i class="fas fa-cog"></i>
          <span>{{ $store.state.lenguaje == 'español' ? 'Ajustes' : 'Settings' }}</span>
        </button>
      </div>

      <!-- ── SOPORTE ──────────────────────────────────── -->
      <div class="support-strip" data-tour="support-row">
        <a href="https://www.buymeacoffee.com/appArkhamHorror" target="_blank" @click="SonidoTecla()">
          <button class="support-btn coffee-btn">
            <i class="fas fa-mug-hot"></i> {{ textoInterfaz.botones.textBotonSupport }}
          </button>
        </a>
        <a href="https://instagram.com/apparkhamhorror" target="_blank" @click="SonidoTecla()">
          <button class="support-btn insta-btn">
            <i class="fab fa-instagram"></i> Instagram
          </button>
        </a>
      </div>

      <!-- ── VERSIÓN ──────────────────────────────────── -->
      <div class="app-version">Version: {{ textoInterfaz.versionApp }}</div>

      <!-- ── NOTICIAS ─────────────────────────────────── -->
      <div class="app-version boxShadowYellow" id="ultimasNoticias" data-tour="noticias-section">
        <div class="noticias-header" @click="toggleNoticias">
          <p>{{ textoInterfaz.ultimaActualizacion }} {{ textoInterfaz.fechaUltimaActualizacion }}</p>
          <i :class="noticias.isNoticiasOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </div>
        <div v-if="noticias.isNoticiasOpen" class="noticias-list">
          <div class="box">
            <ul>
              <li v-for="(articulo, index) in noticias.articulos" :key="index" class="noticia-item">
                <p><strong>{{ textoInterfaz.textoActualizacion }} {{ articulo.numberUpdate }}</strong></p>
                <h4 v-if="$store.state.lenguaje == 'español'">{{ articulo.translations.es.title }}</h4>
                <h4 v-if="$store.state.lenguaje == 'ingles'">{{ articulo.translations.en.title }}</h4>
                <p v-if="$store.state.lenguaje == 'español'">{{ articulo.translations.es.description }}</p>
                <p v-if="$store.state.lenguaje == 'ingles'">{{ articulo.translations.en.description }}</p>
                <hr class="my-2">
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <!-- ── FOOTER: idioma ──────────────────────────────── -->
    <footer>
      <div class="lang-row">
        <button @click="SonidoTecla(); $store.state.lenguaje = 'español'; rellenarTextosegunIdioma()">
          <img class="buttonsBanderas" :class="{'buttonsBanderasDesactivado': $store.state.lenguaje == 'ingles'}"
               src="@/assets/img/ZZOtros/banderas/espana.png" alt="Español">
        </button>
        <button @click="SonidoTecla(); $store.state.lenguaje = 'ingles'; rellenarTextosegunIdioma()">
          <img class="buttonsBanderas" :class="{'buttonsBanderasDesactivado': $store.state.lenguaje == 'español'}"
               src="@/assets/img/ZZOtros/banderas/reino-unido.png" alt="English">
        </button>
      </div>
    </footer>

  </div>
</template>

<script>
import { audioService_soundTrack } from '@/services/GestionAudio/audioService_soundTrack.js';
import { audioService_effects } from '@/services/GestionAudio/audioService_effects.js';

import { apiService } from '@/services/api.js';

// importamos clear para la gestion de usuarios
import { SignedIn, SignedOut, SignInButton, UserButton, useUser, useAuth } from '@clerk/vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex' // importamos esto para poder usar el store en el setup

import ModalBienvenida from '@/components/home/modalBienvenida.vue';
import ModalDonacion from '@/components/home/modalDonacion.vue';
import ModalAjustes from '@/components/home/modalAjustes.vue';

import { initTour, startTourFromHome } from '@/services/tourService.js';


export default {
  name: "view_Home",
  components:{
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    ModalBienvenida,
    ModalDonacion,
    ModalAjustes
  },
  setup() {
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const store = useStore()
    // importamos store
    // Exponemos user

    onMounted(async () => {
      if (isSignedIn.value) {
        try {
          const idUser = user.value.id;
          const nameUser = user.value.username;
          store.commit('setUserHost', idUser);
          store.commit('setUserName', nameUser);
        } catch (e) {
          console.error('Error al cargar los datos del usuario:', e)
        } 
      }
    })
    return { user }
  },
  data() {
    return {
      audioIniciado: false,
      contadorVisitas: null,
      contadorUsuariosActivos: null,
      showTourButton: false,
      showTourModal: false,
      textoInterfaz: {
        wellcome: "",
        versionApp: "Beta 4.0.7",
        ultimaActualizacion: "",
        fechaUltimaActualizacion: "24/09/2025",
        textoVisitas: "",
        textoActualizacion: "",
        textoUserActivos: "",
        botones: {
          textBotonMapa: "",
          textBotonInvestigador: "",
          textBotonSupport: "",
          textBotonCreditos: "",
          textBotonTutoriales: "",
        },
      },
      noticias:{
        isNoticiasOpen: false,
        articulos: [
          {id: 8,
            numberUpdate: "4.0.7",
            dateUpdate: "24/09/2025",
            translations: {
              es: {
                title: "Sistema de encuentros multijugador!",
                description: "Nueva funcionalidad de localización en mapa que permite encuentros entre investigadores en tiempo real. El sistema de combate jugador vs jugador ya está disponible, con mecánicas de dados y recompensas balanceadas. En desarrollo: intercambio de objetos, rituales colaborativos y eventos de ubicación específica."
              },
              en: {
                title: "Multiplayer encounter system",
                description: "New map location tracking enables real-time encounters between investigators. Player vs player combat system is now live, featuring balanced dice mechanics and rewards. In development: item trading, collaborative rituals, and location-specific events."
              }
            }
          },
          {id: 7,
            numberUpdate: "4.0.6",
            dateUpdate: "13/08/2025",
            translations: {
              es: {
                title: "Gestión completa de cartas y tienda online centralizada",
                description: "Ahora puedes gestionar todas tus cartas: objetos, aliados, hechizos y especiales. Nueva tienda online centralizada para partidas con mapa online y sistema de guardado de investigador. Próximamente: gestión de ubicaciones en mapa y eventos por pares (usuario - usuario)."
              },
              en: {
                title: "Complete card management and centralized online store",
                description: "You can now manage all your cards: items, allies, spells, and special cards. New centralized online store for games with online maps and investigator save system. Coming soon: location management and peer-to-peer event creation."
              }
            }
          },
          {id: 6,
            numberUpdate: "4.0.5",
            dateUpdate: "13/06/2025",
            translations: {
              es: {
                title: "La comunidad opina!",
                description: "Ahora puedes participar en las votaciones de mapas y descubrir qué opinan otros jugadores. Qué mapas son los favoritos de la comunidad, investigadores más recomendados para cada mapa, comentarios con estrategias útiles, nivel de dificultad y tiempo medio estimado. Toda esta información se basa en la experiencia real de otros jugadores. ¡Tu voto también cuenta!"
              },
              en: {
                title: "The community speaks!",
                description: "You can now vote on maps and see what other players think! Discover the community's favorite maps, the most recommended investigators for each one, strategy tips, difficulty level, and average play time — all based on real player feedback. Your vote matters too!"
              }
            }
          },
          {id: 5,
            numberUpdate: "4.0.4",
            dateUpdate: "18/05/2025",
            translations: {
              es: {
                title: "Disponible modo online",
                description: "Con la reciente actualización de gestión de usuario, podrás registrarte y crear un mapa online para gestionar la partida junto con tus compañeros investigadores. Para ello, solo tienes que registrarte y crear un mapa, el cual podrás compartir con tus amigos para que ellos puedan unirse a tu partida."
              },
              en: {
                title: "Online mode available",
                description: "With the recent user-management update, you’ll be able to register and create an online map to manage the game alongside your fellow investigators. To do so, simply sign up and create a map, which you can then share with your friends so they can join your game."
              }
            }
          },
          {id: 4,
            numberUpdate: "4.0.3",
            dateUpdate: "25/04/2025",
            translations: {
              es: {
                title: "¡Nuevos investigadores! Añadida pantalla de carga y backend completado",
                description: "Se ha completado la migración de datos y ya está toda la aplicación reactiva con su respectivo backend, lo que ahora dará paso más adelante a más interacciones con los usuarios, como la posibilidad de guardar partida, crear personajes o interactuar con otros jugadores. Para ello, se ha añadido una pantalla de carga entre pestañas y se ha empezado a incorporar nuevos investigadores de la comunidad de BGG."
              },
              en: {
                title: "New Investigators! Added Loading Screen and Backend Completed",
                description: "Data migration is complete and the entire application is now fully reactive with its backend. This will pave the way for additional user interactions, such as saving games, character creation, and player-to-player interaction. A loading screen between tabs has been implemented, and new community-created investigators from BGG have started to be added."
              }
            }
          },
          {id: 3,
            numberUpdate: "4.0.2",
            dateUpdate: "28/03/2025",
            translations: {
              es: {
                title: "Mejoras en enemigos, recordatorios y gestión de datos",
                description: "Añadido indicador de expansión de cada enemigo. Añadido recordatorio para bendición y maldición. Añadida gestión de fichas de concentración. Corregidas algunas traducciones. Añadida gestión de datos por backend."
              },
              en: {
                title: "Improvements in Enemies, Reminders, and Data Management",
                description: "Added expansion indicator for each enemy. Added reminder for Blessing and Curse. Added management of concentration tokens. Fixed some translations. Added data management via backend."
              }
            }
          },
          {id: 2,
            numberUpdate: "4.0.1",
            dateUpdate: "14/03/2025",
            translations: {
              es: {
                title: "Nueva interfaz de zona de juego de investigador, reserva de mitos y apartado de noticias",
                description: "Se ha reajustado la interfaz de la página de personaje para mejorar la visibilidad de los contadores de vida, cordura, dinero y restos, y añadir el contador de pistas. Además, se ha añadido la sección 'Reserva de Mitos' para gestionar la reserva de mitos durante el juego. También se incluye un apartado de noticias para informar de las nuevas actualizaciones."
              },
              en: {
                title: "New investigator play area interface, mythos reserve, and news section",
                description: "The character page interface has been adjusted to improve the visibility of the health, sanity, money, and clue counters, as well as to add a clue counter. Additionally, the 'Mythos Reserve' section has been added to manage the mythos reserve during the game. A news section has also been included to inform about new updates."
              }
            }
          },
          {id: 1,
            numberUpdate: "4.0.0",
            dateUpdate: "24/04/2025",
            translations: {
              es: {
                title: "Corrección de traducciones y nuevo apartado de versiones",
                description: "Se han completado las traducciones al inglés de todos los elementos, incluyendo cartas de estados, interfaz, investigadores y mapas. Se incluye control de versión en Home.",

              },
              en:{
                title: "Correction of translations and new versions section",
                description: "All elements have been fully translated into English, including status cards, interface, investigators, and maps. Version control has been added to the Home page."
              }
            }
          }
        ],
      },
      resultadoAnuncio: 0,
    };
  },
  methods: {
    launchTour() {
      this.showTourModal  = false;
      this.showTourButton = false;
      initTour(this.$router, this.$store, this.$store.state.lenguaje);
      setTimeout(() => startTourFromHome(), 200);
    },

    abrirAjustes(){
      this.SonidoTecla()
      this.$store.state.StoreModalAjustes = true
    },

    iniciarAudio() {
      if (!this.audioIniciado) {
        audioService_soundTrack.play();
        this.audioIniciado = true;
      }
    },

    SonidoTecla() {audioService_effects.playTecla()},
    
    rellenarTextosegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.botones.textBotonMapa = "Mapas";
        this.textoInterfaz.botones.textBotonInvestigador = "Investigadores";
        this.textoInterfaz.botones.textBotonSupport = "Apoyanos";
        this.textoInterfaz.botones.textBotonCreditos = "Creditos";
        this.textoInterfaz.botones.textBotonTutoriales = "Tutoriales";
        this.textoInterfaz.wellcome = "Bienvenido";
        this.textoInterfaz.ultimaActualizacion = "Ultima actualización:";
        this.textoInterfaz.textoVisitas = "Visitas totales";
        this.textoInterfaz.textoActualizacion = "Actualización V";
        this.textoInterfaz.textoUserActivos = "Investigadores conectados";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.botones.textBotonMapa = "Maps";
        this.textoInterfaz.botones.textBotonInvestigador = "Investigators";
        this.textoInterfaz.botones.textBotonSupport = "Support";
        this.textoInterfaz.botones.textBotonCreditos = "Credits";
        this.textoInterfaz.botones.textBotonTutoriales = "Tutorials";
        this.textoInterfaz.wellcome = "Wellcome";
        this.textoInterfaz.ultimaActualizacion = "Last update:";
        this.textoInterfaz.textoVisitas = "Total visits";
        this.textoInterfaz.textoActualizacion = "Update V";
        this.textoInterfaz.textoUserActivos = "Investigators online";
      }
    },

    infoTotalVisits(){
      this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' ? 'Visitas totales a la aplicación' : 'Total visits to the application',
          type: 'is-info',
          duration: 3000
        });
    },

    infoUsersActive(){
      this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' ? 'Usuarios activos en los ultimos 15 min' : 'Active users in the last 15 min',
          type: 'is-info',
          duration: 3000
        });
    },

    toggleNoticias() {
      this.noticias.isNoticiasOpen = !this.noticias.isNoticiasOpen;
    },

    // llamada a back para ver los usuarios activos de los ultimos 15 min
    async activeUsers(){
      try {
        const responseApi = await apiService.getActiveUsers();
        this.contadorUsuariosActivos = responseApi.totalUsersOnline;
      } catch (error) {
        console.error("Error fetching active users:", error);
        this.contadorUsuariosActivos = "N/A"; // Valor por defecto en caso de error
      }
    }
  },
  async mounted(){
    //Esta función tonta es una manera de que salga o no el anuncion al principio
    this.resultadoAnuncio = Math.floor(Math.random() * (1, 3)) + 1;
    // console.log("El resultado de la tirada de los modals ha sido", this.resultadoAnuncio)
    this.activeUsers();
    this.rellenarTextosegunIdioma();
    this.iniciarAudio();

    // Mostrar el FAB del tour después de 3 s
    setTimeout(() => { this.showTourButton = true; }, 3000);
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

/* CSS para contador de usuarios online actuales */
.pulse-red {
  color: #ff4757;
  animation: live-pulse 1s ease-in-out infinite;
  font-size: 14px;
  text-shadow: 0 0 5px rgba(255, 71, 87, 0.5);
}

@keyframes live-pulse {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
    text-shadow: 0 0 5px rgba(255, 71, 87, 0.5);
  }
  50% { 
    opacity: 0.7;
    transform: scale(1.3);
    text-shadow: 0 0 10px rgba(255, 71, 87, 0.8);
  }
}

/* ── Banderas idioma ──────────────────────────────────── */
.buttonsBanderas           { max-height: 48px; }
.buttonsBanderasDesactivado{ opacity: 30%; }

/* ── Versión ──────────────────────────────────────────── */
.app-version {
  margin: 0 16px 10px;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: rgba(255,255,255,0.85);
  font-size: 0.85em;
}

/* ── Noticias ─────────────────────────────────────────── */
.noticias-list   { max-height: 30vh; overflow-y: auto; }
.noticias-header { cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
.noticias-header i { font-size: 18px; }
.noticia-item h4 { font-size: 15px; font-weight: bold; }
.noticia-item p  { font-size: 13px; }
.box             { margin-top: 10px; padding: 14px; }

/* ── Base ─────────────────────────────────────────────── */
#contenido { position: relative; z-index: 2; }
button     { background: none; border: 0; color: inherit; padding: 0; }

/* ── Hero ─────────────────────────────────────────────── */
.home-hero {
  padding: 14px 16px 4px;
  text-align: center;
}
.visit-bar {
  display: flex;
  justify-content: center;
  gap: 24px;
  background: linear-gradient(90deg, rgba(107,255,139,0.65), rgba(187,240,101,0.65));
  padding: 6px 18px;
  border-radius: 20px;
  margin: 0 auto 14px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #1a2a1a;
  cursor: pointer;
  width: fit-content;
}
.home-logo {
  width: 68%;
  max-width: 260px;
  display: block;
  margin: 0 auto 18px;
  filter: drop-shadow(0 4px 16px rgba(0,0,0,0.7));
}

/* ── Zona usuario ─────────────────────────────────────── */
.user-zone {
  margin: 0 16px 18px;
  background: rgba(0, 0, 0, 0.52);
  border: 1px solid rgba(200, 144, 42, 0.3);
  border-radius: 12px;
  padding: 11px 16px;
  text-align: center;
}
.sign-in-pill {
  background: rgba(200, 144, 42, 0.14) !important;
  border: 1px solid rgba(200, 144, 42, 0.5) !important;
  color: #e8d5a3 !important;
  border-radius: 20px !important;
  padding: 8px 24px !important;
  font-size: 0.88rem !important;
  cursor: pointer !important;
  font-family: Georgia, serif !important;
}
.user-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.user-greeting {
  flex: 1;
  color: rgba(220, 210, 195, 0.82);
  font-size: 0.84rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-greeting strong { color: #e8d5a3; }
.profile-arrow {
  color: rgba(200, 144, 42, 0.6) !important;
  font-size: 0.9rem !important;
  flex-shrink: 0;
}

/* ── Acciones principales ─────────────────────────────── */
.main-actions {
  display: flex;
  gap: 12px;
  padding: 0 16px;
  margin-bottom: 12px;
}
.action-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(6, 3, 14, 0.78);
  border: 1px solid rgba(200, 144, 42, 0.5);
  border-radius: 16px;
  padding: 24px 10px;
  text-decoration: none;
  min-height: 120px;
  transition: background 0.15s, transform 0.15s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.4);
}
.action-card:active {
  transform: scale(0.95);
  background: rgba(200, 144, 42, 0.12);
}
.action-icon {
  font-size: 2.1rem;
  color: rgba(200, 144, 42, 0.9);
  display: block;
}
.action-label {
  color: #e8d5a3;
  font-family: Georgia, serif;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
}

/* ── Acciones secundarias ─────────────────────────────── */
.secondary-actions {
  display: flex;
  gap: 10px;
  padding: 0 16px;
  margin-bottom: 16px;
}
.sec-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.48);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  padding: 13px 6px;
  color: rgba(220, 210, 195, 0.72);
  font-size: 0.68rem;
  cursor: pointer;
  transition: background 0.15s;
  text-decoration: none;
}
.sec-btn i {
  font-size: 1.1rem;
  color: rgba(200, 144, 42, 0.78);
}
.sec-btn:active { background: rgba(200, 144, 42, 0.1); }

/* ── Soporte ──────────────────────────────────────────── */
.support-strip {
  display: flex;
  gap: 10px;
  padding: 0 16px;
  margin-bottom: 14px;
  justify-content: center;
}
.support-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 20px !important;
  border-radius: 8px !important;
  font-size: 0.82rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  border: none !important;
}
.coffee-btn { background: #FFDD00 !important; color: #333 !important; }
.insta-btn  { background: linear-gradient(45deg, #F58529, #DD2A7B, #8134AF) !important; color: #fff !important; }

/* ── Footer idioma ────────────────────────────────────── */
.lang-row { display: flex; justify-content: center; gap: 20px; padding: 12px; }

/* ── Tour FAB ────────────────────────────────────────────── */
.tour-fab {
  position: fixed;
  right: max(14px, calc(50% - 201px));
  bottom: 90px;
  z-index: 500;
  transform: translateX(72px);
  opacity: 0;
  transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
  pointer-events: none;
}
.tour-fab.visible {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
}
.tour-fab-btn {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(4, 1, 8, 0.96);
  border: 1.5px solid rgba(180, 65, 10, 0.85);
  box-shadow: 0 0 20px rgba(170, 50, 10, 0.35), 0 4px 14px rgba(0,0,0,0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  animation: fab-beacon 3s ease-in-out infinite;
}
@keyframes fab-beacon {
  0%, 100% {
    box-shadow: 0 0 20px rgba(170, 50, 10, 0.35), 0 4px 14px rgba(0,0,0,0.8);
  }
  50% {
    box-shadow: 0 0 38px rgba(200, 80, 15, 0.65), 0 0 12px rgba(255, 30, 0, 0.25), 0 4px 18px rgba(0,0,0,0.9);
  }
}
.tour-fab-btn:active { transform: scale(0.92); }

/* contenedor del ojo dentro del FAB */
.fab-deity {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  pointer-events: none;
  transform: scale(0.82);   /* ajustar al círculo de 58px */
  transform-origin: center center;
}

/* contenedor del ojo dentro del modal de bienvenida */
.modal-deity {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  transform: scale(1.5);
  transform-origin: center top;
  margin-bottom: 8px;
}

/* ── Tour Modal ──────────────────────────────────────────── */
.tour-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  z-index: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.tour-modal-card {
  background: rgba(6, 3, 14, 0.97);
  border: 1px solid rgba(200, 144, 42, 0.6);
  border-radius: 10px;
  padding: 28px 22px 22px;
  max-width: 340px;
  width: 100%;
  position: relative;
  text-align: center;
  box-shadow: 0 0 40px rgba(200,144,42,0.15), 0 20px 60px rgba(0,0,0,0.85);
  animation: modal-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes modal-in {
  from { transform: scale(0.85) translateY(20px); opacity: 0; }
  to   { transform: scale(1) translateY(0);       opacity: 1; }
}
.tour-modal-close {
  position: absolute;
  top: 10px;
  right: 14px;
  background: transparent;
  border: none;
  color: rgba(200, 144, 42, 0.5);
  font-size: 1.3rem;
  cursor: pointer;
  line-height: 1;
  padding: 2px 6px;
}
.tour-modal-close:hover { color: rgba(200,144,42,0.9); }
.tour-modal-icon {
  display: flex;
  justify-content: center;
  /* espacio extra para el ojo escalado ×1.5 (tentáculos incluidos ~70px altos) */
  height: 74px;
  margin-bottom: 16px;
  filter: drop-shadow(0 0 12px rgba(190, 60, 10, 0.65));
}
.tour-modal-title {
  font-family: Georgia, serif;
  color: #e8d5a3;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(200,144,42,0.25);
  padding-bottom: 10px;
}
.tour-modal-text {
  font-family: Georgia, serif;
  color: rgba(220, 210, 195, 0.85);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 20px;
}
.tour-modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tour-btn-yes {
  background: rgba(200, 144, 42, 0.18) !important;
  border: 1px solid rgba(200, 144, 42, 0.6) !important;
  color: #e8d5a3 !important;
  border-radius: 6px !important;
  font-family: Georgia, serif !important;
  font-size: 0.9rem !important;
  padding: 10px 16px !important;
  cursor: pointer !important;
  width: 100% !important;
  transition: all 0.2s !important;
}
.tour-btn-yes:hover {
  background: rgba(200,144,42,0.32) !important;
  box-shadow: 0 0 14px rgba(200,144,42,0.3) !important;
}
.tour-btn-no {
  background: transparent !important;
  border: 1px solid rgba(255,255,255,0.15) !important;
  color: rgba(220,210,195,0.5) !important;
  border-radius: 6px !important;
  font-family: Georgia, serif !important;
  font-size: 0.82rem !important;
  padding: 8px 16px !important;
  cursor: pointer !important;
  width: 100% !important;
  transition: all 0.2s !important;
}
.tour-btn-no:hover {
  color: rgba(220,210,195,0.8) !important;
  border-color: rgba(255,255,255,0.35) !important;
}

</style>