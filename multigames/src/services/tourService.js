import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { apiService } from '@/services/api.js';

const CONTINUE_KEY = 'ah_tour_continue';

let _driverInstance   = null;
let _router           = null;
let _store            = null;
let _lang             = 'español';
let _currentSegment   = null;   // tracks which segment is active for skipToNext()
let _availableIdInv   = null;   // first known investigator ID (set by ListaPersonajes)

const es = () => _lang === 'español';

// ─────────────────────────────────────────────────────────────
// Internals
// ─────────────────────────────────────────────────────────────
function destroy() {
  if (_driverInstance) { _driverInstance.destroy(); _driverInstance = null; }
}

function setPlayTab(index) {
  if (!_store) return;
  ['StoreTiradorDados','StoreUbicationPlayer','StoreEstadosPlay','StoreHabilidades','StoreAjustesPlay']
    .forEach((k, i) => { _store.state[k] = i === index; });
}

function goTo(route, continueRoute) {
  destroy();
  if (continueRoute) localStorage.setItem(CONTINUE_KEY, continueRoute);
  else               localStorage.removeItem(CONTINUE_KEY);
  _router.push(route);
}

// ─── Skip ────────────────────────────────────────────────────
async function skipToNext() {
  switch (_currentSegment) {
    case 'home':
      goTo('/ListaMapas', '/ListaMapas');
      break;

    case 'listaMapa':
    case 'detalleMapa':
      goTo('/ListaPersonajes', '/ListaPersonajes');
      break;

    case 'listaPersonaje': {
      destroy();
      // Load a predefined investigator if possible
      try {
        const idToUse = _availableIdInv || 1;
        const response = await apiService.obtainInvByID(idToUse);
        _store.commit('setDatosInvestigator', response);
      } catch (e) { /* navigate anyway */ }
      localStorage.setItem(CONTINUE_KEY, '/PlayAH');
      _router.push('/PlayAH');
      break;
    }

    case 'detallePersonaje':
      goTo('/PlayAH', '/PlayAH');
      break;

    case 'play':
      destroy();
      break;

    default:
      destroy();
  }
}

// ─── Tab-switch helper used in onNextClick ───────────────────
function switchTabThenNext(index) {
  setPlayTab(index);
  setTimeout(() => _driverInstance?.moveNext(), 400);
}

