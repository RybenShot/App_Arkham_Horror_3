<template>
  <div class="mt-2 mx-6">

    <div class="has-text-centered has-text-white">

      <!-- Barra para copiar la id del mapa onLine -->
      <div v-if="this.$store.state.datosMapa.id">
        <b-field >
          <b-input placeholder="1234-1234-1234"
              type="search"
              icon="magnify"
              v-model="this.$store.state.datosMapa.id ">
          </b-input>
          <p class="control">
              <b-button type="is-primary" label="Copiar" @click="copyCode()" />
          </p>
        </b-field>
      </div>
      

      <p>Tu opinión importa:</p>
      <div class="columns mt-2 is-mobile">
        <!-- Likes -->
        <div class="column p-0" id="barraDerechaAbajo" >
          <p>{{ textoInterfaz.votosUsuarios }}</p>
          
          <div class="vote-container">
            <!-- Botón Like a la izquierda fuera de la barra -->
            <SignedOut><button class="btn like" @click="activeNotification()">👍</button></SignedOut>
            <SignedIn><button class="btn like" @click="postLikeDislike(1)">👍</button></SignedIn>

            <!-- Barra central con proporción reactiva y contadores dentro -->
            <div class="bar">
              <div class="fill like-fill" :style="{ width: likePercent + '%' }">
                <span v-if="likes > 0" class="count">{{ likes }}</span>
              </div>
              <div class="fill dislike-fill" :style="{ width: dislikePercent + '%' }">
                <span v-if="dislikes > 0" class="count">{{ dislikes }}</span>
              </div>
            </div>

            <!-- Botón Dislike a la derecha fuera de la barra -->
            <SignedOut><button class="btn dislike" @click="activeNotification()">👎</button></SignedOut>
            <SignedIn><button class="btn dislike" @click="postLikeDislike(-1)">👎</button></SignedIn>
          </div>
        </div>

        <div class="column p-0 py-1" @click="$store.state.modalDifficultyTime = true">
          <p>{{ textoInterfaz.duracion }}</p>
          <p>{{ timeEstimated }} min</p>
        </div>
      </div>

      <div class="columns is-mobile" >
        <div class="column p-0 py-1" >
          <p>{{ textoInterfaz.cajaNecesaria }}</p>
          <p>{{ this.$store.state.datosMapa.expansion }}</p>
        </div>

        <div class="difficulty-section column p-0 py-1" id="barraIzquierdaArriba" @click="$store.state.modalDifficultyTime = true">
          <!-- Etiqueta traducible -->
          <p class="label has-text-white">{{ textoInterfaz.dificultad }}</p>

          <div class="icons-container" >
            <!-- Iteramos de 1 a 5 -->
            <i v-for="n in 5" :key="n" class="fas fa-skull" :class="n <= difficulty ? 'filled' : 'empty'" ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SignedIn, SignedOut} from '@clerk/vue'
import { apiService } from '@/services/api.js';

