<template>
  <section>
    <transition name="fade">
      <div v-if="notificacionMaxVida" class="notificacion has-text-light has-background-danger">
        <span>{{ mensajeVidaCorduraMax }}</span>
      </div>
    </transition>

    <!-- Parte datos -->
    <div class="columns is-mobile">
      <div class="column image">
        <img class="is-rounded image image bordeImagen" :src="this.$store.state.datosPJactual.fotoUrl" alt="">
      </div>
      
      <div class="column has-text-white">
        <div>
          <p class="title is-2 has-text-weight-bold has-text-white mb-4">{{ this.$store.state.datosPJactual.nombrePJ }}</p>
          <p class="has-background-dark subtitle is-6 has-text-white pl-2">{{ textoInterfaz.posicion }}</p>
        </div>

        <!-- Vida - Cordura -->
        <div class="columns is-mobile has-text-centered pt-2">
          <div class="column pb-1">
            <i class="fa-4x fas fa-heartbeat has-text-danger"></i>
            <p class="contadorVidaCordura title has-text-white">{{ this.vida }}</p>
            <div class="columns is-mobile">
              <button @click="sumarRestarPropiedad('-', 'vida')" class="column mx-2 button is-small p-0 is-danger">-</button>
              <button @click="sumarRestarPropiedad('+', 'vida')" class="column mx-2 button is-small p-0 is-primary">+</button>
            </div>
          </div>
          <div class="column pb-0">
            <i class="has-text-info fa-4x fas fa-brain"></i>
            <p class="contadorVidaCordura title has-text-white">{{ this.cordura }}</p>
            <div class="columns is-mobile">
              <button @click="sumarRestarPropiedad('-', 'cordura')" class="column mx-2 button is-small p-0 is-danger">-</button>
              <button @click="sumarRestarPropiedad('+', 'cordura')" class="column mx-2 button is-small p-0 is-primary">+</button>
            </div>
          </div>

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
      vida: this.$store.state.datosPJactual.vida,
      cordura: this.$store.state.datosPJactual.cordura,

      maxVida :this.$store.state.datosPJactual.vida,
      maxCordura :this.$store.state.datosPJactual.cordura,

      notificacionMaxVida: false,
      mensajeVidaCorduraMax: "",

      textoInterfaz: {
        posicion: "",
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

      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.posicion = this.$store.state.datosPJactual.ENposicion;
        this.mensajeVidaCorduraMax = "Max life reached";
      }
    },
    resetearNavegacion(){
      this.$store.state.StoreTiradorDados = false;
      this.$store.state.StoreEstadosPlay = false;
      this.$store.state.StoreHabilidades = false;
      this.$store.state.StoreAjustesPlay = false;
    },
    sumarRestarVidaCordura(signo, propiedad){
      if(signo == "+" && propiedad == "vida" && this.vida < this.maxVida){
        this.vida ++;
      }else if(signo == "+" && propiedad == "cordura" && this.cordura < this.maxCordura){
        this.cordura ++;
      }else if(signo == "-" && propiedad == "vida" && this.vida > 0){
        this.vida --;
      }else if(signo == "-" && propiedad == "cordura" && this.cordura > 0){
        this.cordura --;
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

.contadorVidaCordura{
  position: relative;
  top: -4vh;
  line-height: 0;
}

.desactivado{
  opacity: 30%;
}
</style>