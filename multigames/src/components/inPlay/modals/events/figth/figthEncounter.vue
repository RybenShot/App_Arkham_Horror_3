<template>
  <div
    class="combat-arena"
    :class="{
      'damage-pulse-light':  damagePulse && hpPct(myData) > 50,
      'damage-pulse-medium': damagePulse && hpPct(myData) > 25 && hpPct(myData) <= 50,
      'damage-pulse-heavy':  damagePulse && hpPct(myData) <= 25,
      'danger-zone':         myData.life !== null && hpPct(myData) <= 25
    }"
  >

    <!-- overlay flash al recibir daño -->
    <div class="damage-flash" :class="{ 'flash-active': damagePulse }"></div>

    <!-- ══ HUD DE COMBATE ══ -->
    <div class="combat-hud">

      <!-- Jugador izquierda -->
      <div class="hud-side hud-left">
        <div class="hud-name">{{ myData.name || '???' }}</div>
        <div class="hp-track">
          <div class="hp-fill hp-mine" :style="{ width: hpPct(myData) + '%' }"></div>
        </div>
        <div class="hp-val-row left-val">
          <span :class="hpColor(myData)">{{ myData.life ?? '—' }}</span>
          <span class="hp-sep">/</span>
          <span class="hp-max">{{ myData.maxLife ?? '—' }}</span>
        </div>
        <div
          class="portrait-frame"
          :class="{
            'frame-active':  myData.turn,
            'frame-damaged': damagePulse
          }"
        >
          <img :src="myData.img" class="fighter-portrait" />
          <div v-if="myData.turn" class="turn-badge my-badge">TÚ</div>
        </div>
      </div>

      <!-- VS central -->
      <div class="hud-center">
        <div class="vs-label">VS</div>
      </div>

      <!-- Rival derecha -->
      <div class="hud-side hud-right">
        <div class="hud-name">{{ rivalData.name || '???' }}</div>
        <div class="hp-track hp-track-reverse">
          <div class="hp-fill hp-rival" :style="{ width: hpPct(rivalData) + '%' }"></div>
        </div>
        <div class="hp-val-row right-val">
          <span class="hp-max">{{ rivalData.maxLife ?? '—' }}</span>
          <span class="hp-sep">/</span>
          <span :class="hpColor(rivalData)">{{ rivalData.life ?? '—' }}</span>
        </div>
        <div class="portrait-frame" :class="{ 'frame-active': rivalData.turn }">
          <img :src="rivalData.img" class="fighter-portrait portrait-flip" />
          <div v-if="rivalData.turn" class="turn-badge rival-badge">RIVAL</div>
        </div>
      </div>

    </div>

    <!-- ══ ESPERANDO ══ -->
    <transition name="panel-slide">
      <div v-if="status === 'onLoading'" class="state-panel waiting-panel">
        <i class="fas fa-spinner fa-spin fa-2x waiting-icon"></i>
        <p class="waiting-text">{{ textoInterfaz.esperandoJugador }}</p>
      </div>
    </transition>

    <!-- ══ TU TURNO ══ -->
    <transition name="panel-slide">
      <div v-if="status === 'onPlay'" class="state-panel play-panel">

        <p class="your-turn-banner">⚡ {{ textoInterfaz.teToca }} ⚡</p>
        <p class="roll-instruction">{{ textoInterfaz.tirarFuerza }}</p>

        <div class="dice-row">
          <div
            v-for="(_, index) in $store.state.datosPJactual.atributes.strength"
            :key="index"
            class="dice-slot">
            <figthDie :ref="`diceRoller${index}`" size="small" @result="handleDiceResult" />
          </div>
        </div>

        <div class="hits-readout">
          <span class="hits-label">{{ textoInterfaz.aciertos }}</span>
          <span class="hits-number">{{ Naciertos }}</span>
        </div>

        <div class="action-buttons">
          <button v-if="!isRolled" class="combat-btn roll-btn" @click="throwDies()">
            {{ textoInterfaz.botones.roll }}
          </button>
          <button v-else-if="isRolled === 'readyToSend'" class="combat-btn send-btn" @click="sendResultToBack()">
            {{ textoInterfaz.botones.enviar }}
          </button>
        </div>

      </div>
    </transition>

    <!-- ══ VICTORIA ══ -->
    <transition name="result-emerge">
      <div v-if="status === 'win'" class="result-panel win-panel">
        <div class="result-glow win-glow"></div>
        <p class="result-eyebrow">☆ ☆ ☆</p>
        <p class="result-title win-title">{{ textoInterfaz.victoria }}</p>
        <p v-if="isAvandoned" class="abandoned-note">{{ textoInterfaz.rivalAbandono }}</p>
        <div v-if="reward" class="reward-card">
          <span class="reward-icon">{{ rewardIcon }}</span>
          <p class="reward-desc">{{ rewardText }}</p>
        </div>
        <button class="result-btn win-btn" @click="$emit('closeModal')">
          {{ textoInterfaz.botones.cerrar }}
        </button>
      </div>
    </transition>

    <!-- ══ DERROTA ══ -->
    <transition name="defeat-emerge">
      <div v-if="status === 'lose'" class="defeat-screen">

        <!-- Fondo oscuro con viñeta -->
        <div class="defeat-bg"></div>

        <!-- Grietas (decorativas CSS) -->
        <div class="crack crack-1"></div>
        <div class="crack crack-2"></div>
        <div class="crack crack-3"></div>

        <!-- Contenido -->
        <div class="defeat-content">
          <p class="defeat-eyebrow">— FIN DEL COMBATE —</p>

          <p class="defeat-title">{{ textoInterfaz.derrota }}</p>

          <p class="defeat-flavor">{{ textoInterfaz.derrotaFlavor }}</p>

          <div v-if="reward" class="reward-card defeat-reward">
            <span class="reward-icon">{{ rewardIcon }}</span>
            <p class="reward-desc">{{ rewardText }}</p>
          </div>

          <div class="defeat-penalty">
            <i class="fas fa-brain"></i>
            <span>{{ textoInterfaz.perdidaSanidad }}</span>
          </div>

          <button class="result-btn lose-btn" @click="$emit('closeModal')">
            {{ textoInterfaz.botones.cerrar }}
          </button>
        </div>

      </div>
    </transition>

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
      myIdUser:      this.$store.state.IDUserHost,
      idInteraction: this.$store.state.interactionData.idInteraccionOnLine,
      isRolled: false,
      reward: null,
      damagePulse: false,
      expectedDiceCount: 0,

      myData:    { name: null, img: null, life: null, maxLife: null, turn: false },
      rivalData: { name: null, img: null, life: null, maxLife: null, turn: false },

      textoInterfaz: {
        esperandoJugador: '',
        teToca: '', tirarFuerza: '', aciertos: '',
        victoria: '', derrota: '', derrotaFlavor: '', perdidaSanidad: '',
        rivalAbandono: '',
        botones:     { roll: '', enviar: '', cerrar: '' },
        recompensas: {
          ganadoDinero: '', ganadoResto: '', ganadoPista: '',
          perdidoDinero: '', perdidoResto: '', perdidoPista: ''
        }
      }
    }
  },

  watch: {
    'myData.life'(newVal, oldVal) {
      if (oldVal !== null && newVal !== null && newVal < oldVal) {
        this.triggerDamage()
      }
    }
  },

  computed: {
    Naciertos() {
      const hits    = this.diceResults.filter(r => r >= 5).length
      const fumbles = this.diceResults.filter(r => r === 1).length
      return Math.max(0, hits - fumbles)
    },
    rewardIcon() {
      const icons = { money: this.status === 'win' ? '💰' : '💸', remnant: this.status === 'win' ? '🧩' : '📉', clue: this.status === 'win' ? '🔍' : '❌' }
      return icons[this.reward] || ''
    },
    rewardText() {
      if (!this.reward) return ''
      const isWin = this.status === 'win'
      const map = { money: isWin ? 'ganadoDinero' : 'perdidoDinero', remnant: isWin ? 'ganadoResto' : 'perdidoResto', clue: isWin ? 'ganadoPista' : 'perdidoPista' }
      return this.textoInterfaz.recompensas[map[this.reward]] || ''
    }
  },

  methods: {
    hpPct(fighter) {
      if (fighter.life === null || !fighter.maxLife) return 100
      return Math.max(0, Math.min(100, (fighter.life / fighter.maxLife) * 100))
    },
    hpColor(fighter) {
      const pct = this.hpPct(fighter)
      if (pct > 50) return 'hp-high'
      if (pct > 25) return 'hp-mid'
      return 'hp-low'
    },

    triggerDamage() {
      this.damagePulse = true
      setTimeout(() => { this.damagePulse = false }, 700)
    },

    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === 'español') {
        this.textoInterfaz.esperandoJugador  = 'Esperando al rival...'
        this.textoInterfaz.teToca            = '¡Tu turno!'
        this.textoInterfaz.tirarFuerza       = 'Tira con Fuerza'
        this.textoInterfaz.aciertos          = 'Aciertos'
        this.textoInterfaz.victoria          = '¡VICTORIA!'
        this.textoInterfaz.derrota           = 'DERROTA'
        this.textoInterfaz.derrotaFlavor     = 'Has caído en combate...'
        this.textoInterfaz.perdidaSanidad    = 'Pierdes 1 de Cordura y quedas Mancillado'
        this.textoInterfaz.rivalAbandono     = 'Tu rival ha abandonado.'
        this.textoInterfaz.botones.roll      = 'Lanzar dados'
        this.textoInterfaz.botones.enviar    = 'Confirmar resultado'
        this.textoInterfaz.botones.cerrar    = 'Cerrar'
        this.textoInterfaz.recompensas.ganadoDinero  = 'Has ganado 2$'
        this.textoInterfaz.recompensas.ganadoResto   = 'Has ganado 1 resto'
        this.textoInterfaz.recompensas.ganadoPista   = 'Has ganado 1 pista'
        this.textoInterfaz.recompensas.perdidoDinero = 'Has perdido 2$'
        this.textoInterfaz.recompensas.perdidoResto  = 'Has perdido 1 resto'
        this.textoInterfaz.recompensas.perdidoPista  = 'Has perdido 1 pista'
      } else {
        this.textoInterfaz.esperandoJugador  = 'Waiting for rival...'
        this.textoInterfaz.teToca            = 'Your turn!'
        this.textoInterfaz.tirarFuerza       = 'Roll with Strength'
        this.textoInterfaz.aciertos          = 'Hits'
        this.textoInterfaz.victoria          = 'VICTORY!'
        this.textoInterfaz.derrota           = 'DEFEAT'
        this.textoInterfaz.derrotaFlavor     = 'You have fallen in combat...'
        this.textoInterfaz.perdidaSanidad    = 'You lose 1 Sanity and become Tainted'
        this.textoInterfaz.rivalAbandono     = 'Your rival has abandoned.'
        this.textoInterfaz.botones.roll      = 'Roll dice'
        this.textoInterfaz.botones.enviar    = 'Confirm result'
        this.textoInterfaz.botones.cerrar    = 'Close'
        this.textoInterfaz.recompensas.ganadoDinero  = 'You gained 2$'
        this.textoInterfaz.recompensas.ganadoResto   = 'You gained 1 remnant'
        this.textoInterfaz.recompensas.ganadoPista   = 'You gained 1 clue'
        this.textoInterfaz.recompensas.perdidoDinero = 'You lost 2$'
        this.textoInterfaz.recompensas.perdidoResto  = 'You lost 1 remnant'
        this.textoInterfaz.recompensas.perdidoPista  = 'You lost 1 clue'
      }
    },

    identifyPlayers() {
      const interaction = this.$store.state.interactionData
      const isHost      = this.myIdUser === interaction.idUserHost
      const gd          = interaction.event.gameData

      if (isHost) {
        this.myData.img     = interaction.event.invDataHost.imgInv
        this.myData.name    = interaction.nameUserHost
        this.myData.maxLife = gd.maxLifeHost
        this.rivalData.img     = interaction.event.invDataGest.imgInv
        this.rivalData.name    = interaction.nameUserGest
        this.rivalData.maxLife = gd.maxLifeGest
      } else {
        this.myData.img     = interaction.event.invDataGest.imgInv
        this.myData.name    = interaction.nameUserGest
        this.myData.maxLife = gd.maxLifeGest
        this.rivalData.img     = interaction.event.invDataHost.imgInv
        this.rivalData.name    = interaction.nameUserHost
        this.rivalData.maxLife = gd.maxLifeHost
      }
    },

    async updateLifes() {
      try {
        const res    = await apiService.getGameState(this.idInteraction, this.myIdUser)
        const isHost = this.myIdUser === res.interaction.idUserHost
        const gd     = res.interaction.event.gameData
        this.myData.life    = isHost ? gd.currentLifeHost : gd.currentLifeGest
        this.rivalData.life = isHost ? gd.currentLifeGest : gd.currentLifeHost
        // Actualizar maxLife si no estaba disponible al inicio
        if (!this.myData.maxLife)    this.myData.maxLife    = isHost ? gd.maxLifeHost : gd.maxLifeGest
        if (!this.rivalData.maxLife) this.rivalData.maxLife = isHost ? gd.maxLifeGest : gd.maxLifeHost
      } catch (e) {
        console.warn('⚠️ [updateLifes]', e)
      }
    },

    applyReward(rewardData, isWinner) {
      console.log('🎁 [applyReward] START ─────────────────')
      console.log('   rewardData recibido:', JSON.stringify(rewardData))
      console.log('   isWinner:', isWinner)

      const types      = ['money', 'remnant', 'clue']
      const rewardType = (rewardData?.type && types.includes(rewardData.type))
        ? rewardData.type
        : types[Math.floor(Math.random() * types.length)]

      console.log('   rewardData.type original:', rewardData?.type)
      console.log('   rewardType resuelto:', rewardType, types.includes(rewardData?.type) ? '(del backend)' : '(aleatorio — tipo no válido)')

      this.reward = rewardType

      const inv    = this.$store.state.datosPJactual.atributes
      const amount = rewardData?.amount ?? (rewardType === 'money' ? 3 : rewardType === 'remnant' ? 2 : 1)

      console.log('   amount:', amount, rewardData?.amount != null ? '(del backend)' : '(por defecto)')
      console.log('   atributes antes:', { money: inv.money, remnant: inv.remnant, clue: inv.clue })

      if (isWinner) {
        inv[rewardType] += amount
        console.log(this.$store.state.datosPJactual.atributes)
        console.log(`   ✅ GANADOR: inv.${rewardType} += ${amount}  →  ${inv[rewardType]}`)
      } else {
        if (inv[rewardType] > 0) {
          inv[rewardType] = Math.max(0, inv[rewardType] - amount)
          console.log(`   ❌ PERDEDOR: inv.${rewardType} -= ${amount}  →  ${inv[rewardType]}`)
        } else {
          console.log(`   ⚠️  PERDEDOR: inv.${rewardType} ya era 0, omitido`)
        }
      }

      console.log('   atributes después:', { money: inv.money, remnant: inv.remnant, clue: inv.clue })
      console.log('🎁 [applyReward] END ──────────────────')

      this.saveInvestigadorToAPI()
    },

    async saveInvestigadorToAPI() {
      try {
        const idUser = this.$store.state.IDUserHost
        await apiService.postInvOnLine({ ...this.$store.state.datosPJactual, idUser })
      } catch (e) { console.error('❌ [saveInv]', e) }
    },

    async throwDies() {
      const strength = this.$store.state.datosPJactual.atributes.strength
      this.expectedDiceCount = strength
      this.diceResults = []
      this.isRolled = true
      for (let i = 0; i < strength; i++) {
        this.$refs[`diceRoller${i}`][0].rollDice()
      }
    },

    handleDiceResult(result) {
      this.diceResults.push(result)
      // El botón de confirmar aparece solo cuando TODOS los dados han reportado
      if (this.diceResults.length >= this.expectedDiceCount) {
        this.isRolled = 'readyToSend'
      }
    },

    comprobarTurno() {
      this.pollingStatusInteraction = setInterval(async () => {
        const response = await apiService.checkMyTurn(this.idInteraction, this.myIdUser)
        const es = this.$store.state.lenguaje === 'español'

        if (response.status === 'not your') {
          this.$buefy.toast.open({ message: es ? 'Turno del rival...' : 'Rival\'s turn...', type: 'is-warning', duration: 2000 })
          this.rivalData.turn = true
          this.myData.turn    = false
          this.updateLifes()

        } else if (response.status === 'waiting_initial_roll') {
          this.$buefy.toast.open({ message: es ? 'Esperando tirada inicial...' : 'Waiting for initial roll...', type: 'is-warning', duration: 2000 })

        } else if (response.status === 'your_rival_abandoned') {
          this.applyReward(response.reward, true)
          this.isAvandoned = true
          this.status = 'win'
          this.stopPollingStatusInteraction()

        } else if (response.status === 'you won') {
          this.applyReward(response.reward, true)
          this.updateLifes()
          this.status = 'win'
          this.stopPollingStatusInteraction()

        } else if (response.status === 'you lost') {
          this.applyReward(response.reward, false)
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
      try {
        const response = await apiService.sendHitResults(this.idInteraction, this.myIdUser, hits)
        const es = this.$store.state.lenguaje === 'español'

        if (response.data.status === true) {
          this.$buefy.toast.open({ message: es ? 'Golpe registrado' : 'Hit registered', type: 'is-success', duration: 2000 })
          this.status      = 'onLoading'
          this.isRolled    = false
          this.diceResults = []
          this.rivalData.turn = true
          this.myData.turn    = false
          this.comprobarTurno()
          this.updateLifes()
        } else {
          this.$buefy.toast.open({ message: es ? 'Ya enviaste este turno' : 'Already sent this turn', type: 'is-danger', duration: 2000 })
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
/* ══ Arena base ══ */
.combat-arena {
  position: relative;
  background: linear-gradient(180deg, #0a0000 0%, #150000 100%);
  color: #fff;
  padding: 0.6rem 0.5rem;
  min-height: 300px;
  transition: box-shadow 0.1s;
  overflow: hidden;
}

/* ══ Animación daño ══ */
.damage-flash {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  z-index: 10;
  border-radius: 0;
}
.damage-flash.flash-active {
  animation: flashHit 0.6s ease-out forwards;
}
@keyframes flashHit {
  0%   { opacity: 1;   background: rgba(220, 38, 38, 0.35); box-shadow: inset 0 0 30px rgba(220,38,38,0.9); }
  40%  { opacity: 0.8; background: rgba(220, 38, 38, 0.2);  box-shadow: inset 0 0 60px rgba(220,38,38,0.6); }
  100% { opacity: 0;   background: transparent;              box-shadow: none; }
}

/* Borde pulsante al recibir golpe leve */
.damage-pulse-light  { animation: borderFlashLight  0.6s ease-out; }
.damage-pulse-medium { animation: borderFlashMedium 0.6s ease-out; }
.damage-pulse-heavy  { animation: borderFlashHeavy  0.6s ease-out; }

@keyframes borderFlashLight {
  0%, 100% { box-shadow: none; }
  50%      { box-shadow: 0 0 0 2px rgba(220,38,38,0.6); }
}
@keyframes borderFlashMedium {
  0%, 100% { box-shadow: none; }
  30%      { box-shadow: 0 0 0 4px rgba(220,38,38,0.8), inset 0 0 20px rgba(220,38,38,0.2); }
  60%      { box-shadow: 0 0 0 2px rgba(220,38,38,0.5); }
}
@keyframes borderFlashHeavy {
  0%   { box-shadow: 0 0 0 6px rgba(220,38,38,1), inset 0 0 40px rgba(220,38,38,0.4); transform: translateX(-3px); }
  20%  { box-shadow: 0 0 0 4px rgba(220,38,38,0.8); transform: translateX(3px); }
  40%  { box-shadow: 0 0 0 5px rgba(220,38,38,0.9); transform: translateX(-2px); }
  60%  { box-shadow: 0 0 0 3px rgba(220,38,38,0.7); transform: translateX(2px); }
  80%  { box-shadow: 0 0 0 4px rgba(220,38,38,0.6); transform: translateX(-1px); }
  100% { box-shadow: 0 0 0 2px rgba(220,38,38,0.5); transform: translateX(0); }
}

/* Zona de peligro: borde rojo continuo cuando HP < 25% */
.danger-zone {
  box-shadow: 0 0 0 2px rgba(220,38,38,0.5), inset 0 0 20px rgba(220,38,38,0.08);
  animation: dangerPulse 1.8s ease-in-out infinite;
}
@keyframes dangerPulse {
  0%, 100% { box-shadow: 0 0 0 2px rgba(220,38,38,0.4), inset 0 0 20px rgba(220,38,38,0.06); }
  50%      { box-shadow: 0 0 0 4px rgba(220,38,38,0.8), inset 0 0 30px rgba(220,38,38,0.15); }
}

/* Marco del retrato al recibir daño */
.frame-damaged .fighter-portrait {
  animation: portraitShake 0.5s ease-out;
  border-color: #dc2626 !important;
}
@keyframes portraitShake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-5px) rotate(-2deg); }
  30%  { transform: translateX(5px) rotate(2deg); }
  45%  { transform: translateX(-4px); }
  60%  { transform: translateX(4px); }
  75%  { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}

/* ══ HUD ══ */
.combat-hud {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
  padding: 0.5rem;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(220,38,38,0.25);
  border-radius: 8px;
}

.hud-side { flex: 1; display: flex; flex-direction: column; gap: 0.3rem; }
.hud-right { align-items: flex-end; }

.hud-name {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #fca5a5;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90px;
}

/* HP bar */
.hp-track {
  width: 100%;      /* crítico: sin esto colapsa a 0 en flex column con align-end */
  height: 8px;
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
}
.hp-track-reverse { display: flex; justify-content: flex-end; }
.hp-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
  min-width: 3px;   /* siempre visible aunque sea 1% */
}
.hp-mine  { background: linear-gradient(90deg, #15803d, #22c55e); box-shadow: 0 0 6px rgba(34,197,94,0.5); }
.hp-rival { background: linear-gradient(90deg, #991b1b, #dc2626); box-shadow: 0 0 6px rgba(220,38,38,0.5); }

/* Números de vida junto a cada barra */
.hp-val-row {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1;
}
.right-val { justify-content: flex-end; }
.hp-max  { color: #4b5563; font-size: 0.6rem; }
.hp-sep  { color: #4b5563; }
.hp-val  { transition: color 0.4s; }
.hp-high { color: #22c55e; }
.hp-mid  { color: #f59e0b; }
.hp-low  { color: #dc2626; animation: hpFlash 0.8s ease-in-out infinite; }
@keyframes hpFlash {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}

/* Retratos */
.portrait-frame {
  position: relative;
  width: fit-content;
}
.hud-right .portrait-frame { align-self: flex-end; }
.fighter-portrait {
  width: 52px;
  height: auto;
  border-radius: 6px;
  border: 2px solid #3b0000;
  display: block;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.portrait-flip { transform: scaleX(-1); }
.frame-active .fighter-portrait {
  border-color: #f97316;
  box-shadow: 0 0 14px rgba(249,115,22,0.8);
  animation: activeGlow 1.5s ease-in-out infinite;
}
@keyframes activeGlow {
  0%, 100% { box-shadow: 0 0 8px rgba(249,115,22,0.6); }
  50%      { box-shadow: 0 0 20px rgba(249,115,22,1); }
}
.turn-badge {
  position: absolute;
  bottom: -2px;
  font-size: 0.45rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 1px 4px;
  border-radius: 3px;
}
.my-badge    { left: 0;  background: #f97316; color: #fff; }
.rival-badge { right: 0; background: #dc2626; color: #fff; }

/* VS centro */
.hud-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  padding-top: 0.1rem;
}
.vs-label {
  font-size: 1rem;
  font-weight: 900;
  color: #dc2626;
  text-shadow: 0 0 8px rgba(220,38,38,0.8);
  letter-spacing: 0.05em;
}

/* ══ Paneles de estado ══ */
.state-panel {
  border-radius: 8px;
  padding: 1rem 0.75rem;
  text-align: center;
}
.waiting-panel {
  border: 1px solid rgba(220,38,38,0.15);
  background: rgba(0,0,0,0.3);
}
.waiting-icon { color: #6b1a1a; margin-bottom: 0.5rem; }
.waiting-text { font-size: 0.8rem; color: #6b7280; letter-spacing: 0.05em; }

.play-panel {
  background: rgba(220,38,38,0.04);
  border: 1px solid rgba(220,38,38,0.3);
}
.your-turn-banner {
  font-size: 1.2rem;
  font-weight: 900;
  color: #f97316;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-shadow: 0 0 12px rgba(249,115,22,0.7);
  margin-bottom: 0.2rem;
  animation: turnFlash 1.2s ease-in-out infinite;
}
@keyframes turnFlash {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.65; }
}
.roll-instruction {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.8rem;
}
.dice-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
}
.hits-readout {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}
.hits-label {
  font-size: 0.65rem;
  color: #6b7280;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.hits-number {
  font-size: 2.2rem;
  font-weight: 900;
  color: #f97316;
  line-height: 1;
  text-shadow: 0 0 10px rgba(249,115,22,0.7);
}
.action-buttons { display: flex; justify-content: center; }
.combat-btn {
  padding: 0.55rem 1.4rem;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}
.roll-btn {
  background: linear-gradient(135deg, #b91c1c, #dc2626);
  color: #fff;
  box-shadow: 0 0 12px rgba(220,38,38,0.4);
}
.roll-btn:hover { box-shadow: 0 0 20px rgba(220,38,38,0.8); transform: translateY(-2px); }
.send-btn {
  background: linear-gradient(135deg, #1d4ed8, #2563eb);
  color: #fff;
  box-shadow: 0 0 12px rgba(37,99,235,0.4);
}
.send-btn:hover { box-shadow: 0 0 20px rgba(37,99,235,0.8); transform: translateY(-2px); }

/* ══ Victoria ══ */
.result-panel {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;
}
.win-panel { background: rgba(22,163,74,0.06); border: 1px solid rgba(22,163,74,0.35); }
.result-glow {
  position: absolute;
  top: -30px; left: 50%;
  transform: translateX(-50%);
  width: 200px; height: 200px;
  border-radius: 50%;
  pointer-events: none;
}
.win-glow { background: radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%); }
.result-eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: #4b5563;
  margin-bottom: 0.3rem;
}
.result-title {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 0.6rem;
}
.win-title { color: #22c55e; text-shadow: 0 0 20px rgba(34,197,94,0.6); }
.abandoned-note {
  font-size: 0.7rem;
  color: #6b7280;
  font-style: italic;
  margin-bottom: 0.5rem;
}

/* ══ PANTALLA DE DERROTA ══ */
.defeat-screen {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Fondo oscuro animado */
.defeat-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, #2a0000 0%, #0a0000 60%, #000 100%);
  animation: defeatBgPulse 3s ease-in-out infinite;
}
@keyframes defeatBgPulse {
  0%, 100% { background: radial-gradient(ellipse at center, #2a0000 0%, #0a0000 60%, #000 100%); }
  50%      { background: radial-gradient(ellipse at center, #3d0000 0%, #150000 60%, #000 100%); }
}

/* Grietas decorativas */
.crack {
  position: absolute;
  background: rgba(220,38,38,0.15);
  pointer-events: none;
}
.crack-1 {
  top: 0; left: 30%;
  width: 1px; height: 60%;
  transform: rotate(8deg);
  animation: crackAppear 0.3s 0.2s ease-out both;
}
.crack-2 {
  top: 10%; left: 60%;
  width: 1px; height: 45%;
  transform: rotate(-12deg);
  animation: crackAppear 0.3s 0.4s ease-out both;
}
.crack-3 {
  top: 5%; left: 45%;
  width: 1px; height: 30%;
  transform: rotate(3deg);
  animation: crackAppear 0.3s 0.6s ease-out both;
}
@keyframes crackAppear {
  from { opacity: 0; transform-origin: top center; scaleY: 0; }
  to   { opacity: 1; }
}

/* Viñeta de sangre en los bordes */
.defeat-screen::before {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 60px rgba(139,0,0,0.6), inset 0 0 120px rgba(80,0,0,0.4);
  pointer-events: none;
  z-index: 1;
  animation: vignetteBreath 2.5s ease-in-out infinite;
}
@keyframes vignetteBreath {
  0%, 100% { box-shadow: inset 0 0 60px rgba(139,0,0,0.6), inset 0 0 120px rgba(80,0,0,0.4); }
  50%      { box-shadow: inset 0 0 80px rgba(180,0,0,0.7), inset 0 0 150px rgba(100,0,0,0.5); }
}

/* Contenido de derrota */
.defeat-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.defeat-eyebrow {
  font-size: 0.55rem;
  letter-spacing: 0.45em;
  color: #6b1a1a;
}

.defeat-title {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #dc2626;
  text-shadow:
    0 0 10px rgba(220,38,38,1),
    0 0 30px rgba(180,0,0,0.8),
    0 0 60px rgba(100,0,0,0.5);
  animation: defeatTitleFlicker 4s ease-in-out infinite;
  line-height: 1;
}
@keyframes defeatTitleFlicker {
  0%, 92%, 96%, 100% { opacity: 1; }
  93%, 95%           { opacity: 0.7; }
  94%                { opacity: 0.4; }
}

.defeat-flavor {
  font-size: 0.8rem;
  color: #6b2a2a;
  font-style: italic;
  letter-spacing: 0.05em;
}

.defeat-penalty {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(139,0,0,0.15);
  border: 1px solid rgba(220,38,38,0.2);
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.72rem;
  color: #9b3535;
}
.defeat-penalty i { color: #dc2626; }

.defeat-reward { border-color: rgba(220,38,38,0.2); background: rgba(0,0,0,0.4); }

/* Botones resultado compartidos */
.reward-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(0,0,0,0.3);
  border-radius: 6px;
  padding: 0.6rem 1rem;
}
.reward-icon { font-size: 1.4rem; }
.reward-desc { font-size: 0.85rem; color: #d1d5db; }

.result-btn {
  border: none;
  border-radius: 6px;
  padding: 0.55rem 1.5rem;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}
.win-btn  { background: #16a34a; color: #fff; }
.win-btn:hover  { background: #22c55e; }
.lose-btn {
  background: linear-gradient(135deg, #7f1d1d, #dc2626);
  color: #fff;
  box-shadow: 0 0 12px rgba(220,38,38,0.4);
}
.lose-btn:hover {
  background: linear-gradient(135deg, #991b1b, #ef4444);
  box-shadow: 0 0 20px rgba(220,38,38,0.7);
}

/* ══ Transiciones ══ */
.panel-slide-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.panel-slide-enter-from   { opacity: 0; transform: translateY(6px); }

.result-emerge-enter-active { transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1); }
.result-emerge-enter-from   { opacity: 0; transform: scale(0.85); }

.defeat-emerge-enter-active { transition: opacity 0.6s ease; }
.defeat-emerge-enter-from   { opacity: 0; }
.defeat-emerge-enter-active .defeat-title {
  animation: defeatTitleIn 0.8s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes defeatTitleIn {
  from { opacity: 0; transform: scale(2); filter: blur(8px); }
  to   { opacity: 1; transform: scale(1); filter: blur(0); }
}
</style>