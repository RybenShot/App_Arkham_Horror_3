<template>
     <div >
      <div class="mx-2 container allWindow card">
        <!-- TITULO-->
        <h2 class="title titleDecoration is-4 pt-3 mb-3">Enemigos</h2>
        <hr class="my-1">

        <!-- ModalDetalle -->
        <div v-if="this.$store.state.verDetalleEnemigo == true">
          <ModalDetalleEnemigo/>
        </div> <!-- end ModalDetalleEnemigo -->

        <div v-if="this.$store.state.contadorMapa == 0">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa1" :key="item.id">
              <div @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white  titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Bestia alterada" ||  
                        item.nombreEnemigo === "Esclava mostruosa" || 
                        item.nombreEnemigo === "Secuestrador al acecho" ||
                        item.nombreEnemigo === "Endriago de río" ||
                        item.nombreEnemigo === "Matón híbrido" ||
                        item.nombreEnemigo === "Depredador de bajamar" ||
                        item.nombreEnemigo === "Vástago del océano"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 1  -->

        <div v-if="this.$store.state.contadorMapa == 1">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa2" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Secuestrador al acecho" ||
                        item.nombreEnemigo === "Tocado por el vacío" ||
                        item.nombreEnemigo === "Transeúnte asustado"
                        '> X2</p>
                <p class="has-text-danger  titleDecoration2 pt-0" v-if= ' item.nombreEnemigo === "Extraños con túnicas"'> X3</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 2  -->

        <div v-if="this.$store.state.contadorMapa == 2">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa3" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Esclava mostruosa" ||  
                        item.nombreEnemigo === "Prisionero del hielo" ||
                        item.nombreEnemigo === "Siervo alterado" ||
                        item.nombreEnemigo === "Sonánbulo maldito" ||
                        item.nombreEnemigo === "Transeúnte asustado"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 3  -->

        <div v-if="this.$store.state.contadorMapa == 3">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa4" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Depredador de bajamar" ||  
                        item.nombreEnemigo === "Mago ceremonial" ||
                        item.nombreEnemigo === "Soñador colérico" ||
                        item.nombreEnemigo === "Sonánbulo maldito" ||
                        item.nombreEnemigo === "Transeúnte asustado"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 4  -->

        <h2 class="title titleDecoration is-4 pt-3 mb-3">Enemigos extras</h2>
        <hr class="my-1">

        <div v-if="this.$store.state.contadorMapa == 0">
          <p class="has-text-white p-2">Crea el mazo de TERROR usando las cartas de 'Frenesí devorador'</p>
        </div><!-- end IF MAPA 1  -->

        <div v-if="this.$store.state.contadorMapa == 1">
          <p class="has-text-white p-2"> Crea el mazo de Anomalias utilizando las cartas de ''Visiones de la luna''</p>

          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosExtrasMapa2" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" width="100" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 2  -->

        <div v-if="this.$store.state.contadorMapa == 2">
          <p class="has-text-white p-2">Crea el mazo de Terror utilizando las cartas de ''Ciudad helada''</p>
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosExtrasMapa3" :key="item.id">
              <div style="max-width: 100px" class="mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" width="100" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 3  -->

        <div v-if="this.$store.state.contadorMapa == 3">
          <p class="has-text-white p-2">Sin enemigos extras</p>
        </div><!-- end IF MAPA 4  -->

        <div class="columns is-mobile  mt-4">
          <p class="column"></p>
          <div class="column"><button 
          @click="cambiarVista(true)" 
          class="button is-success has-text-black p-5">Volver a Mapas</button></div>
          <p class="column"></p>
        </div>
        
      </div>
    </div>
</template>

<script>
import ModalDetalleEnemigo from "@/components/helpers/DetalleEnemigo.vue"

