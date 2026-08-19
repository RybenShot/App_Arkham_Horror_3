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
  box.querySelector('.ah-tour-confirm-yes').addEventListener('click', () => { box.remove(); destroy(); });
  box.querySelector('.ah-tour-confirm-no').addEventListener('click', () => box.remove());
  document.body.appendChild(box);
}

// ─────────────────────────────────────────────────────────────
// Internals
// ─────────────────────────────────────────────────────────────
function destroy() {
  document.querySelector('.ah-tour-confirm')?.remove();
  if (_escHandler) { document.removeEventListener('keydown', _escHandler, true); _escHandler = null; }
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

async function skipToNext() {
  switch (_currentSegment) {
    case 'home':
      goTo('/ListaMapas', '/ListaMapas'); break;
    case 'listaMapa':
    case 'detalleMapa':
      goTo('/ListaPersonajes', '/ListaPersonajes'); break;
    case 'listaPersonaje': {
      destroy();
      try {
        const response = await apiService.obtainInvByID(_availableIdInv || 1);
        _store.commit('setDatosInvestigator', response);
      } catch (_) { /* navegar igualmente */ }
      localStorage.setItem(CONTINUE_KEY, '/PlayAH');
      _router.push('/PlayAH');
      break;
    }
    case 'detallePersonaje': goTo('/PlayAH', '/PlayAH'); break;
    case 'play': destroy(); break;
    default: destroy();
  }
}

function switchTabThenNext(index) {
  setPlayTab(index);
  setTimeout(() => _driverInstance?.moveNext(), 400);
}

// ─────────────────────────────────────────────────────────────
// HTML del personaje — El Archivista
// ─────────────────────────────────────────────────────────────
function deityHTML() {
  return `
    <div class="ah-deity-header">
      <div class="ah-deity-avatar">
        <div class="ah-deity-eye"><div class="ah-deity-pupil"></div></div>
        <div class="ah-deity-tentacles">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
      <div class="ah-deity-id">
        <span class="ah-deity-name">${es() ? 'El Archivista' : 'The Archivist'}</span>
        <span class="ah-deity-sub">${es() ? 'Guardián del Conocimiento' : 'Guardian of Knowledge'}</span>
      </div>
      <button class="ah-tour-exit-btn" title="${es() ? 'Salir del tour' : 'Exit tour'}">✕</button>
    </div>`;
}

// ─────────────────────────────────────────────────────────────
// makeDriver + driveSegment
// ─────────────────────────────────────────────────────────────
function makeDriver(steps, segment) {
  destroy();
  _currentSegment = segment;

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
    allowClose:     false,
    overlayOpacity: 0.72,
    stagePadding:   8,
    stageRadius:    6,
    popoverClass:   'ah-tour-popover',
    progressText:   '{{current}} / {{total}}',
    nextBtnText:    es() ? 'Siguiente →' : 'Next →',
    prevBtnText:    es() ? '← Atrás'    : '← Back',
    doneBtnText:    es() ? '✓ Listo'    : '✓ Done',
    steps,

    onHighlightStarted: (el, step) => {
      if (step?.popover?.blockClick) {
        if (!document.querySelector('.ah-block-mask')) {
          const mask = document.createElement('div');
          mask.className = 'ah-block-mask';
          document.body.appendChild(mask);
        }
      }
    },
    onDeselected: (_el) => {
      document.querySelector('.ah-block-mask')?.remove();
    },

    onPopoverRender: (popover, { state }) => {
      // ── El Archivista — inyectar encima del título ─────
      if (!popover.wrapper?.querySelector('.ah-deity-header')) {
        const el = document.createElement('div');
        el.innerHTML = deityHTML();
        const header = el.firstElementChild;
        header.querySelector('.ah-tour-exit-btn')
          .addEventListener('click', showExitConfirm);
        if (popover.title) popover.title.insertAdjacentElement('beforebegin', header);
        else if (popover.wrapper) popover.wrapper.insertBefore(header, popover.wrapper.firstChild);
      }

      // ── Botón Skip ────────────────────────────────────
      const skipBtn = document.createElement('button');
      skipBtn.textContent = es() ? '⏭ Saltar sección' : '⏭ Skip section';
      skipBtn.className = 'ah-tour-skip-btn';
      skipBtn.addEventListener('click', skipToNext);
      const target = popover.footerButtons || popover.nextButton;
      if (target && target.parentNode === popover.footer)
        popover.footer.insertBefore(skipBtn, target);
      else
        popover.footer.appendChild(skipBtn);

      // ── Ocultar Siguiente en pasos de toque obligatorio ─
      if (state?.activeStep?.popover?.noNextBtn) {
        if (popover.nextButton) popover.nextButton.style.display = 'none';
        if (!popover.description?.querySelector('.ah-tap-hint')) {
          const hint = document.createElement('p');
          hint.className = 'ah-tap-hint';
          hint.textContent = es()
            ? '👆 Toca el elemento resaltado para continuar'
            : '👆 Tap the highlighted element to continue';
          popover.description?.appendChild(hint);
        }
      }

      // ── Modo mínimo: solo cabecera de la deidad + mensaje corto ─
      // Se activa cuando el paso tiene hidePopover: true. Útil cuando el usuario necesita
      // ver la pantalla sin que el popover la tape (ej: elegir una carta de la cuadrícula).
      if (state?.activeStep?.popover?.hidePopover) {
        // Ocultamos título, descripción y footer — solo deja la cabecera de El Archivista
        if (popover.title)       popover.title.style.display       = 'none';
        if (popover.description) popover.description.style.display = 'none';
        if (popover.footer)      popover.footer.style.display      = 'none';

        // Fondo casi transparente para el popover reducido
        if (popover.wrapper) {
          popover.wrapper.style.background = 'rgba(4, 1, 8, 0.55)';
          popover.wrapper.style.border     = '1px solid rgba(160, 100, 20, 0.35)';
          popover.wrapper.style.padding    = '6px 10px 8px';

          const mensaje = state.activeStep.popover.hidePopoverMsg;
          if (mensaje) {
            const miniTexto = document.createElement('p');
            miniTexto.className = 'ah-popover-mini-msg';
            miniTexto.textContent = mensaje;
            popover.wrapper.appendChild(miniTexto);
          }
        }
      }
    },
  });

  return _driverInstance;
}

