<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$store.state.modalDifficultyTime = false"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold">{{ textoInterfaz.headTitle }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="$store.state.modalDifficultyTime = false"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <b-tabs size="is-medium" position="is-centered" v-model="activeTab">
            <!-- tiempo estimado -->
            <b-tab-item>
              <template #header>
                <span>{{ textoInterfaz.nav.time }}</span>
              </template>

              <SignedOut>
                <div class="has-text-centered">
                  <p class="title">{{ textoInterfaz.noLogingText }}</p>
                  <router-link to="/">{{ textoInterfaz.goHome }}</router-link>
                </div>
              </SignedOut>

              <SignedIn>
                <div class="has-text-centered">
                  <p class="title is-4 mb-4">{{ textoInterfaz.titleTime }}</p>

                  <!-- Input numérico centrado -->
                  <div class="field is-grouped is-grouped-centered">
                    <p class="control has-icons-left">
                      <b-input v-model.number="valueTime" type="number" placeholder="Minutos (ej: 230)" icon-left="fas fa-clock" />
                      <!-- Mensaje de error -->
                      <p v-if="valueTime > 360" class="help is-danger">
                        El tiempo no puede superar 360 minutos.
                      </p>
                    </p>
                  </div>

                  <div class="field mt-4">
                    <div class="control">
                      <button class="button is-primary is-fullwidth" :disabled="!valueTime || valueTime > 360" @click="submitTime" >
                        {{ textoInterfaz.sendButton }}
                      </button>
                    </div>
                  </div>
                </div>
              </SignedIn>
            </b-tab-item>

            <!-- dificultad -->
            <b-tab-item>
              <template #header>
                <span>{{ textoInterfaz.nav.difficulty }}</span>
              </template>

              <SignedOut>
                <div class="has-text-centered">
                  <p class="title">{{ textoInterfaz.noLogingText }}</p>
                  <router-link to="/">{{ textoInterfaz.goHome }}</router-link>
                </div>
              </SignedOut>

              <SignedIn>
                <div class="has-text-centered">
                  <p class="title is-4 mb-4">{{ textoInterfaz.titleDifficulty }}</p>

                  <!-- Selector de dificultad con calaveras -->
                  <div class="skull-selector">
                    <i v-for="n in 5" :key="n" class="fas fa-skull fa-2x mx-2" :class="{ 'selected': valueDifficulty >= n }" @click="valueDifficulty = n"></i>
                  </div>

                  <div class="field mt-4">
                    <div class="control">
                      <button class="button is-primary is-fullwidth" :disabled="!valueDifficulty" @click="submitDifficulty">
                        {{ textoInterfaz.sendButton }}
                      </button>
                    </div>
                  </div>
                </div>
              </SignedIn>
            </b-tab-item>
          </b-tabs>

          <a href="https://boardgamegeek.com/boardgame/257499/arkham-horror-third-edition/forums/0?pageid=1&sort=recent" target="_blank">
            <p>{{ this.textoInterfaz.linkToBGG }}</p>
          </a>
        </section>

        <footer>
          <div class="field has-addons columns is-mobile is-gapless">
            <p class="control column">
              <button @click="$store.state.modalDifficultyTime = false" class="button is-danger is-fullwidth">
                {{ textoInterfaz.closeButton }}
              </button>
            </p>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { SignedIn, SignedOut } from '@clerk/vue';
import { apiService } from '@/services/api.js';

export default {
  name: 'ModalDifficultyTime',
  components: { SignedIn, SignedOut },
  data() {
    return {
      activeTab: 0,
      valueTime: null,
      valueDifficulty: null,
      textoInterfaz: {
        headTitle: '',
        nav: {
          time: '',
          difficulty: ''
        },
        titleTime: '',
        titleDifficulty: '',
        sendButton: '',
        closeButton: '',

        noLogingText: '',
        goHome: '',

        linkToBGG: ''
      }
    };
  },
  methods: {
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.headTitle = "Comunidad";
        this.textoInterfaz.nav.time = "Tiempo";
        this.textoInterfaz.nav.difficulty = "Dificultad";

        this.textoInterfaz.titleTime = "Tiempo estimado";
        this.textoInterfaz.titleDifficulty = "Dificultad";
        this.textoInterfaz.sendButton = "Enviar";
        this.textoInterfaz.closeButton = "Cerrar";

        this.textoInterfaz.noLogingText = "Para poder votar, debes iniciar sesión";
        this.textoInterfaz.goHome = "Ir a Home";

        this.textoInterfaz.linkToBGG = "Comunidad de BGG"
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.headTitle = "Comunity";
        this.textoInterfaz.nav.time = "Time";
        this.textoInterfaz.nav.difficulty = "Difficulty";

        this.textoInterfaz.titleTime = "Time estimated";
        this.textoInterfaz.titleDifficulty = "Dificulty";
        this.textoInterfaz.sendButton = "Send";
        this.textoInterfaz.closeButton = "Close";

        this.textoInterfaz.noLogingText = "To vote, you must log in.";
        this.textoInterfaz.goHome = "Go Home";

        this.textoInterfaz.linkToBGG = "BGG Comunity"
      }
    },
    async submitTime() {
      if (this.valueTime > 360) return;
      try {
        const idMap = this.$store.state.datosMapa.idMap;
        const idUser = this.$store.state.IDUserHost;
        await apiService.postTimeEstimated(idMap, idUser, this.valueTime);
        this.$buefy.toast.open({ message: 'Tiempo estimado enviado correctamente.', type: 'is-success', duration: 2000 });
        this.$store.state.modalDifficultyTime = false
      } catch (error) {
        console.error('❌ submitTime(.vue) - Error al enviar tiempo:', error);
      }
    },
    async submitDifficulty() {
      try {
        const idMap = this.$store.state.datosMapa.idMap;
        const idUser = this.$store.state.IDUserHost;
        await apiService.postDifficultyMap(idMap, idUser, this.valueDifficulty);
        this.$buefy.toast.open({ message: 'Dificultad enviada correctamente.', type: 'is-success', duration: 2000 });
        this.$store.state.modalDifficultyTime = false
      } catch (error) {
        console.error('❌ submitDifficulty(.vue) - Error al enviar dificultad:', error);
      }
    },
  },
  mounted() {
    this.rellenarTextoSegunIdioma();
  }

};
</script>

<style scoped>
.BGBendicion {
  background-image: url('@/assets/img/Estados/Bendicion.jpg');
  background-position: center;
  background-size: cover;
}
.skull-selector {
  display: flex;
  justify-content: center;
}
.skull-selector .fa-skull {
  cursor: pointer;
  color: #ccc;
  transition: transform 0.2s;
}
.skull-selector .fa-skull.selected {
  color: #000;
  transform: scale(1.2);
}
</style>
