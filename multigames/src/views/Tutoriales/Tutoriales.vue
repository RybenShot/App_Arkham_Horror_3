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

    <!-- Lista de tutoriales -->
    <div class="tut-list">
      <div
        v-for="(item, i) in tutoriales"
        :key="i"
        class="tut-card"
        :class="{ open: openIndex === i }"
        @click="toggle(i)"
      >
        <div class="tut-card-header">
          <div class="tut-card-icon">
            <i :class="item.icon"></i>
          </div>
          <span class="tut-card-title">{{ es ? item.titulo : item.title }}</span>
          <i class="tut-chevron fas" :class="openIndex === i ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </div>

        <div v-show="openIndex === i" class="tut-card-body">
          <p v-for="(linea, j) in (es ? item.contenido : item.content)" :key="j" class="tut-line">
            <i class="fas fa-caret-right tut-bullet"></i> {{ linea }}
          </p>
        </div>
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
import { startTourFromHome, initTour } from '@/services/tourService.js';

export default {
  name: 'TutorialesView',
  data() {
    return {
      openIndex: null,
      tutoriales: [
        {
          icon: 'fas fa-user-secret',
          titulo: 'Seleccionar Investigador',
          title: 'Select Investigator',
          contenido: [
            'Entra en "Investigadores" desde el menú principal.',
            'Filtra por expansión o arquetipo para encontrar tu personaje.',
            'Cada carta muestra la vida ❤️ y la cordura 🧠 base del investigador.',
            'Pulsa una carta para ver el detalle completo: habilidades, pertenencias e historia.',
            'Cuando estés listo, pulsa "Comenzar" para iniciar la partida con ese investigador.',
            'Si no sabes cuál elegir, usa el botón de "Investigador Aleatorio".',
          ],
          content: [
            'Go to "Investigators" from the main menu.',
            'Filter by expansion or archetype to find your character.',
            'Each card shows the investigator\'s base life ❤️ and sanity 🧠.',
            'Tap a card to see full details: skills, belongings and backstory.',
            'When ready, press "Begin" to start the game with that investigator.',
            'Not sure who to pick? Use the "Random Investigator" button.',
          ],
        },
        {
          icon: 'fas fa-heartbeat',
          titulo: 'Vida y Cordura',
          title: 'Life & Sanity',
          contenido: [
            'La Vida ❤️ representa la salud física del investigador.',
            'La Cordura 🧠 representa la salud mental ante el horror.',
            'Si la Vida llega a 0, el investigador queda inconsciente.',
            'Si la Cordura llega a 0, el investigador enloquece.',
            'En ambos casos el investigador pierde objetos y vuelve con valores mínimos.',
            'Gestiona ambos valores desde la pantalla de juego con los botones + y −.',
          ],
          content: [
            'Life ❤️ represents the investigator\'s physical health.',
            'Sanity 🧠 represents mental health against horror.',
            'If Life reaches 0, the investigator falls unconscious.',
            'If Sanity reaches 0, the investigator goes insane.',
            'In both cases the investigator loses items and returns with minimum values.',
            'Manage both from the play screen using the + and − buttons.',
          ],
        },
        {
          icon: 'fas fa-coins',
          titulo: 'Recursos: Dinero, Pistas y Restos',
          title: 'Resources: Money, Clues & Remnants',
          contenido: [
            'El Dinero 💰 se usa para comprar objetos y pagar costes de cartas.',
            'Las Pistas 🔍 se gastan para añadir dados extra en tiradas de habilidad.',
            'Los Restos son fichas de un solo uso que activan efectos especiales.',
            'Pulsa el icono del recurso que quieras modificar y luego usa + o −.',
            'El recurso seleccionado activo se resalta en la pantalla de juego.',
          ],
          content: [
            'Money 💰 is used to buy items and pay card costs.',
            'Clues 🔍 are spent to add extra dice on skill checks.',
            'Remnants are single-use tokens that trigger special effects.',
            'Tap the resource icon you want to change, then use + or −.',
            'The active selected resource is highlighted on the play screen.',
          ],
        },
        {
          icon: 'fas fa-dice-d20',
          titulo: 'Tiradas de Dados',
          title: 'Dice Rolls',
          contenido: [
            'Accede al tirador de dados desde el icono 🎲 en la barra de navegación de juego.',
            'Selecciona cuántos dados quieres lanzar según tu habilidad más las pistas gastadas.',
            'En Arkham Horror cada dado que saca 5 o 6 cuenta como un éxito.',
            'El número de éxitos determina si superas la prueba o sufres las consecuencias.',
            'Algunos efectos y habilidades pueden repetir dados fallidos.',
          ],
          content: [
            'Access the dice roller from the 🎲 icon in the play navigation bar.',
            'Select how many dice to roll based on your skill plus spent clues.',
            'In Arkham Horror each die showing 5 or 6 counts as a success.',
            'The number of successes determines whether you pass the test.',
            'Some effects and skills allow you to reroll failed dice.',
          ],
        },
        {
          icon: 'fas fa-fist-raised',
          titulo: 'Combate',
          title: 'Combat',
          contenido: [
            'El combate ocurre cuando un investigador se enfrenta a un monstruo.',
            'Primero se realiza una prueba de horror (Cordura) para no perder la cabeza.',
            'Luego se realiza una prueba de combate con tu habilidad de Combate.',
            'Si fallas el ataque, el monstruo contraataca y pierdes Vida.',
            'Algunos monstruos son inmunes a armas normales y requieren hechizos.',
            'Usa el apartado de Eventos de Combate para llevar el seguimiento.',
          ],
          content: [
            'Combat happens when an investigator faces a monster.',
            'First make a Horror check (Sanity) to avoid losing your mind.',
            'Then make a Combat check using your Combat skill.',
            'If you fail the attack, the monster retaliates and you lose Life.',
            'Some monsters are immune to normal weapons and require spells.',
            'Use the Combat Events section to track the encounter.',
          ],
        },
        {
          icon: 'fas fa-map-marked-alt',
          titulo: 'Mapas y Ubicación',
          title: 'Maps & Location',
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
        },
        {
          icon: 'fas fa-wifi',
          titulo: 'Modo Online',
          title: 'Online Mode',
          contenido: [
            'Regístrate con tu cuenta para acceder al modo online.',
            'El anfitrión crea un mapa online desde el detalle de un mapa.',
            'Comparte el código de partida con tus compañeros investigadores.',
            'Cada jugador selecciona su investigador y se une a la partida.',
            'Los estados de cada investigador se sincronizan en tiempo real.',
            'Guarda tu investigador al finalizar la partida para conservar su progreso.',
          ],
          content: [
            'Sign in with your account to access online mode.',
            'The host creates an online map from the map detail screen.',
            'Share the game code with your fellow investigators.',
            'Each player selects their investigator and joins the game.',
            'Each investigator\'s status syncs in real time.',
            'Save your investigator at the end of the game to keep progress.',
          ],
        },
      ],
    };
  },
  computed: {
    es() {
      return this.$store.state.lenguaje === 'español';
    },
  },
  methods: {
    toggle(i) {
      this.openIndex = this.openIndex === i ? null : i;
    },
    launchTour() {
      initTour(this.$router, this.$store, this.$store.state.lenguaje);
      this.$router.push('/').then(() => {
        setTimeout(() => startTourFromHome(), 600);
      });
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

/* ─── Lista ──────────────────────────────────────────────── */
.tut-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 12px;
}

/* ─── Tarjeta ────────────────────────────────────────────── */
.tut-card {
  background: rgba(6, 3, 14, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.tut-card.open {
  border-color: rgba(200, 144, 42, 0.55);
}

.tut-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
}

.tut-card-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(200, 144, 42, 0.15);
  border: 1px solid rgba(200, 144, 42, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #c8902a;
  font-size: 0.85rem;
}

.tut-card.open .tut-card-icon {
  background: rgba(200, 144, 42, 0.25);
  border-color: rgba(200, 144, 42, 0.7);
}

.tut-card-title {
  flex: 1;
  color: #e8d5a3;
  font-size: 0.9rem;
  font-weight: 600;
}

.tut-chevron {
  color: rgba(200, 144, 42, 0.6);
  font-size: 0.75rem;
  flex-shrink: 0;
}

/* ─── Cuerpo desplegable ─────────────────────────────────── */
.tut-card-body {
  padding: 0 14px 14px 14px;
  border-top: 1px solid rgba(200, 144, 42, 0.2);
}

.tut-line {
  color: rgba(220, 210, 200, 0.85);
  font-size: 0.82rem;
  line-height: 1.55;
  margin: 6px 0 0;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.tut-bullet {
  color: rgba(200, 144, 42, 0.7);
  font-size: 0.7rem;
  margin-top: 4px;
  flex-shrink: 0;
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
