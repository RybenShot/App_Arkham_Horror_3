<template>
  <div class="modal is-active">
    <!-- Fondo del modal (al hacer click se cierra) -->
    <div class="modal-background" @click="closeModal"></div>

    <div class="modal-card">
      <!-- Cabecera -->
      <header class="columns is-mobile modal-card-head BGBendicion m-0">
        <p class="modal-card-title has-text-weight-bold m-0">Comunidad</p>
        <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
      </header>

      <!-- Cuerpo del modal -->
      <section class="modal-card-body p-1">
        <h2 class="title is-5 has-text-centered mb-2">Investigadores recomendados</h2>
        <hr class="mt-0 mb-2" />

        <!-- selectores de expansion o arquetipo -->
        <section>
          <b-tabs size="is-medium" position="is-centered" v-model="activeTab">
              <b-tab-item>
                <template #header>
                    <span> Lista </span>
                </template>

                  <!-- Container donde listamos cada investigador agrupado -->
                  <div v-if="invGroups.length === 0" class="has-text-centered has-text-grey">
                    Sin investigadores recomendados aún.
                  </div>
                  <div v-else>
                    <div class="box mb-2" v-for="group in invGroups" :key="group.idInv">
                      <div class="columns is-mobile is-vcentered is-gapless">
                        <!-- Imagen del investigador -->
                        <div class="column is-3-mobile is-2-tablet mr-2">
                          <figure class="image is-100x100">
                            <img :src="group.imgInv" :alt="group.name"/>
                          </figure>
                        </div>
                        <!-- Datos principales: nombre, expansión, número de votos -->
                        <div class="column is-9-mobile is-10-tablet">
                          <p class="is-size-6 mb-1">{{ group.name }}</p>
                          <p class="is-size-7 mb-1"><strong>Expansión:</strong> {{ group.expansion }}</p>
                          <p class="is-size-7"><strong>Votos:</strong> {{ group.voteCount }}</p>

                          <!-- Botón para mostrar/ocultar comentarios -->
                          <div class=" columns is-mobile mt-2">
                            <button class="button column is-small p-1 m-1" @click="selectInv(group.idInv)">
                              <span >Seleccionar</span>
                            </button>

                            <button class="button column is-small p-1 m-1" @click="toggleComments(group.idInv)">
                              <span v-if="!openComments[group.idInv]">Ver comentarios</span>
                              <span v-else>Ocultar comentarios</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Lista de comentarios (colapsable) -->
                      <div v-show="openComments[group.idInv]" class="comments-container mt-2" >
                        <hr class="mt-2 mb-2" />
                        <div v-for="(c, idx) in group.comments" :key="idx" class="mb-2">
                          <p class="is-size-7 has-text-weight-semibold mb-0"> {{ c.nameUser }} 
                            <span class="has-text-grey-light"> – {{ formatDate(c.dateCreated) }} </span>
                          </p>
                          <p class="is-size-7">{{ c.comment }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

              </b-tab-item>

              <!-- Sistema de votacion -->
              <b-tab-item>
                <template #header>
                    <span> Votación </span>
                </template>

                <SignedOut>
                  <div class="has-text-centered ">
                    <p class="title has-text centered"> Para poder votar, debes iniciar sesión</p>
                    <router-link to="/"> Ir a Home </router-link>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div>
                    <p class="title is-4 has-text-centered mb-4">¡Mándanos tu recomendación!</p>
                    <p class="subtitle is-6 mb-1 has-text-centered">Selecciona investigador:</p>
                    <hr class="mt-0 mb-2" />
                    <div class="columns is-multiline is-mobile thumbnail-grid">
                      <div class="column is-4-mobile p-1" v-for="inv in allInvestigators" :key="inv.idInv">
                        <div class=" thumbnail-card" :class="{ 'is-selected-card': selectedInvId === inv.idInv }" @click="(selectedInvId = inv.idInv) && (invData = inv)">
                            <figure class="image ">
                              <img :src="inv.imgInv" :alt="inv.name" />
                            </figure>
                        </div>
                      </div>
                    </div>

                    <!-- Comentario -->
                    <b-field label="Comentario">
                      <b-input v-model="newComment" maxlength="100" type="textarea" placeholder="Escribe tu comentario aquí..."></b-input>
                    </b-field>

                    <!-- Botón enviar -->
                    <div class="field">
                      <div class="control">
                        <button class="button is-primary is-fullwidth" :disabled="!selectedInvId || newComment.trim() === ''" @click="sendRecommendation">
                          Enviar recomendación
                        </button>
                      </div>
                    </div>
                  </div>
                </SignedIn>
                
              </b-tab-item>
          </b-tabs>
        </section> <!-- END selectores -->
      </section>

      <!-- Pie del modal con botón Cerrar -->
      <footer class="modal-card-foot p-2">
        <button @click="closeModal" class="button is-danger is-fullwidth"> Cerrar </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { SignedIn, SignedOut, SignInButton } from '@clerk/vue'
import { apiService } from '@/services/api.js';

export default {
  name: "ModalInvestigadoresRecomendados",
  components:{
    SignedIn,
    SignedOut,
    SignInButton
  },
  data() {
    return {
      activeTab: 0,            // Índice de la pestaña activa: 0 = Lista, 1 = Votación
      invGroups: [],           // Grupos de recomendaciones para la pestaña "Lista"
      openComments: {},        // Control de comentarios desplegados

      allInvestigators: [],    // Lista completa de investigadores para el select
      selectedInvId: null,     // ID del investigador elegido por el usuario
      invData: null,     // Nombre del investigador elegido por el usuario
      newComment: '',          // Texto del comentario que ingresa el usuario
    };
  },
  methods: {
    // Traer lista de recomendaciones agrupada (misma lógica que antes)
    async getListInvRec() {
      try {
        const idMapa = this.$store.state.datosMapa.idMap;
        const response = await apiService.getRecInv(idMapa);

        const groups = {};
        response.forEach((item) => {
          const key = item.idInv;
          if (!groups[key]) {
            groups[key] = {
              idInv: key,
              name: item.nameInv,
              imgInv: item.imgInv,
              expansion: item.expansion,
              comments: [],
            };
          }
          groups[key].comments.push({
            idUser: item.idUser,
            nameUser: item.nameUser,
            dateCreated: item.dateCreated,
            comment: item.comment,
          });
        });

        this.invGroups = Object.values(groups).map((g) => ({
          idInv: g.idInv,
          name: g.name,
          imgInv: g.imgInv,
          expansion: g.expansion,
          voteCount: g.comments.length,
          comments: g.comments,
        }));

      } catch (error) {
        console.error("❌ Error al obtener la lista de investigadores recomendados:", error);
      }
    },

    // Alternar visibilidad de comentarios
    toggleComments(idInv) {
      this.openComments[idInv] = !this.openComments[idInv];
    },

    // Formatear fecha a DD/MM/YYYY
    formatDate(timestamp) {
      const d = new Date(timestamp);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },

    // Traer lista completa de investigadores para el select
    async getAllPrevInvestigators() {
      try {
        const response = await apiService.obtainPreviewInv();
        this.allInvestigators = response;
      } catch (error) {
        console.error("❌ Error al obtener la lista de investigadores:", error);
      }
    },

    // Enviar la recomendación del usuario
    async sendRecommendation() {
      // si no se ha seleccionado ningun investigador o no se ha escrito nada en el comentario, no hacemos nada
      if (this.selectedInvId == null || this.newComment.trim() === '') return;
      try {
        // capturamos valores
        const idMap = this.$store.state.datosMapa.idMap;
        const idUser = this.$store.state.IDUserHost;
        const nameUser = this.$store.state.nameUserHost;
        const comment = this.newComment.trim();
        const invData = this.invData;

        await apiService.postRecInv(idMap, idUser ,nameUser ,invData ,comment);

        // Al enviar, refrescamos la pestaña “Lista” y limpiamos el formulario
        await this.getListInvRec();
        this.selectedInvId = null;
        this.invData = null;
        this.newComment = '';
        // volver a la pestaña “Lista”
        this.activeTab = 0;
      } catch (error) {
        console.error("❌ Error al enviar la recomendación:", error);
      }
    },

    // seleccionar a un investigador de la lista de recomendados
    async selectInv(idInv) {
      try {
        const response = await apiService.obtainInvByID(idInv);
        await this.$store.commit('setDatosInvestigator', response);
        this.$router.push('/DetallePersonaje');
      } catch (error) {
        console.error("❌ selectInv(.vue) - No se pudo obtener el investigador", error);
      }
      },

    closeModal() {
      this.$store.state.modalInvRec = false;
    },
  },
  mounted() {
    // Al montar, cargamos ambas listas
    this.getListInvRec();
    this.getAllPrevInvestigators();
  },
};
</script>

<style scoped>
.modal-card {
  max-height: 80%;
}

.modal-card-head {
  padding: 0.5rem 1rem;
}

.BGBendicion {
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}

/* Grid de miniaturas */
.thumbnail-grid {
  margin-bottom: 0.75rem;
}

/* Cada tarjeta de miniatura */
.thumbnail-card {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.15s;
}

.thumbnail-card img {
  object-fit: cover;
  width: 100%;
  height: auto;
}

/* Cuando está seleccionada: borde de color primario */
.thumbnail-card.is-selected-card {
  border-color: #3273dc; /* azul Bulma */
}

/* Ajustar el texto del nombre en la miniatura */
.thumbnail-card .card-content {
  padding: 0.25rem 0.5rem;
}

.thumbnail-card .card-content p {
  font-size: 0.75rem;
  text-align: center;
  margin: 0;
}

/* Caja de investigador en la pestaña Lista */
.box {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
}

.comments-container {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.comments-container > div {
  margin-bottom: 0.5rem;
}

.media-content p {
  margin: 0.1rem 0;
}

.modal-card-foot {
  padding: 0.5rem 1rem;
}

.is-size-7 {
  font-size: 0.75rem;
}

.title.is-5 {
  font-size: 1.1rem;
}

.delete {
  margin-right: 0.5rem;
}
</style>