// ─────────────────────────────────────────────────────────────
// makeDriver — attaches skip button via onPopoverRender
// ─────────────────────────────────────────────────────────────
function makeDriver(steps, segment) {
  destroy();
  _currentSegment = segment;

  _driverInstance = driver({
    animate:       true,
    smoothScroll:  true,
    allowClose:    true,
    overlayOpacity: 0.72,
    stagePadding:  8,
    stageRadius:   6,
    popoverClass:  'ah-tour-popover',
    progressText:  '{{current}} / {{total}}',
    nextBtnText:   es() ? 'Siguiente →' : 'Next →',
    prevBtnText:   es() ? '← Atrás'    : '← Back',
    doneBtnText:   es() ? '✓ Listo'    : '✓ Done',
    onPopoverRender: (popover) => {
      const skipBtn = document.createElement('button');
      skipBtn.textContent = es() ? '⏭ Saltar sección' : '⏭ Skip section';
      skipBtn.className = 'ah-tour-skip-btn';
      skipBtn.addEventListener('click', skipToNext);
      // Insert before the nav buttons block
      const target = popover.footerButtons || popover.nextButton;
      if (target && target.parentNode === popover.footer) {
        popover.footer.insertBefore(skipBtn, target);
      } else {
        popover.footer.appendChild(skipBtn);
      }
    },
    steps,
  });
  return _driverInstance;
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 1 — HOME
// ─────────────────────────────────────────────────────────────
function segmentHome() {
  makeDriver([
    {
      popover: {
        title: es() ? '¡Bienvenido a Arkham Horror App!' : 'Welcome to Arkham Horror App!',
        description: es()
          ? 'Este tour te guiará por todas las funciones hasta tu primera partida. Pulsa <strong>Siguiente</strong> para empezar o <em>Saltar sección</em> para ir directo a los Mapas.'
          : 'This tour will guide you through all features to your first game. Press <strong>Next</strong> to begin or <em>Skip section</em> to jump to Maps.',
      },
    },
    {
      popover: {
        title: es() ? '❤️ Hecha con pasión' : '❤️ Made with passion',
        description: es()
          ? 'Herramienta compañera para <strong>Arkham Horror 3ª Edición</strong>: seguimiento de partida, contenido de la comunidad, modo online y mucho más. Desarrollada por <strong>una sola persona</strong>. Una contribución ayuda a mantenerla viva. ¡Gracias!'
          : 'Companion tool for <strong>Arkham Horror 3rd Edition</strong>: game tracking, community content, online mode and more. Built by <strong>one person</strong>. A contribution helps keep it alive. Thank you!',
      },
    },
    {
      element: '[data-tour="visit-counter"]',
      popover: {
        title: es() ? '👁 Visitas e Investigadores activos' : '👁 Visits & Active Investigators',
        description: es()
          ? 'El primer número muestra las visitas totales. El punto rojo parpadeante indica cuántos investigadores están jugando <strong>ahora mismo</strong>.'
          : 'The first number shows total visits. The blinking red dot shows how many investigators are playing <strong>right now</strong>.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="login-section"]',
      popover: {
        title: es() ? '🔐 Iniciar Sesión — Importante' : '🔐 Sign In — Important',
        description: es()
          ? '<strong>Algunas funciones requieren registro:</strong> modo online, guardar tu investigador, votar mapas o crear partidas compartidas. Te recomendamos iniciar sesión antes de empezar.'
          : '<strong>Some features require an account:</strong> online mode, saving your investigator, voting on maps, or creating shared games. Sign in before you start.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="btn-mapas"]',
      popover: {
        title: es() ? '🗺️ Mapas' : '🗺️ Maps',
        description: es()
          ? 'Accede a todos los escenarios: historia con audio, dificultad, enemigos, opiniones de la comunidad y partidas online.'
          : 'Access all scenarios: audio story, difficulty, enemies, community ratings and online games.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="btn-investigadores"]',
      popover: {
        title: es() ? '🕵️ Investigadores' : '🕵️ Investigators',
        description: es()
          ? 'Elige a tu personaje. Cada investigador tiene habilidades, stats, equipo inicial e historia únicos.'
          : 'Choose your character. Each investigator has unique skills, stats, starting equipment and backstory.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="btn-tutoriales"]',
      popover: {
        title: es() ? '📖 Tutoriales' : '📖 Tutorials',
        description: es()
          ? 'Vuelve aquí en cualquier momento para releer las reglas o relanzar este tour.'
          : 'Come back here any time to review the rules or relaunch this tour.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="support-row"]',
      popover: {
        title: es() ? '☕ Apóyanos & Instagram' : '☕ Support Us & Instagram',
        description: es()
          ? '<strong>Apoyanos</strong> lleva a Buy Me a Coffee. <strong>Instagram</strong> publica novedades y contenido extra. ¡Síguenos!'
          : '<strong>Support Us</strong> links to Buy Me a Coffee. <strong>Instagram</strong> posts news and extra content. Follow us!',
        side: 'top',
      },
    },
    {
      element: '[data-tour="noticias-section"]',
      popover: {
        title: es() ? '📰 Últimas actualizaciones' : '📰 Latest updates',
        description: es()
          ? 'Despliega este panel para ver el historial de versiones y las novedades de cada actualización.'
          : 'Expand this panel to see version history and what was added in each update.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="btn-mapas"]',
      popover: {
        title: es() ? '→ Vamos a los Mapas' : '→ Let\'s go to Maps',
        description: es()
          ? 'Pulsa <strong>Siguiente</strong> y te llevamos a la sección de Mapas.'
          : 'Press <strong>Next</strong> and we\'ll take you to the Maps section.',
        side: 'top',
        onNextClick: () => goTo('/ListaMapas', '/ListaMapas'),
      },
    },
  ], 'home').drive();
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 2 — LISTA DE MAPAS
// ─────────────────────────────────────────────────────────────
function segmentListaMapas() {
  makeDriver([
    {
      element: '[data-tour="mapa-filtros"]',
      popover: {
        title: es() ? '📦 Filtros de expansión' : '📦 Expansion filters',
        description: es()
          ? '<strong>Pulsa estos botones</strong> para activar o desactivar las expansiones que tengas. Solo verás los mapas de las expansiones seleccionadas.'
          : '<strong>Tap these buttons</strong> to enable or disable the expansions you own. You\'ll only see maps from selected expansions.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="mapa-online-btn"]',
      popover: {
        title: es() ? '🌐 Botón Online' : '🌐 Online Button',
        description: es()
          ? '<strong>Toca aquí</strong> para unirte a una partida creada por otro jugador introduciendo su código de mapa. Necesitas estar registrado.'
          : '<strong>Tap here</strong> to join a game created by another player using their map code. Requires sign in.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="mapa-grid"]',
      popover: {
        title: es() ? '🗺️ Escenarios — Toca uno para continuar' : '🗺️ Scenarios — Tap one to continue',
        description: es()
          ? 'Cada carta es un escenario diferente. <strong>Toca ahora cualquier mapa</strong> para ver su detalle completo. El tour continuará automáticamente en la pantalla de detalle.'
          : 'Each card is a different scenario. <strong>Tap any map now</strong> to see its full detail. The tour will continue automatically on the detail screen.',
        side: 'top',
        onNextClick: () => { destroy(); localStorage.setItem(CONTINUE_KEY, '/DetalleMapa'); },
      },
    },
  ], 'listaMapa').drive();
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 3 — DETALLE DE MAPA
// ─────────────────────────────────────────────────────────────
function segmentDetalleMapa() {
  makeDriver([
    {
      element: '[data-tour="mapa-historia"]',
      popover: {
        title: es() ? '📜 Historia con Audio' : '📜 Story with Audio',
        description: es()
          ? 'Texto de ambientación del escenario. <strong>Pulsa el icono 🔊</strong> para escuchar la locución de audio y sumergirte en la historia.'
          : 'Narrative text for the scenario. <strong>Tap the 🔊 icon</strong> to hear the audio narration and immerse yourself in the story.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="mapa-especificaciones"]',
      popover: {
        title: es() ? '👍 Opiniones — Toca para votar' : '👍 Opinions — Tap to vote',
        description: es()
          ? '<strong>Pulsa 👍 o 👎</strong> para votar. Consulta la <strong>dificultad estimada</strong> y la <strong>duración media</strong> según la comunidad. Necesitas estar registrado para votar.'
          : '<strong>Tap 👍 or 👎</strong> to vote. Check the <strong>estimated difficulty</strong> and <strong>average duration</strong> from the community. Requires sign in to vote.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="mapa-btn-enemigos"]',
      popover: {
        title: es() ? '👾 Enemigos — Toca para ver la lista' : '👾 Enemies — Tap to see the list',
        description: es()
          ? '<strong>Pulsa aquí</strong> para ver todos los monstruos del escenario. El color de fondo de cada enemigo indica a qué expansión pertenece.'
          : '<strong>Tap here</strong> to see all monsters in this scenario. The background color of each enemy shows which expansion it belongs to.',
        side: 'left',
      },
    },
    {
      element: '[data-tour="mapa-loseta-img"]',
      popover: {
        title: es() ? '🧩 Mapa de losetas — Toca para ampliar' : '🧩 Tile map — Tap to enlarge',
        description: es()
          ? 'Vista del tablero con la disposición de losetas. <strong>Pulsa sobre la imagen</strong> para verla ampliada con todos los detalles de cada zona.'
          : 'Board layout with tile arrangement. <strong>Tap the image</strong> to see it enlarged with details of each zone.',
        side: 'right',
      },
    },
    {
      element: '[data-tour="mapa-btn-inv-rec"]',
      popover: {
        title: es() ? '🕵️ Investigadores Recomendados' : '🕵️ Recommended Investigators',
        description: es()
          ? '<strong>Pulsa aquí</strong> para ver qué investigadores recomienda la comunidad para este mapa y por qué. Muy útil si es tu primera vez.'
          : '<strong>Tap here</strong> to see which investigators the community recommends for this map and why. Very useful for a first playthrough.',
        side: 'left',
      },
    },
    {
      element: '[data-tour="mapa-btn-online"]',
      popover: {
        title: es() ? '🌐 Crear Mapa Online' : '🌐 Create Online Map',
        description: es()
          ? '<strong>Pulsa aquí</strong> para crear una partida online. Todos los jugadores podrán conectarse y gestionar juntos las fichas generales. Necesitas estar registrado.'
          : '<strong>Tap here</strong> to create an online game. All players can connect and manage general tokens together. Requires sign in.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="mapa-btn-selec-inv"]',
      popover: {
        title: es() ? '→ Seleccionar Investigador' : '→ Select Investigator',
        description: es()
          ? 'Una vez elegido el mapa, <strong>pulsa aquí</strong> para ir a elegir tu investigador. Pulsamos Siguiente para continuar el tour.'
          : 'Once the map is chosen, <strong>tap here</strong> to select your investigator. Press Next to continue the tour.',
        side: 'top',
        onNextClick: () => goTo('/ListaPersonajes', '/ListaPersonajes'),
      },
    },
  ], 'detalleMapa').drive();
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 4 — LISTA DE INVESTIGADORES
// ─────────────────────────────────────────────────────────────
function segmentListaPersonajes() {
  makeDriver([
    {
      element: '[data-tour="expansion-tabs"]',
      popover: {
        title: es() ? '🔖 Pestañas de filtro' : '🔖 Filter tabs',
        description: es()
          ? '<strong>Pulsa "Expansiones"</strong> para filtrar por caja, o <strong>"Arquetipos"</strong> para filtrar por rol: Superviviente, Místico, Experto, Defensor, Buscador o Neutral.'
          : '<strong>Tap "Expansions"</strong> to filter by box, or <strong>"Archetypes"</strong> to filter by role: Survivor, Mystic, Rogue, Guardian, Seeker or Neutral.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="expansion-buttons"]',
      popover: {
        title: es() ? '📦 Activar expansiones' : '📦 Enable expansions',
        description: es()
          ? '<strong>Pulsa los botones de color</strong> para activar las expansiones que tengas. Los investigadores de esa expansión aparecerán abajo. El borde de cada carta coincide con el color de su expansión.'
          : '<strong>Tap the colored buttons</strong> to enable the expansions you own. Investigators from that expansion appear below. Each card\'s border matches its expansion color.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="inv-online-btn"]',
      popover: {
        title: es() ? '🌐 Investigadores Online' : '🌐 Online Investigators',
        description: es()
          ? '<strong>Pulsa aquí</strong> si tienes una partida online activa y quieres cargar tu investigador guardado en perfil. Requiere registro.'
          : '<strong>Tap here</strong> if you have an active online game and want to load your saved profile investigator. Requires sign in.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="inv-grid"]',
      popover: {
        title: es() ? '🃏 Elige un Investigador — Toca una carta' : '🃏 Choose an Investigator — Tap a card',
        description: es()
          ? 'Cada carta muestra vida ❤️ y cordura 🧠 base. <strong>Toca ahora cualquier carta</strong> para ver su detalle. El tour continuará automáticamente en la pantalla de detalle.'
          : 'Each card shows base life ❤️ and sanity 🧠. <strong>Tap any card now</strong> to see its detail. The tour will continue automatically on the detail screen.',
        side: 'top',
        onNextClick: () => { destroy(); localStorage.setItem(CONTINUE_KEY, '/DetallePersonaje'); },
      },
    },
  ], 'listaPersonaje').drive();
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 5 — DETALLE DE PERSONAJE
// ─────────────────────────────────────────────────────────────
function segmentDetallePersonaje() {
  makeDriver([
    {
      element: '[data-tour="detalle-img"]',
      popover: {
        title: es() ? '🖼️ Imagen e identidad' : '🖼️ Image & identity',
        description: es()
          ? 'Imagen, nombre y rol. <strong>Usa los botones debajo</strong> para ver sus <em>pertenencias iniciales</em> (con qué objetos empieza), su <em>historia personal</em> con audio, y su <em>arquetipo</em>.'
          : 'Image, name and role. <strong>Use the buttons below</strong> to see their <em>starting belongings</em>, their <em>personal story</em> with audio, and their <em>archetype</em>.',
        side: 'right',
      },
    },
    {
      element: '[data-tour="detalle-stats"]',
      popover: {
        title: es() ? '📊 Atributos y especificaciones' : '📊 Attributes & specs',
        description: es()
          ? 'Los valores base: <strong>Voluntad, Inteligencia, Combate y Agilidad</strong>. Determinan cuántos dados tiras en cada prueba. A mayor valor, más dados y más posibilidades de éxito.'
          : 'Base values: <strong>Willpower, Intellect, Combat and Agility</strong>. They determine how many dice you roll in each test. Higher value = more dice = more chances of success.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="detalle-habilidades"]',
      popover: {
        title: es() ? '✨ Habilidad especial' : '✨ Special ability',
        description: es()
          ? 'La habilidad única de este investigador. <strong>Léela con atención</strong>, puede cambiar completamente tu estrategia. Algunos investigadores también tienen habilidades pasivas que se activan automáticamente.'
          : 'This investigator\'s unique ability. <strong>Read it carefully</strong> — it can completely change your strategy. Some investigators also have passive abilities that activate automatically.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="detalle-comenzar"]',
      popover: {
        title: es() ? '▶️ Comenzar — Toca para entrar' : '▶️ Begin — Tap to enter',
        description: es()
          ? 'Cuando estés listo, <strong>pulsa el botón verde "Comenzar"</strong> para iniciar la partida con este investigador. La app seleccionará tus objetos iniciales. El tour continuará en la pantalla de juego.'
          : 'When ready, <strong>tap the green "Begin" button</strong> to start the game with this investigator. The app will select your starting items. The tour continues on the game screen.',
        side: 'top',
        onNextClick: () => goTo('/PlayAH', '/PlayAH'),
      },
    },
  ], 'detallePersonaje').drive();
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 6 — PANTALLA DE JUEGO (Play)
// ─────────────────────────────────────────────────────────────
function segmentPlay() {
  setPlayTab(0);   // arrancar en Tiradas

  makeDriver([
    // ── Tabs Player / Map ──────────────────────────────────────
    {
      element: '[data-tour="play-tabs"]',
      popover: {
        title: es() ? '🎮 Pantalla de Juego' : '🎮 Game Screen',
        description: es()
          ? '<strong>Pestaña Player:</strong> gestiona tu investigador. <strong>Pestaña Map:</strong> fichas generales de la mesa cuando hay mapa online activo. <strong>Toca las pestañas</strong> para cambiar entre vistas.'
          : '<strong>Player tab:</strong> manage your investigator. <strong>Map tab:</strong> general table tokens when an online map is active. <strong>Tap the tabs</strong> to switch views.',
        side: 'bottom',
      },
    },
    // ── Barra de navegación ────────────────────────────────────
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '🧭 Navega entre zonas — Toca los iconos' : '🧭 Navigate between zones — Tap the icons',
        description: es()
          ? '<strong>Pulsa cada icono</strong> para acceder a su zona: <strong>🎲 Tiradas · 📍 Ubicación · 🤕 Estados · 🃏 Habilidades · ⚙️ Ajustes</strong>. El icono activo se muestra en verde.'
          : '<strong>Tap each icon</strong> to access its zone: <strong>🎲 Dice · 📍 Location · 🤕 States · 🃏 Skills · ⚙️ Settings</strong>. The active icon shows in green.',
        side: 'bottom',
      },
    },
    // ── Vida y Cordura ─────────────────────────────────────────
    {
      element: '[data-tour="play-vida-cordura"]',
      popover: {
        title: es() ? '❤️🧠 Vida y Cordura — Toca para seleccionar' : '❤️🧠 Life & Sanity — Tap to select',
        description: es()
          ? '<strong>Pulsa el ❤️ o el 🧠</strong> para seleccionarlo. Si Vida llega a 0: inconsciente + pierdes objetos. Si Cordura llega a 0: enloqueces. ¡Vigílalos siempre!'
          : '<strong>Tap ❤️ or 🧠</strong> to select it. Life at 0: unconscious + lose items. Sanity at 0: insanity. Watch them carefully!',
        side: 'bottom',
      },
    },
    // ── Recursos ───────────────────────────────────────────────
    {
      element: '[data-tour="play-recursos"]',
      popover: {
        title: es() ? '💰🔍 Recursos — Toca para seleccionar' : '💰🔍 Resources — Tap to select',
        description: es()
          ? '<strong>Pulsa el icono</strong> del recurso que quieras modificar. <strong>💰 Dinero:</strong> comprar objetos. <strong>🔍 Pistas:</strong> dados extra en pruebas. <strong>Restos:</strong> efectos especiales de un solo uso.'
          : '<strong>Tap the icon</strong> of the resource to modify. <strong>💰 Money:</strong> buy items. <strong>🔍 Clues:</strong> extra dice in tests. <strong>Remnants:</strong> single-use special effects.',
        side: 'top',
      },
    },
    // ── Sumar / restar ─────────────────────────────────────────
    {
      element: '[data-tour="play-sumar-restar"]',
      popover: {
        title: es() ? '➕➖ Modificar — Primero selecciona, luego pulsa aquí' : '➕➖ Modify — Select first, then tap here',
        description: es()
          ? '1) Toca el recurso a modificar (vida, cordura, dinero, pistas o restos). 2) <strong>Pulsa + o −</strong> para subir o bajarlo. El recurso activo queda resaltado en pantalla.'
          : '1) Tap the resource to modify (life, sanity, money, clues or remnants). 2) <strong>Tap + or −</strong> to increase or decrease it. The active resource stays highlighted.',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════════
    // TAB 0 — TIRADAS (ya activo)
    // ══════════════════════════════════════════════════════════
    {
      element: '[data-tour="tiradas-atributos"]',
      popover: {
        title: es() ? '🎲 Seleccionar atributo — Toca el icono' : '🎲 Select attribute — Tap the icon',
        description: es()
          ? '<strong>Pulsa uno de los 5 atributos</strong> (Saber, Influencia, Observación, Fuerza, Voluntad) para cargar el número de dados base. El atributo seleccionado se muestra en color.'
          : '<strong>Tap one of the 5 attributes</strong> (Lore, Influence, Observation, Strength, Willpower) to load the base dice count. The selected attribute highlights in color.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="tiradas-lanzar"]',
      popover: {
        title: es() ? '🎲 Dados Extra y Lanzar — Toca TIRAR' : '🎲 Extra Dice & Roll — Tap THROW',
        description: es()
          ? 'Usa <strong>+ y −</strong> para añadir dados extra (por pistas u objetos). El total aparece debajo. <strong>Pulsa el botón verde TIRAR</strong> para lanzar los dados y ver el resultado.'
          : 'Use <strong>+ and −</strong> to add extra dice (from clues or items). The total shows below. <strong>Tap the green THROW button</strong> to roll and see the result.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="tiradas-concentracion"]',
      popover: {
        title: es() ? '🎯 Concentración — Fichas de bonificación' : '🎯 Concentration — Bonus tokens',
        description: es()
          ? '<strong>Pulsa "Añadir"</strong> para elegir el tipo de ficha de concentración. Estas fichas añaden un dado extra de un tipo específico cuando las usas con "Usar 1". Muy útil en momentos críticos.'
          : '<strong>Tap "Add"</strong> to choose a concentration token type. These tokens add one extra die of a specific type when used with "Use 1". Very useful in critical moments.',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════════
    // PIVOT → TAB 1 — UBICACIÓN
    // ══════════════════════════════════════════════════════════
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '📍 Cambia a Ubicación — Toca el icono 📍' : '📍 Switch to Location — Tap the 📍 icon',
        description: es()
          ? '<strong>Pulsa el icono 📍</strong> en la barra de navegación para ver tu ubicación en el mapa. Continuamos el tour automáticamente.'
          : '<strong>Tap the 📍 icon</strong> in the navigation bar to see your map location. We\'ll continue the tour automatically.',
        side: 'bottom',
        onNextClick: () => switchTabThenNext(1),
      },
    },
    {
      element: '[data-tour="ubic-mapa"]',
      popover: {
        title: es() ? '📍 Ubicación en el mapa — Toca una zona' : '📍 Map location — Tap a zone',
        description: es()
          ? '<strong>Pulsa la zona del tablero</strong> donde se encuentra tu investigador. En modo online, la app busca automáticamente otros investigadores en esa zona y propone una interacción aleatoria.'
          : '<strong>Tap the board zone</strong> where your investigator is. In online mode, the app automatically finds other investigators in that zone and proposes a random interaction.',
        side: 'right',
      },
    },

    // ══════════════════════════════════════════════════════════
    // PIVOT → TAB 2 — ESTADOS
    // ══════════════════════════════════════════════════════════
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '🤕 Cambia a Estados — Toca el icono 🤕' : '🤕 Switch to States — Tap the 🤕 icon',
        description: es()
          ? '<strong>Pulsa el icono 🤕</strong> para ver y gestionar los estados del investigador. Continuamos el tour automáticamente.'
          : '<strong>Tap the 🤕 icon</strong> to see and manage investigator states. We\'ll continue the tour automatically.',
        side: 'bottom',
        onNextClick: () => switchTabThenNext(2),
      },
    },
    {
      element: '[data-tour="estados-filtros"]',
      popover: {
        title: es() ? '🤕 Filtrar Estados — Activos o Todos' : '🤕 Filter States — Active or All',
        description: es()
          ? '<strong>Pulsa "Activos"</strong> para ver solo los estados que tienes ahora, o <strong>"Todos"</strong> para ver la lista completa y activar/desactivar cualquiera pulsando sobre él.'
          : '<strong>Tap "Active"</strong> to see only your current states, or <strong>"All"</strong> to see the full list and toggle any state by tapping it.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="estados-area"]',
      popover: {
        title: es() ? '🤕 Estados — Pulsa uno para activarlo' : '🤕 States — Tap one to toggle it',
        description: es()
          ? '<strong>Pulsa cualquier estado</strong> para activarlo o desactivarlo. Los estados resaltados en verde están activos. <em>Bendición (4-5-6 = éxito), Maldición (solo 6 = éxito), Pacto Siniestro, Mancillado</em> y más.'
          : '<strong>Tap any state</strong> to activate or deactivate it. States highlighted in green are active. <em>Blessing (4-5-6 = success), Curse (only 6), Sinister Pact, Defiled</em> and more.',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════════
    // PIVOT → TAB 3 — HABILIDADES
    // ══════════════════════════════════════════════════════════
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '🃏 Cambia a Habilidades — Toca el icono 🃏' : '🃏 Switch to Skills — Tap the 🃏 icon',
        description: es()
          ? '<strong>Pulsa el icono 🃏</strong> para ver las habilidades únicas y las cartas del investigador. Continuamos el tour automáticamente.'
          : '<strong>Tap the 🃏 icon</strong> to see the investigator\'s unique skills and cards. We\'ll continue the tour automatically.',
        side: 'bottom',
        onNextClick: () => switchTabThenNext(3),
      },
    },
    {
      element: '[data-tour="hab-habilidades"]',
      popover: {
        title: es() ? '✨ Habilidades especiales del investigador' : '✨ Investigator special skills',
        description: es()
          ? 'Aquí se muestran los efectos únicos de tu investigador. Están siempre disponibles: son las reglas especiales que diferencian a este personaje de todos los demás.'
          : 'Here you see your investigator\'s unique effects. They\'re always available: these are the special rules that set this character apart from all others.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="hab-pertenencias"]',
      popover: {
        title: es() ? '🎒 Pertenencias — Pulsa + para buscar' : '🎒 Belongings — Tap + to search',
        description: es()
          ? 'Lista de cartas y objetos que posee el investigador. <strong>Pulsa cualquier carta</strong> para ver su detalle. <strong>Pulsa el botón +</strong> para buscar y añadir nuevas cartas (compradas en la tienda o encontradas en el mapa).'
          : 'List of cards and items the investigator owns. <strong>Tap any card</strong> to see its detail. <strong>Tap the + button</strong> to search and add new cards (bought in the store or found on the map).',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════════
    // PIVOT → TAB 4 — AJUSTES
    // ══════════════════════════════════════════════════════════
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '⚙️ Cambia a Ajustes — Toca el icono ⚙️' : '⚙️ Switch to Settings — Tap the ⚙️ icon',
        description: es()
          ? '<strong>Pulsa el icono ⚙️</strong> para ver los ajustes de la partida. Continuamos el tour automáticamente.'
          : '<strong>Tap the ⚙️ icon</strong> to see game settings. We\'ll continue the tour automatically.',
        side: 'bottom',
        onNextClick: () => switchTabThenNext(4),
      },
    },
    {
      element: '[data-tour="ajustes-toggles"]',
      popover: {
        title: es() ? '🔊🌐 Audio y Modo Online — Pulsa ON / OFF' : '🔊🌐 Audio & Online Mode — Tap ON / OFF',
        description: es()
          ? '<strong>Efectos y Música:</strong> activa o desactiva con ON/OFF. <strong>Modo Online:</strong> conecta o desconecta la sincronización con otros jugadores. El botón 📡 fuerza una búsqueda manual de invitaciones.'
          : '<strong>Effects & Music:</strong> toggle with ON/OFF. <strong>Online Mode:</strong> connect or disconnect sync with other players. The 📡 button forces a manual invitation search.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="ajustes-guardar"]',
      popover: {
        title: es() ? '💾 Guardar Investigador — Toca para guardar' : '💾 Save Investigator — Tap to save',
        description: es()
          ? '<strong>Pulsa este botón</strong> al finalizar la sesión para guardar el estado actual del investigador (vida, cordura, objetos, etc.) en tu perfil online. Necesitas estar registrado.'
          : '<strong>Tap this button</strong> at the end of a session to save the investigator\'s current state (life, sanity, items, etc.) to your online profile. Requires sign in.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="ajustes-footer"]',
      popover: {
        title: es() ? '🚪 Salir — Seleccionar o Terminar' : '🚪 Exit — Select or End',
        description: es()
          ? '<strong>Seleccionar personaje:</strong> vuelve a la lista de investigadores sin borrar la partida. <strong>Terminar partida:</strong> cierra la partida completamente y regresa al menú principal.'
          : '<strong>Select character:</strong> returns to the investigator list without ending the game. <strong>End game:</strong> closes the game completely and returns to the main menu.',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════════
    // Pestaña MAP (informacional)
    // ══════════════════════════════════════════════════════════
    {
      popover: {
        title: es() ? '🗺️ Pestaña Map — Mesa compartida' : '🗺️ Map tab — Shared table',
        description: es()
          ? '<strong>Toca la pestaña "Map"</strong> arriba para ver las fichas globales: perdición, pistas de la mesa, tienda de objetos y reserva de Mitos. Necesita un mapa online activo. En ajustes del mapa verás el <strong>código de partida</strong> para que se unan otros jugadores.'
          : '<strong>Tap the "Map" tab</strong> at the top to see global tokens: doom, table clues, item store and Mythos reserve. Requires an active online map. In map settings you\'ll find the <strong>game code</strong> for other players to join.',
      },
    },

    // ══════════════════════════════════════════════════════════
    // Final
    // ══════════════════════════════════════════════════════════
    {
      popover: {
        title: es() ? '✅ ¡Tour completado!' : '✅ Tour complete!',
        description: es()
          ? '¡Ya conoces toda la aplicación! Puedes relanzar este tour en cualquier momento desde <strong>Tutoriales</strong> en el menú principal.<br><br><em>¡Que los Dioses Exteriores no te encuentren, investigador!</em>'
          : 'You now know the whole app! You can relaunch this tour any time from <strong>Tutorials</strong> in the main menu.<br><br><em>May the Outer Gods not find you, investigator!</em>',
      },
    },
  ], 'play').drive();
}

// ─────────────────────────────────────────────────────────────
// API PÚBLICA
// ─────────────────────────────────────────────────────────────
export function initTour(router, store, lang) {
  _router = router;
  _store  = store  || null;
  _lang   = lang   || 'español';
}

export function updateLang(lang) { _lang = lang; }

export function notifyInvListLoaded(firstIdInv) { _availableIdInv = firstIdInv; }

export function startTourFromHome() {
  localStorage.removeItem(CONTINUE_KEY);
  segmentHome();
}

export function continueTourIfNeeded(route) {
  const next = localStorage.getItem(CONTINUE_KEY);
  if (!next || next !== route) return;
  localStorage.removeItem(CONTINUE_KEY);

  const delay = route === '/PlayAH' ? 900 : 500;
  setTimeout(() => {
    if      (route === '/ListaMapas')        segmentListaMapas();
    else if (route === '/DetalleMapa')       segmentDetalleMapa();
    else if (route === '/ListaPersonajes')   segmentListaPersonajes();
    else if (route === '/DetallePersonaje')  segmentDetallePersonaje();
    else if (route === '/PlayAH')            segmentPlay();
  }, delay);
}
