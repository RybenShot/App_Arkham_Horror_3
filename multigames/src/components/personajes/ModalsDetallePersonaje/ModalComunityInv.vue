<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold">{{ textoInterfaz.headTitle }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal()"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <b-tabs size="is-medium" position="is-centered" v-model="activeTab">
            <!-- Comentarios -->
            <b-tab-item>
              <template #header>
                <span>{{ textoInterfaz.nav.title1 }}</span>
              </template>

              <div v-if="allComments.length === 0" class="has-text-centered has-text-grey">{{ textoInterfaz.noComments }}</div>
              <div v-else class="comments-container mt-2">
                <hr class="mt-2 mb-2" />
                <div v-for="(comment, idx) in allComments" :key="idx" class="mb-4">
                  <p class="is-size-7 has-text-weight-semibold mb-0">
                    {{ comment.nameUser }}
                    <span class="has-text-grey-light">– {{ formatDate(comment.dateCreated) }}</span>
                  </p>
                  <p class="is-size-7">{{ comment.comment }}</p>
                </div>
              </div>
            </b-tab-item>

            <!-- Escribir comentario -->
            <b-tab-item>
              <template #header>
                <span>{{ textoInterfaz.nav.title2 }}</span>
              </template>

              <SignedOut>
                <div class="has-text-centered">
                  <p class="title">{{ textoInterfaz.noLogingText }}</p>
                  <router-link to="/">{{ textoInterfaz.goHome }}</router-link>
                </div>
              </SignedOut>

              <SignedIn>
                <div>
                  <p class="title is-4 has-text-centered mb-4">{{ textoInterfaz.nav.title2 }}</p>
                  <b-field>
                    <b-input v-model="newComment" maxlength="100" type="textarea" placeholder="Escribe tu comentario aquí..."></b-input>
                  </b-field>
                  <div class="field">
                    <div class="control">
                      <button class="button is-primary is-fullwidth" :disabled="newComment.trim() === ''" @click="postNewComment()">
                        {{ textoInterfaz.sendbutton }}
                      </button>
                    </div>
                  </div>
                </div>
              </SignedIn>
            </b-tab-item>
          </b-tabs>
        </section>

        <footer>
          <div class="field has-addons columns is-mobile is-gapless">
            <p class="control column">
              <button @click="closeModal()" class="button is-danger is-fullwidth">
                <p>{{ textoInterfaz.closeModal }}</p>
              </button>
            </p>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { SignedIn, SignedOut } from '@clerk/vue'
import { apiService } from '@/services/api.js'
import { audioService_effects } from '@/services/GestionAudio/audioService_effects.js'

export default {
  name: 'ModalComunityInv',
  components: { SignedIn, SignedOut },
  data() {
    return {
      activeTab: 0,
      allComments: [],
      newComment: '',
      textoInterfaz: {
        headTitle: '',
        nav: { title1: '', title2: '' },
        noComments: '',
        noLogingText: '',
        goHome: '',
        sendbutton: '',
        closeModal: ''
      }
    }
  },
  methods: {
    formatDate(dateString) {
      const d = new Date(dateString)
      return d.toLocaleDateString(this.$store.state.lenguaje === 'ingles' ? 'en-US' : 'es-ES', {
        year: 'numeric', month: 'short', day: 'numeric'
      })
    },
    async getAllComments() {
      try {
        const idInv = this.$store.state.datosPJactual.idInv
        const response = await apiService.getCommentsInv(idInv)
        this.allComments = response
      } catch (error) {
        console.error('❌ Error al obtener comentarios del investigador:', error)
      }
    },
    async postNewComment() {
        if (this.newComment.trim() === '') return
        try {
            const idInv = this.$store.state.datosPJactual.idInv
            const idUser = this.$store.state.IDUserHost
            const nameUser = this.$store.state.nameUserHost
            await apiService.postCommentInv(idInv, idUser, nameUser, this.newComment.trim())
            this.newComment = ''
            await this.getAllComments()
            this.$buefy.toast.open({ message: 'Comentario enviado!', type: 'is-success', duration: 2000 })
            this.activeTab = 0
        } catch (error) {
            console.error('❌ Error al enviar comentario del investigador:', error)
        }
    },
    closeModal() {
      audioService_effects.playTecla()
      this.$store.state.modalComunityInv = false
    },
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === 'español') {
        this.textoInterfaz.headTitle = 'Comunidad'
        this.textoInterfaz.nav.title1 = 'Comentarios'
        this.textoInterfaz.nav.title2 = 'Comenta algo!'
        this.textoInterfaz.noComments = '¡Sé el primero en comentar!'
        this.textoInterfaz.noLogingText = 'Para comentar, debes iniciar sesión'
        this.textoInterfaz.goHome = 'Ir a Home'
        this.textoInterfaz.sendbutton = 'Enviar comentario'
        this.textoInterfaz.closeModal = 'Cerrar'
      } else {
        this.textoInterfaz.headTitle = 'Community'
        this.textoInterfaz.nav.title1 = 'Comments'
        this.textoInterfaz.nav.title2 = 'Comment something!'
        this.textoInterfaz.noComments = 'Be the first to comment!'
        this.textoInterfaz.noLogingText = 'To comment, you must log in.'
        this.textoInterfaz.goHome = 'Go Home'
        this.textoInterfaz.sendbutton = 'Send Comment'
        this.textoInterfaz.closeModal = 'Close'
      }
    }
  },
  mounted() {
    this.rellenarTextoSegunIdioma()
    this.getAllComments()
  }
}
</script>

<style scoped>
.BGBendicion {
  background-image: url('@/assets/img/Estados/Bendicion.jpg');
  background-position: center;
  background-size: cover;
}
.comments-container {
  max-height: 300px;
  overflow-y: auto;
}
</style>