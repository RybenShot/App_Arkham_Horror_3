import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { apiService } from '@/services/api.js';

const CONTINUE_KEY = 'ah_tour_continue';

let _driverInstance   = null;
let _router           = null;
let _store            = null;
let _lang             = 'español';
let _currentSegment   = null;
let _availableIdInv   = null;
let _escHandler       = null;

const es = () => _lang === 'español';

// ─────────────────────────────────────────────────────────────
// Confirmación al salir
// ─────────────────────────────────────────────────────────────
function showExitConfirm() {
  if (document.querySelector('.ah-tour-confirm')) return;

  const box = document.createElement('div');
  box.className = 'ah-tour-confirm';
  box.innerHTML = `
    <div class="ah-tour-confirm-box">
      <p class="ah-tour-confirm-title">${es() ? '¿Abandonar el tour?' : 'Abandon the tour?'}</p>
      <p class="ah-tour-confirm-text">${es()
        ? 'Podrás relanzarlo en cualquier momento desde Tutoriales en el menú principal.'
        : 'You can relaunch it any time from Tutorials in the main menu.'}</p>
      <div class="ah-tour-confirm-btns">
        <button class="ah-tour-confirm-yes">${es() ? 'Sí, salir' : 'Yes, exit'}</button>
        <button class="ah-tour-confirm-no">${es() ? 'No, continuar' : 'No, keep going'}</button>
      </div>
    </div>
  `;
  box.querySelector('.ah-tour-confirm-yes').addEventListener('click', () => {
    box.remove();
    destroy();
  });
  box.querySelector('.ah-tour-confirm-no').addEventListener('click', () => {
    box.remove();
  });
  document.body.appendChild(box);
}

