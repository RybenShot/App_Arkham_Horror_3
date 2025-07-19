<template>
  <div>
    <!-- BARRA SUPERIOR: VOLVER / CERRAR SESIÓN -->
    <div class="columns is-mobile mb-0 pt-3 centrarHero">
      <div class="column is-3 p-0" style="text-align: center;" @click="$router.push('/')">
        <i class="fa-2x fas fa-arrow-left has-text-white"></i>
      </div>
      <div class="column" style="margin: 0 auto;">
        <p class="has-text-centered title has-text-white">{{ textoInterfaz.title }}</p>
      </div>
      <div class="column is-3 p-0" style="text-align: center;" @click="signOut()">
        <i class="fa-2x fas fa-sign-out-alt has-text-white"></i>
      </div>
    </div>

    <!-- LOGO AH -->
    <div class="hero is-small mb-3">
      <div class="columns is-mobile">
        <img class="column logoAH" src="@/assets/img/ZZOtros/TituloArkhamHorror.png" alt="Logo de Arkham Horror"/>
      </div>
    </div>

    <div v-if="isSignedIn" class="mx-3">
      <!-- FOTO DE PERFIL Y NOMBRE -->
      <div class="columns is-mobile">
        <!-- foto y nombre -->
        <div class="column is-half image-container">
          <div class="user-image-wrapper">
            <img class="is-rounded image bordeImagen" :src="this.$store.state.datosPJactual.imgInv || '/img/1-inv/57-Nameless.jpg'">
            <div class="nombrePosicion">
              <p class="title mb-1 is-4 has-text-weight-bold has-text-white">{{ user.fullName || user.firstName }}</p>
              <p class="has-background-dark subtitle is-6 has-text-white posicion">@{{ user.username || 'Investigador' }}</p>
            </div>
          </div>
        </div>
        
        <!-- trofeos -->
        <div class="is-half column pt-4 has-text-centered trophies-section">
          <p class="title has-text-white mb-2">{{ textoInterfaz.isAuth.titleTrofeos }}</p>
          <hr class="m-2 trophy-divider">
          <div class="trophy-content">
            <p class="subtitle has-text-white is-6 mb-1">{{ textoInterfaz.isAuth.subtitleTrofeos }}</p>
            <p class="subtitle has-text-white is-6">{{ textoInterfaz.isAuth.descriptionTrofeos }}</p>
          </div>
        </div>
      </div>

      <!-- ID de usuario -->
      <div class="has-text-centered has-text-white user-id-section is-vcentered">
        <p class="id-title">{{ textoInterfaz.isAuth.titleIDUsuario }}</p>
        <b-field class="id-field">
          <b-input type="search" icon="magnify" v-model="user.id" readonly class="user-id-input"></b-input>
          <p class="control">
            <b-button type="is-primary" label="Copiar" @click="copyCode()" class="copy-btn" />
          </p>
        </b-field>
      </div>
      
      <section class="mt-5 maps-section">
          <b-tabs type="is-boxed">
              <b-tab-item>
                  <template #header>
                      <b-icon icon="information-outline"></b-icon>
                      <span> Mapas <b-tag rounded> {{this.getMapsLength()}} </b-tag> </span>
                  </template>
                  <section>
                    <p class="subtitle has-text-white maps-title my-2">{{ textoInterfaz.isAuth.titleMapsOnLine }}</p>
                    <div v-if="userMaps.length === 0" class="has-text-white no-maps-message">
                      {{ textoInterfaz.isAuth.subtitleMapsOnline }}
                    </div>

                    <div class="PersonajesList">
                      <MapCard v-for="map in userMaps" :key="map.idInPlay" :map="map" />
                    </div>
                  </section>
              </b-tab-item>
              <b-tab-item>
                  <template #header>
                      <b-icon icon="source-pull"></b-icon>
                      <span> Investigadores <b-tag rounded> {{this.getInvestigadoresCount()}} </b-tag> </span>
                  </template>

                  <section>
                    <p class="subtitle has-text-white maps-title my-2">Lista investigadores</p>

                    <div class="PersonajesList ">
                      <InvestigatorCard v-for="investigator in getInvestigadores()" :key="investigator.id" :investigator="investigator" />
                    </div>
                  </section>
              </b-tab-item>
          </b-tabs>

        <!-- seccion de mapas OnLine -->
        

        <!-- seccion de investigadores OnLine -->
      </section>        
    </div>

    <div v-else class="not-authenticated has-text-centered mt-5 px-3">
      <p class="title has-text-white">{{ textoInterfaz.noAuth.title }}</p>
      <p class="subtitle has-text-white mb-4">{{ textoInterfaz.noAuth.description1 }}</p>
      <p class="subtitle has-text-white mb-4">{{ textoInterfaz.noAuth.description2 }}</p>
      <SignInButton class="button is-info"/>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuth, useUser, SignInButton } from '@clerk/vue'
