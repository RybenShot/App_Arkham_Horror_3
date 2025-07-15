<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-container">
      <div class="modal-card">
        <!-- HEADER -->
        <header class="modal-card-head BGPertenencias">
          <p class="modal-card-title has-text-white title is-5 pt-2 m-0">
            {{ textoInterfaz.titulo }}
          </p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body p-4">
          <!-- Buscador -->
          <div class="search-container mb-4">
            <div class="field has-addons">
              <div class="control is-expanded">
                <input 
                  v-model="objetoId" 
                  type="number" 
                  class="input" 
                  :placeholder="textoInterfaz.placeholder"
                  @keyup.enter="buscarObjeto"
                  min="1"
                >
              </div>
              <div class="control">
                <button 
                  @click="buscarObjeto" 
                  class="button is-primary"
                  :class="{ 'is-loading': buscando }"
                  :disabled="!objetoId || buscando"
                >
                  <i class="fas fa-search mr-2"></i>
                  {{ textoInterfaz.buscar }}
                </button>
              </div>
            </div>
          </div>

          <!-- Mensaje de error -->
          <div v-if="mensajeError" class="notification is-danger is-light mb-4">
            <p class="has-text-centered">{{ mensajeError }}</p>
          </div>

          <!-- Resultado de la búsqueda -->
          <div v-if="objetoEncontrado" class="result-container">
            <h3 class="title is-5 has-text-centered mb-4">{{ textoInterfaz.resultado }}</h3>
            
            <!-- Usar el componente CardObject existente -->
            <div class="has-text-centered">
              <CardObject 
                :object="objetoEncontrado" 
                @card-clicked="verDetalleObjeto"
              />
              
              <!-- Botón de añadir debajo de la carta -->
              <div class="mt-4">
                <button 
                  @click="añadirObjeto" 
                  class="button is-success"
                  :class="{ 'is-loading': añadiendo }"
                  :disabled="yaLoTiene || añadiendo"
                >
                  <i class="fas fa-plus mr-2"></i>
                  {{ yaLoTiene ? textoInterfaz.yaLoTienes : textoInterfaz.añadir }}
                </button>
              </div>
            </div>
          </div>

          <!-- Mensaje cuando no hay resultados -->
          <div v-if="noEncontrado" class="has-text-centered">
            <div class="notification is-warning is-light">
              <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
              <p>{{ textoInterfaz.noEncontrado }}</p>
            </div>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="modal-card-foot">
          <button @click="closeModal" class="button is-light is-fullwidth">
            {{ textoInterfaz.cerrar }}
          </button>
        </footer>
      </div>
    </div>

    <!-- Modal detalle objeto -->
    <ModalVerDetallePertenencia v-if="this.$store.state.verDetallePertenencia" />
  </div>
</template>

<script>
import ModalVerDetallePertenencia from "@/components/personajes/ModalsDetallePersonaje/ModalVerDetallePertenencia.vue";
import CardObject from "@/components/personajes/ModalsDetallePersonaje/CardObject.vue";
import { apiService } from '@/services/api.js';

