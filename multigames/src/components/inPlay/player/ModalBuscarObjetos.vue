<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-container">
      <div class="modal-card">
        <!-- HEADER -->
        <header class="modal-card-head BGPertenencias">
          <p class="modal-card-title has-text-white title is-5 pt-2 m-0">{{ textoInterfaz.titulo }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body p-4">
          <!-- navegacion de pestañas de búsqueda -->
          <nav class="tabs is-centered mb-4">
            <ul>
              <li :class="{ 'is-active': tipoBusqueda == 'id' }">
                <a @click="tipoBusqueda = 'id'">
                  <span class="icon is-small"><i class="fas fa-hashtag"></i></span>
                  <p>{{ textoInterfaz.buscarPorId }}</p>
                </a>
              </li>
              <li :class="{ 'is-active': tipoBusqueda == 'filtros' }">
                <a @click="tipoBusqueda = 'filtros'">
                  <span class="icon is-small"><i class="fas fa-filter"></i></span>
                  <p>{{ textoInterfaz.buscarPorFiltros }}</p>
                </a>
              </li>
            </ul>
          </nav>

          <!-- Búsqueda por ID -->
          <div v-if="tipoBusqueda == 'id'" class="search-container mb-4">
            <div class="field has-addons">
              <div class="control is-expanded">
                <input v-model="objetoId" type="number" class="input" :placeholder="textoInterfaz.placeholderId" min="1">
              </div>
              <div class="control">
                <button @click="buscarPorId" class="button is-primary" :class="{ 'is-loading': buscando }" :disabled="!objetoId || buscando" >
                  <i class="fas fa-search mr-2"></i>
                  {{ textoInterfaz.buscar }}
                </button>
              </div>
            </div>
          </div>

          <!-- Búsqueda por filtros -->
          <div v-if="tipoBusqueda == 'filtros'" class="search-container mb-4">
            <!-- Nombre -->
            <div class="field">
              <p >{{ textoInterfaz.nombre }}</p>
              <div class="control">
                <input v-model="filtros.name" type="text" class="input" :placeholder="textoInterfaz.placeholderNombre" >
              </div>
            </div>

            <!-- Expansión -->
            <div class="field">
              <label class="label">{{ textoInterfaz.expansion }}</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="filtros.expansion">
                    <option value="">{{ textoInterfaz.todasExpansiones }}</option>
                    <option value="base">Base</option>
                    <option value="AHWaves">Waves</option>
                    <option value="AHNigth">Night</option>
                    <option value="AHSecrets">Secrets</option>
                    <option value="AHOriginal">Original</option>
                    <option value="AHComunity">Community</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Tipos -->
            <div class="field">
              <label class="label">{{ textoInterfaz.tipos }} ({{ textoInterfaz.maxDos }})</label>
              <div class="control">
                <div class="tags">
                  <span v-for="tipo in tiposDisponibles" :key="tipo"
                    @click="toggleTipo(tipo)"
                    class="tag is-medium tipo-tag"
                    :class="{ 'is-primary': filtros.types.includes(tipo), 'is-light': !filtros.types.includes(tipo)}">
                    {{ tipo }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Botón buscar -->
            <div class="field">
              <div class="control">
                <button class="button is-primary is-fullwidth"
                  @click="buscarPorFiltros" 
                  :class="{ 'is-loading': buscando }"
                  :disabled="!hayFiltros || buscando">

                  <i class="fas fa-search mr-2"></i> {{ textoInterfaz.buscar }}
                </button>
              </div>
            </div>
          </div>

          <!-- Mensaje de error -->
          <div v-if="mensajeError" class="notification is-danger is-light mb-4">
            <p class="has-text-centered">{{ mensajeError }}</p>
          </div>

          <!-- Resultados -->
          <div v-if="resultados.length > 0" class="results-container">
            <h3 class="title is-5 has-text-centered mb-4">
              {{ textoInterfaz.resultados }} ({{ resultados.length }})
            </h3>
            
            <!-- Grid de resultados -->
            <div class="columns is-multiline is-mobile">
              <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop" v-for="objeto in resultados" :key="objeto.id" >
                <div class="result-item">
                  <CardObject :object="objeto" @card-clicked="verDetalleObjeto"/>
                  
                  <!-- Botón añadir -->
                  <div class="has-text-centered mt-2">
                    <button class="button is-success is-small" @click="añadirObjeto(objeto)" :disabled="yaLoTiene(objeto.id)">
                      <i class="fas fa-plus mr-1"></i> 
                      {{ yaLoTiene(objeto.id) ? textoInterfaz.yaLoTienes : textoInterfaz.añadir }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensaje cuando no hay resultados -->
          <div v-if="noEncontrado" class="has-text-centered">
            <div class="notification is-warning is-light">
              <i class="fas fa-exclamation-triangle fa-2x mb-3"></i> <p>{{ textoInterfaz.noEncontrado }}</p>
            </div>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="modal-card-foot">
          <button @click="closeModal" class="button is-danger is-fullwidth">
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
        buscarPorId: "",
        buscarPorFiltros: "",
        placeholderId: "",
        placeholderNombre: "",
        nombre: "",
        expansion: "",
        tipos: "",
        maxDos: "",
        todasExpansiones: "",
        buscar: "",
        resultados: "",
        añadir: "",
        yaLoTienes: "",
        noEncontrado: "",
        cerrar: ""
      },
      tipoBusqueda: "id", // 'id' o 'filtros'
      objetoId: "",
      filtros: {
        name: "",
        expansion: "",
        types: []
      },
      tiposDisponibles: ["talento", "perInicial", "objeto", "comun", "aliado", "hechizo", "especial", "arma"],
      resultados: [], // Para múltiples resultados
      noEncontrado: false,
      buscando: false,
      añadiendo: false,
      mensajeError: "",
      mostrarDetalle: false
    }
  },
  computed: {
    yaLoTiene() {
      // Para compatibilidad con búsqueda por ID (resultado único)
      return (objetoId) => {
        const possessions = this.$store.getters.getInvestigatorPossessions;
        return possessions.some(obj => obj.id === objetoId);
      };
    },
    hayFiltros() {
      return this.filtros.name || this.filtros.expansion || this.filtros.types.length > 0;
    }
  },
  methods: {
    async buscarPorId() {
      if (!this.objetoId) {
        this.mensajeError = "Ingresa un ID válido";
        return;
      }

      this.buscando = true;
      this.mensajeError = "";
      this.resultados = [];
      this.noEncontrado = false;

      try {
        const resultado = await apiService.obtainOneCardByID(this.objetoId);
        
        if (resultado) {
          this.resultados = [resultado]; // Convertir a array para consistencia
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

    async buscarPorFiltros() {
      if (!this.hayFiltros) {
        this.mensajeError = "Ingresa al menos un filtro";
        return;
      }

      this.buscando = true;
      this.mensajeError = "";
      this.resultados = [];
      this.noEncontrado = false;

      try {
        const resultado = await apiService.obtainCardsFiltered(
          this.filtros.name || null,
          this.filtros.expansion || null,
          this.filtros.types.length > 0 ? this.filtros.types : null
        );
        
        if (resultado && resultado.length > 0) {
          this.resultados = resultado;
          console.log(`Encontrados ${resultado.length} objetos:`, resultado);
        } else {
          this.noEncontrado = true;
        }
      } catch (error) {
        console.error("Error al buscar por filtros:", error);
        this.mensajeError = "Error al buscar objetos. Inténtalo de nuevo.";
      } finally {
        this.buscando = false;
      }
    },

    toggleTipo(tipo) {
      const index = this.filtros.types.indexOf(tipo);
      
      if (index > -1) {
        // Quitar tipo
        this.filtros.types.splice(index, 1);
      } else {
        // Añadir tipo (máximo 2)
        if (this.filtros.types.length < 2) {
          this.filtros.types.push(tipo);
        } else {
          this.mensajeError = "Solo puedes seleccionar máximo 2 tipos";
          setTimeout(() => {
            this.mensajeError = "";
          }, 2000);
        }
      }
    },

    async añadirObjeto(objeto) {
      if (this.yaLoTiene(objeto.id)) return;

      this.añadiendo = true;

      try {
        // Obtener possessions actuales
        const possessionsActuales = this.$store.getters.getInvestigatorPossessions;
        
        // Crear nueva lista con el objeto añadido
        const nuevasPossessions = [...possessionsActuales, objeto];
        
        // Actualizar investigador
        const investigadorActualizado = { ...this.$store.state.datosPJactual };
        investigadorActualizado.possessions = nuevasPossessions;
        
        // Guardar en store
        this.$store.commit('setDatosInvestigator', investigadorActualizado);
        
        // Notificar éxito
        this.$store.commit('ejecutarFlashPopUp', 'Objeto añadido correctamente');
        
      } catch (error) {
        console.error("Error al añadir objeto:", error);
        this.mensajeError = "Error al añadir el objeto";
      } finally {
        this.añadiendo = false;
      }
    },

    verDetalleObjeto(url) {
      // Encontrar el objeto por la URL (método original de CardObject)
      const objeto = this.resultados.find(obj => obj.img === url);
      if (objeto) {
        this.$store.state.detalleCartaObjeto = objeto;
        this.mostrarDetalle = true;
        this.$store.state.verDetallePertenencia = true;
      }
    },

    closeModal() {
      this.$store.state.modalBuscarObjeto = false;
      this.mostrarDetalle = false;
    },

    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === "español") {
        this.textoInterfaz.titulo = "Buscar Objetos";
        this.textoInterfaz.buscarPorId = "Por ID";
        this.textoInterfaz.buscarPorFiltros = "Por Filtros";
        this.textoInterfaz.placeholderId = "Ingresa el ID del objeto";
        this.textoInterfaz.placeholderNombre = "Nombre del objeto";
        this.textoInterfaz.nombre = "Nombre";
        this.textoInterfaz.expansion = "Expansión";
        this.textoInterfaz.tipos = "Tipos";
        this.textoInterfaz.maxDos = "máximo 2";
        this.textoInterfaz.todasExpansiones = "Todas las expansiones";
        this.textoInterfaz.buscar = "Buscar";
        this.textoInterfaz.resultados = "Resultados";
        this.textoInterfaz.añadir = "Añadir";
        this.textoInterfaz.yaLoTienes = "Ya lo tienes";
        this.textoInterfaz.noEncontrado = "No se encontraron objetos";
        this.textoInterfaz.cerrar = "Cerrar";
        
      } else if (this.$store.state.lenguaje === "ingles") {
        this.textoInterfaz.titulo = "Search Objects";
        this.textoInterfaz.buscarPorId = "By ID";
        this.textoInterfaz.buscarPorFiltros = "By Filters";
        this.textoInterfaz.placeholderId = "Enter object ID";
        this.textoInterfaz.placeholderNombre = "Object name";
        this.textoInterfaz.nombre = "Name";
        this.textoInterfaz.expansion = "Expansion";
        this.textoInterfaz.tipos = "Types";
        this.textoInterfaz.maxDos = "max 2";
        this.textoInterfaz.todasExpansiones = "All expansions";
        this.textoInterfaz.buscar = "Search";
        this.textoInterfaz.resultados = "Results";
        this.textoInterfaz.añadir = "Add";
        this.textoInterfaz.yaLoTienes = "Already have it";
        this.textoInterfaz.noEncontrado = "No objects found";
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

.results-container {
  max-height: 400px;
  overflow-y: auto;
}

.result-item {
  padding: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #fafafa;
  transition: all 0.2s ease;
}

.result-item:hover {
  border-color: #3273dc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tipo-tag {
  cursor: pointer;
  margin: 0.2rem;
  transition: all 0.2s ease;
}

.tipo-tag:hover {
  transform: scale(1.05);
}

.tabs ul {
  border: none;
}

.tabs li.is-active a {
  border-bottom-color: #3273dc;
  color: #3273dc;
}

.cruzeta {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cruzeta:hover {
  transform: scale(1.1);
}

</style>