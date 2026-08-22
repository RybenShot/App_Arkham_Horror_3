<template>
  <div class="tut-container">

    <!-- Cabecera -->
    <div class="tut-header columns is-mobile mb-0 pt-3">
      <div class="column is-3 p-0 has-text-centered" @click="$router.go(-1)">
        <i class="fa-2x fas fa-arrow-left has-text-white"></i>
      </div>
      <div class="column has-text-centered">
        <p class="title has-text-white mb-0">{{ es ? 'Tutoriales' : 'Tutorials' }}</p>
      </div>
      <div class="column is-3 p-0 has-text-centered">
        <router-link to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link>
      </div>
    </div>

    <p class="tut-subtitle">{{ es ? '¿Cómo se juega?' : 'How to play?' }}</p>

    <!-- Botón tour interactivo -->
    <div class="tour-btn-wrap">
      <button class="tour-start-btn" @click="launchTour">
        <i class="fas fa-compass tour-start-icon"></i>
        <span>{{ es ? 'Iniciar tour interactivo' : 'Start interactive tour' }}</span>
      </button>
      <p class="tour-hint">{{ es ? 'Te guío paso a paso por la app' : 'I\'ll guide you step by step through the app' }}</p>
    </div>

    <p class="tut-list-hint">{{ es ? 'Tutoriales interactivos' : 'Interactive tutorials' }}</p>

    <!-- Lista de tutoriales interactivos, en formato carta -->
    <div class="tut-list">
      <div v-for="(item, i) in interactiveTutoriales" :key="i" class="tut-card">
        <span class="tut-card-corner tut-card-corner-tl">◆</span>
        <span class="tut-card-corner tut-card-corner-tr">◆</span>

        <div class="tut-card-icon">
          <i :class="item.icon"></i>
        </div>

        <p class="tut-card-title">{{ es ? item.titulo : item.title }}</p>
        <div class="tut-card-divider"><span>◆</span></div>

        <div class="tut-card-body">
          <p v-for="(linea, j) in (es ? item.contenido : item.content)" :key="j" class="tut-line">
            <i class="fas fa-caret-right tut-bullet"></i> {{ linea }}
          </p>
        </div>

        <button class="mini-tour-btn" @click="launchMiniTour(item.miniTour)">
          <i class="fas fa-play-circle"></i>
          {{ es ? 'Jugar ejemplo interactivo' : 'Play interactive example' }}
        </button>

        <span class="tut-card-corner tut-card-corner-bl">◆</span>
        <span class="tut-card-corner tut-card-corner-br">◆</span>
      </div>
    </div>

    <div class="tut-footer">
      <span>◈</span>
      <em>{{ es ? '"Lo desconocido aguarda..."' : '"The unknown awaits..."' }}</em>
      <span>◈</span>
    </div>

  </div>
</template>

<script>
import { startTourFromHome, initTour, startUbicacionTour } from '@/services/tourService.js';

export default {
  name: 'TutorialesView',
  data() {
    return {
      tutoriales: [

        {
          icon: 'fas fa-map-marked-alt',
          titulo: 'Mapas y Ubicación',
          title: 'Maps & Location',
          miniTour: 'ubicacion',
          contenido: [
            'Accede a los mapas desde "Mapas" en el menú principal.',
            'Cada mapa corresponde a un escenario de Arkham Horror.',
            'La ficha de mapa muestra la dificultad, duración media y valoración de la comunidad.',
            'En modo online puedes crear un mapa compartido para jugar con otros.',
            'Desde el mapa en partida puedes registrar tu ubicación actual.',
          ],
          content: [
            'Access maps from "Maps" in the main menu.',
            'Each map corresponds to an Arkham Horror scenario.',
            'The map card shows difficulty, average duration and community rating.',
            'In online mode you can create a shared map to play with others.',
            'From the in-game map you can log your current location.',
          ],
        }
      ],
    };
  },
  computed: {
    es() {
      return this.$store.state.lenguaje === 'español';
    },
    interactiveTutoriales() {
      return this.tutoriales.filter(t => t.miniTour);
    },
  },
  methods: {
    launchTour() {
      initTour(this.$router, this.$store, this.$store.state.lenguaje);
      this.$router.push('/').then(() => {
        setTimeout(() => startTourFromHome(), 600);
      });
    },
    launchMiniTour(key) {
      initTour(this.$router, this.$store, this.$store.state.lenguaje);
      if (key === 'ubicacion') startUbicacionTour();
    },
  },
};
</script>

<style scoped>
.tut-container {
  min-height: 100vh;
  background-image: url(@/assets/img/ZZOtros/BGAH.jpg);
  background-size: cover;
  background-position: center;
  padding-bottom: 2rem;
}

