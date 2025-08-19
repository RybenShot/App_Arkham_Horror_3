<template>
  <div class="p-2 BGGeneralPlay">
     <!-- recordatorio sobre Bendicion y maldicion -->
     <div v-if="$store.state.ModalPopUp_Notificaciones"><PopUpNotificaciones/></div>
     <!-- Modal para ver el detalle de un objeto al ser clicado -->
     <div v-if="this.$store.state.verDetallePertenencia == true"><ModalVerDetallePertenencia/></div>

    <!-- Confirmacion al intentar salir de terminar partida -->
    <div v-if="$store.state.ModalConfirmacion"><ModalConfirmacion/></div>
    <!-- Modals de los estados para verlos -->
    <div><ModalsEstadosPlay/></div>

    <!-- Modal para responder invitación (GUEST) -->
    <div v-if="$store.state.showGuestInvitationModal">
      <modalGuestResponse :pendingInvitation="$store.state.pendingInvitation" :canSeeHost="canSeeHostInvestigator"
        @response-sent="onGlobalResponseSent" />
    </div>
    <!-- Modal cuando HOST es rechazado -->
    <div v-if="showHostRejectedModal">
      <hostRejectedModal @modal-closed="onHostRejectedCloseModal" />
    </div>
    <!-- Modal cuando HOST es aceptado -->
    <div v-if="showHostAcceptedModal">
      <hostAcceptedModal :interactionData="hostInteractionData" @modal-closed="onHostAcceptedCloseModal" />
    </div>

    <!-- Navegacion -->
    <b-tabs position="is-centered" class="block mb-0">
        <b-tab-item label="Player">
          <viewPlayer/>
        </b-tab-item>
        <b-tab-item label="Map">
          <!-- No mapa OnLine -->
          <div v-if="!this.$store.state.datosMapa.id" class="has-text-centered">
            <p class="title has-text-white pt-6">{{ textoInterfaz.textNoLogin }}</p>
            <router-link to="/"> {{ textoInterfaz.goHome }} </router-link>
          </div>
          <!-- Si es un mapa OnLine -->
          <div v-else><viewMap/></div>
        </b-tab-item>
    </b-tabs>

    
  </div>
</template>

<script>
import viewPlayer from "@/views/inPlay/viewPlayer.vue";
import viewMap from "@/views/inPlay/viewMap.vue";

import PopUpNotificaciones from "@/components/helpers/popUp/notificaciones.vue";
import ModalVerDetallePertenencia  from "@/components/personajes/ModalsDetallePersonaje/ModalVerDetallePertenencia.vue";

import ModalConfirmacion from "@/components/inPlay/ModalConfirmacion.vue";
import ModalsEstadosPlay from "@/components/inPlay/ModalsEstadosPlay.vue";

import modalGuestResponse from "@/components/inPlay/modals/guestResponse.vue";
import hostRejectedModal from "@/components/inPlay/modals/hostRejectedModal.vue";
import hostAcceptedModal from "@/components/inPlay/modals/hostAcceptedModal.vue";

import { invitationService } from '@/services/invitationService.js';
import { hostPollingService } from '@/services/hostPollingService.js';
import { apiService } from '@/services/api.js';


