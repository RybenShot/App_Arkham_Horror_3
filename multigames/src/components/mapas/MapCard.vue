<template>
  <div class="map-card-container">
    <div class="cosmic-card" :class="getExpansionClass()" @click="selectMap()">
      
      <!-- Botón de eliminar para mapas online -->
      <button v-if="map.id" class="delete-btn" @click.stop="deleteMapInPlay()">
        <i class="fas fa-times"></i>
      </button>

      <!-- Efectos atmosféricos -->
      <div class="cosmic-overlay"></div>
      <div class="shadow-tendrils"></div>
      
      <!-- Imagen del mapa -->
      <div class="image-container">
        <img 
          :src="map.BGMap" 
          :alt="getMapTitle()" 
          class="map-image"
          @error="handleImageError"
        />
        <div class="image-vignette"></div>
      </div>
      
      <!-- Título con efectos -->
      <div class="title-container">
        <div class="title-frame">
          
          <h3 class="map-title">{{ getMapTitle() }}</h3>
        </div>
      </div>
      
      <!-- Efectos de resplandor -->
      <div class="cosmic-glow" :class="getExpansionClass()"></div>
      
      <!-- Partículas flotantes -->
      <div class="particles">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';

export default {
  name: 'MapCard',
  props: {
    map: { type: Object, required: true }
  },
  methods: {
    async selectMap() {
      const idMap = this.map.idMap;
      const isModalJoin = this.$store.state.modalJoinMapInPlay
      let response
      
      if (isModalJoin || this.map.id) {
        response = await apiService.getMapInPlayByID(this.map.id);
      } else {
        response = await apiService.obtainMapByID(idMap);
      }

      if (response) {
        this.$store.commit('setDatosMapa', response);
        this.$router.push('/DetalleMapa');
      } else {
        console.error("No se pudo obtener el mapa");
      }
    },
    
    async deleteMapInPlay() {
      const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este mapa?");
      if (!confirmDelete) return;

      try {
        const idMapInPlay = this.map.id;
        const IDUserHost = this.$store.state.IDUserHost;

        const response = await apiService.deleteMapInPlay(idMapInPlay, IDUserHost);
        console.log("Mapa borrado:", response);
        location.reload();
      } catch (error) {
        console.error("Error al borrar el mapa:", error);
      }
    },
    
    getExpansionClass() {
      if (!this.map || !this.map.expansion) return 'base-expansion';
      
      switch(this.map.expansion) {
        case 'AHBase': return 'base-expansion';
        case 'AHWaves': return 'waves-expansion';
        case 'AHNigth': return 'night-expansion';
        case 'AHSecrets': return 'secrets-expansion';
        default: return 'base-expansion';
      }
    },
    
    getExpansionName() {
      if (!this.map || !this.map.expansion) return 'Base';
      
      switch(this.map.expansion) {
        case 'AHBase': return 'Base';
        case 'AHWaves': return 'Mareas';
        case 'AHNigth': return 'Noche';
        case 'AHSecrets': return 'Secretos';
        default: return 'Base';
      }
    },
    
    getMapTitle() {
      if (!this.map) return 'Mapa sin título';
      
      if (this.$store.state.lenguaje === 'español' && 
          this.map.translations && 
          this.map.translations.es && 
          this.map.translations.es.title) {
        return this.map.translations.es.title;
      }
      
      return this.map.title || 'Mapa sin título';
    },
    
    handleImageError(event) {
      event.target.style.display = 'none';
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.map-card-container {
  width: 100%;
}

/* Tarjeta cósmica */
.cosmic-card {
  position: relative;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  height: 180px;
  display: flex;
  flex-direction: column;
}

.cosmic-card:active {
  transform: scale(0.98);
}

/* Colores por expansión */
.base-expansion {
  border-color: #48c78e;
}

.waves-expansion {
  border-color: #3e8ed0;
}

.night-expansion {
  border-color: #ffdc7d;
}

.secrets-expansion {
  border-color: #485fc7;
}

/* Overlay atmosférico */
.cosmic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(0, 100, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0, 50, 0, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* Zarcillos de sombra */
.shadow-tendrils {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at top, transparent 40%, rgba(0, 0, 0, 0.3) 70%),
    radial-gradient(ellipse at bottom, transparent 40%, rgba(0, 0, 0, 0.3) 70%);
  pointer-events: none;
  z-index: 2;
}

/* Botón de eliminar */
.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(220, 53, 69, 0.8);
  border: 1px solid #dc3545;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  color: #fff;
  font-size: 0.8rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
}

.delete-btn:active {
  background: rgba(220, 53, 69, 1);
  transform: scale(0.9);
}

/* Contenedor de imagen */
.image-container {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) contrast(1.2) saturate(0.9);
  transition: all 0.3s ease;
}

.cosmic-card:hover .map-image {
  filter: brightness(0.9) contrast(1.3) saturate(1.1);
  transform: scale(1.05);
}

/* Viñeta de imagen */
.image-vignette {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none;
}

/* Contenedor del título */
.title-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
}

.title-frame {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 0.9));
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.25rem;
  backdrop-filter: blur(10px);
}

/* Esquinas del marco */
.frame-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.frame-corner.tl {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.frame-corner.tr {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

.frame-corner.bl {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

.frame-corner.br {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

/* Título */
.map-title {
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  text-align: center;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(255, 255, 255, 0.3);
  font-family: 'Georgia', serif;
  line-height: 1.2;
}

/* Indicador de expansión */
.expansion-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.expansion-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 10px currentColor;
}

.expansion-text {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* Colores de expansión para indicadores */
.expansion-indicator.base-expansion {
  color: #48c78e;
}

.expansion-indicator.waves-expansion {
  color: #3e8ed0;
}

.expansion-indicator.night-expansion {
  color: #ffdc7d;
}

.expansion-indicator.secrets-expansion {
  color: #485fc7;
}

/* Resplandor cósmico */
.cosmic-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.cosmic-card:hover .cosmic-glow {
  opacity: 1;
}

.cosmic-glow.base-expansion {
  background: radial-gradient(circle at center, rgba(72, 199, 142, 0.2) 0%, transparent 70%);
}

.cosmic-glow.waves-expansion {
  background: radial-gradient(circle at center, rgba(62, 142, 208, 0.2) 0%, transparent 70%);
}

.cosmic-glow.night-expansion {
  background: radial-gradient(circle at center, rgba(255, 220, 125, 0.2) 0%, transparent 70%);
}

.cosmic-glow.secrets-expansion {
  background: radial-gradient(circle at center, rgba(72, 95, 199, 0.2) 0%, transparent 70%);
}

/* Partículas flotantes */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 3;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float-particle 4s ease-in-out infinite;
}

.particle-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.particle-2 {
  top: 60%;
  right: 30%;
  animation-delay: 1.5s;
}

.particle-3 {
  bottom: 30%;
  left: 70%;
  animation-delay: 3s;
}

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0px);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-10px);
    opacity: 0.8;
  }
}

</style>