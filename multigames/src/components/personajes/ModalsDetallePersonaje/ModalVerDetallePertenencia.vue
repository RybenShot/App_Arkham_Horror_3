<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head BGBendicion">
        <p class="modal-card-title has-text-white">{{ textoInterfaz.titulo }}</p>
        <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
      </header>
      
      <section class="modal-card-body p-3">
        <div class="card-detail-container">
          <!-- Imagen de la carta -->
          <div class="card-image-container">
            <img 
              :src="cardObject.img" 
              :alt="getCardName()" 
              class="card-detail-image" 
              @click="toggleZoom"
              :class="{ 'zoomed': isZoomed }"
            />
          </div>

          <!-- Overlay para zoom con transición -->
          <transition name="zoom-fade">
            <div v-if="isZoomed" class="zoom-overlay" @click="toggleZoom">
              <transition name="zoom-scale" appear>
                <img 
                  v-if="isZoomed"
                  :src="cardObject.img" 
                  :alt="getCardName()" 
                  class="zoomed-image" 
                  @click.stop
                />
              </transition>
            </div>
          </transition>

          <!-- Información de la carta -->
          <div class="card-info">
            <!-- Nombre -->
            <h2 class="card-name title is-4 has-text-centered mb-3">{{ getCardName() }}</h2>

            <!-- Tags de tipo -->
            <div class="card-types mb-3">
              <span 
                v-for="type in cardObject.types" 
                :key="type"
                :class="getTypeClass(type)"
                class="tag is-small mr-1 mb-1"
              >
                {{ type }}
              </span>
            </div>

            <!-- Descripción -->
            <div class="card-description mb-3">
              <p class="is-size-6">{{ getCardDescription() }}</p>
            </div>

            <!-- Información adicional -->
            <div class="card-stats">
              <!-- Manos requeridas -->
              <div v-if="cardObject.hands !== null" class="stat-item">
                <span class="stat-label">{{ textoInterfaz.manos }}:</span>
                <span class="stat-value">{{ cardObject.hands }}</span>
              </div>

              <!-- Salud -->
              <div v-if="cardObject.health.life !== null || cardObject.health.sanity !== null" class="stat-item">
                <span class="stat-label">{{ textoInterfaz.salud }}:</span>
                <div class="health-stats">
                  <span v-if="cardObject.health.life !== null" class="health-item">
                    <i class="fas fa-heart has-text-danger"></i> {{ cardObject.health.life }}
                  </span>
                  <span v-if="cardObject.health.sanity !== null" class="health-item">
                    <i class="fas fa-brain has-text-info"></i> {{ cardObject.health.sanity }}
                  </span>
                </div>
              </div>

              <!-- Costo -->
              <div v-if="cardObject.cost.life !== null || cardObject.cost.sanity !== null" class="stat-item">
                <span class="stat-label">{{ textoInterfaz.costo }}:</span>
                <div class="cost-stats">
                  <span v-if="cardObject.cost.life !== null" class="cost-item">
                    <i class="fas fa-heart has-text-danger"></i> {{ cardObject.cost.life }}
                  </span>
                  <span v-if="cardObject.cost.sanity !== null" class="cost-item">
                    <i class="fas fa-brain has-text-info"></i> {{ cardObject.cost.sanity }}
                  </span>
                </div>
              </div>

              <!-- Precio -->
              <div v-if="cardObject.price !== null" class="stat-item">
                <span class="stat-label">{{ textoInterfaz.precio }}:</span>
                <span class="stat-value">
                  <i class="fas fa-dollar-sign has-text-warning"></i> {{ cardObject.price }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button @click="closeModal" class="button is-link is-fullwidth">
          {{ textoInterfaz.volver }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ver detalle de pertenencias",
  data(){
    return{
      textoInterfaz: {
        titulo: "",
        volver: "",
        manos: "",
        salud: "",
        costo: "",
        precio: ""
      },
      isZoomed: false
    }
  },
  computed: {
    cardObject() {
      return this.$store.state.detalleCartaObjeto || {};
    }
  },
  methods:{
    closeModal() {
      this.$store.state.verDetallePertenencia = false;
      this.isZoomed = false;
    },
    toggleZoom() {
      this.isZoomed = !this.isZoomed;
    },
    getCardName() {
      const language = this.$store.state.lenguaje;
      if (language === "español") {
        return this.cardObject.translations?.es?.name || "";
      } else if (language === "ingles") {
        return this.cardObject.translations?.en?.name || "";
      }
      return this.cardObject.translations?.es?.name || "";
    },
    getCardDescription() {
      const language = this.$store.state.lenguaje;
      if (language === "español") {
        return this.cardObject.translations?.es?.description || "";
      } else if (language === "ingles") {
        return this.cardObject.translations?.en?.description || "";
      }
      return this.cardObject.translations?.es?.description || "";
    },
    getTypeClass(type) {
      const typeClasses = {
        'objeto': 'is-success',     // Verde
        'hechizo': 'is-purple',     // Morado  
        'talento': 'is-grey',       // Gris
        'aliado': 'is-info',        // Azul
        'especial': 'is-warning'    // Naranja
      };
      
      const lowerType = type.toLowerCase();
      return typeClasses[lowerType] || 'is-light';
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "Detalle de Pertenencia";
        this.textoInterfaz.volver = "Volver";
        this.textoInterfaz.manos = "Manos";
        this.textoInterfaz.salud = "Salud";
        this.textoInterfaz.costo = "Costo";
        this.textoInterfaz.precio = "Precio";
      }else if(this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.titulo = "Belonging Detail";
        this.textoInterfaz.volver = "Go back";
        this.textoInterfaz.manos = "Hands";
        this.textoInterfaz.salud = "Health";
        this.textoInterfaz.costo = "Cost";
        this.textoInterfaz.precio = "Price";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style scoped>
.BGBendicion {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-detail-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-image-container {
  text-align: center;
}

.card-detail-image {
  max-width: 200px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-detail-image:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
}

.zoomed-image {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  cursor: default;
}

/* Transiciones para el zoom */
.zoom-fade-enter-active, .zoom-fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.zoom-fade-enter-from, .zoom-fade-leave-to {
  opacity: 0;
}

.zoom-scale-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.zoom-scale-enter-from {
  opacity: 0;
  transform: scale(0.3) rotate(10deg);
}

.zoom-scale-enter-to {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.card-info {
  flex: 1;
}

.card-name {
  color: #363636;
  font-weight: bold;
}

.card-types {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.tag.is-purple {
  background-color: #9b59b6;
  color: white;
}

.tag.is-grey {
  background-color: #95a5a6;
  color: white;
}

.card-description {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid #3273dc;
}

.card-stats {
  background-color: #fafafa;
  padding: 1rem;
  border-radius: 6px;
}

.stat-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-label {
  font-weight: 600;
  margin-right: 0.5rem;
  min-width: 60px;
}

.stat-value {
  font-weight: 500;
}

.health-stats, .cost-stats {
  display: flex;
  gap: 1rem;
}

.health-item, .cost-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.health-item i, .cost-item i {
  font-size: 0.8rem;
}

/* Responsive para móvil */
@media (max-width: 768px) {
  .modal-card {
    margin: 1rem;
    max-height: 90vh;
  }
  
  .card-detail-image {
    max-width: 150px;
  }
  
  .card-name {
    font-size: 1.2rem;
  }
  
  .card-description {
    padding: 0.75rem;
  }
  
  .health-stats, .cost-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>