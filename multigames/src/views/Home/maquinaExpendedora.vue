<template>
  <div class="vend-container">

    <div class="vend-frame" ref="frame">
      <img
        src="@/assets/img/MaquinaEspendedora.png"
        alt="Máquina expendedora"
        class="vend-bg"
      />

      <!-- Botón de apagado (dibujado en la imagen): única forma de salir -->
      <button
        class="ov-power"
        :title="es ? 'Apagar' : 'Power off'"
        @click.stop="apagarYSalir()"
      ></button>

      <!-- Franja superior: ruleta estilo "apertura de caja" ────────────
           La mecánica de giro (mezcla, sorteo, frenada) vive en el módulo
           Ruleta (src/services/ruleta.js); este contenedor es justo el
           ".ruleta" que dicho módulo espera, con la aguja y los degradados
           de los bordes como capas propias por encima. -->
      <div class="ov-reel-screen" ref="reelStrip">
        <div class="reel-fade reel-fade-left"></div>
        <div class="reel-fade reel-fade-right"></div>
        <div class="reel-marker"></div>
      </div>

      <!-- Pantalla grande: personalidad de la máquina / resultado ────── -->
      <div class="ov-big-screen" :class="{ 'is-off': screenMode === 'off' }">
        <div v-if="productoSeleccionado && estadoMaquina === 'resultado'" class="vend-card">
          <span class="vend-card-square" :style="{ background: productoSeleccionado.color }"></span>
          <p class="vend-card-name">{{ nombreProducto(productoSeleccionado) }}</p>
        </div>
        <p
          v-else-if="screenMode !== 'off'"
          class="vend-screen-line"
          :class="{ 'is-static': screenMode === 'static' }"
          :key="screenText"
        >{{ screenText }}<span class="vend-cursor">▌</span></p>
      </div>

      <!-- Botón de pago (dibujado en la imagen) ─────────────────────── -->
      <button
        class="ov-pay-btn"
        :disabled="estadoMaquina !== 'idle'"
        :title="es ? 'Pagar' : 'Pay'"
        @click="pagar()"
      ></button>

      <!-- Bandeja de salida: aquí cae el producto ganador ────────────── -->
      <div class="ov-tray">
        <span
          v-if="bolaSaliendo"
          class="vend-capsule"
          :class="{ 'is-leaving': bolaDesapareciendo }"
          :style="{ background: colorBola }"
        ></span>
      </div>

      <!-- Monedas insertándose en la ranura, una a una ────────────────── -->
      <span
        v-for="coin in monedasCayendo"
        :key="coin.id"
        class="ov-falling-coin"
      >
        <span class="coin-3d">
          <span class="coin-face coin-face-front"></span>
          <span class="coin-face coin-face-back"></span>
          <span
            v-for="seg in coinEdgeSegments"
            :key="seg"
            class="coin-edge-seg"
            :style="{ transform: `rotateY(${seg * coinSegAngle}deg) translateZ(${coinRadius}px)` }"
          ></span>
        </span>
      </span>

    </div>

  </div>
</template>

<script>
import { Ruleta } from '@/services/ruleta.js';

// Frases de la pantalla mientras está "en reposo": mezcla de sinsentidos, idioma
// alienígena, tartamudeo, texto corrupto y advertencias absurdas.
const LINEAS_IDLE_ES = [
  'FUERA DE SERVICIO.',
  'EL PATO AZUL CANTA LOS MARTES.',
  'TU SOMBRA NO ES TUYA HOY.',
  'TRES MÁS TRES SON MORADO.',
  "K'TAHR NGY'LOTH VRR'NNAX.",
  "SSTH'YXA MORTHUUL KA'AGNI.",
  "ZUL'GORATH VEX NNGH.",
  'HO-HO-HOLA. BIEN-BIEN-VENIDO.',
  'IN-IN-INSERTE MO-MO-MONEDA.',
  'ADVERTENCIA: NO MIRAR FIJAMENTE.',
  'PROHIBIDO ALIMENTAR DESPUÉS DE MEDIANOCHE.',
  'CARGANDO... CARGANDO... CARGANDO...',
  '¿POR QUÉ ME MIRAS ASÍ?',
];
const LINEAS_IDLE_EN = [
  'OUT OF SERVICE.',
  'THE BLUE DUCK SINGS ON TUESDAYS.',
  'YOUR SHADOW IS NOT YOURS TODAY.',
  'THREE PLUS THREE IS PURPLE.',
  "K'TAHR NGY'LOTH VRR'NNAX.",
  "SSTH'YXA MORTHUUL KA'AGNI.",
  "ZUL'GORATH VEX NNGH.",
  'HE-HE-HELLO. WEL-WEL-COME.',
  'IN-IN-INSERT CO-CO-COIN.',
  'WARNING: DO NOT STARE DIRECTLY.',
  'DO NOT FEED AFTER MIDNIGHT.',
  'LOADING... LOADING... LOADING...',
  'WHY DO YOU LOOK AT ME LIKE THAT?',
];