// ─────────────────────────────────────────────────────────────
// Internals
// ─────────────────────────────────────────────────────────────
function destroy() {
  document.querySelector('.ah-tour-confirm')?.remove();
  if (_escHandler) {
    document.removeEventListener('keydown', _escHandler, true);
    _escHandler = null;
  }
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
      try {
        const idToUse = _availableIdInv || 1;
        const response = await apiService.obtainInvByID(idToUse);
        _store.commit('setDatosInvestigator', response);
      } catch (e) { /* navegar igualmente */ }
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

// ─── Tab-switch helper ───────────────────────────────────────
function switchTabThenNext(index) {
  setPlayTab(index);
  setTimeout(() => _driverInstance?.moveNext(), 400);
}

// ─────────────────────────────────────────────────────────────
// makeDriver + driveSegment
// ─────────────────────────────────────────────────────────────
function makeDriver(steps, segment) {
  destroy();
  _currentSegment = segment;

  // ESC → confirmación en lugar de cerrar
  _escHandler = (e) => {
    if (e.key === 'Escape' && _driverInstance) {
      e.preventDefault();
      e.stopPropagation();
      showExitConfirm();
    }
  };
  document.addEventListener('keydown', _escHandler, true);

  _driverInstance = driver({
    animate:        true,
    smoothScroll:   true,
    allowClose:     false,   // el overlay no cierra directamente; usamos nuestro handler
    overlayOpacity: 0.72,
    stagePadding:   8,
    stageRadius:    6,
    popoverClass:   'ah-tour-popover',
    progressText:   '{{current}} / {{total}}',
    nextBtnText:    es() ? 'Siguiente →' : 'Next →',
    prevBtnText:    es() ? '← Atrás'    : '← Back',
    doneBtnText:    es() ? '✓ Listo'    : '✓ Done',

    steps,

    onPopoverRender: (popover, { state }) => {
      // ── Botón skip ───────────────────────────────────────
      const skipBtn = document.createElement('button');
      skipBtn.textContent = es() ? '⏭ Saltar sección' : '⏭ Skip section';
      skipBtn.className = 'ah-tour-skip-btn';
      skipBtn.addEventListener('click', skipToNext);
      const target = popover.footerButtons || popover.nextButton;
      if (target && target.parentNode === popover.footer)
        popover.footer.insertBefore(skipBtn, target);
      else
        popover.footer.appendChild(skipBtn);

      // ── Botón ✕ salir (esquina superior derecha del popover) ──
      const exitBtn = document.createElement('button');
      exitBtn.textContent = '✕';
      exitBtn.className = 'ah-tour-exit-btn';
      exitBtn.title = es() ? 'Salir del tour' : 'Exit tour';
      exitBtn.addEventListener('click', showExitConfirm);
      if (popover.title?.parentElement)
        popover.title.parentElement.appendChild(exitBtn);

      // ── Ocultar "Siguiente" en pasos que requieren toque ──
      const noNextBtn = state?.activeStep?.popover?.noNextBtn;
      if (noNextBtn) {
        if (popover.nextButton) popover.nextButton.style.display = 'none';
        // Añadir pista visual de toque
        if (popover.description && !popover.description.querySelector('.ah-tap-hint')) {
          const hint = document.createElement('p');
          hint.className = 'ah-tap-hint';
          hint.textContent = es()
            ? '👆 Toca el elemento resaltado para continuar'
            : '👆 Tap the highlighted element to continue';
          popover.description.appendChild(hint);
        }
      }
    },
  });

  return _driverInstance;
}

function driveSegment(steps, segment) {
  makeDriver(steps, segment).drive();
  // Attach click en overlay → confirmación (allowClose:false ya lo bloquea, pero interceptamos el click igualmente)
  setTimeout(() => {
    const overlay = document.querySelector('.driver-overlay');
    if (overlay && !overlay.dataset.ahHandler) {
      overlay.dataset.ahHandler = '1';
      overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        showExitConfirm();
      });
    }
  }, 300);
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 1 — HOME
// ─────────────────────────────────────────────────────────────
function segmentHome() {
  driveSegment([
    {
      popover: {
        title: es() ? '¡Bienvenido a Arkham Horror App!' : 'Welcome to Arkham Horror App!',
        description: es()
          ? 'Este tour te guiará por todas las funciones hasta tu primera partida. Pulsa Siguiente para empezar o <em>Saltar sección</em> para ir directo a los Mapas.'
          : 'This tour will guide you through all features up to your first game. Press Next to begin or <em>Skip section</em> to jump straight to Maps.',
      },
    },
    {
      popover: {
        title: es() ? '❤️ Hecha con pasión' : '❤️ Made with passion',
        description: es()
          ? 'Esta aplicacion es una herramienta para Arkham Horror 3ª Edición: seguimiento de partida, contenido de la comunidad, modo online y mucho más te espera. Desarrollada únicamente por 1 sola persona así que cualquier contribución ayudará a mantener esta aplicacion viva. <br> ¡Gracias y disfrutad!'
          : 'This app is a companion for Arkham Horror 3rd Edition: game tracking, community content, online mode and much more await you. Built by just one person — any contribution helps keep the app alive. <br>Thank you and enjoy!',
      },
    },
    {
      element: '[data-tour="visit-counter"]',
      popover: {
        title: es() ? '👁 Visitas y usuarios activos' : '👁 Visits & Active Investigators',
        description: es()
          ? 'El primer número muestra las visitas totales. El punto rojo parpadeante indica cuántos usuarios están jugando ahora mismo.'
          : 'The first number shows total visits. The blinking red dot shows how many users are playing right now.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="login-section"]',
      popover: {
        title: es() ? '🔐 Iniciar Sesión — Importante' : '🔐 Sign In — Important',
        description: es()
          ? 'Algunas funciones requieren estar registrado: modo online, guardar tu investigador, votar mapas o crear partidas compartidas. <br> Te recomendamos iniciar sesión antes de empezar. <br> Si solo quieres usar la app para el mapa, mazos o modo offline, puedes seguir sin problemas.'
          : 'Some features require an account: online mode, saving your investigator, voting on maps or creating shared games. <br>We recommend signing in before starting. <br>If you only want the app for map/deck setup or offline play, you can use it without any issues.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="btn-mapas"]',
      popover: {
        title: es() ? '🗺️ Mapas' : '🗺️ Maps',
        description: es()
          ? 'Accede a todos los escenarios: historia con audio, dificultad, lista de enemigos CON IMAGENES, opiniones de la comunidad, partidas online, etc.'
          : 'Access all scenarios: audio story, difficulty, enemy list WITH IMAGES, community opinions, online games and more.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="btn-investigadores"]',
      popover: {
        title: es() ? '🕵️ Investigadores' : '🕵️ Investigators',
        description: es()
          ? 'Lista de personajes. Aqui podras acceder a toda la lista de personajes de todas las expansiones y de nuevos personajes hechos por la comunidad o únicos de esta aplicacion.'
          : 'Character list. Here you can access the full roster from all expansions, plus new characters made by the community or exclusive to this app.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="btn-tutoriales"]',
      popover: {
        title: es() ? '📖 Tutoriales' : '📖 Tutorials',
        description: es()
          ? 'Vuelve aquí en cualquier momento para releer las reglas o relanzar este tour.'
          : 'Come back here any time to re-read the rules or relaunch this tour.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="support-row"]',
      popover: {
        title: es() ? '☕ Apóyanos & Instagram' : '☕ Support Us & Instagram',
        description: es()
          ? 'Cualquier aportacion ayudara con el proyecto. Desde Instagram podras ver el avance de la app. ¡Síguenos!'
          : 'Any contribution helps the project. On Instagram you can follow the app\'s progress. Follow us!',
        side: 'top',
      },
    },
    {
      element: '[data-tour="noticias-section"]',
      popover: {
        title: es() ? '📰 Últimas actualizaciones' : '📰 Latest updates',
        description: es()
          ? 'Despliega este panel para ver el historial de versiones y las novedades de cada actualización.'
          : 'Expand this panel to see the version history and what\'s new in each update.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="btn-mapas"]',
      popover: {
        title: es() ? '¡Empezamos!' : '→ Let\'s go!',
        description: es()
          ? 'Para empezar, tenemos que seleccionar primero qué mapa vamos a jugar. ¡Vamos allá!'
          : 'To start, we need to choose which map we\'ll play. Let\'s go!',
        side: 'top',
        onNextClick: () => goTo('/ListaMapas', '/ListaMapas'),
      },
    },
  ], 'home');
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 2 — LISTA DE MAPAS
// ─────────────────────────────────────────────────────────────
function segmentListaMapas() {
  driveSegment([
    {
      element: '[data-tour="mapa-filtros"]',
      popover: {
        title: es() ? '📦 Filtros de expansión' : '📦 Expansion filters',
        description: es()
          ? 'Pulsa alguno de estos botones para activar o desactivar una expansión y revelar sus mapas.'
          : 'Tap any of these buttons to enable or disable an expansion and reveal its maps.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="mapa-online-btn"]',
      popover: {
        title: es() ? '🌐 Botón Online' : '🌐 Online Button',
        description: es()
          ? 'Toca aquí para unirte a una partida creada por otro jugador introduciendo su código de mapa. ¿Dónde se encuentra este código? Lo verás en la pantalla de ajustes del mapa online. <br> 🌐 Necesitas estar registrado. 🌐'
          : 'Tap here to join a game created by another player using their map code. Where do you find this code? You\'ll see it on the online map settings screen. <br>🌐 You need to be registered. 🌐',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="mapa-grid"]',
      onHighlightStarted: () => {
        localStorage.setItem(CONTINUE_KEY, '/DetalleMapa');
        const grid = document.querySelector('[data-tour="mapa-grid"]');
        if (grid) {
          const onTap = () => { grid.removeEventListener('click', onTap); destroy(); };
          grid.addEventListener('click', onTap);
        }
      },
      popover: {
        title: es() ? '🗺️ Escenarios — Toca uno para continuar' : '🗺️ Scenarios — Tap one to continue',
        description: es()
          ? 'Aqui puedes ver todos los mapas de la expansión seleccionada. Se distinguen por el color de fondo según su expansión. Toca alguno para seguir el tour y ver el mapa en detalle.'
          : 'Here you can see all maps from the selected expansion, distinguished by their background color. Tap one to continue the tour and see the map in detail.',
        side: 'top',
        noNextBtn: true,
      },
    },
  ], 'listaMapa');
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 3 — DETALLE DE MAPA
// ─────────────────────────────────────────────────────────────
function segmentDetalleMapa() {
  driveSegment([
    {
      element: '[data-tour="mapa-historia"]',
      popover: {
        title: es() ? '📜 Historia con Audio' : '📜 Story with Audio',
        description: es()
          ? 'Texto introductorio del escenario. Pulsa el icono 🔊 para escuchar la locución y sumergirte en la historia.'
          : 'Introductory text for the scenario. Tap the 🔊 icon to hear the narration and immerse yourself in the story.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="mapa-especificaciones"]',
      popover: {
        title: es() ? '👍 Opiniones de la comunidad' : '👍 Community opinions',
        description: es()
          ? 'Pulsa 👍 o 👎 para votar. Consulta la dificultad estimada y la duración media según la comunidad. Necesitas estar registrado para votar.'
          : 'Tap 👍 or 👎 to vote. Check the estimated difficulty and average duration from the community. You need to be registered to vote.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="mapa-btn-enemigos"]',
      popover: {
        title: es() ? '👾 Lista de enemigos' : '👾 Enemy list',
        description: es()
          ? 'Pulsa aquí para ver todos los monstruos del escenario. El color de fondo de cada enemigo indica a qué expansión pertenece.'
          : 'Tap here to see all monsters in the scenario. The background color of each enemy indicates which expansion it belongs to.',
        side: 'left',
      },
    },
    {
      element: '[data-tour="mapa-loseta-img"]',
      popover: {
        title: es() ? '🧩 Mapa de losetas' : '🧩 Tile map',
        description: es()
          ? 'Vista del tablero con la disposición de losetas. Pulsa sobre la imagen para verla ampliada.'
          : 'Board view with tile layout. Tap the image to see it enlarged.',
        side: 'right',
      },
    },
    {
      element: '[data-tour="mapa-btn-inv-rec"]',
      popover: {
        title: es() ? '🕵️ Investigadores Recomendados' : '🕵️ Recommended Investigators',
        description: es()
          ? 'Pulsa aquí para ver qué investigadores recomienda la comunidad para este mapa y por qué. Muy útil si es tu primera vez en este escenario.'
          : 'Tap here to see which investigators the community recommends for this map and why. Very useful for your first time in this scenario.',
        side: 'left',
      },
    },
    {
      element: '[data-tour="mapa-btn-online"]',
      popover: {
        title: es() ? '🌐 Crear Mapa Online' : '🌐 Create Online Map',
        description: es()
          ? 'Pulsa aquí para crear una partida online. Todos los jugadores podrán conectarse y gestionar juntos las fichas generales, tienda de objetos o saco de ficha de mitos. Todos los jugadores que quieran unirse necesitan estar registrados.'
          : 'Tap here to create an online game. All players can connect and manage general tokens together, the item shop or the Mythos token bag. All players who want to join need to be registered.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="mapa-btn-selec-inv"]',
      popover: {
        title: es() ? '→ Seleccionar Investigador' : '→ Select Investigator',
        description: es()
          ? 'Una vez elegido el mapa, vamos a seleccionar nuestro investigador.'
          : 'Once the map is chosen, let\'s select our investigator.',
        side: 'top',
        onNextClick: () => goTo('/ListaPersonajes', '/ListaPersonajes'),
      },
    },
  ], 'detalleMapa');
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 4 — LISTA DE INVESTIGADORES
// ─────────────────────────────────────────────────────────────
function segmentListaPersonajes() {
  driveSegment([
    {
      element: '[data-tour="expansion-tabs"]',
      popover: {
        title: es() ? '🔖 Pestañas de filtro' : '🔖 Filter tabs',
        description: es()
          ? 'Pulsa "Expansiones" para filtrar por expansión, o "Arquetipos" para filtrar por rol: Superviviente, Místico, Experto, Defensor, Buscador o Neutral. O puedes no seleccionar ninguno y dejar que elija el destino con la opción al azar.'
          : 'Tap "Expansions" to filter by expansion, or "Archetypes" to filter by role: Survivor, Mystic, Rogue, Guardian, Seeker or Neutral. Or select none and let fate decide with the random option.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="expansion-buttons"]',
      popover: {
        title: es() ? '📦 Activar expansiones' : '📦 Enable expansions',
        description: es()
          ? 'Pulsa los botones de color para activar las expansiones que tengas. Los investigadores de esa expansión aparecerán abajo. El borde de cada carta coincide con el color de su expansión.'
          : 'Tap the colored buttons to activate the expansions you own. Investigators from that expansion appear below. Each card\'s border matches its expansion\'s color.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="inv-online-btn"]',
      popover: {
        title: es() ? '🌐 Investigadores Online' : '🌐 Online Investigators',
        description: es()
          ? 'Aquí encontrarás los investigadores guardados que tengas. Requiere estar registrado.'
          : 'Here you\'ll find your saved investigators. Requires being registered.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="inv-grid"]',
      onHighlightStarted: () => {
        localStorage.setItem(CONTINUE_KEY, '/DetallePersonaje');
        const grid = document.querySelector('[data-tour="inv-grid"]');
        if (grid) {
          const onTap = () => { grid.removeEventListener('click', onTap); destroy(); };
          grid.addEventListener('click', onTap);
        }
      },
      popover: {
        title: es() ? '🃏 Elige un Investigador — Toca una carta' : '🃏 Choose an Investigator — Tap a card',
        description: es()
          ? 'Cada carta muestra vida ❤️ y cordura 🧠 base. Vamos a ver el detalle de un investigador. Toca alguno para continuar.'
          : 'Each card shows base life ❤️ and sanity 🧠. Let\'s see an investigator\'s detail — tap any one to continue.',
        side: 'top',
        noNextBtn: true,
      },
    },
  ], 'listaPersonaje');
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 5 — DETALLE DE PERSONAJE
// ─────────────────────────────────────────────────────────────
function segmentDetallePersonaje() {
  driveSegment([
    {
      element: '[data-tour="detalle-img"]',
      popover: {
        title: es() ? '🖼️ Imagen e identidad' : '🖼️ Image & identity',
        description: es()
          ? 'Aquí puedes ver los datos básicos del personaje: imagen, nombre y rol. Usa los botones de la derecha para ver sus <em>pertenencias iniciales</em> (con qué objetos empieza), su <em>historia personal</em> con audio, su <em>arquetipo</em> y el dinero con el que empieza.'
          : 'Here you can see the character\'s basic info: image, name and role. Use the buttons on the right to see their <em>starting belongings</em> (what items they begin with), their <em>personal story</em> with audio, their <em>archetype</em> and starting money.',
        side: 'right',
      },
    },
    {
      element: '[data-tour="detalle-stats"]',
      popover: {
        title: es() ? '📊 Atributos y especificaciones' : '📊 Attributes & specs',
        description: es()
          ? 'Aquí puedes ver la valoración del personaje (puedes aportar si estás registrado), comentarios de otros jugadores y los valores base: Vida, Cordura y los atributos: Saber, Influencia, Observación, Fuerza y Voluntad. Determinan cuántos dados base tiras en cada prueba. A mayor valor, más dados y más posibilidades de éxito.'
          : 'Here you can see the character\'s rating (you can contribute if registered), comments from other players, and the base values: Life, Sanity and the attributes: Lore, Influence, Observation, Strength and Willpower. They determine how many base dice you roll in each test. Higher value = more dice = more chances of success.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="detalle-habilidades"]',
      popover: {
        title: es() ? '✨ Habilidad especial' : '✨ Special ability',
        description: es()
          ? 'La habilidad única de este investigador. Léela con atención, puede cambiar completamente tu estrategia. Algunos investigadores también tienen habilidades pasivas que se activan automáticamente. Debajo puedes ver la frase del personaje y, por último, el límite de concentración.'
          : 'This investigator\'s unique ability. Read it carefully — it can completely change your strategy. Some investigators also have passive abilities that activate automatically. Below you can see the character\'s quote and finally, the concentration limit.',
        side: 'top',
      },
    },
    {
      // El usuario pulsa "Comenzar" libremente, selecciona objetos iniciales y navega a PlayAH.
      // El tour continúa automáticamente al cargar PlayAH gracias a CONTINUE_KEY.
      element: '[data-tour="detalle-comenzar"]',
      onHighlightStarted: () => {
        localStorage.setItem(CONTINUE_KEY, '/PlayAH');
        const btn = document.querySelector('[data-tour="detalle-comenzar"]');
        if (btn) {
          const onTap = () => { btn.removeEventListener('click', onTap); destroy(); };
          btn.addEventListener('click', onTap);
        }
      },
      popover: {
        title: es() ? '▶️ ¡Tu turno!' : '▶️ Your turn!',
        description: es()
          ? 'Pulsa el botón verde "Comenzar". Selecciona tus objetos iniciales en la ventana que aparecerá y después ¡empieza la aventura! El tour continuará automáticamente en la pantalla de juego.'
          : 'Tap the green "Comenzar" button. Select your starting items in the window that appears, then the adventure begins! The tour will continue automatically on the game screen.',
        side: 'top',
        noNextBtn: true,
      },
    },
  ], 'detallePersonaje');
}

// ─────────────────────────────────────────────────────────────
// SEGMENTO 6 — PANTALLA DE JUEGO (Play)
// ─────────────────────────────────────────────────────────────
function segmentPlay() {
  setPlayTab(0); // arrancar en Tiradas

  driveSegment([
    // ── Pestañas Player / Map ──────────────────────────────
    {
      element: '[data-tour="play-tabs"]',
      popover: {
        title: es() ? '🎮 Pantalla de Juego' : '🎮 Game Screen',
        description: es()
          ? 'Tienes dos pestañas principales: <br><b>Player</b>: gestiona todo lo de tu personaje. <br><b>Map</b>: fichas globales de la mesa cuando hay un mapa online activo (perdición, pistas globales, tienda de objetos, reserva de Mitos). Puedes tocar las pestañas para cambiar entre vistas.'
          : 'Two main tabs: <br><b>Player</b>: manage everything about your character. <br><b>Map</b>: global table tokens when an online map is active (doom, global clues, item shop, Mythos reserve). Tap the tabs to switch views.',
        side: 'bottom',
      },
    },
    // ── Barra de navegación ────────────────────────────────
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '🧭 Navegador' : '🧭 Navigator',
        description: es()
          ? 'Pulsa cada icono para acceder a su zona: <br> 🎲 Tiradas <br> 📍 Ubicación en mapa (modo Online)<br> 🤕 Estados <br> 🃏 Habilidades <br> ⚙️ Ajustes. <br> El icono activo se muestra en verde.'
          : 'Tap each icon to access its zone: <br>🎲 Dice Rolls <br>📍 Map Location (Online mode) <br>🤕 States <br>🃏 Skills <br>⚙️ Settings. <br>The active icon shows in green.',
        side: 'bottom',
      },
    },

    // ── Vida, Recursos y Modificar (en un solo paso) ───────
    {
      element: '[data-tour="play-sumar-restar"]',
      popover: {
        title: es() ? '❤️💰 Vida, Recursos y Modificar valores' : '❤️💰 Life, Resources & Modify Values',
        description: es()
          ? 'Toca primero qué quieres modificar: ❤️ Vida, 🧠 Cordura, 💰 Dinero, 🔍 Pistas o Restos. El icono seleccionado se resaltará. Después usa los botones <b>+</b> y <b>−</b> de esta zona para subir o bajar el valor. <br>⚠️ Si Vida o Cordura llegan a 0, ¡la partida termina!'
          : 'First tap what to modify: ❤️ Life, 🧠 Sanity, 💰 Money, 🔍 Clues or Remnants. The selected icon highlights. Then use <b>+</b> and <b>−</b> here to raise or lower the value. <br>⚠️ If Life or Sanity reach 0, the game ends!',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════
    // TAB 0 — TIRADAS (ya activo)
    // ══════════════════════════════════════════════════════
    {
      popover: {
        title: es() ? '🎲 Zona de Tiradas de Dados' : '🎲 Dice Rolling Zone',
        description: es()
          ? 'Entramos ahora en la zona de Tiradas: el corazón del juego. Aquí gestionarás todas las pruebas. Elige un atributo, añade dados extra si los tienes y lanza los dados. ¡Vamos a verlo!'
          : 'Now entering the Dice Rolling zone — the heart of the game. Here you\'ll manage all tests: choose an attribute, add extra dice if you have them, and roll. Let\'s see it!',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="tiradas-atributos"]',
      popover: {
        title: es() ? '🎲 Seleccionar atributo' : '🎲 Select attribute',
        description: es()
          ? 'Pulsa uno de los 5 atributos para cargar el número de dados base. El atributo seleccionado se muestra en color.'
          : 'Tap one of the 5 attributes (Lore, Influence, Observation, Strength, Willpower) to load the base dice count. The selected attribute highlights in color.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="tiradas-lanzar"]',
      popover: {
        title: es() ? '🎲 Dados Extra y Lanzar' : '🎲 Extra Dice & Roll',
        description: es()
          ? 'Usa + y − para añadir dados extra (por pistas u objetos). El total aparece debajo. Pulsa el botón verde TIRAR para lanzar los dados y ver el resultado.'
          : 'Use + and − to add extra dice (from clues or items). The total shows below. Tap the green THROW button to roll and see the result.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="tiradas-concentracion"]',
      popover: {
        title: es() ? '🎯 Fichas de Concentración' : '🎯 Concentration tokens',
        description: es()
          ? 'Pulsa "Añadir" para elegir el tipo de ficha de concentración. Estas fichas añaden un dado extra de un tipo específico cuando las usas con "Usar 1".'
          : 'Tap "Add" to choose a concentration token type. These tokens add one extra die of a specific type when used with "Use 1". Very useful in critical moments.',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════
    // PIVOT → TAB 1 — UBICACIÓN
    // ══════════════════════════════════════════════════════
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '📍 Cambia a Ubicación' : '📍 Switch to Location',
        description: es()
          ? 'Ahora vamos a ver la zona de ubicación. Pulsa Siguiente y se cambiará automáticamente.'
          : 'Now let\'s see the location zone. Press Next and it will switch automatically.',
        side: 'bottom',
        onNextClick: () => switchTabThenNext(1),
      },
    },
    {
      element: '[data-tour="ubic-mapa"]',
      popover: {
        title: es() ? '📍 Ubicación en el mapa' : '📍 Map location',
        description: es()
          ? 'Pulsa la zona del tablero donde se encuentra tu investigador. En modo online, la app busca automáticamente otros investigadores en esa zona y propone una interacción aleatoria. Para ver más sobre estos encuentros, ve a la zona de tutoriales.'
          : 'Tap the board zone where your investigator is. In online mode, the app automatically finds other investigators in that zone and proposes a random interaction. To learn more about these encounters, visit the Tutorials section.',
        side: 'right',
      },
    },

    // ══════════════════════════════════════════════════════
    // PIVOT → TAB 2 — ESTADOS
    // ══════════════════════════════════════════════════════
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '🤕 Cambia a Estados' : '🤕 Switch to States',
        description: es()
          ? 'Ahora vamos a ver la zona de estados. Pulsa Siguiente y se cambiará automáticamente.'
          : 'Now let\'s see the states zone. Press Next and it will switch automatically.',
        side: 'bottom',
        onNextClick: () => switchTabThenNext(2),
      },
    },
    {
      element: '[data-tour="estados-filtros"]',
      popover: {
        title: es() ? '🤕 Filtrar Estados' : '🤕 Filter States',
        description: es()
          ? 'Pulsa "Activos" para ver solo los estados que tienes ahora, o "Todos" para ver la lista completa y activar/desactivar cualquiera pulsando sobre él.'
          : 'Tap "Active" to see only your current states, or "All" to see the full list and toggle any state by tapping it.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="estados-area"]',
      popover: {
        title: es() ? '🤕 Estados — Pulsa uno para activarlo' : '🤕 States — Tap one to toggle it',
        description: es()
          ? 'Pulsa cualquier estado para activarlo o desactivarlo. Los estados resaltados en verde están activos. Algunos estados no se pueden activar manualmente: se activan de forma automática como consecuencia de otra carta.'
          : 'Tap any state to activate or deactivate it. States highlighted in green are active. Some states cannot be toggled manually — they activate automatically as a result of another card.',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════
    // PIVOT → TAB 3 — HABILIDADES
    // ══════════════════════════════════════════════════════
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '🃏 Cambia a Habilidades' : '🃏 Switch to Skills',
        description: es()
          ? 'Ahora vamos a ver la zona de habilidades únicas y gestión de cartas. Pulsa Siguiente y se cambiará automáticamente.'
          : 'Now let\'s see the unique skills and card management zone. Press Next and it will switch automatically.',
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
          : 'Here you see your investigator\'s unique effects. They\'re always available — these are the special rules that set this character apart from all others.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="hab-pertenencias"]',
      popover: {
        title: es() ? '🎒 Pertenencias' : '🎒 Belongings',
        description: es()
          ? 'Lista de cartas y objetos que posee el investigador. Pulsa cualquier carta para ver su detalle. Pulsa el botón + para buscar y añadir nuevas cartas.'
          : 'List of cards and items the investigator owns. Tap any card to see its detail. Tap the + button to search and add new cards (bought in the store or found on the map).',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════
    // PIVOT → TAB 4 — AJUSTES
    // ══════════════════════════════════════════════════════
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '⚙️ Cambia a Ajustes' : '⚙️ Switch to Settings',
        description: es()
          ? 'Aquí podrás ver las opciones generales. Pulsa Siguiente y se cambiará automáticamente.'
          : 'Here you\'ll see general game settings. Press Next and it will switch automatically.',
        side: 'bottom',
        onNextClick: () => switchTabThenNext(4),
      },
    },
    {
      element: '[data-tour="ajustes-toggles"]',
      popover: {
        title: es() ? '🔊🌐 Audio y Modo Online' : '🔊🌐 Audio & Online Mode',
        description: es()
          ? 'Aquí puedes activar o desactivar los efectos de sonido o música, y habilitar o no los encuentros online.'
          : 'Here you can toggle sound effects or music, and enable or disable online encounters.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="ajustes-guardar"]',
      popover: {
        title: es() ? '💾 Guardar Investigador' : '💾 Save Investigator',
        description: es()
          ? 'Pulsa este botón al finalizar la sesión para guardar el estado actual del investigador (vida, cordura, objetos, etc.) en tu perfil. Necesitas estar registrado.'
          : 'Tap this button at the end of a session to save the investigator\'s current state (life, sanity, items, etc.) to your profile. Requires being registered.',
        side: 'top',
      },
    },
    {
      element: '[data-tour="ajustes-footer"]',
      popover: {
        title: es() ? '🚪 Salir — Seleccionar o Terminar' : '🚪 Exit — Select or End',
        description: es()
          ? 'Seleccionar personaje: vuelve a la lista de investigadores sin borrar la partida. Terminar partida: cierra la partida completamente y regresa al menú principal.'
          : 'Select character: returns to the investigator list without ending the game. End game: closes the game completely and returns to the main menu.',
        side: 'top',
      },
    },

    // ══════════════════════════════════════════════════════
    // Información Pestaña Map (online)
    // ══════════════════════════════════════════════════════
    {
      popover: {
        title: es() ? '🗺️ Pestaña Map — Mesa compartida' : '🗺️ Map tab — Shared table',
        description: es()
          ? 'La pestaña "Map" muestra las fichas globales de partida: perdición, pistas de la mesa, tienda de objetos y reserva de Mitos. Necesita un mapa online activo. En ajustes del mapa encontrarás el código de partida para que se unan otros jugadores.'
          : 'The "Map" tab shows global game tokens: doom, table clues, item shop and Mythos reserve. Requires an active online map. In map settings you\'ll find the game code for other players to join.',
      },
    },

    // ══════════════════════════════════════════════════════
    // Final
    // ══════════════════════════════════════════════════════
    {
      popover: {
        title: es() ? '✅ ¡Tour completado!' : '✅ Tour complete!',
        description: es()
          ? '¡Ya conoces toda la aplicación! Puedes relanzar este tour en cualquier momento desde Tutoriales en el menú principal.<br><br><em>¡Que los Dioses Exteriores no te encuentren, investigador!</em>'
          : 'You now know the whole app! You can relaunch this tour any time from Tutorials in the main menu.<br><br><em>May the Outer Gods not find you, investigator!</em>',
      },
    },
  ], 'play');
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
