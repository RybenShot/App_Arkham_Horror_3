<template>
  <div>
    <p class="subtitle has-text-gray has-text-centered is-6">
      {{ isRolling ? '' : (result ? '' : textoInterfaz.tapEnDado) }}
    </p>

    <div class="dice-scene" @click="rollDice()">
      <div class="dice" :class="[animationClass, desvanecerDado]">
        <div class="face face-1"><div class="dot"></div></div>
        <div class="face face-2"><div class="dot"></div><div class="dot"></div></div>
        <div class="face face-3"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
        <div class="face face-4"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
        <div class="face face-5"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
        <div class="face face-6">
          <img src="@/assets/img/ZZOtros/LogoSimple.png" alt="cara en dado del logo">
        </div>
      </div>
    </div>

    <p class="subtitle is-7 mb-5 has-text-centered">Si ambos empatan, comienza el Host de la partida</p>
    <p v-if="!isRolling && result !== 0" class="title has-text-centered">Resultado: {{ result }}</p>
  </div>
</template>

<script>
export default {
  name: 'FigthDiceRoll',
  emits: ['dice-rolled', 'auto-advance'],

  props: {
    disabled:    { type: Boolean, default: false },
    autoAdvance: { type: Boolean, default: true }
  },

  data() {
    return {
      result: 0,
      isRolling: false,
      animationClass: '',
      desvanecerDado: null,
      textoInterfaz: { tapEnDado: '' }
    }
  },

  methods: {
    rellenarTextoSegunIdioma() {
      this.textoInterfaz.tapEnDado = this.$store.state.lenguaje === 'español'
        ? 'Tap en el dado para lanzar'
        : 'Tap the dice to roll'
    },

    rollDice() {
      if (this.isRolling || this.disabled) return

      if (this.result) {
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' ? 'No puedes volver a tirar' : "You can't roll again",
          type: 'is-danger',
          duration: 2000
        })
        return
      }

      this.isRolling = true
      this.desvanecerDado = 'desvanecerDado'

      setTimeout(() => {
        this.result = Math.floor(Math.random() * 6) + 1
        this.desvanecerDado = null
        this.animationClass = `roll-${this.result}`

        setTimeout(() => {
          this.isRolling = false
          this.$emit('dice-rolled', this.result)

          if (this.autoAdvance) {
            setTimeout(() => { this.$emit('auto-advance') }, 3000)
          }
        }, 3000)
      }, 1000)
    },

    resetDice() {
      this.result = 0
      this.isRolling = false
      this.animationClass = ''
      this.desvanecerDado = null
    }
  },

  mounted() {
    this.rellenarTextoSegunIdioma()
  }
}
</script>

<style scoped>
.dice-scene {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  perspective: 1000px;
  perspective-origin: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dice {
  width: 60px;
  height: 60px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-15deg) rotateY(-15deg);
}
.dice:not([class*="roll"]):not(.desvanecerDado) {
  animation: idleFloat 3s ease-in-out infinite;
}
@keyframes idleFloat {
  0%, 100% { transform: rotateX(710deg) rotateY(890deg); }
  50%       { transform: rotateX(720deg) rotateY(900deg) translateY(-10px); }
}
.desvanecerDado { animation: simpleFade 1s ease-in !important; }
@keyframes simpleFade {
  0%   { opacity: 1; transform: rotateX(710deg) rotateY(890deg); }
  50%  { opacity: 0.5; transform: rotateX(720deg) rotateY(900deg) translateY(-10px); }
  100% { opacity: 0; transform: rotateX(710deg) rotateY(890deg); }
}
.face {
  position: absolute;
  width: 60px;
  height: 60px;
  background: #fff;
  border: 2px solid #333;
  border-radius: 6px;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.1);
}
.face-1 { transform: translateZ(30px); }
.face-2 { transform: rotateY(90deg) translateZ(30px); }
.face-3 { transform: rotateX(90deg) translateZ(30px); }
.face-4 { transform: rotateX(-90deg) translateZ(30px); }
.face-5 { transform: rotateY(-90deg) translateZ(30px); }
.face-6 { transform: rotateY(180deg) translateZ(30px); }
.dot {
  width: 8px; height: 8px;
  background: #333;
  border-radius: 50%;
  position: absolute;
}
.face-1 .dot:nth-child(1) { top: 50%; left: 50%; transform: translate(-50%, -50%); }
.face-2 .dot:nth-child(1) { top: 12px; left: 12px; }
.face-2 .dot:nth-child(2) { bottom: 12px; right: 12px; }
.face-3 .dot:nth-child(1) { top: 12px; left: 12px; }
.face-3 .dot:nth-child(2) { top: 50%; left: 50%; transform: translate(-50%, -50%); }
.face-3 .dot:nth-child(3) { bottom: 12px; right: 12px; }
.face-4 .dot:nth-child(1) { top: 12px; left: 12px; }
.face-4 .dot:nth-child(2) { top: 12px; right: 12px; }
.face-4 .dot:nth-child(3) { bottom: 12px; left: 12px; }
.face-4 .dot:nth-child(4) { bottom: 12px; right: 12px; }
.face-5 .dot:nth-child(1) { top: 12px; left: 12px; }
.face-5 .dot:nth-child(2) { top: 12px; right: 12px; }
.face-5 .dot:nth-child(3) { top: 50%; left: 50%; transform: translate(-50%, -50%); }
.face-5 .dot:nth-child(4) { bottom: 12px; left: 12px; }
.face-5 .dot:nth-child(5) { bottom: 12px; right: 12px; }

