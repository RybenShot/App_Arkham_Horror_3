<template>
  <section>
    <ModalBuscarObjeto v-if="$store.state.modalBuscarObjeto" />
    <p class="title has-text-centered has-text-white">{{ textoInterfaz.titulo }}</p>
    <div class="container mx-3 has-text-white">
      <p>>> {{ textoInterfaz.efecto1 }}</p>
      <br>
      <p v-if="textoInterfaz.efecto2">>> {{ textoInterfaz.efecto2 }}</p>
    </div>
    <hr>

    <h1 class="title has-text-white has-text-centered">{{ textoInterfaz.pertenenciasIniciales }} <button class="button" @click="$store.state.modalBuscarObjeto = true">+</button></h1>
    

    <!-- Verificar si hay posesiones -->
    <div v-if="investigatorPossessions.length > 0" class="columns is-mobile mx-3">
      <!-- Pertenencias usando los datos del investigador directamente -->
       <b-carousel-list v-model="test" :data="investigatorPossessions" :items-to-show="4">
          <template #item="object">
            <div class="card-image">
              <figure class="image mx-1" @click="seeCard(object)">
                <img :src="object.img" :alt="getObjectName(object)">
              </figure>
              <p class="has-text-centered is-size-7 mt-2 object-name">
                {{ getObjectName(object) }}
              </p>
            </div>
          </template>
        </b-carousel-list>
    </div>

    <!-- Mensaje si no hay posesiones -->
    <div v-else class="has-text-centered">
      <p class="subtitle has-text-white">{{ textoInterfaz.noPertenencias }}</p>
      <button @click="volverASeleccionar" class="button is-warning">
        <i class="fas fa-redo mr-2"></i>
        {{ textoInterfaz.seleccionarObjetos }}
      </button>
    </div>

    <br>

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
      
      test: 0,
    }
  },
  computed: {
    ...mapGetters(['getInvestigatorPossessions']),
    investigatorPossessions() {
      return this.getInvestigatorPossessions;
    },
    focusLimit() {
      return this.$store.state.datosPJactual.focusLimit || 0;
    }
  },
  methods:{
    seeCard(object){
      // Pasar el objeto completo al store para ver detalles
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
      // Abrir modal de selección de objetos
      this.$store.state.modalSeleccionObjetosIniciales = true;
    },
    
    info(value) {
      this.test = value;
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
    
    // Verificar si hay posesiones
    if (this.investigatorPossessions.length === 0) {
      console.warn("No hay posesiones cargadas. El jugador debe seleccionar objetos primero.");
    }
  }
}
</script>

<style scoped>
.CartasPertenencias{
  border-radius: 10px;
}

.object-name {
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  font-weight: 500;
  line-height: 1.2;
}

.button.is-warning {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  border: none;
  color: white;
  font-weight: bold;
}

.button.is-warning:hover {
  background: linear-gradient(135deg, #e67e22, #f39c12);
  transform: translateY(-1px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    margin: 0 1rem;
  }
  
  .object-name {
    font-size: 0.7rem;
  }
}
</style>