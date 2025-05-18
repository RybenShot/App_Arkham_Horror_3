<template>
  <!-- mensaje de Error -->
  <div v-if="!this.$store.state.datosMapa.title" class="mt-6">
    <h1 class="title has-text-centered has-text-white">{{ textoInterfaz.error }}</h1>
    <div class="px-5">
      <router-link to="/ListaMapas" class="px-6">
        <button class="button is-rounded is-fullwidth " :class="{'boxShadowRed':!this.$store.state.mapaSeleccionado}">
          <i class="fas fa-map-signs mx-3"></i>
          <p class="title is-5 m-0">{{ textoInterfaz.botones.elegirMapa }}</p>
          <i class="fas fa-map-signs mx-3"></i>
        </button>
      </router-link>
    </div>
  </div>

  <section v-if="this.$store.state.datosMapa.title">
    <p class="subtitle is-6 has-text-white has-text-centered mb-4">{{ textoInterfaz.mitos }}</p>
    <h1 class="title has-text-white has-text-centered mb-1">{{ textoInterfaz.tituloMapa }}</h1>
    <hr class="my-3">

    <!-- botones de modals -->
    <div class="columns is-mobile is-centered botones-accion">
      <div class="column is-narrow">
        <button @click="restablecerReserva" class="button is-warning mt-3"><i class="fas fa-undo"></i></button>
      </div>
      <div class="column is-narrow">
        <button @click="abrirModalAgregar" class="button is-primary mt-3"><i class="fas fa-plus"></i></button>
      </div>
      <div class="column is-narrow">
        <button @click="abrirModalEliminar" class="button is-danger mt-3"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="column is-narrow">
        <button @click="abrirModalDevolver" class="button is-link mt-3"><i class="fas fa-recycle"></i></button>
      </div>

      <!-- Informacion 
      <div class="column is-narrow">
        <button @click="modalInformacion = true" class="button is-info mt-3 boton-info"><i class="fas fa-info"></i></button>
      </div>-->
    </div>
    

    <!-- miniaturas de mitos -->
    <p class="has-text-white">{{ textoInterfaz.reservaDeMitos }}</p>
    <div class="mb-2">
      <span v-for="(ficha, index) in $store.state.datosMapa.mythosReserveInPlay" :key="index">
        <i class="px-1" :class="[
          {'has-text-perdicion fas fa-star-of-life':ficha.type == 'doom' },
          {'has-text-monster fas fa-spider':ficha.type == 'enemies' },
          {'has-text-success fas fa-search':ficha.type == 'clues' },
          {'has-text-warning fas fa-scroll':ficha.type == 'newspaper' },
          {'has-text-link fab fa-sith':ficha.type == 'explosion' },
          {'has-text-black far fa-circle':ficha.type == 'empty' },
          {'has-text-danger fab fa-hubspot':ficha.type == 'retribution' },
          { tachado: ficha.reveal }
          ]">
        </i>
      </span>

    </div>

    <div class="px-4">
      <button @click="revelarFicha" class="button is-success is-fullwidth">{{ textoInterfaz.botones.sacaFicha }}</button>
    </div>

     <!-- Ficha mostrada en grande debajo del botón -->
    <div v-if="fichaMostrada" class="ficha-grande has-text-centered mt-4">
      <div v-if="fichaMostrada.type == 'retribution'">
        <i class="efectoRetribution has-text-danger fa-3x fab fa-hubspot" ></i>
        <p class="has-text-white is-size-4 mt-2">{{ fichaMostrada.type }}</p>
      </div>

      <div v-else>
        <i :class=" [
          {'has-text-perdicion fas fa-star-of-life':fichaMostrada.type == 'doom' },
          {'has-text-monster fas fa-spider':fichaMostrada.type == 'enemies' },
          {'has-text-success fas fa-search':fichaMostrada.type == 'clues' },
          {'has-text-warning fas fa-scroll':fichaMostrada.type == 'newspaper' },
          {'has-text-link fab fa-sith':fichaMostrada.type == 'explosion' },
          {'has-text-black far fa-circle':fichaMostrada.type == 'empty' },
          {'has-text-danger fab fa-hubspot':fichaMostrada.type == 'retribution' }
          ]" ></i>
        <p class="has-text-white is-size-4 mt-2">{{ fichaMostrada.type }}</p>
      </div>
    </div>

    <!-- MODALS -->
    <!-- Modal agregar -->
    <div v-if="modalAgregarAbierto" class="modal is-active px-4">
      <div class="modal-background" @click="cerrarModalAgregar"></div>
      <div class="modal-card ">
        <header class="modal-card-head BGReservaMitos">
          <p class="modal-card-title has-text-white">{{ textoInterfaz.textoModals.añadir }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger" @click="cerrarModalAgregar"></i>
        </header>
        <section class="modal-card-body ">
          <div class="buttons is-centered">
            <button v-for="tipo in tiposFicha" :key="tipo.tipo" @click='agregarFicha("add", tipo)' :class="['button', tipo.color]">
              <i :class="tipo.icon" class="px-1"></i> 
              {{ tipo.tipo }} 
              <i :class="tipo.icon" class="px-1"></i> 
            </button>
          </div>
        </section>
      </div>
    </div>

    <!-- Modal eliminar -->
    <div v-if="modalEliminarAbierto" class="modal is-active px-4">
      <div class="modal-background" @click="cerrarModalEliminar"></div>
      <div class="modal-card">
        <header class="modal-card-head BGReservaMitos">
          <p class="modal-card-title has-text-white">{{ textoInterfaz.textoModals.eliminar }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger" @click="cerrarModalEliminar"></i>
        </header>
        <section class="modal-card-body">
          <div class="buttons is-centered">
            <button v-for="tipo in tiposFicha" :key="tipo.tipo" @click='eliminarFicha("remove", tipo)' :class="['button', tipo.color]">
              <i :class="tipo.icon" class="px-1"></i> 
              {{ tipo.tipo }} 
              <i :class="tipo.icon" class="px-1"></i> 
            </button>
          </div>
        </section>
      </div>
    </div>

    <!-- Modal devolver -->
    <div v-if="modalDevolverAbierto" class="modal is-active px-4">
      <div class="modal-background" @click="cerrarModalDevolver"></div>
      <div class="modal-card">
        <header class="modal-card-head BGReservaMitos">
          <p class="modal-card-title has-text-white">{{ textoInterfaz.textoModals.devolver }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger" @click="cerrarModalDevolver"></i>
        </header>
        <section class="modal-card-body">
          <div class="buttons is-centered">
            <button v-for="(ficha, index) in this.$store.state.datosMapa.mythosReserveInPlay.filter(f => f.reveal)" :key="index" class="m-2 p-2"
              @click="devolverFicha('reset', ficha)">
              <i class="fa-2x" :class=" [
              {'has-text-perdicion fas fa-star-of-life':ficha.type == 'doom' },
              {'has-text-monster fas fa-spider':ficha.type == 'enemies' },
              {'has-text-success fas fa-search':ficha.type == 'clues' },
              {'has-text-warning fas fa-scroll':ficha.type == 'newspaper' },
              {'has-text-link fab fa-sith':ficha.type == 'explosion' },
              {'has-text-black far fa-circle':ficha.type == 'empty' },
              {'has-text-danger fab fa-hubspot':ficha.type == 'retribution' }
              
              ]" ></i>
              <p class="subtitle">{{ ficha.type }} </p>
              
            </button>
          </div>
        </section>
      </div>
    </div>

    <!-- Modal inforacion 
    <div v-if="modalInformacion" class="modal is-active px-4">
      <div class="modal-background" @click="this.modalInformacion = false"></div>
      <div class="modal-card ">
        <header class="modal-card-head BGReservaMitos">
          <p class="modal-card-title has-text-white">{{ textoInterfaz.textoModals.info }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger" @click="this.modalInformacion = false"></i>
        </header>
        <section class="modal-card-body ">
          <div class="buttons is-centered">
            <p class="subtitle is-5 has-text-centered">{{ textoInterfaz.textoModals.textoInfo }}</p>
          </div>
        </section>
      </div>
    </div>
    -->
  </section>
</template>

<script>
import { apiService } from '@/services/api.js';

export default {
  name: "ReservaDeMitos",
  data() {
    return {
      modalAgregarAbierto: false,
      modalEliminarAbierto: false,
      modalDevolverAbierto: false,
      //modalInformacion
      modalInformacion: false,
      textoInterfaz:{
        error: "",
        mitos: "",
        tituloMapa: "",
        reservaDeMitos: "",
        fichas: {
          doom: "",
          enemies: "",
          clues: "",
          newspaper: "",
          explosion: "",
          retribution: "",
          blanco: ""
        },
        textoModals:{
          info: "",
          textoInfo: "",
          añadir: "",
          eliminar: "",
          devolver: ""
        },
        botones:{
          sacaFicha: "",
          elegirMapa:""
        }
      },
      // Propiedad para la ficha que se mostrará en grande
      fichaMostrada: null,
      tiposFicha: [
        { tipo: 'doom', icon: 'fas fa-star-of-life', color: 'has-text-perdicion' },
        { tipo: 'enemies', icon: 'fas fa-spider', color: 'has-text-monster' },
        { tipo: 'clues', icon: 'fas fa-search', color: 'has-text-success' },
        { tipo: 'newspaper', icon: 'fas fa-scroll', color: 'has-text-warning' },
        { tipo: 'explosion', icon: 'fab fa-sith', color: 'has-text-link' },
        { tipo: 'retribution', icon: 'fab fa-hubspot', color: 'has-text-danger' },
        { tipo: 'empty', icon: 'far fa-circle', color: 'has-text-black' }
      ]
    };
  },
  methods: {
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.error = "Para usar esta función debes seleccionar un mapa.";
        this.textoInterfaz.mitos = "Mitos";
        this.textoInterfaz.tituloMapa = this.$store.state.datosMapa.translations.es.title;
        this.textoInterfaz.reservaDeMitos = "Reserva de Mitos";

        this.textoInterfaz.fichas.doom = "";
        this.textoInterfaz.fichas.enemies = "";
        this.textoInterfaz.fichas.clues = "";
        this.textoInterfaz.fichas.newspaper = "";
        this.textoInterfaz.fichas.explosion = "";
        this.textoInterfaz.fichas.retribution = "";
        this.textoInterfaz.fichas.blanco = "";

        this.textoInterfaz.textoModals.info = "Información";
        this.textoInterfaz.textoModals.textoInfo = "Para poder usar esta funcion en una partida en grupo, usad solo 1 movil.";
        this.textoInterfaz.textoModals.añadir = "Añadir Ficha";
        this.textoInterfaz.textoModals.eliminar = "Eliminar Ficha";
        this.textoInterfaz.textoModals.devolver = "Devolver Ficha";

        this.textoInterfaz.botones.sacaFicha = "Sacar 1 ficha";
        this.textoInterfaz.botones.elegirMapa = "Elegir Mapa";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.error = "To use this function, you must select a map.";
        this.textoInterfaz.mitos = "Myths";
        this.textoInterfaz.tituloMapa = this.$store.state.datosMapa.title;
        this.textoInterfaz.reservaDeMitos = "Myth Reserve";

        this.textoInterfaz.fichas.doom = "";
        this.textoInterfaz.fichas.enemies = "";
        this.textoInterfaz.fichas.clues = "";
        this.textoInterfaz.fichas.newspaper = "";
        this.textoInterfaz.fichas.explosion = "";
        this.textoInterfaz.fichas.retribution = "";
        this.textoInterfaz.fichas.blanco = "";

        this.textoInterfaz.textoModals.info = "Info";
        this.textoInterfaz.textoModals.textoInfo = "To use this function in a group game, use only one mobile device.";
        this.textoInterfaz.textoModals.añadir = "Add Token";
        this.textoInterfaz.textoModals.eliminar = "Delete Token";
        this.textoInterfaz.textoModals.devolver = "Return Token";

        this.textoInterfaz.botones.sacaFicha = "Draw 1 token";
        this.textoInterfaz.botones.elegirMapa = "Select Map";
      }
    },

    comprobarFicha(){
      switch (this.fichaMostrada.type) {
        case "retribution":
        // esneñamos la retribucion ....
        this.$store.commit('toggleModal' , { modal: 'modalNotificacionRetribution', modalState: true });
          //y si algunos de estos estados estan activos, los mostramos
          if (this.$store.getters.getModalState("EstadoPacto")) {
            this.$store.commit('toggleModal' , { modal: 'modalPacto', modalState: true });
          } 
          if (this.$store.getters.getModalState("EstadoMancillado")) {
            this.$store.commit('toggleModal' , { modal: 'modalMancillado', modalState: true });
          } 
          if (this.$store.getters.getModalState("EstadoPerseguido")) {
            this.$store.commit('toggleModal' , { modal: 'modalPerseguido', modalState: true });
          }
          break;
        case "empty":
          if (this.$store.getters.getModalState("EstadoMancillado")) {
            this.$store.commit('toggleModal' , { modal: 'modalNotificacionEfectoMancillado', modalState: true });
          }
          break
        case "clues":
          if (this.$store.getters.getModalState("EstadoMancillado")) {
            this.$store.commit('toggleModal' , { modal: 'modalNotificacionEfectoMancillado', modalState: true });
          }
          break
        default:
          break;
      }
    },

    /**
     * Selecciona una ficha al azar de las que no han sido reveladas,
     * la marca como revelada y la asigna a 'fichaMostrada' para mostrarla en grande.
     */
    async revelarFicha() {
      try {
        // llamamos a API para que me de una ficha de mitos
        const response = await apiService.getMithToken(this.$store.state.datosMapa.id);
        // la guardamos de forma global
        this.fichaMostrada = response;
        this.updateDataMap()

        // Ejecutamos la comprobación después de 5 segundos
        setTimeout(() => {
          this.comprobarFicha()
        }, 3000);
      } catch (error) {
        console.error(`❌ Error al obtener una ficha de la reserva de mitos`, error);
        alert("No quedan mas fichas de mitos en la reserva")
        throw error;
      }
      
    },

    // actualiza los datos del mapa en el store
    async updateDataMap(){
      try {
        // si no estamos en modo online no seguimos
        if (!this.$store.state.datosMapa.id) {
          return
        }

        // hacer una llamada a api con la id del mapa in play
        const response = await apiService.getMapInPlayByID(this.$store.state.datosMapa.id);
        // copiar el resultado en el store "datosMapa" actualizando todos los datos
        this.$store.commit('setDatosMapa', response);
      } catch (error) {
        console.error(`❌ Error al actualizar los datos del mapa`, error);
        throw error;
      }
    },
    
    /**
     * Reinicia la reserva de fichas:
     * - Marca todas las fichas como no reveladas.
     * - Limpia la ficha que se muestra en grande.
     */
    async restablecerReserva() {
      try {
        const response = await apiService.ressetMithReserve(this.$store.state.datosMapa.id);
        console.log(response)
        this.updateDataMap()
        this.fichaMostrada = null;
      } catch (error) {
        console.error(`❌ Error al resetear la reserva de mitos`, error);
        throw error;
      }
    },

    abrirModalAgregar() { this.modalAgregarAbierto = true; },
    cerrarModalAgregar() { this.modalAgregarAbierto = false; },
    /**
     * Agrega una nueva ficha a la reserva.
     * @param {Object} tipo - Objeto que contiene el tipo de ficha y sus propiedades.
     */
    async agregarFicha(action, tipo) {
      try {
        const response = await apiService.modifieMithReserve(this.$store.state.datosMapa.id, action, tipo.tipo);
        console.log(response)
        this.updateDataMap()
        this.cerrarModalAgregar()
      } catch (error) {
        console.error(`❌ Error al añadir la ficha a la reserva de mitos`, error);
        alert("❌ Error al añadir la ficha a la reserva de mitos")
        throw error;
      }
    },

    abrirModalEliminar() { this.modalEliminarAbierto = true; },
    cerrarModalEliminar() { this.modalEliminarAbierto = false; },
    /**
     * Elimina la primera ficha encontrada del tipo especificado.
     * @param {Object} tipo - Objeto que contiene el tipo de ficha a eliminar.
     */
    async eliminarFicha(action, tipo) {
      try {
        const response = await apiService.modifieMithReserve(this.$store.state.datosMapa.id, action, tipo.tipo);
        console.log(response)
        this.updateDataMap()
        this.cerrarModalEliminar();
      } catch (error) {
        console.error(`❌ Error al eliminar la ficha de la reserva de mitos`, error);
        alert("❌ Error al eliminar la ficha de la reserva de mitos")
        throw error;
      }
    },


    abrirModalDevolver() { this.modalDevolverAbierto = true; },
    cerrarModalDevolver() { this.modalDevolverAbierto = false; },
    /**
     * Devuelve una ficha: la marca como no revelada y cierra el modal.
     * @param {Object} ficha - La ficha a devolver.
     */
    async devolverFicha(action, ficha) {
      try {
        const response = await apiService.modifieMithReserve(this.$store.state.datosMapa.id, action, ficha.type);
        console.log(response)
        this.updateDataMap()
        this.cerrarModalDevolver();
      } catch (error) {
        console.error(`❌ Error al retornar la ficha a la reserva de mitos`, error);
        alert("❌ Error al retornar la ficha a la reserva de mitos")
        throw error;
      }
    }
  },
  mounted() {
    this.rellenarTextoSegunIdioma();
  },
};
</script>


<style scoped>
.efectoRetribution {
  font-size: 64px;
  color: #FF0000; /* Color inicial */
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.7); /* Sombra de texto para mayor impacto */
  animation: palpito 0.8s ease-in-out infinite, impacto 1.2s ease-in-out infinite, destello 2s ease-in-out infinite;
}

