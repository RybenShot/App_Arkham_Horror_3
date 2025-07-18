<template>
  <div >
    <div id="ventana-ajustes">
      <p class="title has-text-centered has-text-white">{{ textoInterfaz.titulo }}</p>

      <div class="columns is-mobile">
        <div class="column has-text-right ">
          <p class="title is-6 has-text-white mb-3 pt-2">{{ textoInterfaz.musicaAmb }}</p>
          <p class="title is-6 has-text-white">{{ textoInterfaz.efectoInmersion }}</p>
        </div>
        <div class="column has-text-left">
          <div class="buttons has-addons m-0">
            <button :class="{'is-outlined': $store.state.PistasAudio.EfectoInmersion == false }" @click="$store.state.PistasAudio.EfectoInmersion = true" class="button is-success is-small is-selected">ON</button>
            <button :class="{'is-outlined': $store.state.PistasAudio.EfectoInmersion == true }" @click="$store.state.PistasAudio.EfectoInmersion = false" class="button is-danger is-small">OFF</button>
          </div>
          <div class="buttons has-addons">
            <button :class="{'is-outlined': $store.state.PistasAudio.MusicaHambiental == false }" @click="$store.state.PistasAudio.MusicaHambiental = true" class="button is-success is-small is-selected">ON</button>
            <button :class="{'is-outlined': $store.state.PistasAudio.MusicaHambiental == true }" @click="$store.state.PistasAudio.MusicaHambiental = false" class="button is-danger is-small">OFF</button>
          </div>
        </div>
      </div>

      <!-- id de Mapa onLine -->
      <div v-if="this.$store.state.datosMapa.id">
        <p class="subtitle has-text-white mb-0">{{ textoInterfaz.mapCode }}</p>
        <b-field >
          <b-input placeholder="1234-1234-1234"
              type="search"
              icon="magnify"
              v-model="codeIDMapInPlay">
          </b-input>
          <p class="control">
              <b-button type="is-primary" label="Copiar" @click="copyCode()" />
          </p>
        </b-field>
      </div>

      <!-- boton para guardar perdonaje OnLine -->
       <div>
        <button @click="safeinvOnLine()" class="button is-fullwidth  is-warning">
          <i class="fas fa-power-off mx-3"></i>{{ textoInterfaz.botones.safeInv || "guardar investigador" }}
        </button>
       </div>

    </div>
    

    <footer>
      <button @click="($store.state.ModalConfirmacion = true), ($store.state.Terminarpartida = false)" class="button is-fullwidth is-dark mb-2">
        <i class="fas fa-users mx-3"></i>{{ textoInterfaz.botones.seleccionPersonaje }}
      </button>
      <button @click="($store.state.ModalConfirmacion = true), ($store.state.Terminarpartida = true)" class="button is-fullwidth  is-black">
        <i class="fas fa-power-off mx-3"></i>{{ textoInterfaz.botones.terminarPartida }}
      </button>
    </footer>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';

export default {
  name: "AjustesPlay",
  data(){
    return{
      textoInterfaz:{
        titulo: "",
        musicaAmb:"",
        efectoInmersion: "",
        mapCode: "",
        botones: {
          seleccionPersonaje: "",
          terminarPartida: ""
        }
      },
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Ajustes";
        this.textoInterfaz.musicaAmb = "Musica Ambiental";
        this.textoInterfaz.efectoInmersion = "Efecto Inmersión";
        this.textoInterfaz.mapCode = "Codigo de mapa:";
        this.textoInterfaz.botones.seleccionPersonaje = "Volver a selección de personaje";
        this.textoInterfaz.botones.terminarPartida = "Terminar partida";

      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "Settings";
        this.textoInterfaz.musicaAmb = "Background Music";
        this.textoInterfaz.efectoInmersion = "Immersion Effect";
        this.textoInterfaz.mapCode = "Map code:";
        this.textoInterfaz.botones.seleccionPersonaje = "Back to character selection";
        this.textoInterfaz.botones.terminarPartida = "End game";
      }
    },
    // Método para copiar el código del mapa al portapapeles
    async copyCode() {
      try {
        await navigator.clipboard.writeText(this.$store.state.datosMapa.id);
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === "español" ? "Código copiado 😊" : "Code copied 😊",
          type: 'is-success',
          duration: 2000,
        });
      } catch (err) {
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === "español" ? "Error al copiar 😢" : "Copy failed 😢",
          type: 'is-danger',
          duration: 2000,
        });
      }
    },

    // Método para preparar los datos del investigador con los campos adicionales
      prepareInvestigatorData() {
        // Obtener los datos del investigador actual del store
        const investigatorData = { ...this.$store.state.datosPJactual };
        
        // Añadir idUser si no existe
        if (!investigatorData.idUser) {
          investigatorData.idUser = this.$store.state.IDUserHost;
        }
        
        // Añadir idMapOnLine si no existe, ahoramismo no usamos este dato, pero lo usaremos para enlazar invOnLine con mapaOnLine
        if (!investigatorData.idMapOnLine) {
          investigatorData.idMapOnLine = this.$store.state.datosMapa.id;
        }
        // la idOnLine, si no está, se crea en back y si está, se manda para que back la actualice
        // si el lastUpdate no esta, igual que arriba, se crea en back
        
        return investigatorData;
      },

    // metodo para guardar el investigador
    safeinvOnLine(){
      // 1- vemos si el usuario esta logeado: sino le mandamos mensajito de loguearse
      if (!this.$store.state.IDUserHost) {
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === "español" ? 
            "Debes estar logueado para guardar tu investigador" : 
            "You must be logged in to save your investigator",
          type: 'is-warning',
          duration: 3000,
        });
        return;
      }

      // Preparar los datos del investigador antes de enviar
      const investigatorData = this.prepareInvestigatorData();

      try {
        // mandamos a guardar a back, el ya se encargará de mirar si la memoria del usuario esta llena o si el investigador ya esta creado
        this.guardarInvestigador(investigatorData);
      } catch (error) {
        console.error("error al guardar el investigador:", error)
      }
    },

    // Método principal para guardar el investigador
    async guardarInvestigador(investigatorData) {
      try {
        
        console.error("se van a guardar estos datos a backend: ", investigatorData)
        const response = await apiService.postInvOnLine(investigatorData);
        console.log("Respuesta del servidor al guardar investigador:", response);
        
        if (response.message) {
          
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === "español" ? 
              "Investigador guardado correctamente 😊" : 
              "Investigator saved successfully 😊",
            type: 'is-success',
            duration: 3000,
          });
        } else {
          throw new Error('Error en la respuesta del servidor');
        }
      } catch (error) {
        console.error('Error al guardar investigador:', error);
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === "español" ? 
            "Error al guardar el investigador 😢, limite de 5 investigadores excedido" : 
            "Error saving investigator 😢",
          type: 'is-danger',
          duration: 3000,
        });
      }
    }
  },

  computed: {
    codeIDMapInPlay(){
      return this.$store.state.datosMapa.id
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
  //TODO : Añadir metodos para cambiar el estado de la musica y efectos
}
</script>

<style scoped>
#ventana-ajustes{
  height: 40vh;
}
</style>