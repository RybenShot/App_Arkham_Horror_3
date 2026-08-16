<template>
  <div class="inv-card-container">
    <div class="cosmic-inv-card" :class="getExpansionClass()" @click="selectInv(investigator)">

      <!-- Botón de eliminar para mapas online -->
      <button v-if="this.$route.path === '/profile'" class="delete-btn" @click.stop="deleteInvInPlay()">
        <i class="fas fa-times"></i>
      </button>

      <!-- Imagen del investigador -->
      <div class="image-container">
        <img
          :src="investigator.imgInv"
          :alt="getInvestigatorName()"
          class="investigator-image"
          @error="handleImageError"
        />
        <!-- Viñeta éldritch: oscurece bordes con tinte violáceo -->
        <div class="eldritch-vignette"></div>
      </div>

      <!-- Overlay atmosférico cósmico -->
      <div class="void-overlay"></div>

      <!-- Nombre del investigador — sin fondo, glow éldritch -->
      <div class="inv-name-wrap">
        <p class="inv-name">{{ getInvestigatorName() }}</p>
      </div>

      <!-- Vida y cordura en esquinas inferiores -->
      <div class="stat-life">
        <i class="fas fa-heart s-icon"></i>
        <span class="s-val">{{ investigator.baseData?.life || investigator.atributes.life }}</span>
      </div>
      <div class="stat-sanity">
        <i class="fas fa-brain s-icon"></i>
        <span class="s-val">{{ investigator.baseData?.sanity || investigator.atributes.sanity }}</span>
      </div>

      <!-- Aura de expansión en hover -->
      <div class="expansion-aura" :class="getExpansionClass()"></div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';
import { audioService_effects } from '@/services/GestionAudio/audioService_effects.js';

export default {
  name: 'InvestigatorCard',
  props: {
    investigator: { type: Object, required: true }
  },
  methods: {
    SonidoTecla() { audioService_effects.playTecla() },
    async selectInv(investigator) {
      try {
        if (investigator.id) {
          this.$store.commit('setDatosInvestigator', investigator);
          this.$router.push('/DetallePersonaje');
          return;
        }
        const response = await apiService.obtainInvByID(investigator.idInv);
        await this.$store.commit('setDatosInvestigator', response);
        this.$store.state.modalInvOnLine = false;
        this.SonidoTecla();
        this.$router.push('/DetallePersonaje');
      } catch (error) {
        console.error('❌ selectInv - No se pudo obtener el investigador', error);
      }
    },

    getExpansionClass() {
      if (!this.investigator?.expansion) return 'expansion-base';
      const map = {
        AHBase:      'expansion-base',
        AHWaves:     'expansion-waves',
        AHNigth:     'expansion-night',
        AHSecrets:   'expansion-secrets',
        AHOriginal:  'expansion-original',
        AHComunity:  'expansion-community',
      };
      return map[this.investigator.expansion] || 'expansion-base';
    },

    async deleteInvInPlay() {
      if (!window.confirm('¿Estás seguro de que quieres borrar este investigador?')) return;
      try {
        await apiService.deleteInvOnLine(this.investigator.id, this.$store.state.IDUserHost);
        location.reload();
      } catch (error) {
        console.error('Error al borrar el investigador:', error);
      }
    },

    getInvestigatorName() {
      if (!this.investigator) return 'Investigador';
      const es = this.investigator.translations?.es;
      if (this.$store.state.lenguaje === 'español' && es?.name) return es.name;
      return this.investigator.name || 'Investigador';
    },

    handleImageError(event) {
      event.target.style.display = 'none';
    }
  }
};
</script>

<style scoped>
/* ─── Contenedor ──────────────────────────────────────────── */
.inv-card-container {
  width: 100%;
  padding: 0.15rem;
}

