<template>
  <section>
    <p class="subtitle is-6 has-text-white has-text-centered mb-4">Mitos</p>
    <h1 class="title has-text-white has-text-centered mb-1">{{ this.$store.state.datosMapa.title }}</h1>
    <hr class="my-3">

    <div class="columns is-mobile is-centered botones-accion">
      <div class="column is-narrow">
        <button @click="restablecerReserva" class="button is-warning mt-3">
          <i class="fas fa-undo"></i>
        </button>
      </div>
      <div class="column is-narrow">
        <button @click="abrirModalAgregar" class="button is-primary mt-3">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="column is-narrow">
        <button @click="abrirModalEliminar" class="button is-danger mt-3">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div class="column is-narrow">
        <button @click="abrirModalDevolver" class="button is-info mt-3">
          <i class="fas fa-recycle"></i>
        </button>
      </div>
    </div>
    

    <p class="has-text-white">Reserva de Mitos</p>
    <div class="mb-2">
      <span v-for="(ficha, index) in reservaVisible" :key="index">
        <i :class="['fa-1x', ficha.icon, ficha.color, 'px-1', { 'tachado': ficha.revelada }]"></i>
      </span>
    </div>

    <div class="px-4">
      <button @click="revelarFicha" class="button is-success is-fullwidth">Sacar 1 ficha</button>
    </div>

     <!-- Ficha mostrada en grande debajo del botón -->
     <div v-if="fichaMostrada" class="ficha-grande has-text-centered mt-4">
      <i :class="['fa-3x', fichaMostrada.icon, fichaMostrada.color]"></i>
      <p class="has-text-white is-size-4 mt-2">{{ fichaMostrada.tipo }}</p>
    </div>

    <div v-if="modalAgregarAbierto" class="modal is-active">
      <div class="modal-background" @click="cerrarModalAgregar"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Añadir Ficha</p>
          <button class="delete" @click="cerrarModalAgregar"></button>
        </header>
        <section class="modal-card-body">
          <div class="buttons">
            <button 
              v-for="tipo in tiposFicha" 
              :key="tipo.tipo" 
              @click="agregarFicha(tipo)"
              :class="['button', tipo.color]"
            >
              <i :class="tipo.icon"></i> {{ tipo.tipo }}
            </button>
          </div>
        </section>
      </div>
    </div>

    <div v-if="modalEliminarAbierto" class="modal is-active">
      <div class="modal-background" @click="cerrarModalEliminar"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Eliminar Ficha</p>
          <button class="delete" @click="cerrarModalEliminar"></button>
        </header>
        <section class="modal-card-body">
          <div class="buttons">
            <button 
              v-for="tipo in tiposFicha" 
              :key="tipo.tipo" 
              @click="eliminarFicha(tipo)"
              :class="['button', tipo.color]"
            >
              <i :class="tipo.icon"></i> {{ tipo.tipo }}
            </button>
          </div>
        </section>
      </div>
    </div>

    <div v-if="modalDevolverAbierto" class="modal is-active">
      <div class="modal-background" @click="cerrarModalDevolver"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Devolver Ficha</p>
          <button class="delete" @click="cerrarModalDevolver"></button>
        </header>
        <section class="modal-card-body">
          <div class="buttons">
            <button 
              v-for="(ficha, index) in reservaVisible.filter(f => f.revelada)" 
              :key="index" 
              @click="devolverFicha(ficha)"
              :class="['button', ficha.color]"
            >
              <i :class="ficha.icon"></i> {{ ficha.tipo }}
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
      reservaVisible: [],
      modalAgregarAbierto: false,
      modalEliminarAbierto: false,
      modalDevolverAbierto: false,
      // Propiedad para la ficha que se mostrará en grande
      fichaMostrada: null,
      tiposFicha: [
        { tipo: 'perdicion', icon: 'fas fa-star-of-life', color: 'has-text-perdicion' },
        { tipo: 'enemigos', icon: 'fas fa-spider', color: 'has-text-monster' },
        { tipo: 'pistas', icon: 'fas fa-search', color: 'has-text-success' },
        { tipo: 'periodico', icon: 'fas fa-scroll', color: 'has-text-warning' },
        { tipo: 'explosion', icon: 'fab fa-sith', color: 'has-text-link' },
        { tipo: 'retribucion', icon: 'fab fa-hubspot', color: 'has-text-danger' },
        { tipo: 'vacias', icon: 'fas fa-circle', color: 'has-text-grey' }
      ]
    };
  },
  mounted() {
    this.inicializarReserva();
  },
  methods: {
    inicializarReserva() {
      const reserva = this.$store.state.datosMapa.reservaDeMitos;
      this.reservaVisible = this.tiposFicha.flatMap(tipo => 
        Array.from({ length: reserva[tipo.tipo] || 0 }, () => ({ ...tipo, revelada: false }))
      );
    },
    revelarFicha() {
      const fichasNoReveladas = this.reservaVisible.filter(f => !f.revelada);
      if (fichasNoReveladas.length === 0) {
        alert("Todas las fichas han sido reveladas. Reinicia la reserva.");
        return;
      }
      const indiceAleatorio = Math.floor(Math.random() * fichasNoReveladas.length);
      const fichaRevelada = fichasNoReveladas[indiceAleatorio];
      fichaRevelada.revelada = true;
      // Asignamos la ficha revelada a la propiedad para mostrarla en grande
      this.fichaMostrada = fichaRevelada;
      console.log(`Has revelado una ficha de ${fichaRevelada.tipo}`);
    },
    restablecerReserva() {
      this.reservaVisible.forEach(ficha => (ficha.revelada = false));
      // Limpiamos la ficha mostrada
      this.fichaMostrada = null;
    },
    abrirModalAgregar() { this.modalAgregarAbierto = true; },
    cerrarModalAgregar() { this.modalAgregarAbierto = false; },
    agregarFicha(tipo) {
      this.reservaVisible.push({ ...tipo, revelada: false });
      this.cerrarModalAgregar();
    },
    abrirModalEliminar() { this.modalEliminarAbierto = true; },
    cerrarModalEliminar() { this.modalEliminarAbierto = false; },
    eliminarFicha(tipo) {
      const index = this.reservaVisible.findIndex(f => f.tipo === tipo.tipo);
      if (index !== -1) {
        this.reservaVisible.splice(index, 1);
      }
      this.cerrarModalEliminar();
    },
    abrirModalDevolver() { this.modalDevolverAbierto = true; },
    cerrarModalDevolver() { this.modalDevolverAbierto = false; },
    devolverFicha(ficha) {
      ficha.revelada = false;
      this.cerrarModalDevolver();
    }
  }
};
</script>


<style scoped>
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
</style>
