<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div>
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold has-text-white has-text-left">{{ textoInterfaz.titulo }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <h2 class="has-text-centered">{{ textoInterfaz.descripcion }}</h2>
          
          <!-- Solo mostrar investigador si tiene el objeto especial -->
          <div v-if="canSeeInvestigator && foundUser" class="box mt-4">
            <p class="has-text-centered"> <strong>{{ textoInterfaz.investigadorEncontrado }}</strong> </p>
            <p class="has-text-centered"> {{ getInvestigatorName(foundUser.invData) }} ({{ getInvestigatorPosition(foundUser.invData) }})  </p>
          </div>

          <!-- Selector de intención con botones simples -->
          <div v-if="showIntentionSelector" class="field mt-4">
            <label class="label has-text-centered">{{ textoInterfaz.seleccionaIntencion }}</label>
            
            <!-- Botones de intención -->
            <div class="columns is-mobile mt-3">
              <div class="column is-4">
                
                <button @click="selectedIntention = 'fight'" class="button is-danger is-fullwidth" 
                :class="{ 'is-outlined': selectedIntention !== 'fight' }" > {{ textoInterfaz.botones.combate }} </button>
              </div>
              
              <div class="column is-4">
                <button @click="selectInteractionDisabled('trade')" class="button is-info is-fullwidth "  
                :class="{ 'is-outlined': selectedIntention !== 'trade' }" >  {{ textoInterfaz.botones.intercambio }} </button>
              </div>
              
              <div class="column is-4">
                <button @click="selectInteractionDisabled('resonance')" class="button is-link is-fullwidth " 
                :class="{ 'is-outlined': selectedIntention !== 'resonance' }" > {{ textoInterfaz.botones.resonancia }} </button>
              </div>
            </div>
            
            <!-- Texto descriptivo simple -->
            <div v-if="selectedIntention" class="notification is-dark mt-3">
              <p class="has-text-centered">
                <span v-if="selectedIntention === 'fight'">{{ textoInterfaz.descripciones.combate }}</span>
                <span v-if="selectedIntention === 'trade'">{{ textoInterfaz.descripciones.intercambio }}</span>
                <span v-if="selectedIntention === 'resonance'">{{ textoInterfaz.descripciones.resonancia }}</span>
              </p>
            </div>
          </div>
          
        </section>

        <footer class="">
          <div class="field has-addons columns is-mobile is-gapless">
            <p class="control column is-half">
              <button @click="declineEncounter" class="button is-danger is-fullwidth">
                <p>{{ textoInterfaz.botones.rechazar }}</p>
              </button>
            </p>

            <p class="control column is-half">
              <button @click="acceptEncounter" class="button is-success is-fullwidth" :disabled="showIntentionSelector && !selectedIntention" >
                <p>{{ textoInterfaz.botones.aceptar }}</p>
              </button>
            </p>
          </div>
        </footer>

      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';
import { invitationService } from '@/services/invitationService.js';