import MapCard from '@/components/mapas/MapCard.vue'
import InvestigatorCard from '@/components/personajes/invCard.vue'
import { apiService } from '@/services/api.js'
import { useStore } from 'vuex' // importamos esto para poder usar el store en el setup

import { BIcon, BTabs, BTabItem, BTag } from "buefy";

export default {
  name: "ProfileView",
  components: { 
    MapCard, InvestigatorCard, SignInButton,

    BIcon, BTabs, BTabItem, BTag
  },
  setup() {
    const { isSignedIn, signOut } = useAuth()
    const { user } = useUser()
    const store = useStore()
    const userMaps = ref([])
    const userInv = ref([])

    onMounted(async () => {
      if (isSignedIn.value) {
        try {
          const idUser = user.value.id;
          store.commit('setUserHost', idUser);

          userMaps.value = await apiService.getMapsInPlayByIDUser(idUser)
          console.log("✅ ProfileView.vue - Mapas del usuario:", userMaps.value);

          userInv.value = await apiService.getListInvOnLine(idUser);
          console.log("✅ ProfileView.vue - Investigadores del usuario:", userInv.value[0].investigadoresOnLine);
        } catch (e) {
          console.error('Error al cargar los mapas del usuario:', e)
        } 
      }
    })

    return { user, isSignedIn, signOut, userMaps, userInv }
  },
  data() {
    return {
      textoInterfaz: {
        title: "",
        noAuth: {
          title: "",
          description1: "",
          description2: "",
        },
        isAuth: {
          titleTrofeos: "",
          subtitleTrofeos: "",
          descriptionTrofeos: "",
          titleIDUsuario: "",
          titleMapsOnLine: "",
          subtitleMapsOnline: "",
        },
      },
      count: 1,
      onLineMaps: true,
    }
  },
  
  methods: {
    // Obtener lista de investigadores
    getInvestigadores() {
      if (this.userInv && this.userInv.length > 0 && this.userInv[0].investigadoresOnLine) {
        return this.userInv[0].investigadoresOnLine;
      }
      return [];
    },
    
    // Obtener cantidad de investigadores
    getInvestigadoresCount() {
      return this.getInvestigadores().length;
    },

    formatDate(dateString) {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleString()
    },
    rellenarTextosegunIdioma() {
      if (this.$store.state.lenguaje == 'español') {
        this.textoInterfaz.title = "Perfil";

        this.textoInterfaz.noAuth.title = "¿Qué haces aquí?";
        this.textoInterfaz.noAuth.description1 = "No estás logueado y no existen botones para llegar hasta aquí, así que la única forma de que has acabado aquí ha sido buscando alguna falla, ¿eh? Pues que sepas que hay muchas fallas en esta app, pero esta no es una de ellas. Solo soy una persona la que está creando todo esto y hay cosas que se me escapan; te agradecería mucho que, si llegas a encontrar algún error, me lo hagas saber en el canal oficial de Instagram. ¡Muchas gracias!";
        this.textoInterfaz.noAuth.description2 = "Si quieres ver esta ventana como debería, haz login o regístrate y sigue echando un vistazo a todo lo que hay disponible para ti.";

        this.textoInterfaz.isAuth.titleTrofeos = "Tus trofeos";
        this.textoInterfaz.isAuth.subtitleTrofeos = "Sin ningún trofeo.";
        this.textoInterfaz.isAuth.descriptionTrofeos = "Juega para conseguir trofeos.";

        this.textoInterfaz.isAuth.titleIDUsuario = "Tu ID de usuario.";

        this.textoInterfaz.isAuth.titleMapsOnLine = "Tus mapas Online.";
        this.textoInterfaz.isAuth.subtitleMapsOnline = "No has creado ningún mapa todavía.";

      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.title = "Profile";

        this.textoInterfaz.noAuth.title = "What are you doing here?";
        this.textoInterfaz.noAuth.description1 = "You're not logged in and there are no buttons to get here, so the only way you ended up here must have been hunting for a bug, right? Well, know that there are plenty of bugs in this app, but this isn't one of them. I'm just one person building all of this and things slip through—I'd really appreciate it if you let me know about any bugs on the official Instagram channel. Thank you!";
        this.textoInterfaz.noAuth.description2 = "If you want to see this window as it should be, please log in or sign up and keep exploring everything available to you!";

        this.textoInterfaz.isAuth.titleTrofeos = "Your Trophies";
        this.textoInterfaz.isAuth.subtitleTrofeos = "You have no trophies.";
        this.textoInterfaz.isAuth.descriptionTrofeos = "Play to earn trophies.";

        this.textoInterfaz.isAuth.titleIDUsuario = "Your User ID";

        this.textoInterfaz.isAuth.titleMapsOnLine = "Your Online Maps";
        this.textoInterfaz.isAuth.subtitleMapsOnline = "You haven't created any maps yet.";
      }
    },
    copyCode() {
      navigator.clipboard.writeText(this.user.id)
        .then(() => {
          console.log('ID copiado al portapapeles');
        })
        .catch(err => {
          console.error('Error al copiar el ID: ', err);
        });
    },
    getMapsLength() {
      return this.userMaps.length
    },
  },
  mounted(){
    this.rellenarTextosegunIdioma();
    setTimeout(() => {
        this.count++;
    }, 3 * 1000);
  },
}
</script>