const GLITCH_CHARS = '▓░█▒#%&@?!01<>';

// Productos de momento: cuadrados de colores (placeholder a falta de arte final).
const PRODUCTOS = [
  { id: 1, color: '#e74c3c', nombreEs: 'ROJO', nombreEn: 'RED' },
  { id: 2, color: '#3498db', nombreEs: 'AZUL', nombreEn: 'BLUE' },
  { id: 3, color: '#2ecc71', nombreEs: 'VERDE', nombreEn: 'GREEN' },
  { id: 4, color: '#f1c40f', nombreEs: 'AMARILLO', nombreEn: 'YELLOW' },
  { id: 5, color: '#9b59b6', nombreEs: 'MORADO', nombreEn: 'PURPLE' },
  { id: 6, color: '#e67e22', nombreEs: 'NARANJA', nombreEn: 'ORANGE' },
  { id: 7, color: '#1abc9c', nombreEs: 'TURQUESA', nombreEn: 'TEAL' },
  { id: 8, color: '#ecf0f1', nombreEs: 'BLANCO', nombreEn: 'WHITE' },
];

// Nº de monedas que se insertan al pagar y coste de la tirada (fijo por ahora).
const MONEDAS_POR_TIRADA = 3;

// Nº de cuadrados visibles a la vez en la ruleta: fija el ancho de cada
// cuadrado como una fracción del ancho real de la pantalla superior.
const ITEMS_VISIBLES = 5;
const SEPARACION_PX = 4;
// Duración del frenado de la ruleta.
const DURACION_GIRO_MS = 4500;

// Moneda 3D real: radio/grosor en px y nº de segmentos que forman el canto
// cilíndrico (ver .coin-edge-seg). Deben coincidir con el CSS.
const COIN_RADIUS = 8;
const COIN_SEGMENTS = 12;

let coinSeq = 0;

