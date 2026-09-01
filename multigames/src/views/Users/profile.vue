<template>
  <div class="BGAHHome profile-page">

    <!-- ── HEADER ─────────────────────────────────────────── -->
    <div class="prof-header">
      <button class="prof-nav-btn" @click="$router.push('/')">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="prof-title">{{ textoInterfaz.title }}</h1>
      <button v-if="isSignedIn" class="prof-nav-btn" @click="signOut()">
        <i class="fas fa-sign-out-alt"></i>
      </button>
      <div v-else class="prof-nav-spacer"></div>
    </div>

    <!-- ── AUTENTICADO ─────────────────────────────────────── -->
    <div v-if="isSignedIn" class="prof-content">

      <!-- Tarjeta avatar + identidad -->
      <div class="avatar-card">
        <div class="avatar-main-row">
          <img class="avatar-img"
            :src="$store.state.datosPJactual.imgInv || '/img/1-inv/57-Nameless.jpg'"
            alt="Investigador">
          <div class="avatar-info">
            <p class="avatar-name">{{ user.fullName || user.firstName || user.username }}</p>
            <p class="avatar-username">@{{ user.username || 'Investigador' }}</p>
            <p class="avatar-email">{{ user.primaryEmailAddress?.emailAddress }}</p>
          </div>
          <span class="coin-pill" ref="coinPill" :class="{ bump: coinBump }">
            <i class="fas fa-coins"></i>{{ displayedCoins }}
          </span>
        </div>

        <!-- User ID -->
        <div class="user-id-zone">
          <p class="user-id-label">{{ textoInterfaz.isAuth.titleIDUsuario }}</p>
          <div class="user-id-row">
            <code class="user-id-code">{{ user.id }}</code>
            <button class="copy-id-btn" @click="copyCode()">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Logros: insignias conseguidas (solo se muestran las conseguidas o con algo por reclamar) -->
      <div v-if="achievementGroups.length" class="badges-divider-row">
        <span class="divider-line"></span>
        <div class="badges-strip">
          <div
            v-for="group in achievementGroups"
            :key="group.groupId"
            class="badge-slot"
            @click="onBadgeClick(group, $event)"
          >
            <div
              v-if="usesFlipCard(group)"
              class="badge-flip"
              :class="{ flipped: badgeRevealed(group), evolving: evolvingGroups[group.groupId] }"
              :style="evolvingGroups[group.groupId] ? { '--ring-color': ringColor(group) } : {}"
            >
              <span
                class="badge-face badge-front badge-icon-face blink"
                :class="group.currentDef ? `medal-${group.currentDef.medal}` : ''"
              >
                <i v-if="group.currentDef" :class="group.currentDef.icon"></i>
                <template v-else>?</template>
              </span>
              <span
                class="badge-face badge-back badge-icon-face"
                :class="`medal-${(group.pendingDef || group.currentDef).medal}`"
              >
                <i :class="(group.pendingDef || group.currentDef).icon"></i>
              </span>
            </div>
            <div v-else class="badge-static badge-icon-face" :class="`medal-${group.currentDef.medal}`">
              <i :class="group.currentDef.icon"></i>
            </div>
          </div>
        </div>
        <span class="divider-line"></span>
      </div>

      <!-- [TEMP] acceso directo a /logros para pruebas — eliminar antes de producción -->
      <router-link to="/logros" class="temp-logros-btn">
        <i class="fas fa-list"></i>
        {{ $store.state.lenguaje === 'español' ? 'Ver logros' : 'View achievements' }}
      </router-link>

      <!-- Tabs: Mapas / Investigadores -->
      <section class="prof-tabs-section">
        <b-tabs type="is-boxed">
          <b-tab-item>
            <template #header>
              <b-icon icon="information-outline"></b-icon>
              <span>{{ $store.state.lenguaje === 'español' ? 'Mapas' : 'Maps' }}
                <b-tag rounded>{{ getMapsLength() }}</b-tag>
              </span>
            </template>
            <p class="tab-subtitle">{{ textoInterfaz.isAuth.titleMapsOnLine }}</p>
            <div v-if="userMaps.length === 0" class="empty-state-msg">
              {{ textoInterfaz.isAuth.subtitleMapsOnline }}
            </div>
            <div class="PersonajesList">
              <MapCard v-for="map in userMaps" :key="map.idInPlay" :map="map" />
            </div>
          </b-tab-item>

          <b-tab-item>
            <template #header>
              <b-icon icon="source-pull"></b-icon>
              <span>{{ $store.state.lenguaje === 'español' ? 'Investigadores' : 'Investigators' }}
                <b-tag rounded>{{ getInvestigadoresCount() }}</b-tag>
              </span>
            </template>
            <div v-if="getInvestigadores().length === 0" class="empty-state-msg">
              {{ $store.state.lenguaje === 'español' ? 'No tienes investigadores guardados.' : 'No saved investigators.' }}
            </div>
            <div class="PersonajesList">
              <InvestigatorCard v-for="investigator in getInvestigadores()" :key="investigator.id" :investigator="investigator" />
            </div>
          </b-tab-item>
        </b-tabs>
      </section>
    </div>

    <!-- ── NO AUTENTICADO ──────────────────────────────────── -->
    <div v-else class="not-auth-screen">
      <div class="not-auth-card">
        <div class="not-auth-icon">🔐</div>
        <h2 class="not-auth-title">{{ textoInterfaz.noAuth.title }}</h2>
        <p class="not-auth-text">{{ textoInterfaz.noAuth.description1 }}</p>
        <p class="not-auth-text mt-3">{{ textoInterfaz.noAuth.description2 }}</p>
        <SignInButton class="not-auth-btn"/>
      </div>
    </div>

    <!-- Monedas y chispas del efecto de evolución -->
    <teleport to="body">
      <i
        v-for="coin in flyingCoins"
        :key="`coin-${coin.id}`"
        class="fas fa-coins flying-coin"
        :style="{ left: coin.left + 'px', top: coin.top + 'px', '--dx': coin.dx + 'px', '--dy': coin.dy + 'px', animationDelay: coin.delay + 'ms' }"
      ></i>
      <i
        v-for="spark in sparkles"
        :key="`spark-${spark.id}`"
        class="fas fa-star evolution-spark"
        :class="`medal-${spark.medal}`"
        :style="{ left: spark.left + 'px', top: spark.top + 'px', '--dx': spark.dx + 'px', '--dy': spark.dy + 'px' }"
      ></i>
    </teleport>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuth, useUser, SignInButton } from '@clerk/vue'
