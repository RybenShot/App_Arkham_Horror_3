<template>
  <div >
    <div class="modal-background"></div>
      <div class="mx-2 container allWindow  has-background-dark">
        <!-- TITULO-->
        <header class="modal-card-head BGEnemigos mb-3">
          <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light">{{ textoInterfaz.titulo }}</h2>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="(this.$store.state.viewDetalleMapa = true), (this.$store.state.modalVerEnemigos = false) "></i>
        </header>

        <div class="mx-3 mb-2 columns is-mobile">
          <p class="subtitle is-7 mb-0 has-text-white column"><i class="fa-1x fas fa-circle has-text-success mr-3"></i>{{ textoInterfaz.infocolor1 }}</p>
          <p class="subtitle is-7 mb-0 has-text-white column"><i class="fa-1x fas fa-circle has-text-warning mr-3"></i>{{ textoInterfaz.infocolor2 }}</p>
        </div>

        <!-- ModalDetalle -->
        <div v-if="this.$store.state.verDetalleEnemigo == true"><ModalDetalleEnemigo/></div>

        <div v-if="this.$store.state.datosMapa.idMapa == 8">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa1Noche" :key="enemigo.id">
              <div @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" 
                :class="{'sombraExpansionNoche':enemigo.expansion == 'Noche cerrada', 'sombraExpansionBase':enemigo.expansion == 'Base'}"/>

                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Hongo Ladron" ||  
                        enemigo.ESnombreEnemigo === "Mago ceremonial" ||
                        enemigo.ESnombreEnemigo === "Masa tremula" ||
                        enemigo.ESnombreEnemigo === "Reptante" ||
                        enemigo.ESnombreEnemigo === "Bestia alterada"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 8  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 9">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa2Noche" :key="enemigo.id">
              <div
              @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" 
                :class="{'sombraExpansionNoche':enemigo.expansion == 'Noche cerrada', 'sombraExpansionBase':enemigo.expansion == 'Base'}"/>

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Acolito gul" || 
                        enemigo.ESnombreEnemigo === "Gloton rabioso" ||
                        enemigo.ESnombreEnemigo === "Mago ceremonial"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 9  -->

        <h2 class="title has-text-light has-text-centered is-4 pt-3 mb-3">{{ textoInterfaz.enemigosExtras }}</h2>
        <hr class="my-1">

        <div v-if="this.$store.state.datosMapa.idMapa == 8">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'"> Sin enemigos extras</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'"> No extra enemies</p>
        </div><!-- end IF MAPA 8  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 9">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'"> Aparta a un lado todos los Monstruos O'Bannion y Sheldon que queden.</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'"> Set aside any remaining O'Bannion and Sheldon Monsters.</p>

          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosExtrasMapa2Noche" :key="enemigo.id">
              <div
              @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" width="100" 
                :class="{'sombraExpansionNoche':enemigo.expansion == 'Noche cerrada', 'sombraExpansionBase':enemigo.expansion == 'Base'}"/>

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 9  -->
        
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
  name: "enemigos de Noche Cerrada",
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

      EnemigosMapa1Noche: [
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC6.jpg"),ENnombreEnemigo: "Fickle stalker", ESnombreEnemigo: "Acechador veleidoso"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC5.jpg"),ENnombreEnemigo: "Brain extractor", ESnombreEnemigo: "Estractor de cerebros"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC1.jpg"),ENnombreEnemigo: "Thief mushroom", ESnombreEnemigo: "Hongo Ladron"},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo12.jpg"),ENnombreEnemigo: "Ceremonial magician", ESnombreEnemigo: "Mago ceremonial",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo9.jpg"),ENnombreEnemigo: "Lookout", ESnombreEnemigo: "Vigia sin ojos",},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC2.jpg"),ENnombreEnemigo: "Quivering mass", ESnombreEnemigo: "Masa tremula",},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC3.jpg"),ENnombreEnemigo: "Creeping", ESnombreEnemigo: "Reptante",},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC4.jpg"),ENnombreEnemigo: "Morphic terror", ESnombreEnemigo: "Terror morfico",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo10.jpg"),ENnombreEnemigo: "Carjacking", ESnombreEnemigo: "Robacadaveres",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo35.jpg"),ENnombreEnemigo: "Altered beast", ESnombreEnemigo: "Bestia alterada",},
      ],

      EnemigosMapa2Noche: [
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo4.jpg"),ENnombreEnemigo: "Acolyte gul", ESnombreEnemigo: "Acolito gul",},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC14.jpg"),ENnombreEnemigo: "Loquacious troublemaker", ESnombreEnemigo: "Alborotador locuaz"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC9.jpg"),ENnombreEnemigo: "Bragging brawler", ESnombreEnemigo: "Camorrista bravucon"},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo2.jpg"),ENnombreEnemigo: "Rabid gloton", ESnombreEnemigo: "Gloton rabioso",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo12.jpg"),ENnombreEnemigo: "Ceremonial magician", ESnombreEnemigo: "Mago ceremonial"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC10.jpg"),ENnombreEnemigo: "Lynch mob", ESnombreEnemigo: "Turba de linchamiento"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC6.jpg"),ENnombreEnemigo: "Fickle stalker", ESnombreEnemigo: "Acechador veleidoso"},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo8.jpg"),ENnombreEnemigo: "Abyssal servant", ESnombreEnemigo: "Siervo abisal",},
        {expansion: "Base" ,url: require("@/assets/img/4-Enemigos/1-Base/enemigo9.jpg"),ENnombreEnemigo: "Lookout", ESnombreEnemigo: "Vigia sin ojos",},
      ],
      EnemigosExtrasMapa2Noche: [
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC7.jpg"),ENnombreEnemigo: "Assasins", ESnombreEnemigo: "Sicarios"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC8.jpg"),ENnombreEnemigo: "Brutish lackeys", ESnombreEnemigo: "Esbirrios Brutales"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC11.jpg"),ENnombreEnemigo: "Siobhan Riley", ESnombreEnemigo: "Siobhan Riley"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC12.jpg"),ENnombreEnemigo: "Executioner's Arm", ESnombreEnemigo: "Brazo Ejecutor"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC13.jpg"),ENnombreEnemigo: "Corbel Bouchard", ESnombreEnemigo: "Corbel Bouchard"},
        {expansion: "Noche cerrada" ,url: require("@/assets/img/4-Enemigos/3-NocheCerrada/enemigoNC15.jpg"),ENnombreEnemigo: "Aggressive trafficker", ESnombreEnemigo: "Traficante agresivo"},
      ]
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "Enemigos";
        this.textoInterfaz.infocolor1 = "AH Base";
        this.textoInterfaz.infocolor2 = "Noche Cerrada";
        this.textoInterfaz.enemigosExtras = "Enemigos extras";
        this.textoInterfaz.volver = "Volver a Mapas";
      }else{
        this.textoInterfaz.titulo = "Enemies";
        this.textoInterfaz.infocolor1 = "AH Base";
        this.textoInterfaz.infocolor2 = "ClosedNigth";
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