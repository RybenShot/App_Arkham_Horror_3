<template>
  <div class="log-container">

    <!-- Cabecera -->
    <div class="log-header columns is-mobile mb-0 pt-3">
      <div class="column is-3 p-0 has-text-centered" @click="$router.go(-1)">
        <i class="fa-2x fas fa-arrow-left has-text-white"></i>
      </div>
      <div class="column has-text-centered">
        <p class="title has-text-white mb-0">{{ es ? 'Logros' : 'Achievements' }}</p>
      </div>
      <div class="column is-3 p-0 has-text-centered">
        <router-link to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link>
      </div>
    </div>

    <!-- Monedas + avance -->
    <div class="log-summary">
      <div class="coin-counter" ref="coinCounter" :class="{ bump: counterBump }">
        <i class="fas fa-coins"></i>
        <span>{{ displayedCoins }}</span>
      </div>
      <div class="log-progress">
        <div class="log-progress-track">
          <div class="log-progress-fill" :style="{ width: progressPct + '%' }"></div>
        </div>
        <span class="log-progress-label">{{ desbloqueados }}/{{ total }}</span>
      </div>
    </div>

    <div v-if="!idUser" class="log-login-hint">
      <p>{{ es ? 'Inicia sesión para guardar tus logros.' : 'Sign in to save your achievements.' }}</p>
    </div>

    <!-- [TEST] botón temporal para desbloquear manualmente el siguiente nivel del logro de prueba -->
    <button v-if="idUser" class="dev-test-btn" :disabled="testCargando" @click="probarSiguienteNivel">
      <i class="fas fa-flask"></i>
      {{ es ? 'Prueba: desbloquear siguiente nivel' : 'Test: unlock next tier' }}
    </button>

    <!-- Lista de logros, en formato carta compacta -->
    <div class="log-list">
      <div
        v-for="item in achievementsConEstado"
        :key="item.id"
        class="log-card"
        :class="[`medal-${item.medal}`, cardStateClass(item)]"
      >
        <div class="log-icon">
          <i :class="item.unlocked ? item.icon : 'fas fa-lock'"></i>
        </div>

        <div class="log-body">
          <p class="log-title">
            {{ es ? item.titulo : item.title }}
            <span v-if="item.tierLabel" class="log-tier">· {{ item.tierLabel }}</span>
          </p>
          <p class="log-desc">{{ es ? item.descripcion : item.description }}</p>
        </div>

        <div class="log-reward">
          <i class="fas fa-medal medal-tag"></i>

          <button
            v-if="item.unlocked && !item.claimed"
            class="claim-btn"
            :disabled="claimingId === item.id"
            @click="reclamar(item, $event)"
          >
            <i v-if="claimingId === item.id" class="fas fa-spinner fa-spin"></i>
            <template v-else>+{{ item.coinsReward }} <i class="fas fa-coins"></i></template>
          </button>

          <span v-else class="reward-label">
            <i class="fas fa-coins"></i>{{ item.coinsReward }}
            <i v-if="item.claimed" class="fas fa-check reward-check"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="log-footer">
      <span>◈</span>
      <em>{{ es ? '"La gloria aguarda a quienes se atreven..."' : '"Glory awaits those who dare..."' }}</em>
      <span>◈</span>
    </div>

    <!-- Monedas volando hacia el contador al reclamar -->
    <teleport to="body">
      <i
        v-for="coin in flyingCoins"
        :key="coin.id"
        class="fas fa-coins flying-coin"
        :style="{ left: coin.left + 'px', top: coin.top + 'px', '--dx': coin.dx + 'px', '--dy': coin.dy + 'px', animationDelay: coin.delay + 'ms' }"
      ></i>
    </teleport>

  </div>
</template>

<script>
import { ACHIEVEMENTS, ensureAchievementsLoaded, unlockAchievement, claimAchievement, getAchievementCoins, getAchievementGroups } from '@/services/achievementsService.js';

let coinSeq = 0;

const MEDAL_LABEL_ES = { bronce: 'Bronce', plata: 'Plata', oro: 'Oro' };
const MEDAL_LABEL_EN = { bronce: 'Bronze', plata: 'Silver', oro: 'Gold' };

