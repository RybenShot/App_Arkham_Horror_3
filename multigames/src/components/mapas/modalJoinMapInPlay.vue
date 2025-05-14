<template>
    <div class="modal is-active">
          <div class="modal-background" @click="this.$store.state.modalJoinMapInPlay = false"></div>
          <div class="mr-6">
            <div class="modal-card">
              <header class="columns is-mobile modal-card-head BGBendicion m-0">
                <p class="modal-card-title has-text-weight-bold" >{{ textoInterfaz.titulo }}</p>
                <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.modalJoinMapInPlay = false"></i>
              </header>
  
              <section class="modal-card-body hero is-large py-2">
                
                <div>
                  <h1 class="title">Buscar partida</h1>
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
                  <h1 class="title">Crear partida</h1>
                  <p class="subtitle">Para crear una partida debes entar a un mapa y seleccionar la opcion "Crear Mapa On-Line"</p>
                </div>

                <!-- Resultado de busqueda -->
                <div v-if="mapFound">
                    <MapCard :map="mapFound" />
                </div>
              </section>
  
              <footer class="">
                <div class="field has-addons columns is-mobile is-gapless">
  
                  <p class="control column ">
                    <button @click="(this.$store.state.modalJoinMapInPlay = false)" class="button is-link is-fullwidth">
                      <p>{{ textoInterfaz.botones.añadir }}</p>
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

  export default {
    name:"EstadoBendicion",
    data(){
      return{
        textoInterfaz:{
          titulo: "",
          descripcion: "",
          botones: {
            añadir: ""
          },
        },
        mapFound: null,
        // variable para capturar la id del buscador
        searchId: "d6ef5fdd-672d-4c6e-84eb-f244031670ad"
        }
    },
  components: {
    MapCard
  },
    methods:{
      rellenarTextoSegunIdioma(){
        if(this.$store.state.lenguaje == 'español'){
          this.textoInterfaz.titulo = "Partida On-Line";
          this.textoInterfaz.descripcion = "Introduce el codigo del mapa para buscar la partida.";
          this.textoInterfaz.botones.añadir = "Cerrar";
        }else if(this.$store.state.lenguaje == 'ingles'){
          this.textoInterfaz.titulo = "___";
          this.textoInterfaz.descripcion = "___";
          this.textoInterfaz.botones.añadir = "__";
        }
      },
      async searchMapInPlay(){
      try {
        const idMap = this.searchId
        const findMap = await apiService.getMapInPlayByID(idMap);
        this.mapFound = findMap;
        console.log(this.mapFound)
      } catch (error) {
        console.error("❌ Error al encontrar el mapa:", error);
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