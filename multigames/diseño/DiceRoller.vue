<script setup>
import { ref, shallowRef, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import DiceEngine from './diceEngine.js'
import DiceSound from './diceSound.js'

const props = defineProps({
  /** Número de dados (v-model:count) */
  count: { type: Number, default: 3 },
  maxCount: { type: Number, default: 15 },
  /** Coeficiente de restitución, 0 a 0.7 */
  bounce: { type: Number, default: 0.45 },
  /** 'top' cenital, 'side' lateral */
  view: { type: String, default: 'top' },
  /** Valores >= markFrom disparan confeti y tinte verde */
  markFrom: { type: Number, default: 5 },
  height: { type: Number, default: 330 },
  showControls: { type: Boolean, default: true },
  showResult: { type: Boolean, default: true },
  rollOnMount: { type: Boolean, default: true },
  /** Sonido de los golpes (Web Audio, sin archivos) */
  sound: { type: Boolean, default: true },
  /** Volumen del sonido, 0 a 1 */
  volume: { type: Number, default: 0.5 },
  /** Colores del motor: { ink, board, die, dieMarked, pipOne, confetti } */
  theme: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:count', 'update:view', 'update:markFrom', 'roll', 'reroll', 'settled'])

const canvasEl = ref(null)
const engine = shallowRef(null)
const audio = shallowRef(null)
const values = ref([])
const total = ref(null)
const marked = ref(0)
const rolling = ref(false)

const localView = ref(props.view)
const viewLabel = computed(() => (localView.value === 'top' ? 'Vista lateral' : 'Vista cenital'))
const bounceLabel = computed(() => props.bounce.toFixed(2))

onMounted(() => {
  audio.value = new DiceSound({ enabled: props.sound, volume: props.volume })
  // Los navegadores exigen un gesto del usuario para abrir el audio
  const unlock = () => audio.value?.unlock()
  canvasEl.value.addEventListener('pointerdown', unlock)
  document.addEventListener('pointerdown', unlock, { once: true })

  engine.value = new DiceEngine(canvasEl.value, {
    count: props.count,
    restitution: props.bounce,
    view: props.view,
    markFrom: props.markFrom,
    theme: props.theme,
    onImpact: (e) => audio.value?.impact(e),
    onRollStart: ({ index }) => {
      rolling.value = true
      if (index < 0) {
        // Tirada completa: se limpia el marcador. En un relanzamiento suelto
        // se conservan los valores anteriores hasta que ese dado se pare.
        values.value = []
        total.value = null
        marked.value = 0
        emit('roll')
      } else {
        emit('reroll', index)
      }
    },
    onSettled: (result) => {
      rolling.value = false
      audio.value?.settle(result.marked)
      values.value = result.values
      total.value = result.total
      marked.value = result.marked
      emit('settled', result)
    }
  })
  engine.value.start()
  if (props.rollOnMount) engine.value.roll(1)
})

onBeforeUnmount(() => {
  engine.value?.destroy()
  engine.value = null
  audio.value?.destroy()
  audio.value = null
})

watch(
  () => props.count,
  (n) => {
    if (!engine.value) return
    engine.value.setCount(n)
    engine.value.roll(1)
  }
)
watch(
  () => props.sound,
  (on) => audio.value?.setEnabled(on)
)
watch(
  () => props.volume,
  (v) => audio.value?.setVolume(v)
)
watch(
  () => props.markFrom,
  (v) => {
    engine.value?.setMarkFrom(v)
    if (engine.value) marked.value = engine.value.marked
  }
)
watch(
  () => props.bounce,
  (v) => engine.value?.setRestitution(v)
)
watch(
  () => props.view,
  (v) => {
    localView.value = v
    engine.value?.setView(v)
  }
)

function roll(power = 1) {
  audio.value?.unlock()
  engine.value?.roll(power)
}
function toggleView() {
  localView.value = localView.value === 'top' ? 'side' : 'top'
  engine.value?.setView(localView.value)
  emit('update:view', localView.value)
}
function onCountInput(ev) {
  emit('update:count', Number(ev.target.value))
}
function onMarkInput(ev) {
  emit('update:markFrom', Number(ev.target.value))
}
function rerollOne(index, power = 1) {
  audio.value?.unlock()
  return engine.value?.rollOne(index, power)
}
function onBounceInput(ev) {
  const v = Number(ev.target.value) / 100
  engine.value?.setRestitution(v)
}

defineExpose({ roll, rerollOne, toggleView, values, total, marked, engine, audio })
</script>

<template>
  <div class="dice-roller">
    <div v-if="showResult" class="dr-head">
      <div class="dr-row">
        <span class="dr-label">
          Total
          <span v-if="total !== null" class="dr-hits">· {{ marked }} éxito<span v-if="marked !== 1">s</span></span>
        </span>
        <span class="dr-total">{{ total === null ? '…' : total }}</span>
      </div>
      <p class="dr-values">
        <template v-if="values.length > 1">
          <span
            v-for="(v, i) in values"
            :key="i"
            :class="{ 'dr-marked': v >= markFrom }"
          >{{ v }}<span v-if="i < values.length - 1" class="dr-sep"> · </span></span>
        </template>
        <span v-else>&nbsp;</span>
      </p>
    </div>

    <div class="dr-stage">
      <canvas ref="canvasEl" :style="{ height: height + 'px' }"></canvas>
    </div>

    <div v-if="showControls" class="dr-controls">
      <div class="dr-field">
        <label for="dr-count">Dados</label>
        <input
          id="dr-count"
          type="range"
          min="1"
          :max="maxCount"
          step="1"
          :value="count"
          @input="onCountInput"
        />
        <span class="dr-num">{{ count }}</span>
      </div>

      <div class="dr-field">
        <label for="dr-mark">Éxito con</label>
        <input
          id="dr-mark"
          type="range"
          min="1"
          max="6"
          step="1"
          :value="markFrom"
          @input="onMarkInput"
        />
        <span class="dr-num">{{ markFrom }}+</span>
      </div>

      <div class="dr-buttons">
        <button type="button" @click="roll(1)">Tirar</button>
        <button type="button" @click="roll(1.9)">Lanzar fuerte</button>
        <button type="button" class="dr-wide" @click="toggleView">{{ viewLabel }}</button>
      </div>

      <div class="dr-field">
        <label for="dr-bounce">Rebote</label>
        <input
          id="dr-bounce"
          type="range"
          min="0"
          max="70"
          step="1"
          :value="Math.round(bounce * 100)"
          @input="onBounceInput"
        />
        <span class="dr-num">{{ bounceLabel }}</span>
      </div>

      <p class="dr-hint">Toca un dado para relanzarlo solo. Desliza sobre el tablero para lanzar todos.</p>
    </div>
  </div>
</template>

<style scoped>
.dice-roller {
  --dr-text: #2c2c2a;
  --dr-muted: #6b6a63;
  --dr-surface: #f1efe8;
  --dr-border: rgba(44, 44, 42, 0.18);
  --dr-success: #3b6d11;
  color: var(--dr-text);
  font-family: inherit;
}
.dr-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.dr-label {
  font-size: 13px;
  color: var(--dr-muted);
}
.dr-total {
  font-size: 24px;
  font-weight: 500;
}
.dr-values {
  margin: 2px 0 10px;
  min-height: 18px;
  font-size: 13px;
  color: var(--dr-muted);
}
.dr-marked {
  color: var(--dr-success);
  font-weight: 500;
}
.dr-hits {
  color: var(--dr-success);
  font-weight: 500;
}
.dr-sep {
  color: var(--dr-muted);
  font-weight: 400;
}
.dr-stage {
  background: var(--dr-surface);
  border-radius: 12px;
  overflow: hidden;
}
.dr-stage canvas {
  display: block;
  width: 100%;
  touch-action: none;
}
.dr-controls {
  margin-top: 14px;
}
.dr-field {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.dr-field label {
  font-size: 14px;
  color: var(--dr-muted);
}
.dr-field input[type='range'] {
  flex: 1;
}
.dr-num {
  font-size: 14px;
  font-weight: 500;
  min-width: 34px;
  text-align: right;
}
.dr-buttons {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 10px;
}
.dr-buttons .dr-wide {
  grid-column: span 2;
}
.dr-buttons button {
  font: inherit;
  font-size: 14px;
  padding: 9px 12px;
  border: 1px solid var(--dr-border);
  border-radius: 8px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.dr-buttons button:hover {
  background: var(--dr-surface);
}
.dr-buttons button:active {
  transform: scale(0.98);
}
.dr-hint {
  margin: 0;
  font-size: 13px;
  color: var(--dr-muted);
}
</style>
