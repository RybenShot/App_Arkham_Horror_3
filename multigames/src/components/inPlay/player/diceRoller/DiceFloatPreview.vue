<template>
  <div class="dice-float-wrap">
    <div class="dice-float-bob" :style="bobStyle">
      <div :class="['dice-float-cube', spinVariant]" :style="spinStyle">
        <div v-for="face in FACES" :key="face.side" :class="['dice-float-face', `cara-${face.side}`]" :style="faceCss(face.val)">
          <template v-if="skin.type === 'pool' && face.val !== 6">
            <span v-for="(pip, i) in PIPS[face.val]" :key="i" class="dice-float-pip" :style="pipCss(pip)"></span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PIPS, faceStyle } from "./diceFaceStyle.js";

// Asignación de valores a las 6 caras del cubo CSS; opuestas suman 7, como
// en un dado real. La cara del 6 mira al frente por ser la más vistosa.
const FACES = [
  { side: "front", val: 6 },
  { side: "back", val: 1 },
  { side: "right", val: 2 },
  { side: "left", val: 5 },
  { side: "top", val: 3 },
  { side: "bottom", val: 4 }
];

// Tres formas de girar distintas, para que no todos los dados tumben igual
const SPIN_VARIANTS = ["dice-spin-a", "dice-spin-b", "dice-spin-c"];

const SIZE = 52; // lado del cubo, en px

export default {
  name: "DiceFloatPreview",
  props: {
    skin: { type: Object, required: true }
  },
  data() {
    // Cada instancia elige al montarse su propio ritmo de vuelo y giro, para
    // que el conjunto de dados del selector se mueva de forma aleatoria y no
    // como una única animación clonada y desfasada.
    return {
      FACES,
      PIPS,
      spinVariant: SPIN_VARIANTS[Math.floor(Math.random() * SPIN_VARIANTS.length)],
      spinDuration: 7 + Math.random() * 6,
      spinDelay: -(Math.random() * 12),
      spinDirection: Math.random() < 0.5 ? "reverse" : "normal",
      bobDuration: 3 + Math.random() * 2.4,
      bobDelay: -(Math.random() * 5)
    };
  },
  computed: {
    bobStyle() {
      return {
        animationDuration: `${this.bobDuration}s`,
        animationDelay: `${this.bobDelay}s`
      };
    },
    spinStyle() {
      return {
        animationDuration: `${this.spinDuration}s`,
        animationDelay: `${this.spinDelay}s`,
        animationDirection: this.spinDirection
      };
    }
  },
  methods: {
    faceCss(val) {
      return faceStyle(this.skin, val, SIZE);
    },
    pipCss([x, y]) {
      return {
        left: `${50 + x * 26}%`,
        top: `${50 + y * 26}%`,
        background: this.skin.theme?.ink || "#2c2c2a"
      };
    }
  }
};
</script>

<style scoped>
.dice-float-wrap {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 280px;
}
.dice-float-bob {
  animation-name: dice-float-bob;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.dice-float-cube {
  position: relative;
  width: 52px;
  height: 52px;
  transform-style: preserve-3d;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.dice-float-face {
  position: absolute;
  width: 52px;
  height: 52px;
  border-radius: 6px;
  background-color: #111;
  background-size: cover;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
}
.cara-front { transform: translateZ(26px); }
.cara-back { transform: rotateY(180deg) translateZ(26px); }
.cara-right { transform: rotateY(90deg) translateZ(26px); }
.cara-left { transform: rotateY(-90deg) translateZ(26px); }
.cara-top { transform: rotateX(90deg) translateZ(26px); }
.cara-bottom { transform: rotateX(-90deg) translateZ(26px); }

.dice-float-pip {
  position: absolute;
  width: 14%;
  height: 14%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

@keyframes dice-float-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Tumbo sobre el eje Y con un leve balanceo en X */
.dice-spin-a { animation-name: dice-spin-a; }
@keyframes dice-spin-a {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  25% { transform: rotateX(10deg) rotateY(90deg); }
  50% { transform: rotateX(0deg) rotateY(180deg); }
  75% { transform: rotateX(-10deg) rotateY(270deg); }
  100% { transform: rotateX(0deg) rotateY(360deg); }
}
/* Tumbo sobre el eje X con un leve balanceo en Y */
.dice-spin-b { animation-name: dice-spin-b; }
@keyframes dice-spin-b {
  0% { transform: rotateY(0deg) rotateX(0deg); }
  25% { transform: rotateY(-8deg) rotateX(90deg); }
  50% { transform: rotateY(0deg) rotateX(180deg); }
  75% { transform: rotateY(8deg) rotateX(270deg); }
  100% { transform: rotateY(0deg) rotateX(360deg); }
}
/* Voltereta diagonal: ambos ejes girando a ritmos distintos */
.dice-spin-c { animation-name: dice-spin-c; }
@keyframes dice-spin-c {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  20% { transform: rotateX(72deg) rotateY(130deg); }
  40% { transform: rotateX(144deg) rotateY(250deg); }
  60% { transform: rotateX(216deg) rotateY(20deg); }
  80% { transform: rotateX(288deg) rotateY(150deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .dice-float-bob,
  .dice-float-cube {
    animation: none;
  }
}
</style>
