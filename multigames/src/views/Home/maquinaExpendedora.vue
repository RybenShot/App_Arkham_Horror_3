<template>
  <div class="vend-container">

    <div class="vend-frame">
      <img
        src="@/assets/img/MaquinaExpendedora/MaquinaExpendedorav1.png"
        alt="Máquina expendedora"
        class="vend-bg"
      />

      <!-- Botón de apagado (dibujado en la imagen): es la única forma de salir
           de esta pantalla. No hay ningún otro indicador; el jugador tiene que
           averiguar por sí mismo que "apagar" la máquina es lo que le saca de aquí. -->
      <button
        class="ov-power"
        :title="es ? 'Apagar' : 'Power off'"
        @click.stop="apagarYSalir()"
      ></button>

      <!-- Botones de selección de artículo (dibujados en la imagen) -->
      <button
        v-for="(producto, i) in productosConMisterio"
        :key="producto.id"
        class="ov-item-btn"
        :class="[`luz-${producto.estadoLuz}`, { selected: seleccionId === producto.id }]"
        :style="itemBtnStyle(i)"
        :title="es ? producto.nombreEs : producto.nombreEn"
        @click="seleccionar()"
      ></button>

      <!-- Pantalla grande: personalidad de la máquina / carta del artículo -->
      <div class="ov-big-screen" :class="{ 'is-off': screenMode === 'off' }">
        <div v-if="productoSeleccionado" class="vend-card">
          <div class="vend-card-icon"><i :class="productoSeleccionado.icon"></i></div>
          <p class="vend-card-name">{{ es ? productoSeleccionado.nombreEs : productoSeleccionado.nombreEn }}</p>
        </div>
        <p
          v-else-if="screenMode !== 'off'"
          class="vend-screen-line"
          :class="{ 'is-static': screenMode === 'static' }"
          :key="screenText"
        >{{ screenText }}<span class="vend-cursor">▌</span></p>
      </div>

      <!-- Pantalla pequeña: precio (tócala para confirmar la compra) -->
      <div
        class="ov-price-screen"
        :class="{ confirmable: seleccionId !== null }"
        @click="confirmar()"
      >
        <p class="vend-price-line">
          <template v-if="!productoSeleccionado">--</template>
          <template v-else-if="productoSeleccionado.misterioso">¿?</template>
          <template v-else>{{ productoSeleccionado.precio }} <i class="fas fa-coins"></i></template>
        </p>
      </div>

      <!-- Bandeja de salida: aquí aparece la bola del artículo -->
      <div class="ov-tray">
        <span v-if="bolaSaliendo" class="vend-capsule"></span>
      </div>

      <!-- Monedas insertándose en la ranura, una a una: moneda 3D real
           (dos caras + canto cilíndrico) que gira de cara a canto ────── -->
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

// Reacciones al confirmar una compra. Solo cosmético por ahora: la mecánica real
// de gasto de monedas / probabilidad de fallo ("a veces se traga la moneda")
// está pendiente de diseño.
const REACCIONES_ES = ['GLUP.', '...GRACIAS...', 'ALGO SE MUEVE AHÍ DENTRO.', 'ESO NO ERA PARA TI.'];
const REACCIONES_EN = ['GLURP.', '...THANK YOU...', 'SOMETHING MOVES IN THERE.', "THAT WASN'T FOR YOU."];

const GLITCH_CHARS = '▓░█▒#%&@?!01<>';

