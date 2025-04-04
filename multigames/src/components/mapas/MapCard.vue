<template>
<router-link to="/DetalleMapa">
    <div @click="selectMapa" class="p-1">
      <div class="card" :class="{'cajaDePersonajesBase': mapa.expansion === 'AHBase', 'cajaDePersonajesMareasTenebrosas': mapa.expansion === 'AHWaves', 'cajaDePersonajesNocheCerrada': mapa.expansion === 'AHNigth', 'cajaDePersonajesSecretosDeLaOrden': mapa.expansion === 'AHSecrets'}">
            <div class="card-image-wrapper">
                <img :src="mapa.BGMap" :alt="mapa.title" class="card-image" />
            </div>
            <div class="card-overlay has-text-centered">
                <p v-if="$store.state.lenguaje === 'español'" class="title is-7 tipografiaElegante">
                    {{ mapa.title }}
                </p>
                <p v-else class="title is-7 tipografiaElegante">
                    {{ mapa.ENtitle }}
                </p>
            </div>
        </div>
    </div>
</router-link>
</template>

<script>
export default {
name: 'MapaCard',
props: {
    mapa: { type: Object, required: true }
},
methods: {
    selectMapa() {
    this.$store.state.datosMapa = this.mapa;
    }
}
};
</script>

<style>
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
.cajaimg{
  object-fit: cover;
  min-height: 80px;
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
</style>