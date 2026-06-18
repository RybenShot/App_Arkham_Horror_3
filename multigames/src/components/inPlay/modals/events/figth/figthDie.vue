<template>
  <div class="dice-roller" :class="`size-${size}`">
    <div class="dice-scene" @click="reRollDice">
      <div class="dice" :class="animationClass">
        <div class="face front face-1"><div class="dot center"></div></div>
        <div class="face back face-6">
          <img src="@/assets/img/ZZOtros/LogoSimple.png" alt="cara en dado del logo">
        </div>
        <div class="face right face-2"><div class="dot top-left"></div><div class="dot bottom-right"></div></div>
        <div class="face left face-5">
          <div class="dot top-left"></div><div class="dot top-right"></div>
          <div class="dot center"></div>
          <div class="dot bottom-left"></div><div class="dot bottom-right"></div>
        </div>
        <div class="face top face-3">
          <div class="dot top-left"></div><div class="dot center"></div><div class="dot bottom-right"></div>
        </div>
        <div class="face bottom face-4">
          <div class="dot top-left"></div><div class="dot top-right"></div>
          <div class="dot bottom-left"></div><div class="dot bottom-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FigthDie',
  emits: ['result'],

  props: {
    size:        { type: String,  default: 'small', validator: v => ['tiny','small','medium','big'].includes(v) },
    rerollable:  { type: Boolean, default: true },
    successOnly: { type: Boolean, default: false },
    forceResult: { type: Number,  default: null }
  },

  data() {
    return {
      result: 0,
      isRolling: false,
      animationClass: ''
    }
  },

  methods: {
    rollDice() {
      this.animationClass = 'roll-transition'

      setTimeout(() => {
        if (this.isRolling) return
        this.isRolling = true
        this.result = (this.forceResult !== null) ? this.forceResult : Math.floor(Math.random() * 6) + 1
        this.animationClass = `roll-to-${this.result}`

        setTimeout(() => {
          this.isRolling = false
          this.$emit('result', this.result)

          if (this.successOnly) {
            const av2 = this.$store.state.AvAcierto2
            const av3 = this.$store.state.AvAcierto3
            if (this.result === 6 || (this.result === 5 && av2) || (this.result === 4 && av3))
              this.animationClass += ' pulse-green'
          } else {
            if      (this.result === 1)                     this.animationClass += ' pulse-red'
            else if (this.result === 5 || this.result === 6) this.animationClass += ' pulse-green'
            else if (this.result === 3)                     this.animationClass += ' pulse-yelow'
          }
        }, 2500)
      }, 100)
    },

    reRollDice() {
      if (!this.rerollable) return
      if (this.result === 3) {
        this.rollDice()
      } else {
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' ? 'No puedes rerolear este dado' : "You can't reroll this die",
          type: 'is-danger',
          duration: 2000
        })
      }
    }
  }
}
</script>

<style scoped>
/* ── Tiny ── */
.size-tiny .dice-scene { width:60px; height:60px; margin:0 auto; perspective:300px; display:flex; justify-content:center; align-items:center; }
.size-tiny .dice  { width:42px; height:42px; }
.size-tiny .face  { width:42px; height:42px; border-radius:4px; }
.size-tiny .dot   { width:6px; height:6px; }
.size-tiny .dot.top-left, .size-tiny .dot.bottom-left, .size-tiny .dot.middle-left  { left:7px; }
.size-tiny .dot.top-right, .size-tiny .dot.bottom-right, .size-tiny .dot.middle-right { right:7px; }
.size-tiny .dot.top-left, .size-tiny .dot.top-right     { top:7px; }
.size-tiny .dot.bottom-left, .size-tiny .dot.bottom-right { bottom:7px; }
.size-tiny .front  { transform:translateZ(21px); }
.size-tiny .back   { transform:rotateY(180deg) translateZ(21px); }
.size-tiny .right  { transform:rotateY(90deg) translateZ(21px); }
.size-tiny .left   { transform:rotateY(-90deg) translateZ(21px); }
.size-tiny .top    { transform:rotateX(90deg) translateZ(21px); }
.size-tiny .bottom { transform:rotateX(-90deg) translateZ(21px); }

