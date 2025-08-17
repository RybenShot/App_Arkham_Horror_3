<template>
  <div class="mt-1 has-text-centered">
    <p class="title mb-0 has-text-white">Ubicación de jugador</p>
    <div class="column is-6 px-5">
      <div class="map-container" :style="losetaStyle">
        <!-- Puntos clicables desde la base de datos -->
        <div 
          v-for="point in clickablePoints" 
          :key="point.id"
          class="clickable-point"
          :style="{
            left: point.x + '%',
            top: point.y + '%',
            width: (point.size || 12) + 'vh',
            height: (point.size || 12) + 'vh'
          }"
          @click="handlePointClick(point)"
          :title="point.name"
        ></div>
        
        <!-- Overlay para mostrar el modal del mapa completo -->
        <div 
          class="map-overlay" 
          @click="$store.state.modalVerLosetaMapa = true"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';

export default {
  name: "ViewInPlayMap",
  components: {
  },
  
  computed: {
    losetaStyle() {
      const fileName = this.$store.state.datosMapa.imgMap;
      return {
        width: '45vh',
        height: '45vh',
        backgroundImage: `url(/img/3-mapas/losetas/${fileName})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      };
    },
    
    // ✅ AÑADIR: Obtener puntos desde el store
    clickablePoints() {
      return this.$store.state.datosMapa?.clickablePoints || [];
    }
  },
  
  methods: {
    handlePointClick(point) {
      console.log('Punto clicado:', point);
      this.$buefy.toast.open({
          message: `Has clicado: ${point.name}`,
          type: 'is-success',
          duration: 2000,
        });
      // Tu lógica existente
      //this.$store.commit('updatePlayerLocation', point);
    }
  },
  
  mounted() {
  }
};
</script>

<style scoped>
.map-container {
  position: relative;
}

.clickable-point {
  position: absolute;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  z-index: 2;

/* Eliminar tap highlight en móviles */
  -webkit-tap-highlight-color: transparent;
  
  /* Para debugging */
  border: 2px dashed rgba(255, 0, 0, 0.5);
  background-color: rgba(255, 0, 0, 0.1);
}

.clickable-point:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.2);
  transition: all 0.2s ease;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>