/* ─── Carta base ──────────────────────────────────────────── */
.cosmic-inv-card {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.cosmic-inv-card:active  { transform: scale(0.97); }
.cosmic-inv-card:hover   { transform: scale(1.03); }

/* Glow éldritch por expansión */
.expansion-base     { box-shadow: 0 0 10px 2px #48c78e88, 0 4px 24px #000c; }
.expansion-waves    { box-shadow: 0 0 10px 2px #3e8ed088, 0 4px 24px #000c; }
.expansion-night    { box-shadow: 0 0 10px 2px #ffdc7d88, 0 4px 24px #000c; }
.expansion-secrets  { box-shadow: 0 0 10px 2px #f1466888, 0 4px 24px #000c; }
.expansion-original { box-shadow: 0 0 10px 2px #7957d588, 0 4px 24px #000c; }
.expansion-community{ box-shadow: 0 0 10px 2px #ff6b3588, 0 4px 24px #000c; }

/* ─── Imagen ──────────────────────────────────────────────── */
.image-container {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.investigator-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  filter: brightness(0.8) contrast(1.15) saturate(0.75);
  transition: filter 0.3s ease, transform 0.3s ease;
}

.cosmic-inv-card:hover .investigator-image {
  filter: brightness(0.9) contrast(1.2) saturate(0.9);
  transform: scale(1.04);
}

/* Viñeta con tinte éldritch: negro en bordes, toque violáceo abajo */
.eldritch-vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, transparent 40%, rgba(10, 0, 20, 0.65) 100%),
    linear-gradient(to bottom, rgba(10, 0, 20, 0.25) 0%, transparent 35%, transparent 55%, rgba(5, 0, 15, 0.88) 100%);
  pointer-events: none;
}

/* ─── Overlay de atmósfera void ──────────────────────────── */
.void-overlay {
  display: none;
}

/* ─── Nombre — texto flotante sin fondo ───────────────────── */
.inv-name-wrap {
  position: absolute;
  bottom: 28px;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0 6px;
  z-index: 7;
}

.inv-name {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: 'Cinzel', 'Georgia', serif;
  letter-spacing: 0.04em;
  line-height: 1.15;
  color: #e8d5a3;
  text-shadow:
    1px 1px 0 rgba(0, 0, 0, 0.9),
    0 0 8px rgba(0, 0, 0, 0.9);
}

/* ─── Stats de vida y cordura ────────────────────────────── */
.stat-life,
.stat-sanity {
  position: absolute;
  bottom: 6px;
  display: flex;
  align-items: center;
  gap: 3px;
  z-index: 7;
}

.stat-life   { left: 8px; }
.stat-sanity { right: 8px; }

.s-icon {
  font-size: 0.65rem;
}

.stat-life   .s-icon { color: #e05555; filter: drop-shadow(0 0 4px #e0555599); }
.stat-sanity .s-icon { color: #55aaee; filter: drop-shadow(0 0 4px #55aaee99); }

.s-val {
  font-size: 0.78rem;
  font-weight: 700;
  font-family: 'Cinzel', serif;
  color: #f0e8d0;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 1);
}

/* ─── Botón eliminar ──────────────────────────────────────── */
.delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(180, 0, 0, 0.75);
  border: 1px solid #aa0000;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  color: #fff;
  font-size: 0.7rem;
  cursor: pointer;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ─── Aura de expansión en hover ─────────────────────────── */
.expansion-aura {
  position: absolute;
  inset: -15%;
  width: 130%;
  height: 130%;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

.cosmic-inv-card:hover .expansion-aura { opacity: 1; }
.expansion-aura.expansion-base     { background: radial-gradient(circle at center, rgba(72,199,142,0.18) 0%, transparent 65%); }
.expansion-aura.expansion-waves    { background: radial-gradient(circle at center, rgba(62,142,208,0.18) 0%, transparent 65%); }
.expansion-aura.expansion-night    { background: radial-gradient(circle at center, rgba(255,220,125,0.18) 0%, transparent 65%); }
.expansion-aura.expansion-secrets  { background: radial-gradient(circle at center, rgba(241,70,104,0.18) 0%, transparent 65%); }
.expansion-aura.expansion-original { background: radial-gradient(circle at center, rgba(121,87,213,0.18) 0%, transparent 65%); }
.expansion-aura.expansion-community{ background: radial-gradient(circle at center, rgba(255,107,53,0.18) 0%, transparent 65%); }
</style>
