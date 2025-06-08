<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$store.state.modalDifficultyTime = false"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold">Community</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="$store.state.modalDifficultyTime = false"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <b-tabs size="is-medium" position="is-centered" v-model="activeTab">
            <!-- tiempo estimado -->
            <b-tab-item>
              <template #header>
                <span>Tiempo</span>
              </template>

              <SignedOut>
                <div class="has-text-centered">
                  <p class="title">Para poder votar, debes iniciar sesión</p>
                  <router-link to="/">Ir a Home</router-link>
                </div>
              </SignedOut>

              <SignedIn>
                <div class="has-text-centered">
                  <p class="title is-4 mb-4">Tiempo estimado</p>

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
                        Enviar Tiempo
                      </button>
                    </div>
                  </div>
                </div>
              </SignedIn>
            </b-tab-item>

            <!-- dificultad -->
            <b-tab-item>
              <template #header>
                <span>Dificultad</span>
              </template>

              <SignedOut>
                <div class="has-text-centered">
                  <p class="title">Para poder votar, debes iniciar sesión</p>
                  <router-link to="/">Ir a Home</router-link>
                </div>
              </SignedOut>

              <SignedIn>
                <div class="has-text-centered">
                  <p class="title is-4 mb-4">Dificultad</p>

                  <!-- Selector de dificultad con calaveras -->
                  <div class="skull-selector">
                    <i v-for="n in 5" :key="n" class="fas fa-skull fa-2x mx-2" :class="{ 'selected': valueDifficulty >= n }" @click="valueDifficulty = n"></i>
                  </div>

                  <div class="field mt-4">
                    <div class="control">
                      <button class="button is-primary is-fullwidth" :disabled="!valueDifficulty" @click="submitDifficulty">
                        Enviar Dificultad
                      </button>
                    </div>
                  </div>
                </div>
              </SignedIn>
            </b-tab-item>
          </b-tabs>

          <a href="https://boardgamegeek.com/boardgame/257499/arkham-horror-third-edition/forums/0?pageid=1&sort=recent" target="_blank">
            <p>Comunidad de BGG</p>
          </a>
        </section>

        <footer>
          <div class="field has-addons columns is-mobile is-gapless">
            <p class="control column">
              <button @click="$store.state.modalDifficultyTime = false" class="button is-danger is-fullwidth">
                Cerrar
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
    };
  },
  methods: {
    async submitTime() {
      if (this.valueTime > 360) return;
      try {
        const idMap = this.$store.state.datosMapa.idMap;
        const idUser = this.$store.state.IDUserHost;
        await apiService.postTimeEstimated(idMap, idUser, this.valueTime);
        this.$buefy.toast.open('Tiempo estimado enviado correctamente.');
      } catch (error) {
        console.error('❌ submitTime(.vue) - Error al enviar tiempo:', error);
      }
    },
    async submitDifficulty() {
      try {
        const idMap = this.$store.state.datosMapa.idMap;
        const idUser = this.$store.state.IDUserHost;
        await apiService.postDifficultyMap(idMap, idUser, this.valueDifficulty);
        this.$buefy.toast.open('Dificultad enviada correctamente.');
      } catch (error) {
        console.error('❌ submitDifficulty(.vue) - Error al enviar dificultad:', error);
      }
    },
  },
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