export default {
  name: 'MaquinaExpendedoraView',
  data() {
    return {
      screenMode: 'idle', // 'idle' | 'static' | 'off'
      screenText: '',
      estadoMaquina: 'idle', // 'idle' | 'girando' | 'resultado'
      productoSeleccionado: null,
      monedasCayendo: [],
      bolaSaliendo: false,
      bolaDesapareciendo: false,
      colorBola: '#d9b34a',
      timerIdle: null,
    };
  },
  computed: {
    es() {
      return this.$store.state.lenguaje === 'español';
    },
    coinRadius() {
      return COIN_RADIUS;
    },
    coinSegAngle() {
      return 360 / COIN_SEGMENTS;
    },
    coinEdgeSegments() {
      return Array.from({ length: COIN_SEGMENTS }, (_, i) => i);
    },
  },
  methods: {
    lineaAleatoria(lista) {
      return lista[Math.floor(Math.random() * lista.length)];
    },

    lineasIdleIdioma() {
      return this.es ? LINEAS_IDLE_ES : LINEAS_IDLE_EN;
    },

    nombreProducto(p) {
      return this.es ? p.nombreEs : p.nombreEn;
    },

    esperar(ms) {
      return new Promise(resolver => setTimeout(resolver, ms));
    },

    // Crea (o recrea, si cambia el ancho disponible) la instancia de Ruleta
    // sobre la franja superior. Nunca se toca mientras hay un giro en curso.
    montarRuleta() {
      const el = this.$refs.reelStrip;
      if (!el || !el.clientWidth || (this.ruleta && this.ruleta.girando)) return;
      if (this.ruleta) this.ruleta.destruir();
      const ancho = Math.max(20, Math.round(el.clientWidth / ITEMS_VISIBLES) - SEPARACION_PX);
      this.ruleta = new Ruleta(el, {
        cartas: PRODUCTOS,
        render: c => `<span class="reel-square" style="--c:${c.color}"></span>`,
        ancho,
        separacion: SEPARACION_PX,
        duracion: DURACION_GIRO_MS,
      });
    },

    // Pulsar "pagar": mete las monedas y, cuando terminan de caer, arranca la
    // ruleta. Bloqueada mientras hay un ciclo en curso (girando o mostrando
    // resultado): la propia Ruleta también rechaza un giro solapado, pero
    // aquí ni siquiera se lo pedimos gracias al estado de la máquina.
    async pagar() {
      if (this.estadoMaquina !== 'idle' || !this._activo || !this.ruleta) return;
      clearTimeout(this.timerIdle);
      this.productoSeleccionado = null;
      this.estadoMaquina = 'girando';
      this.screenMode = 'idle';
      this.screenText = this.es ? 'PROCESANDO PAGO...' : 'PROCESSING PAYMENT...';

      this.lanzarMonedas(MONEDAS_POR_TIRADA);
      await this.esperar((MONEDAS_POR_TIRADA - 1) * 260 + 700);
      if (!this._activo) return;

      this.screenText = this.es ? 'SELECCIONANDO...' : 'SELECTING...';
      const ganador = await this.ruleta.girar();
      if (!this._activo) return;
      this.mostrarResultado(ganador);
    },

    mostrarResultado(ganador) {
      this.estadoMaquina = 'resultado';
      this.productoSeleccionado = ganador;
      this.colorBola = ganador.color;
      this.expulsarBola();

      setTimeout(() => {
        if (this._activo) this.ocultarBola();
      }, 2600);

      setTimeout(() => {
        if (!this._activo) return;
        this.estadoMaquina = 'idle';
        this.productoSeleccionado = null;
        this.screenText = this.lineaAleatoria(this.lineasIdleIdioma());
        this.reiniciarCicloIdle();
      }, 3400);
    },

    expulsarBola() {
      this.bolaSaliendo = true;
      this.bolaDesapareciendo = false;
    },

    // Al recogerla, la bola se encoge y se desvanece, como si el jugador la
    // hubiera cogido de la bandeja.
    ocultarBola() {
      this.bolaDesapareciendo = true;
      setTimeout(() => {
        if (!this._activo) return;
        this.bolaSaliendo = false;
        this.bolaDesapareciendo = false;
      }, 500);
    },

    // Introduce las monedas una a una en la ranura.
    lanzarMonedas(cantidad) {
      for (let i = 0; i < cantidad; i++) {
        const id = coinSeq++;
        const delay = i * 260;
        setTimeout(() => {
          if (!this._activo) return;
          this.monedasCayendo.push({ id });
          setTimeout(() => {
            this.monedasCayendo = this.monedasCayendo.filter(c => c.id !== id);
          }, 650);
        }, delay);
      }
    },

    // Única salida de esta pantalla: la máquina se apaga de verdad y, un
    // instante después (mientras la pantalla se funde a negro), se vuelve
    // al menú. Bloqueado mientras la ruleta está girando.
    apagarYSalir() {
      if (this.estadoMaquina === 'girando') return;
      clearTimeout(this.timerIdle);
      this.screenMode = 'off';
      setTimeout(() => {
        if (!this._activo) return;
        this.$router.push('/');
      }, 650);
    },

    // Ráfaga de caracteres corruptos, como si la señal fallara.
    dispararEstatica() {
      this.screenMode = 'static';
      let restante = 8;
      const tick = () => {
        if (!this._activo) return;
        this.screenText = Array.from({ length: 14 }, () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]).join('');
        restante--;
        if (restante > 0) {
          setTimeout(tick, 90);
        } else {
          this.screenMode = 'idle';
          this.screenText = this.lineaAleatoria(this.lineasIdleIdioma());
          this.reiniciarCicloIdle();
        }
      };
      tick();
    },

    dispararApagadoAleatorio() {
      this.screenMode = 'off';
      setTimeout(() => {
        if (!this._activo) return;
        this.screenMode = 'idle';
        this.screenText = this.lineaAleatoria(this.lineasIdleIdioma());
        this.reiniciarCicloIdle();
      }, 1300);
    },

    siguienteEventoIdle() {
      if (!this._activo || this.estadoMaquina !== 'idle') return;
      const azar = Math.random();
      if (azar < 0.14) {
        this.dispararApagadoAleatorio();
      } else if (azar < 0.28) {
        this.dispararEstatica();
      } else {
        this.screenMode = 'idle';
        this.screenText = this.lineaAleatoria(this.lineasIdleIdioma());
        this.reiniciarCicloIdle();
      }
    },

    reiniciarCicloIdle() {
      clearTimeout(this.timerIdle);
      this.timerIdle = setTimeout(() => this.siguienteEventoIdle(), 4000);
    },
  },
  mounted() {
    this._activo = true;
    this.montarRuleta();
    window.addEventListener('resize', this.montarRuleta);
    // Lo primero que se ve al entrar es siempre el aviso de fuera de servicio;
    // luego el ciclo normal ya mezcla ésta con el resto de frases raras.
    this.screenText = this.es ? 'FUERA DE SERVICIO.' : 'OUT OF SERVICE.';
    this.reiniciarCicloIdle();
  },
  beforeUnmount() {
    this._activo = false;
    clearTimeout(this.timerIdle);
    window.removeEventListener('resize', this.montarRuleta);
    if (this.ruleta) this.ruleta.destruir();
  },
};
</script>

