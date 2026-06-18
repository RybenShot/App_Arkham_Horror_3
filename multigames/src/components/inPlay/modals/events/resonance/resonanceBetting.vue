<template>
  <div>
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
          <button class="button is-rounded is-small" @click="decreaseBet" :disabled="localBet <= 0 || ritualState !== 'idle'">
            <i class="fas fa-minus"></i>
          </button>
        </div>
        <div class="column is-narrow px-4">
          <span class="title is-2 has-text-link">{{ localBet }}</span>
        </div>
        <div class="column is-narrow">
          <button class="button is-rounded is-small" @click="increaseBet" :disabled="localBet >= myRemnants || ritualState !== 'idle'">
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

    <!-- Botones -->
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
  </div>
</template>

<script>
import staticDie from '@/components/inPlay/modals/events/figth/launcherStaticDie.vue'

export default {
  name: 'ResonanceBetting',
  components: { staticDie },

  props: {
    myName:      { type: String, default: '' },
    myImg:       { type: String, default: '' },
    myRemnants:  { type: Number, default: 0 },
    rivalName:   { type: String, default: '' },
    rivalImg:    { type: String, default: '' },
    myWillpower: { type: Number, default: 3 }
  },

  emits: ['submit-ritual'],

  data() {
    return {
      localBet: 0,
      diceResults: [],
      ritualState: 'idle' // 'idle' | 'rolling' | 'readyToSend' | 'sent'
    }
  },

  computed: {
    naciertos() {
      return this.diceResults.filter(r => r >= 5).length
    }
  },

  methods: {
    increaseBet() { if (this.localBet < this.myRemnants) this.localBet++ },
    decreaseBet()  { if (this.localBet > 0) this.localBet-- },

    throwDice() {
      this.diceResults = []
      console.log('🎲 [resonanceBetting] throwDice — myWillpower:', this.myWillpower)
      for (let i = 0; i < this.myWillpower; i++) {
        const diceRef = this.$refs[`diceRoller${i}`]
        const die = Array.isArray(diceRef) ? diceRef[0] : diceRef
        console.log(`🎲 [resonanceBetting] dado ${i}:`, die)
        if (die) die.rollDice()
      }
      this.ritualState = 'rolling'
      setTimeout(() => {
        console.log('🎲 [resonanceBetting] diceResults finales:', this.diceResults, '| naciertos:', this.naciertos)
        this.ritualState = 'readyToSend'
      }, 2500)
    },

    handleDiceResult(result) {
      this.diceResults.push(result)
      console.log(`🎲 [resonanceBetting] resultado: ${result} | total:`, [...this.diceResults])
    },

    submitRitual() {
      this.ritualState = 'sent'
      console.log('🕯️ [resonanceBetting] submitRitual:', { bet: this.localBet, successes: this.naciertos, dice: this.diceResults })
      this.$emit('submit-ritual', {
        bet: this.localBet,
        successes: this.naciertos,
        dice: [...this.diceResults]
      })
    }
  }
}
</script>

<style scoped>
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
.ritual-icon {
  color: #7c3aed;
  animation: ritualPulse 2s ease-in-out infinite;
}
@keyframes ritualPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.2); }
}
</style>
