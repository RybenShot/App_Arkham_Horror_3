<template>
  <transition name="achievement-slide">
    <div v-if="achievement" class="achievement-toast" @click="cerrar">
      <div class="achievement-icon">
        <i :class="achievement.icon"></i>
      </div>
      <div class="achievement-body">
        <p class="achievement-eyebrow">{{ es ? 'Logro desbloqueado' : 'Achievement unlocked' }}</p>
        <p class="achievement-title">{{ es ? achievement.titulo : achievement.title }}</p>
      </div>
      <div class="achievement-glow"></div>
    </div>
  </transition>
</template>

<script>
import { getAchievementById } from '@/services/achievementsService.js';

export default {
  name: "AchievementToast",
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    es() {
      return this.$store.state.lenguaje === 'español';
    },
    achievement() {
      const id = this.$store.state.achievementToastId;
      return id ? getAchievementById(id) : null;
    },
  },
  watch: {
    achievement(nuevo) {
      clearTimeout(this.timer);
      if (nuevo) {
        this.timer = setTimeout(() => this.cerrar(), 5000);
      }
    },
  },
  methods: {
    cerrar() {
      this.$store.commit('hideAchievementToast');
    },
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
};
</script>

<style scoped>
.achievement-toast {
  position: fixed;
  top: 16px;
  right: 16px;
  left: 16px;
  max-width: 360px;
  margin: 0 auto;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(10, 6, 4, 0.97), rgba(24, 14, 8, 0.97));
  border: 1px solid rgba(200, 144, 42, 0.7);
  border-radius: 10px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6), 0 0 24px rgba(200, 144, 42, 0.25);
  cursor: pointer;
  overflow: hidden;
  font-family: Georgia, serif;
}

.achievement-icon {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 35% 30%, rgba(200, 144, 42, 0.45), rgba(200, 144, 42, 0.12));
  border: 1px solid rgba(200, 144, 42, 0.75);
  color: #f2e2b8;
  font-size: 1.3rem;
  box-shadow: 0 0 14px rgba(200, 144, 42, 0.4);
  animation: achievement-pop 0.5s ease-out;
}

.achievement-body {
  flex: 1;
  min-width: 0;
}

.achievement-eyebrow {
  margin: 0;
  color: rgba(200, 144, 42, 0.85);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.achievement-title {
  margin: 2px 0 0;
  color: #e8d5a3;
  font-size: 0.95rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.achievement-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(120deg, transparent 0%, rgba(200, 144, 42, 0.18) 45%, transparent 60%);
  background-size: 250% 100%;
  animation: achievement-shine 2.2s ease-in-out 0.2s 1;
}

@keyframes achievement-pop {
  0%   { transform: scale(0.4); opacity: 0; }
  60%  { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
}

@keyframes achievement-shine {
  0%   { background-position: 150% 0; }
  100% { background-position: -100% 0; }
}

.achievement-slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.achievement-slide-leave-active {
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
}
.achievement-slide-enter-from {
  transform: translateY(-40px);
  opacity: 0;
}
.achievement-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
