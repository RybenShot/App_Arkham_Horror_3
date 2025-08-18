<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div>
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold has-text-white">{{ textoInterfaz.titulo }}</p>
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
                :class="{ 'is-outlined': selectedIntention !== 'fight' }" > Combate </button>
              </div>
              
              <div class="column is-4">
                <button @click="selectedIntention = 'trade'" class="button is-info is-fullwidth" 
                :class="{ 'is-outlined': selectedIntention !== 'trade' }" >  Intercambio </button>
              </div>
              
              <div class="column is-4">
                <button @click="selectedIntention = 'resonance'" class="button is-warning is-fullwidth" 
                :class="{ 'is-outlined': selectedIntention !== 'resonance' }" > Resonancia </button>
              </div>
            </div>
            
            <!-- Texto descriptivo simple -->
            <div v-if="selectedIntention" class="notification is-dark mt-3">
              <p class="has-text-centered">
                <span v-if="selectedIntention === 'fight'">Te preparas para el combate</span>
                <span v-if="selectedIntention === 'trade'">Buscas intercambiar objetos</span>
                <span v-if="selectedIntention === 'resonance'">Intentas una conexión mística</span>
              </p>
            </div>
          </div>
          
          <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
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
        expansion: "",
        investigadorEncontrado: "",
        seleccionaIntencion: "",
        botones: {
          rechazar: "",
          aceptar: ""
        },
      },
    }
  },

  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje == 'español') {
        this.textoInterfaz.titulo = "Encuentro Misterioso";
        this.textoInterfaz.descripcion = "Ha aparecido un mortal frente a ti que desde dentro hay algo que te susurra 'Entraaaa'. ¿Qué haces?";
        this.textoInterfaz.expansion = "Expansión: Base";
        this.textoInterfaz.investigadorEncontrado = "Investigador encontrado:";
        this.textoInterfaz.seleccionaIntencion = "Selecciona tu intención:";
        this.textoInterfaz.botones.rechazar = "No Entrar";
        this.textoInterfaz.botones.aceptar = "Entrar";
      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.titulo = "Mysterious Encounter";
        this.textoInterfaz.descripcion = "A mortal has appeared before you, and from within something whispers 'Enterrr'. What do you do?";
        this.textoInterfaz.expansion = "Expansion: Base";
        this.textoInterfaz.investigadorEncontrado = "Investigator found:";
        this.textoInterfaz.seleccionaIntencion = "Select your intention:";
        this.textoInterfaz.botones.rechazar = "Don't Enter";
        this.textoInterfaz.botones.aceptar = "Enter";
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

    // aqui tiene que cambiar el estado del encuentro a "Rejected"
    declineEncounter() {
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
        const invData = [this.$store.state.datosPJactual];
        const type = this.selectedIntention; // Usar la intención seleccionada
        const idLocationMap = this.currentZone;

        console.log('Creando interacción:', { idUserHost, idUserGuest, invData, type, idLocationMap });
        const result = await apiService.createInteraction(idUserHost, idUserGuest, invData, type, idLocationMap);
        
        this.closeModal();
        
        // Mensaje personalizado según la intención
        let successMessage = '';
        if (this.$store.state.lenguaje === 'español') {
          const intentionMessages = {
            fight: '¡Te preparas para el combate!',
            trade: '¡Iniciando intercambio!',
            resonance: '¡Conexión mística establecida!'
          };
          successMessage = intentionMessages[type] || '¡Encuentro iniciado!';
        } else {
          const intentionMessages = {
            fight: 'Preparing for combat!',
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