export default {
  name: "InteractionsOnLine",
  props: {
    foundUser: { type: Object, default: null },
    currentZone: {type: Number, default: null  }
  },
  data() {
    return {
      selectedIntention: "",
      canSeeInvestigator: false, // Cambiar a true si tiene el objeto especial
      showIntentionSelector: true, // Mostrar selector de intención
      textoInterfaz: {
        titulo: "",
        descripcion: "",
        investigadorEncontrado: "",
        seleccionaIntencion: "",
        botones: {
          rechazar: "",
          aceptar: "",
          combate: "",
          intercambio: "",
          resonancia: ""
        },
        descripciones: {
          combate: "",
          intercambio: "",
          resonancia: ""
        }
      },
    }
  },

  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje == 'español') {
        this.textoInterfaz.titulo = "Encuentro Misterioso";
        this.textoInterfaz.descripcion = "Ha aparecido un mortal frente a ti que desde dentro hay algo que te susurra 'Entraaaa'. ¿Qué haces?";
        this.textoInterfaz.investigadorEncontrado = "Investigador encontrado:";
        this.textoInterfaz.seleccionaIntencion = "Selecciona tu intención:";
        this.textoInterfaz.botones.rechazar = "No Entrar";
        this.textoInterfaz.botones.aceptar = "Entrar";
        this.textoInterfaz.botones.combate = "Combate";
        this.textoInterfaz.botones.intercambio = "Intercambio";
        this.textoInterfaz.botones.resonancia = "Resonancia";
        this.textoInterfaz.descripciones.combate = "Aprietas los puños y te preparas por lo que pueda pasar.";
        this.textoInterfaz.descripciones.intercambio = "Buscas intercambiar objetos";
        this.textoInterfaz.descripciones.resonancia = "Intentas una conexión mística";
      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.titulo = "Mysterious Encounter";
        this.textoInterfaz.descripcion = "A mortal has appeared before you, and from within something whispers 'Enterrr'. What do you do?";
        this.textoInterfaz.investigadorEncontrado = "Investigator found:";
        this.textoInterfaz.seleccionaIntencion = "Select your intention:";
        this.textoInterfaz.botones.rechazar = "Don't Enter";
        this.textoInterfaz.botones.aceptar = "Enter";
        this.textoInterfaz.botones.combate = "Combat";
        this.textoInterfaz.botones.intercambio = "Trade";
        this.textoInterfaz.botones.resonancia = "Resonance";
        this.textoInterfaz.descripciones.combate = "You clench your fists and prepare for whatever may come!";
        this.textoInterfaz.descripciones.intercambio = "You seek to exchange objects";
        this.textoInterfaz.descripciones.resonancia = "You attempt a mystical connection";
      }
    },

    getInvestigatorName(invData) {
      return this.$store.state.lenguaje === 'español' ? invData.translations?.es?.name || invData.name : invData.name;
    },

    getInvestigatorPosition(invData) {
      return this.$store.state.lenguaje === 'español' ? invData.translations?.es?.position || invData.position : invData.position;
    },

    closeModal() {
      this.$store.state.StoreModalInteractionsOnLine = false;
    },

    selectInteractionDisabled(type){
      if(type === 'trade' ){
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' ? 'intercambio proximamente ...' : 'trade coming soon ...',
          type: 'is-warning',
          duration: 3000
        });
      } else if(type === 'resonance'){
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' ? 'resonancia proximamente ...' : 'resonance coming soon ...',
          type: 'is-warning',
          duration: 3000
        });
      }
    },

    // aqui tiene que cambiar el estado del encuentro a "Rejected"
    declineEncounter() {
      invitationService.resumePollingGeneral();; // volvemos al polling General
      this.closeModal();
      this.$buefy.toast.open({
        message: this.$store.state.lenguaje === 'español' ? 'Has decidido no entrar. El encuentro se desvanece...' : 'You decided not to enter. The encounter fades away...',
        type: 'is-warning',
        duration: 3000
      });
    },

    async acceptEncounter() {
      try {
        const idUserHost = this.$store.state.IDUserHost;
        const idUserGuest = this.foundUser.idUser;
        const invData = this.$store.state.datosPJactual;
        const type = this.selectedIntention; // Usar la intención seleccionada
        const idLocationMap = this.currentZone;

        // console.log('Creando interacción:', { idUserHost, idUserGuest, invData, type, idLocationMap });
        const result = await apiService.createInteraction(idUserHost, idUserGuest, invData, type, idLocationMap);
        
        this.closeModal();
        
        // Mensaje personalizado según la intención
        let successMessage = '';
        if (this.$store.state.lenguaje === 'español') {
          const intentionMessages = {
            fight: '¡Agarras con fuerza tu puños y te preparas por lo que pueda pasar!',
            trade: '¡Iniciando intercambio!',
            resonance: '¡Conexión mística establecida!'
          };
          successMessage = intentionMessages[type] || '¡Encuentro iniciado!';
        } else {
          const intentionMessages = {
            fight: 'You grip your fists tightly and prepare for whatever may come!',
            trade: 'Starting trade!',
            resonance: 'Mystical connection established!'
          };
          successMessage = intentionMessages[type] || 'Encounter started!';
        }
        
        this.$buefy.toast.open({
          message: successMessage,
          type: 'is-success',
          duration: 4000
        });

        // Disparar evento con el resultado
        this.$emit('interaction-created', result);

        // dejamos de buscar encuentros
        invitationService.stopPollingGeneral();        
      } catch (error) {
        console.error('Error creando interacción:', error);
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' ? 'Error al crear el encuentro' : 'Error creating the encounter',
          type: 'is-danger',
          duration: 3000
        });
      }
    }
  },

  mounted() {
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
.BGBendicion {
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}

.cruzeta {
  cursor: pointer;
}
</style>