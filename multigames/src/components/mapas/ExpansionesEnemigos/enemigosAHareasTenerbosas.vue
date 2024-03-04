<template>
     <div >
      <div class="mx-2 container allWindow has-background-dark">
        <!-- TITULO-->

        <header class="modal-card-head BGEnemigos mb-3">
          <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light" v-if="this.$store.state.lenguaje == 'español'">Enemigos</h2>
          <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light" v-if="this.$store.state.lenguaje == 'ingles'">Enemies</h2>
        </header>

        <!-- ModalDetalle -->
        <div v-if="this.$store.state.verDetalleEnemigo == true"><ModalDetalleEnemigo/></div>

        <div v-if="this.$store.state.datosMapa.idMapa == 4">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa1" :key="item.id">
              <div @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = item.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ item.nombreEnemigo }}</p>
                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ item.ENnombreEnemigo }}</p>

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
        </div><!-- end IF MAPA 4  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 5">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa2" :key="item.id">
              <div @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = item.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ item.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ item.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Secuestrador al acecho" ||
                        item.nombreEnemigo === "Tocado por el vacío" ||
                        item.nombreEnemigo === "Transeúnte asustado"
                        '> X2</p>
                <p class="has-text-danger  titleDecoration2 pt-0" v-if= ' item.nombreEnemigo === "Extraños con túnicas"'> X3</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 5  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 6">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa3" :key="item.id">
              <div @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = item.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ item.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ item.ENnombreEnemigo }}</p>

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
        </div><!-- end IF MAPA 6  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 7">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa4" :key="item.id">
              <div @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = item.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ item.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ item.ENnombreEnemigo }}</p>

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
        </div><!-- end IF MAPA 7  -->

        <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light has-text-centered" v-if="this.$store.state.lenguaje == 'español'">Enemigos extras</h2>
        <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'">Extra enemies</h2>
        <hr class="my-1">

        <div v-if="this.$store.state.datosMapa.idMapa == 4">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'">Crea el mazo de TERROR usando las cartas de 'Frenesí devorador'</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'">Create the TERROR deck using 'Devouring Frenzy' cards</p>
        </div><!-- end IF MAPA 4  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 5">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'"> Crea el mazo de Anomalias utilizando las cartas de "Visiones de la luna"</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'"> Create the Anomalies deck using "Visions of the Moon" cards</p>

          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosExtrasMapa2" :key="item.id">
              <div @click="(this.$store.state.verDetalleEnemigo = true),(this.$store.state.SeleccionarURLEnemigo = item.url)" class="helperCartasEnemigos mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" width="100" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ item.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ item.ENnombreEnemigo }}</p>

              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 5  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 6">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'">Crea el mazo de Terror utilizando las cartas de "Ciudad helada"</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'">Create the Terror deck using "Frost City" cards</p>

          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosExtrasMapa3" :key="item.id">
              <div class="helperCartasEnemigos mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" width="100" />
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ item.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ item.ENnombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 6  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 7">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'">Sin enemigos extras</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'">No extra enemies</p>
        </div><!-- end IF MAPA 7  -->
        
        <!-- BOTON -->
        <div class="columns is-mobile  mt-4">
          <p class="column"></p>
          <div class="column">
            <button @click="(this.$store.state.viewDetalleMapa = true), (this.$store.state.modalVerEnemigos = false)" class="button is-success has-text-black p-5" v-if="this.$store.state.lenguaje == 'español'">Volver a Mapas</button>
            <button @click="(this.$store.state.viewDetalleMapa = true), (this.$store.state.modalVerEnemigos = false)" class="button is-success has-text-black p-5" v-if="this.$store.state.lenguaje == 'ingles'">Back to maps</button>
          </div>
          <p class="column"></p>
        </div>
        
      </div>
    </div>
</template>

<script>
import ModalDetalleEnemigo from "@/components/helpers/DetalleEnemigo.vue"

