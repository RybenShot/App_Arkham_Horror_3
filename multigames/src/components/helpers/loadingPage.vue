<template>
  <div class="void">

    <!-- Capas de estrellas -->
    <div class="stars s1"></div>
    <div class="stars s2"></div>
    <div class="stars s3"></div>
    <!-- Nebulosa de fondo -->
    <div class="nebula"></div>

    <!-- Contenido -->
    <div class="content">

      <!-- Sigilo + Logo -->
      <div class="sigil-wrap">
        <svg class="sigil" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="94" stroke="rgba(120,80,180,0.18)" stroke-width="0.8"/>
          <circle cx="100" cy="100" r="72" stroke="rgba(80,130,100,0.12)" stroke-width="0.5" stroke-dasharray="4 6"/>
          <line x1="100" y1="6"  x2="100" y2="194" stroke="rgba(120,80,180,0.08)" stroke-width="0.5"/>
          <line x1="6"   y1="100" x2="194" y2="100" stroke="rgba(120,80,180,0.08)" stroke-width="0.5"/>
          <line x1="33"  y1="33"  x2="167" y2="167" stroke="rgba(120,80,180,0.06)" stroke-width="0.5"/>
          <line x1="167" y1="33"  x2="33"  y2="167" stroke="rgba(120,80,180,0.06)" stroke-width="0.5"/>
          <!-- Puntos en los vértices del octagrama -->
          <circle cx="100" cy="6"   r="2" fill="rgba(140,90,200,0.3)"/>
          <circle cx="100" cy="194" r="2" fill="rgba(140,90,200,0.3)"/>
          <circle cx="6"   cy="100" r="2" fill="rgba(140,90,200,0.3)"/>
          <circle cx="194" cy="100" r="2" fill="rgba(140,90,200,0.3)"/>
          <circle cx="33"  cy="33"  r="2" fill="rgba(80,160,110,0.25)"/>
          <circle cx="167" cy="33"  r="2" fill="rgba(80,160,110,0.25)"/>
          <circle cx="33"  cy="167" r="2" fill="rgba(80,160,110,0.25)"/>
          <circle cx="167" cy="167" r="2" fill="rgba(80,160,110,0.25)"/>
        </svg>
        <img src="@/assets/img/ArkhamHorrorLogo.png" alt="Arkham Horror" class="logo">
      </div>

      <!-- Artículo como visión desde el vacío -->
      <div class="vision" :class="{ emerge: articleVisible }">
        <div class="vision-img-wrap">
          <img
            :src="selected.img"
            :alt="selected.title"
            class="vision-img"
            @error="e => e.target.style.display='none'"
          >
          <div class="vision-fade-top"></div>
          <div class="vision-fade-bot"></div>
        </div>
        <div class="vision-text">
          <p class="vision-label">— {{ $store.state.lenguaje == 'ingles' ? 'FROM THE VOID' : 'DESDE EL VACÍO' }} —</p>
          <h2 class="vision-title">
            {{ $store.state.lenguaje == 'ingles' ? selected.title : selected.translations.es.title }}
          </h2>
          <p class="vision-desc">
            {{ $store.state.lenguaje == 'ingles' ? selected.description : selected.translations.es.description }}
          </p>
        </div>
      </div>

    </div>

    <!-- Indicador de carga esquina -->
    <div class="loader">
      <span class="ldot" style="animation-delay:0s"></span>
      <span class="ldot" style="animation-delay:0.3s"></span>
      <span class="ldot" style="animation-delay:0.6s"></span>
    </div>

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
          translations: { es: { title: "Personaje oculto", description: "¿Eres capaz de encontrar este personaje jugable? Mándanos una captura a nuestro Instagram si lo logras." } }
        },
        {
          id: 1,
          title: "In the next update ...",
          description: "Online interaction with other players will be added.",
          img: "/img/5-otros/articulosPaginaDeCarga/grupoDeJugadores.png",
          translations: { es: { title: "En la siguiente actualización...", description: "Se añadirá interacción online con otros jugadores." } }
        },
        {
          id: 2,
          title: "Do you want to collaborate?",
          description: "Message us on Instagram and we'll see what we can do!",
          img: "/img/5-otros/articulosPaginaDeCarga/RexMurphy-te-busca.png",
          translations: { es: { title: "¿Quieres colaborar en el proyecto?", description: "Háblanos por Instagram y veremos qué podemos hacer." } }
        },
        {
          id: 3,
          title: "Investigator quote ...",
          description: "Sometimes death is not the end.",
          img: "/img/1-inv/57-Nameless.jpg",
          translations: { es: { title: "Frase investigador...", description: "A veces, la muerte no es el final." } }
        },
        {
          id: 4,
          title: "By Lovecraft ...",
          description: "That is not dead which can eternal lie.",
          img: "https://imgs.search.brave.com/6xX1htpRvLhx_ze_hQZ99RWg1Wykl4RyI5cwsr8Nehw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8x/LzEwL0guX1AuX0xv/dmVjcmFmdCxfSnVu/ZV8xOTM0LmpwZw",
          translations: { es: { title: "Lovecraft escribió...", description: "No está muerto lo que puede yacer eternamente." } }
        },
        {
          id: 5,
          title: "Share your game!",
          description: "Upload screenshots of your most epic encounters on Instagram.",
          img: "/img/5-otros/articulosPaginaDeCarga/megafono.jpg",
          translations: { es: { title: "¡Comparte tu partida!", description: "Sube capturas de tus encuentros más épicos en Instagram." } }
        },
        {
          id: 6,
          title: "Design a scenario",
          description: "Submit your own adventure and we might add it as an official fan-made scenario.",
          img: "/img/5-otros/articulosPaginaDeCarga/creadores.jpg",
          translations: { es: { title: "Diseña un escenario", description: "Envía tu propia aventura y podríamos añadirla como fan-made oficial." } }
        },
        {
          id: 7,
          title: "Direct feedback",
          description: "Tell us what improvements you'd like to see. Your voice matters in every update.",
          img: "/img/5-otros/articulosPaginaDeCarga/megafono.jpg",
          translations: { es: { title: "Feedback directo", description: "Cuéntanos qué mejoras quieres ver. Tu voz importa en cada actualización." } }
        },
        {
          id: 8,
          title: "Special thanks …",
          description: "@eugenia1715, for collaborating many times via Buy Me a Coffee.",
          img: "/img/5-otros/articulosPaginaDeCarga/agradecimiento.jpg",
          translations: { es: { title: "Agradecimiento especial...", description: "@eugenia1715, por colaborar varias veces desde Buy Me a Coffee." } }
        },
        {
          id: 9,
          title: "Special thanks …",
          description: "@gioff101, for collaborating via Buy Me a Coffee.",
          img: "/img/5-otros/articulosPaginaDeCarga/agradecimiento.jpg",
          translations: { es: { title: "Agradecimiento especial...", description: "@gioff101, por colaborar desde Buy Me a Coffee." } }
        },
        {
          id: 10,
          title: "Special thanks …",
          description: "@arkhamhorrormemes, for collaborating via Buy Me a Coffee.",
          img: "/img/5-otros/articulosPaginaDeCarga/agradecimiento.jpg",
          translations: { es: { title: "Agradecimiento especial...", description: "@arkhamhorrormemes, por colaborar desde Buy Me a Coffee." } }
        },
      ],
      selected: { title: '', description: '', img: '', translations: { es: { title: '', description: '' } } }
    };
  },
  methods: {
    pickRandomArticle() {
      const n = Math.floor(Math.random() * this.articles.length);
      this.selected = this.articles[n];
    },
  },
  mounted() {
    this.pickRandomArticle();
    setTimeout(() => { this.articleVisible = true; }, 600);
  }
};
</script>

