<template>
  <div class="mt-1 has-text-centered">
    <p class="title mb-0 has-text-white">Ubicación de jugador</p>
    <div class="column is-6 px-5">
      <div class="map-container" :style="losetaStyle">
        <!-- Puntos clicables desde la base de datos -->
        <div v-for="point in clickablePoints" :key="point.id" class="clickable-point"
          :style="{
            left: point.x + '%',
            top: point.y + '%',
            width: (point.size || 12) + 'vh',
            height: (point.size || 12) + 'vh'
          }"
          @click="handlePointClick(point)">
        </div>
        <div v-if="this.$store.state.StoreModalInteractionsOnLine == true"><modalInteractionsOnLine/></div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';
import modalInteractionsOnLine from "@/components/inPlay/modals/interactionsOnLine.vue";

export default {
  name: "ViewInPlayMap",
  components: {
    modalInteractionsOnLine
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
    
    clickablePoints() {
      return this.$store.state.datosMapa?.clickablePoints || [];
    }
  },
  
  methods: {
    // Fase 1 - Busqueda emparejamiento
    async getRandomInv(available, idZone, idUser){
      if (available == true) {
        const result2 = await apiService.getRandomInvOnLine(idZone, idUser)
        console.log(result2)
      }
    },

    handlePointClick(point) {
      // Mostrar confirmación de compra
      const textoConfirmacion = this.$store.state.lenguaje === 'español' 
        ? `¿Estás seguro de ir a "${point.name}"?`
        : `Are you sure you want to go to "${point}"?`;

      this.$buefy.dialog.confirm({
        title: this.$store.state.lenguaje === 'español' ? 'ubicacion' : 'ubication',
        message: textoConfirmacion,
        confirmText: this.$store.state.lenguaje === 'español' ? 'Confirmar' : 'Confirm',
        cancelText: this.$store.state.lenguaje === 'español' ? 'Cancelar' : 'Cancel',
        type: 'is-info',
        hasIcon: true,
        onConfirm: async () => {
          const idZone = point.id;
          const idUser = this.$store.state.IDUserHost;
          const invData = this.$store.state.datosPJactual
          const available = this.$store.state.isUserAvailable
          
          try {
            // funcion para añadir carta comprada al inventario del investigador
            const result = await apiService.postLocationInMap(idZone, idUser, invData, available)
            console.log(result)
            
            this.$buefy.toast.open({
              message: this.$store.state.lenguaje === 'español' ? `movido a ${point.name}` : `moved to ${point.name}`,
              type: 'is-success',
              duration: 3000
            });
            
          } catch (error) {
            console.log("Error al mandar la ubicacion del investigador", error);
            this.$buefy.toast.open({
              message: this.$store.state.lenguaje === 'español' ? 'Error al mandar la ubicacion del investigador' : 'Error sending investigator locations',
              type: 'is-danger'
            });
          } finally {
            setTimeout(async () => {
              this.getRandomInv(available, idZone, idUser); // Llamar a la función para obtener un investigador aleatorio
            }, 2000);
          }
        }
      });
      // Logica para mover a investigador de forma Local
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

</style>