<template>
  <section>
    <transition name="fade">
      <div v-if="notificacionMaxVida" class="notificacion has-text-light has-background-danger">
        <span>{{ mensajeVidaCorduraMax }}</span>
      </div>
    </transition>

    <div class="columns is-mobile">
      <!-- foto y nombre -->
      <div class="column is-half image">
        <img class="is-rounded image image bordeImagen " :src="this.$store.state.datosMapa.BGMap" >
        <div class="mapName">
          <p class="title p-1 is-4 has-text-weight-bold has-text-white">{{ textoInterfaz.title }}</p>
        </div>
      </div>
      
      <!-- datos variables -->
      <div class="column is-half has-text-white pt-4">
        <p class="subtitle has-text-white has-text-centered mb-1"> {{ textoInterfaz.textoVariables }}</p>

        <!-- perdicion - pistas -->
        <div class="columns is-mobile has-text-centered pt-2 ">
          <div @click="selectProperty('dooms')" class="column selector-item pr-0">
            <i class="fa-4x fas fa-star-of-life has-text-danger"></i>
            <p class="contadorperdicionPista title has-text-white">{{ this.$store.state.datosMapa.variables.dooms }}</p>
          </div>

          <div @click="selectProperty('clues')" class="column selector-item pl-0">
            <i class="fa-4x fas fa-search has-text-info"></i>
            <p class="contadorperdicionPista title has-text-white">{{ this.$store.state.datosMapa.variables.clues }}</p>
          </div>
        </div>

        <!-- sumar restar -->
        <div class="columns is-mobile my-2 ">
          <button @click="sumarRestarPropiedad('-')" class="column mx-5 button is-small p-0 is-danger pb-1"><i class="fas fa-window-minimize"></i></button>
          <button @click="sumarRestarPropiedad('+')" class="column mx-5 button is-small p-0 is-primary "><i class="fas fa-plus"></i></button>
        </div>

      </div>
    </div>

    <!-- Navegacion -->
    <div class="columns is-mobile has-text-centered has-text-white">
      <!-- Encuentros -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreEncountresPage = true)" class="column pt-0">
        <i v-if="this.$store.state.StoreEncountresPage == true" class="has-text-success fa-2x fas fa-house-damage"></i>
        <i v-if="this.$store.state.StoreEncountresPage == false" class="desactivado fa-2x fas fa-house-damage"></i>
      </div> 

      <!-- Tienda -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreShopPage = true)" class="column pt-0">
        <i v-if="this.$store.state.StoreShopPage == true" class="has-text-success fa-2x fas fa-store"></i>
        <i v-if="this.$store.state.StoreShopPage == false" class="desactivado fa-2x fas fa-store"></i>
      </div> 

      <!-- Fichas de Mitos -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreReservaDeMitos = true)" class="column pt-0">
        <i v-if="!this.$store.state.datosMapa.title" class="has-text-danger fa-2x fas fa-skull"></i>
        <div v-if="this.$store.state.datosMapa.title">
          <i v-if="this.$store.state.StoreReservaDeMitos == true" class="has-text-success fa-2x fas fa-skull"></i>
          <i v-if="this.$store.state.StoreReservaDeMitos == false" class="desactivado fa-2x fas fa-skull"></i>
        </div>
      </div>
      <!-- Ajustes -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreAjustesPlay = true) " class="column pt-0">
        <i v-if="this.$store.state.StoreAjustesPlay == true" class="has-text-success fa-2x fas fa-cogs"></i>
        <i v-if="this.$store.state.StoreAjustesPlay == false" class="desactivado fa-2x fas fa-cogs"></i>
      </div>
    </div>
  </section>
</template>

<script>
import { apiService } from '@/services/api.js';

