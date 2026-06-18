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

          <figthDiceRoll
            v-if="scene === 'firstRoll'"
            :disabled="diceResult !== 0"
            @dice-rolled="handleDiceResult"
            @auto-advance="goToRules"
          />

          <figthRules v-if="scene === 'rules'" />

          <figthEncounter
            v-if="scene === 'encounterFigth'"
            @closeModal="closeModalEncounter"
          />

        </section>

        <footer v-if="scene === 'rules'">
          <button @click="nextStep" class="button is-info is-fullwidth">Siguiente</button>
        </footer>

      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js'
import { invitationService } from '@/services/invitationService.js'
import figthDiceRoll from './figth/figthDiceRoll.vue'
import figthRules    from './figth/figthRules.vue'
import figthEncounter from './figth/figthEncounter.vue'

export default {
  name: 'FightModal',
  components: { figthDiceRoll, figthRules, figthEncounter },

  data() {
    return {
      scene: 'firstRoll',
      diceResult: 0
    }
  },

  methods: {
    async handleDiceResult(result) {
      this.diceResult = result
      await this.enviarResultadoInicio(result)
    },

    goToRules() {
      this.scene = 'rules'
    },

    nextStep() {
      if (this.scene === 'rules') this.scene = 'encounterFigth'
    },

    closeModalEncounter() {
      this.$store.state.showSwithcherEventsOnLine = false
      invitationService.resumePollingGeneral()
    },

    async enviarResultadoInicio(resultado) {
      const idInteraction = this.$store.state.interactionData.idInteraccionOnLine
      const idUser        = this.$store.state.IDUserHost
      try {
        await apiService.rollInitialDice(idInteraction, idUser, resultado)
      } catch (error) {
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español'
            ? `Error: ${error.response?.data?.message}`
            : 'Error sending dice result',
          type: 'is-danger',
          duration: 3000
        })
      }
    },

    async respondInteractionToAPI() {
      const idInteraction = this.$store.state.interactionData.idInteraccionOnLine
      const idUser        = this.$store.state.IDUserHost
      await apiService.abandonInteraction(idInteraction, idUser)
      console.warn('Interacción abandonada')
    },

    closeModal() {
      const isEs = this.$store.state.lenguaje === 'español'
      this.$buefy.dialog.confirm({
        title:       isEs ? 'Evento' : 'Event',
        message:     isEs
          ? '¿Estás seguro? Se tomará como una derrota y perderás algo de tu equipo.'
          : 'Are you sure? It will be taken as a defeat and you will lose something from your equipment.',
        confirmText: isEs ? 'Confirmar' : 'Confirm',
        cancelText:  isEs ? 'Cancelar'  : 'Cancel',
        type: 'is-info',
        hasIcon: true,
        onConfirm: async () => {
          this.$store.state.showSwithcherEventsOnLine = false
          this.respondInteractionToAPI()
          this.$store.state.showGuestInvitationModal = false
          invitationService.resumePollingGeneral()
        }
      })
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
.cajaModal { min-width: 40lvh; }
.cruzeta   { cursor: pointer; }
</style>