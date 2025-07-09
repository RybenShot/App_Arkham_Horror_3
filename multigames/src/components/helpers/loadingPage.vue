<template>
  <div class="loading-container">
    <!-- Fondo con textura -->
    <div class="texture-overlay"></div>
    
    <!-- Contenido principal -->
    <div class="main-content">
      <!-- Logo minimalista -->
      <div class="logo-container">
        <div class="logo-glow-effect"></div>
        <img src="@/assets/img/ArkhamHorrorLogo.png" alt="Arkham Horror" class="logo-image">
        <div class="logo-shadow"></div>
      </div>
      
      <!-- Indicador de carga -->
      <div class="loading-indicator">
        <div class="loading-bar">
          <div class="loading-fill"></div>
        </div>
        <p class="loading-text">Cargando...</p>
      </div>
      
      <!-- Información del artículo -->
      <div class="info-panel" :class="{ 'visible': articleVisible }">
        <div class="info-content">
          <div class="info-image">
            <img 
              :src="selected.img" 
              :alt="selected.title" 
              class="article-img"
              @error="onImageError"
            >
          </div>
          <div class="info-text">
            <h3 class="info-title">
              {{ $store.state.lenguaje == 'ingles' ? selected.title : selected.translations.es.title }}
            </h3>
            <p class="info-description">
              {{ $store.state.lenguaje == 'ingles' ? selected.description : selected.translations.es.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Elementos decorativos sutiles -->
    <div class="corner-decoration top-left"></div>
    <div class="corner-decoration top-right"></div>
    <div class="corner-decoration bottom-left"></div>
    <div class="corner-decoration bottom-right"></div>
  </div>
</template>
  
<script>
export default {
  name: 'LoadingPage',
  data() {
    return {
      articleVisible: false,
      articles: [
        {
          id: 0,
          title: "Hidden Character",
          description: "Can you find this playable character? Send us a screenshot on our Instagram if you manage to!",
          img: "/img/1-inv/57-Nameless.jpg",
          translations: {
            es: {
              title: "Personaje oculto",
              description: "¿Eres capaz de encontrar este personaje jugable? Mándanos a nuestro Instagram una captura si lo has logrado!",
            }
          }
        },
        {
          id: 1,
          title: "In the next update ...",
          description: "Online interaction with other players will be added.",
          img: "/img/5-otros/articulosPaginaDeCarga/grupoDeJugadores.png",
          translations: {
            es: {
              title: "En la siguiente actualización...",
              description: "Se añadirá interacción online con otros jugadores.",
            }
          }
        },
        {
          id: 2,
          title: "Do you want to collaborate on the project?",
          description: "Message us on Instagram and we'll see what we can do!",
          img: "/img/5-otros/articulosPaginaDeCarga/RexMurphy-te-busca.png",
          translations: {
            es: {
              title: "¿Quieres colaborar en el proyecto?",
              description: "Háblanos por Instagram y veremos qué podemos hacer!",
            }
          }
        },
        {
          id: 3,
          title: "Investigator quote ...",
          description: "Sometimes death is not the end.",
          img: "/img/1-inv/57-Nameless.jpg",
          translations: {
            es: {
              title: "Frase investigador...",
              description: "A veces, la muerte no es el final.",
            }
          }
        },
        {
          id: 4,
          title: "By Lovecraft ...",
          description: "That is not dead which can eternal lie",
          img: "https://imgs.search.brave.com/6xX1htpRvLhx_ze_hQZ99RWg1Wykl4RyI5cwsr8Nehw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8x/LzEwL0guX1AuX0xv/dmVjcmFmdCxfSnVu/ZV8xOTM0LmpwZw",
          translations: {
            es: {
              title: "By Lovecraft...",
              description: "No está muerto lo que puede yacer eternamente.",
            }
          }
        },
        {
          id: 5,
          title: "Share your game on Instagram!",
          description: "Upload screenshots of your most epic encounters and gain recognition in the community.",
          img: "/img/5-otros/articulosPaginaDeCarga/megafono.jpg",
          translations: {
            es: {
              title: "¡Comparte tu partida en Instagram!",
              description: "Sube capturas de tus encuentros más épicos y gana reconocimiento entre la comunidad.",
            }
          }
        },
        {
          id: 6,
          title: "Design a scenario",
          description: "Submit your own adventure or encounter and we might add it as an official fan-made scenario.",
          img: "/img/5-otros/articulosPaginaDeCarga/creadores.jpg",
          translations: {
            es: {
              title: "Diseña un escenario",
              description: "Envía tu propia aventura o encuentro y podríamos añadirlo como fan-made oficial.",
            }
          }
        },
        {
          id: 7,
          title: "Direct feedback",
          description: "Tell us what improvements you'd like to see or report any bugs: your voice matters in every update.",
          img: "/img/5-otros/articulosPaginaDeCarga/megafono.jpg",
          translations: {
            es: {
              title: "Feedback directo",
              description: "Cuéntanos qué mejoras quieres ver o reporta cualquier error: tu voz importa en cada actualización.",
            }
          }
        },
        {
          id: 8,
          title: "Special thanks …",
          description: "@eugenia1715, for collaborating many times via Buy Me a Coffee.",
          img: "/img/5-otros/articulosPaginaDeCarga/agradecimiento.jpg",
          translations: {
            es: {
              title: "Agradecimiento especial...",
              description: "@eugenia1715, por colaborar varias veces desde Buy Me a Coffee.",
            }
          }
        },
        {
          id: 9,
          title: "Special thanks …",
          description: "@gioff101, for collaborating via Buy Me a Coffee.",
          img: "/img/5-otros/articulosPaginaDeCarga/agradecimiento.jpg",
          translations: {
            es: {
              title: "Agradecimiento especial...",
              description: "@gioff101, por colaborar desde Buy Me a Coffee.",
            }
          }
        },
        {
          id: 10,
          title: "Special thanks …",
          description: "@arkhamhorrormemes, for collaborating via Buy Me a Coffee.",
          img: "/img/5-otros/articulosPaginaDeCarga/agradecimiento.jpg",
          translations: {
            es: {
              title: "Agradecimiento especial...",
              description: "@arkhamhorrormemes, por colaborar desde Buy Me a Coffee.",
            }
          }
        },
      ],
      selected: { title: '', description: '', img: '', translations: { es: { title: '', description: '' } } }
    };
  },
  methods: {
    pickRandomArticle() {
      const numRandom = Math.floor(Math.random() * this.articles.length);
      this.selected = this.articles[numRandom];
    },
    
    onImageError(event) {
      event.target.style.display = 'none';
    }
  },
  mounted() {
    this.pickRandomArticle();
    
    // Mostrar el artículo inmediatamente
    setTimeout(() => {
      this.articleVisible = true;
    }, 400);
  }
};
</script>

<style scoped>
/* Contenedor principal */
.loading-container {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0a0f0a 0%, #1a2e1a 30%, #0d1a0d 70%, #000000 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  max-width: 460px;
  margin: 0 auto;
  overflow: hidden;
}

/* Textura de fondo */
.texture-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(0, 255, 0, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(34, 139, 34, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 100, 0, 0.03) 0%, transparent 70%);
  pointer-events: none;
}

/* Contenido principal */
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
  z-index: 2;
}