import MapCard from '@/components/mapas/MapCard.vue'
import InvestigatorCard from '@/components/personajes/invCard.vue'
import { apiService } from '@/services/api.js'
import { useStore } from 'vuex' // importamos esto para poder usar el store en el setup
import { ensureAchievementsLoaded, claimAchievement, getAchievementGroups } from '@/services/achievementsService.js'

import { BIcon, BTabs, BTabItem, BTag } from "buefy";

let coinSeq = 0;
let sparkSeq = 0;

export default {
  name: "ProfileView",
  components: { 
    MapCard, InvestigatorCard, SignInButton,

    BIcon, BTabs, BTabItem, BTag
  },
  setup() {
    const { isSignedIn, signOut } = useAuth()
    const { user } = useUser()
    const store = useStore()
    const userMaps = ref([])
    const userInv = ref([])

    onMounted(async () => {
      if (isSignedIn.value) {
        try {
          const idUser = user.value.id;
          store.commit('setUserHost', idUser);

          userMaps.value = await apiService.getMapsInPlayByIDUser(idUser)
          // console.log("✅ ProfileView.vue - Mapas del usuario:", userMaps.value);

          userInv.value = await apiService.getListInvOnLine(idUser);
          // console.log("✅ ProfileView.vue - Investigadores del usuario:", userInv.value[0].investigadoresOnLine);
        } catch (e) {
          console.error('❌ Error al cargar los mapas del usuario:', e)
        } 
      }
    })

    return { user, isSignedIn, signOut, userMaps, userInv }
  },
  computed: {
    // Una entrada por logro (agrupando sus niveles bronce/plata/oro), con el nivel
    // ya reclamado (currentDef) y el siguiente nivel pendiente de reclamar (pendingDef).
    // Los logros sin ningún nivel desbloqueado (locked) no se muestran en el resumen.
    achievementGroups() {
      const unlockedList = this.$store.state.achievements;
      return getAchievementGroups()
        .map(tiers => {
          let currentDef = null;
          let pendingDef = null;
          for (const tierDef of tiers) {
            const encontrado = unlockedList.find(u => u.id === tierDef.id);
            if (!encontrado) continue;
            if (encontrado.claimed) currentDef = tierDef;
            else pendingDef = tierDef;
          }
          return {
            groupId: tiers[0].group,
            currentDef,
            pendingDef,
            state: pendingDef ? 'pending' : (currentDef ? 'claimed' : 'locked'),
          };
        })
        .filter(group => group.state !== 'locked');
    },
  },
  data() {
    return {
      // ids de grupo ya "girados" localmente (evita que la insignia vuelva a mostrar
      // el "?" mientras se confirma el reclamo, o si ya se reclamó en esta sesión)
      flippedGroups: {},
      // ids de grupo mostrando el efecto de evolución (brillo + partículas) justo al revelarse
      evolvingGroups: {},
      flyingCoins: [],
      sparkles: [],
      displayedCoins: 0,
      coinBump: false,
      textoInterfaz: {
        title: "",
        noAuth: {
          title: "",
          description1: "",
          description2: "",
        },
        isAuth: {
          titleTrofeos: "",
          subtitleTrofeos: "",
          descriptionTrofeos: "",
          titleIDUsuario: "",
          titleMapsOnLine: "",
          subtitleMapsOnline: "",
        },
      },
      count: 1,
      onLineMaps: true,
    }
  },

  watch: {
    '$store.state.coins'(nuevo, viejo) {
      this.animarContadorMonedas(viejo || 0, nuevo || 0);
    },
  },

  methods: {
    // Obtener lista de investigadores
    getInvestigadores() {
      return Array.isArray(this.userInv) ? this.userInv : [];
    },
    
    // Obtener cantidad de investigadores
    getInvestigadoresCount() {
      return this.getInvestigadores().length;
    },

    formatDate(dateString) {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleString()
    },
    rellenarTextosegunIdioma() {
      if (this.$store.state.lenguaje == 'español') {
        this.textoInterfaz.title = "Perfil";

        this.textoInterfaz.noAuth.title = "¿Qué haces aquí?";
        this.textoInterfaz.noAuth.description1 = "No estás logueado y no existen botones para llegar hasta aquí, así que la única forma de que has acabado aquí ha sido buscando alguna falla, ¿eh? Pues que sepas que hay muchas fallas en esta app, pero esta no es una de ellas. Solo soy una persona la que está creando todo esto y hay cosas que se me escapan; te agradecería mucho que, si llegas a encontrar algún error, me lo hagas saber en el canal oficial de Instagram. ¡Muchas gracias!";
        this.textoInterfaz.noAuth.description2 = "Si quieres ver esta ventana como debería, haz login o regístrate y sigue echando un vistazo a todo lo que hay disponible para ti.";

        this.textoInterfaz.isAuth.titleTrofeos = "Tus trofeos";
        this.textoInterfaz.isAuth.subtitleTrofeos = "Sin ningún trofeo.";
        this.textoInterfaz.isAuth.descriptionTrofeos = "Juega para conseguir trofeos.";

        this.textoInterfaz.isAuth.titleIDUsuario = "Tu ID de usuario.";

        this.textoInterfaz.isAuth.titleMapsOnLine = "Tus mapas Online.";
        this.textoInterfaz.isAuth.subtitleMapsOnline = "No has creado ningún mapa todavía.";

      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.title = "Profile";

        this.textoInterfaz.noAuth.title = "What are you doing here?";
        this.textoInterfaz.noAuth.description1 = "You're not logged in and there are no buttons to get here, so the only way you ended up here must have been hunting for a bug, right? Well, know that there are plenty of bugs in this app, but this isn't one of them. I'm just one person building all of this and things slip through—I'd really appreciate it if you let me know about any bugs on the official Instagram channel. Thank you!";
        this.textoInterfaz.noAuth.description2 = "If you want to see this window as it should be, please log in or sign up and keep exploring everything available to you!";

        this.textoInterfaz.isAuth.titleTrofeos = "Your Trophies";
        this.textoInterfaz.isAuth.subtitleTrofeos = "You have no trophies.";
        this.textoInterfaz.isAuth.descriptionTrofeos = "Play to earn trophies.";

        this.textoInterfaz.isAuth.titleIDUsuario = "Your User ID";

        this.textoInterfaz.isAuth.titleMapsOnLine = "Your Online Maps";
        this.textoInterfaz.isAuth.subtitleMapsOnline = "You haven't created any maps yet.";
      }
    },
    copyCode() {
      navigator.clipboard.writeText(this.user.id)
        .then(() => {
          console.log('ID copiado al portapapeles');
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' ? 'ID copiado al portapapeles' : 'ID copied to clipboard',
            type: 'is-success',
            duration: 5000
          });
        })
        .catch(err => {
          console.error('Error al copiar el ID: ', err);
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' ? 'Error al copiar el ID' : 'Error copying ID',
            type: 'is-danger',
            duration: 5000
          });
        });
    },
    getMapsLength() {
      return this.userMaps.length
    },

    // Una vez girada (o mientras siga pendiente), la insignia usa la carta giratoria;
    // así, aunque el reclamo se confirme a mitad del giro, no cambia de estructura y no da un salto visual.
    usesFlipCard(group) {
      return group.state === 'pending' || !!this.flippedGroups[group.groupId];
    },

    badgeRevealed(group) {
      return !!this.flippedGroups[group.groupId];
    },

    ringColor(group) {
      const medal = (group.pendingDef || group.currentDef)?.medal;
      return { oro: '#ffd700', plata: '#d7d9dd', bronce: '#cd7f32' }[medal] || '#c8902a';
    },

    onBadgeClick(group, event) {
      if (group.state === 'pending') {
        this.onTapPending(group, event);
        return;
      }
      this.$router.push('/logros');
    },

    // Gira la insignia para revelar el nivel conseguido, reclama su recompensa y dispara
    // el efecto de evolución (brillo, chispas y monedas) al completarse el giro.
    async onTapPending(group, event) {
      if (this.flippedGroups[group.groupId]) return;
      const sourceRect = event.currentTarget.getBoundingClientRect();
      this.flippedGroups[group.groupId] = true;

      // esperamos como mínimo lo que dura el giro (0.5s) para que el efecto de evolución
      // se dispare siempre justo al revelarse, sin importar lo rápido que responda el servidor
      const esperaMinima = new Promise(resolve => setTimeout(resolve, 500));
      const [coinsGanadas] = await Promise.all([
        claimAchievement(this.$store, group.pendingDef.id),
        esperaMinima,
      ]);

      if (coinsGanadas) {
        this.dispararEvolucion(group, sourceRect, coinsGanadas);
      } else {
        delete this.flippedGroups[group.groupId];
      }
    },

    dispararEvolucion(group, sourceRect, coinsGanadas) {
      this.evolvingGroups[group.groupId] = true;
      setTimeout(() => { delete this.evolvingGroups[group.groupId]; }, 800);

      this.lanzarChispas(sourceRect, (group.pendingDef || group.currentDef).medal);
      this.lanzarMonedas(sourceRect, coinsGanadas);
    },

    lanzarChispas(sourceRect, medal) {
      const cx = sourceRect.left + sourceRect.width / 2;
      const cy = sourceRect.top + sourceRect.height / 2;
      const n = 6;
      for (let i = 0; i < n; i++) {
        const angulo = (Math.PI * 2 * i) / n + Math.random() * 0.4;
        const distancia = 26 + Math.random() * 12;
        const id = sparkSeq++;
        this.sparkles.push({
          id,
          left: cx,
          top: cy,
          medal,
          dx: Math.cos(angulo) * distancia,
          dy: Math.sin(angulo) * distancia,
        });
        setTimeout(() => {
          this.sparkles = this.sparkles.filter(s => s.id !== id);
        }, 650);
      }
    },

    lanzarMonedas(sourceRect, coinsGanadas) {
      const targetEl = this.$refs.coinPill;
      if (!targetEl) return;
      const targetRect = targetEl.getBoundingClientRect();
      const startX = sourceRect.left + sourceRect.width / 2;
      const startY = sourceRect.top + sourceRect.height / 2;
      const endX = targetRect.left + targetRect.width / 2;
      const endY = targetRect.top + targetRect.height / 2;

      const n = Math.min(coinsGanadas, 6);
      for (let i = 0; i < n; i++) {
        const id = coinSeq++;
        const jitterX = (Math.random() - 0.5) * 20;
        const jitterY = (Math.random() - 0.5) * 20;
        const delay = i * 70;
        this.flyingCoins.push({
          id,
          left: startX + jitterX,
          top: startY + jitterY,
          dx: endX - startX - jitterX,
          dy: endY - startY - jitterY,
          delay,
        });
        setTimeout(() => {
          this.flyingCoins = this.flyingCoins.filter(c => c.id !== id);
        }, 700 + delay);
      }

      setTimeout(() => {
        this.coinBump = true;
        setTimeout(() => { this.coinBump = false; }, 350);
      }, 500);
    },

    animarContadorMonedas(desde, hasta) {
      if (desde === hasta) return;
      const duracion = 500;
      const inicio = performance.now();
      const paso = (ahora) => {
        const progreso = Math.min((ahora - inicio) / duracion, 1);
        this.displayedCoins = Math.round(desde + (hasta - desde) * progreso);
        if (progreso < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    },
  },
  mounted(){
    this.rellenarTextosegunIdioma();
    this.displayedCoins = this.$store.state.coins;
    if (this.isSignedIn) {
      ensureAchievementsLoaded(this.$store);
    }
    setTimeout(() => {
        this.count++;
    }, 3 * 1000);
  },
}
</script>

