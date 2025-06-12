<template>
  <div class="map-wrapper my-1">
    <div class="card" :class="{
      'cajaDePersonajesBase': map.expansion === 'AHBase', 
      'cajaDePersonajesMareasTenebrosas': map.expansion === 'AHWaves', 
      'cajaDePersonajesNocheCerrada': map.expansion === 'AHNigth', 
      'cajaDePersonajesSecretosDeLaOrden': map.expansion === 'AHSecrets'}">
      

      <i v-if="this.map.id" class="fa-1x fas fa-times-circle has-text-danger cruzeta" @click="deleteMapInPlay()"></i>

      <div @click="selectMap()">
        <div class="card-image-wrapper">
          <img :src="map.BGMap" :alt="map.title" class="card-image" />
        </div>
        <div class="has-text-centered caja-texto">
          <p v-if="$store.state.lenguaje === 'español'" class="title is-7 tipografiaElegante">{{ map.translations.es.title }}</p>
          <p v-else class="title is-7 tipografiaElegante">{{ map.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';

export default {
  name: 'MapCard',
  props: {
      map: { type: Object, required: true }
  },
  methods: {
    async selectMap() {
      // cogemos la id del mapa
      const idMap = this.map.idMap;
      const isModalJoin = this.$store.state.modalJoinMapInPlay
      let response
      // hacemos una llamada al endpoint de buscar mapa por la id
      // si el modal mapInPlay estaba abierto, esque la llamada era para un mapa in play, si no, se llamara a un mapa normal
      // si el this.map.id existe, quiere decir que es un mapa On-Line
      if (isModalJoin || this.map.id) {
        console.log(this.map.id)
        response = await apiService.getMapInPlayByID(this.map.id);
      } else {
        response = await apiService.obtainMapByID(idMap);
      }

      if (response) {
        this.$store.commit('setDatosMapa', response);
        this.$router.push('/DetalleMapa');
      } else {
        console.error("No se pudo obtener el mapa");
      }
    },
    async deleteMapInPlay() {
      const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este mapa?");
      if (!confirmDelete) return; // No hacer nada si el usuario cancela

      try {
        const idMapInPlay = this.map.id;
        const IDUserHost = this.$store.state.IDUserHost;

        const response = await apiService.deleteMapInPlay(idMapInPlay, IDUserHost);
        console.log("Mapa borrado:", response);

        // Recargar la página actual
        location.reload();
      } catch (error) {
        console.error("Error al borrar el mapa:", error);
      }
    }

  }
};
</script>

<style scoped>
.cruzeta{
  position: absolute;
  top:2px;
  right: 2px;
  z-index: 99;
}

.cajaDePersonajesBase{
  border: 2px solid #48c78e;
  border-radius: 3px;
}
.cajaDePersonajesMareasTenebrosas{
  border: 2px solid #3e8ed0;
  border-radius: 3px;
}
.cajaDePersonajesNocheCerrada{
  border: 2px solid #ffdc7d;
  border-radius: 3px;
}
.cajaDePersonajesSecretosDeLaOrden{
  border: 2px solid #485fc7;
  border-radius: 3px;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
  z-index: 2;
}
.tipografiaElegante{
  font-family: "Cinzel";
}
.card-image{
  max-height: 130px;
}

.caja-texto{
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
  z-index: 2;
}
</style>