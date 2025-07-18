<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-container">
      <div class="modal-card mx-1">
        <!-- HEADER -->
        <header class="modal-card-head BGPertenencias">
          <p class="modal-card-title has-text-white title is-5 pt-2 m-0">{{ textoInterfaz.titulo }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="cancelar"></i>
        </header>

        <section class="modal-card-body p-4">
          <!-- Nombre del investigador -->
          <p class="has-text-centered title is-italic mb-4">
            {{ this.$store.state.datosPJactual.name }}
          </p>
          
          <div class="lineaSeparatoria mx-6 mb-4">
            <div class="columns is-mobile" style="position: relative; top: 4px">
              <i class="fas fa-dot-circle column p-0 has-text-left"></i>
              <i class="fas fa-dot-circle column p-0 has-text-right"></i>
            </div>
          </div>

          <!-- Objetos requeridos -->
          <div v-if="objetosRequeridos.length > 0" class="mb-5">
            <div class="columns is-mobile is-multiline">
              <div v-for="objeto in objetosRequeridos" :key="objeto.id" class="column is-half-mobile is-one-third-tablet">
                <div class="objeto-requerido">
                  <CardObjectSelection 
                    :object="objeto" 
                    :is-selected="true" :is-disabled="true"/>
                  <div class="required-badge">
                    <i class="fas fa-star"></i> {{ textoInterfaz.requerido }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Objetos opcionales -->
          <div v-if="objetosOpcionales.length > 0" class="mb-4">
            <p class="has-text-centered subtitle is-6 mb-4">{{ textoInterfaz.textObjectOptional }}</p>
            
            <div class="columns is-mobile is-multiline">
              <div v-for="objeto in objetosOpcionales" :key="objeto.id" class="column is-half-mobile is-one-third-tablet">
                <CardObjectSelection 
                    :object="objeto" 
                    :is-selected="isObjectSelected(objeto.id)"
                    :is-disabled="false" 
                    @card-clicked="toggleSeleccionObjeto"/>
              </div>
            </div>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="p-1 has-background-white">
          <div class="field has-addons columns is-mobile is-gapless">
            <button 
              @click="confirmarSeleccion" 
                class="button is-success is-fullwidth" 
                :class="{ 'is-loading': guardando }" >
              <i class="fas fa-play mr-2"></i> {{ textoInterfaz.comenzarPartida }}
            </button>
            <button @click="cancelar" class="button is-light is-fullwidth">
              {{ textoInterfaz.cancelar }}
            </button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import CardObjectSelection from './CardObjectSelection.vue';
import { apiService } from '@/services/api.js';

export default {
  name: "ModalSeleccionObjetosIniciales",
  components: {
    CardObjectSelection
  },
  data() {
    return {
      textoInterfaz: {
        titulo: "",
        requerido: "",
        comenzarPartida: "",
        cancelar: "",
        textObjectOptional: ""
      },
      objetosRequeridos: [],
      objetosOpcionales: [],
      // lista final de objetos
      objetosSeleccionados: [],
      guardando: false
    }
  },
  methods: {
    async cargarObjetosIniciales() {
      try {
        const idInv = this.$store.state.datosPJactual.idInv;
        const response = await apiService.obtainPertenencesInv(idInv);
        
        this.objetosRequeridos = response.objects || [];
        this.objetosOpcionales = response.optionalObjects || [];
        
        console.log("Objetos cargados:", { 
          requeridos: this.objetosRequeridos.length, 
          opcionales: this.objetosOpcionales.length 
        });

      } catch (error) {
        console.error("Error al cargar objetos iniciales:", error);
      }
    },

    // funcion para ver si una carta esta seleccionada o no
    isObjectSelected(objectId) {
        return this.objetosSeleccionados.some(obj => obj.id === objectId);
    },
    
    // funcion para seleccionar o deseleccionar un objeto
    toggleSeleccionObjeto(objeto) {
      const index = this.objetosSeleccionados.findIndex(obj => obj.id === objeto.id);
      
      // recuerda, si sale -1, es porque no lo ha encontrado'
      if (index > -1) {
        // Deseleccionar
        this.objetosSeleccionados.splice(index, 1);
      } else {
        // Seleccionar
        this.objetosSeleccionados.push(objeto);
      }
    },
    
    async confirmarSeleccion() {
        this.guardando = true;
        
        try {
            // preparamos array final con los objetos seleccionado y los objetos requeridos
            const objetosFinales = [...this.objetosRequeridos, ...this.objetosSeleccionados];
            
            // Crear una copia del investigador actual
            const investigadorActualizado = { ...this.$store.state.datosPJactual };
            
            // Transformar possessions de IDs a objetos completos
            investigadorActualizado.possessions = objetosFinales;
            
            // Actualizar el investigador en el store con los objetos completos
            this.$store.commit('setDatosInvestigator', investigadorActualizado);
            
            // Notificar éxito
            this.$store.commit('ejecutarFlashPopUp', 'Objetos seleccionados correctamente');
            
            // Cerrar modal y comenzar partida
            this.$store.state.modalSeleccionObjetosIniciales = false;
            
            // Redirigir a la partida
            this.$router.push('/PlayAH');
            
        } catch (error) {
            console.error("Error al guardar selección:", error);
            this.$store.commit('ejecutarFlashPopUp', 'Error al guardar la selección');
        } finally {
            this.guardando = false;
        }
    },
    
    cancelar() {
      this.$store.state.modalSeleccionObjetosIniciales = false;
    },
    
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === "español") {
        this.textoInterfaz.titulo = "Pertenencias Iniciales";
        this.textoInterfaz.requerido = "Requerido";
        this.textoInterfaz.comenzarPartida = "Comenzar Partida";
        this.textoInterfaz.cancelar = "Cancelar";
        this.textoInterfaz.textObjectOptional = this.$store.state.datosPJactual.possessions.optionalText;
      } else if (this.$store.state.lenguaje === "ingles") {
        this.textoInterfaz.titulo = "Initial Belongings";
        this.textoInterfaz.requerido = "Required";
        this.textoInterfaz.comenzarPartida = "Start Game";
        this.textoInterfaz.cancelar = "Cancel";
        this.textoInterfaz.textObjectOptional = this.$store.state.datosPJactual.possessions.optionalText;
      }
    }
  },
  
  async mounted() {
    this.rellenarTextoSegunIdioma();
    await this.cargarObjetosIniciales();
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

.lineaSeparatoria {
  max-height: 1px;
  border: solid 1px black;
  padding: 0;
}

.objeto-requerido {
  position: relative;
}

.required-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.required-badge i {
  margin-right: 0.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-width: 95vw;
  }
  
  .modal-card-body {
    padding: 1rem;
  }
}
</style>