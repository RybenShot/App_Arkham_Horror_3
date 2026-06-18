<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div>
      <div class="modal-card m-0">

        <header class="columns is-mobile modal-card-head BGResonancia m-0">
          <p class="modal-card-title has-text-weight-bold has-text-white">Resonancia</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body hero is-large p-2 cajaModal">
          <resonanceRules
            v-if="scene === 'rules'"
            @next="scene = 'betting'"
          />
          <resonanceBetting
            v-if="scene === 'betting'"
            :myName="myName"
            :myImg="myImg"
            :myRemnants="myRemnants"
            :rivalName="rivalName"
            :rivalImg="rivalImg"
            :myWillpower="myWillpower"
            @submit-ritual="submitRitual"
          />
          <resonanceWaiting
            v-if="scene === 'waiting'"
            :myBet="myBet"
            :myName="myName"
            :myWillpower="myWillpower"
            :rivalName="rivalName"
          />
          <resonanceResult
            v-if="scene === 'result' && resonanceData"
            :resonanceData="resonanceData"
            :hostName="hostName"
            :guestName="guestName"
            @close="closeResult"
          />
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js'
import { invitationService } from '@/services/invitationService.js'
import resonanceRules   from './resonance/resonanceRules.vue'
import resonanceBetting from './resonance/resonanceBetting.vue'
import resonanceWaiting from './resonance/resonanceWaiting.vue'
import resonanceResult  from './resonance/resonanceResult.vue'

export default {
  name: 'EventoResonancia',
  components: { resonanceRules, resonanceBetting, resonanceWaiting, resonanceResult },

  data() {
    return {
      scene: 'rules', // 'rules' | 'betting' | 'waiting' | 'result'

      myBet: 0,
      myRemnants: 0,
      myWillpower: 3,

      isHost: false,
      myName: '',
      rivalName: '',
      hostName: '',
      guestName: '',
      myImg: '',
      rivalImg: '',

      resonanceData: null,
      pollingInterval: null,
      idInteraction: null,
      myIdUser: null
    }
  },

  methods: {

    initPlayers() {
      const store = this.$store.state
      const interaction = store.interactionData

      this.myIdUser = store.IDUserHost
      this.idInteraction = interaction.idInteraccionOnLine
      this.isHost = this.myIdUser === interaction.idUserHost

      const attrs = store.datosPJactual?.atributes || {}
      this.myRemnants = attrs.remnant || 0
      this.myWillpower = Math.max(1, attrs.will || attrs.willpower || 3)

      this.hostName = interaction.nameUserHost || 'Anfitrión'
      this.guestName = interaction.nameUserGest || 'Invitado'

      if (this.isHost) {
        this.myName = this.hostName
        this.rivalName = this.guestName
        this.myImg = interaction.event?.invDataHost?.imgInv
        this.rivalImg = interaction.event?.invDataGest?.imgInv
      } else {
        this.myName = this.guestName
        this.rivalName = this.hostName
        this.myImg = interaction.event?.invDataGest?.imgInv
        this.rivalImg = interaction.event?.invDataHost?.imgInv
      }
    },

    async submitRitual({ bet, successes, dice }) {
      this.myBet = bet
      console.log('🕯️ [resonance] submitRitual — enviando:', { idInteraction: this.idInteraction, idUser: this.myIdUser, bet, successes, dice })
      try {
        const res = await apiService.submitResonance(this.idInteraction, this.myIdUser, bet, successes, dice)
        console.log('🕯️ [resonance] respuesta del servidor:', res)
        this.scene = 'waiting'
        this.startPolling()
      } catch (e) {
        console.error('❌ [resonance submit]', e)
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español'
            ? 'Error al activar el ritual. Inténtalo de nuevo.'
            : 'Error activating the ritual. Try again.',
          type: 'is-danger',
          duration: 3000
        })
      }
    },

    startPolling() {
      this.pollingInterval = setInterval(async () => {
        try {
          const response = await apiService.getGameState(this.idInteraction, this.myIdUser)
          const rd = response?.interaction?.event?.resonanceData
          if (rd && rd.status === 'finished' && this.scene !== 'result') {
            this.resonanceData = rd
            this.applyEffects(rd)
            this.scene = 'result'
            this.stopPolling()
          }
        } catch (e) {
          console.error('❌ [resonance polling]', e)
        }
      }, 3000)
    },

    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval)
        this.pollingInterval = null
      }
    },

    applyEffects(rd) {
      const myKey = this.isHost ? 'host' : 'guest'
      const myBetFromServer = rd[myKey]?.bet || 0
      const pj = this.$store.state.datosPJactual

      if (pj?.atributes) {
        pj.atributes.remnant = Math.max(0, (pj.atributes.remnant || 0) - myBetFromServer)
      }

      if (rd.result === 'failure') {
        this.$store.state.EstadoSeñalado = true
        console.log('👁️ [resonance] estado Señalado activado')
      }

      this.saveInvestigadorToAPI()
    },

    async saveInvestigadorToAPI() {
      try {
        const idUser = this.$store.state.IDUserHost
        const payload = { ...this.$store.state.datosPJactual, idUser }
        await apiService.postInvOnLine(payload)
      } catch (e) {
        console.error('❌ [resonance saveInv]', e)
      }
    },

    closeResult() {
      this.$store.state.showSwithcherEventsOnLine = false
      this.$store.state.showGuestInvitationModal = false
      invitationService.resumePollingGeneral()
    },

    closeModal() {
      if (this.scene === 'result') { this.closeResult(); return }
      this.$buefy.dialog.confirm({
        title: this.$store.state.lenguaje === 'español' ? 'Abandonar ritual' : 'Abandon ritual',
        message: this.$store.state.lenguaje === 'español'
          ? '¿Estás seguro? La conexión se perderá.'
          : 'Are you sure? The connection will be lost.',
        confirmText: this.$store.state.lenguaje === 'español' ? 'Abandonar' : 'Abandon',
        cancelText: this.$store.state.lenguaje === 'español' ? 'Cancelar' : 'Cancel',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.stopPolling()
          this.closeResult()
        }
      })
    }
  },

  mounted() {
    this.idInteraction = this.$store.state.interactionData.idInteraccionOnLine
    this.myIdUser = this.$store.state.IDUserHost
    this.initPlayers()

    const rd = this.$store.state.interactionData.event?.resonanceData
    if (rd?.status === 'finished') {
      this.resonanceData = rd
      this.scene = 'result'
    } else {
      const myKey = this.isHost ? 'host' : 'guest'
      if (rd?.[myKey]?.ready) {
        this.scene = 'waiting'
        this.startPolling()
      }
    }
  },

  beforeUnmount() {
    this.stopPolling()
  }
}
</script>

<style scoped>
.BGResonancia {
  background: linear-gradient(135deg, #1a0533 0%, #2d1b69 55%, #0d0221 100%);
  background-position: center;
  background-size: cover;
}
.cajaModal { min-width: 40lvh; }
.cruzeta   { cursor: pointer; }
</style>
