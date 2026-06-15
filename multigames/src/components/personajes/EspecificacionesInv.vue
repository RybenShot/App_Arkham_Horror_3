<template>
  <div class="inv-community-bar mx-4 my-2">
    <!-- Likes / Dislikes -->
    <div class="vote-row">
      <SignedOut><button class="btn like" @click="activeNotification()">👍</button></SignedOut>
      <SignedIn><button class="btn like" @click="postLikeDislike(1)">👍</button></SignedIn>

      <div class="bar">
        <div class="fill like-fill" :style="{ width: likePercent + '%' }">
          <span v-if="likes > 0" class="count">{{ likes }}</span>
        </div>
        <div class="fill dislike-fill" :style="{ width: dislikePercent + '%' }">
          <span v-if="dislikes > 0" class="count">{{ dislikes }}</span>
        </div>
      </div>

      <SignedOut><button class="btn dislike" @click="activeNotification()">👎</button></SignedOut>
      <SignedIn><button class="btn dislike" @click="postLikeDislike(-1)">👎</button></SignedIn>
    </div>

    <!-- Botón comunidad -->
    <button class="btn-community" @click="$store.state.modalComunityInv = true">
      <i class="fas fa-comments"></i> {{ textoInterfaz.comunidad }}
    </button>
  </div>
</template>

<script>
import { SignedIn, SignedOut } from '@clerk/vue'
import { apiService } from '@/services/api.js'

export default {
  name: 'EspecificacionesInv',
  components: { SignedIn, SignedOut },
  data() {
    return {
      likes: 0,
      dislikes: 0,
      textoInterfaz: {
        title: '',
        votosUsuarios: '',
        comunidad: ''
      }
    }
  },
  computed: {
    likePercent() {
      const total = this.likes + this.dislikes
      return total > 0 ? (this.likes / total) * 100 : 0
    },
    dislikePercent() {
      const total = this.likes + this.dislikes
      return total > 0 ? (this.dislikes / total) * 100 : 0
    }
  },
  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === 'español') {
        this.textoInterfaz.title = 'Tu opinión importa'
        this.textoInterfaz.votosUsuarios = 'Votos de Usuarios'
        this.textoInterfaz.comunidad = 'Comunidad'
      } else {
        this.textoInterfaz.title = 'Your opinion matters'
        this.textoInterfaz.votosUsuarios = 'User Votes'
        this.textoInterfaz.comunidad = 'Community'
      }
    },
    activeNotification() {
      this.$buefy.toast.open({
        message: this.$store.state.lenguaje === 'español' ? 'Haz Login para poder votar 😢' : 'Log in to vote 😢',
        type: 'is-danger',
        duration: 2000
      })
    },
    async postLikeDislike(value) {
      try {
        const idInv = this.$store.state.datosPJactual.idInv
        const idUser = this.$store.state.IDUserHost
        const response = await apiService.postLikeDislikeInv(idInv, idUser, value)
        this.likes = response.extraData.likes
        this.dislikes = response.extraData.dislikes
        this.$buefy.toast.open({ message: 'Voto enviado', type: 'is-success', duration: 2000 })
      } catch (error) {
        console.error('❌ Error al votar investigador:', error)
      }
    }
  },
  async mounted() {
    this.rellenarTextoSegunIdioma()
    const idInv = this.$store.state.datosPJactual.idInv
    if (idInv === null || idInv === undefined) return
    try {
      const data = await apiService.getLikeDislikeInv(idInv)
      this.likes = data.likes || 0
      this.dislikes = data.dislikes || 0
    } catch (error) {
      console.error('❌ Error cargando valoraciones del investigador:', error)
    }
  }
}
</script>

<style scoped>
.inv-community-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.vote-row {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 0.25rem;
}

.bar {
  flex: 1;
  height: 1.2rem;
  background: #ffffff;
  border: 1px solid #000;
  border-radius: 0.6rem;
  display: flex;
  overflow: hidden;
}

.fill {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: width 0.3s ease;
}
.like-fill { background: #28a745; }
.dislike-fill { background: #dc3545; }

.count {
  font-size: 0.65rem;
  font-weight: bold;
  color: #fff;
  padding: 0 0.2rem;
  white-space: nowrap;
}

.btn {
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0.1rem;
  cursor: pointer;
  user-select: none;
}

.btn-community {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
  white-space: nowrap;
}
</style>