/* ── Small ── */
.size-small .dice-scene { width:80px; height:80px; margin:0 auto; perspective:450px; display:flex; justify-content:center; align-items:center; }
.size-small .dice  { width:60px; height:60px; }
.size-small .face  { width:60px; height:60px; border-radius:6px; }
.size-small .dot   { width:9px; height:9px; }
.size-small .dot.top-left, .size-small .dot.bottom-left, .size-small .dot.middle-left  { left:11px; }
.size-small .dot.top-right, .size-small .dot.bottom-right, .size-small .dot.middle-right { right:11px; }
.size-small .dot.top-left, .size-small .dot.top-right     { top:11px; }
.size-small .dot.bottom-left, .size-small .dot.bottom-right { bottom:11px; }
.size-small .front { transform:translateZ(30px); }
.size-small .back  { transform:rotateY(180deg) translateZ(30px); }
.size-small .right { transform:rotateY(90deg) translateZ(30px); }
.size-small .left  { transform:rotateY(-90deg) translateZ(30px); }
.size-small .top   { transform:rotateX(90deg) translateZ(30px); }
.size-small .bottom { transform:rotateX(-90deg) translateZ(30px); }

/* ── Medium (default) ── */
.size-medium .dice-scene, .dice-scene { width:200px; height:200px; margin:0 auto; perspective:600px; display:flex; justify-content:center; align-items:center; cursor:pointer; }
.size-medium .dice, .dice { width:80px; height:80px; position:relative; transform-style:preserve-3d; transform:rotateX(-15deg) rotateY(-15deg); transition:transform 0.3s ease; }
.size-medium .face, .face { position:absolute; width:80px; height:80px; background:linear-gradient(145deg,#fff,#f0f0f0); border:2px solid #333; border-radius:8px; display:flex; justify-content:center; align-items:center; box-shadow:inset 0 0 15px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2); }
.size-medium .dot, .dot   { width:12px; height:12px; background:#333; border-radius:50%; position:absolute; box-shadow:0 2px 4px rgba(0,0,0,0.2); }
.front  { transform:translateZ(40px); }
.back   { transform:rotateY(180deg) translateZ(40px); }
.right  { transform:rotateY(90deg) translateZ(40px); }
.left   { transform:rotateY(-90deg) translateZ(40px); }
.top    { transform:rotateX(90deg) translateZ(40px); }
.bottom { transform:rotateX(-90deg) translateZ(40px); }

/* ── Big ── */
.size-big .dice-scene { width:250px; height:250px; perspective:750px; }
.size-big .dice  { width:100px; height:100px; }
.size-big .face  { width:100px; height:100px; border-radius:10px; }
.size-big .dot   { width:15px; height:15px; }
.size-big .dot.top-left, .size-big .dot.bottom-left, .size-big .dot.middle-left  { left:19px; }
.size-big .dot.top-right, .size-big .dot.bottom-right, .size-big .dot.middle-right { right:19px; }
.size-big .dot.top-left, .size-big .dot.top-right     { top:19px; }
.size-big .dot.bottom-left, .size-big .dot.bottom-right { bottom:19px; }
.size-big .front  { transform:translateZ(50px); }
.size-big .back   { transform:rotateY(180deg) translateZ(50px); }
.size-big .right  { transform:rotateY(90deg) translateZ(50px); }
.size-big .left   { transform:rotateY(-90deg) translateZ(50px); }
.size-big .top    { transform:rotateX(90deg) translateZ(50px); }
.size-big .bottom { transform:rotateX(-90deg) translateZ(50px); }

/* ── Idle & hover ── */
.dice:not([class*="roll"]) { animation:idleFloat 3s ease-in-out infinite; }
.dice:hover:not([class*="roll"]) { transform:rotateX(-10deg) rotateY(-10deg) scale(1.05); }
@keyframes idleFloat {
  0%, 100% { transform:rotateX(710deg) rotateY(890deg); }
  50%      { transform:rotateX(720deg) rotateY(900deg) translateY(-10px); }
}

/* ── Dot positions ── */
.dot.center       { top:50%; left:50%; transform:translate(-50%,-50%); }
.dot.top-left     { top:15px; left:15px; }
.dot.top-right    { top:15px; right:15px; }
.dot.bottom-left  { bottom:15px; left:15px; }
.dot.bottom-right { bottom:15px; right:15px; }
.dot.middle-left  { top:50%; left:15px; transform:translateY(-50%); }
.dot.middle-right { top:50%; right:15px; transform:translateY(-50%); }

/* ── Pulse effects ── */
.pulse-red .face {
  animation: pulseRed 1.5s ease-in-out infinite !important;
}
@keyframes pulseRed {
  0%, 100% { box-shadow:inset 0 0 15px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2), 0 0 20px rgba(255,0,0,0.8); }
  50%      { box-shadow:inset 0 0 15px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2), 0 0 40px rgba(255,0,0,1); }
}
.pulse-green .face {
  animation: pulseGreen 1.5s ease-in-out infinite !important;
}
@keyframes pulseGreen {
  0%, 100% { box-shadow:inset 0 0 15px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2), 0 0 20px rgba(0,255,0,0.8); }
  50%      { box-shadow:inset 0 0 15px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2), 0 0 40px rgba(0,255,0,1); }
}
.pulse-yelow .face {
  animation: pulseYelow 1.5s ease-in-out infinite !important;
}
@keyframes pulseYelow {
  0%, 100% { box-shadow:inset 0 0 15px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2), 0 0 20px rgba(251,255,0,0.8); }
  50%      { box-shadow:inset 0 0 15px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2), 0 0 40px rgb(251,255,0); }
}