<style scoped>
/* ── Fondo void ───────────────────────────────────────── */
.void {
  position: fixed;
  inset: 0;
  background: #00000a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  max-width: 460px;
  margin: 0 auto;
  overflow: hidden;
  font-family: 'Georgia', 'Times New Roman', serif;
}

/* ── Estrellas: 3 capas ───────────────────────────────── */
.stars {
  position: absolute;
  inset: -50%;
  background-repeat: repeat;
  animation: drift 90s linear infinite;
}

.s1 {
  background-image:
    radial-gradient(0.5px 0.5px at 12%  8%,  rgba(255,255,255,0.9) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 28% 22%,  rgba(255,255,255,0.6) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 47% 14%,  rgba(255,255,255,0.8) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 63% 35%,  rgba(255,255,255,0.7) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 82% 18%,  rgba(255,255,255,0.9) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at  7% 52%,  rgba(255,255,255,0.5) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 91% 61%,  rgba(255,255,255,0.7) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 35% 73%,  rgba(255,255,255,0.6) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 74% 88%,  rgba(255,255,255,0.8) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 19% 91%,  rgba(255,255,255,0.5) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 55% 95%,  rgba(255,255,255,0.7) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 88% 42%,  rgba(255,255,255,0.6) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at  3% 77%,  rgba(255,255,255,0.8) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 42% 48%,  rgba(255,255,255,0.4) 0.5px, transparent 0),
    radial-gradient(0.5px 0.5px at 67% 66%,  rgba(255,255,255,0.6) 0.5px, transparent 0);
  background-size: 200px 200px;
  animation-duration: 120s;
  opacity: 0.7;
}

