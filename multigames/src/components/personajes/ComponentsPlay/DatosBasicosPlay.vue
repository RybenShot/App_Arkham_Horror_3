<template>
  <section>
    <transition name="fade">
      <div v-if="notificacionMaxVida" class="notificacion has-text-light has-background-danger">
        <span>{{ mensajeVidaCorduraMax }}</span>
      </div>
    </transition>

    <!-- Parte datos -->
    <div class="columns is-mobile">
      <!-- foto y nombre -->
      <div class="column is-half image">
        <img class="is-rounded image image bordeImagen" :src="this.$store.state.datosPJactual.fotoUrl" alt="">
        <div class="nombrePosicion">
          <p class="title p-1 is-4 has-text-weight-bold has-text-white">{{ this.$store.state.datosPJactual.nombrePJ }}</p>
          <p class="has-background-dark subtitle is-6 has-text-white posicion">{{ textoInterfaz.posicion }}</p>
        </div>
      </div>
      
      <!-- datos variables -->
      <div class="column is-half has-text-white pt-4">
        <p class="subtitle has-text-white has-text-centered mb-1"> {{ textoInterfaz.textoVariables }}</p>

        <!-- Vida - Cordura -->
        <div class="columns is-mobile has-text-centered pt-2">
          <div class="column pb-1">
            <i class="fa-4x fas fa-heartbeat has-text-danger"></i>
            <p class="contadorVidaCordura title has-text-white">{{ this.atributos.vida }}</p>

          </div>
          <div class="column pb-0">
            <i class="has-text-info fa-4x fas fa-brain"></i>
            <p class="contadorVidaCordura title has-text-white">{{ this.atributos.cordura }}</p>
          </div>
        </div>

        <!-- dinero, pistas y restos -->
        <div class="columns is-mobile has-text-centered pt-2">
          <div class="column p-0">
            <i class="fa-3x fas fa-money-bill-wave has-text-warning"></i>
            <p class="contadorVidaCorduraPeques title has-text-white">{{ this.atributos.dinero }}</p>

          </div>
          <div class="column p-0">
            <i class="has-text-info fa-3x fas fa-search has-text-success"></i>
            <p class="contadorVidaCorduraPeques title has-text-white">{{ this.atributos.pistas }}</p>
          </div>
          <div class="column p-0">
            <i class="has-text-info fa-3x fas fa-poop" id="restos"></i>
            <p class="contadorVidaCorduraPeques title has-text-white">{{ this.atributos.restos }}</p>
          </div>
        </div>

        <!-- sumar restar -->
        <div class="columns is-mobile my-2 ">
          <button @click="sumarRestarPropiedad('-', 'vida')" class="column mx-5 button is-small p-0 is-danger">-</button>
          <button @click="sumarRestarPropiedad('+', 'vida')" class="column mx-5 button is-small p-0 is-primary">+</button>
        </div>

      </div>
    </div>

    <!-- Navegacion -->
    <div class="columns is-mobile has-text-centered has-text-white">
      <!-- Dados -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreTiradorDados = true)" class="column pt-0">
        <i v-if="this.$store.state.StoreTiradorDados == true" class="has-text-success fa-2x fas fa-dice"></i>
        <i v-if="this.$store.state.StoreTiradorDados == false" class="desactivado fa-2x fas fa-dice"></i>
      </div>
      <!-- Estados -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreEstadosPlay = true)" class="column pt-0">
        <i v-if="this.$store.state.StoreEstadosPlay == true" class="has-text-success fa-2x fas fa-hamsa"></i>
        <i v-if="this.$store.state.StoreEstadosPlay == false" class="desactivado fa-2x fas fa-hamsa"></i>
      </div>
      <!-- Habilidades -->
      <div @click="(resetearNavegacion()), (this.$store.state.StoreHabilidades = true) " class="column pt-0">
        <i v-if="this.$store.state.StoreHabilidades == true" class="has-text-success fa-2x fas fa-user-ninja"></i>
        <i v-if="this.$store.state.StoreHabilidades == false" class="desactivado fa-2x fas fa-user-ninja"></i>
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
        maxVida :this.$store.state.datosPJactual.vida,
        maxCordura :this.$store.state.datosPJactual.cordura,

        vida: this.$store.state.datosPJactual.vida,
        cordura: this.$store.state.datosPJactual.cordura,
        dinero: this.$store.state.datosPJactual.dinero,
        pistas: this.$store.state.datosPJactual.pistas,
        restos: this.$store.state.datosPJactual.restos,
      },

      textoInterfaz: {
        posicion: "",
        textoVariables: ""
      }
    }
  },
  
  methods: {
    mostrarNotificacionDesactivar() {
      this.notificacionMaxVida = true;
      setTimeout(() => {
        this.notificacionMaxVida = false;
      }, 2000);
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.posicion = this.$store.state.datosPJactual.posicion;
        this.mensajeVidaCorduraMax = "Vida Maxima alcanzada";
        this.textoInterfaz.textoVariables = "Selecciona 1 para modificar";

      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.posicion = this.$store.state.datosPJactual.ENposicion;
        this.mensajeVidaCorduraMax = "Max life reached";
        this.textoInterfaz.textoVariables = "Select 1 to modify";
      }
    },
    resetearNavegacion(){
      this.$store.state.StoreTiradorDados = false;
      this.$store.state.StoreEstadosPlay = false;
      this.$store.state.StoreHabilidades = false;
      this.$store.state.StoreAjustesPlay = false;
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
        this.mostrarNotificacionDesactivar();

      }
    },
    sumarRestarPropiedad(signo, propiedad){
      if(propiedad == "vida" || propiedad == "cordura"){
        this.sumarRestarVidaCordura(signo, propiedad)
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

<style>
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
}
.contadorVidaCorduraPeques{
  position: relative;
  top: -3vh;
  line-height: 0;
}

.desactivado{
  opacity: 30%;
}
#restos{
  color: #8B4513 !important;
}
</style>