/* ── Roll animations ── */
.roll-transition { animation:rollAnimationTransition 0.5s ease-out; }
@keyframes rollAnimationTransition {
  0%   { transform:rotateX(-15deg) rotateY(-15deg); }
  25%  { transform:rotateX(180deg) rotateY(180deg) scale(1.1); }
  50%  { transform:rotateX(810deg) rotateY(90deg) scale(1); }
  100% { transform:rotateX(675deg) rotateY(315deg) scale(1.05); }
}
.roll-to-1 { animation:rollAnimation1 2.5s ease-out forwards; }
@keyframes rollAnimation1 {
  0%  { transform:rotateX(-15deg) rotateY(-15deg); }  25% { transform:rotateX(180deg) rotateY(180deg) scale(1.1); }
  50% { transform:rotateX(360deg) rotateY(360deg) scale(1); } 75% { transform:rotateX(540deg) rotateY(540deg) scale(1.05); }
  100%{ transform:rotateX(720deg) rotateY(720deg) scale(1); }
}
.roll-to-2 { animation:rollAnimation2 2.5s ease-out forwards; }
@keyframes rollAnimation2 {
  0%  { transform:rotateX(-15deg) rotateY(-15deg); }  25% { transform:rotateX(405deg) rotateY(45deg) scale(1.1); }
  50% { transform:rotateX(810deg) rotateY(90deg) scale(1); } 75% { transform:rotateX(675deg) rotateY(315deg) scale(1.05); }
  100%{ transform:rotateX(720deg) rotateY(630deg) scale(1); }
}
.roll-to-3 { animation:rollAnimation3 2.5s ease-out forwards; }
@keyframes rollAnimation3 {
  0%  { transform:rotateX(-15deg) rotateY(-15deg); }  25% { transform:rotateX(315deg) rotateY(315deg) scale(1.1); }
  50% { transform:rotateX(630deg) rotateY(630deg) scale(1); } 75% { transform:rotateX(585deg) rotateY(675deg) scale(1.05); }
  100%{ transform:rotateX(630deg) rotateY(720deg) scale(1); }
}
.roll-to-4 { animation:rollAnimation4 2.5s ease-out forwards; }
@keyframes rollAnimation4 {
  0%  { transform:rotateX(-15deg) rotateY(-15deg); }  25% { transform:rotateX(225deg) rotateY(135deg) scale(1.1); }
  50% { transform:rotateX(450deg) rotateY(270deg) scale(1); } 75% { transform:rotateX(675deg) rotateY(405deg) scale(1.05); }
  100%{ transform:rotateX(810deg) rotateY(720deg) scale(1); }
}
.roll-to-5 { animation:rollAnimation5 2.5s ease-out forwards; }
@keyframes rollAnimation5 {
  0%  { transform:rotateX(-15deg) rotateY(-15deg); }  25% { transform:rotateX(135deg) rotateY(225deg) scale(1.1); }
  50% { transform:rotateX(270deg) rotateY(450deg) scale(1); } 75% { transform:rotateX(405deg) rotateY(675deg) scale(1.05); }
  100%{ transform:rotateX(720deg) rotateY(810deg) scale(1); }
}
.roll-to-6 { animation:rollAnimation6 2.5s ease-out forwards; }
@keyframes rollAnimation6 {
  0%  { transform:rotateX(-15deg) rotateY(-15deg); }  25% { transform:rotateX(495deg) rotateY(495deg) scale(1.1); }
  50% { transform:rotateX(990deg) rotateY(990deg) scale(1); } 75% { transform:rotateX(765deg) rotateY(855deg) scale(1.05); }
  100%{ transform:rotateX(720deg) rotateY(900deg) scale(1); }
}
</style>