// estadoLuz: 'on' (encendido, fijo) | 'off' (fundido: producto agotado, no se
// puede elegir) | 'flicker' (parpadea de forma irregular, pero funciona).
const PRODUCTOS_BASE = [
  { id: 1, icon: 'fas fa-eye', nombreEs: 'OJO CIEGO', nombreEn: 'BLIND EYE', precio: 1, estadoLuz: 'on' },
  { id: 2, icon: 'fas fa-spider', nombreEs: 'ARAÑA SECA', nombreEn: 'DRIED SPIDER', precio: 2, estadoLuz: 'flicker' },
  { id: 3, icon: 'fas fa-brain', nombreEs: 'CEREBRO EN SAL', nombreEn: 'BRAIN IN SALT', precio: 3, estadoLuz: 'on' },
  { id: 4, icon: 'fas fa-skull', nombreEs: 'CALAVERA RIENTE', nombreEn: 'LAUGHING SKULL', precio: 4, estadoLuz: 'off' },
  { id: 5, icon: 'fas fa-hand-paper', nombreEs: 'MANO ARRUGADA', nombreEn: 'WRINKLED HAND', precio: 5, estadoLuz: 'on' },
  { id: 6, icon: 'fas fa-flask', nombreEs: 'FRASCO TURBIO', nombreEn: 'MURKY FLASK', precio: 6, estadoLuz: 'flicker' },
];
const ARTICULO_MISTERIOSO = {
  id: 99, icon: 'fas fa-question', nombreEs: '?????', nombreEn: '?????', precio: null, misterioso: true, estadoLuz: 'flicker',
};

