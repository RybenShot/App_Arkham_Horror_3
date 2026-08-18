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
        <img class="avatar-img"
          :src="$store.state.datosPJactual.imgInv || '/img/1-inv/57-Nameless.jpg'"
          alt="Investigador">
        <div class="avatar-info">
          <p class="avatar-name">{{ user.fullName || user.firstName || user.username }}</p>
          <p class="avatar-username">@{{ user.username || 'Investigador' }}</p>
          <p class="avatar-email">{{ user.primaryEmailAddress?.emailAddress }}</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-num">{{ getMapsLength() }}</span>
          <span class="stat-label">{{ $store.state.lenguaje === 'español' ? 'Mapas' : 'Maps' }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-num">{{ getInvestigadoresCount() }}</span>
          <span class="stat-label">{{ $store.state.lenguaje === 'español' ? 'Investigadores' : 'Investigators' }}</span>
        </div>
        <div class="stat-card stat-soon">
          <span class="stat-num">🏆</span>
          <span class="stat-label">{{ $store.state.lenguaje === 'español' ? 'Pronto' : 'Soon' }}</span>
        </div>
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

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuth, useUser, SignInButton } from '@clerk/vue'
import MapCard from '@/components/mapas/MapCard.vue'
import InvestigatorCard from '@/components/personajes/invCard.vue'
import { apiService } from '@/services/api.js'
import { useStore } from 'vuex' // importamos esto para poder usar el store en el setup

import { BIcon, BTabs, BTabItem, BTag } from "buefy";

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
  data() {
    return {
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
  },
  mounted(){
    this.rellenarTextosegunIdioma();
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
  align-items: center;
  gap: 14px;
  margin: 14px 14px 12px;
  background: rgba(6, 3, 14, 0.78);
  border: 1px solid rgba(200, 144, 42, 0.38);
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
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

/* ── Stats row ────────────────────────────── */
.stats-row {
  display: flex;
  gap: 9px;
  margin: 0 14px 12px;
}
.stat-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(200, 144, 42, 0.22);
  border-radius: 12px;
  padding: 11px 4px;
}
.stat-num {
  color: #e8d5a3;
  font-family: Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}
.stat-soon .stat-num { font-size: 1.1rem; }
.stat-label {
  color: rgba(220, 210, 195, 0.55);
  font-size: 0.62rem;
  text-align: center;
  letter-spacing: 0.03em;
}

/* ── User ID ──────────────────────────────── */
.user-id-zone {
  margin: 0 14px 14px;
  background: rgba(0, 0, 0, 0.42);
  border: 1px solid rgba(200, 144, 42, 0.18);
  border-radius: 10px;
  padding: 11px 12px;
}
.user-id-label {
  color: rgba(200, 144, 42, 0.75);
  font-size: 0.72rem;
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