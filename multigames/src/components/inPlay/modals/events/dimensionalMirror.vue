<template>
  <div class="mirror-overlay">

    <!-- STAGE 0: Error de realidad -->
    <transition name="fade">
      <div v-if="stage === 0" class="stage stage-zero">
        <p class="error-code">0x̷͔͝4̷̖̚4̵̺̄</p>
        <p class="error-tag glitch" data-text="ERROR EN EL TEJIDO">ERROR EN EL TEJIDO</p>
        <p class="error-sub">DE LA REALIDAD</p>
      </div>
    </transition>

    <!-- STAGE 1+: Revelación completa -->
    <transition name="fade">
      <div v-if="stage >= 1" class="stage stage-main">

        <header class="mirror-header">
          <p class="mirror-eyebrow">— EVENTO OCULTO —</p>
          <h1 class="mirror-title glitch" data-text="𖥠 EL ESPEJO DIMENSIONAL 𖥠">𖥠 EL ESPEJO DIMENSIONAL 𖥠</h1>
        </header>

        <!-- Retratos -->
        <div class="portraits-row">
          <div class="portrait-slot">
            <img :src="invImg" class="portrait-img" />
            <p class="portrait-name">{{ invName }}</p>
            <p class="portrait-label">Tú</p>
          </div>

          <div class="rift-center">
            <div class="rift-line"></div>
            <i class="fas fa-exclamation-triangle rift-icon"></i>
            <div class="rift-line"></div>
          </div>

          <div class="portrait-slot">
            <img :src="invImg" class="portrait-img portrait-mirrored" />
            <p class="portrait-name">{{ invName }}</p>
            <p class="portrait-label has-text-danger">¿Tú?</p>
          </div>
        </div>

        <!-- Texto que aparece en stage 2 -->
        <transition name="fade-up">
          <div v-if="stage >= 2" class="mirror-lore">
            <p>"Lo reconoces al instante."</p>
            <p class="mt-1">"Tu cara. Tu ropa. Tu mirada."</p>
            <p class="mt-1">"Pero <em>tú</em> no estás mirando desde ahí."</p>
            <p class="mt-2 has-text-danger has-text-weight-bold">"¿O sí?"</p>
          </div>
        </transition>

        <!-- Consecuencias en stage 3 -->
        <transition name="fade-up">
          <div v-if="stage >= 3" class="consequences-box">
            <p class="consequences-title">⚠ CONSECUENCIAS ⚠</p>
            <p class="consequences-sub">Los Primigenios no permiten paradojas.</p>

            <div class="effect-row">
              <span class="effect-icon"><i class="fas fa-brain"></i></span>
              <span class="effect-text">Cordura</span>
              <span class="effect-value has-text-danger">−{{ sanityCost }}</span>
            </div>
            <div class="effect-row">
              <span class="effect-icon"><i class="fas fa-eye"></i></span>
              <span class="effect-text">Estado</span>
              <span class="effect-value has-text-danger">Señalado por el Primigenio</span>
            </div>

            <button class="button close-btn is-fullwidth mt-4" @click="closeMirror">
              <i class="fas fa-times-circle mr-2"></i>Cerrar — si puedes
            </button>
          </div>
        </transition>

      </div>
    </transition>

  </div>
</template>

<script>
import { apiService } from '@/services/api.js'
import { invitationService } from '@/services/invitationService.js'

const SANITY_COST = 2

export default {
  name: 'EventoEspejosDimensional',

  data() {
    return {
      stage: 0,
      sanityCost: SANITY_COST,
      invImg: '',
      invName: ''
    }
  },

  methods: {
    advanceStage() {
      const delays = [1600, 2200, 2600]
      delays.forEach((delay, i) => {
        setTimeout(() => { this.stage = i + 1 }, delay)
      })
    },

    applyEffects() {
      const pj = this.$store.state.datosPJactual
      if (pj?.atributes) {
        pj.atributes.sanity = Math.max(1, (pj.atributes.sanity || 0) - SANITY_COST)
      }
      this.$store.state.EstadoSeñalado = true
      this.saveInv()
    },

    async saveInv() {
      try {
        const idUser = this.$store.state.IDUserHost
        const payload = { ...this.$store.state.datosPJactual, idUser }
        await apiService.postInvOnLine(payload)
      } catch (e) {
        console.error('❌ [dimensionalMirror] saveInv:', e)
      }
    },

    closeMirror() {
      this.applyEffects()
      this.$store.state.showSwithcherEventsOnLine = false
      this.$store.state.showGuestInvitationModal = false
      invitationService.resumePollingGeneral()
    }
  },

  mounted() {
    const interaction = this.$store.state.interactionData
    const invData = interaction?.event?.invDataHost

    this.invImg = invData?.imgInv || ''
    this.invName = invData?.name || invData?.nameInv || '???'

    this.advanceStage()
  }
}
</script>

