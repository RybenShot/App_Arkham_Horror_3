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
        
        <!-- Modal de interacciones online (HOST) -->
        <div v-if="this.$store.state.StoreModalInteractionsOnLine == true">
          <modalInteractionsOnLine 
            :foundUser="foundUserData" 
            :currentZone="currentZoneData"
            @interaction-created="onInteractionCreated"
          />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';
import { hostPollingService } from '@/services/hostPollingService.js';
import modalInteractionsOnLine from "@/components/inPlay/modals/interactionsOnLine.vue";

export default {
  name: "ViewInPlayMap",
  components: {
    modalInteractionsOnLine
  },
  
  data() {
    return {
      foundUserData: null,
      currentZoneData: null,
    };
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

    // Fase 1 - Búsqueda emparejamiento (HOST)
    async getRandomInv(available, idZone, idUser) {
      if (available == true) {
        try {
          const result = await apiService.getRandomInvOnLine(idZone, idUser);
          console.log('Resultado búsqueda:', result);
          
          if (result.user) {
            // Si encuentra un usuario, preparar datos y mostrar modal
            this.foundUserData = result.user;
            this.currentZoneData = idZone;
            this.$store.state.StoreModalInteractionsOnLine = true;
          } else {
            // Si no encuentra usuario, mostrar mensaje
            this.$buefy.toast.open({
              message: this.$store.state.lenguaje === 'español' ? 'No hay otros investigadores en esta zona' : 'No other investigators in this area',
              type: 'is-info',
              duration: 3000
            });
          }
        } catch (error) {
          console.error('Error en búsqueda de usuario:', error);
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' ? 'Error al buscar otros investigadores' : 'Error searching for other investigators',
            type: 'is-danger',
            duration: 3000
          });
        }
      }
    },

    // Callback cuando se crea una interacción desde el modal (HOST)
    onInteractionCreated(interactionResult) {
      console.log('Interacción creada:', interactionResult);
      
      // Iniciar polling para esperar respuesta del GUEST
      const interactionId = interactionResult.idInteraction;
      const userId = this.$store.state.IDUserHost;
      
      hostPollingService.startPolling(interactionId, userId);
      
      this.$buefy.toast.open({
        message: this.$store.state.lenguaje === 'español' ? 'Invitación enviada. Esperando respuesta...' : 'Invitation sent. Waiting for response...',
        type: 'is-info',
        duration: 5000
      });
    },

    handlePointClick(point) {
      // Mostrar confirmación de ubicación
      const textoConfirmacion = this.$store.state.lenguaje === 'español' ? `¿Estás seguro de ir a "${point.name}"?` : `Are you sure you want to go to "${point.name}"?`;

      this.$buefy.dialog.confirm({
        title: this.$store.state.lenguaje === 'español' ? 'Ubicación' : 'Location',
        message: textoConfirmacion,
        confirmText: this.$store.state.lenguaje === 'español' ? 'Confirmar' : 'Confirm',
        cancelText: this.$store.state.lenguaje === 'español' ? 'Cancelar' : 'Cancel',
        type: 'is-info',
        hasIcon: true,
        onConfirm: async () => {
          const idZone = point.id;
          const idUser = this.$store.state.IDUserHost;
          const invData = this.$store.state.datosPJactual;
          const available = this.$store.state.isUserAvailable;
          
          try {
            // función para mover al investigador
            const result = await apiService.postLocationInMap(idZone, idUser, invData, available);
            console.log('Movimiento realizado:', result);
            
            this.$buefy.toast.open({
              message: this.$store.state.lenguaje === 'español' ? `Movido a ${point.name}` : `Moved to ${point.name}`,
              type: 'is-success',
              duration: 3000
            });
            
          } catch (error) {
            console.log("Error al mandar la ubicación del investigador", error);
            this.$buefy.toast.open({
              message: this.$store.state.lenguaje === 'español' ? 'Error al mandar la ubicación del investigador' : 'Error sending investigator locations',
              type: 'is-danger'
            });
          } finally {
            setTimeout(async () => {
              // Llamada a la función para obtener un investigador aleatorio
              this.getRandomInv(available, idZone, idUser); 
            }, 2000);
          }
        }
      });
    }
  },
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