<template>
    <div class="modal is-active">
      <div class="modal-background" @click="this.$store.state.modalJoinMapInPlay = false"></div>
      <div class="mr-6">
        <div class="modal-card">
          <header class="columns is-mobile modal-card-head BGBendicion m-0">
            <p class="modal-card-title has-text-weight-bold" >{{ textoInterfaz.titulo }}</p>
            <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.modalJoinMapInPlay = false"></i>
          </header>

          <SignedOut>
            <section class="modal-card-body hero is-large py-2">
              <p class="subtitle has-text-centered">{{ textoInterfaz.textoError }}</p>
              <SignInButton class="button" />
            </section>                
          </SignedOut>

          <SignedIn>
            <section class="modal-card-body hero is-large py-2">
              <div>
                <h1 class="title">{{ textoInterfaz.titleSearchInterface }}</h1>
                <p class="subtitle">{{ textoInterfaz.descripcion }}</p>
                <section>
                    <b-field >
                        <b-input placeholder="ej: 1234-1234-1234"
                            type="search"
                            icon="magnify"
                            v-model="searchId">
                        </b-input>
                        <p class="control">
                            <b-button type="is-primary" label="Buscar" @click="searchMapInPlay()" />
                        </p>
                    </b-field>
                </section>
              </div>

              <div v-if="!mapFound">
                <hr>
                <h1 class="title">{{ textoInterfaz.postParty.title }}</h1>
                <p class="subtitle">{{ textoInterfaz.postParty.description }}</p>
              </div>

              <!-- Resultado de busqueda -->
              <div v-if="mapFound">
                  <MapCard :map="mapFound" />
              </div>
            </section>
          </SignedIn>

          <footer class="">
            <div class="field has-addons columns is-mobile is-gapless">

              <p class="control column ">
                <button @click="(this.$store.state.modalJoinMapInPlay = false)" class="button is-link is-fullwidth">
                  <p>{{ textoInterfaz.botones.cerrar }}</p>
                </button>
              </p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  </template>
  
<script>
  import MapCard from '@/components/mapas/MapCard.vue';
  import { apiService } from '@/services/api.js';

  // importamos clear para la gestion de usuarios
  import { SignedIn, SignedOut, SignInButton } from '@clerk/vue'

  export default {
    name:"EstadoBendicion",
    data(){
      return{
        textoInterfaz:{
          titleSearchInterface: "",
          titulo: "",
          descripcion: "",
          textoError:"",
          postParty: {
            title: "",
            description: "",
          },
          botones: {
            cerrar: ""
          },
        },
        mapFound: null,
        // variable para capturar la id del buscador
        searchId: null
        }
    },
    components: {
      MapCard,
      SignedIn,
      SignedOut,
      SignInButton
    },
    methods:{
      rellenarTextoSegunIdioma() {
        if (this.$store.state.lenguaje == 'español') {
          this.textoInterfaz.titleSearchInterface = "Buscar Partida";
          this.textoInterfaz.titulo = "Partida On-Line";
          this.textoInterfaz.descripcion = "Introduce el código del mapa para buscar la partida.";
          this.textoInterfaz.textoError = "Para unirte a una partida On-Line debes estar Logueado.";

          this.textoInterfaz.postParty.title = "Crear Partida";
          this.textoInterfaz.postParty.description = "Para crear una partida debes entrar a un mapa y seleccionar la opción \"Crear Mapa On-Line\"";

          this.textoInterfaz.botones.cerrar = "Cerrar";
        } else if (this.$store.state.lenguaje == 'ingles') {
          this.textoInterfaz.titleSearchInterface = "Search Game";
          this.textoInterfaz.titulo = "Online Game";
          this.textoInterfaz.descripcion = "Enter the map code to search for the game.";
          this.textoInterfaz.textoError = "To join an online game you must be logged in.";

          this.textoInterfaz.postParty.title = "Create Game";
          this.textoInterfaz.postParty.description = "To create a game you must enter a map and select the \"Create Online Map\" option.";

          this.textoInterfaz.botones.cerrar = "Close";
        }
      },

      async searchMapInPlay(){
        try {
          const idMap = this.searchId
          const findMap = await apiService.getMapInPlayByID(idMap);
          this.mapFound = findMap;
          console.log(this.mapFound)
        } catch (error) {
          console.error("❌ searchMapInPlay(.vue) - Error al encontrar el mapa:", error);
        }
      },
    },
    mounted(){
      this.rellenarTextoSegunIdioma();
    }
  }
  </script>
<style>
  .BGBendicion{
    background-image: url(@/assets/img/Estados/Bendicion.jpg);
    background-position: center;
    background-size: cover;
  }
</style>