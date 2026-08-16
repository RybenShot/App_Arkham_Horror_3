<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div>
      <div class="modal-card m-0">

        <header class="columns is-mobile modal-card-head combat-header m-0">
          <p class="modal-card-title combat-title">⚔ COMBATE ⚔</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body p-2 combat-body cajaModal">

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

        <footer v-if="scene === 'rules'" class="combat-footer">
          <button @click="nextStep" class="button is-danger is-fullwidth combat-next-btn">
            ⚔ Comenzar Combate
          </button>
        </footer>

      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js'
import { invitationService } from '@/services/invitationService.js'
import figthDiceRoll  from './figth/figthDiceRoll.vue'
import figthRules     from './figth/figthRules.vue'
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

    goToRules() { this.scene = 'rules' },
    nextStep()  { if (this.scene === 'rules') this.scene = 'encounterFigth' },

    closeModalEncounter() {
      // recoger recompensa
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
    },

    closeModal() {
      const isEs = this.$store.state.lenguaje === 'español'
      this.$buefy.dialog.confirm({
        title:       isEs ? 'Abandonar' : 'Abandon',
        message:     isEs
          ? '¿Estás seguro? Se tomará como una derrota y perderás parte de tu equipo.'
          : 'Are you sure? It will count as a defeat and you will lose part of your equipment.',
        confirmText: isEs ? 'Confirmar' : 'Confirm',
        cancelText:  isEs ? 'Cancelar'  : 'Cancel',
        type: 'is-danger',
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
.combat-header {
  background: linear-gradient(135deg, #1a0000 0%, #3b0000 50%, #1a0000 100%);
  border-bottom: 2px solid #dc2626;
  box-shadow: 0 2px 12px rgba(220, 38, 38, 0.4);
  padding: 0.6rem 0.8rem !important;
}
.combat-title {
  color: #fca5a5 !important;
  font-weight: 900 !important;
  letter-spacing: 0.2em;
  text-shadow: 0 0 10px rgba(220, 38, 38, 0.8);
  font-size: 1rem !important;
}
.combat-body {
  background: #0d0000;
  min-width: 40lvh;
}
.combat-footer {
  background: #0d0000;
  border-top: 1px solid rgba(220, 38, 38, 0.3);
  padding: 0.5rem;
}
.combat-next-btn {
  font-weight: 700;
  letter-spacing: 0.1em;
  border: none;
  background: linear-gradient(135deg, #b91c1c, #dc2626) !important;
  box-shadow: 0 0 12px rgba(220, 38, 38, 0.4);
}
.combat-next-btn:hover {
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.8) !important;
}
.cruzeta { cursor: pointer; }
</style>