export default {
  name: "Especificaciones de mapas",
  components: {
    SignedIn,
    SignedOut
  },
  data(){
    return{
      textoInterfaz: {
        textVote: "",
        votosUsuarios: "",
        duracion: "",
        cajaNecesaria: "",
        dificultad: ""
      },
      barCode: this.$store.state.datosMapa.id 
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.votosUsuarios = "Votos de Usuarios";
        this.textoInterfaz.duracion = "Duracion";
        this.textoInterfaz.cajaNecesaria = "Caja necesaria";
        this.textoInterfaz.dificultad = "Dificultad";
      }else{
        this.textoInterfaz.votosUsuarios = "User Votes";
        this.textoInterfaz.duracion = "Duration";
        this.textoInterfaz.cajaNecesaria = "Required Box";
        this.textoInterfaz.dificultad = "Difficulty";
      }
    },
    async copyCode(){
      if (!this.barCode) return alert('Nada que copiar');
      // estructura para copiar a porta papeles
      const textarea = document.createElement('textarea');
      textarea.value = this.barCode;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);

      alert(copied ? 'Código copiado 😊' : 'No se pudo copiar');
    },
    activeNotification() {
      if (this.$store.state.lenguaje == "español") {
        this.$store.state.FlashPopUP_notifications.text = "Haz Login para poder votar";
      } else {
        this.$store.state.FlashPopUP_notifications.text = "Log in to vote";
      }
      this.$store.state.FlashPopUP_notifications.state = true;
      setTimeout(() => {
        this.$store.state.FlashPopUP_notifications.state = false;
      }, 3000);
    },

    // metodo para pedir likes y dislike del mapa
    async postLikeDislike(value){
      try {
        const idMap = this.$store.state.datosMapa.idMap;
        const idUser = this.$store.state.IDUserHost
        
        const response = await apiService.postLikeDislike(idMap, idUser, value);

        // Actualizar los datos del mapa en el store
        const { likes, dislikes, NVotesLikeDislike } = response.extraData;

        console.log("Likes:", likes, "Dislikes:", dislikes, "NVotesLikeDislike:", NVotesLikeDislike);

        this.$store.state.datosMapa.extraData.likes = likes;
        this.$store.state.datosMapa.extraData.dislikes = dislikes;
        this.$store.state.datosMapa.extraData.NVotesLikeDislike = NVotesLikeDislike;

      } catch (error) {
        console.error("❌ Error fetching likes/dislikes:", error);
      }
    }
  },
  computed: {
    // Lectura desde extraData
    likes() {
      return this.$store.state.datosMapa.extraData.likes || 0;
    },
    dislikes() {
      return this.$store.state.datosMapa.extraData.dislikes || 0;
    },
    likePercent() {
      const total = this.likes + this.dislikes;
      return total > 0 ? (this.likes / total) * 100 : 0;
    },
    dislikePercent() {
      const total = this.likes + this.dislikes;
      return total > 0 ? (this.dislikes / total) * 100 : 0;
    },

    timeEstimated() {
      return this.$store.state.datosMapa.extraData.timeEstimated || 0;
    },

    difficulty() {
      return this.$store.state.datosMapa.extraData.difficulty || 0;
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style scoped>
#barraDerechaAbajo{
  border-right: solid 2px;
  border-bottom: solid 2px
}

#barraIzquierdaArriba{
  border-left: solid 2px;
  border-top: solid 2px
}

p{
  color: #fff; /* Color del texto */
  padding: 1px;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.733);
}

/* Estilos para la barra de votos */

.vote-container {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.btn {
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0.2rem;
  cursor: pointer;
  user-select: none;
}
.btn.like { color: #28a745; }
.btn.dislike { color: #dc3545; }

.bar {
  flex: 50%;
  height: 1.5rem;
  margin: 0 0.5rem;
  background: #ffffff;
  border: 1px solid #000;
  border-radius: 0.75rem;
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
.like-fill {
  background: #28a745;
}
.dislike-fill {
  background: #dc3545;
}

.count {
  font-size: 0.75rem;
  font-weight: bold;
  color: #fff;
  padding: 0 0.25rem;
  white-space: nowrap;
}

.difficulty-section {
  display: flex;
  flex-direction: column;
}

/* Etiqueta “Dificultad” */
.label {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

/* Contenedor de las 5 calaveras */
.icons-container {
  display: flex;
  gap: 0.25rem;
  justify-content: center;

}

/* Por defecto, la calavera es gris muy clarito (casi transparente) */
.empty {
  color: #bbbbbb;      /* gris claro */
  opacity: 0.4;        /* un poco transparente */
  font-size: 1.5rem;
  transition: opacity 0.15s, color 0.15s;
}

/* Si está “filled” (n <= difficulty), la calavera se pinta blanca y opaca */
.filled {
  color: #ffffff;     /* blanca pura */
  opacity: 1;         /* totalmente visible */
  font-size: 1.5rem;
  transition: opacity 0.15s, color 0.15s;
}

</style>