export default {
  name: "Play",
  components:{
    viewPlayer,
    viewMap,

    PopUpNotificaciones,
    ModalVerDetallePertenencia,

    ModalConfirmacion,
    ModalsEstadosPlay,

    modalGuestResponse,
    hostRejectedModal,
    hostAcceptedModal 
  },
  data(){
    return{
      canSeeHostInvestigator: false,
      showHostRejectedModal: false,
      showHostAcceptedModal: false,
      hostInteractionData: null, // variable donde se guardará todos los datos de la interaccion al aceptar

      textoInterfaz: {
        textNoLogin: '',
        goHome: '',
      }
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.textNoLogin = "Para poder usar esta parte debes iniciar sesion y crear un mapa.";
        this.textoInterfaz.goHome = "Ir a Home";
      } else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.textNoLogin = "To use this section, you must log in and create a map.";
        this.textoInterfaz.goHome = "Go Home";
      }
    },
    async serchInitialObjectsInv(){
      try {
        let idInv = this.$store.state.datosPJactual.idInv;
        const { objects = [], optionalObjects = [] } = await apiService.obtainPertenencesInv(idInv);

        // 1) Limpiar el array global de objetos en juego
        this.$store.commit('clearResponseObjectsInPlay');

        // 2) Añadir cada objeto "obligatorio"
        objects.forEach(obj => { this.$store.commit('addResponseObjectInPlay', obj) });

        // 3) Añadir cada objeto "opcional"
        optionalObjects.forEach(obj => { this.$store.commit('addResponseObjectInPlay', obj) });
        
      } catch (error) {
        console.error("Error al cargar los objetos principales del investigador", error);
      }
    },

    // Callbacks para el polling del HOST
    onHostInteractionAccepted(interactionData) {
      console.log('🎉 HOST: Interacción aceptada!', interactionData);
      this.hostInteractionData = interactionData;
      this.showHostAcceptedModal = true;
    },
    onHostInteractionRejected(interactionData) {
      console.log('😔 HOST: Interacción rechazada', interactionData);
      this.showHostRejectedModal = true;
    },
    // Añadir información del contador en el toast
    onHostInteractionPending(interactionData, attemptCount, maxAttempts) {
      this.$buefy.toast.open({
        message: this.$store.state.lenguaje === 'español' ? `Esperando respuesta... (${attemptCount}/${maxAttempts})` : `Waiting for response... (${attemptCount}/${maxAttempts})`,
        type: 'is-info',
        duration: 2000
      });
    },
    // Callback cuando se agota el tiempo
    onHostInteractionTimeout() {
      console.log(`⏰ Timeout agotado después de 30 intentos`);
      this.$buefy.toast.open({
        message: this.$store.state.lenguaje === 'español' 
          ? `No se recibió respuesta. El encuentro se ha cancelado automáticamente.`
          : `No response received. The encounter has been automatically cancelled.`,
        type: 'is-warning',
        duration: 5000
      });

      // -------------------- Aqui hay que hacer una llamada a Back para que cierre la interaccion

      // Volver al polling general de invitaciones después de un breve delay
      setTimeout(() => {
        invitationService.resume();
      }, 2000);
    },

    // Cerrar modal de rechazo
    onHostRejectedCloseModal() {
      this.showHostRejectedModal = false;
      // Volver al polling general de invitaciones
      invitationService.resume();
    },

    // Cerrar modal de aceptación
    onHostAcceptedCloseModal() {
      this.showHostAcceptedModal = false;
      // Aquí podremos iniciar la fase 3 de la interacción

      this.hostInteractionData = null; // esta linea habrá que borrarla cuando se implemente la fase 3 ya que necesito estos datos para la fase 3
      invitationService.resume(); // Por ahora volvemos al polling general
    },

    // Manejar respuesta de invitación
    onGlobalResponseSent(response) {
      console.log('Respuesta global enviada:', response);
      invitationService.resume();// esto habra que quitarlo, para dejar paso al modal de la interaccion que haya que hacer, por ejemplo abrir el modal de pelea
      // no queremnos volver a el polling General

      // se aqui en adelante es provisional
      const message = response.action === 'accepted' 
        ? (this.$store.state.lenguaje === 'español' ? '¡Encuentro aceptado!' : 'Encounter accepted!')
        : (this.$store.state.lenguaje === 'español' ? 'Encuentro rechazado' : 'Encounter rejected');
      
      this.$buefy.toast.open({
        message: message,
        type: response.action === 'accepted' ? 'is-success' : 'is-warning',
        duration: 3000
      });
    },
  },
  mounted(){
    // Iniciar polling
    invitationService.init(this.$store);
    invitationService.start();

    // Configurar callbacks del HOST polling
    hostPollingService.init(this.$store);
    hostPollingService.setCallbacks(
      this.onHostInteractionAccepted,
      this.onHostInteractionRejected,
      this.onHostInteractionPending,
      this.onHostInteractionTimeout
    );

    this.serchInitialObjectsInv();
    this.rellenarTextoSegunIdioma()
  },

  beforeUnmount() {
    // Limpiar polling
    invitationService.stop();
    hostPollingService.stopPolling(); 
  }
}
</script>

<style scoped>

.BGGeneralPlay{
  background-image: url(@/assets/img/ZZOtros/newBGAH.png)!important;
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}
</style>