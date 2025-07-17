<template>
  <div class="inv-card-container">
    <div class="cosmic-inv-card" :class="getExpansionClass()" @click="selectInv(investigator)">
      
      <!-- Stats superiores -->
      <div class="stats-container">
        <div class="stat-badge life-stat">
          <i class="fas fa-heart stat-icon"></i>
          <span class="stat-value">{{ investigator.baseData?.life || investigator.atributes.life }}</span>
        </div>
        <div class="stat-badge sanity-stat">
          <i class="fas fa-brain stat-icon"></i>
          <span class="stat-value">{{ investigator.baseData?.sanity || investigator.atributes.sanity }}</span>
        </div>
      </div>

      <!-- Efectos atmosféricos -->
      <div class="cosmic-overlay"></div>
      
      <!-- Imagen del investigador -->
      <div class="image-container">
        <img 
          :src="investigator.imgInv" 
          :alt="getInvestigatorName()" 
          class="investigator-image"
          @error="handleImageError"
        />
        <div class="image-vignette"></div>
      </div>
      
      <!-- Información del investigador -->
      <div class="info-container">
        <div class="info-frame">
          <h3 class="investigator-name">{{ getInvestigatorName() }}</h3>
          <p class="investigator-position">{{ getInvestigatorPosition() }}</p>
        </div>
      </div>
      
      <!-- Partículas místicas -->
      <div class="mystic-particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>
      
      <!-- Aura de expansión -->
      <div class="expansion-aura" :class="getExpansionClass()"></div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';

export default {
  name: 'InvestigatorCard',
  props: {
    investigator: { type: Object, required: true }
  },
  methods: {
    async selectInv(investigator) {
      try {
        // si existe una id, esque es un investigador OnLine, por lo cual no hace falta que hagamos ninguna llamada a back
        if (investigator.id) {
          this.$store.commit('setDatosInvestigator', investigator);
          this.$router.push('/DetallePersonaje');
          return;
        }
        const response = await apiService.obtainInvByID(investigator.idInv);
        await this.$store.commit('setDatosInvestigator', response);
        this.$router.push('/DetallePersonaje');
      } catch (error) {
        console.error("❌ selectInv(.vue) - No se pudo obtener el investigador", error);
      }
    },
    
    getExpansionClass() {
      if (!this.investigator || !this.investigator.expansion) return 'expansion-base';
      
      switch(this.investigator.expansion) {
        case 'AHBase': return 'expansion-base';
        case 'AHWaves': return 'expansion-waves';
        case 'AHNigth': return 'expansion-night';
        case 'AHSecrets': return 'expansion-secrets';
        case 'AHOriginal': return 'expansion-original';
        case 'AHComunity': return 'expansion-community';
        default: return 'expansion-base';
      }
    },
    
    getInvestigatorName() {
      if (!this.investigator) return 'Investigador';
      
      if (this.$store.state.lenguaje === 'español' && 
          this.investigator.translations && 
          this.investigator.translations.es && 
          this.investigator.translations.es.name) {
        return this.investigator.translations.es.name;
      }
      
      return this.investigator.name || 'Investigador';
    },
    
    getInvestigatorPosition() {
      if (!this.investigator) return '';
      
      if (this.$store.state.lenguaje === 'español' && 
          this.investigator.translations && 
          this.investigator.translations.es && 
          this.investigator.translations.es.position) {
        return this.investigator.translations.es.position;
      }
      
      return this.investigator.position || '';
    },
    
    handleImageError(event) {
      event.target.style.display = 'none';
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.inv-card-container {
  width: 100%;
  padding: 0.25rem;
}

/* Tarjeta cósmica de investigador */
.cosmic-inv-card {
  position: relative;
  width: 120px;
  height: 160px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.cosmic-inv-card:active {
  transform: scale(0.98);
}

/* Colores por expansión */
.expansion-base {
  border-color: #48c78e;
}

.expansion-waves {
  border-color: #3e8ed0;
}

.expansion-night {
  border-color: #ffdc7d;
}

.expansion-secrets {
  border-color: #f14668;
}

.expansion-original {
  border-color: #7957d5;
}

.expansion-community {
  border-color: #ff6b35;
}

/* Stats superiores */
.stats-container {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  display: flex;
  justify-content: space-between;
  z-index: 5;
}

.stat-badge {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  padding: 0.2rem 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.life-stat {
  border-color: rgba(220, 53, 69, 0.5);
}

.sanity-stat {
  border-color: rgba(52, 144, 220, 0.5);
}

.stat-icon {
  font-size: 0.8rem;
}

.life-stat .stat-icon {
  color: #dc3545;
}

.sanity-stat .stat-icon {
  color: #3490dc;
}

.stat-value {
  font-size: 0.9rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* Overlay atmosférico */
.cosmic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 30%, rgba(0, 100, 0, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(0, 50, 0, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* Contenedor de imagen */
.image-container {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.investigator-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.85) contrast(1.1) saturate(0.9);
  transition: all 0.3s ease;
}

.cosmic-inv-card:hover .investigator-image {
  filter: brightness(0.95) contrast(1.2) saturate(1.0);
  transform: scale(1.03);
}

/* Viñeta de imagen */
.image-vignette {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.7) 100%),
    radial-gradient(circle at center, transparent 50%, rgba(0, 0, 0, 0.3) 100%);
  pointer-events: none;
}

/* Información del investigador */
.info-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
}

.info-frame {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 0.9));
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.investigator-name {
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0 0 0.2rem 0;
  text-shadow: 
    1px 1px 2px rgba(0, 0, 0, 0.8),
    0 0 5px rgba(255, 255, 255, 0.3);
  font-family: 'Cinzel', serif;
  line-height: 1.1;
}

.investigator-position {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.65rem;
  margin: 0 0 0.3rem 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  font-style: italic;
  line-height: 1.1;
}

.expansion-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
}

.expansion-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 8px currentColor;
}

/* Colores de expansión para indicadores */
.expansion-indicator.expansion-base {
  color: #48c78e;
}

.expansion-indicator.expansion-waves {
  color: #3e8ed0;
}

.expansion-indicator.expansion-night {
  color: #ffdc7d;
}

.expansion-indicator.expansion-secrets {
  color: #f14668;
}

.expansion-indicator.expansion-original {
  color: #7957d5;
}

.expansion-indicator.expansion-community {
  color: #ff6b35;
}

/* Partículas místicas */
.mystic-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
  animation: mystic-float 5s ease-in-out infinite;
}

