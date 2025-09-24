<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div>
      <div class="modal-card m-0">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold has-text-white">Pelea</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body hero is-large p-2 cajaModal">

          <section v-if="scene == 'firstRoll'">
            <!-- Componente hijo del tirador de dados -->
            <tools_initialDiceRoller @dice-rolled="handleDiceResult" @auto-advance="goToRules" :disabled="diceResult !== 0" ref="diceRoller" />
          </section>
          
          <section v-if="scene == 'rules'">
            <rules_figth/>
          </section>

          <section v-if="scene == 'encounterFigth'">
            <player_encounterFigth @closeModal="closeModalEncounter"/>
          </section>

        </section>

        <footer class="">
          <div v-if="scene == 'rules'" class="field">
            <p class="control">
              <button @click="nextStep" class="button is-info is-fullwidth"> 
                Siguiente 
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

import rules_figth from "@/components/inPlay/modals/events/rules/rulesFigth.vue";
import tools_initialDiceRoller from "@/components/inPlay/modals/events/figth/InitialDiceRoller.vue";
import player_encounterFigth from "@/components/inPlay/modals/events/figth/encounterFigth.vue"

export default {
  name: "FightModal",
  components: {
    rules_figth,
    tools_initialDiceRoller,
    player_encounterFigth
  },
  data() {
    return {
      scene: "firstRoll",
      diceResult: 0
    }
  },
  methods: {
    // Manejar el resultado del dado del componente hijo
    async handleDiceResult(result) {
      this.diceResult = result;
      // console.log(`Resultado recibido del dado: ${result}`);
      
      // Enviar resultado al backend
      await this.enviarResultadoInicio(result);
    },

    // Cambiar a la escena de reglas (llamado por auto-advance del hijo)
    goToRules() {
      this.scene = "rules";
    },

    closeModalEncounter(){
      this.$store.state.showSwithcherEventsOnLine = false
      invitationService.resumePollingGeneral();; // volvemos al polling General
    },

    // Función para enviar a backend el resultado del dado
    async enviarResultadoInicio(resultado) {
      const idInteraction = this.$store.state.interactionData.idInteraccionOnLine;
      const idUser = this.$store.state.IDUserHost;
      const diceResult = resultado; // resultado del dado

      try {
        const response = await apiService.rollInitialDice(idInteraction, idUser, diceResult);
        // console.log('Resultado enviado al backend:', response);
      } catch (error) {
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' ? `Error: ${error.response.data.message}` : 'Error sending dice result',
          type: 'is-danger',
          duration: 3000
        });
      }
    },

    nextStep() {
      if (this.scene == "rules") {
        this.scene = "encounterFigth";
      }
    },

    async respondInteractionToAPI(){
      const idInteraction = this.$store.state.interactionData.idInteraccionOnLine;
      const idUser = this.$store.state.IDUserHost;

      const response = await apiService.abandonInteraction(idInteraction, idUser);
      console.warn('Interacción abandonada:', response);
    },

    closeModal() {
      const textoConfirmacion = this.$store.state.lenguaje === 'español' 
        ? `¿Estás seguro? Se tomará como una derrota y perderás algo de tu equipo.` 
        : `Are you sure? It will be taken as a defeat and you will lose something from your equipment.`;

      this.$buefy.dialog.confirm({
        title: this.$store.state.lenguaje === 'español' ? 'Evento' : 'Event',
        message: textoConfirmacion,
        confirmText: this.$store.state.lenguaje === 'español' ? 'Confirmar' : 'Confirm',
        cancelText: this.$store.state.lenguaje === 'español' ? 'Cancelar' : 'Cancel',
        type: 'is-info',
        hasIcon: true,
        onConfirm: async () => {
          this.$store.state.showSwithcherEventsOnLine = false

          // llamada a backend para cancelar el evento
          this.respondInteractionToAPI()
          // console.warn("TODO queda implementar la llamada a back para abandonar el evento")

          this.$store.state.showGuestInvitationModal= false
          invitationService.resumePollingGeneral();; // volvemos al polling General
        }
      });

    }
  }
}
</script>

<style scoped>
.BGBendicion {
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}

.cajaModal {
  min-width: 40lvh;
}

.cruzeta {
  cursor: pointer;
}
</style>