export default {
  name: "ModalBuscarObjeto",
  components: {
    ModalVerDetallePertenencia,
    CardObject
  },
  data() {
    return {
      textoInterfaz: {
        titulo: "",
        placeholder: "",
        buscar: "",
        resultado: "",
        añadir: "",
        yaLoTienes: "",
        noEncontrado: "",
        cerrar: ""
      },
      objetoId: "",
      objetoEncontrado: null,
      noEncontrado: false,
      buscando: false,
      añadiendo: false,
      mensajeError: "",
      mostrarDetalle: false
    }
  },
  computed: {
    yaLoTiene() {
      if (!this.objetoEncontrado) return false;
      const possessions = this.$store.getters.getInvestigatorPossessions;
      return possessions.some(obj => obj.id === this.objetoEncontrado.id);
    }
  },
  methods: {
    async buscarObjeto() {
      if (!this.objetoId) {
        this.mensajeError = "Ingresa un ID válido";
        return;
      }

      this.buscando = true;
      this.mensajeError = "";
      this.objetoEncontrado = null;
      this.noEncontrado = false;

      try {
        const resultado = await apiService.obtainOneCardByID(this.objetoId);
        
        if (resultado) {
          this.objetoEncontrado = resultado;
          console.log("Objeto encontrado:", resultado);
        } else {
          this.noEncontrado = true;
        }
      } catch (error) {
        console.error("Error al buscar objeto:", error);
        this.mensajeError = "Error al buscar el objeto. Inténtalo de nuevo.";
      } finally {
        this.buscando = false;
      }
    },

    async añadirObjeto() {
      if (!this.objetoEncontrado || this.yaLoTiene) return;

      this.añadiendo = true;

      try {
        // Obtener possessions actuales
        const possessionsActuales = this.$store.getters.getInvestigatorPossessions;
        
        // Crear nueva lista con el objeto añadido
        const nuevasPossessions = [...possessionsActuales, this.objetoEncontrado];
        
        // Actualizar investigador
        const investigadorActualizado = { ...this.$store.state.datosPJactual };
        investigadorActualizado.possessions = nuevasPossessions;
        
        // Guardar en store
        this.$store.commit('setDatosInvestigator', investigadorActualizado);
        
        // Notificar éxito
        this.$store.commit('ejecutarFlashPopUp', 'Objeto añadido correctamente');
        
        // Limpiar búsqueda
        this.objetoId = "";
        this.objetoEncontrado = null;
        this.noEncontrado = false;
        
      } catch (error) {
        console.error("Error al añadir objeto:", error);
        this.mensajeError = "Error al añadir el objeto";
      } finally {
        this.añadiendo = false;
      }
    },

    verDetalleObjeto() {
      this.$store.state.detalleCartaObjeto = this.objetoEncontrado;
      this.mostrarDetalle = true;
      this.$store.state.verDetallePertenencia = true;
    },

    closeModal() {
      this.$store.state.modalBuscarObjeto = false;
      this.mostrarDetalle = false;
    },

    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === "español") {
        this.textoInterfaz.titulo = "Buscar Objeto";
        this.textoInterfaz.placeholder = "Ingresa el ID del objeto";
        this.textoInterfaz.buscar = "Buscar";
        this.textoInterfaz.resultado = "Objeto Encontrado";
        this.textoInterfaz.añadir = "Añadir Objeto";
        this.textoInterfaz.yaLoTienes = "Ya lo tienes";
        this.textoInterfaz.noEncontrado = "No se encontró ningún objeto con ese ID";
        this.textoInterfaz.cerrar = "Cerrar";
      } else if (this.$store.state.lenguaje === "ingles") {
        this.textoInterfaz.titulo = "Search Object";
        this.textoInterfaz.placeholder = "Enter object ID";
        this.textoInterfaz.buscar = "Search";
        this.textoInterfaz.resultado = "Object Found";
        this.textoInterfaz.añadir = "Add Object";
        this.textoInterfaz.yaLoTienes = "Already have it";
        this.textoInterfaz.noEncontrado = "No object found with that ID";
        this.textoInterfaz.cerrar = "Close";
      }
    }
  },

  mounted() {
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style scoped>
.BGPertenencias {
  background-image: url("@/assets/img/2-Pertenencias/IMGModalPertenencias.jpg");
  background-position: center;
  background-size: cover;
}

.modal-container {
  max-width: 90vw;
  margin: 0 auto;
}

.search-container {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.result-container {
  padding: 1rem;
}

.cruzeta {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cruzeta:hover {
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-width: 95vw;
  }
  
  .modal-card-body {
    padding: 1rem;
  }
  
  .search-container {
    padding: 1rem;
  }
  
  .card-result {
    padding: 1rem;
  }
  
  .object-image {
    max-width: 100px;
  }
  
  .stats-basic {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>