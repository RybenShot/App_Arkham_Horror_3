<template>
  <div class="cosmic-credits-container">
    <!-- Efectos atmosféricos de fondo -->
    <div class="cosmic-background">
      <div class="nebula-layer nebula-1"></div>
      <div class="nebula-layer nebula-2"></div>
      <div class="nebula-layer nebula-3"></div>
    </div>
    
    <!-- Partículas flotantes -->
    <div class="cosmic-particles">
      <div v-for="n in 15" :key="n" class="cosmic-particle" :style="getParticleStyle(n)"></div>
    </div>
    
    <!-- Wrapper de créditos -->
    <div class="credits-wrapper">
      <div class="credits-content">
        <!-- Título inicial -->
        <div class="credits-title">
          <div class="title-ornament">◈ ◇ ◈</div>
          <h1 class="main-title">{{ locale === 'español' ? 'CRÉDITOS' : 'CREDITS' }}</h1>
          <div class="title-ornament">◈ ◇ ◈</div>
        </div>
        
        <!-- Créditos individuales -->
        <div
          v-for="(credit, index) in credits"
          :key="index"
          class="credit-item"
          :class="{ 'special-credit': isSpecialCredit(credit) }"
        >
          <div class="credit-frame">
            <div class="frame-glow"></div>
            <h3 class="credit-role">
              {{ locale === 'español' ? credit.role.es : credit.role.en }}
            </h3>
            <p class="credit-name">
              {{ locale === 'español' ? credit.name.es : credit.name.en }}
            </p>
            <div class="credit-separator">◆</div>
          </div>
        </div>
        
        <!-- Final épico -->
        <div class="credits-finale">
          <div class="finale-ornament">
            <div class="ornament-line"></div>
            <div class="central-symbol">✦</div>
            <div class="ornament-line"></div>
          </div>
          <h2 class="finale-text">
            {{ locale === 'español' ? 'En las sombras aguardan...' : 'In the shadows they await...' }}
          </h2>
          <div class="finale-quote">
            <em>"{{ locale === 'español' ? 'No está muerto lo que puede yacer eternamente' : 'That is not dead which can eternal lie' }}"</em>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón de regreso mejorado -->
    <router-link to="/" class="cosmic-back-button">
      <div class="button-glow"></div>
      <i class="fas fa-arrow-left"></i>
      <span>{{ locale === 'español' ? 'Regresar' : 'Return' }}</span>
    </router-link>
    
    <!-- Viñeta de los bordes -->
    <div class="screen-vignette"></div>
  </div>
</template>

<script>
export default {
  name: "CreditsPage",
  computed: {
    locale() {
      return this.$store.state.lenguaje;
    }
  },
  data() {
    return {
      credits: [
        {
          role: { en: "Project's Instagram", es: "Instagram del proyecto" },
          name: { en: "@apparkhamhorror", es: "@apparkhamhorror" }
        },
        {
          role: { en: "Project Lead", es: "Líder de Proyecto" },
          name: { en: "Sebastián Jiménez", es: "Sebastián Jiménez" }
        },
        {
          role: { en: "Distributed by", es: "Distribuido por" },
          name: { en: "Fantasy Flight Games", es: "Fantasy Flight Games" }
        },
        {
          role: { en: "Game Designer", es: "Diseñador de Juego" },
          name: { en: "Nikki Valens", es: "Nikki Valens" }
        },
        {
          role: { en: "Principal Testers", es: "Principales Testers" },
          name: { en: "@eugenia1715 & @gioff101", es: "@eugenia1715 & @gioff101" }
        },
        {
          role: { en: "Special Thanks", es: "Agradecimientos Especiales" },
          name: { en: "All Brave Investigators", es: "Todos los Investigadores Valientes" }
        },
        {
          role: { en: "Inspiration", es: "Inspiración" },
          name: { en: "H.P. Lovecraft", es: "H.P. Lovecraft" }
        },
        {
          role: { en: "You", es: "Tú" },
          name: { en: "Thanks for playing!", es: "¡Gracias por jugar!" }
        }
      ]
    };
  },
  methods: {
    getParticleStyle(index) {
      const delay = Math.random() * 5;
      const duration = 8 + Math.random() * 12;
      const size = 1 + Math.random() * 3;
      const x = Math.random() * 100;
      const opacity = 0.3 + Math.random() * 0.4;
      
      return {
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: opacity
      };
    },
    
    isSpecialCredit(credit) {
      return credit.role.en === "Inspiration" || 
             credit.role.en === "You" || 
             credit.role.en === "Project Lead";
    }
  }
};
</script>