/* Logo minimalista */
.logo-container {
  position: relative;
  margin-bottom: 3rem;
}

.logo-glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(0, 255, 0, 0.2) 0%, rgba(34, 139, 34, 0.1) 40%, transparent 70%);
  border-radius: 50%;
  animation: cosmic-pulse 3s ease-in-out infinite;
}

.logo-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  z-index: 1;
  position: relative;
  filter: 
    brightness(1.2) 
    contrast(1.3) 
    drop-shadow(0 0 20px rgba(0, 255, 0, 0.5))
    drop-shadow(0 0 40px rgba(34, 139, 34, 0.3))
    hue-rotate(120deg);
  animation: logo-hover 4s ease-in-out infinite alternate;
}

.logo-shadow {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 255, 0, 0.2) 0%, transparent 70%);
  z-index: -1;
  filter: blur(15px);
  animation: shadow-shift 3s ease-in-out infinite;
}

@keyframes cosmic-pulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1); 
    opacity: 0.3; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.1); 
    opacity: 0.5; 
  }
}

@keyframes logo-hover {
  0% { 
    transform: translateY(0px); 
    filter: brightness(1.2) contrast(1.3) drop-shadow(0 0 20px rgba(0, 255, 0, 0.5)) drop-shadow(0 0 40px rgba(34, 139, 34, 0.3)) hue-rotate(120deg);
  }
  100% { 
    transform: translateY(-8px); 
    filter: brightness(1.4) contrast(1.4) drop-shadow(0 0 25px rgba(0, 255, 0, 0.7)) drop-shadow(0 0 50px rgba(34, 139, 34, 0.4)) hue-rotate(120deg);
  }
}

