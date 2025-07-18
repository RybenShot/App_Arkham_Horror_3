<template>
  <section class="columns is-mobile pt-3">
    <!-- Columna izquierda: Imagen con marco y texto superpuesto -->
    <div class="column image">
      <div class="image-container">
        <!-- Marco ornamental -->
        <div class="ornamental-frame">
          <div class="corner-diamond tl">◆</div>
          <div class="corner-diamond tr">◆</div>
          <div class="corner-diamond bl">◆</div>
          <div class="corner-diamond br">◆</div>
          <div class="frame-line top"></div>
          <div class="frame-line bottom"></div>
          <div class="frame-line left"></div>
          <div class="frame-line right"></div>
        </div>
        
        <!-- Imagen SIN el borde original -->
        <img :src="this.$store.state.datosPJactual.imgInv" class=" investigator-image">
        
        <!-- Texto superpuesto en la parte inferior -->
        <div class="text-overlay">
          <p class="investigator-name">{{ this.$store.state.datosPJactual.name }}</p>
          <p class="investigator-position">{{ textoInterfaz.posicion }}</p>
        </div>
      </div>
    </div>

    <div class="column has-text-white mt-6">
      <div>
        <p class="title is-4 has-text-weight-bold has-text-centered has-text-white mb-0">Datos Basicos</p>
        <hr class="mx-4 my-1">
      </div>

      <div class="has-text-centered mt-4 mr-2">
        <div class="columns is-mobile">
          <div class="column p-0 py-1" id="barraDerechaAbajo" @click="openModalPertenences()">
            <i class="fas fa-suitcase"></i>
            <p>{{ textoInterfaz.pertenencias }}</p>
          </div>
          <div class="column p-0 py-1" @click="this.$store.state.modalHistoriaDetalle = true">
            <i class="fas fa-id-card"></i>
            <p>{{ textoInterfaz.historia }}</p>
          </div>
        </div>

        <div class="columns is-mobile" @click="this.$store.state.modalArquetipoDetalle = true">
          <div class="column p-0 py-1">
            <i class="fas fa-bolt"></i>
            <p>{{ textoInterfaz.arquetipo }}</p>
          </div>
          <div class="column p-0 py-1" id="barraIzquierdaArriba">
            <i class="fas fa-money-bill-wave"></i>
            <p>{{ this.$store.state.datosPJactual.atributes.money }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Datos Basicos Detalle",
  data(){
    return{
      textoInterfaz: {
        pertenencias: "",
        historia: "",
        arquetipo: "",
        posicion: "",
      }
    }
  },
  methods:{
    openModalPertenences(){
      this.$store.state.modalPertenenciasDetalle = true;
    },
    redireccionarTemporalmente(){
      this.$router.push('/enproceso');
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.pertenencias = "Pertenencias";
        this.textoInterfaz.historia = "Historia";
        this.textoInterfaz.arquetipo = "Arquetipo";
        this.textoInterfaz.posicion = this.$store.state.datosPJactual.translations.es.position;

      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.pertenencias = "Belongings";
        this.textoInterfaz.historia = "History";
        this.textoInterfaz.arquetipo = "Archetype";
        this.textoInterfaz.posicion = this.$store.state.datosPJactual.position;
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style scoped>
/* Estilos originales mantenidos */
.bordeImagen{
  border: thick double #F2C94C;
}

#barraDerechaAbajo{
  border-right: solid 2px;
  border-bottom: solid 2px
}

#barraIzquierdaArriba{
  border-left: solid 2px;
  border-top: solid 2px
}

/* Nuevos estilos para el marco y texto superpuesto */
.image-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

/* Marco ornamental ajustado a la imagen */
.ornamental-frame {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.corner-diamond {
  position: absolute;
  font-size: 1.2rem;
  color: #F2C94C;
  text-shadow: 0 0 8px rgba(242, 201, 76, 0.8);
  z-index: 3;
  animation: diamond-glow 2s ease-in-out infinite alternate;
  
}

.corner-diamond.tl {
  top: -14px;
  left: -6px;
}

.corner-diamond.tr {
  top: -14px;
  right: -8px;
}

.corner-diamond.bl {
  bottom: -14px;
  left: -6px;
}

.corner-diamond.br {
  bottom: -14px;
  right: -6px;
}

.frame-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, #F2C94C, transparent);
  animation: line-pulse 3s ease-in-out infinite;
}

.frame-line.top,
.frame-line.bottom {
  height: 2px;
  left: 10px;
  right: 10px;
}

.frame-line.top {
  top: 0;
}

.frame-line.bottom {
  bottom: 0;
}

.frame-line.left,
.frame-line.right {
  width: 2px;
  top: 10px;
  bottom: 10px;
  background: linear-gradient(180deg, transparent, #F2C94C, transparent);
}

.frame-line.left {
  left: 0;
}

.frame-line.right {
  right: 0;
}

/* Animaciones del marco */
@keyframes diamond-glow {
  0% {
    text-shadow: 0 0 8px rgba(242, 201, 76, 0.8);
  }
  100% {
    text-shadow: 0 0 15px rgba(242, 201, 76, 1);
  }
}

@keyframes line-pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 10px rgba(242, 201, 76, 0.5);
  }
}

/* Imagen */
.investigator-image {
  position: relative;
  max-width: 98%;
  max-height: 98%;
  top: 3px;
  left: 3px;
}

/* Texto superpuesto */
.text-overlay {
  position: absolute;
  bottom: 1px;
  left: 0;
  right: 0;
  text-align: center;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding-bottom: 1rem;
}

.investigator-name {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  line-height: 1.1;
}

.investigator-position {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  margin: 0;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
}
</style>