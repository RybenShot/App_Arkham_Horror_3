<template>
  <div class="inv-wrapper">
    <div class="card" :class="{
        'cajaDePersonajesBase': investigator.expansion === 'AHBase', 
        'cajaDePersonajesMareasTenebrosas': investigator.expansion === 'AHWaves', 
        'cajaDePersonajesNocheCerrada': investigator.expansion === 'AHNigth', 
        'cajaDePersonajesSecretosDeLaOrden': investigator.expansion === 'AHSecrets',
        'cajaDePersonajesOriginal': investigator.expansion === 'AHOriginal',
        'cajaDePersonajesComunity': investigator.expansion === 'AHComunity'
        }" @click="selectInv(investigator.idInv)">
        <div class="card-icon top-left has-text-danger"><i class="fas fa-heartbeat"></i></div>
        <div class="card-icon top-right has-text-info"><i class="fas fa-brain"></i></div>

        <p class="card-number pl-2 pt-1 top-left">{{investigator.baseData.life}}</p>
        <p class="card-number pr-2 pt-1 top-right">{{investigator.baseData.sanity}}</p>

        <div class="card-image-wrapper">
            <img :src="investigator.imgInv" :alt="investigator.name" class="card-image" />
        </div>

        <div class="card-overlay has-text-centered">
            <p v-if="this.$store.state.lenguaje == 'español'" class="title is-7 tipografiaElegante">{{investigator.translations.es.name}}</p>
            <p v-else class="title is-7 tipografiaElegante">{{investigator.name}}</p>

            <p v-if="this.$store.state.lenguaje == 'español'" class="subtitle is-7">{{investigator.translations.es.position}}</p>
            <p v-else class="subtitle is-7">{{investigator.position}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';

export default {
    name: 'InvestigatorCard',
    props: {
        investigator: { type: Object, required: true }
    },
    methods:{
        async selectInv(idInv){
          try {
            const response = await apiService.obtainInvByID(idInv);
            await this.$store.commit('setDatosInvestigator', response);
            this.$router.push('/DetallePersonaje');
          } catch (error) {
            console.error("❌ selectInv(.vue) - No se pudo obtener el investigador", error);
          }
        }
    }
};
</script>

<style>
.tipografiaElegante{
  font-family: "Cinzel";
}


.marcoInv {
  position: absolute;
  top: -25px;
  left: -34px;
    /* estíralo un 50% extra hacia la derecha */
    transform-origin: left center;
    transform: scaleX(1.5);
    /* mantiene la altura al 100% del wrapper */
  height: 105%;
  z-index: 10;    /* > cualquier z-index de .card-icon, .card-overlay… */
  pointer-events: none; /* para que no bloquee clicks en la tarjeta */
}

/* Ajusta o elimina tu .marcoInv previo */

.cajaDePersonajesBase{border: 2px solid #48c78e;border-radius: 3px;}
.cajaDePersonajesMareasTenebrosas{border: 2px solid #3e8ed0; border-radius: 3px;}
.cajaDePersonajesNocheCerrada{border: 2px solid #ffdc7d;border-radius: 3px;}
.cajaDePersonajesSecretosDeLaOrden{border: 2px solid #f14668 !important;border-radius: 3px;}
.cajaDePersonajesOriginal{border: 2px solid #7957d5;border-radius: 3px;}
.cajaDePersonajesComunity{border: 2px solid hsl(17, 100%, 66%);border-radius: 3px;}

/* CLASES PARA TARJETAS */
.card {
  width: 115px;
  height: 140px;
  background: #ffffff00;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0) ;
}

.card-image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
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

.card-icon {
  position: absolute;
  font-size: 25px;
  color: #ffffff;
  z-index: 3;
}

.top-left {
  top: -3px;
  left: 3px;
}

.top-right {
  top: -3px;
  right: 3px;
}

.card-number {
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
  z-index: 3;
}
</style>