@keyframes shadow-shift {
  0%, 100% { 
    transform: translateX(0px); 
    opacity: 0.3; 
  }
  50% { 
    transform: translateX(5px); 
    opacity: 0.5; 
  }
}

/* Indicador de carga */
.loading-indicator {
  width: 100%;
  max-width: 280px;
  margin-bottom: 2rem;
  text-align: center;
}

.loading-bar {
  width: 100%;
  height: 4px;
  background: rgba(0, 100, 0, 0.3);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.loading-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ff00, #228b22, #32cd32, #00ff00);
  width: 0%;
  animation: loading-progress 3s ease-in-out infinite;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

@keyframes loading-progress {
  0% { width: 0%; }
  50% { width: 100%; }
  100% { width: 0%; }
}

.loading-text {
  color: rgba(0, 255, 0, 0.8);
  font-family: 'Georgia', serif;
  font-size: 1rem;
  margin: 0;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

/* Panel de información */
.info-panel {
  width: 100%;
  max-width: 380px;
  background: rgba(10, 20, 10, 0.8);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
}

.info-panel.visible {
  opacity: 1;
  transform: translateY(0);
}

.info-content {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-image {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(0, 255, 0, 0.3);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

.article-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9) contrast(1.1);
}

.info-text {
  flex: 1;
  color: rgba(200, 255, 200, 0.9);
}

.info-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: rgba(0, 255, 0, 0.9);
  font-family: 'Georgia', serif;
  line-height: 1.3;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
}

.info-description {
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
  opacity: 0.8;
  font-family: 'Georgia', serif;
  color: rgba(200, 255, 200, 0.8);
}

/* Decoraciones en las esquinas */
.corner-decoration {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(0, 255, 0, 0.3);
  animation: corner-glow 4s ease-in-out infinite alternate;
}

@keyframes corner-glow {
  0% { 
    border-color: rgba(0, 255, 0, 0.2); 
    box-shadow: none; 
  }
  100% { 
    border-color: rgba(0, 255, 0, 0.5); 
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3); 
  }
}

.top-left {
  top: 20px;
  left: 20px;
  border-right: none;
  border-bottom: none;
}

.top-right {
  top: 20px;
  right: 20px;
  border-left: none;
  border-bottom: none;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
  border-right: none;
  border-top: none;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
  border-left: none;
  border-top: none;
}

/* Responsividad */
@media (max-width: 360px) {
  .main-content {
    padding: 1.5rem;
  }
  
  .logo-container {
    margin-bottom: 2rem;
  }
  
  .logo-image {
    width: 160px;
    height: 160px;
  }
  
  .logo-glow-effect {
    width: 220px;
    height: 220px;
  }
  
  .logo-shadow {
    width: 160px;
    height: 160px;
  }
  
  .info-content {
    flex-direction: column;
    text-align: center;
  }
  
  .info-image {
    align-self: center;
    margin-bottom: 1rem;
  }
  
  .corner-decoration {
    display: none;
  }
}

@media (max-width: 320px) {
  .info-panel {
    padding: 1rem;
  }
  
  .info-title {
    font-size: 1rem;
  }
  
  .info-description {
    font-size: 0.85rem;
  }
}
</style>