export default {
  name: "Enemigos de Mareas Tenebrosas",
  components:{
    ModalDetalleEnemigo
  },
  data(){
    return {
      EnemigosMapa1: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo35.jpg"),ENnombreEnemigo: "Altered beast", nombreEnemigo: "Bestia alterada",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo31.jpg"),ENnombreEnemigo: "Monster slave", nombreEnemigo: "Esclava mostruosa",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT2.jpg"),ENnombreEnemigo: "Kidnapper", nombreEnemigo: "Secuestrador al acecho",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT11.jpg"),ENnombreEnemigo: "Enraptured hybrid", nombreEnemigo: "Híbrido embelesado",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT13.jpg"),ENnombreEnemigo: "Impetuous hunter", nombreEnemigo: "Cazador impetuoso",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo26.jpg"),ENnombreEnemigo: "Sea singer", nombreEnemigo: "Cantor marino",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo25.jpg"),ENnombreEnemigo: "River bed", nombreEnemigo: "Endriago de río",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo24.jpg"),ENnombreEnemigo: "Hybrid thug", nombreEnemigo: "Matón híbrido",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo23.jpg"),ENnombreEnemigo: "Low-water predator", nombreEnemigo: "Depredador de bajamar",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo22.jpg"),ENnombreEnemigo: "Ocean stem", nombreEnemigo: "Vástago del océano",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo21.jpg"),ENnombreEnemigo: "Riverside beast", nombreEnemigo: "Bestia de la ribera",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo20.jpg"),ENnombreEnemigo: "Titan of the tide", nombreEnemigo: "Titán de la marea",}
      ],
      EnemigosExtrasMapa1: [],

      EnemigosMapa2: [
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT7.jpg"),ENnombreEnemigo: "Guardian beast", nombreEnemigo: "Bestia guardiana",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo13.jpg"),ENnombreEnemigo: "Strangers in robes", nombreEnemigo: "Extraños con túnicas",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT2.jpg"),ENnombreEnemigo: "Kidnapper", nombreEnemigo: "Secuestrador al acecho",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo32.jpg"),ENnombreEnemigo: "Touched by the void", nombreEnemigo: "Tocado por el vacío",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT6.jpg"),ENnombreEnemigo: "Scared bystander", nombreEnemigo: "Transeúnte asustado",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT1.jpg"),ENnombreEnemigo: "Scavenger glider", nombreEnemigo: "Carroñero planeador",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT3.jpg"),ENnombreEnemigo: "Byakhee rondador", nombreEnemigo: "Byakhee rondador",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT8.jpg"),ENnombreEnemigo: "Devouring master", nombreEnemigo: "Amo devorador",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT14.jpg"),ENnombreEnemigo: "Cruel slaver", nombreEnemigo: "Esclavista cruel",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT15.jpg"),ENnombreEnemigo: "Lividity lord", nombreEnemigo: "Señor de la lividez",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo11.jpg"),ENnombreEnemigo: "Fast byakhee", nombreEnemigo: "Byakhee veloz",},
      ],
      EnemigosExtrasMapa2: [{url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT9.jpg"),ENnombreEnemigo: "Declan Pearce", nombreEnemigo: "Declan Pearce",},],

      EnemigosMapa3: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo15.jpg"),ENnombreEnemigo: "Hungry predator", nombreEnemigo: "Depredador hambriento",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo31.jpg"),ENnombreEnemigo: "Monster slave", nombreEnemigo: "Esclava mostruosa",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo36.jpg"),ENnombreEnemigo: "Avian slave", nombreEnemigo: "Esclavo aviar",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo33.jpg"),ENnombreEnemigo: "Wolf slave", nombreEnemigo: "Esclavo lobuno",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT16.jpg"),ENnombreEnemigo: "Ice prisoner", nombreEnemigo: "Prisionero del hielo",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo34.jpg"),ENnombreEnemigo: "Altered servant", nombreEnemigo: "Siervo alterado",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT5.jpg"),ENnombreEnemigo: "Goddamned dream", nombreEnemigo: "Sonánbulo maldito",},
        
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT6.jpg"),ENnombreEnemigo: "Scared bystander", nombreEnemigo: "Transeúnte asustado",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT4.jpg"),ENnombreEnemigo: "Dreadful shadow", nombreEnemigo: "Sombra pavorosa",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT7.jpg"),ENnombreEnemigo: "Guardian beast", nombreEnemigo: "Bestia guardiana",},
      ],
      EnemigosExtrasMapa3: [],

      EnemigosMapa4: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo21.jpg"),ENnombreEnemigo: "Riverside beast", nombreEnemigo: "Bestia de la ribera",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo26.jpg"),ENnombreEnemigo: "Sea singer", nombreEnemigo: "Cantor marino",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo23.jpg"),ENnombreEnemigo: "Low-water predator", nombreEnemigo: "Depredador de bajamar",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo12.jpg"),ENnombreEnemigo: "Ceremonial magician", nombreEnemigo: "Mago ceremonial",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo17.jpg"),ENnombreEnemigo: "High priest", nombreEnemigo: "Sumo sacerdote",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT5.jpg"),ENnombreEnemigo: "Goddamned dream", nombreEnemigo: "Sonánbulo maldito",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT6.jpg"),ENnombreEnemigo: "Scared bystander", nombreEnemigo: "Transeúnte asustado",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT10.jpg"),ENnombreEnemigo: "Angry dreamer", nombreEnemigo: "Soñador colérico",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT11.jpg"),ENnombreEnemigo: "Enraptured hybrid", nombreEnemigo: "Híbrido embelesado",},
        {url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT12.jpg"),ENnombreEnemigo: "Supreme singer of R lyeh", nombreEnemigo: "Cantor supremo de R´lyeh",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo19.jpg"),ENnombreEnemigo: "Guardian of R lyeh", nombreEnemigo: "Guardián de R´lyeh",},
],
    }
  }, // end data
}
</script>

<style>
/* CSS en el Base */
</style>