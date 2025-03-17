<template>
     <div >
      <div class="modal-background"></div>
      <div class="mx-2 container allWindow has-background-dark">
        <!-- TITULO-->

        <header class="modal-card-head BGEnemigos mb-3">
          <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light">{{ textoInterfaz.titulo }}</h2>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="(this.$store.state.viewDetalleMapa = true), (this.$store.state.modalVerEnemigos = false) "></i>
        </header>

        <div class="mx-3 mb-2 columns is-mobile">
          <p class="subtitle is-7 mb-0 has-text-white column"><i class="fa-1x fas fa-circle has-text-success mr-3"></i>{{ textoInterfaz.infocolor1 }}</p>
          <p class="subtitle is-7 mb-0 has-text-white column"><i class="fa-1x fas fa-circle has-text-info mr-3"></i>{{ textoInterfaz.infocolor2 }}</p>
        </div>

        <!-- ModalDetalle -->
        <div v-if="this.$store.state.verDetalleEnemigo == true"><ModalDetalleEnemigo/></div>

        <div v-if="this.$store.state.datosMapa.idMapa == 4">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa1" :key="enemigo.id">
              <div @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.nombreEnemigo" 
                :class="{'sombraExpansionMareas':enemigo.expansion == 'Mareas Tenebrosas', 'sombraExpansionBase':enemigo.expansion == 'Base'}"/>

                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.nombreEnemigo }}</p>
                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.nombreEnemigo === "Bestia alterada" ||  
                        enemigo.nombreEnemigo === "Esclava mostruosa" || 
                        enemigo.nombreEnemigo === "Secuestrador al acecho" ||
                        enemigo.nombreEnemigo === "Endriago de río" ||
                        enemigo.nombreEnemigo === "Matón híbrido" ||
                        enemigo.nombreEnemigo === "Depredador de bajamar" ||
                        enemigo.nombreEnemigo === "Vástago del océano"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 4  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 5">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa2" :key="enemigo.id">
              <div @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.nombreEnemigo" 
                :class="{'sombraExpansionMareas':enemigo.expansion == 'Mareas Tenebrosas', 'sombraExpansionBase':enemigo.expansion == 'Base'}"/>

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.nombreEnemigo === "Secuestrador al acecho" ||
                        enemigo.nombreEnemigo === "Tocado por el vacío" ||
                        enemigo.nombreEnemigo === "Transeúnte asustado"
                        '> X2</p>
                <p class="has-text-danger  titleDecoration2 pt-0" v-if= ' enemigo.nombreEnemigo === "Extraños con túnicas"'> X3</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 5  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 6">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa3" :key="enemigo.id">
              <div @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.nombreEnemigo" 
                :class="{'sombraExpansionMareas':enemigo.expansion == 'Mareas Tenebrosas', 'sombraExpansionBase':enemigo.expansion == 'Base'}"/>

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.nombreEnemigo === "Esclava mostruosa" ||  
                        enemigo.nombreEnemigo === "Prisionero del hielo" ||
                        enemigo.nombreEnemigo === "Siervo alterado" ||
                        enemigo.nombreEnemigo === "Sonanbulo maldito" ||
                        enemigo.nombreEnemigo === "Transeúnte asustado"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 6  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 7">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa4" :key="enemigo.id">
              <div @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.nombreEnemigo" 
                :class="{'sombraExpansionMareas':enemigo.expansion == 'Mareas Tenebrosas', 'sombraExpansionBase':enemigo.expansion == 'Base'}"/>

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.nombreEnemigo === "Depredador de bajamar" ||  
                        enemigo.nombreEnemigo === "Mago ceremonial" ||
                        enemigo.nombreEnemigo === "Soñador colérico" ||
                        enemigo.nombreEnemigo === "Sonanbulo maldito" ||
                        enemigo.nombreEnemigo === "Transeúnte asustado"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 7  -->

        <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light has-text-centered">{{ textoInterfaz.enemigosExtras }}</h2>
        <hr class="my-1">

        <div v-if="this.$store.state.datosMapa.idMapa == 4">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'">Crea el mazo de TERROR usando las cartas de 'Frenesí devorador'</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'">Create the TERROR deck using 'Devouring Frenzy' cards</p>
        </div><!-- end IF MAPA 4  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 5">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'"> Crea el mazo de Anomalias utilizando las cartas de "Visiones de la luna"</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'"> Create the Anomalies deck using "Visions of the Moon" cards</p>

          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'"> Aparta a un lado el Monstruo Declan Pearce</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'"> Set aside the Declan Pearce Monster.</p>

          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosExtrasMapa2" :key="enemigo.id">
              <div @click="(this.$store.state.verDetalleEnemigo = true),(this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mx-1">
                <img :src="enemigo.url" :alt="enemigo.nombreEnemigo" width="100" 
                :class="{'sombraExpansionMareas':enemigo.expansion == 'Mareas Tenebrosas', 'sombraExpansionBase':enemigo.expansion == 'Base'}"/>

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 5  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 6">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'">Crea el mazo de Terror utilizando las cartas de "Ciudad helada"</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'">Create the Terror deck using "Frost City" cards</p>

          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosExtrasMapa3" :key="enemigo.id">
              <div class="helperCartasEnemigos mx-1">
                <img :src="enemigo.url" :alt="enemigo.nombreEnemigo" width="100" 
                :class="{'sombraExpansionMareas':enemigo.expansion == 'Mareas Tenebrosas', 'sombraExpansionBase':enemigo.expansion == 'Base'}"/>

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.nombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>
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
            <button @click="(this.$store.state.viewDetalleMapa = true), (this.$store.state.modalVerEnemigos = false)" class="button is-success has-text-black p-5">{{ textoInterfaz.volver }}</button>
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
      textoInterfaz: {
        titulo: "",
        infocolor1:"",
        infocolor2:"",
        enemigos: "",
        enemigosExtras: "",
        volver: ""
      },

      // Tiranos de la desolacion
      EnemigosMapa1: [
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo35.jpg"),ENnombreEnemigo: "Altered beast", nombreEnemigo: "Bestia alterada",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo31.jpg"),ENnombreEnemigo: "Monster slave", nombreEnemigo: "Esclava mostruosa",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT2.jpg"),ENnombreEnemigo: "Kidnapper", nombreEnemigo: "Secuestrador al acecho",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT11.jpg"),ENnombreEnemigo: "Enraptured hybrid", nombreEnemigo: "Híbrido embelesado",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT13.jpg"),ENnombreEnemigo: "Impetuous hunter", nombreEnemigo: "Cazador impetuoso",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo26.jpg"),ENnombreEnemigo: "Sea singer", nombreEnemigo: "Cantor marino",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo25.jpg"),ENnombreEnemigo: "River bed", nombreEnemigo: "Endriago de río",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo24.jpg"),ENnombreEnemigo: "Hybrid thug", nombreEnemigo: "Matón híbrido",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo23.jpg"),ENnombreEnemigo: "Low-water predator", nombreEnemigo: "Depredador de bajamar",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo22.jpg"),ENnombreEnemigo: "Ocean stem", nombreEnemigo: "Vástago del océano",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo21.jpg"),ENnombreEnemigo: "Riverside beast", nombreEnemigo: "Bestia de la ribera",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo20.jpg"),ENnombreEnemigo: "Titan of the tide", nombreEnemigo: "Titán de la marea",}
      ],
      EnemigosExtrasMapa1: [],

      //Lampara mortecina
      EnemigosMapa2: [
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT7.jpg"),ENnombreEnemigo: "Guardian beast", nombreEnemigo: "Bestia guardiana",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo13.jpg"),ENnombreEnemigo: "Strangers in robes", nombreEnemigo: "Extraños con túnicas",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT2.jpg"),ENnombreEnemigo: "Kidnapper", nombreEnemigo: "Secuestrador al acecho",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo32.jpg"),ENnombreEnemigo: "Touched by the void", nombreEnemigo: "Tocado por el vacío",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT6.jpg"),ENnombreEnemigo: "Scared bystander", nombreEnemigo: "Transeúnte asustado",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT1.jpg"),ENnombreEnemigo: "Scavenger glider", nombreEnemigo: "Carroñero planeador",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT3.jpg"),ENnombreEnemigo: "Byakhee rondador", nombreEnemigo: "Byakhee rondador",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT8.jpg"),ENnombreEnemigo: "Devouring master", nombreEnemigo: "Amo devorador",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT14.jpg"),ENnombreEnemigo: "Cruel slaver", nombreEnemigo: "Esclavista cruel",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT15.jpg"),ENnombreEnemigo: "Lividity lord", nombreEnemigo: "Señor de la lividez",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo11.jpg"),ENnombreEnemigo: "Fast byakhee", nombreEnemigo: "Byakhee veloz",},
      ],
      EnemigosExtrasMapa2: [
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT9.jpg"),ENnombreEnemigo: "Declan Pearce", nombreEnemigo: "Declan Pearce",}
      ],

      // La progenie de Ithaqua
      EnemigosMapa3: [
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo15.jpg"),ENnombreEnemigo: "Hungry predator", nombreEnemigo: "Depredador hambriento",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo31.jpg"),ENnombreEnemigo: "Monster slave", nombreEnemigo: "Esclava mostruosa",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo36.jpg"),ENnombreEnemigo: "Avian slave", nombreEnemigo: "Esclavo aviar",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo33.jpg"),ENnombreEnemigo: "Wolf slave", nombreEnemigo: "Esclavo lobuno",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT16.jpg"),ENnombreEnemigo: "Ice prisoner", nombreEnemigo: "Prisionero del hielo",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo34.jpg"),ENnombreEnemigo: "Altered servant", nombreEnemigo: "Siervo alterado",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT5.jpg"),ENnombreEnemigo: "Goddamned dream", nombreEnemigo: "Sonanbulo maldito",},
        
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT6.jpg"),ENnombreEnemigo: "Scared bystander", nombreEnemigo: "Transeúnte asustado",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT4.jpg"),ENnombreEnemigo: "Dreadful shadow", nombreEnemigo: "Sombra pavorosa",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT7.jpg"),ENnombreEnemigo: "Guardian beast", nombreEnemigo: "Bestia guardiana",},
      ],
      EnemigosExtrasMapa3: [],

      // Sueños de R'lyeh
      EnemigosMapa4: [
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo21.jpg"),ENnombreEnemigo: "Riverside beast", nombreEnemigo: "Bestia de la ribera",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo26.jpg"),ENnombreEnemigo: "Sea singer", nombreEnemigo: "Cantor marino",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo23.jpg"),ENnombreEnemigo: "Low-water predator", nombreEnemigo: "Depredador de bajamar",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo12.jpg"),ENnombreEnemigo: "Ceremonial magician", nombreEnemigo: "Mago ceremonial",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo17.jpg"),ENnombreEnemigo: "High priest", nombreEnemigo: "Sumo sacerdote",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT5.jpg"),ENnombreEnemigo: "Goddamned dream", nombreEnemigo: "Sonanbulo maldito",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT6.jpg"),ENnombreEnemigo: "Scared bystander", nombreEnemigo: "Transeúnte asustado",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT10.jpg"),ENnombreEnemigo: "Angry dreamer", nombreEnemigo: "Soñador colérico",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT11.jpg"),ENnombreEnemigo: "Enraptured hybrid", nombreEnemigo: "Híbrido embelesado",},
        {expansion: "Mareas Tenebrosas" ,url: require("@/assets/img/4-Enemigos/2-Mareas/enemigoMT12.jpg"),ENnombreEnemigo: "Supreme singer of R lyeh", nombreEnemigo: "Cantor supremo de R´lyeh",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo19.jpg"),ENnombreEnemigo: "Guardian of R lyeh", nombreEnemigo: "Guardián de R´lyeh",},
],
    }
  }, // end data
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "Enemigos";
        this.textoInterfaz.infocolor1 = "AH Base";
        this.textoInterfaz.infocolor2 = "Mareas Tenebrosas";
        this.textoInterfaz.enemigosExtras = "Enemigos extras";
        this.textoInterfaz.volver = "Volver a Mapas";
      }else{
        this.textoInterfaz.titulo = "Enemies";
        this.textoInterfaz.infocolor1 = "AH Base";
        this.textoInterfaz.infocolor2 = "Dark Waves";
        this.textoInterfaz.enemigosExtras = "Extra enemies";
        this.textoInterfaz.volver = "Back to maps";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
/* CSS en el Base */
</style>