<style scoped>
/* Contenedor principal cósmico */
.cosmic-credits-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at center, #0a0f0a 0%, #000000 70%);
  color: #e0e0e0;
  overflow: hidden;
  font-family: 'Georgia', serif;
}

/* Fondo atmosférico */
.cosmic-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.nebula-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  animation: nebula-drift linear infinite;
}

.nebula-1 {
  background: radial-gradient(ellipse at 30% 20%, rgba(0, 100, 0, 0.2) 0%, transparent 50%);
  animation-duration: 40s;
}

.nebula-2 {
  background: radial-gradient(ellipse at 70% 80%, rgba(0, 150, 100, 0.15) 0%, transparent 60%);
  animation-duration: 60s;
  animation-direction: reverse;
}

.nebula-3 {
  background: radial-gradient(ellipse at 50% 50%, rgba(50, 50, 50, 0.1) 0%, transparent 70%);
  animation-duration: 80s;
}

@keyframes nebula-drift {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

/* Partículas cósmicas */
.cosmic-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.cosmic-particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
  animation: cosmic-float linear infinite;
}

@keyframes cosmic-float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-10vh) rotate(360deg);
    opacity: 0;
  }
}

/* Wrapper de créditos */
.credits-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.credits-content {
  position: absolute;
  width: 100%;
  top: 100%;
  animation: cosmic-scroll 45s linear infinite;
  z-index: 2;
}

@keyframes cosmic-scroll {
  0% { top: 100%; }
  100% { top: -150%; }
}

/* Título principal */
.credits-title {
  text-align: center;
  margin: 3rem 0 4rem 0;
}

.title-ornament {
  color: #00ff00;
  font-size: 1.5rem;
  margin: 1rem 0;
  text-shadow: 0 0 10px #00ff00;
  letter-spacing: 0.5rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(0, 255, 0, 0.5);
  margin: 0;
  letter-spacing: 0.3rem;
}

/* Items de créditos */
.credit-item {
  text-align: center;
  margin: 3rem 1rem;
  position: relative;
}

.credit-frame {
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 8px;
  padding: 2rem 1rem;
  max-width: 400px;
  margin: 0 auto;
  backdrop-filter: blur(5px);
}

.frame-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, transparent, rgba(0, 255, 0, 0.2), transparent);
  border-radius: 8px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.credit-item.special-credit .frame-glow {
  opacity: 1;
  animation: special-glow 3s ease-in-out infinite alternate;
}

@keyframes special-glow {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

.credit-role {
  font-size: 1.3rem;
  font-weight: bold;
  color: #00ff00;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.credit-name {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  font-style: italic;
}

.credit-separator {
  color: rgba(0, 255, 0, 0.6);
  font-size: 1.2rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
}

/* Finale épico */
.credits-finale {
  text-align: center;
  margin: 5rem 1rem 10rem 1rem;
}

.finale-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}

.ornament-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(0, 255, 0, 0.5), transparent);
}

.central-symbol {
  color: #00ff00;
  font-size: 2rem;
  margin: 0 2rem;
  text-shadow: 0 0 15px #00ff00;
  animation: symbol-pulse 2s ease-in-out infinite alternate;
}

@keyframes symbol-pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.2); }
}

.finale-text {
  font-size: 1.5rem;
  color: #fff;
  margin: 2rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.finale-quote {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

/* Botón de regreso cósmico */
.cosmic-back-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00ff00;
  color: #00ff00;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10;
  position: relative;
  overflow: hidden;
}

.button-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, transparent, rgba(0, 255, 0, 0.3), transparent);
  border-radius: 25px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cosmic-back-button:hover .button-glow {
  opacity: 1;
}

.cosmic-back-button:active {
  transform: scale(0.95);
  background: rgba(0, 255, 0, 0.1);
}

/* Viñeta de pantalla */
.screen-vignette {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%);
  pointer-events: none;
  z-index: 1;
}

/* Responsive */
@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
  
  .credit-role {
    font-size: 1.1rem;
  }
  
  .credit-name {
    font-size: 1rem;
  }
  
  .finale-text {
    font-size: 1.2rem;
  }
  
  .cosmic-back-button {
    bottom: 15px;
    right: 15px;
    padding: 0.5rem 1rem;
  }
  
  .credit-frame {
    padding: 1.5rem 0.75rem;
  }
}
</style>