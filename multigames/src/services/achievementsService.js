import { apiService } from '@/services/api.js';

// Monedas que otorga cada medalla al reclamar el logro.
export const MEDAL_COINS = {
  bronce: 1,
  plata: 3,
  oro: 7,
};

// Catálogo de logros de la app. El backend solo guarda qué ids están desbloqueados/reclamados
// (y cuándo) por usuario; todo lo demás (icono, textos, medalla) vive aquí.
//
// Un logro puede tener varios niveles (bronce → plata → oro) bajo un mismo `group`: cada
// nivel es, de cara al backend, un logro independiente con su propio id (así no hace falta
// tocar el backend para soportar niveles), pero comparten icono/título/descripción y se
// muestran como una única insignia que evoluciona.
export const ACHIEVEMENTS = [
  {
    id: 'tutorial_general',
    group: 'tutorial_general',
    tier: 1,
    icon: 'fas fa-graduation-cap',
    titulo: 'Investigador Instruido',
    title: 'Learned Investigator',
    descripcion: 'Completa el tutorial general interactivo.',
    description: 'Complete the general interactive tutorial.',
    medal: 'oro',
  },
  // Logro de prueba: sirve para verificar el sistema de insignias con niveles
  // (insignia "?" a reclamar, giro al revelarla, parpadeo al evolucionar de nivel).
  {
    id: 'logro_prueba_bronce',
    group: 'logro_prueba',
    tier: 1,
    icon: 'fas fa-flask',
    titulo: 'Investigador en Prácticas',
    title: 'Investigator in Training',
    descripcion: 'Logro de prueba — nivel bronce.',
    description: 'Test achievement — bronze tier.',
    medal: 'bronce',
  },
  {
    id: 'logro_prueba_plata',
    group: 'logro_prueba',
    tier: 2,
    icon: 'fas fa-flask',
    titulo: 'Investigador en Prácticas',
    title: 'Investigator in Training',
    descripcion: 'Logro de prueba — nivel plata.',
    description: 'Test achievement — silver tier.',
    medal: 'plata',
  },
  {
    id: 'logro_prueba_oro',
    group: 'logro_prueba',
    tier: 3,
    icon: 'fas fa-flask',
    titulo: 'Investigador en Prácticas',
    title: 'Investigator in Training',
    descripcion: 'Logro de prueba — nivel oro.',
    description: 'Test achievement — gold tier.',
    medal: 'oro',
  },
];

export function getAchievementById(id) {
  return ACHIEVEMENTS.find(a => a.id === id) || null;
}

export function getAchievementCoins(achievementDef) {
  return MEDAL_COINS[achievementDef?.medal] || 0;
}

// Agrupa el catálogo por `group`, ordenando los niveles de cada logro (tier ascendente).
// Devuelve un array de arrays: una entrada por logro, cada una con sus niveles en orden.
export function getAchievementGroups() {
  const groupsMap = new Map();
  for (const def of ACHIEVEMENTS) {
    if (!groupsMap.has(def.group)) groupsMap.set(def.group, []);
    groupsMap.get(def.group).push(def);
  }
  return Array.from(groupsMap.values()).map(tiers => [...tiers].sort((a, b) => a.tier - b.tier));
}

// Evita repetir la llamada de red al backend más de una vez por usuario y sesión.
let _fetchedForUser = null;

export async function ensureAchievementsLoaded(store) {
  const idUser = store?.state?.IDUserHost;
  if (!idUser || _fetchedForUser === idUser) return;
  try {
    const { unlocked, coins } = await apiService.getAchievements(idUser);
    store.commit('setAchievements', unlocked || []);
    store.commit('setCoins', coins || 0);
    _fetchedForUser = idUser;
  } catch (error) {
    console.error('❌ Error al cargar los logros', error);
  }
}

// Desbloquea un logro (si el usuario no ha iniciado sesión, no hay dónde guardarlo
// y no se hace nada). Solo dispara el toast de "logro desbloqueado" la primera vez.
export async function unlockAchievement(store, achievementId) {
  const idUser = store?.state?.IDUserHost;
  if (!idUser) return;

  await ensureAchievementsLoaded(store);

  const yaLoTenia = store.state.achievements.some(a => a.id === achievementId);
  if (yaLoTenia) return;

  try {
    const { unlocked, coins } = await apiService.unlockAchievement(idUser, achievementId);
    store.commit('setAchievements', unlocked || []);
    store.commit('setCoins', coins || 0);
    store.commit('showAchievementToast', achievementId);
  } catch (error) {
    console.error('❌ Error al desbloquear el logro', error);
  }
}

// Reclama la recompensa en monedas de un logro ya desbloqueado. Devuelve las
// monedas ganadas (para animaciones) o null si no se pudo reclamar.
export async function claimAchievement(store, achievementId) {
  const idUser = store?.state?.IDUserHost;
  if (!idUser) return null;

  const def = getAchievementById(achievementId);
  const coinsReward = getAchievementCoins(def);

  try {
    const { unlocked, coins } = await apiService.claimAchievement(idUser, achievementId, coinsReward);
    store.commit('setAchievements', unlocked || []);
    store.commit('setCoins', coins || 0);
    return coinsReward;
  } catch (error) {
    console.error('❌ Error al reclamar el logro', error);
    return null;
  }
}