@keyframes palpito {
  0% {
    font-size: 64px;
  }
  50% {
    font-size: 75px;
  }
  100% {
    font-size: 64px;
  }
}

@keyframes impacto {
  0% {
    transform: scale(1) rotate(0deg);
    color: #FF0000; /* Rojo inicial */
  }
  25% {
    transform: scale(1.3) rotate(5deg); /* Añadido ligero giro */
    color: #FF5733; /* Rojo más claro */
  }
  50% {
    transform: scale(1.5) rotate(-10deg); /* Giro más intenso */
    color: #900C3F; /* Rojo oscuro */
  }
  75% {
    transform: scale(1.3) rotate(5deg); /* Vuelta al giro inicial */
    color: #FF5733; /* Rojo más claro */
  }
  100% {
    transform: scale(1) rotate(0deg);
    color: #FF0000; /* Rojo inicial */
  }
}

@keyframes destello {
  0% {
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
  }
  50% {
    text-shadow: 0 0 30px rgba(255, 0, 0, 1), 0 0 40px rgba(255, 0, 0, 0.8); /* Efecto de destello */
  }
  100% {
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
  }
}

.boxShadowRed{
  box-shadow: 0px 0px 10px red;
  animation: glowing 1s linear infinite;
}

@keyframes glowing{
  0% {
    box-shadow: 0px 0px 10px #04ff0000;
  }
  50% {
    box-shadow: 0px 0px 10px red;
  }
  100% {
    box-shadow: 0px 0px 20px 20px #04ff0000;
  }
}
.has-text-monster {
  color: #7448c7 !important;
}
.has-text-perdicion {
  color: #8b5b33 !important;
}
.tachado {
  position: relative;
}
.tachado::after {
  content: 'X'; /* Cruz en rojo */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  color: red;
  font-weight: bold;
}
.ficha-grande i {
  font-size: 5rem;
}
.BGReservaMitos{
  background-image: url(@/assets/img/Estados/fichasDeMitos.jpg);
  background-position: center;
  background-size: cover;
}
.boton-info{
  border-radius: 50%;
}
</style>