.tut-header {
  display: flex;
  align-items: center;
}

.tut-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  margin: 0.2rem 0 1rem;
  font-style: italic;
}

/* ─── Botón tour ─────────────────────────────────────────── */
.tour-btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin: 0 12px 16px;
}

.tour-start-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 13px 20px;
  background: rgba(200, 144, 42, 0.12);
  border: 1px solid rgba(200, 144, 42, 0.55);
  border-radius: 6px;
  color: #e8d5a3;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  animation: tour-pulse 3s ease-in-out infinite;
}

.tour-start-btn:hover {
  background: rgba(200, 144, 42, 0.22);
  box-shadow: 0 0 20px rgba(200, 144, 42, 0.3);
}

.tour-start-icon {
  font-size: 1.2rem;
  color: #c8902a;
  animation: compass-spin 6s linear infinite;
}

@keyframes compass-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes tour-pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(200,144,42,0.15); }
  50%       { box-shadow: 0 0 18px rgba(200,144,42,0.4); }
}

.tour-hint {
  color: rgba(200, 190, 170, 0.5);
  font-size: 0.75rem;
  font-style: italic;
  text-align: center;
}

/* ─── Encabezado de la lista ─────────────────────────────── */
.tut-list-hint {
  text-align: center;
  color: rgba(200, 144, 42, 0.6);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0.6rem 0 0.9rem;
}

/* ─── Lista ──────────────────────────────────────────────── */
.tut-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
  padding: 0 12px;
}

/* ─── Tarjeta ────────────────────────────────────────────── */
.tut-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background:
    radial-gradient(ellipse at 50% -10%, rgba(200, 144, 42, 0.14), transparent 55%),
    linear-gradient(180deg, rgba(18, 10, 8, 0.95), rgba(6, 3, 14, 0.95));
  border: 1px solid rgba(200, 144, 42, 0.45);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4) inset, 0 10px 26px rgba(0, 0, 0, 0.5);
  padding: 22px 16px 18px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.tut-card:hover {
  transform: translateY(-4px);
  border-color: rgba(200, 144, 42, 0.8);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4) inset, 0 14px 34px rgba(0, 0, 0, 0.6), 0 0 22px rgba(200, 144, 42, 0.25);
}

.tut-card-corner {
  position: absolute;
  color: rgba(200, 144, 42, 0.45);
  font-size: 0.6rem;
}
.tut-card-corner-tl { top: 8px;    left: 10px; }
.tut-card-corner-tr { top: 8px;    right: 10px; }
.tut-card-corner-bl { bottom: 8px; left: 10px; }
.tut-card-corner-br { bottom: 8px; right: 10px; }

.tut-card-icon {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, rgba(200, 144, 42, 0.35), rgba(200, 144, 42, 0.08));
  border: 1px solid rgba(200, 144, 42, 0.6);
  box-shadow: 0 0 16px rgba(200, 144, 42, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e8d5a3;
  font-size: 1.4rem;
  margin-bottom: 12px;
}

.tut-card-title {
  color: #e8d5a3;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin: 0;
}

.tut-card-divider {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 60%;
  margin: 10px 0 12px;
  color: rgba(200, 144, 42, 0.5);
  font-size: 0.6rem;
}
.tut-card-divider::before,
.tut-card-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(200, 144, 42, 0.3);
}

/* ─── Cuerpo ─────────────────────────────────────────────── */
.tut-card-body {
  width: 100%;
  margin-bottom: 16px;
}

.tut-line {
  color: rgba(220, 210, 200, 0.85);
  font-size: 0.8rem;
  line-height: 1.55;
  margin: 6px 0 0;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  text-align: left;
}

.tut-bullet {
  color: rgba(200, 144, 42, 0.7);
  font-size: 0.65rem;
  margin-top: 4px;
  flex-shrink: 0;
}

.mini-tour-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: auto;
  padding: 11px 14px;
  background: linear-gradient(180deg, rgba(200, 144, 42, 0.28), rgba(200, 144, 42, 0.14));
  border: 1px solid rgba(200, 144, 42, 0.65);
  border-radius: 7px;
  color: #f2e2b8;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.mini-tour-btn:hover {
  background: linear-gradient(180deg, rgba(200, 144, 42, 0.4), rgba(200, 144, 42, 0.2));
  box-shadow: 0 0 16px rgba(200, 144, 42, 0.35);
}

/* ─── Footer ─────────────────────────────────────────────── */
.tut-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 1.8rem;
  color: rgba(200, 144, 42, 0.45);
  font-size: 0.78rem;
  font-style: italic;
}
</style>
