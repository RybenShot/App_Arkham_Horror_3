<template>
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
        <button @click="abrirModalDevolver" class="button is-info mt-3"><i class="fas fa-recycle"></i></button>
      </div>
    </div>
    

    <p class="has-text-white">{{ textoInterfaz.reservaDeMitos }}</p>
    <div class="mb-2">
      <span v-for="(ficha, index) in this.$store.state.reservaVisible" :key="index">
        <i :class="['fa-1x', ficha.icon, ficha.color, 'px-1', { 'tachado': ficha.revelada }]"></i>
      </span>
    </div>

    <div class="px-4">
      <button @click="revelarFicha" class="button is-success is-fullwidth">{{ textoInterfaz.botones.sacaFicha }}</button>
    </div>

     <!-- Ficha mostrada en grande debajo del botón -->
     <div v-if="fichaMostrada" class="ficha-grande has-text-centered mt-4">
      <i :class="['fa-3x', fichaMostrada.icon, fichaMostrada.color]"></i>
      <p class="has-text-white is-size-4 mt-2">{{ fichaMostrada.tipo }}</p>
    </div>

    <!-- MODALS -->
    <div v-if="modalAgregarAbierto" class="modal is-active px-4">
      <div class="modal-background" @click="cerrarModalAgregar"></div>
      <div class="modal-card ">
        <header class="modal-card-head BGReservaMitos">
          <p class="modal-card-title has-text-white">{{ textoInterfaz.textoModals.añadir }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger" @click="cerrarModalAgregar"></i>
        </header>
        <section class="modal-card-body ">
          <div class="buttons is-centered">
            <button v-for="tipo in tiposFicha" :key="tipo.tipo" @click="agregarFicha(tipo)" :class="['button', tipo.color]">
              <i :class="tipo.icon" class="px-1"></i> 
              {{ tipo.tipo }} 
              <i :class="tipo.icon" class="px-1"></i> 
            </button>
          </div>
        </section>
      </div>
    </div>
    <div v-if="modalEliminarAbierto" class="modal is-active px-4">
      <div class="modal-background" @click="cerrarModalEliminar"></div>
      <div class="modal-card">
        <header class="modal-card-head BGReservaMitos">
          <p class="modal-card-title has-text-white">{{ textoInterfaz.textoModals.eliminar }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger" @click="cerrarModalEliminar"></i>
        </header>
        <section class="modal-card-body">
          <div class="buttons is-centered">
            <button v-for="tipo in tiposFicha" :key="tipo.tipo" @click="eliminarFicha(tipo)" :class="['button', tipo.color]">
              <i :class="tipo.icon" class="px-1"></i> 
              {{ tipo.tipo }} 
              <i :class="tipo.icon" class="px-1"></i> 
            </button>
          </div>
        </section>
      </div>
    </div>
    <div v-if="modalDevolverAbierto" class="modal is-active px-4">
      <div class="modal-background" @click="cerrarModalDevolver"></div>
      <div class="modal-card">
        <header class="modal-card-head BGReservaMitos">
          <p class="modal-card-title has-text-white">{{ textoInterfaz.textoModals.devolver }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger" @click="cerrarModalDevolver"></i>
        </header>
        <section class="modal-card-body">
          <div class="buttons is-centered">
            <button v-for="(ficha, index) in this.$store.state.reservaVisible.filter(f => f.revelada)" :key="index" @click="devolverFicha(ficha)" :class="['button', ficha.color]">
              <i :class="ficha.icon" class="px-1"></i> {{ ficha.tipo }} <i :class="ficha.icon" class="px-1"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ReservaDeMitos",
  data() {
    return {
      reservaMitosLength : this.$store.state.reservaVisible.length,
      modalAgregarAbierto: false,
      modalEliminarAbierto: false,
      modalDevolverAbierto: false,
      textoInterfaz:{
        error: "",
        mitos: "",
        tituloMapa: "",
        reservaDeMitos: "",
        fichas: {
          perdicion: "",
          enemigos: "",
          pista: "",
          periodico: "",
          explosion: "",
          retribucion: "",
          blanco: ""
        },
        textoModals:{
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
        { tipo: 'perdicion', icon: 'fas fa-star-of-life', color: 'has-text-perdicion' },
        { tipo: 'enemigos', icon: 'fas fa-spider', color: 'has-text-monster' },
        { tipo: 'pistas', icon: 'fas fa-search', color: 'has-text-success' },
        { tipo: 'periodico', icon: 'fas fa-scroll', color: 'has-text-warning' },
        { tipo: 'explosion', icon: 'fab fa-sith', color: 'has-text-link' },
        { tipo: 'retribucion', icon: 'fab fa-hubspot', color: 'has-text-danger' },
        { tipo: 'vacias', icon: 'far fa-circle', color: 'has-text-black' }
      ]
    };
  },
  methods: {
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.error = "Para usar esta función debes seleccionar un mapa.";
        this.textoInterfaz.mitos = "Mitos";
        this.textoInterfaz.tituloMapa = this.$store.state.datosMapa.title;
        this.textoInterfaz.reservaDeMitos = "Reserva de Mitos";

        this.textoInterfaz.fichas.perdicion = "";
        this.textoInterfaz.fichas.enemigos = "";
        this.textoInterfaz.fichas.pista = "";
        this.textoInterfaz.fichas.periodico = "";
        this.textoInterfaz.fichas.explosion = "";
        this.textoInterfaz.fichas.retribucion = "";
        this.textoInterfaz.fichas.blanco = "";

        this.textoInterfaz.textoModals.añadir = "Añadir Ficha";
        this.textoInterfaz.textoModals.eliminar = "Eliminar Ficha";
        this.textoInterfaz.textoModals.devolver = "Devolver Ficha";

        this.textoInterfaz.botones.sacaFicha = "Sacar 1 ficha";
        this.textoInterfaz.botones.elegirMapa = "Elegir Mapa";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.error = "To use this function, you must select a map.";
        this.textoInterfaz.mitos = "Myths";
        this.textoInterfaz.tituloMapa = this.$store.state.datosMapa.ENtitle;
        this.textoInterfaz.reservaDeMitos = "Myth Reserve";

        this.textoInterfaz.fichas.perdicion = "";
        this.textoInterfaz.fichas.enemigos = "";
        this.textoInterfaz.fichas.pista = "";
        this.textoInterfaz.fichas.periodico = "";
        this.textoInterfaz.fichas.explosion = "";
        this.textoInterfaz.fichas.retribucion = "";
        this.textoInterfaz.fichas.blanco = "";

        this.textoInterfaz.textoModals.añadir = "Add Token";
        this.textoInterfaz.textoModals.eliminar = "Delete Token";
        this.textoInterfaz.textoModals.devolver = "Return Token";

        this.textoInterfaz.botones.sacaFicha = "Draw 1 token";
        this.textoInterfaz.botones.elegirMapa = "Select Map";
      }
    },
    /**
     * Inicializa la reserva de fichas tomando los datos del store.
     * Por cada tipo de ficha, crea un array con la cantidad de fichas indicadas
     * y establece la propiedad 'revelada' en false.
     */
    inicializarReserva() {
      // Obtenemos la reserva de mitos desde Vuex
      const reserva = this.$store.state.datosMapa.reservaDeMitos;
      // Generamos el array de fichas visibles a partir de los tipos y la cantidad indicada
      this.$store.state.reservaVisible = this.tiposFicha.flatMap(tipo => 
        Array.from({ length: reserva[tipo.tipo] || 0 }, () => ({ ...tipo, revelada: false }))
      );
      //console.error(this.$store.state.reservaVisible)
    },

    /**
     * Selecciona una ficha al azar de las que no han sido reveladas,
     * la marca como revelada y la asigna a 'fichaMostrada' para mostrarla en grande.
     */
    revelarFicha() {
      // Filtramos las fichas que no han sido reveladas
      const fichasNoReveladas = this.$store.state.reservaVisible.filter(f => !f.revelada);
      // Si ya se han revelado todas, mostramos una alerta
      if (fichasNoReveladas.length === 0) {
        alert("Todas las fichas han sido reveladas. Reinicia la reserva.");
        return;
      }
      // Seleccionamos una ficha aleatoria del grupo de las que aún no se han revelado
      const indiceAleatorio = Math.floor(Math.random() * fichasNoReveladas.length);
      const fichaSeleccionada = fichasNoReveladas[indiceAleatorio];
      // Marcamos la ficha como revelada
      fichaSeleccionada.revelada = true;
      // Asignamos la ficha revelada a la propiedad "fichaMostrada" para mostrarla en grande
      this.fichaMostrada = fichaSeleccionada;
      console.log(`Has revelado una ficha de ${fichaSeleccionada.tipo}`);
    },

    /**
     * Reinicia la reserva de fichas:
     * - Marca todas las fichas como no reveladas.
     * - Limpia la ficha que se muestra en grande.
     */
    restablecerReserva() {
      this.$store.state.reservaVisible.forEach(ficha => (ficha.revelada = false));
      this.fichaMostrada = null;
    },

    abrirModalAgregar() { this.modalAgregarAbierto = true; },
    cerrarModalAgregar() { this.modalAgregarAbierto = false; },
    /**
     * Agrega una nueva ficha a la reserva.
     * @param {Object} tipo - Objeto que contiene el tipo de ficha y sus propiedades.
     */
    agregarFicha(tipo) {
       // Añadimos la ficha al array de fichas visibles, marcada como no revelada
       this.$store.state.reservaVisible.push({ ...tipo, revelada: false });
      this.cerrarModalAgregar();
    },

    abrirModalEliminar() { this.modalEliminarAbierto = true; },
    cerrarModalEliminar() { this.modalEliminarAbierto = false; },
    /**
     * Elimina la primera ficha encontrada del tipo especificado.
     * @param {Object} tipo - Objeto que contiene el tipo de ficha a eliminar.
     */
    eliminarFicha(tipo) {
      // Busca la posición de la ficha del tipo indicado
      const index = this.$store.state.reservaVisible.findIndex(f => f.tipo === tipo.tipo);
      if (index !== -1) {
        // Elimina la ficha del array
        this.$store.state.reservaVisible.splice(index, 1);
      } else {
        alert("No quedan mas fichas de este tipo en la reserva")
      }
      this.cerrarModalEliminar();
    },


    abrirModalDevolver() { this.modalDevolverAbierto = true; },
    cerrarModalDevolver() { this.modalDevolverAbierto = false; },
    /**
     * Devuelve una ficha: la marca como no revelada y cierra el modal.
     * @param {Object} ficha - La ficha a devolver.
     */
    devolverFicha(ficha) {
      ficha.revelada = false;
      this.cerrarModalDevolver();
    }
  },
  mounted() {
    if ( this.reservaMitosLength == 0) {
      this.inicializarReserva();
    } else {
      console.error("ya existe una reserva de mitos")
    }
    this.rellenarTextoSegunIdioma();
  },
};
</script>


<style scoped>
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
</style>