function driveSegment(steps, segment) {
  makeDriver(steps, segment).drive();
  setTimeout(() => {
    const overlay = document.querySelector('.driver-overlay');
    if (overlay && !overlay.dataset.ahHandler) {
      overlay.dataset.ahHandler = '1';
      overlay.addEventListener('click', (e) => { e.stopPropagation(); showExitConfirm(); });
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
        title: es() ? '¡Investigador!' : 'Investigator!',
        description: es()
          ? 'Llegas en el momento justo. Te guiaré por cada rincón de esta aplicación hasta tu primera partida. <br>Avanza paso a paso... o usa <em>Saltar sección</em> si crees que no necesitas guía. <em>(Rara vez quien lo cree tiene razón.)</em>'
          : 'You arrive at the right moment. I will guide you through every corner of this app up to your first game. <br>Advance step by step... or use <em>Skip section</em> if you think you need no guidance. <em>(Those who believe that rarely do.)</em>',
      },
    },
    {
      popover: {
        title: es() ? '❤️ Hecha con pasión' : '❤️ Made with passion',
        description: es()
          ? 'Esta herramienta existe para Arkham Horror 3ª Ed.: seguimiento de partida, contenido de la comunidad, modo online y más. La creó un solo mortal impulsado por la pasión. Cualquier contribución ayuda a mantenerla viva. <br><em>Gracias, e intentad no enloquecer.</em>'
          : 'This tool exists for Arkham Horror 3rd Ed.: game tracking, community content, online mode and more. Built by a single mortal driven by passion. Any contribution helps keep it alive. <br><em>Thank you — and try not to go mad.</em>',
      },
    },
    {
      element: '[data-tour="visit-counter"]',
      popover: {
        title: es() ? '👁 Visitas y almas activas' : '👁 Visits & active souls',
        description: es()
          ? 'El primer número cuenta las almas que han cruzado estas puertas. El punto rojo parpadeante... esos son los que aún luchan en las sombras en este mismo instante.'
          : 'The first number counts every soul that has crossed these doors. The blinking red dot... those are the ones still fighting in the shadows at this very moment.',
        side: 'bottom',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="login-section"]',
      popover: {
        title: es() ? '🔐 Iniciar Sesión — Importante' : '🔐 Sign In — Important',
        description: es()
          ? 'Algunas secciones requieren que te identifiques: modo online, guardar tu investigador, votar mapas o crear partidas compartidas. Te recomiendo iniciar sesión antes de comenzar. <br>Si solo buscas partidas offline o crear mazos, puedes continuar sin registro. Pero el conocimiento completo tiene un precio.'
          : 'Some sections require identification: online mode, saving your investigator, voting on maps or creating shared games. I recommend signing in before starting. <br>If you only seek offline play or deck building, you may proceed unregistered. But full knowledge has a price.',
        side: 'bottom',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="btn-mapas"]',
      popover: {
        title: es() ? '🗺️ Mapas' : '🗺️ Maps',
        description: es()
          ? 'Los Escenarios. Cada uno, una trampa cuidadosamente tejida. Aquí encontrarás historia con audio, dificultad, lista de enemigos CON IMÁGENES, opiniones de la comunidad y partidas online.'
          : 'The Scenarios. Each one, a carefully woven trap. Here you\'ll find audio story, difficulty, enemy list WITH IMAGES, community opinions and online games.',
        side: 'top',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="btn-investigadores"]',
      popover: {
        title: es() ? '🕵️ Investigadores' : '🕵️ Investigators',
        description: es()
          ? 'Almas de distinta calaña, cada una con sus virtudes y miserias. Aquí están todos los personajes de todas las expansiones, más los creados por la comunidad o exclusivos de esta aplicación.'
          : 'Souls of different ilk, each with their own virtues and miseries. Here are all characters from all expansions, plus those created by the community or exclusive to this app.',
        side: 'top',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="btn-tutoriales"]',
      popover: {
        title: es() ? '📖 Tutoriales' : '📖 Tutorials',
        description: es()
          ? 'El repositorio de conocimiento. Vuelve aquí cuando quieras para releer las reglas o relanzar este tour. <em>(Los hay que vuelven muchas veces. No es ninguna vergüenza.)</em>'
          : 'The knowledge repository. Return here any time to re-read the rules or relaunch this tour. <em>(Some come back many times. There is no shame in it.)</em>',
        side: 'top',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="support-row"]',
      popover: {
        title: es() ? '☕ Apóyanos & Instagram' : '☕ Support Us & Instagram',
        description: es()
          ? 'El mortal que creó esta aplicación necesita apoyo para seguir adelante. Cualquier contribución ayuda. Desde Instagram podrás seguir el progreso de la app. <em>¡Síguenos, investigador!</em>'
          : 'The mortal who built this app needs support to keep going. Any contribution helps. On Instagram you can follow the app\'s progress. <em>Follow us, investigator!</em>',
        side: 'top',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="noticias-section"]',
      popover: {
        title: es() ? '📰 Últimas actualizaciones' : '📰 Latest updates',
        description: es()
          ? 'El panel de actualizaciones. Despliégalo para ver el historial de versiones y las novedades. Yo lo he visto todo evolucionar... desde los primeros trazos hasta lo que ves ahora.'
          : 'The updates panel. Expand it to see the version history and what\'s new. I have witnessed all of it evolve... from the earliest sketches to what you see now.',
        side: 'top',
        blockClick: true,
      },
    },
    {
      // Último paso: el usuario debe tocar el botón para avanzar (no hay botón "Siguiente").
      // Patrón tap-to-continue: guardamos la ruta de continuación en localStorage para que
      // la siguiente pantalla sepa que tiene que retomar el tour (continueTourIfNeeded).
      element: '[data-tour="btn-mapas"]',
      popover: {
        title: es() ? '¡Adelante, investigador!' : '→ Forward, investigator!',
        description: es()
          ? 'Es hora de comenzar. Antes de enfrentarte a los horrores, debemos elegir el mapa que dará forma a tu pesadilla. <em>¡Adelante!</em>'
          : 'The time has come to begin. Before facing the horrors, we must choose the map that will shape your nightmare. <em>Forward!</em>',
        side: 'top',
        noNextBtn: true, // oculta el botón "Listo" — el tap es la única forma de avanzar
      },
      onHighlightStarted: () => {
        // Marcamos que el tour debe continuar en /ListaMapas cuando se llegue a esa ruta.
        localStorage.setItem(CONTINUE_KEY, '/ListaMapas');

        const botonMapas = document.querySelector('[data-tour="btn-mapas"]');
        if (botonMapas) {
          const alTocarBoton = () => {
            botonMapas.removeEventListener('click', alTocarBoton);
            // Destruimos el driver ANTES de que el botón navegue, para que el modal
            // no siga vivo cuando se cargue la siguiente página.
            destroy();
          };
          botonMapas.addEventListener('click', alTocarBoton);
        }
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
      // El usuario debe tocar uno de los filtros para continuar.
      // Al hacer tap, simplemente avanzamos al siguiente paso del segmento (sin navegar).
      element: '[data-tour="mapa-filtros"]',
      popover: {
        title: es() ? '📦 Filtros de expansión' : '📦 Expansion filters',
        description: es()
          ? 'Estos botones controlan qué expansiones tienes activas. Púlsalos y verás cómo aparecen o desaparecen los mapas correspondientes. Solo te mostraré lo que posees.'
          : 'These buttons control which expansions are active. Tap them and watch the corresponding maps appear or disappear. I will only show you what you own.',
        side: 'bottom',
        noNextBtn: true,
      },
      onHighlightStarted: () => {
        const filtros = document.querySelector('[data-tour="mapa-filtros"]');
        // { once: true } hace que el listener se elimine solo tras el primer tap
        filtros?.addEventListener('click', () => _driverInstance?.moveNext(), { once: true });
      },
    },
    {
      element: '[data-tour="mapa-online-btn"]',
      popover: {
        title: es() ? '🌐 Unirse a partida Online' : '🌐 Join an Online game',
        description: es()
          ? '¿Otro investigador te ha convocado? Toca aquí e introduce su código de mapa para unirte a su partida. El código lo encontrarás en los ajustes del mapa online. <br>🌐 Necesitas estar registrado.'
          : 'Has another investigator summoned you? Tap here and enter their map code to join their game. Find the code in the online map settings. <br>🌐 You need to be registered.',
        side: 'bottom',
        blockClick: true,
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
        side: 'top',
        noNextBtn: true,
        hidePopover: true,
        hidePopoverMsg: es() ? 'Elige un escenario para continuar' : 'Choose a scenario to continue',
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
          ? 'Cada escenario tiene su propia historia. Léela para sumergirte en el misterio. O toca el 🔊 y escucharás la narración... Los detalles marcan la diferencia antes de empezar.'
          : 'Every scenario has its own story. Read it to immerse yourself in the mystery. Or tap 🔊 to hear the narration... Details make all the difference before you start.',
        side: 'bottom',
      },
    },
    {
      element: '[data-tour="mapa-especificaciones"]',
      popover: {
        title: es() ? '👍 La comunidad habla' : '👍 The community speaks',
        description: es()
          ? 'Toca 👍 o 👎 para aportar tu valoración. Aquí también verás la dificultad estimada y la duración media según los que ya han sobrevivido. Necesitas estar registrado para votar.'
          : 'Tap 👍 or 👎 to cast your vote. Here you\'ll also see the estimated difficulty and average duration from those who have already survived. Registration required to vote.',
        side: 'bottom',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="mapa-btn-enemigos"]',
      popover: {
        title: es() ? '👾 Los que se oponen a ti' : '👾 Those who oppose you',
        description: es()
          ? 'Toca aquí para ver la lista completa de monstruos del escenario. El color de fondo de cada enemigo indica a qué expansión pertenece. Conócelos antes de encontrártelos.'
          : 'Tap here to see the complete monster list for the scenario. The background colour of each enemy shows which expansion it belongs to. Know them before you meet them.',
        side: 'left',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="mapa-loseta-img"]',
      popover: {
        title: es() ? '🧩 El tablero de esta noche' : '🧩 Tonight\'s board',
        description: es()
          ? 'La disposición exacta de las losetas que compondrán tu pesadilla. Toca la imagen para verla ampliada y estudiar las zonas con calma.'
          : 'The exact tile layout that will compose tonight\'s nightmare. Tap the image to see it enlarged and study each zone at your leisure.',
        side: 'right',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="mapa-btn-inv-rec"]',
      popover: {
        title: es() ? '🕵️ Investigadores Recomendados' : '🕵️ Recommended Investigators',
        description: es()
          ? '¿No sabes qué investigador elegir? La comunidad tiene sus favoritos para este mapa. Toca aquí para ver sus recomendaciones y el porqué. Muy útil en tu primer intento.'
          : 'Not sure which investigator to choose? The community has its favourites for this map. Tap here to see their recommendations and why. Very useful on your first attempt.',
        side: 'left',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="mapa-btn-online"]',
      popover: {
        title: es() ? '🌐 Crear Mapa Online' : '🌐 Create Online Map',
        description: es()
          ? 'Crea una partida online aquí. Todos los jugadores podrán gestionar juntos las fichas globales, la tienda de objetos o la bolsa de Mitos. Todos los que quieran unirse necesitan estar registrados.'
          : 'Create an online game here. All players can manage global tokens, the item shop and the Mythos bag together. Everyone who wishes to join needs to be registered.',
        side: 'top',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="mapa-btn-selec-inv"]',
      onHighlightStarted: () => {
        localStorage.setItem(CONTINUE_KEY, '/ListaPersonajes');
        const grid = document.querySelector('[data-tour="mapa-btn-selec-inv"]');
        if (grid) {
          const onTap = () => { grid.removeEventListener('click', onTap); destroy(); };
          grid.addEventListener('click', onTap);
        }
      },
      popover: {
        title: es() ? '→ A por el Investigador' : '→ On to the Investigator',
        description: es()
          ? 'El mapa está elegido. Ahora toca seleccionar el alma que se adentrará en él. Vamos a por los Investigadores.'
          : 'The map is chosen. Now it\'s time to select the soul who will venture into it. On to the Investigators.',
        side: 'top',
        noNextBtn: true
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
        title: es() ? '🔖 Filtrar investigadores' : '🔖 Filter investigators',
        description: es()
          ? 'Filtra por Expansiones o por Arquetipos: Superviviente, Místico, Experto, Defensor, Buscador o Neutral. Si no eliges nada y pulsas azar... dejas que el destino decida. <em>(No siempre es mala idea.)</em>'
          : 'Filter by Expansions or Archetypes: Survivor, Mystic, Rogue, Guardian, Seeker or Neutral. If you choose nothing and press random... you let fate decide. <em>(Not always a bad idea.)</em>',
        side: 'bottom',
        blockClick: true,
      }
    },
    {
      element: '[data-tour="expansion-buttons"]',
      popover: {
        title: es() ? '📦 Activar expansiones' : '📦 Enable expansions',
        description: es()
          ? 'Pulsa los botones de color para activar las expansiones que tienes. Sus investigadores aparecerán abajo. El borde de cada carta coincide con el color de su expansión. Así sabrás de un vistazo quién viene de dónde.'
          : 'Tap the coloured buttons to activate the expansions you own. Their investigators appear below. Each card\'s border matches its expansion\'s colour — at a glance, you\'ll know who comes from where.',
        side: 'bottom',
        noNextBtn: true,
      },
      onHighlightStarted: () => {
        const buttons = document.querySelector('[data-tour="expansion-buttons"]');
        buttons?.addEventListener('click', () => _driverInstance?.moveNext(), { once: true });
      },
    },
    {
      element: '[data-tour="inv-online-btn"]',
      popover: {
        title: es() ? '🌐 Investigadores guardados' : '🌐 Saved investigators',
        description: es()
          ? '¿Tienes investigadores guardados en tu perfil? Aquí los encontrarás. Requiere estar registrado.'
          : 'Do you have saved investigators in your profile? You\'ll find them here. Registration required.',
        side: 'bottom',
        blockClick: true,
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
        noNextBtn: true,
        hidePopover: true,
        hidePopoverMsg: es() ? 'Elige un investigador para continuar' : 'Choose an investigator to continue',
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
          ? 'Aquí están: imagen, nombre y rol. Usa los botones de la derecha para ver sus <em>pertenencias iniciales</em> (con qué objetos empieza), su <em>historia personal</em> con audio, su <em>arquetipo</em> y el dinero con el que comienza.'
          : 'Here they are: image, name and role. Use the buttons on the right to see their <em>starting belongings</em> (what items they begin with), their <em>personal story</em> with audio, their <em>archetype</em> and starting money.',
        side: 'right',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="detalle-stats"]',
      popover: {
        title: es() ? '📊 Los números de su destino' : '📊 The numbers of their fate',
        description: es()
          ? 'La valoración de la comunidad, comentarios de otros jugadores y los valores base: Vida, Cordura y los atributos: Saber, Influencia, Observación, Fuerza y Voluntad. A mayor valor en un atributo, más dados tiras en esa prueba. Más dados, más posibilidades.'
          : 'The community rating, other players\' comments and the base values: Life, Sanity and the attributes: Lore, Influence, Observation, Strength and Willpower. Higher attribute value = more dice in that test = more chances of success.',
        side: 'top',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="detalle-habilidades"]',
      popover: {
        title: es() ? '✨ Su don único' : '✨ Their unique gift',
        description: es()
          ? 'La habilidad única de este investigador. Léela con atención: puede cambiar completamente tu estrategia. Algunos también tienen habilidades pasivas que se activan solas. Debajo verás su frase característica y, por último, el límite de concentración.'
          : 'This investigator\'s unique ability. Read it carefully — it can completely change your strategy. Some also have passive abilities that activate automatically. Below you\'ll see their characteristic quote and, finally, their concentration limit.',
        side: 'top',
        blockClick: true,
      },
    },
    {
      // El usuario pulsa "Comenzar" libremente, selecciona objetos iniciales y navega a PlayAH.
      // continueTourIfNeeded('/PlayAH') retoma el tour automáticamente.
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
        title: es() ? '▶️ El momento ha llegado' : '▶️ The moment has come',
        description: es()
          ? 'Pulsa el botón verde "Comenzar". Selecciona tus objetos iniciales en la ventana que aparecerá y adéntrate en las sombras. El tour continuará automáticamente en la pantalla de juego. <br><em>Ve. Yo estaré observando.</em>'
          : 'Tap the green "Comenzar" button. Select your starting items in the window that appears and step into the shadows. The tour will continue automatically on the game screen. <br><em>Go. I will be watching.</em>',
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
  setPlayTab(0);

  driveSegment([
    // ── Pestañas Player / Map ──────────────────────────────
    {
      element: '[data-tour="play-tabs"]',
      popover: {
        title: es() ? '🎮 Tu cuartel general' : '🎮 Your headquarters',
        description: es()
          ? 'Dos pestañas principales: <br><b>Player</b>: todo lo de tu personaje. <br><b>Map</b>: fichas globales cuando hay un mapa online activo (perdición, pistas globales, tienda, bolsa de Mitos). Toca las pestañas para cambiar de vista.'
          : 'Two main tabs: <br><b>Player</b>: everything about your character. <br><b>Map</b>: global tokens when an online map is active (doom, global clues, item shop, Mythos bag). Tap the tabs to switch.',
        side: 'bottom',
        blockClick: true,
      },
    },
    // ── Barra de navegación ────────────────────────────────
    {
      element: '[data-tour="play-nav"]',
      popover: {
        title: es() ? '🧭 Tu brújula en el caos' : '🧭 Your compass in the chaos',
        description: es()
          ? 'Pulsa cada icono para acceder a su zona: <br>🎲 Tiradas &nbsp;·&nbsp; 📍 Ubicación (Online) &nbsp;·&nbsp; 🤕 Estados &nbsp;·&nbsp; 🃏 Habilidades &nbsp;·&nbsp; ⚙️ Ajustes. <br>El icono activo se resalta en verde.'
          : 'Tap each icon to access its zone: <br>🎲 Dice Rolls &nbsp;·&nbsp; 📍 Location (Online) &nbsp;·&nbsp; 🤕 States &nbsp;·&nbsp; 🃏 Skills &nbsp;·&nbsp; ⚙️ Settings. <br>The active icon highlights in green.',
        side: 'bottom',
        blockClick: true,
      },
    },
    // ── Vida, Recursos y Modificar (un solo paso) ─────────
    {
      element: '[data-tour="play-recursos"]',
      popover: {
        title: es() ? '❤️💰 Vida, Recursos y Modificar' : '❤️💰 Life, Resources & Modify',
        description: es()
          ? 'Toca primero qué quieres modificar: ❤️ Vida, 🧠 Cordura, 💰 Dinero, 🔍 Pistas o Restos. El icono elegido se resaltará. Luego usa <b>+</b> y <b>−</b> para cambiar su valor. <br>⚠️ Vida o Cordura a 0: la partida termina. <em>(Lo veo suceder más a menudo de lo que imaginas.)</em>'
          : 'First tap what to modify: ❤️ Life, 🧠 Sanity, 💰 Money, 🔍 Clues or Remnants. The chosen icon highlights. Then use <b>+</b> and <b>−</b> to change its value. <br>⚠️ Life or Sanity at 0: game over. <em>(I see it happen more often than you\'d imagine.)</em>',
        side: 'top',
      },
    },
    // ── Intro Tiradas ──────────────────────────────────────
    {
      element: '[data-tour="tiradas-atributos-general"]',
      popover: {
        title: es() ? '🎲 La zona de Tiradas' : '🎲 The Dice Rolling zone',
        description: es()
          ? 'El corazón del juego. Aquí gestionarás cada prueba que el destino te ponga por delante. Elige un atributo, añade dados extra si los tienes y lanza. <em>El azar es tu aliado... cuando se lo permites.</em>'
          : 'The heart of the game. Here you\'ll manage every test fate puts before you. Choose an attribute, add extra dice if you have them, and roll. <em>Chance is your ally... when you let it be.</em>',
        blockClick: true,
      },
    },
    // ── Atributos ──────────────────────────────────────────
    {
      element: '[data-tour="tiradas-atributos"]',
      popover: {
        title: es() ? '🎲 Seleccionar atributo' : '🎲 Select attribute',
        description: es()
          ? 'Pulsa uno de los 5 atributos para cargar los dados base correspondientes. El seleccionado se ilumina. Cada atributo corresponde a un tipo de prueba diferente.'
          : 'Tap one of the 5 attributes to load the corresponding base dice. The selected one lights up. Each attribute corresponds to a different type of test.',
        side: 'bottom',
      },
    },
    // ── Dados extra + lanzar ───────────────────────────────
    {
      element: '[data-tour="tiradas-lanzar"]',
      popover: {
        title: es() ? '🎲 Dados Extra y Lanzar' : '🎲 Extra Dice & Roll',
        description: es()
          ? 'Usa + y − para añadir dados extra (de pistas u objetos). El total aparece debajo. Toca el gran botón verde TIRAR. El resultado dirá si el destino te favorece... <em>o no.</em>'
          : 'Use + and − to add extra dice (from clues or items). The total shows below. Tap the big green THROW button. The result will say whether fate favours you... <em>or not.</em>',
        side: 'top',
      },
    },
    // ── Concentración ──────────────────────────────────────
    {
      element: '[data-tour="tiradas-concentracion"]',
      popover: {
        title: es() ? '🎯 Fichas de Concentración' : '🎯 Concentration tokens',
        description: es()
          ? 'Toca "Añadir" para elegir el tipo de ficha. Al usar "Usar 1", añade un dado extra de ese tipo específico. Reserva estas fichas para los momentos críticos.'
          : 'Tap "Add" to choose the token type. Using "Use 1" adds one extra die of that specific type. Save these tokens for critical moments.',
        side: 'top',
        blockClick: true,
        
      },
    },
    // ── PIVOT → TAB 1 — UBICACIÓN ─────────────────────────
    {
      element: '[data-tour="play-nav-ubicacion"]',
      popover: {
        title: es() ? '📍 Cambia a Ubicación' : '📍 Switch to Location',
        description: es()
          ? 'Ahora veremos la zona de Ubicación.'
          : 'Now we\'ll see the Location zone.',
        side: 'bottom',
        noNextBtn: true,
      },
      onHighlightStarted: () => {
        const boton = document.querySelector('[data-tour="play-nav-ubicacion"]');
        boton?.addEventListener('click', () => _driverInstance?.moveNext(), { once: true });
      },
    },
    {
      element: '[data-tour="ubic-mapa"]',
      popover: {
        title: es() ? '📍 Tu posición en el tablero' : '📍 Your position on the board',
        description: es()
          ? 'Pulsa la zona del tablero donde está tu investigador. En modo online, la app buscará a otros investigadores en esa misma zona y propondrá una interacción aleatoria. Para más sobre los encuentros, consulta Tutoriales.'
          : 'Tap the board zone where your investigator is. In online mode, the app will search for other investigators in that zone and propose a random interaction. For more on encounters, check Tutorials.',
        side: 'right',
        blockClick: true,
      },
    },
    // ── PIVOT → TAB 2 — ESTADOS ───────────────────────────
    {
      element: '[data-tour="play-nav-estados"]',
      popover: {
        title: es() ? '🤕 Cambia a Estados' : '🤕 Switch to States',
        description: es()
          ? 'Ahora veremos la zona de Estados.'
          : 'Now we\'ll see the States zone.',
        side: 'bottom',
        noNextBtn: true,
      },
      onHighlightStarted: () => {
        const boton = document.querySelector('[data-tour="play-nav-estados"]');
        boton?.addEventListener('click', () => _driverInstance?.moveNext(), { once: true });
      },
    },
    {
      element: '[data-tour="estados-filtros"]',
      popover: {
        title: es() ? '🤕 Filtrar Estados' : '🤕 Filter States',
        description: es()
          ? 'Filtra entre "Activos" (solo los que tienes ahora) o "Todos" (la lista completa). Toca cualquier estado para activarlo o desactivarlo.'
          : 'Filter between "Active" (only your current states) or "All" (the full list). Tap any state to toggle it.',
        side: 'bottom',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="estados-area"]',
      popover: {
        title: es() ? '🤕 Los estados del investigador' : '🤕 Investigator states',
        description: es()
          ? 'Los marcados en verde están activos. Algunos no se pueden activar manualmente: los provocará otra carta o evento. Tenlos en cuenta, investigador. Pueden decidir tu partida.'
          : 'Those marked in green are active. Some cannot be toggled manually — they\'ll be triggered by another card or event. Keep track of them, investigator. They can decide your game.',
        side: 'top',
        blockClick: true,
      },
    },
    // ── PIVOT → TAB 3 — HABILIDADES ───────────────────────
    {
      element: '[data-tour="play-nav-habilidades"]',
      popover: {
        title: es() ? '🃏 Cambia a Habilidades' : '🃏 Switch to Skills',
        description: es()
          ? 'Ahora veremos la zona de Habilidades.'
          : 'Now we\'ll see the Skills zone.',
        side: 'bottom',
        noNextBtn: true,
      },
      onHighlightStarted: () => {
        const boton = document.querySelector('[data-tour="play-nav-habilidades"]');
        boton?.addEventListener('click', () => _driverInstance?.moveNext(), { once: true });
      },
    },
    {
      element: '[data-tour="hab-habilidades"]',
      popover: {
        title: es() ? '✨ Su don único' : '✨ Their unique gift',
        description: es()
          ? 'Los efectos únicos de tu investigador. Siempre disponibles. Son las reglas especiales que lo distinguen de todos los demás. Léelas con calma.'
          : 'Your investigator\'s unique effects. Always available. These are the special rules that set them apart from everyone else. Read them carefully.',
        side: 'bottom',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="hab-pertenencias"]',
      popover: {
        title: es() ? '🎒 Pertenencias' : '🎒 Belongings',
        description: es()
          ? 'Tus cartas y objetos. Toca cualquiera para ver el detalle. Usa + para buscar y añadir nuevas cartas que hayas encontrado o comprado.'
          : 'Your cards and items. Tap any to see its detail. Use + to search and add new cards you\'ve found or bought.',
        side: 'top',
        blockClick: true,
      },
    },
    // ── PIVOT → TAB 4 — AJUSTES ───────────────────────────
    {
      element: '[data-tour="play-nav-ajustes"]',
      popover: {
        title: es() ? '⚙️ Cambia a Ajustes' : '⚙️ Switch to Settings',
        description: es()
          ? 'Por último, veremos los Ajustes. Pulsa Siguiente y cambiaré la vista por ti.'
          : 'Finally, we\'ll see Settings. Press Next and I will switch the view for you.',
        side: 'bottom',
        noNextBtn: true,
      },
      onHighlightStarted: () => {
        const boton = document.querySelector('[data-tour="play-nav-ajustes"]');
        boton?.addEventListener('click', () => _driverInstance?.moveNext(), { once: true });
      },
    },
    {
      element: '[data-tour="ajustes-toggles"]',
      popover: {
        title: es() ? '🔊🌐 Audio y Modo Online' : '🔊🌐 Audio & Online Mode',
        description: es()
          ? 'Activa o desactiva efectos de sonido, música y encuentros online según tus preferencias.'
          : 'Toggle sound effects, music and online encounters according to your preferences.',
        side: 'bottom',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="ajustes-guardar"]',
      popover: {
        title: es() ? '💾 Guardar Investigador' : '💾 Save Investigator',
        description: es()
          ? 'Guarda el estado actual de tu investigador al finalizar la sesión: vida, cordura, objetos... todo preservado en tu perfil. Necesitas estar registrado.'
          : 'Save your investigator\'s current state at the end of a session: life, sanity, items... all preserved in your profile. Registration required.',
        side: 'top',
        blockClick: true,
      },
    },
    {
      element: '[data-tour="ajustes-footer"]',
      popover: {
        title: es() ? '🚪 Salir — Seleccionar o Terminar' : '🚪 Exit — Select or End',
        description: es()
          ? '<b>Seleccionar personaje</b>: vuelves a la lista sin borrar la partida. <b>Terminar partida</b>: cierras todo y regresas al menú principal. Elige sabiamente.'
          : '<b>Select character</b>: return to the list without ending the game. <b>End game</b>: close everything and return to the main menu. Choose wisely.',
        side: 'top',
        blockClick: true,
      },
    },
    // ── Pestaña Map (informacional) ────────────────────────
    {
      popover: {
        title: es() ? '🗺️ Pestaña Map — Mesa compartida' : '🗺️ Map tab — Shared table',
        description: es()
          ? 'La pestaña "Map" muestra las fichas globales de partida: perdición, pistas globales, tienda de objetos y reserva de Mitos. Requiere un mapa online activo. En los ajustes del mapa encontrarás el código para que otros jugadores se unan.'
          : 'The "Map" tab shows global game tokens: doom, global clues, item shop and Mythos reserve. Requires an active online map. In the map settings you\'ll find the code for other players to join.',
        blockClick: true,
      },
    },
    // ── Final ──────────────────────────────────────────────
    {
      popover: {
        title: es() ? '✅ El tour ha concluido' : '✅ The tour is complete',
        description: es()
          ? 'Ya conoces todo lo que necesitas para enfrentarte a las sombras, investigador. Puedes relanzar este tour en cualquier momento desde Tutoriales en el menú principal.<br><br><em>Que los Dioses Exteriores te ignoren... y si no... al menos que sea rápido.</em>'
          : 'You now know everything you need to face the shadows, investigator. You can relaunch this tour any time from Tutorials in the main menu.<br><br><em>May the Outer Gods ignore you... and if they don\'t... at least may it be swift.</em>',
        blockClick: true,
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
