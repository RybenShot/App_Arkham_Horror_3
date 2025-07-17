<template>
  <section>
    <transition name="fade">
      <div v-if="notificacionMaxVida" class="notificacion has-text-light has-background-danger">
        <span>{{ mensajeVidaCorduraMax }}</span>
      </div>
    </transition>

    <br>

    <!-- Parte datos -->
    <div class="columns is-mobile">
      <!-- foto y nombre -->
      <div class="image-container">
        <!-- Marco ornamental -->
        <div class="ornamental-frame">
          <div class="corner-diamond tl">◆</div>
          <div class="corner-diamond tr">◆</div>
          <div class="corner-diamond bl">◆</div>
          <div class="corner-diamond br">◆</div>
          <div class="frame-line top"></div>
          <div class="frame-line bottom"></div>
          <div class="frame-line left"></div>
          <div class="frame-line right"></div>
        </div>
        
        <!-- Imagen SIN el borde original -->
        <img :src="this.$store.state.datosPJactual.imgInv" class=" investigator-image">
        
        <!-- Texto superpuesto en la parte inferior -->
        <div class="text-overlay">
          <p class="investigator-name">{{ this.$store.state.datosPJactual.name }}</p>
          <p class="investigator-position">{{ textoInterfaz.posicion }}</p>
        </div>
      </div>
      
      <!-- datos variables -->
      <div class="column is-half has-text-white pt-4">
        <p class="subtitle has-text-white has-text-centered mb-1"> {{ textoInterfaz.textoVariables }}</p>

        <!-- Vida - Cordura -->
        <div class="columns is-mobile has-text-centered pt-2 espacioVidaCordura">
          <div @click="selectProperty('vida')" class="column pb-1 selector-item pr-0">
            <i class="fa-4x fas fa-heartbeat has-text-danger" :class="{ efectoBumBum: atributos.marcado.vida } "></i>
            <p class="contadorVidaCordura title has-text-white">{{ atributos.vida }}</p>
          </div>

          <div @click="selectProperty('cordura')" class="column pb-0 selector-item pl-0">
            <i class="fa-4x fas fa-brain has-text-info" :class="{ efectoBumBum: atributos.marcado.cordura }"></i>
            <p class="contadorVidaCordura title has-text-white">{{ atributos.cordura }}</p>
          </div>
        </div>

        <!-- dinero, pistas y restos -->
        <div class="columns is-mobile has-text-centered pt-2">
          <div @click="selectProperty('dinero')" class="column p-0 selector-item" >
            <i class="fa-3x fas fa-money-bill-wave has-text-warning" :class="{ boxShadowYellow: atributos.marcado.dinero }"></i>
            <p class="contadorVidaCorduraPeques title has-text-white">{{ atributos.dinero }}</p>
          </div>

          <div @click="selectProperty('pistas')" class="column p-0 selector-item" >
            <i class="has-text-success fa-3x fas fa-search" :class="{ boxShadowYellow: atributos.marcado.pistas }"></i>
            <p class="contadorVidaCorduraPeques title has-text-white">{{ atributos.pistas }}</p>
          </div>

          <div @click="selectProperty('restos')" class="column p-0 selector-item" >
            <i class="has-text-info fa-3x fas fa-poop" id="restos" :class="{ boxShadowYellow: atributos.marcado.restos }"></i>
            <p class="contadorVidaCorduraPeques title has-text-white">{{ atributos.restos }}</p>
          </div>
        </div>

        <!-- sumar restar -->
        <div class="columns is-mobile my-2 ">
          <button @click="sumarRestarPropiedad('-', 'vida')" class="column mx-5 button is-small p-0 is-danger pb-1"><i class="fas fa-window-minimize"></i></button>
          <button @click="sumarRestarPropiedad('+', 'vida')" class="column mx-5 button is-small p-0 is-primary "><i class="fas fa-plus"></i></button>
        </div>

      </div>
    </div>

    <br>

    <!-- Navegacion -->
    <div class="columns is-mobile has-text-centered has-text-white">
      <!-- Dados -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreTiradorDados = true)" class="column pt-0">
        <i v-if="this.$store.state.StoreTiradorDados == true" class="has-text-success fa-2x fas fa-dice"></i>
        <i v-if="this.$store.state.StoreTiradorDados == false" class="desactivado fa-2x fas fa-dice"></i>
      </div>
      
      <!-- Ubicacion 
      <div @click="(resetearNavegacion()), (this.$store.state.StoreUbicationPlayer = true)" class="column pt-0">
        <i v-if="this.$store.state.StoreUbicationPlayer == true" class="has-text-success fa-2x fas fa-street-view"></i>
        <i v-if="this.$store.state.StoreUbicationPlayer == false" class="desactivado fa-2x fas fa-street-view"></i>
      </div>
      -->

      <!-- Estados -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreEstadosPlay = true)" class="column pt-0">
        <i v-if="this.$store.state.StoreEstadosPlay == true" class="has-text-success fa-2x fas fa-user-injured"></i>
        <i v-if="this.$store.state.StoreEstadosPlay == false" class="desactivado fa-2x fas fa-user-injured"></i>
      </div>
      <!-- Habilidades -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreHabilidades = true) " class="column pt-0">
        <i v-if="this.$store.state.StoreHabilidades == true" class="has-text-success fa-2x fas fa-address-card"></i>
        <i v-if="this.$store.state.StoreHabilidades == false" class="desactivado fa-2x fas fa-address-card"></i>
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

       atributos: {
        maxVida :this.$store.state.datosPJactual.atributes.life,
        maxCordura :this.$store.state.datosPJactual.atributes.sanity,

        vida: this.$store.state.datosPJactual.atributes.life,
        cordura: this.$store.state.datosPJactual.atributes.sanity,
        dinero: this.$store.state.datosPJactual.atributes.money,
        pistas: this.$store.state.datosPJactual.atributes.clue,
        restos: this.$store.state.datosPJactual.atributes.remnant,
        marcado: {
          vida: false,
          cordura: false,
          dinero: false,
          pistas: false,
          restos: false
        }
      },

      textoInterfaz: {
        posicion: "",
        textoVariables: ""
      }
    }
  },
  
  methods: {
    // selector de variables
    selectProperty(prop) {
      // Reiniciamos todos y activamos solo el seleccionado
      Object.keys(this.atributos.marcado).forEach(key => {
        this.atributos.marcado[key] = false;
      });
      this.atributos.marcado[prop] = true;
    },

    mostrarNotificacionDesactivar(textoAMostrar, ENTextoAMostrar) {
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
        this.textoInterfaz.posicion = this.$store.state.datosPJactual.translations.es.position;
        this.textoInterfaz.textoVariables = "Selecciona 1 para modificar";

      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.posicion = this.$store.state.datosPJactual.position;
        this.textoInterfaz.textoVariables = "Select 1 to modify";
      }
    },
    resetearNavegacion(){
      this.$store.state.StoreTiradorDados = false;
      this.$store.state.StoreUbicationPlayer = false;
      this.$store.state.StoreEstadosPlay = false;
      this.$store.state.StoreHabilidades = false;
      this.$store.state.StoreAjustesPlay = false;
    },
    resetearSelectorAtributos(){
      for (const key in this.atributos.marcado) {
        this.atributos.marcado[key] = false;
      }
    },
    sumarRestarVidaCordura(signo, propiedad){
      if(signo == "+" && propiedad == "vida" && this.atributos.vida < this.atributos.maxVida){
        this.atributos.vida ++;
      }else if(signo == "+" && propiedad == "cordura" && this.atributos.cordura < this.atributos.maxCordura){
        this.atributos.cordura ++;
      }else if(signo == "-" && propiedad == "vida" && this.atributos.vida > 0){
        this.atributos.vida --;
      }else if(signo == "-" && propiedad == "cordura" && this.atributos.cordura > 0){
        this.atributos.cordura --;
      } else {
        console.error("No se puede sumar más vida o cordura");
        this.mostrarNotificacionDesactivar("Vida Maxima alcanzada", "Max life reached");
      }
    },
    buscarPropiedadActiva(){
      for (const key in this.atributos.marcado) {
        if (this.atributos.marcado[key] == true) {
          return key;
        }
      }
      console.log("No se ha seleccionado ninguna propiedad");
      return null
    },
    sumarRestarPropiedad(signo){
      let propiedad = this.buscarPropiedadActiva();
      if (propiedad == null){ 
        this.mostrarNotificacionDesactivar("No se ha seleccionado ninguna propiedad", "No property selected");
        return
      }
      
      if(signo == '+'){
          if (propiedad == "dinero" || propiedad == "pistas" || propiedad == "restos") {
            this.atributos[propiedad]++;
          }
          else{
            this.sumarRestarVidaCordura(signo, propiedad);
          }
      } else if(signo == '-'){
          if (propiedad == "dinero" || propiedad == "pistas" || propiedad == "restos") {
            this.atributos[propiedad]--;
          }
          else{
            this.sumarRestarVidaCordura(signo, propiedad);
          }
      } 

      // Actualizar el store con los nuevos valores
      if (propiedad == "pistas") {
        this.$store.state.datosPJactual.atributes.clue = this.atributos[propiedad];
      } else if (propiedad == "restos") {
        this.$store.state.datosPJactual.atributes.remnant = this.atributos[propiedad];
      } else if (propiedad == "dinero") {
        this.$store.state.datosPJactual.atributes.money = this.atributos[propiedad];
      } else if (propiedad == "vida"){
        this.$store.state.datosPJactual.atributes.life = this.atributos[propiedad];
      } else if (propiedad == "cordura"){
        this.$store.state.datosPJactual.atributes.sanity = this.atributos[propiedad];
      }

      // console.log("datos actuales del investigador:", this.$store.state.datosPJactual)
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
/* estilos para marco de foto */
.image-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.corner-diamond {
  position: absolute;
  font-size: 1.2rem;
  color: #F2C94C;
  text-shadow: 0 0 8px rgba(242, 201, 76, 0.8);
  z-index: 3;
  animation: diamond-glow 2s ease-in-out infinite alternate;
  
}

.corner-diamond.tl {
  top: -14px;
  left: -6px;
}

.corner-diamond.tr {
  top: -14px;
  right: -8px;
}

.corner-diamond.bl {
  bottom: -14px;
  left: -6px;
}

.corner-diamond.br {
  bottom: -14px;
  right: -6px;
}

.frame-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, #F2C94C, transparent);
  animation: line-pulse 3s ease-in-out infinite;
}