export default {
  name: "enemigosAHMareasTenebrosasComponente",
  components:{
    ModalDetalleEnemigo
  },
  data(){
    return {
      EnemigosMapa1: [
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo35.jpg"),nombreEnemigo: "Bestia alterada",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo31.jpg"),nombreEnemigo: "Esclava mostruosa",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT2.jpg"),nombreEnemigo: "Secuestrador al acecho",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT11.jpg"),nombreEnemigo: "Híbrido embelesado",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT13.jpg"),nombreEnemigo: "Cazador impetuoso",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo26.jpg"),nombreEnemigo: "Cantor marino",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo25.jpg"),nombreEnemigo: "Endriago de río",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo24.jpg"),nombreEnemigo: "Matón híbrido",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo23.jpg"),nombreEnemigo: "Depredador de bajamar",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo22.jpg"),nombreEnemigo: "Vástago del océano",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo21.jpg"),nombreEnemigo: "Bestia de la ribera",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo20.jpg"),nombreEnemigo: "Titán de la marea",}
      ],
      EnemigosExtrasMapa1: [],

      EnemigosMapa2: [
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT7.jpg"),nombreEnemigo: "Bestia guardiana",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo13.jpg"),nombreEnemigo: "Extraños con túnicas",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT2.jpg"),nombreEnemigo: "Secuestrador al acecho",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo32.jpg"),nombreEnemigo: "Tocado por el vacío",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT6.jpg"),nombreEnemigo: "Transeúnte asustado",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT1.jpg"),nombreEnemigo: "Carroñero planeador",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT3.jpg"),nombreEnemigo: "Byakhee rondador",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT8.jpg"),nombreEnemigo: "Amo devorador",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT14.jpg"),nombreEnemigo: "Esclavista cruel",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT15.jpg"),nombreEnemigo: "Señor de la lividez",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo11.jpg"),nombreEnemigo: "Byakhee veloz",},
      ],
      EnemigosExtrasMapa2: [{url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT9.jpg"),nombreEnemigo: "Declan Pearce",},],

      EnemigosMapa3: [
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo15.jpg"),nombreEnemigo: "Depredador hambriento",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo31.jpg"),nombreEnemigo: "Esclava mostruosa",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo36.jpg"),nombreEnemigo: "Esclavo aviar",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo33.jpg"),nombreEnemigo: "Esclavo lobuno",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT16.jpg"),nombreEnemigo: "Prisionero del hielo",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo34.jpg"),nombreEnemigo: "Siervo alterado",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT5.jpg"),nombreEnemigo: "Sonánbulo maldito",},
        
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT6.jpg"),nombreEnemigo: "Transeúnte asustado",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT4.jpg"),nombreEnemigo: "Sombra pavorosa",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT7.jpg"),nombreEnemigo: "Bestia guardiana",},
      ],
      EnemigosExtrasMapa3: [],

      EnemigosMapa4: [
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo21.jpg"),nombreEnemigo: "Bestia de la ribera",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo26.jpg"),nombreEnemigo: "Cantor marino",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo23.jpg"),nombreEnemigo: "Depredador de bajamar",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo12.jpg"),nombreEnemigo: "Mago ceremonial",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo17.jpg"),nombreEnemigo: "Sumo sacerdote",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT5.jpg"),nombreEnemigo: "Sonánbulo maldito",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT6.jpg"),nombreEnemigo: "Transeúnte asustado",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT10.jpg"),nombreEnemigo: "Soñador colérico",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT11.jpg"),nombreEnemigo: "Híbrido embelesado",},
        {url: require("@/assets/img/Games/AHMareasTenebrosas/4imgEnemigos/enemigoMT12.jpg"),nombreEnemigo: "Cantor supremo de R´lyeh",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo19.jpg"),nombreEnemigo: "Guardián de R´lyeh",},
],
    }
  }, // end data
  methods:{
    cambiarVista(ValueCambiarVista){
      this.$emit('cambiarVistaHijo', ValueCambiarVista)
    } // end cambiaVista
  }
}
</script>

<style>
@font-face {
  font-family: tituloEnemigos;
  src: url("@/assets/fonts/enemigos/tipografiaEnemigos.ttf");
}

.titleDecoration2 {
  -webkit-text-stroke: 0,1px rgb(255, 255, 255)!important;
  color: black;
  font-family: "tituloEnemigos", sans-serif;
  letter-spacing: 1px;
  line-height: 1rem;
  font-size: 0.8rem!important;
  text-align: center;
}

/* ENEMIGOS */
#enemisList {
  display: grid;
  grid-template-columns: auto auto auto;
}
</style>