export default {
  name: "Basic data map in play",
  data(){
    return{
      notificacionMaxVida: false,
      mensajeVidaCorduraMax: "",

      variables: {

        dooms : this.$store.state.datosMapa.variables.dooms || 0,
        clue: this.$store.state.datosMapa.variables.clues || 0,
        marcado: {
          clue: false,
          dooms: false,
        }
      },

      textoInterfaz: {
        textoVariables: null,
      }
    }
  },
  
  methods: {
    // selector de variables
    selectProperty(prop) {
      // Reiniciamos todos y activamos solo el seleccionado
      Object.keys(this.variables.marcado).forEach(key => {
        this.variables.marcado[key] = false;
      });
      console.log("se va a cambiar la propiedad", prop , "a true")
      this.variables.marcado[prop] = true;
    },

    showNotification(textoAMostrar, ENTextoAMostrar) {
      if(this.$store.state.lenguaje == "español"){
        this.mensajeVidaCorduraMax = textoAMostrar;
      } else if(this.$store.state.lenguaje == "ingles"){
        this.mensajeVidaCorduraMax = ENTextoAMostrar;
      }
      this.notificacionMaxVida = true;
      setTimeout(() => {
        this.notificacionMaxVida = false;
      }, 2000);
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.title = this.$store.state.datosMapa.translations.es.title;
        this.textoInterfaz.textoVariables = "Selecciona 1 para modificar";

      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.title = this.$store.state.datosMapa.title;
        this.textoInterfaz.textoVariables = "Select 1 to modify";
      }
    },
    resetearNavegacion(){
      this.$store.state.StoreEncountresPage = false;
      this.$store.state.StoreShopPage = false;
      this.$store.state.StoreReservaDeMitos = false;
      this.$store.state.StoreAjustesPlay = false;
      this.updateDataMap()
    },
    resetearSelectorAtributos(){
      for (const key in this.atributos.marcado) {
        this.atributos.marcado[key] = false;
      }
    },
    buscarPropiedadActiva(){
      for (const key in this.variables.marcado) {
        if (this.variables.marcado[key] == true) {
          return key;
        }
      }
      console.log("No se ha seleccionado ninguna propiedad");
      return null
    },
    async sumarRestarPropiedad(signo){
      let propiedad = this.buscarPropiedadActiva();
      if (propiedad == null){ 
        this.showNotification("No se ha seleccionado ninguna propiedad", "No property selected");
        return
      }
      if (this.$store.state.datosMapa.variables[propiedad] <= 0 && signo == '-' ) {
        this.showNotification("No se puede bajar mas el contador", "____");
        return
      }
      const idMap = this.$store.state.datosMapa.id
      const value = await signo == '+' ? 1 : -1
      
      // llamamos a la API para hacer la cuenta
      const countResult = await apiService.editMapInPlatVariables(idMap, propiedad, value);
      // actualizamos valores
      this.$store.state.datosMapa.variables.clues = countResult.variables.clues
      this.$store.state.datosMapa.variables.dooms = countResult.variables.dooms
      
    },
    async updateDataMap(){
      // si no estamos en modo online no seguimos
      if (!this.$store.state.datosMapa.id) {
        return
      }

      // hacer una llamada a api con la id del mapa in play
      const response = await apiService.getMapInPlayByID(this.$store.state.datosMapa.id);
      // copiar el resultado en el store "datosMapa" actualizando todos los datos
      this.$store.commit('setDatosMapa', response);
    }
  },
  mounted(){
    this.resetearNavegacion();
    this.$store.state.StoreTiradorDados = true;
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style scoped>
/* selector de corazon cordura */
.efectoBumBum{
  font-size: 64px;
  animation: palpito 1s linear infinite;
}
@keyframes palpito{
  0% {font-size: 64px;}
  50% {font-size: 70px;}
  100% {font-size: 64px;}
}

/* selector de dinero, pista y resto */
.boxShadowYellow{
  border-radius: 100%;
  border: 0px;
  animation: glowing 1s linear infinite;
}
@keyframes glowing{
  0% {
    box-shadow: 0px 0px 10px 10px #04ff0000;
    background-color: rgba(255, 255, 0, 0);
  }
  50% {
    box-shadow: 0px 0px 10px 10px yellow;
    background-color: yellow;
  }
  100% {
    box-shadow: 0px 0px 20px 20px #04ff0000;
    background-color: rgba(255, 255, 0, 0);
  }
}
 
/* selector de variables */
.selector-item {
  cursor: pointer;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;
  border-radius: 10px;
}

/* Resaltar el selector activo */ 
.seleccionado {
  background: radial-gradient(circle, rgba(0, 255, 0, 0.5) 5%, rgba(0, 255, 0, 0.2) 50%);
  /*background: radial-gradient(circle, #39ff14, #f00); /* Verde fosforito */
  border-radius: 80%;
  box-shadow: 0px 0px 10px 2px #39ff14; /* Verde fosforito */
}
/* Notificacion de expansion activa*/
.notificacion {
  position: fixed;
  top: 10vh;
  left: 15vh;
  width: 40%;
  background-color: #f1f1f1;
  box-shadow: 0px 0px 50px 50px rgb(255, 255, 255);
  border-style: inset;
  padding: 10px;
  z-index: 20; 
  opacity: 1;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.bordeImagen{
  border: thick double #F2C94C;
}

.mapName{
  position: absolute;
  top: 16vh;
  text-align: center;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(242, 201, 76, 0.8);
  border-radius: 10px;
}

.contadorperdicionPista{
  position: relative;
  top: -4vh;
  line-height: 0;
  text-shadow: 0px 0px 5px rgb(0, 0, 0);
}

.desactivado{
  opacity: 30%;
}
</style>