<style scoped>
.tab-content {
  padding: 0px;
}
.logoAH {
  max-width: 200px;
  margin: 0 auto;
}

.id-field{
  display: flex;
  justify-content: center;
}

/* Imagen de usuario mejorada */
.image-container {
  position: relative;
}

.user-image-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.bordeImagen {
  border: thick double #F2C94C;
  box-shadow: 0 0 15px rgba(242, 201, 76, 0.3);
  transition: all 0.3s ease;
}

.bordeImagen:hover {
  box-shadow: 0 0 25px rgba(242, 201, 76, 0.5);
}

.nombrePosicion {
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  text-align: center;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 8px;
}

.posicion {
  border: 1px solid rgba(242, 201, 76, 0.6);
  border-radius: 6px;
  padding: 2px 8px;
  margin: 4px auto 0;
  display: inline-block;
}

/* Sección de trofeos mejorada */
.trophies-section {
  padding-left: 1rem;
}

.trophy-divider {
  background-color: rgba(242, 201, 76, 0.5);
  height: 1px;
  border: none;
}

.trophy-content {
  padding: 0.5rem;
  border: 1px dashed rgba(242, 201, 76, 0.3);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
}

/* ID de usuario mejorado */
.user-id-section {
  padding: 5px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(242, 201, 76, 0.2);
}

.id-title {
  margin-bottom: 1rem;
  font-weight: bold;
  color: #F2C94C;
}

.field.has-addons {
  justify-content: center;
}

.user-id-input input {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(242, 201, 76, 0.4);
  color: #e0e0e0;
}

.user-id-input input:focus {
  border-color: #F2C94C;
  box-shadow: 0 0 0 0.125em rgba(242, 201, 76, 0.25);
}

.copy-btn {
  background: #F2C94C !important;
  color: #000 !important;
  border-color: #F2C94C !important;
  font-weight: bold;
}

.copy-btn:hover {
  background: #e6b843 !important;
  transform: translateY(-1px);
}

/* Mapas mejorados */
.maps-section {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(242, 201, 76, 0.1);
}

.maps-title {
  color: #F2C94C;
  font-weight: bold;
  text-align: center;
}

.no-maps-message {
  text-align: center;
  padding: 2rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  border: 1px dashed rgba(242, 201, 76, 0.3);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
}

.PersonajesList {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 3px;
  row-gap: 5px;
  justify-items: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>