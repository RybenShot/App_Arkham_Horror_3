<template>
  <div class="BGGeneralAH">
    <!-- notificacion de activar o desactivar -->
    <popUp_Notificaciones/>

    <div v-if="this.$store.state.modalInvOnLine"><ModalInvOnLine/></div>

    <div>
      <!-- Seleccionar Investigador -->
      <div class="columns is-mobile mb-0 pt-3 centrarHero" >
        <div class="column is-3 p-0" style="text-align: center;" @click="goBack"> <i class="fa-2x fas fa-arrow-left has-text-white"></i> </div>
        <div class="column " style="margin: 0 auto;"> <p class="has-text-centered title has-text-white">{{ textoInterfaz.titulo }}</p> </div>
        <div class="column is-3 p-0" style="text-align: center;"> <router-link class="" to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link> </div>
      </div>

      <!-- selectores de expansion o arquetipo -->
      <section data-tour="expansion-tabs">
        <b-tabs size="is-small" type="is-boxed" position="is-centered" v-model="activeTab">
            <b-tab-item>
              <template #header>
                  <i class="fa-1x fas fa-box pr-2"></i>
                  <span> {{ textoInterfaz.botones.expansion }} </span>
              </template>

              <!-- Botones de expansión -->
              <div class="exp-grid" data-tour="expansion-buttons">
                <button v-for="btn in expansionButtons" class="button exp-btn" :key="btn.key"
                  :class="[btn.buttonClass, { 'is-outlined': !$store.state[btn.key] }]"
                  @click="handleToggle(btn.key)">
                  {{ btn.text }}
                </button>
              </div>
              <button class="join-btn" data-tour="inv-online-btn" @click="this.$store.state.modalInvOnLine = true">
                <img class="gifIMG" src="@/assets/img/GIFs/wired-outline-726-wireless-connection-loop-wave.gif" alt="">
                On-Line
                <img class="gifIMG" src="@/assets/img/GIFs/wired-outline-726-wireless-connection-loop-wave.gif" alt="">
              </button>

            </b-tab-item>

            <b-tab-item>
              <template #header>
                  <i class="fa-1x fas fa-user-tag pr-2"></i>
                  <span> {{ textoInterfaz.botones.archetype }} </span>
              </template>

              <!-- Botones de arquetipos -->
              <div class="exp-grid">
                <button v-for="btn in rolButtons" class="button exp-btn"
                  :key="btn.key"
                  :class="[btn.buttonClass, { 'is-outlined': !$store.state[btn.key] }]"
                  @click="changeForRol(btn.key)">
                  {{ btn.text }}
                </button>
              </div>
            </b-tab-item>

        </b-tabs>
      </section> <!-- END selectores -->
    </div>
    <br>

    <div class="PersonajesList" data-tour="inv-grid">
      <InvestigatorCard v-for="investigator in invList" :key="investigator.id" :investigator="investigator" />
    </div>

<!-- EXPANSIONES // PERSONAJES -->

    <div v-if="checkExpansions()" class="empty-state">
      <p class="empty-title">{{textoInterfaz.sinExpansion}}</p>
      <p class="empty-sub">{{ textoInterfaz.seleccionaExpansion }}</p>

      <button
        class="random-btn"
        :class="{ spinning: randomizing }"
        :disabled="randomizing"
        @click="selectRandomInvestigator"
      >
        <i class="fas fa-dice-d20 random-icon"></i>
        <span>{{ textoInterfaz.botonAleatorio }}</span>
      </button>
    </div>

    <br>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';
import { audioService_effects } from '@/services/GestionAudio/audioService_effects.js';
import { continueTourIfNeeded, notifyInvListLoaded } from '@/services/tourService.js';

import popUp_Notificaciones from '@/components/helpers/popUp/notificaciones.vue';
import InvestigatorCard from '@/components/personajes/invCard.vue'
import ModalInvOnLine from '@/components/personajes/modalInvOnLine.vue';

