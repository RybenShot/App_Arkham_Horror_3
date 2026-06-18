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

          <!-- ─── SCENE: rules ─── -->
          <section v-if="scene === 'rules'">
            <div class="cajaReglas">
              <header class="rules-header">
                <h1 class="title has-text-centered mb-1">Ritual de Resonancia</h1>
                <p class="subtitle has-text-centered is-7 mb-0">Un conjuro cooperativo entre dos investigadores</p>
              </header>

              <section class="rules-content">

                <div class="rule-item">
                  <div class="dice-container">
                    <i class="fas fa-dice-one fa-lg mr-1"></i>
                    <span>–</span>
                    <i class="fas fa-dice-four fa-lg ml-1"></i>
                  </div>
                  <div class="rule-description">
                    <p class="rule-title">Silencio. La conexión no responde.</p>
                  </div>
                </div>

                <div class="rule-item">
                  <div class="dice-container">
                    <i class="fas fa-dice-five fa-lg die-success-icon mr-1"></i>
                    <i class="fas fa-dice-six fa-lg die-success-icon"></i>
                  </div>
                  <div class="rule-description">
                    <p class="rule-title">Acierto — la conexión se fortalece.</p>
                  </div>
                </div>

                <hr>

                <p class="subtitle is-7 mb-2 has-text-weight-bold">¿Cómo funciona?</p>
                <p class="subtitle is-7 mb-2">
                  Ambos investigadores apuestan <strong>Restos</strong> (pueden ser 0) y lanzan sus dados de
                  <strong>Voluntad</strong> simultáneamente.
                </p>

                <div class="rule-item danger-item mb-2">
                  <div class="dice-container">
                    <i class="fas fa-skull has-text-danger fa-lg"></i>
                  </div>
                  <div class="rule-description">
                    <p class="rule-title has-text-danger">Si alguno falla (0 aciertos):</p>
                    <ul class="subtitle is-7 pl-3 mt-1 mb-0">
                      <li>Ambos pierden los Restos apostados</li>
                      <li>Ambos ganan el estado <em>Señalado por el Primigenio</em></li>
                    </ul>
                  </div>
                </div>

                <div class="rule-item success-item">
                  <div class="dice-container">
                    <i class="fas fa-door-open has-text-success fa-lg"></i>
                  </div>
                  <div class="rule-description">
                    <p class="rule-title has-text-success">Si los dos aciertan:</p>
                    <ul class="subtitle is-7 pl-3 mt-1 mb-0">
                      <li>Portal abierto: <strong>(Restos Host + Restos Guest) × 2</strong> turnos</li>
                      <li>Hechizos del barrio: +1 dado · sin tirada de Horror</li>
                      <li>El barrio no puede ganar Perdición (se desvía al adyacente)</li>
                    </ul>
                  </div>
                </div>

              </section>
            </div>
          </section>

          <!-- ─── SCENE: betting ─── -->
          <section v-if="scene === 'betting'">

            <!-- Retratos -->
            <div class="columns is-mobile is-vcentered mb-2">
              <div class="column has-text-centered">
                <p class="is-size-7 mb-1">{{ myName }}</p>
                <img :src="myImg" class="investigator-image">
                <p class="is-size-7 mt-1">
                  <i class="fas fa-gem has-text-warning mr-1"></i>{{ myRemnants }}
                </p>
              </div>
              <div class="column is-narrow has-text-centered">
                <i class="fas fa-infinity fa-2x ritual-icon"></i>
              </div>
              <div class="column has-text-centered">
                <p class="is-size-7 mb-1">{{ rivalName }}</p>
                <img :src="rivalImg" class="investigator-image investigator-rival">
                <p class="is-size-7 mt-1 has-text-grey">Esperando...</p>
              </div>
            </div>

            <!-- Selector de Restos -->
            <div class="box py-2 mb-3">
              <p class="has-text-centered is-size-6 mb-2">¿Cuántos Restos apuestas?</p>
              <div class="columns is-mobile is-centered is-vcentered is-gapless">
                <div class="column is-narrow">
                  <button class="button is-rounded is-small" @click="decreaseBet" :disabled="myBet <= 0 || ritualState !== 'idle'">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
                <div class="column is-narrow px-4">
                  <span class="title is-2 has-text-link">{{ myBet }}</span>
                </div>
                <div class="column is-narrow">
                  <button class="button is-rounded is-small" @click="increaseBet" :disabled="myBet >= myRemnants || ritualState !== 'idle'">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <p class="has-text-centered is-size-7 has-text-grey mt-1">de {{ myRemnants }} disponibles</p>
            </div>

            <!-- Dados de Voluntad -->
            <p class="has-text-centered is-size-7 mb-1">
              <i class="fas fa-brain has-text-link mr-1"></i>
              Voluntad: {{ myWillpower }} dado{{ myWillpower !== 1 ? 's' : '' }}
            </p>
            <div class="columns is-mobile is-centered is-vcentered is-multiline">
              <div v-for="(n, index) in myWillpower" :key="index" class="column is-narrow">
                <staticDie
                  :ref="`diceRoller${index}`"
                  size="small"
                  :rerollable="false"
                  @result="handleDiceResult"
                />
              </div>
            </div>

            <!-- Botones: igual que encounterFigth -->
            <div class="has-text-centered mt-3">
              <button v-if="ritualState === 'idle'" class="button is-warning is-medium" @click="throwDice">
                <i class="fas fa-dice mr-2"></i>Lanzar Dados
              </button>
              <button v-if="ritualState === 'rolling'" class="button is-white is-medium is-loading" disabled></button>
              <button v-if="ritualState === 'readyToSend'" class="button is-link is-medium" @click="submitRitual">
                ✨ Activar Ritual
              </button>
              <button v-if="ritualState === 'sent'" class="button is-white is-medium is-loading" disabled></button>
            </div>

          </section>

          <!-- ─── SCENE: waiting ─── -->
          <section v-if="scene === 'waiting'" class="has-text-centered py-4">
            <div class="mb-4">
              <i class="fas fa-circle-notch fa-spin fa-3x has-text-link"></i>
            </div>
            <p class="title is-4">Ritual Activado</p>
            <p class="subtitle is-6 mb-3">Esperando a <strong>{{ rivalName }}</strong>...</p>
            <div class="notification is-dark is-light">
              <p class="is-size-7">Tu apuesta: <strong>{{ myBet }} Resto{{ myBet !== 1 ? 's' : '' }}</strong></p>
              <p class="is-size-7 mt-1 has-text-grey">
                {{ myName }} — {{ myWillpower }} dado{{ myWillpower !== 1 ? 's' : '' }} de Voluntad
              </p>
            </div>
          </section>

          <!-- ─── SCENE: result ─── -->
          <section v-if="scene === 'result' && resonanceData">

            <!-- Éxito -->
            <div v-if="resonanceData.result === 'success'">
              <div class="notification is-success is-light has-text-centered mb-2 py-3">
                <p class="title is-3 has-text-success mb-1">✨ Conexión Establecida</p>
                <p class="subtitle is-6 mb-2">El portal se abre ante vosotros.</p>
                <div class="box py-2 mb-0">
                  <p class="is-size-6 mb-0">🌀 Portal abierto durante</p>
                  <p class="title is-2 has-text-link mb-0">{{ resonanceData.portalTurns }}</p>
                  <p class="is-size-7 has-text-grey">
                    turnos · ({{ resonanceData.host.bet }} + {{ resonanceData.guest.bet }}) × 2
                  </p>
                </div>
              </div>
            </div>

            <!-- Fracaso -->
            <div v-if="resonanceData.result === 'failure'">
              <div class="notification is-danger is-light has-text-centered mb-2 py-3">
                <p class="title is-3 has-text-danger mb-1">Conexión Interrumpida</p>
                <p class="subtitle is-6 mb-2">El ritual ha fallado. Algo os ha visto.</p>
                <div class="box py-2 mb-0">
                  <p class="is-size-5">👁️ <em>Señalados por el Primigenio</em></p>
                  <p class="subtitle is-7 mb-0">
                    Ambos pierden sus Restos apostados y ganan el estado <strong>Señalado</strong>.
                  </p>
                </div>
              </div>
            </div>

            <!-- Dados del resultado (iconos FA con valor real del servidor) -->
            <div class="columns is-mobile">

              <div class="column has-text-centered">
                <p class="is-size-7 mb-2 has-text-weight-bold">{{ hostName }}</p>
                <div class="dice-results-row mb-2">
                  <i
                    v-for="(d, i) in resonanceData.host.roll.dice"
                    :key="`h${i}`"
                    :class="[`fas fa-dice-${diceWord(d)} fa-2x`, d >= 5 ? 'die-success' : 'die-fail']"
                  ></i>
                </div>
                <p class="is-size-7">Aciertos: <strong>{{ resonanceData.host.roll.successes }}</strong></p>
                <p class="is-size-7">Apuesta: <strong>{{ resonanceData.host.bet }} Restos</strong></p>
                <span class="tag mt-1" :class="resonanceData.host.roll.successes >= 1 ? 'is-success' : 'is-danger'">
                  {{ resonanceData.host.roll.successes >= 1 ? '✓ Conectado' : '✗ Fallido' }}
                </span>
              </div>

              <div class="column has-text-centered">
                <p class="is-size-7 mb-2 has-text-weight-bold">{{ guestName }}</p>
                <div class="dice-results-row mb-2">
                  <i
                    v-for="(d, i) in resonanceData.guest.roll.dice"
                    :key="`g${i}`"
                    :class="[`fas fa-dice-${diceWord(d)} fa-2x`, d >= 5 ? 'die-success' : 'die-fail']"
                  ></i>
                </div>
                <p class="is-size-7">Aciertos: <strong>{{ resonanceData.guest.roll.successes }}</strong></p>
                <p class="is-size-7">Apuesta: <strong>{{ resonanceData.guest.bet }} Restos</strong></p>
                <span class="tag mt-1" :class="resonanceData.guest.roll.successes >= 1 ? 'is-success' : 'is-danger'">
                  {{ resonanceData.guest.roll.successes >= 1 ? '✓ Conectado' : '✗ Fallido' }}
                </span>
              </div>

            </div>

            <button
              class="button is-fullwidth mt-2"
              :class="resonanceData.result === 'success' ? 'is-success' : 'is-danger'"
              @click="closeResult"
            >
              Cerrar
            </button>

          </section>

        </section>

        <!-- Footer: solo en pantalla de reglas -->
        <footer class="">
          <div v-if="scene === 'rules'" class="field">
            <button @click="scene = 'betting'" class="button is-info is-fullwidth">
              Siguiente
            </button>
          </div>
        </footer>

      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js'