.roll-1 { animation: diceThrow1 3s ease-out forwards; }
@keyframes diceThrow1 {
  0%   { transform: translateY(-300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35%  { transform: translateY(50px) translateX(20px) rotateX(720deg) rotateY(720deg) rotateZ(360deg); }
  50%  { transform: translateY(10px) translateX(10px) rotateX(900deg) rotateY(900deg) rotateZ(450deg); }
  65%  { transform: translateY(30px) translateX(-10px) rotateX(1080deg) rotateY(1080deg) rotateZ(540deg); }
  80%  { transform: translateY(5px) translateX(5px) rotateX(1260deg) rotateY(1260deg) rotateZ(630deg); }
  90%  { transform: translateY(15px) translateX(-2px) rotateX(1350deg) rotateY(1350deg) rotateZ(675deg); }
  100% { transform: translateY(0px) rotateX(1440deg) rotateY(1440deg) rotateZ(720deg); }
}
.roll-2 { animation: diceThrow2 3s ease-out forwards; }
@keyframes diceThrow2 {
  0%   { transform: translateY(-300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35%  { transform: translateY(50px) translateX(20px) rotateX(630deg) rotateY(810deg) rotateZ(360deg); }
  50%  { transform: translateY(10px) translateX(10px) rotateX(810deg) rotateY(990deg) rotateZ(450deg); }
  65%  { transform: translateY(30px) translateX(-10px) rotateX(990deg) rotateY(1170deg) rotateZ(540deg); }
  80%  { transform: translateY(5px) translateX(5px) rotateX(1170deg) rotateY(1350deg) rotateZ(630deg); }
  90%  { transform: translateY(15px) translateX(-2px) rotateX(1260deg) rotateY(1440deg) rotateZ(675deg); }
  100% { transform: translateY(0px) rotateX(810deg) rotateY(990deg) rotateZ(450deg); }
}
.roll-3 { animation: diceThrow3 3s ease-out forwards; }
@keyframes diceThrow3 {
  0%   { transform: translateY(-300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35%  { transform: translateY(50px) translateX(20px) rotateX(720deg) rotateY(720deg) rotateZ(360deg); }
  50%  { transform: translateY(10px) translateX(10px) rotateX(900deg) rotateY(720deg) rotateZ(450deg); }
  65%  { transform: translateY(30px) translateX(-10px) rotateX(1080deg) rotateY(900deg) rotateZ(540deg); }
  80%  { transform: translateY(5px) translateX(5px) rotateX(1260deg) rotateY(1080deg) rotateZ(630deg); }
  90%  { transform: translateY(15px) translateX(-2px) rotateX(1350deg) rotateY(1170deg) rotateZ(675deg); }
  100% { transform: translateY(0px) rotateX(1170deg) rotateY(990deg) rotateZ(540deg); }
}
.roll-4 { animation: diceThrow4 3s ease-out forwards; }
@keyframes diceThrow4 {
  0%   { transform: translateY(-300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35%  { transform: translateY(50px) translateX(20px) rotateX(810deg) rotateY(630deg) rotateZ(360deg); }
  50%  { transform: translateY(10px) translateX(10px) rotateX(990deg) rotateY(810deg) rotateZ(450deg); }
  65%  { transform: translateY(30px) translateX(-10px) rotateX(1170deg) rotateY(990deg) rotateZ(540deg); }
  80%  { transform: translateY(5px) translateX(5px) rotateX(1350deg) rotateY(1170deg) rotateZ(630deg); }
  90%  { transform: translateY(15px) translateX(-2px) rotateX(1440deg) rotateY(1260deg) rotateZ(675deg); }
  100% { transform: translateY(0px) rotateX(1170deg) rotateY(1440deg) rotateZ(720deg); }
}
.roll-5 { animation: diceThrow5 3s ease-out forwards; }
@keyframes diceThrow5 {
  0%   { transform: translateY(-300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35%  { transform: translateY(50px) translateX(20px) rotateX(720deg) rotateY(540deg) rotateZ(360deg); }
  50%  { transform: translateY(10px) translateX(10px) rotateX(900deg) rotateY(720deg) rotateZ(450deg); }
  65%  { transform: translateY(30px) translateX(-10px) rotateX(1080deg) rotateY(900deg) rotateZ(540deg); }
  80%  { transform: translateY(5px) translateX(5px) rotateX(1260deg) rotateY(1080deg) rotateZ(630deg); }
  90%  { transform: translateY(15px) translateX(-2px) rotateX(1350deg) rotateY(1170deg) rotateZ(675deg); }
  100% { transform: translateY(0px) rotateX(1440deg) rotateY(1170deg) rotateZ(720deg); }
}
.roll-6 { animation: diceThrow6 3s ease-out forwards; }
@keyframes diceThrow6 {
  0%   { transform: translateY(-300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35%  { transform: translateY(50px) translateX(20px) rotateX(900deg) rotateY(900deg) rotateZ(360deg); }
  50%  { transform: translateY(10px) translateX(10px) rotateX(1080deg) rotateY(1080deg) rotateZ(450deg); }
  65%  { transform: translateY(30px) translateX(-10px) rotateX(1260deg) rotateY(1260deg) rotateZ(540deg); }
  80%  { transform: translateY(5px) translateX(5px) rotateX(1440deg) rotateY(1440deg) rotateZ(630deg); }
  90%  { transform: translateY(15px) translateX(-2px) rotateX(1530deg) rotateY(1530deg) rotateZ(675deg); }
  100% { transform: translateY(0px) rotateX(1440deg) rotateY(1620deg) rotateZ(720deg); }
}
</style>