export default {
  name: "listaDePersonajes",
  components:{
    popUp_Notificaciones,
    InvestigatorCard,
    ModalInvOnLine
  },

  data() {
    return {
      // guarda la lista completa - no se muestra
      invListAll:[],
      // guarda la lista filtrada - si se muestra
      invList: [],

      textoInterfaz:{
        titulo: "",
        subtitulo: "",
        descripcion: "",
        sinExpansion: "",
        seleccionaExpansion: "",
        botonAleatorio: "",
        botones: {
          expansion: '',
          archetype: '',

          base: "",
          mareas: "",
          noche: "",
          secretos: "",
          original:"",
          comunity: "",

          survivor: "",
          mystic: "",
          rogue: "",
          guardian: "",
          seeker: "",
          neutral: "",
        },
      },

      activeTab: 0,
      randomizing: false,

    }; // end return
  }, // end data

  computed: {
    expansionButtons() {
      return [
        { key: 'stateExpansionBase',     text: this.textoInterfaz.botones.base,     buttonClass: 'is-success', colorClass: 'c-green'  },
        { key: 'stateExpansionWaves',    text: this.textoInterfaz.botones.mareas,   buttonClass: 'is-info',    colorClass: 'c-blue'   },
        { key: 'stateExpansionNigth',    text: this.textoInterfaz.botones.noche,    buttonClass: 'is-warning', colorClass: 'c-yellow' },
        { key: 'stateExpansionSecrets',  text: this.textoInterfaz.botones.secretos, buttonClass: 'is-danger',  colorClass: 'c-red'    },
        { key: 'stateExpansionOriginal', text: this.textoInterfaz.botones.original, buttonClass: 'is-link',    colorClass: 'c-purple' },
        { key: 'stateExpansionComunity', text: this.textoInterfaz.botones.comunity, buttonClass: 'is-orange',  colorClass: 'c-orange' },
      ];
    },
    rolButtons(){
      return [
        { key: 'survivor', text: this.textoInterfaz.botones.survivor, buttonClass: 'is-success', colorClass: 'c-green'  },
        { key: 'mystic',   text: this.textoInterfaz.botones.mystic,   buttonClass: 'is-info',    colorClass: 'c-blue'   },
        { key: 'rogue',    text: this.textoInterfaz.botones.rogue,    buttonClass: 'is-warning',  colorClass: 'c-yellow' },
        { key: 'guardian', text: this.textoInterfaz.botones.guardian, buttonClass: 'is-danger',  colorClass: 'c-red'    },
        { key: 'seeker',   text: this.textoInterfaz.botones.seeker,   buttonClass: 'is-link',    colorClass: 'c-purple' },
        { key: 'neutral',  text: this.textoInterfaz.botones.neutral,  buttonClass: 'is-orange',  colorClass: 'c-orange' },
      ];
    }
  },

  methods: {
    goBack() { this.$router.go(-1); },
    SonidoTecla() { audioService_effects.playTecla() },

    async selectRandomInvestigator() {
      if (this.invListAll.length === 0) return
      this.randomizing = true
      this.SonidoTecla()
      // Pequeña pausa para que la animación sea visible
      await new Promise(r => setTimeout(r, 900))
      const pick = this.invListAll[Math.floor(Math.random() * this.invListAll.length)]
      try {
        const response = await apiService.obtainInvByID(pick.idInv)
        await this.$store.commit('setDatosInvestigator', response)
        this.$router.push('/DetallePersonaje')
      } catch (e) {
        console.error('Error al cargar investigador aleatorio:', e)
        this.randomizing = false
      }
    },

    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Seleccionar Investigador";
        this.textoInterfaz.subtitulo = "Colecciones";
        this.textoInterfaz.descripcion = "Haz click para añadir o quitar la expansión que quieras y luego elige un investigador para verlo en detalle.";
        this.textoInterfaz.sinExpansion = "Sin expansiones seleccionadas";
        this.textoInterfaz.seleccionaExpansion = "Por favor selecciona alguna expansion para ver los personajes.";
        this.textoInterfaz.botonAleatorio = "Investigador Aleatorio";

        this.textoInterfaz.botones.expansion = "Expansiones";
        this.textoInterfaz.botones.archetype = "Arquetipos";

        this.textoInterfaz.botones.base = "Base";
        this.textoInterfaz.botones.mareas = "Mareas";
        this.textoInterfaz.botones.noche = "Noche";
        this.textoInterfaz.botones.secretos = "Secretos";
        this.textoInterfaz.botones.original = "Original";
        this.textoInterfaz.botones.comunity = "Comunidad";
        this.textoInterfaz.botones.survivor = "Superviviente";
        this.textoInterfaz.botones.mystic = "Místico";
        this.textoInterfaz.botones.rogue = "Experto";
        this.textoInterfaz.botones.guardian = "Defensor";
        this.textoInterfaz.botones.seeker = "Buscador";
        this.textoInterfaz.botones.neutral = "Neutral";

      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "Select Investigator";
        this.textoInterfaz.subtitulo = "Collections";
        this.textoInterfaz.descripcion = "Click to add or remove the expansion you want and then choose a investigator to view it in detail.";
        this.textoInterfaz.sinExpansion = "No expansions selected";
        this.textoInterfaz.seleccionaExpansion = "Please select an expansion to view the characters.";
        this.textoInterfaz.botonAleatorio = "Random Investigator";

        this.textoInterfaz.botones.expansion = "Expansions";
        this.textoInterfaz.botones.archetype = "Archetypes";

        this.textoInterfaz.botones.base = "Base";
        this.textoInterfaz.botones.mareas = "Waves";
        this.textoInterfaz.botones.noche = "Nigth";
        this.textoInterfaz.botones.secretos = "Secrets";
        this.textoInterfaz.botones.original = "Original";
        this.textoInterfaz.botones.comunity = "Comunity";
        this.textoInterfaz.botones.survivor = "Survivor";
        this.textoInterfaz.botones.mystic = "Mystic";
        this.textoInterfaz.botones.rogue = "Rogue";
        this.textoInterfaz.botones.guardian = "Guardian";
        this.textoInterfaz.botones.seeker = "Seeker";
        this.textoInterfaz.botones.neutral = "Neutral";
      }
    },
    async changeForRol(rolKey) {
      try {
        // ejecutamos el sonido de las teclas
        this.SonidoTecla();
        //limpiamos la lista de investigadores
        this.invList = [];
        // llamamos a back con la expansion seleccionada
        const investigators = await apiService.obtainPreviewInvForRol(rolKey)
        // guardamos el resultado en la lista
        this.invList = investigators;
        } catch (error) {
        console.log("Error al cargar los investigadores por el rol:", error);
      }
    },
    handleToggle(expansionKey) {
      // ejecutamos el sonido de las teclas
      this.SonidoTecla();
      // guardamos el mensaje que meteremos en el store segun si la expansion ya esta activa o no
      const activada = this.$store.state[expansionKey]
      //cambiamos el estado de la variable de la expansion
      this.$store.commit('toggleExpansion', { key: expansionKey, value: !activada });

      if (!activada) {
        this.$buefy.toast.open({ message: 'Expansión activada', type: 'is-success', duration: 2000 });
      } else{
        this.$buefy.toast.open({ message: 'Expansión desactivada', type: 'is-danger', duration: 2000 });
      }

      // refrescamos la lista de investigadores
      this.updateInvListForExpansion();
    },
    // Filtra invListAll según el estado de las expansiones activadas
    updateInvListForExpansion(){
      this.invList = this.invListAll.filter((inv) => {
        if (inv.expansion == "AHBase" && this.$store.state.stateExpansionBase) return true
        if (inv.expansion == "AHWaves" && this.$store.state.stateExpansionWaves) return true
        if (inv.expansion == "AHNigth" && this.$store.state.stateExpansionNigth) return true
        if (inv.expansion == "AHSecrets" && this.$store.state.stateExpansionSecrets) return true

        if (inv.expansion == "AHOriginal" && this.$store.state.stateExpansionOriginal) return true
        if (inv.expansion == "AHComunity" && this.$store.state.stateExpansionComunity) return true
        return false
      })
    },
    // llama a back para obtener la lista completa de los investigadores
    async getPreviewInvestigatorsList(){
      try {
        // obtenemos la lista completa de todos los preview de los investigadores
        const investigators = await apiService.obtainPreviewInv()
        // guaramos lo recivido en un array
        this.invListAll = investigators;
        if (investigators.length > 0) notifyInvListLoaded(investigators[0].idInv);
        this.updateInvListForExpansion();
      } catch (error) {
        console.error("Error al cargar los investigadores por expansion:", error);
      }
    },
    //funcion para comprobar el estado de las expansiones y enseñar mensaje o no
    checkExpansions(){
      let result = true
      if (this.$store.state.stateExpansionBase) result = false
      else if (this.$store.state.stateExpansionWaves) result = false
      else if (this.$store.state.stateExpansionNigth) result = false
      else if (this.$store.state.stateExpansionSecrets) result = false
      else if (this.$store.state.stateExpansionOriginal) result = false
      else if (this.$store.state.stateExpansionComunity) result = false

      return result
    }
  }, // end methods
  mounted(){
    this.rellenarTextoSegunIdioma();
    this.getPreviewInvestigatorsList();
    continueTourIfNeeded('/ListaPersonajes');
  },
};
</script>


