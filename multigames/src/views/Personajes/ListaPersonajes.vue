<template>
  <div class="BGGeneralAH">
    <!-- notificacion de activar o desactivar -->
    <popUp_Notificaciones/>

    <div>
      <!-- Seleccionar Investigador -->
      <div class="columns is-mobile mb-0 pt-3 centrarHero" >
        <div class="column is-3 p-0" style="text-align: center;" @click="goBack"> <i class="fa-2x fas fa-arrow-left has-text-white"></i> </div>
        <div class="column " style="margin: 0 auto;"> <p class="has-text-centered title has-text-white">{{ textoInterfaz.titulo }}</p> </div>
        <div class="column is-3 p-0" style="text-align: center;"> <router-link class="" to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link> </div>
      </div>

      <!-- selectores de expansion o arquetipo -->
      <section>
        <b-tabs size="is-medium" type="is-boxed" position="is-centered" v-model="activeTab">
            <b-tab-item>
              <template #header>
                  <i class="fa-1x fas fa-box pr-2"></i>
                  <span> Expansiones </span>
              </template>

              <!-- Botones de expansión -->
              <div class="columns is-mobile pt-3 mx-1 buttons pl-4 pr-2">
                <button v-for="btn in expansionButtons" class="button"
                  :key="btn.key"
                  :class="[btn.buttonClass, { 'is-outlined': !$store.state[btn.key] }]"
                  @click="handleToggle(btn.key)">
                  {{ btn.text }}
                </button>
              </div>

            </b-tab-item>

            <b-tab-item>
              <template #header>
                  <i class="fa-1x fas fa-user-tag pr-2"></i>
                  <span> Arquetipos </span>
              </template>

              <div class="columns is-mobile pt-3 mx-1 buttons pl-4 pr-2">
                <button v-for="btn in rolButtons" class="button"
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

    <div class="PersonajesList ">
      <InvestigatorCard v-for="investigator in invList" :key="investigator.id" :investigator="investigator" />
    </div>

<!-- EXPANSIONES // PERSONAJES -->

    <div v-if="checkExpansions()">
      <section class="hero is-halfheigh is-danger">
        <div class="hero-body">
          <p class="title has-text-centered">{{textoInterfaz.sinExpansion}}</p>
          <p class="subtitle has-text-centered">{{ textoInterfaz.seleccionaExpansion }}</p>
        </div>
      </section>
    </div>

    <br>
  </div>
</template>

<script>
import { Howl } from 'howler';
import { apiService } from '@/services/api.js';
import popUp_Notificaciones from '@/components/helpers/popUp/notificaciones.vue';
import InvestigatorCard from '@/components/personajes/invCard.vue'

const sonidoTecla = new Howl({
  src: require('@/assets/sound/SonidoTecla.mp3'),
});

export default {
  name: "listaDePersonajes",
  components:{
    popUp_Notificaciones,
    InvestigatorCard
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
        botones: {
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

    }; // end return
  }, // end data

  computed: {
    expansionButtons() {
      return [
        { key: 'stateExpansionBase', text: this.textoInterfaz.botones.base, buttonClass: 'is-success' },
        { key: 'stateExpansionWaves', text: this.textoInterfaz.botones.mareas, buttonClass: 'is-info' },
        { key: 'stateExpansionNigth', text: this.textoInterfaz.botones.noche, buttonClass: 'is-warning' },
        { key: 'stateExpansionSecrets', text: this.textoInterfaz.botones.secretos, buttonClass: 'is-danger' },
        { key: 'stateExpansionOriginal', text: this.textoInterfaz.botones.original, buttonClass: 'is-link' },
        { key: 'stateExpansionComunity', text: this.textoInterfaz.botones.comunity, buttonClass: 'is-orange' },
      ];
    },
    rolButtons(){
      return [
        { key: 'survivor', text: this.textoInterfaz.botones.survivor, buttonClass: 'is-success' },
        { key: 'mystic', text: this.textoInterfaz.botones.mystic, buttonClass: 'is-info' },
        { key: 'rogue', text: this.textoInterfaz.botones.rogue, buttonClass: 'is-warning' },
        { key: 'guardian', text: this.textoInterfaz.botones.guardian, buttonClass: 'is-danger' },
        { key: 'seeker', text: this.textoInterfaz.botones.seeker, buttonClass: 'is-link' },
        { key: 'neutral', text: this.textoInterfaz.botones.neutral, buttonClass: 'is-orange' },
      ];
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    SonidoTecla() {
      sonidoTecla.play();
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Seleccionar Investigador";
        this.textoInterfaz.subtitulo = "Colecciones";
        this.textoInterfaz.descripcion = "Haz click para añadir o quitar la expansión que quieras y luego elige un investigador para verlo en detalle.";
        this.textoInterfaz.sinExpansion = "Sin expansiones seleccionadas";
        this.textoInterfaz.seleccionaExpansion = "Por favor selecciona alguna expansion para ver los personajes.";

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
        this.textoInterfaz.seleccionaExpansion = "Please select an expansion to view the characters."

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
      const message = this.$store.state[expansionKey]? "expansion desactivada": "expansion activada";
      //cambiamos el estado de la variable de la expansion
      this.$store.commit('toggleExpansion', { key: expansionKey, value: !this.$store.state[expansionKey] });
      //mandamos a enseñar el mensaje activado desactivado
      this.$store.dispatch('ejecutarFlashPopUp_Action', message);
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
    updateInvListForRol(){
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
        // guaramos lo resivido en un array
        this.invListAll = investigators;
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
  },
};
</script>


<style scoped>

/* Helers */
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

/* Usado */
.BGGeneralAH {
  background-image: url(@/assets/img/ZZOtros/BGAH.jpg)!important;
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}

/* Lista de Personajes */
.PersonajesList {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 10px;
  row-gap: 10px;
  justify-items: center;
}

</style>