.frame-line.top,
.frame-line.bottom {
  height: 2px;
  left: 10px;
  right: 10px;
}

.frame-line.top {
  top: 0;
}

.frame-line.bottom {
  bottom: 0;
}

.frame-line.left,
.frame-line.right {
  width: 2px;
  top: 10px;
  bottom: 10px;
  background: linear-gradient(180deg, transparent, #F2C94C, transparent);
}

.frame-line.left {
  left: 0;
}

.frame-line.right {
  right: 0;
}

/* Animaciones del marco */
@keyframes diamond-glow {
  0% {
    text-shadow: 0 0 8px rgba(242, 201, 76, 0.8);
  }
  100% {
    text-shadow: 0 0 15px rgba(242, 201, 76, 1);
  }
}

@keyframes line-pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 10px rgba(242, 201, 76, 0.5);
  }
}

/* Imagen */
.investigator-image {
  position: relative;
}

/* Texto superpuesto */
.text-overlay {
  position: absolute;
  bottom: 1px;
  left: 0;
  right: 0;
  text-align: center;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding-bottom: 1rem;
}

.investigator-name {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  line-height: 1.1;
}

.investigator-position {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  margin: 0;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
}

/* selector de corazon cordura */
.espacioVidaCordura{
  height: 100px;
}
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

.contadorVidaCordura{
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