<style scoped>

/* Helpers */
.centrarHero{
  display: flex;
  justify-content: center;
  align-items: center
}
.is-orange{
  background-color: hsl(17, 100%, 66%) !important;
  border-color: transparent;
  color: white !important;
}
.is-orange.is-outlined{
  background-color: transparent !important;
  border-color: hsl(17, 100%, 66%) !important;
  color: hsl(17, 100%, 66%) !important;
}

.BGGeneralAH {
  background-image: url(@/assets/img/ZZOtros/BGAH.jpg)!important;
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}

/* Lista de Personajes */
.PersonajesList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 6px;
  row-gap: 10px;
  padding: 0 8px;
}

/* Grid 3×2 para botones de expansión/arquetipo */
.exp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  padding: 8px 10px 4px;
}

.exp-btn {
  font-size: 0.75rem !important;
  padding: 0.3rem 0.2rem !important;
  height: 2rem !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Boton Online */
.join-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 65%;
  margin: 6px auto 2px;
  padding: 0.35rem 0.8rem;
  background-color: #28a745;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%   { transform: scale(1);    }
  50%  { transform: scale(1.04); }
  100% { transform: scale(1);    }
}

.gifIMG {
  width: 22px;
}

/* ─── Estado vacío + botón aleatorio ─────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem;
  text-align: center;
  gap: 0.6rem;
}

.empty-title {
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
}

.empty-sub {
  color: rgba(255,255,255,0.7);
  font-size: 0.85rem;
  margin-bottom: 0.8rem;
}

.random-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  background: rgba(5, 0, 20, 0.8);
  border: 1px solid rgba(160, 80, 255, 0.6);
  border-radius: 30px;
  color: #d9c8f0;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(130, 50, 220, 0.35), inset 0 0 10px rgba(100, 30, 200, 0.1);
  transition: all 0.2s;
  animation: random-idle 3s ease-in-out infinite;
}

.random-btn:hover:not(:disabled) {
  border-color: rgba(200, 120, 255, 0.9);
  box-shadow: 0 0 20px rgba(160, 80, 255, 0.6), inset 0 0 14px rgba(120, 40, 220, 0.2);
  color: #f0e0ff;
}

.random-btn:disabled {
  cursor: default;
  animation: none;
}

.random-icon {
  font-size: 1.1rem;
  color: #b080ff;
}

/* Pulso suave en reposo */
@keyframes random-idle {
  0%, 100% { box-shadow: 0 0 10px rgba(130,50,220,0.3), inset 0 0 8px rgba(100,30,200,0.08); }
  50%       { box-shadow: 0 0 20px rgba(160,80,255,0.55), inset 0 0 14px rgba(120,40,220,0.15); }
}

/* Animación al hacer click: dado girando */
.random-btn.spinning .random-icon {
  animation: dice-spin 0.9s ease-in-out infinite;
}

@keyframes dice-spin {
  0%   { transform: rotate(0deg)   scale(1);    }
  25%  { transform: rotate(180deg) scale(1.3);  }
  50%  { transform: rotate(360deg) scale(1);    }
  75%  { transform: rotate(540deg) scale(1.3);  }
  100% { transform: rotate(720deg) scale(1);    }
}
</style>
