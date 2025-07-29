<template>
  <section>
    <ModalBuscarObjeto v-if="$store.state.modalBuscarObjeto" />
    <p class="title has-text-centered has-text-white">{{ textoInterfaz.titulo }}</p>
    <div class="container mx-3 has-text-white">
      <p>>> {{ textoInterfaz.efecto1 }}</p>
      <p v-if="textoInterfaz.efecto2">>> {{ textoInterfaz.efecto2 }}</p>
    </div>
    <hr>

    <h1 class="title has-text-white has-text-centered">
      {{ textoInterfaz.pertenenciasIniciales }} 
      <button class="button" @click="$store.state.modalBuscarObjeto = true">+</button>
    </h1>
    
    <!-- Verificar si hay posesiones -->
    <div v-if="investigatorPossessions.length > 0" class="objects-container">
      <div class="object-item" v-for="object in investigatorPossessions" :key="object.id" @click="seeCard(object)">
        <img :src="object.img" :alt="getObjectName(object)">
        <p>{{ getObjectName(object) }}</p>
      </div>
    </div>

    <!-- Mensaje si no hay posesiones -->
    <div v-else class="has-text-centered">
      <p class="subtitle has-text-white">{{ textoInterfaz.noPertenencias }}</p>
      <button @click="volverASeleccionar" class="button is-warning">
        <i class="fas fa-redo mr-2"></i> {{ textoInterfaz.seleccionarObjetos }}
      </button>
    </div>

  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalBuscarObjeto from './ModalBuscarObjetos.vue';

export default {
  name: "HabilidadesPlay",
  components: {
    ModalBuscarObjeto
  },
  data(){
    return{
      textoInterfaz:{
        titulo: "",
        tituloSeg:"",
        pertenenciasIniciales: "",
        noPertenencias: "",
        seleccionarObjetos: "",
        efecto1: "",
        efecto2: "",
      },
    }
  },
  computed: {
    ...mapGetters(['getInvestigatorPossessions']),
    investigatorPossessions() {
      return this.getInvestigatorPossessions;
    }
  },
  methods:{
    seeCard(object){
      this.$store.state.detalleCartaObjeto = object;
      this.$store.state.verDetallePertenencia = true;
    },
    
    getObjectName(object) {
      const language = this.$store.state.lenguaje;
      if (language === "español") {
        return object.translations?.es?.name || "";
      } else if (language === "ingles") {
        return object.translations?.en?.name || "";
      }
      return object.translations?.es?.name || "";
    },
    
    volverASeleccionar() {
      this.$store.state.modalSeleccionObjetosIniciales = true;
    },
    
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje === 'español'){
        this.textoInterfaz.titulo = "Habilidades";
        this.textoInterfaz.tituloSeg = "Dinero y Restos";
        this.textoInterfaz.pertenenciasIniciales = "Pertenencias Iniciales";
        this.textoInterfaz.noPertenencias = "No tienes pertenencias seleccionadas";
        this.textoInterfaz.seleccionarObjetos = "Seleccionar Objetos";
        this.textoInterfaz.efecto1 = this.$store.state.datosPJactual.translations?.es?.effect1 || "";
        this.textoInterfaz.efecto2 = this.$store.state.datosPJactual.translations?.es?.effect2 || "";

      }else if(this.$store.state.lenguaje === 'ingles'){
        this.textoInterfaz.titulo = "Skills";
        this.textoInterfaz.tituloSeg = "Money and Rests";
        this.textoInterfaz.pertenenciasIniciales = "Initial Belongings";
        this.textoInterfaz.noPertenencias = "You have no selected belongings";
        this.textoInterfaz.seleccionarObjetos = "Select Objects";
        this.textoInterfaz.efecto1 = this.$store.state.datosPJactual.effect1 || "";
        this.textoInterfaz.efecto2 = this.$store.state.datosPJactual.effect2 || "";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
    
    if (this.investigatorPossessions.length === 0) {
      console.warn("No hay posesiones cargadas. El jugador debe seleccionar objetos primero.");
    }
  }
}
</script>

<style scoped>
.objects-container {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}

.object-item {
  width: 25%;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
}

.object-item img {
  width: 77px;
  height: 129px;
  object-fit: cover;
}

.object-item p {
  color: white;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.button.is-warning {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  border: none;
  color: white;
  font-weight: bold;
}
</style>