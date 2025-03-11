<template>
  <div class="container">
    <div class="selector" @click="toggleActive" :class="{ active: isActive }">
      <span>Seleccionar</span>
      <canvas ref="fogCanvas" class="fog-canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import gsap from "gsap";

export default {
  setup() {
    const isActive = ref(false);
    const fogCanvas = ref(null);
    let ctx, particles = [];

    const toggleActive = () => {
      isActive.value = !isActive.value;
    };

    const initCanvas = () => {
      if (!fogCanvas.value) return;
      const canvas = fogCanvas.value;
      ctx = canvas.getContext("2d");
      canvas.width = 300;
      canvas.height = 150;

      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 20,
          opacity: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 2 + 0.5
        });
      }

      animateFog();
    };

    const animateFog = () => {
      gsap.ticker.add(() => {
        ctx.clearRect(0, 0, fogCanvas.value.width, fogCanvas.value.height);

        particles.forEach(p => {
          ctx.fillStyle = `rgba(150, 150, 150, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.speed * 0.5;
          if (p.x > fogCanvas.value.width) p.x = -p.size;
        });
      });
    };

    onMounted(() => {
      initCanvas();
    });

    watch(isActive, (newVal) => {
      if (newVal) animateFog();
    });

    return { isActive, fogCanvas, toggleActive };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #222;
}

.selector {
  position: relative;
  width: 150px;
  height: 60px;
  background-color: #444;
  color: white;
  text-align: center;
  line-height: 60px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  overflow: hidden;
}

.selector.active {
  background-color: #666;
}

.fog-canvas {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 150px;
  pointer-events: none;
}
</style>
