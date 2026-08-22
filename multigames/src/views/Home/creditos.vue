<template>
  <div class="cred-container">

    <!-- Cabecera -->
    <div class="cred-header columns is-mobile mb-0 pt-3">
      <div class="column is-3 p-0 has-text-centered" @click="$router.go(-1)">
        <i class="fa-2x fas fa-arrow-left has-text-white"></i>
      </div>
      <div class="column has-text-centered">
        <p class="title has-text-white mb-0">{{ locale === 'español' ? 'Créditos' : 'Credits' }}</p>
      </div>
      <div class="column is-3 p-0 has-text-centered">
        <router-link to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link>
      </div>
    </div>

    <!-- Créditos, en movimiento de abajo hacia arriba (como al final de una película) -->
    <div class="cred-crawl-viewport">
      <div class="cred-crawl-content">
        <div class="cred-title-ornament">◈ ◇ ◈</div>
        <p class="cred-subtitle">{{ locale === 'español' ? 'Quiénes hicieron posible esta pesadilla' : 'Who made this nightmare possible' }}</p>

        <!-- Lista de créditos -->
        <div class="cred-list">
          <div
            v-for="(credit, index) in credits"
            :key="index"
            class="cred-card"
            :class="{ special: isSpecialCredit(credit) }"
          >
            <p class="cred-role">{{ locale === 'español' ? credit.role.es : credit.role.en }}</p>
            <p class="cred-name">{{ locale === 'español' ? credit.name.es : credit.name.en }}</p>
          </div>
        </div>

        <!-- Cierre -->
        <div class="cred-finale">
          <div class="cred-finale-divider"><span>✦</span></div>
          <h2 class="cred-finale-text">
            {{ locale === 'español' ? 'En las sombras aguardan...' : 'In the shadows they await...' }}
          </h2>
          <p class="cred-finale-quote">
            <em>"{{ locale === 'español' ? 'No está muerto lo que puede yacer eternamente' : 'That is not dead which can eternal lie' }}"</em>
          </p>
        </div>
      </div>
    </div>

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
    isSpecialCredit(credit) {
      return credit.role.en === "Inspiration" ||
             credit.role.en === "You" ||
             credit.role.en === "Project Lead";
    }
  }
};
</script>

<style scoped>
.cred-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(@/assets/img/ZZOtros/BGAH.jpg);
  background-size: cover;
  background-position: center;
  font-family: Georgia, serif;
  overflow: hidden;
}

.cred-header {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

/* ─── Viewport del crawl ─────────────────────────────────── */
.cred-crawl-viewport {
  position: relative;
  flex: 1;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
}

.cred-crawl-content {
  position: absolute;
  width: 100%;
  top: 100%;
  animation: cred-crawl 42s linear infinite;
}

@keyframes cred-crawl {
  0%   { top: 100%; }
  100% { top: -200%; }
}

.cred-title-ornament {
  text-align: center;
  color: rgba(200, 144, 42, 0.6);
  font-size: 1rem;
  letter-spacing: 0.4rem;
  margin: 0.4rem 0 0.2rem;
}

.cred-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  margin: 0 0 1.4rem;
  font-style: italic;
}

/* ─── Lista de créditos ──────────────────────────────────── */
.cred-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 14px;
  max-width: 420px;
  margin: 0 auto;
}

.cred-card {
  text-align: center;
  background: rgba(6, 3, 14, 0.82);
  border: 1px solid rgba(200, 144, 42, 0.35);
  border-radius: 8px;
  padding: 12px 16px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.cred-card.special {
  border-color: rgba(200, 144, 42, 0.7);
  box-shadow: 0 0 16px rgba(200, 144, 42, 0.18);
}

.cred-role {
  color: #c8902a;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 4px;
}

.cred-name {
  color: #e8d5a3;
  font-size: 1rem;
  font-style: italic;
  margin: 0;
}

/* ─── Cierre ─────────────────────────────────────────────── */
.cred-finale {
  text-align: center;
  margin: 2.6rem 1rem 0;
}

.cred-finale-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 260px;
  margin: 0 auto 1.2rem;
  color: rgba(200, 144, 42, 0.7);
  font-size: 1.1rem;
}

.cred-finale-divider::before,
.cred-finale-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(200, 144, 42, 0.5), transparent);
}

.cred-finale-text {
  color: #e8d5a3;
  font-size: 1.15rem;
  margin: 0 0 0.8rem;
}

.cred-finale-quote {
  color: rgba(220, 210, 200, 0.75);
  font-size: 0.9rem;
  font-style: italic;
  margin: 0;
}

/* ─── Responsive ─────────────────────────────────────────── */
@media (max-width: 480px) {
  .cred-name {
    font-size: 0.92rem;
  }

  .cred-finale-text {
    font-size: 1.05rem;
  }
}
</style>
