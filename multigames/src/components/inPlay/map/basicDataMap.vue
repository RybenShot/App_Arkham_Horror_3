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
        <img class="is-rounded image image bordeImagen " :class="{ bordeImagenBendecido: this.$store.state.EstadoBendicion, bordeImagenMaldito: this.$store.state.EstadoMaldito } " 
        :src="this.$store.state.datosMapa.BGMap" >
        <div class="nombrePosicion">
          <p class="title p-1 is-4 has-text-weight-bold has-text-white">{{ textoInterfaz.title }}</p>
        </div>
      </div>
      
      <!-- datos variables -->
      <div class="column is-half has-text-white pt-4">
        <p class="subtitle has-text-white has-text-centered mb-1"> {{ textoInterfaz.textoVariables }}</p>

        <!-- perdicion - pistas -->
        <div class="columns is-mobile has-text-centered pt-2 ">
          <div @click="selectProperty('doom')" class="column selector-item pr-0">
            <i class="fa-4x fas fa-star-of-life has-text-danger"></i>
            <p class="contadorperdicionPista title has-text-white">{{ variables.doom }}</p>
          </div>

          <div @click="selectProperty('clue')" class="column selector-item pl-0">
            <i class="fa-4x fas fa-search has-text-info"></i>
            <p class="contadorperdicionPista title has-text-white">{{ variables.clue }}</p>
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
      <!-- Dados -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreEncuentros = true)" class="column pt-0">
        <i v-if="this.$store.state.StoreEncuentros == true" class="has-text-success fa-2x fas fa-street-view"></i>
        <i v-if="this.$store.state.StoreEncuentros == false" class="desactivado fa-2x fas fa-street-view"></i>
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
export default {
  name: "DatosBasicosPlay",
  data(){
    return{
      notificacionMaxVida: false,
      mensajeVidaCorduraMax: "",

      variables: {

        doom : 0,
        clue: 0,
        marcado: {
          clue: false,
          doom: false,
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
      this.$store.state.StoreEncuentros = false;
      this.$store.state.StoreReservaDeMitos = false;
      this.$store.state.StoreAjustesPlay = false;
    },
    resetearSelectorAtributos(){
      for (const key in this.atributos.marcado) {
        this.atributos.marcado[key] = false;
      }
    },
    buscarPropiedadActiva(){
      for (const key in this.variables.marcado) {
        if (this.variables.marcado[key] == true) {
          console.error(key)
          return key;
        }
      }
      console.log("No se ha seleccionado ninguna propiedad");
      return null
    },
    sumarRestarPropiedad(signo){
      let propiedad = this.buscarPropiedadActiva();
      if (propiedad == null){ 
        this.showNotification("No se ha seleccionado ninguna propiedad", "No property selected");
        return
      }
      if (this.variables[propiedad] <= 0 && signo == '-' ) {
        this.showNotification("No se puede bajar mas el contador", "____");
        return
      }
      
      if(signo == '+'){
        this.variables[propiedad]++;
        return
      } else if(signo == '-'){
        this.variables[propiedad]--;
        return
      } 
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
.bordeImagenBendecido{
  animation: glowingBendecido 3s linear infinite;
}
@keyframes glowingBendecido{
  0% {box-shadow: 0px 0px 10px 10px #04ff0000;}
  50% {box-shadow: 0px 0px 50px 10px rgb(0, 225, 255);}
  100% {box-shadow: 0px 0px 20px 20px #04ff0000;}
}
.bordeImagenMaldito{
  animation: glowingMaldito 3s linear infinite;
}
@keyframes glowingMaldito{
  0% {box-shadow: 0px 0px 10px 10px #04ff0000;}
  50% {box-shadow: 0px 0px 50px 10px rgb(225, 0, 0);}
  100% {box-shadow: 0px 0px 20px 20px #04ff0000;}
}

.nombrePosicion{
  position: absolute;
  top: 16vh;
  text-align: center;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(242, 201, 76, 0.8);
  border-radius: 10px;
}
.posicion{
  border: 2px solid rgba(242, 201, 76, 0.8);
  border-radius: 10px;
}

.contadorperdicionPista{
  position: relative;
  top: -4vh;
  line-height: 0;
  text-shadow: 0px 0px 5px rgb(0, 0, 0);
}
.contadorVidaCorduraPeques{
  position: relative;
  top: -3vh;
  line-height: 0;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
}

.desactivado{
  opacity: 30%;
}
#restos{
  color: #8B4513 !important;
}
</style>