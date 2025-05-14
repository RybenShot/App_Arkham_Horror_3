<template>
  <div class="container">
    <div class="selector" @click="toggleActive" :class="{ active: isActive }">
      <span>Seleccionar</span>
      <canvas ref="fogCanvas" class="fog-canvas"></canvas>
    </div>
    <hr>
    

    <div class="has-text-centered">
      <button class="join-btn">Unirse <img class="svgIMG" src="../../assets/img/GIFs/wired-outline-726-wireless-connection-loop-wave.gif" alt=""></button>
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
/* boton de nubes */
.join-btn {
  display: block;
  width: 80%;
  max-width: 260px;
  margin: 0.5rem auto;
  padding: 0.75rem 1rem;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  /* Animación de pulso */
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%   { transform: scale(1);     }
  50%  { transform: scale(1.05);  }
  100% { transform: scale(1);     }
}

.svgIMG{
  width: 10%;
}
</style>