<style scoped>
/* ── Page ─────────────────────────────────── */
.profile-page {
  min-height: 100vh;
}

/* ── Header ───────────────────────────────── */
.prof-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(0, 0, 0, 0.45);
  border-bottom: 1px solid rgba(200, 144, 42, 0.22);
}
.prof-nav-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  color: rgba(220, 210, 195, 0.85);
  font-size: 0.95rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s;
}
.prof-nav-btn:hover {
  background: rgba(200, 144, 42, 0.15);
  border-color: rgba(200, 144, 42, 0.45);
}
.prof-nav-spacer { width: 38px; flex-shrink: 0; }
.prof-title {
  flex: 1;
  text-align: center;
  color: #e8d5a3;
  font-family: Georgia, serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

/* ── Content wrapper ──────────────────────── */
.prof-content {
  padding-bottom: 28px;
}

/* ── Avatar card ──────────────────────────── */
.avatar-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 14px 14px 12px;
  background: rgba(6, 3, 14, 0.78);
  border: 1px solid rgba(200, 144, 42, 0.38);
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
}
.avatar-main-row {
  display: flex;
  align-items: center;
  gap: 14px;
}
.avatar-img {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(200, 144, 42, 0.7);
  box-shadow: 0 0 16px rgba(200, 144, 42, 0.22);
  flex-shrink: 0;
}
.avatar-info {
  flex: 1;
  min-width: 0;
}
.avatar-name {
  color: #e8d5a3;
  font-family: Georgia, serif;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.avatar-username {
  color: rgba(200, 144, 42, 0.8);
  font-size: 0.8rem;
  margin-bottom: 2px;
}
.avatar-email {
  color: rgba(220, 210, 195, 0.45);
  font-size: 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.coin-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  color: rgba(232, 213, 163, 0.75);
  font-size: 0.75rem;
  font-weight: 600;
  transition: transform 0.15s ease;
}
.coin-pill i { color: rgba(255, 215, 0, 0.65); }
.coin-pill.bump { transform: scale(1.25); }

/* ── Logros: insignias centradas ───────────── */
.badges-divider-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 14px 14px;
  text-decoration: none;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(200, 144, 42, 0.3);
}
.divider-line:first-child { background: linear-gradient(to right, transparent, rgba(200, 144, 42, 0.3)); }
.divider-line:last-child  { background: linear-gradient(to left, transparent, rgba(200, 144, 42, 0.3)); }