import { invitationService } from '@/services/invitationService.js'
import staticDie from '@/components/inPlay/modals/events/figth/launcherStaticDie.vue'

export default {
  name: 'EventoResonancia',
  components: { staticDie },

  data() {
    return {
      scene: 'rules',
      ritualState: 'idle', // 'idle' | 'rolling' | 'readyToSend' | 'sent'
      diceResults: [],

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

  computed: {
    naciertos() {
      return this.diceResults.filter(r => r >= 5).length
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

    increaseBet() { if (this.myBet < this.myRemnants) this.myBet++ },
    decreaseBet()  { if (this.myBet > 0) this.myBet-- },

    throwDice() {
      this.diceResults = []
      console.log('🎲 [resonance] throwDice — reseteando diceResults, myWillpower:', this.myWillpower)
      for (let i = 0; i < this.myWillpower; i++) {
        const diceRef = this.$refs[`diceRoller${i}`]
        const die = Array.isArray(diceRef) ? diceRef[0] : diceRef
        console.log(`🎲 [resonance] dado ${i} ref:`, diceRef, '→ die:', die)
        if (die) die.rollDice()
      }
      this.ritualState = 'rolling'
      setTimeout(() => {
        console.log('🎲 [resonance] timeout — diceResults al finalizar:', this.diceResults, '| naciertos:', this.naciertos)
        this.ritualState = 'readyToSend'
      }, 2500)
    },

    handleDiceResult(result) {
      this.diceResults.push(result)
      console.log(`🎲 [resonance] handleDiceResult — resultado recibido: ${result} | diceResults hasta ahora:`, [...this.diceResults])
    },

    async submitRitual() {
      console.log('🕯️ [resonance] submitRitual — enviando:', {
        idInteraction: this.idInteraction,
        idUser: this.myIdUser,
        bet: this.myBet,
        successes: this.naciertos,
        dice: this.diceResults
      })
      this.ritualState = 'sent'
      try {
        const res = await apiService.submitResonance(
          this.idInteraction,
          this.myIdUser,
          this.myBet,
          this.naciertos,
          this.diceResults
        )
        console.log('🕯️ [resonance] submitRitual — respuesta del servidor:', res)
        this.scene = 'waiting'
        this.startPolling()
      } catch (e) {
        console.error('❌ [resonance submit]', e)
        this.ritualState = 'readyToSend'
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

    diceWord(n) {
      const words = ['', 'one', 'two', 'three', 'four', 'five', 'six']
      return words[Math.min(6, Math.max(1, n))]
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

    // Recuperar estado si el componente se monta con ritual ya en curso
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

/* ─── Retratos ─── */
.investigator-image {
  width: 70px;
  height: auto;
  border-radius: 8px;
  border: 2px solid #7c3aed;
  display: block;
  margin: 0 auto;
}
.investigator-rival {
  opacity: 0.6;
  filter: grayscale(40%);
}

/* ─── Ícono ∞ ─── */
.ritual-icon {
  color: #7c3aed;
  animation: ritualPulse 2s ease-in-out infinite;
}
@keyframes ritualPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.2); }
}

/* ─── Dados del resultado ─── */
.dice-results-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  min-height: 32px;
}
.die-success      { color: #48c78e; }
.die-fail         { color: #bbb; }

/* ─── Icono de acierto en reglas ─── */
.die-success-icon { color: #48c78e; }

/* ─── Reglas (mismo patrón que rulesFigth.vue) ─── */
.cajaReglas {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.rules-header {
  background: #f5f5f5;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}
.rules-content { padding: 16px; }

.rule-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  background: #fafafa;
  border: 1px solid #e8e8e8;
}
.rule-item.danger-item  { border-color: #ffcdd2; background: #fff8f8; }
.rule-item.success-item { border-color: #c8e6c9; background: #f8fff8; }

.dice-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  margin-right: 12px;
  flex-shrink: 0;
  color: #666;
}
.rule-description { flex: 1; }
.rule-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}
</style>