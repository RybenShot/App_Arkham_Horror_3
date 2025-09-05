<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold has-text-white">{{ textoInterfaz.titulo }}</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <h2 class="has-text-centered">{{ textoInterfaz.descripcion }}</h2>
          
          <!-- Solo mostrar investigador HOST si tiene el objeto especial -->
          <div v-if="canSeeHost && interactionData" class="box mt-4">
            <p class="has-text-centered">
              <strong>{{ textoInterfaz.investigadorHost }}</strong>
            </p>
            <p class="has-text-centered">
              {{ getHostInvestigatorName() }} ({{ getHostInvestigatorPosition() }})
            </p>
            <p class="has-text-centered has-text-weight-semibold">
              <span class="tag" :class="getIntentionClass()">
                {{ getIntentionText() }}
              </span>
            </p>
          </div>

          <!-- Información básica de la invitación -->
          <div class="notification is-dark mt-3">
            <p class="has-text-centered">
              <strong>{{ textoInterfaz.tipoEncuentro }}</strong> {{ getIntentionText() }}
            </p>
            <p class="has-text-centered">
              <strong>{{ textoInterfaz.ubicacion }}</strong> {{ getLocationName() }}
            </p>
          </div>
          
          <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
        </section>

        <footer class="">
          <div class="field has-addons columns is-mobile is-gapless">
            <p class="control column is-half">
              <button @click="respondInvitation('rejected')" class="button is-danger is-fullwidth">
                <p>{{ textoInterfaz.botones.rechazar }}</p>
              </button>
            </p>

            <p class="control column is-half">
              <button @click="respondInvitation('accepted')" class="button is-success is-fullwidth">
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
  name: "GuestResponse",
  props: {
    interactionData: {
      type: Object,
      default: null
    },
    canSeeHost: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      textoInterfaz: {
        titulo: "",
        descripcion: "",
        expansion: "",
        investigadorHost: "",
        tipoEncuentro: "",
        ubicacion: "",
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
        this.textoInterfaz.descripcion = "Desde la oscuridad ves algo moverse y la extraña sensación de que algo te llama. ¿Qué haces?";
        this.textoInterfaz.expansion = "Expansión: Base";
        this.textoInterfaz.investigadorHost = "Investigador que te llama:";
        this.textoInterfaz.tipoEncuentro = "Tipo de encuentro:";
        this.textoInterfaz.ubicacion = "Ubicación:";
        this.textoInterfaz.botones.rechazar = "No Ir";
        this.textoInterfaz.botones.aceptar = "Ir";
      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.titulo = "Mysterious Encounter";
        this.textoInterfaz.descripcion = "From the darkness you see something moving and the strange sensation that something is calling you. What do you do?";
        this.textoInterfaz.expansion = "Expansion: Base";
        this.textoInterfaz.investigadorHost = "Investigator calling you:";
        this.textoInterfaz.tipoEncuentro = "Encounter type:";
        this.textoInterfaz.ubicacion = "Location:";
        this.textoInterfaz.botones.rechazar = "Don't Go";
        this.textoInterfaz.botones.aceptar = "Go";
      }
    },

    getHostInvestigatorName() {
      if (!this.interactionData?.event?.invDataHost?.[0]) return "";
      const invData = this.interactionData.event.invDataHost[0];
      return this.$store.state.lenguaje === 'español' 
        ? invData.translations?.es?.name || invData.name
        : invData.name;
    },

    getHostInvestigatorPosition() {
      if (!this.interactionData?.event?.invDataHost?.[0]) return "";
      const invData = this.interactionData.event.invDataHost[0];
      return this.$store.state.lenguaje === 'español' 
        ? invData.translations?.es?.position || invData.position
        : invData.position;
    },

    getIntentionText() {
      const type = this.interactionData?.event?.type;
      if (this.$store.state.lenguaje === 'español') {
        const intentions = {
          fight: 'Combate',
          trade: 'Intercambio', 
          resonance: 'Resonancia'
        };
        return intentions[type] || type;
      } else {
        const intentions = {
          fight: 'Fight',
          trade: 'Trade',
          resonance: 'Resonance'
        };
        return intentions[type] || type;
      }
    },

    getIntentionClass() {
      const type = this.interactionData?.event?.type;
      const classes = {
        fight: 'is-danger',
        trade: 'is-info',
        resonance: 'is-warning'
      };
      return classes[type] || 'is-light';
    },

    getLocationName() {
      const locationId = this.interactionData?.idLocationMap;
      // Aquí podrías mapear el ID con el nombre real de la ubicación
      // Por ahora devolvemos el ID
      return `Zona ${locationId}`;
    },

    // Funcion para responder a la invitacion
    async respondInteractionToAPI(idInteraction, idUser, response, invData){
      const result = await apiService.respondToInteraction(idInteraction, idUser, response, invData);
      return result;
    },

    closeModal() {
      const textoConfirmacion = this.$store.state.lenguaje === 'español' 
        ? `Se va a rechazar la invitacion ¿estas seguro?`
        : `The invitation will be rejected. Are you sure?`;

      this.$buefy.dialog.confirm({
        title: this.$store.state.lenguaje === 'español' ? 'Confirmar' : 'Confirm',
        message: textoConfirmacion,
        confirmText: this.$store.state.lenguaje === 'español' ? 'Confirmar' : 'Confirm',
        cancelText: this.$store.state.lenguaje === 'español' ? 'Cancelar' : 'Cancel',
        type: 'is-info',
        hasIcon: true,
        onConfirm: async () => {
          const idInteraction = this.interactionData.idInteraccionOnLine;
          const idUser = this.$store.state.IDUserHost;
          const response = "rejected";
          const invData = null;
          this.respondInteractionToAPI(idInteraction, idUser, response, invData)

          this.$store.state.showGuestInvitationModal= false
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' ? `encuentro rechazado` : `encounter rejected`,
            type: 'is-danger',
            duration: 2000
          });

          invitationService.resumePollingGeneral();; // volvemos al polling General
        }
      });
    },

    async respondInvitation(userResponse){
      try {
        const idInteraction = this.interactionData.idInteraccionOnLine;
        const idUser = this.$store.state.IDUserHost;
        const response = userResponse || null;
        const invData = [this.$store.state.datosPJactual];

        console.log('invitacion respondida con:', { idInteraction, idUser, response });
        const result = this.respondInteractionToAPI(idInteraction, idUser, response, invData);

        if (userResponse == 'rejected') {
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' 
              ? 'Has rechazado el encuentro. La presencia se desvanece...' 
              : 'You rejected the encounter. The presence fades away...',
            type: 'is-warning',
            duration: 3000
          });
          this.$emit('response-sent', { action: 'rejected', result });
        } else if  (userResponse == 'accepted') {
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' 
              ? '¡Has aceptado el encuentro! Preparándote para la experiencia...' 
              : 'You accepted the encounter! Preparing for the experience...',
            type: 'is-success',
            duration: 4000
          });
          this.$emit('response-sent', { action: 'accepted', result });
        } else if  (userResponse == 'timeout') {
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' 
              ? 'Se cierra el evcuentro por exceder el tiempo de espera.' 
              : 'Encounter closed due to timeout.',
            type: 'is-success',
            duration: 4000
          });
          //  this.$emit('response-sent', { action: 'accepted', result });
        } else {
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' 
              ? 'Respuesta inesperada.' 
              : 'Unexpected response.',
            type: 'is-success',
            duration: 4000
          });
        }
      } catch (error) {
        console.error('Error al mandar respuesta de la invitación:', error);
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' 
            ? 'Error al mandar respuesta de la invitación' 
            : 'Error sending invitation response',
          type: 'is-danger',
          duration: 3000
        });
      }
    },
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