/* [TEMP] acceso directo de pruebas a /logros — eliminar antes de producción */
.temp-logros-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: fit-content;
  margin: 0 auto 14px;
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  color: rgba(220, 210, 195, 0.55);
  font-size: 0.68rem;
  text-decoration: none;
}
.temp-logros-btn:active { background: rgba(255, 255, 255, 0.08); }
.badges-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  flex-shrink: 0;
  perspective: 300px;
}
.badge-slot {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

/* ── Círculo con icono, coloreado según la medalla conseguida ── */
.badge-icon-face {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  border: 1px solid transparent;
}
.badge-icon-face.medal-oro    { border-color: rgba(255, 215, 0, 0.55); color: rgba(255, 215, 0, 0.85); }
.badge-icon-face.medal-plata  { border-color: rgba(215, 217, 221, 0.55); color: rgba(215, 217, 221, 0.85); }
.badge-icon-face.medal-bronce { border-color: rgba(205, 127, 50, 0.55); color: rgba(205, 127, 50, 0.85); }

/* ── Insignia giratoria (pendiente de reclamar → revelada) ───── */
.badge-flip {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1);
}
.badge-flip.flipped { transform: rotateY(180deg); }
.badge-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}
.badge-front {
  font-weight: 700;
  --glow-color: rgba(200, 144, 42, 0.75);
  border-color: var(--glow-color);
  background: rgba(0, 0, 0, 0.15);
  color: var(--glow-color);
}
.badge-front.medal-oro    { --glow-color: #ffd700; }
.badge-front.medal-plata  { --glow-color: #d7d9dd; }
.badge-front.medal-bronce { --glow-color: #cd7f32; }
.badge-front.blink { animation: badge-blink 1.3s ease-in-out infinite; }
@keyframes badge-blink {
  0%, 100% { box-shadow: 0 0 4px var(--glow-color); }
  50%      { box-shadow: 0 0 14px var(--glow-color); }
}
.badge-back { transform: rotateY(180deg); }

/* ── Efecto de evolución: pop + anillo expansivo al revelarse ── */
.badge-flip.evolving { animation: badge-evolve-pop 0.6s ease-out; }
@keyframes badge-evolve-pop {
  0%   { transform: rotateY(180deg) scale(1); }
  35%  { transform: rotateY(180deg) scale(1.55); }
  100% { transform: rotateY(180deg) scale(1); }
}
.badge-flip.evolving::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid var(--ring-color, #ffd700);
  animation: badge-ring-burst 0.8s ease-out forwards;
  pointer-events: none;
}
@keyframes badge-ring-burst {
  0%   { transform: scale(0.6); opacity: 0.95; }
  100% { transform: scale(2.4); opacity: 0; }
}

/* ── Monedas y chispas volando desde la insignia ──────────────── */
.flying-coin {
  position: fixed;
  z-index: 3000;
  color: #ffd700;
  font-size: 0.9rem;
  pointer-events: none;
  filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.75));
  animation: coin-fly 0.7s ease-in forwards;
}
@keyframes coin-fly {
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  60%  { opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0.3); opacity: 0; }
}
.evolution-spark {
  position: fixed;
  z-index: 3000;
  font-size: 0.55rem;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: spark-burst 0.6s ease-out forwards;
}
.evolution-spark.medal-oro    { color: #ffd700; }
.evolution-spark.medal-plata  { color: #d7d9dd; }
.evolution-spark.medal-bronce { color: #cd7f32; }
@keyframes spark-burst {
  0%   { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
  100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1); opacity: 0; }
}

/* ── User ID (dentro de la tarjeta de avatar) ─ */
.user-id-zone {
  padding-top: 12px;
  border-top: 1px solid rgba(200, 144, 42, 0.16);
}
.user-id-label {
  color: rgba(200, 144, 42, 0.7);
  font-size: 0.68rem;
  font-weight: 600;
  margin-bottom: 7px;
  letter-spacing: 0.04em;
}
.user-id-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.user-id-code {
  flex: 1;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(200, 144, 42, 0.22);
  border-radius: 6px;
  padding: 6px 9px;
  color: rgba(220, 210, 195, 0.65);
  font-size: 0.65rem;
  word-break: break-all;
  font-family: monospace;
}
.copy-id-btn {
  width: 34px;
  height: 34px;
  background: rgba(200, 144, 42, 0.16);
  border: 1px solid rgba(200, 144, 42, 0.48);
  border-radius: 8px;
  color: #e8d5a3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.85rem;
  transition: background 0.2s;
}
.copy-id-btn:hover { background: rgba(200, 144, 42, 0.28); }

/* ── Tabs ─────────────────────────────────── */
.prof-tabs-section { margin: 0 14px; }

.tab-subtitle {
  color: rgba(200, 144, 42, 0.8);
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
}

.empty-state-msg {
  text-align: center;
  padding: 22px 14px;
  color: rgba(220, 210, 195, 0.48);
  font-style: italic;
  font-size: 0.82rem;
  border: 1px dashed rgba(200, 144, 42, 0.18);
  border-radius: 8px;
}

.PersonajesList {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 3px;
  row-gap: 5px;
  justify-items: center;
  border-radius: 5px;
}

/* ── Not authenticated ────────────────────── */
.not-auth-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72vh;
  padding: 20px;
}
.not-auth-card {
  background: rgba(6, 3, 14, 0.88);
  border: 1px solid rgba(200, 144, 42, 0.38);
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  max-width: 340px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.55);
}
.not-auth-icon {
  font-size: 2.4rem;
  margin-bottom: 12px;
}
.not-auth-title {
  color: #e8d5a3;
  font-family: Georgia, serif;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 14px;
}
.not-auth-text {
  color: rgba(220, 210, 195, 0.72);
  font-size: 0.8rem;
  line-height: 1.6;
}
.not-auth-btn {
  display: inline-block;
  margin-top: 20px;
  background: rgba(200, 144, 42, 0.18) !important;
  border: 1px solid rgba(200, 144, 42, 0.6) !important;
  color: #e8d5a3 !important;
  border-radius: 20px !important;
  padding: 8px 24px !important;
  font-size: 0.9rem !important;
  cursor: pointer !important;
}
</style>