<style scoped>
.vend-container {
  min-height: 100vh;
  top: -8vh;
  background: #050403;
  font-family: 'Courier New', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
}

/* ── Marco de la máquina: la imagen de fondo + capas interactivas ── */
.vend-frame {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 96vh;
  aspect-ratio: 680 / 1480;
}
.vend-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  user-select: none;
  -webkit-user-drag: none;
}

/* ── Botón de apagado (invisible, ya dibujado en la imagen) ──── */
.ov-power {
  position: absolute;
  left: 80.5%;
  top: 79.2%;
  width: 9.6%;
  height: 4.4%;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

/* ── Botón de pago (invisible, ya dibujado en la imagen) ──────── */
.ov-pay-btn {
  position: absolute;
  left: 78.3%;
  top: 34.6%;
  width: 13.6%;
  height: 4.7%;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.ov-pay-btn:active { transform: scale(0.94); }
.ov-pay-btn:disabled { cursor: default; }

/* ── Franja superior: ruleta ───────────────────────────────────────────
   El módulo Ruleta (src/services/ruleta.js) inyecta ".ruleta-cinta" y sus
   ".ruleta-carta" directamente en el DOM, fuera del render de Vue, así que
   sus estilos van con :deep() para que el CSS con scope los alcance. ──── */
.ov-reel-screen {
  position: absolute;
  left: 17.65%;
  top: 24.53%;
  width: 70.59%;
  height: 6.01%;
  overflow: hidden;
}
.ov-reel-screen :deep(.ruleta-cinta) {
  display: flex;
  will-change: transform;
  height: 100%;
  align-items: center;
}
.ov-reel-screen :deep(.ruleta-carta) {
  flex: 0 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ov-reel-screen :deep(.reel-square) {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background: var(--c);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4), inset 0 0 8px rgba(0, 0, 0, 0.35);
}
.reel-marker {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  margin-left: -1px;
  background: rgba(217, 179, 74, 0.85);
  box-shadow: 0 0 6px 1px rgba(217, 179, 74, 0.75);
  pointer-events: none;
  z-index: 2;
}
.reel-fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 18%;
  pointer-events: none;
  z-index: 1;
}
.reel-fade-left {
  left: 0;
  background: linear-gradient(90deg, rgba(10, 12, 6, 0.85), rgba(10, 12, 6, 0));
}
.reel-fade-right {
  right: 0;
  background: linear-gradient(270deg, rgba(10, 12, 6, 0.85), rgba(10, 12, 6, 0));
}

/* ── Pantalla grande: personalidad / resultado ─────────────────── */
.ov-big-screen {
  position: absolute;
  left: 9.26%;
  top: 37.03%;
  width: 65.29%;
  height: 37.84%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6%;
  text-align: center;
  color: #d9b34a;
  transition: opacity 0.15s;
}
.ov-big-screen.is-off { opacity: 0; }

.vend-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: screen-fade-in 0.3s ease;
}
.vend-card-square {
  width: clamp(2rem, 16vw, 3.2rem);
  height: clamp(2rem, 16vw, 3.2rem);
  border-radius: 4px;
  box-shadow: 0 0 10px 2px rgba(217, 179, 74, 0.35);
}
.vend-card-name {
  font-size: clamp(0.62rem, 2.6vw, 0.85rem);
  letter-spacing: 0.05em;
}