// Posición (en % sobre la imagen de fondo, 1086×1448) de cada uno de los 7
// botones circulares ya dibujados en la máquina. TOPS es por botón (vertical,
// ya ajustado); LEFT y DIAMETRO son un único valor compartido por los 7,
// porque están todos alineados en la misma columna con el mismo tamaño.
const ITEM_BTN_TOPS = [25.70, 32.05, 38.50, 44.80, 51.2, 57.90, 64];
const ITEM_BTN_LEFT = 16.90; // % desde la izquierda del marco
const ITEM_BTN_DIAMETRO = 5.2; // % del ANCHO del marco
// El marco no es cuadrado (1086×1448), así que un % igual en ancho y alto no
// da un círculo: el alto se recalcula a partir del ancho con este factor para
// que el círculo salga siempre perfecto aunque se toque sólo ITEM_BTN_DIAMETRO.
const FRAME_ASPECT = 1086 / 1448;

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
      seleccionId: null,
      monedasCayendo: [],
      bolaSaliendo: false,
      timerIdle: null,
    };
  },
  computed: {
    es() {
      return this.$store.state.lenguaje === 'español';
    },
    productosConMisterio() {
      return [...PRODUCTOS_BASE, ARTICULO_MISTERIOSO];
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
    productoSeleccionado() {
      return this.productosConMisterio.find(p => p.id === this.seleccionId) || null;
    },
  },
  methods: {
    itemBtnStyle(i) {
      return {
        left: ITEM_BTN_LEFT + '%',
        top: ITEM_BTN_TOPS[i] + '%',
        width: ITEM_BTN_DIAMETRO + '%',
        height: (ITEM_BTN_DIAMETRO * FRAME_ASPECT) + '%',
        // desincroniza el parpadeo entre botones para que no titilen a la vez
        animationDelay: `${-i * 0.9}s`,
      };
    },

    lineaAleatoria(lista) {
      return lista[Math.floor(Math.random() * lista.length)];
    },

    lineasIdleIdioma() {
      return this.es ? LINEAS_IDLE_ES : LINEAS_IDLE_EN;
    },

    // La máquina está fuera de servicio: todavía no se puede comprar nada de
    // verdad. Pulsar cualquier botón sólo avisa de que está en camino; la
    // mecánica real de selección/compra (carta, precio, monedas, bola) se
    // deja intacta más abajo para cuando se active.
    seleccionar() {
      clearTimeout(this.timerIdle);
      this.seleccionId = null;
      this.screenMode = 'idle';
      this.screenText = this.es ? 'PRÓXIMAMENTE DISPONIBLE.' : 'COMING SOON.';
      this.reiniciarCicloIdle();
    },

    // TODO: aquí irá la mecánica real (gasto de monedas, probabilidad de "tragarse"
    // la moneda sin dar nada, recompensas...). De momento es solo la reacción visual.
    confirmar() {
      if (this.seleccionId === null || !this._activo) return;
      const producto = this.productoSeleccionado;
      if (!producto) return;

      this.lanzarMonedas(producto.misterioso ? 3 : producto.precio);
      this.expulsarBola();
      this.seleccionId = null;

      setTimeout(() => {
        if (!this._activo) return;
        this.screenMode = 'idle';
        this.screenText = this.lineaAleatoria(this.es ? REACCIONES_ES : REACCIONES_EN);
        this.reiniciarCicloIdle();
      }, 700);
    },

    expulsarBola() {
      this.bolaSaliendo = true;
      setTimeout(() => {
        if (this._activo) this.bolaSaliendo = false;
      }, 1200);
    },

    // Introduce las monedas una a una en la ranura: tantas como cueste el
    // artículo (el misterioso, al no tener precio conocido, mete 3 "a ciegas").
    lanzarMonedas(cantidad) {
      const n = Math.min(cantidad, 8);
      for (let i = 0; i < n; i++) {
        const id = coinSeq++;
        const delay = i * 260;
        setTimeout(() => {
          if (!this._activo) return;
          this.monedasCayendo.push({ id });
          setTimeout(() => {
            this.monedasCayendo = this.monedasCayendo.filter(c => c.id !== id);
          }, 550);
        }, delay);
      }
    },

    // Única salida de esta pantalla: la máquina se apaga de verdad y, un
    // instante después (mientras la pantalla se funde a negro), se vuelve
    // al menú. No hay ningún otro botón ni pista para salir.
    apagarYSalir() {
      clearTimeout(this.timerIdle);
      this.seleccionId = null;
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
      if (!this._activo || this.seleccionId !== null) return;
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
    // Lo primero que se ve al entrar es siempre el aviso de fuera de servicio;
    // luego el ciclo normal ya mezcla ésta con el resto de frases raras.
    this.screenText = this.es ? 'FUERA DE SERVICIO.' : 'OUT OF SERVICE.';
    this.reiniciarCicloIdle();
  },
  beforeUnmount() {
    this._activo = false;
    clearTimeout(this.timerIdle);
  },
};
</script>

<style scoped>
.vend-container {
  min-height: 100vh;
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
  max-width: 460px;
  aspect-ratio: 1086 / 1448;
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
  left: 14.5%;
  top: 8.5%;
  width: 7.5%;
  height: 5.5%;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

/* ── Botones de artículo (invisibles, ya dibujados en la imagen) ── */
.ov-item-btn {
  position: absolute;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: box-shadow 0.15s ease;
}
.ov-item-btn:active { transform: scale(0.92); }

/* Cada botón se comporta como una bombilla real y distinta de las demás:
   encendida fija, fundida (agotado) o parpadeando de forma irregular. */
.ov-item-btn.luz-on {
  box-shadow: 0 0 4px 1px rgba(255, 224, 124, 0.671), 0 0 9px 2px rgba(230, 90, 60, 0.35);
}
.ov-item-btn.luz-off {
  background: rgba(0, 0, 0, 0.32);
}
.ov-item-btn.luz-flicker {
  animation: btn-glow-flicker 4.3s linear infinite;
}
@keyframes btn-glow-flicker {
  0%   { box-shadow: 0 0 4px 1px rgba(255, 224, 124, 0.671), 0 0 9px 2px rgba(230, 90, 60, 0.35); }
  3%   { box-shadow: none; }
  5%   { box-shadow: 0 0 4px 1px rgba(255, 224, 124, 0.671), 0 0 9px 2px rgba(230, 90, 60, 0.35); }
  8%   { box-shadow: none; }
  9%   { box-shadow: 0 0 2px 1px rgba(210, 60, 45, 0.25); }
  10%  { box-shadow: none; }
  12%  { box-shadow: 0 0 4px 1px rgba(255, 224, 124, 0.671), 0 0 9px 2px rgba(230, 90, 60, 0.35); }
  46%  { box-shadow: 0 0 4px 1px rgba(255, 224, 124, 0.671), 0 0 9px 2px rgba(230, 90, 60, 0.35); }
  48%  { box-shadow: none; }
  51%  { box-shadow: 0 0 10px 3px rgba(230, 90, 60, 0.75); }
  53%  { box-shadow: 0 0 4px 1px rgba(255, 224, 124, 0.671), 0 0 9px 2px rgba(230, 90, 60, 0.35); }
  74%  { box-shadow: 0 0 4px 1px rgba(255, 224, 124, 0.671), 0 0 9px 2px rgba(230, 90, 60, 0.35); }
  75%  { box-shadow: none; }
  78%  { box-shadow: 0 0 4px 1px rgba(255, 224, 124, 0.671), 0 0 9px 2px rgba(230, 90, 60, 0.35); }
  100% { box-shadow: 0 0 4px 1px rgba(255, 224, 124, 0.671), 0 0 9px 2px rgba(230, 90, 60, 0.35); }
}

/* Brillo dorado al seleccionar, por encima de cualquier estado de luz previo */
.ov-item-btn.selected {
  animation: btn-glow-selected 1.6s ease-in-out infinite;
}
@keyframes btn-glow-selected {
  0%, 100% { box-shadow: 0 0 4px 2px rgba(217, 179, 74, 0.75), 0 0 10px 4px rgba(217, 179, 74, 0.4); }
  50%      { box-shadow: 0 0 8px 3px rgba(217, 179, 74, 0.95), 0 0 18px 7px rgba(217, 179, 74, 0.65); }
}

/* ── Pantalla grande: personalidad / carta del artículo ───────── */
.ov-big-screen {
  position: absolute;
  left: 49.2%;
  top: 18%;
  width: 34%;
  height: 28.2%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4%;
  text-align: center;
  color: #d9b34a;
  transition: opacity 0.15s;
}
.ov-big-screen.is-off { opacity: 0; }

.vend-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: screen-fade-in 0.3s ease;
}
.vend-card-icon {
  font-size: clamp(1.6rem, 8vw, 2.4rem);
  color: rgba(212, 175, 74, 0.85);
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

/* ── Pantalla pequeña: precio (tocar para confirmar) ──────────── */
.ov-price-screen {
  position: absolute;
  left: 56%;
  top: 52.5%;
  width: 21.8%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}
.ov-price-screen.confirmable { cursor: pointer; }
.vend-price-line {
  color: #d9b34a;
  font-size: clamp(0.75rem, 3.4vw, 1.05rem);
  font-weight: 700;
}

/* ── Bandeja de salida ─────────────────────────────────────────── */
.ov-tray {
  position: absolute;
  left: 28.5%;
  top: 76.3%;
  width: 59.5%;
  height: 12.8%;
  overflow: visible;
}
/* La bandeja tiene perspectiva: el fondo del hueco queda arriba/al centro y el
   borde de recogida está abajo, así que la bola "nace" pequeña y en sombra
   junto al fondo y crece según rueda hacia el borde delantero. */
.vend-capsule {
  position: absolute;
  left: 50%;
  top: 10%;
  width: 15%;
  height: 32%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #d9b34a, #8a6a2a 70%);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  animation: capsule-emerge 1.2s cubic-bezier(0.25, 0.6, 0.35, 1) forwards;
}
@keyframes capsule-emerge {
  0%   { top: 8%;  transform: translateX(-50%) scale(0.3); opacity: 0; filter: brightness(0.5); }
  18%  { opacity: 1; }
  65%  { top: 60%; transform: translateX(-50%) scale(1.15); filter: brightness(1); }
  82%  { top: 46%; transform: translateX(-50%) scale(0.92); }
  100% { top: 52%; transform: translateX(-50%) scale(1); opacity: 1; filter: brightness(1); }
}

/* ── Monedas insertándose en la ranura, una a una ─────────────────
   Moneda 3D de verdad (dos caras + canto cilíndrico hecho de segmentos),
   que gira de cara a canto mientras desciende en vertical y se aleja
   (encoge) hacia el interior de la ranura, hasta perderse de vista. ─── */
.ov-falling-coin {
  position: absolute;
  left: 69.2%;
  top: 57%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  perspective: 70px;
  animation: coin-travel 4s ease-in forwards;
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
  animation: coin-flip-edge 4s ease-in forwards;
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