.particle:nth-child(1) {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.particle:nth-child(2) {
  top: 60%;
  right: 20%;
  animation-delay: 1.5s;
}

.particle:nth-child(3) {
  bottom: 30%;
  left: 70%;
  animation-delay: 3s;
}

@keyframes mystic-float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-6px) translateX(2px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-3px) translateX(-1px);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-8px) translateX(3px);
    opacity: 0.9;
  }
}

/* Aura de expansión */
.expansion-aura {
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.cosmic-inv-card:hover .expansion-aura {
  opacity: 1;
}

.expansion-aura.expansion-base {
  background: radial-gradient(circle at center, rgba(72, 199, 142, 0.15) 0%, transparent 70%);
}

.expansion-aura.expansion-waves {
  background: radial-gradient(circle at center, rgba(62, 142, 208, 0.15) 0%, transparent 70%);
}

.expansion-aura.expansion-night {
  background: radial-gradient(circle at center, rgba(255, 220, 125, 0.15) 0%, transparent 70%);
}

.expansion-aura.expansion-secrets {
  background: radial-gradient(circle at center, rgba(241, 70, 104, 0.15) 0%, transparent 70%);
}

.expansion-aura.expansion-original {
  background: radial-gradient(circle at center, rgba(121, 87, 213, 0.15) 0%, transparent 70%);
}

.expansion-aura.expansion-community {
  background: radial-gradient(circle at center, rgba(255, 107, 53, 0.15) 0%, transparent 70%);
}

/* Responsive */
@media (max-width: 360px) {
  .cosmic-inv-card {
    width: 110px;
    height: 150px;
  }
  
  .investigator-name {
    font-size: 0.75rem;
  }
  
  .investigator-position {
    font-size: 0.6rem;
  }
  
  .stat-badge {
    padding: 0.15rem 0.3rem;
  }
  
  .stat-value {
    font-size: 0.8rem;
  }
}
</style>