.vend-screen-line {
  font-size: clamp(0.58rem, 2.4vw, 0.8rem);
  line-height: 1.5;
  animation: screen-fade-in 0.3s ease;
}
.vend-screen-line.is-static {
  color: #b89a4a;
  letter-spacing: 0.12em;
  animation: static-flicker 0.12s steps(2) infinite;
}
@keyframes screen-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes static-flicker {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
.vend-cursor { animation: cursor-blink 1s step-start infinite; }
@keyframes cursor-blink { 50% { opacity: 0; } }

/* ── Bandeja de salida ─────────────────────────────────────────── */
.ov-tray {
  position: absolute;
  left: 16.18%;
  top: 77.57%;
  width: 54.41%;
  height: 8.11%;
  overflow: visible;
}
/* La bandeja tiene perspectiva: el fondo del hueco queda arriba/al centro y el
   borde de recogida está abajo, así que la bola "nace" pequeña y en sombra
   junto al fondo y crece según rueda hacia el borde delantero. Al recogerla,
   se encoge y se desvanece hacia arriba (is-leaving). */
.vend-capsule {
  position: absolute;
  left: 50%;
  top: 10%;
  width: 15%;
  height: 32%;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  animation: capsule-emerge 1.2s cubic-bezier(0.25, 0.6, 0.35, 1) forwards;
}
.vend-capsule.is-leaving {
  animation: capsule-leave 0.5s ease-in forwards;
}
@keyframes capsule-emerge {
  0%   { top: 8%;  transform: translateX(-50%) scale(0.3); opacity: 0; filter: brightness(0.5); }
  18%  { opacity: 1; }
  65%  { top: 60%; transform: translateX(-50%) scale(1.15); filter: brightness(1); }
  82%  { top: 46%; transform: translateX(-50%) scale(0.92); }
  100% { top: 52%; transform: translateX(-50%) scale(1); opacity: 1; filter: brightness(1); }
}
@keyframes capsule-leave {
  0%   { transform: translateX(-50%) scale(1); opacity: 1; }
  100% { transform: translateX(-50%) translateY(-40%) scale(0.2); opacity: 0; }
}

/* ── Monedas insertándose en la ranura, una a una ─────────────────
   Moneda 3D de verdad (dos caras + canto cilíndrico hecho de segmentos),
   que gira de cara a canto mientras desciende en vertical y se aleja
   (encoge) hacia el interior de la ranura, hasta perderse de vista. ─── */
.ov-falling-coin {
  position: absolute;
  left: 84.2%;
  top: 44.3%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  perspective: 70px;
  animation: coin-travel 0.65s ease-in forwards;
  pointer-events: none;
}
@keyframes coin-travel {
  0%   { transform: translateY(-6px) scale(1); opacity: 0; }
  12%  { opacity: 1; }
  35%  { transform: translateY(2px) scale(0.95); opacity: 1; }
  60%  { transform: translateY(10px) scale(0.75); opacity: 1; }
  82%  { transform: translateY(16px) scale(0.4); opacity: 1; }
  100% { transform: translateY(19px) scale(0.1); opacity: 0; }
}

/* El objeto 3D: gira sobre sí mismo de cara (de frente) a canto (alineado
   con la ranura vertical) mientras la moneda cae. */
.coin-3d {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation: coin-flip-edge 0.65s ease-in forwards;
}
@keyframes coin-flip-edge {
  0%   { transform: rotateY(-25deg) rotateX(8deg); }
  30%  { transform: rotateY(20deg) rotateX(3deg); }
  100% { transform: rotateY(88deg) rotateX(0deg); }
}

.coin-face {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #f2d878, #a8801a 75%);
  border: 1px solid #6b4e12;
  backface-visibility: hidden;
}
.coin-face-front { transform: translateZ(2.5px); }
.coin-face-back  { transform: translateZ(-2.5px) rotateY(180deg); }

/* Canto cilíndrico: segmentos planos dispuestos en círculo alrededor del
   centro de la moneda (técnica estándar de "cilindro" con CSS 3D). */
.coin-edge-seg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4.5px;
  height: 5px;
  margin: -2.5px 0 0 -2.25px;
  background: linear-gradient(180deg, #f2d878, #8a6a2a);
}
</style>