export default {
  name: 'LogrosView',
  data() {
    return {
      claimingId: null,
      flyingCoins: [],
      displayedCoins: 0,
      counterBump: false,
      testCargando: false,
    };
  },
  computed: {
    es() {
      return this.$store.state.lenguaje === 'español';
    },
    idUser() {
      return this.$store.state.IDUserHost;
    },
    total() {
      return ACHIEVEMENTS.length;
    },
    desbloqueados() {
      return this.achievementsConEstado.filter(a => a.unlocked).length;
    },
    progressPct() {
      return this.total ? Math.round((this.desbloqueados / this.total) * 100) : 0;
    },
    achievementsConEstado() {
      const unlocked = this.$store.state.achievements;
      const tamañoGrupo = {};
      getAchievementGroups().forEach(tiers => { tamañoGrupo[tiers[0].group] = tiers.length; });

      return ACHIEVEMENTS.map(def => {
        const encontrado = unlocked.find(u => u.id === def.id);
        const esMultiNivel = tamañoGrupo[def.group] > 1;
        return {
          ...def,
          unlocked: !!encontrado,
          unlockedAt: encontrado ? encontrado.unlockedAt : null,
          claimed: encontrado ? !!encontrado.claimed : false,
          coinsReward: getAchievementCoins(def),
          tierLabel: esMultiNivel ? (this.es ? MEDAL_LABEL_ES[def.medal] : MEDAL_LABEL_EN[def.medal]) : null,
        };
      });
    },
  },
  watch: {
    '$store.state.coins'(nuevo, viejo) {
      this.animarContador(viejo || 0, nuevo || 0);
    },
  },
  methods: {
    cardStateClass(item) {
      if (!item.unlocked) return 'locked';
      if (!item.claimed) return 'pending';
      return 'claimed';
    },

    async reclamar(item, event) {
      if (this.claimingId) return;
      const sourceRect = event.currentTarget.getBoundingClientRect();
      this.claimingId = item.id;
      const coinsGanadas = await claimAchievement(this.$store, item.id);
      this.claimingId = null;
      if (coinsGanadas) {
        this.lanzarMonedas(sourceRect, coinsGanadas);
      }
    },

    lanzarMonedas(sourceRect, coinsGanadas) {
      const counterEl = this.$refs.coinCounter;
      if (!counterEl) return;
      const targetRect = counterEl.getBoundingClientRect();
      const startX = sourceRect.left + sourceRect.width / 2;
      const startY = sourceRect.top + sourceRect.height / 2;
      const endX = targetRect.left + targetRect.width / 2;
      const endY = targetRect.top + targetRect.height / 2;

      const n = Math.min(coinsGanadas, 6);
      for (let i = 0; i < n; i++) {
        const id = coinSeq++;
        const jitterX = (Math.random() - 0.5) * 20;
        const jitterY = (Math.random() - 0.5) * 20;
        const delay = i * 70;
        this.flyingCoins.push({
          id,
          left: startX + jitterX,
          top: startY + jitterY,
          dx: endX - startX - jitterX,
          dy: endY - startY - jitterY,
          delay,
        });
        setTimeout(() => {
          this.flyingCoins = this.flyingCoins.filter(c => c.id !== id);
        }, 700 + delay);
      }

      setTimeout(() => {
        this.counterBump = true;
        setTimeout(() => { this.counterBump = false; }, 350);
      }, 500);
    },

    animarContador(desde, hasta) {
      if (desde === hasta) return;
      const duracion = 500;
      const inicio = performance.now();
      const paso = (ahora) => {
        const progreso = Math.min((ahora - inicio) / duracion, 1);
        this.displayedCoins = Math.round(desde + (hasta - desde) * progreso);
        if (progreso < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    },

    // [TEST] desbloquea manualmente el siguiente nivel (bronce → plata → oro) del logro de
    // prueba, para poder verificar la insignia "?", el giro al revelarla y el parpadeo al evolucionar.
    async probarSiguienteNivel() {
      if (!this.idUser || this.testCargando) return;
      const tiersPrueba = ACHIEVEMENTS.filter(a => a.group === 'logro_prueba').sort((a, b) => a.tier - b.tier);
      const desbloqueados = this.$store.state.achievements.map(a => a.id);
      const siguiente = tiersPrueba.find(t => !desbloqueados.includes(t.id));
      if (!siguiente) return;

      this.testCargando = true;
      await unlockAchievement(this.$store, siguiente.id);
      this.testCargando = false;
    },
  },
  mounted() {
    this.displayedCoins = this.$store.state.coins;
    ensureAchievementsLoaded(this.$store);
  },
};
</script>

<style scoped>
.log-container {
  min-height: 100vh;
  background-image: url(@/assets/img/ZZOtros/BGAH.jpg);
  background-size: cover;
  background-position: center;
  padding-bottom: 2rem;
  font-family: Georgia, serif;
}

.log-header {
  display: flex;
  align-items: center;
}

/* ─── Monedas + avance ───────────────────────────────────── */
.log-summary {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0.4rem 14px 1.1rem;
  max-width: 480px;
  margin: 0 auto;
}

.coin-counter {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 215, 0, 0.45);
  border-radius: 20px;
  padding: 5px 12px;
  color: #ffd700;
  font-weight: 700;
  font-size: 0.85rem;
  transition: transform 0.15s ease;
}
.coin-counter.bump { transform: scale(1.18); }

.log-progress {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.log-progress-track {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}
.log-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #cd7f32, #ffd700);
  border-radius: 4px;
  transition: width 0.4s ease;
}
.log-progress-label {
  font-size: 0.66rem;
  color: rgba(220, 210, 195, 0.7);
  white-space: nowrap;
}

.log-login-hint {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin: 0 16px 1rem;
}

/* [TEST] botón temporal de pruebas */
.dev-test-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 auto 1rem;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px dashed rgba(255, 255, 255, 0.28) !important;
  border-radius: 20px !important;
  color: rgba(220, 210, 195, 0.6) !important;
  font-size: 0.7rem !important;
  cursor: pointer !important;
}
.dev-test-btn:disabled { opacity: 0.4; cursor: default !important; }