.s2 {
  background-image:
    radial-gradient(1px 1px at 20% 30%,  rgba(200,210,255,0.7) 1px, transparent 0),
    radial-gradient(1px 1px at 55% 12%,  rgba(220,200,255,0.6) 1px, transparent 0),
    radial-gradient(1px 1px at 78% 55%,  rgba(200,240,220,0.5) 1px, transparent 0),
    radial-gradient(1px 1px at 10% 68%,  rgba(200,210,255,0.7) 1px, transparent 0),
    radial-gradient(1px 1px at 90% 25%,  rgba(255,220,200,0.4) 1px, transparent 0),
    radial-gradient(1px 1px at 38% 82%,  rgba(200,210,255,0.6) 1px, transparent 0),
    radial-gradient(1px 1px at 65% 90%,  rgba(220,240,210,0.5) 1px, transparent 0);
  background-size: 300px 300px;
  animation-duration: 80s;
  animation-direction: reverse;
  opacity: 0.55;
}

.s3 {
  background-image:
    radial-gradient(1.5px 1.5px at 15% 20%, rgba(255,255,255,0.9) 1px, transparent 0),
    radial-gradient(1.5px 1.5px at 72% 10%, rgba(180,200,255,0.8) 1px, transparent 0),
    radial-gradient(1.5px 1.5px at 40% 60%, rgba(220,255,220,0.7) 1px, transparent 0),
    radial-gradient(1.5px 1.5px at 85% 75%, rgba(255,255,255,0.9) 1px, transparent 0),
    radial-gradient(1.5px 1.5px at  5% 90%, rgba(200,220,255,0.7) 1px, transparent 0);
  background-size: 400px 400px;
  animation-duration: 60s;
  opacity: 0.45;
  animation: drift 60s linear infinite, twinkle 5s ease-in-out infinite alternate;
}

@keyframes drift {
  from { transform: translateY(0); }
  to   { transform: translateY(33%); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.35; }
  50%       { opacity: 0.65; }
}

/* ── Nebulosa ─────────────────────────────────────────── */
.nebula {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 40% at 20% 30%,  rgba(60, 20, 90, 0.22)  0%, transparent 70%),
    radial-gradient(ellipse 50% 60% at 80% 70%,  rgba(10, 60, 40, 0.18)  0%, transparent 65%),
    radial-gradient(ellipse 80% 30% at 50% 100%, rgba(40, 10, 60, 0.15)  0%, transparent 60%);
  pointer-events: none;
}

/* ── Contenido central ────────────────────────────────── */
.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1.5rem;
  gap: 2.2rem;
}

/* ── Sigilo + Logo ────────────────────────────────────── */
.sigil-wrap {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sigil {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: sigil-rotate 40s linear infinite;
}

@keyframes sigil-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.logo {
  position: relative;
  z-index: 1;
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter:
    brightness(0.9)
    contrast(1.2)
    drop-shadow(0 0 18px rgba(100, 60, 160, 0.7))
    drop-shadow(0 0 40px rgba(50, 100, 70, 0.3));
  animation: logo-breathe 5s ease-in-out infinite alternate;
}

@keyframes logo-breathe {
  0%   { filter: brightness(0.85) contrast(1.1) drop-shadow(0 0 12px rgba(90,50,150,0.5))  drop-shadow(0 0 30px rgba(40,90,60,0.25)); }
  100% { filter: brightness(1.05) contrast(1.2) drop-shadow(0 0 28px rgba(120,70,200,0.8)) drop-shadow(0 0 60px rgba(50,120,80,0.4)); }
}

/* ── Visión: el artículo ──────────────────────────────── */
.vision {
  width: 100%;
  max-width: 340px;
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.vision.emerge {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.vision-img-wrap {
  position: relative;
  width: 100%;
  height: 200px;
}

.vision-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.65) contrast(1.1) saturate(0.6);
}

.vision-fade-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 60px;
  background: linear-gradient(to bottom, #00000a, transparent);
  pointer-events: none;
}

.vision-fade-bot {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 80px;
  background: linear-gradient(to top, #00000a, transparent);
  pointer-events: none;
}

.vision-text {
  padding: 0.5rem 0.2rem 0;
  text-align: center;
}

.vision-label {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: rgba(120, 80, 180, 0.6);
  margin: 0 0 0.5rem;
  font-style: normal;
  text-transform: uppercase;
}

.vision-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: rgba(220, 210, 240, 0.92);
  margin: 0 0 0.5rem;
  line-height: 1.3;
  letter-spacing: 0.02em;
  text-shadow: 0 0 20px rgba(120, 80, 180, 0.4);
}

.vision-desc {
  font-size: 0.78rem;
  color: rgba(160, 180, 160, 0.6);
  margin: 0;
  line-height: 1.6;
  font-style: italic;
}

/* ── Loading corner ───────────────────────────────────── */
.loader {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 5px;
  align-items: center;
  z-index: 3;
}

.ldot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(120, 80, 180, 0.8);
  box-shadow: 0 0 6px rgba(120, 80, 180, 0.6);
  animation: ldot-pulse 1.4s ease-in-out infinite;
}

@keyframes ldot-pulse {
  0%, 80%, 100% { opacity: 0.15; transform: scale(0.7); }
  40%           { opacity: 1;    transform: scale(1.2); }
}
</style>