<style scoped>
/* ── Base overlay ── */
.mirror-overlay {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.stage {
  width: 100%;
  max-width: 480px;
  padding: 2rem 1.5rem;
  text-align: center;
}

/* ── Stage 0: error ── */
.stage-zero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  animation: flicker 0.15s infinite alternate;
}
.error-code {
  font-size: 0.7rem;
  color: #ff0033;
  letter-spacing: 0.4em;
  opacity: 0.6;
}
.error-tag {
  font-size: 2.2rem;
  font-weight: 900;
  color: #ff0033;
  letter-spacing: 0.1em;
}
.error-sub {
  font-size: 0.9rem;
  color: #ff6680;
  letter-spacing: 0.3em;
}

/* ── Stage main ── */
.mirror-header {
  margin-bottom: 1.5rem;
}
.mirror-eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  color: #6b21a8;
  margin-bottom: 0.4rem;
}
.mirror-title {
  font-size: 1.3rem;
  font-weight: 900;
  color: #c084fc;
  letter-spacing: 0.05em;
  text-shadow: 0 0 12px #7c3aed;
}

/* ── Portraits ── */
.portraits-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 1.5rem;
}
.portrait-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}
.portrait-img {
  width: 80px;
  height: auto;
  border-radius: 8px;
  border: 2px solid #7c3aed;
  display: block;
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.6);
}
.portrait-mirrored {
  transform: scaleX(-1);
  border-color: #dc2626;
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.6);
  filter: saturate(0.7) hue-rotate(180deg);
  animation: portrait-flicker 3s ease-in-out infinite;
}
.portrait-name {
  font-size: 0.7rem;
  color: #a78bfa;
  margin-top: 0.4rem;
  font-weight: 600;
}
.portrait-label {
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: #6b7280;
  margin-top: 0.1rem;
}

/* ── Rift between portraits ── */
.rift-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0 0.5rem;
}
.rift-line {
  width: 2px;
  height: 30px;
  background: linear-gradient(to bottom, transparent, #dc2626, transparent);
  animation: rift-pulse 1.5s ease-in-out infinite;
}
.rift-icon {
  color: #dc2626;
  font-size: 1.1rem;
  animation: rift-pulse 1.5s ease-in-out infinite;
}

/* ── Lore text ── */
.mirror-lore {
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.25);
  border-radius: 8px;
  padding: 1rem 1.2rem;
  font-size: 0.9rem;
  color: #d1d5db;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.2rem;
}

/* ── Consequences ── */
.consequences-box {
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 8px;
  padding: 1rem 1.2rem;
}
.consequences-title {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #dc2626;
  font-weight: 700;
  margin-bottom: 0.3rem;
}
.consequences-sub {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-bottom: 0.8rem;
  font-style: italic;
}
.effect-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0;
  border-top: 1px solid rgba(220, 38, 38, 0.15);
  font-size: 0.85rem;
}
.effect-icon {
  width: 1.4rem;
  text-align: center;
  color: #dc2626;
}
.effect-text {
  flex: 1;
  color: #d1d5db;
}
.effect-value {
  font-weight: 700;
  font-size: 0.9rem;
}
.close-btn {
  background: #1c0a2e;
  border: 1px solid #7c3aed;
  color: #c084fc;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  transition: all 0.2s;
}
.close-btn:hover {
  background: #2d1b69;
  color: #fff;
  border-color: #a855f7;
}

/* ── Glitch effect ── */
.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.glitch::before {
  color: #ff0033;
  animation: glitch-1 2.4s infinite;
  clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
}
.glitch::after {
  color: #00ffff;
  animation: glitch-2 2.4s infinite;
  clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
}

/* ── Animations ── */
@keyframes glitch-1 {
  0%, 90%, 100% { transform: none; opacity: 0; }
  91%           { transform: translateX(-3px); opacity: 0.8; }
  93%           { transform: translateX(3px);  opacity: 0.8; }
  95%           { transform: translateX(-2px); opacity: 0.8; }
  97%           { transform: none; opacity: 0; }
}
@keyframes glitch-2 {
  0%, 92%, 100% { transform: none; opacity: 0; }
  93%           { transform: translateX(3px);  opacity: 0.8; }
  95%           { transform: translateX(-3px); opacity: 0.8; }
  97%           { transform: translateX(2px);  opacity: 0.8; }
  99%           { transform: none; opacity: 0; }
}
@keyframes flicker {
  from { opacity: 1; }
  to   { opacity: 0.85; }
}
@keyframes rift-pulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50%       { opacity: 1;   transform: scaleY(1.1); }
}
@keyframes portrait-flicker {
  0%, 96%, 100% { opacity: 1; }
  97%            { opacity: 0.3; }
  98%            { opacity: 1; }
  99%            { opacity: 0.5; }
}

/* ── Transitions ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.fade-up-enter-active { transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-up-enter-from   { opacity: 0; transform: translateY(12px); }
</style>