/* ─── Lista ──────────────────────────────────────────────── */
.log-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 14px;
  max-width: 480px;
  margin: 0 auto;
}

.log-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(6, 3, 14, 0.85);
  border: 1px solid rgba(200, 144, 42, 0.55);
  border-radius: 10px;
  padding: 9px 12px;
  box-shadow: 0 0 12px rgba(200, 144, 42, 0.1);
}

.log-card.medal-oro    { --medal-color: #ffd700; --medal-soft: rgba(255, 215, 0, 0.4); }
.log-card.medal-plata  { --medal-color: #d7d9dd; --medal-soft: rgba(215, 217, 221, 0.4); }
.log-card.medal-bronce { --medal-color: #cd7f32; --medal-soft: rgba(205, 127, 50, 0.4); }

.log-card.pending {
  border-color: var(--medal-color);
  animation: pending-glow 1.7s ease-in-out infinite;
}
.log-card.claimed {
  border-color: var(--medal-color);
}
.log-card.locked {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: none;
  opacity: 0.55;
}

@keyframes pending-glow {
  0%, 100% { box-shadow: 0 0 8px var(--medal-soft); }
  50%      { box-shadow: 0 0 18px var(--medal-color); }
}

.log-icon {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 35% 30%, var(--medal-soft), rgba(0, 0, 0, 0.2));
  border: 1px solid var(--medal-color);
  color: var(--medal-color);
  font-size: 1.15rem;
}
.log-card.locked .log-icon {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.35);
}

.log-body {
  flex: 1;
  min-width: 0;
}

.log-title {
  margin: 0;
  color: #e8d5a3;
  font-size: 0.88rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.log-card.locked .log-title { color: rgba(255, 255, 255, 0.55); }
.log-tier {
  font-weight: 400;
  font-size: 0.82em;
  color: rgba(220, 210, 195, 0.55);
}

.log-desc {
  margin: 1px 0 0;
  color: rgba(220, 210, 200, 0.72);
  font-size: 0.7rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ─── Recompensa (medalla + monedas) ─────────────────────── */
.log-reward {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-width: 54px;
}

.medal-tag {
  color: var(--medal-color);
  font-size: 0.9rem;
}
.log-card.locked .medal-tag { color: rgba(255, 255, 255, 0.25); }

.reward-label {
  font-size: 0.66rem;
  color: rgba(220, 210, 195, 0.55);
  display: flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
}
.reward-label i.fa-coins { color: var(--medal-color); }
.log-card.locked .reward-label i.fa-coins { color: rgba(255, 255, 255, 0.25); }
.reward-check { color: #7fdc7f; margin-left: 2px; }

.claim-btn {
  background: var(--medal-soft) !important;
  border: 1px solid var(--medal-color) !important;
  color: #fff !important;
  border-radius: 14px !important;
  padding: 3px 9px !important;
  font-size: 0.7rem !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: transform 0.12s ease;
}
.claim-btn:active { transform: scale(0.92); }
.claim-btn:disabled { opacity: 0.6; cursor: default; }

/* ─── Footer ─────────────────────────────────────────────── */
.log-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 1.8rem;
  color: rgba(200, 144, 42, 0.45);
  font-size: 0.78rem;
  font-style: italic;
}

/* ─── Monedas voladoras ──────────────────────────────────── */
.flying-coin {
  position: fixed;
  z-index: 3000;
  color: #ffd700;
  font-size: 1.05rem;
  pointer-events: none;
  filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.75));
  animation: coin-fly 0.7s ease-in forwards;
}
@keyframes coin-fly {
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  60%  { opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0.3); opacity: 0; }
}
</style>
