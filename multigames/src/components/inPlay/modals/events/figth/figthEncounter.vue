<template>
  <div>
    <!-- Vidas de jugadores -->
    <div class="columns is-mobile is-vcentered mb-0">
      <div class="column">
        <p class="has-text-centered">@{{ myData.name }}</p>
        <img :src="myData.img" class="investigator-image my-1" :class="{ activo: myData.turn }">
        <progress class="progress is-danger" :value="myData.life" :max="myData.maxLife"></progress>
      </div>
      <div class="column">
        <p class="has-text-centered">@{{ rivalData.name }}</p>
        <img :src="rivalData.img" class="investigator-image my-1" :class="{ activo: rivalData.turn }">
        <progress class="progress is-danger" :value="rivalData.life" :max="rivalData.maxLife"></progress>
      </div>
    </div>

    <!-- Cargando -->
    <div v-if="status === 'onLoading'" class="has-text-centered">
      <button class="button is-loading is-white is-large is-rounded mt-3 mb-3"></button>
      <p class="subtitle is-6 mt-2">{{ textoInterfaz.esperandoJugador }}</p>
    </div>

    <!-- Tirador de dados -->
    <div v-if="status === 'onPlay'" class="has-text-centered">
      <p class="title is-2 mb-3">{{ textoInterfaz.teToca }}</p>
      <p class="subtitle is-5">{{ textoInterfaz.tirarFuerza }}</p>

      <div class="columns is-mobile is-centered">
        <div
          v-for="(_, index) in $store.state.datosPJactual.atributes.strength"
          :key="index"
          class="column">
          <figthDie :ref="`diceRoller${index}`" size="small" @result="handleDiceResult" />
        </div>
      </div>

      <p class="subtitle is-6 mt-2">{{ textoInterfaz.aciertos }}: {{ Naciertos }}</p>

      <button v-if="!isRolled"                   class="button is-medium mt-3 mb-3" @click="throwDies()">{{ textoInterfaz.botones.roll }}</button>
      <button v-else-if="isRolled === 'readyToSend'" class="button is-medium mt-3 mb-3" @click="sendResultToBack()">{{ textoInterfaz.botones.enviar }}</button>
    </div>

    <!-- Victoria -->
    <div v-if="status === 'win'" class="has-text-centered">
      <div class="notification is-success is-light">
        <p class="title is-3 has-text-success mb-2">{{ textoInterfaz.victoria }}</p>
        <div v-if="reward === 'money'"   class="box mb-2"><p class="title is-2">💰</p><p class="subtitle is-5">{{ textoInterfaz.recompensas.ganadoDinero }}</p></div>
        <div v-if="reward === 'remnant'" class="box mb-2"><p class="title is-2">🧩</p><p class="subtitle is-5">{{ textoInterfaz.recompensas.ganadoResto }}</p></div>
        <div v-if="reward === 'clue'"    class="box mb-2"><p class="title is-2">🔍</p><p class="subtitle is-5">{{ textoInterfaz.recompensas.ganadoPista }}</p></div>
        <p v-if="isAvandoned" class="subtitle is-7 mb-1">{{ textoInterfaz.rivalAbandono }}</p>
        <button class="button is-success mt-2" @click="$emit('closeModal')">{{ textoInterfaz.botones.cerrar }}</button>
      </div>
    </div>

    <!-- Derrota -->
    <div v-if="status === 'lose'" class="has-text-centered">
      <div class="notification is-danger is-light">
        <p class="title is-3 has-text-danger mb-2">{{ textoInterfaz.derrota }}</p>
        <div v-if="reward === 'money'"   class="box mb-2"><p class="title is-2">💸</p><p class="subtitle is-5">{{ textoInterfaz.recompensas.perdidoDinero }}</p></div>
        <div v-if="reward === 'remnant'" class="box mb-2"><p class="title is-2">📉</p><p class="subtitle is-5">{{ textoInterfaz.recompensas.perdidoResto }}</p></div>
        <div v-if="reward === 'clue'"    class="box mb-2"><p class="title is-2">❌</p><p class="subtitle is-5">{{ textoInterfaz.recompensas.perdidoPista }}</p></div>
        <button class="button is-danger mt-2" @click="$emit('closeModal')">{{ textoInterfaz.botones.cerrar }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js'
import figthDie from './figthDie.vue'

export default {
  name: 'FigthEncounter',
  components: { figthDie },
  emits: ['closeModal'],

  data() {
    return {
      status: 'onLoading',
      isAvandoned: false,
      diceResults: [],
      pollingStatusInteraction: null,
      myIdUser: this.$store.state.IDUserHost,
      idInteraction: this.$store.state.interactionData.idInteraccionOnLine,
      isRolled: false,
      reward: null,

      myData:    { name: null, img: null, life: null, maxLife: null, turn: false },
      rivalData: { name: null, img: null, life: null, maxLife: null, turn: false },

      textoInterfaz: {
        esperandoJugador: '',
        teToca: '',
        tirarFuerza: '',
        aciertos: '',
        victoria: '',
        derrota: '',
        rivalAbandono: '',
        botones:     { roll: '', enviar: '', cerrar: '' },
        recompensas: { ganadoDinero: '', ganadoResto: '', ganadoPista: '', perdidoDinero: '', perdidoResto: '', perdidoPista: '' }
      }
    }
  },

  computed: {
    Naciertos() {
      const hits   = this.diceResults.filter(r => r >= 5).length
      const fumbles = this.diceResults.filter(r => r === 1).length
      return Math.max(0, hits - fumbles)
    }
  },

  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === 'español') {
        this.textoInterfaz.esperandoJugador = 'Esperando al otro jugador ...'
        this.textoInterfaz.teToca           = '¡Te toca!'
        this.textoInterfaz.tirarFuerza      = 'Vas a tirar con Fuerza'
        this.textoInterfaz.aciertos         = 'Aciertos'
        this.textoInterfaz.victoria         = 'Victoria'
        this.textoInterfaz.derrota          = 'Derrota'
        this.textoInterfaz.rivalAbandono    = 'Tu rival ha abandonado la partida.'
        this.textoInterfaz.botones.roll     = 'Roll'
        this.textoInterfaz.botones.enviar   = 'Enviar'
        this.textoInterfaz.botones.cerrar   = 'Cerrar'
        this.textoInterfaz.recompensas.ganadoDinero  = 'Has ganado 2$'
        this.textoInterfaz.recompensas.ganadoResto   = 'Has ganado 1 resto'
        this.textoInterfaz.recompensas.ganadoPista   = 'Has ganado 1 pista'
        this.textoInterfaz.recompensas.perdidoDinero = 'Has perdido 2$'
        this.textoInterfaz.recompensas.perdidoResto  = 'Has perdido 1 resto'
        this.textoInterfaz.recompensas.perdidoPista  = 'Has perdido 1 pista'
      } else {
        this.textoInterfaz.esperandoJugador = 'Waiting for the other player ...'
        this.textoInterfaz.teToca           = 'Your turn!'
        this.textoInterfaz.tirarFuerza      = 'You will roll with Strength'
        this.textoInterfaz.aciertos         = 'Hits'
        this.textoInterfaz.victoria         = 'Victory'
        this.textoInterfaz.derrota          = 'Defeat'
        this.textoInterfaz.rivalAbandono    = 'Your rival has abandoned the game.'
        this.textoInterfaz.botones.roll     = 'Roll'
        this.textoInterfaz.botones.enviar   = 'Send'
        this.textoInterfaz.botones.cerrar   = 'Close'
        this.textoInterfaz.recompensas.ganadoDinero  = 'You have won 2$'
        this.textoInterfaz.recompensas.ganadoResto   = 'You have won 1 remnant'
        this.textoInterfaz.recompensas.ganadoPista   = 'You have won 1 clue'
        this.textoInterfaz.recompensas.perdidoDinero = 'You have lost 2$'
        this.textoInterfaz.recompensas.perdidoResto  = 'You have lost 1 remnant'
        this.textoInterfaz.recompensas.perdidoPista  = 'You have lost 1 clue'
      }
    },

    identifyPlayers() {
      const hostId      = this.$store.state.interactionData.idUserHost
      const isHost      = this.myIdUser === hostId
      const interaction = this.$store.state.interactionData

      if (isHost) {
        this.myData.img     = interaction.event.invDataHost.imgInv
        this.myData.name    = interaction.nameUserHost
        this.myData.maxLife = interaction.event.gameData.maxLifeHost
        this.rivalData.img     = interaction.event.invDataGest.imgInv
        this.rivalData.name    = interaction.nameUserGest
        this.rivalData.maxLife = interaction.event.gameData.maxLifeGest
      } else {
        this.myData.img     = interaction.event.invDataGest.imgInv
        this.myData.name    = interaction.nameUserGest
        this.myData.maxLife = interaction.event.gameData.maxLifeGest
        this.rivalData.img     = interaction.event.invDataHost.imgInv
        this.rivalData.name    = interaction.nameUserHost
        this.rivalData.maxLife = interaction.event.gameData.maxLifeHost
      }
    },

    async updateLifes() {
      const res    = await apiService.getGameState(this.idInteraction, this.myIdUser)
      const hostId = res.interaction.idUserHost
      const gd     = res.interaction.event.gameData

      if (this.myIdUser === hostId) {
        this.myData.life    = gd.currentLifeHost
        this.rivalData.life = gd.currentLifeGest
      } else {
        this.myData.life    = gd.currentLifeGest
        this.rivalData.life = gd.currentLifeHost
      }
    },

    applyReward(rewardData, isWinner) {
      console.log('🎁 [applyReward]', rewardData, '| isWinner:', isWinner)
      const types      = ['money', 'remnant', 'clue']
      const rewardType = (rewardData?.type && types.includes(rewardData.type))
        ? rewardData.type
        : types[Math.floor(Math.random() * types.length)]
      this.reward = rewardType

      const inv    = this.$store.state.datosPJactual.atributes
      const amount = rewardData?.amount ?? (rewardType === 'money' ? 3 : rewardType === 'remnant' ? 2 : 1)

      if (isWinner) inv[rewardType] += amount
      else          inv[rewardType] = Math.max(0, inv[rewardType] - amount)

      this.saveInvestigadorToAPI()
    },

    async saveInvestigadorToAPI() {
      try {
        const idUser  = this.$store.state.IDUserHost
        const payload = { ...this.$store.state.datosPJactual, idUser }
        await apiService.postInvOnLine(payload)
      } catch (e) {
        console.error('❌ [saveInvestigadorToAPI]', e)
      }
    },

    async throwDies() {
      const strength = this.$store.state.datosPJactual.atributes.strength
      for (let i = 0; i < strength; i++) {
        this.$refs[`diceRoller${i}`][0].rollDice()
      }
      this.isRolled = true
      setTimeout(() => { this.isRolled = 'readyToSend' }, 2500)
    },

    handleDiceResult(result) {
      this.diceResults.push(result)
    },

    comprobarTurno() {
      console.log('🔄 [comprobarTurno] iniciando polling para:', this.myIdUser)
      this.pollingStatusInteraction = setInterval(async () => {
        const response = await apiService.checkMyTurn(this.idInteraction, this.myIdUser)
        const lang = this.$store.state.lenguaje === 'español'

        if (response.status === 'not your') {
          this.$buefy.toast.open({ message: lang ? 'Esperando respuesta...' : 'Waiting for rival to roll dice...', type: 'is-danger', duration: 2000 })
          this.rivalData.turn = true
          this.myData.turn    = false
          this.updateLifes()

        } else if (response.status === 'waiting_initial_roll') {
          this.$buefy.toast.open({ message: lang ? 'Esperando tirada inicial de rival...' : 'Waiting for rival initial roll...', type: 'is-danger', duration: 2000 })

        } else if (response.status === 'your_rival_abandoned') {
          this.applyReward(response.reward, true)
          this.isAvandoned = true
          this.$buefy.toast.open({ message: lang ? 'Tu rival ha abandonado, has ganado' : 'Rival abandoned, you won', type: 'is-danger', duration: 5000 })
          this.status = 'win'
          this.stopPollingStatusInteraction()

        } else if (response.status === 'you won') {
          this.applyReward(response.reward, true)
          this.$buefy.toast.open({ message: lang ? '¡Has ganado el combate!' : 'You have won the combat!', type: 'is-success', duration: 10000 })
          this.updateLifes()
          this.status = 'win'
          this.stopPollingStatusInteraction()

        } else if (response.status === 'you lost') {
          this.applyReward(response.reward, false)
          this.$buefy.toast.open({ message: lang ? 'Has perdido el combate...' : 'You have lost the combat...', type: 'is-danger', duration: 10000 })
          this.updateLifes()
          this.status = 'lose'
          this.stopPollingStatusInteraction()

        } else {
          this.rivalData.turn = false
          this.myData.turn    = true
          this.$store.state.interactionData.event = response.interaction.event
          this.updateLifes()
          this.status = 'onPlay'
          this.stopPollingStatusInteraction()
        }
      }, 3000)
    },

    stopPollingStatusInteraction() {
      if (this.pollingStatusInteraction) {
        clearInterval(this.pollingStatusInteraction)
        this.pollingStatusInteraction = null
      }
    },

    async sendResultToBack() {
      const hits = this.Naciertos
      console.log('📤 [sendResultToBack] aciertos:', hits)
      try {
        const response = await apiService.sendHitResults(this.idInteraction, this.myIdUser, hits)
        console.log('📤 [sendResultToBack] respuesta:', response.data)

        if (response.data.status === true) {
          this.$buefy.toast.open({ message: this.$store.state.lenguaje === 'español' ? 'Resultados enviados' : 'Results sent', type: 'is-success', duration: 3000 })
          this.status      = 'onLoading'
          this.isRolled    = false
          this.diceResults = []
          this.comprobarTurno()
          this.updateLifes()
          this.rivalData.turn = true
          this.myData.turn    = false
        } else {
          this.$buefy.toast.open({ message: this.$store.state.lenguaje === 'español' ? 'Ya has mandado los aciertos' : 'Already sent', type: 'is-danger', duration: 3000 })
          this.status      = 'onLoading'
          this.isRolled    = false
          this.diceResults = []
          this.comprobarTurno()
        }
      } catch (error) {
        console.error('❌ [sendResultToBack]', error)
        this.$buefy.toast.open({ message: this.$store.state.lenguaje === 'español' ? `Error: ${error.response}` : 'Error sending result', type: 'is-danger', duration: 3000 })
      }
    }
  },

  mounted() {
    this.rellenarTextoSegunIdioma()
    this.identifyPlayers()
    this.comprobarTurno()
  },

  beforeUnmount() {
    this.stopPollingStatusInteraction()
  }
}
</script>

<style scoped>
.investigator-image {
  width: 80px;
  height: auto;
  border-radius: 8px;
  border: 2px solid #ccc;
  display: block;
  margin: 0 auto;
}
.activo { animation: breathingGlow 2s ease-in-out infinite !important; }
@keyframes breathingGlow {
  0%, 100% { border-color: #4CAF50; box-shadow: 0 0 5px rgba(76,175,80,0.3); transform: scale(1); }
  50%      { border-color: #81C784; box-shadow: 0 0 20px rgba(76,175,80,0.8); transform: scale(1.10); }
}
</style>