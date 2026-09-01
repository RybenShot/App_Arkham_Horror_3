<template>
  <div class="dice-roller-canvas">
    <canvas ref="canvasEl"></canvas>
  </div>
</template>

<script>
import DiceEngine from "./diceEngine.js";
import DiceSound from "./diceSound.js";
import { getDiceSkin, loadImage } from "./diceSkins.js";

export default {
  name: "DiceRollerCanvas",
  props: {
    // Nº de dados a mostrar/lanzar
    count: { type: Number, default: 1 },
    // Valor a partir del cual un dado se tiñe de verde y suelta confeti
    successThreshold: { type: Number, default: 6 }
  },
  emits: ["settled"],
  computed: {
    soundEnabled() {
      return !!this.$store.state.PistasAudio.EfectoInmersion;
    },
    // Diseño elegido en Ajustes (ver diceSkins.js)
    skin() {
      return getDiceSkin(this.$store.state.tipoDadoSkin);
    },
    // Sólo relevante para skins tipo 'pool' (p.ej. el clásico): recalcula si
    // cambian las imágenes propias que el jugador tiene subidas
    poolSources() {
      if (this.skin.type !== "pool" || !this.skin.buildPool) return [];
      return this.skin.buildPool(this.$store);
    }
  },
  watch: {
    count(n) {
      this.engine?.setCount(n);
    },
    successThreshold(v) {
      this.engine?.setMarkFrom(v);
    },
    soundEnabled(on) {
      this.audio?.setEnabled(on);
    },
    poolSources() {
      if (this.skin.type === "pool") this.preloadFaceImages();
    }
  },
  mounted() {
    this.preloadFaceImages();
    this.audio = new DiceSound({ enabled: this.soundEnabled, volume: 0.5 });
    this.engine = new DiceEngine(this.$refs.canvasEl, {
      count: this.count,
      view: "top",
      interactive: false,
      showBoard: false,
      markFrom: this.successThreshold,
      faceImagePool: this.faceImagePool || [],
      faceTextures: this.faceTextures || null,
      theme: this.skin.theme,
      onImpact: (e) => this.audio?.impact(e),
      onSettled: (result) => {
        this.$emit("settled", result);
      }
    });
    this.engine.start();
  },
  beforeUnmount() {
    this.engine?.destroy();
    this.engine = null;
    this.audio?.destroy();
    this.audio = null;
  },
  methods: {
    // Lanza los dados actuales; debe llamarse desde un gesto real del usuario
    // (click del botón "TIRAR!") para que el navegador permita el audio.
    roll() {
      this.audio?.unlock();
      this.audio?.throwDice();
      this.engine?.roll(1);
    },
    // Prepara las texturas de las 6 caras según el diseño elegido en Ajustes
    preloadFaceImages() {
      const skin = this.skin;
      if (skin.type === "atlas") {
        const img = loadImage(skin.atlas.src);
        this.faceTextures = Object.fromEntries(
          Object.entries(skin.atlas.rects).map(([val, [sx, sy]]) => [
            val,
            { img, sx, sy, sw: skin.atlas.tile.w, sh: skin.atlas.tile.h, inset: skin.atlas.inset }
          ])
        );
        this.faceImagePool = [];
      } else {
        // 'pool': una imagen por dado (al azar), sólo en la cara del 6
        this.faceTextures = null;
        this.faceImagePool = this.poolSources.map((src) => loadImage(src));
      }
      this.engine?.setFaceTextures(this.faceTextures);
      this.engine?.setFaceImagePool(this.faceImagePool);
    }
  }
};
</script>

<style scoped>
.dice-roller-canvas,
.dice-roller-canvas canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
