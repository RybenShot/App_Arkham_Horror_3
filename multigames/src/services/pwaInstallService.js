/**
 * Detecta si la app puede instalarse como PWA (versión web, no instalada
 * todavía) y expone cómo lanzar el diálogo nativo de instalación.
 *
 * El evento `beforeinstallprompt` (que permite instalar con un solo toque)
 * sólo lo disparan de forma fiable Chrome/Edge/Samsung Internet en Android.
 * Otros navegadores basados en Chromium como Brave, o Firefox, pueden NO
 * dispararlo nunca aunque sí soporten instalar la PWA a mano desde su menú
 * (⋮ → "Instalar aplicación" / "Añadir a pantalla de inicio"); y Safari/iOS
 * no tiene ninguna API para esto. Por eso el botón de Home no depende sólo
 * de `canInstall`: si no hay prompt nativo, se muestran instrucciones
 * manuales según la plataforma (ver detectPlatform más abajo).
 */
import { reactive } from 'vue';

// Detección de plataforma para las instrucciones manuales. Sniffing de
// user-agent deliberado: no existe una API para "¿cómo se instala esto?".
export function detectPlatform() {
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'desktop';
}

function isStandalone() {
  const mql = window.matchMedia && window.matchMedia('(display-mode: standalone)');
  return (mql && mql.matches) || window.navigator.standalone === true;
}

export const pwaInstallState = reactive({
  deferredPrompt: null,
  canInstall: false,
  installed: isStandalone(),
});

window.addEventListener('beforeinstallprompt', (event) => {
  // Evita el mini-infobar automático del navegador: lo controlamos nosotros
  // con nuestro propio botón.
  event.preventDefault();
  pwaInstallState.deferredPrompt = event;
  pwaInstallState.canInstall = !pwaInstallState.installed;
});

window.addEventListener('appinstalled', () => {
  pwaInstallState.installed = true;
  pwaInstallState.canInstall = false;
  pwaInstallState.deferredPrompt = null;
});

/**
 * Lanza el diálogo nativo de instalación. Debe llamarse desde un gesto real
 * del usuario (click). Devuelve 'accepted' | 'dismissed' | null (si no hay
 * prompt disponible, p.ej. si ya se usó o el navegador no lo soporta).
 */
export async function promptInstall() {
  const promptEvent = pwaInstallState.deferredPrompt;
  if (!promptEvent) return null;

  pwaInstallState.deferredPrompt = null;
  pwaInstallState.canInstall = false;

  promptEvent.prompt();
  const { outcome } = await promptEvent.userChoice;
  return outcome;
}
