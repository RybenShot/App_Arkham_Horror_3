<template>
  <div class="my-3">
    <div class="modal-background"></div>
    <div class="mx-2 container allWindow  has-background-dark">

      <!-- TITULO-->
      <header class="modal-card-head BGEnemigos mb-3 px-5"> 
        <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light">{{ textoInterfaz.titulo }}</h2> 
        <i class="fa-2x fas fa-times-circle has-text-danger" @click="closeEnemiesModal()"></i>
      </header>

      <!-- info color expansion-->
      <div class="mx-3 mb-3 columns is-mobile pt-2">
        <div class="column p-0 px-2">
          <p class="subtitle is-7 mb-0 has-text-white"><i class="fa-1x fas fa-circle has-text-success mr-3"></i>{{ textoInterfaz.infocolor1 }}</p>
        </div>
        <div class="column p-0 px-2">
          <p class="subtitle is-7 mb-0 has-text-white"><i class="fa-1x fas fa-circle has-text-info mr-3"></i>{{ textoInterfaz.infocolor2 }}</p>
        </div>
        <div class="column p-0 px-2">
          <p class="subtitle is-7 mb-0 has-text-white"><i class="fa-1x fas fa-circle has-text-warning mr-3"></i>{{ textoInterfaz.infocolor3 }}</p>
        </div>
        <div class="column p-0 px-2">
          <p class="subtitle is-7 mb-0 has-text-white"><i class="fa-1x fas fa-circle has-text-link mr-3"></i>{{ textoInterfaz.infocolor4 }}</p>
        </div>
      </div>

      <!-- ModalDetalle -->
      <div v-if="this.$store.state.verDetalleEnemigo == true"> <ModalDetalleEnemigo/> </div>

        <div id="enemisList" class="px-1">
          <div v-for="monster in monstersList.enemies" :key="monster.id">
            <div @click="watchEnemiDetail(monster)" class="helperCartasEnemigos mb-4 mx-1">

              <img :src="monster.img" :alt="monster.name" :class="{
                'sombraExpansionBase':monster.expansion == 'AHBase',
                'sombraExpansionMareas':monster.expansion == 'AHWaves', 
                'sombraExpansionNoche':monster.expansion == 'AHNigth',
                'sombraExpansionSecretos':monster.expansion == 'AHSecrets'}"/>
              <p v-if="$store.state.lenguaje === 'español'" class="has-text-white titleDecoration2 pt-0" >{{ monster.translations.es.name }}</p>
              <p v-else class="has-text-white titleDecoration2 pt-0" >{{ monster.name }}</p>

              <p class="has-text-success  titleDecoration2 pt-0">X {{ monster.quantity }}</p>

            </div>
          </div>
        </div><!-- end ENEMIGOS PRINCIPALES  -->

      <h2 class="title titleDecoration has-text-white has-text-centered is-4 pt-3 mb-3">{{ textoInterfaz.enemigosExtras }}</h2>
      <hr class="my-1">

      <div>
        <p v-if="$store.state.lenguaje === 'español'" class="has-text-white has-text-centered py-3" >{{ monstersList.EStextSpecialEnemies }}</p>
        <p v-else class="has-text-white has-text-centered py-3" >{{ monstersList.textSpecialEnemies }}</p>

        <div id="enemisList" class="px-1 py-3">
            <div v-for="monster in monstersList.specialEnemies" :key="monster.id">
              <div @click="watchEnemiDetail(monster)" class="helperCartasEnemigos mx-1">
                
                <img :src="monster.img" :alt="monster.name" :class="{
                  'sombraExpansionBase':monster.expansion == 'AHBase',
                  'sombraExpansionMareas':monster.expansion == 'AHWaves', 
                  'sombraExpansionNoche':monster.expansion == 'AHNigth',
                  'sombraExpansionSecretos':monster.expansion == 'AHSecrets'}"/>
                <p v-if="$store.state.lenguaje === 'español'" class="has-text-white titleDecoration2 pt-0" >{{ monster.translations.es.name }}</p>
                <p v-else class="has-text-white titleDecoration2 pt-0" >{{ monster.name }}</p>

                <p class="has-text-success  titleDecoration2 pt-0">X {{ monster.quantity }}</p>

              </div>
            </div>
          </div>
      </div><!-- end ENEMIGOS SEGUNDARIOS  -->

      <!-- Boton volver -->
      <div class="columns is-mobile  my-4">
        <p class="column"></p>
        <div class="column">
          <button @click="closeEnemiesModal()" class="button is-success has-text-black p-5">{{ textoInterfaz.volver }}</button>
        </div>
        <p class="column"></p>
      </div>
    </div>
  </div>    
</template>

<script>
import ModalDetalleEnemigo from "@/components/helpers/DetalleEnemigo.vue"

export default {
  name: "Switcher Enemigos", 
  components: {
    ModalDetalleEnemigo
  },
  data(){
    return{
      textoInterfaz: {
        titulo: "",
        infocolor1:"",
        infocolor2:"",
        infocolor3:"",
        infocolor4:"",
        enemigos: "",
        enemigosExtras: "",
        volver: ""
      },
      monstersList: []
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "Enemigos";
        this.textoInterfaz.infocolor1 = "Base";
        this.textoInterfaz.infocolor2 = "Mareas Tenebrosas";
        this.textoInterfaz.infocolor3 = "Noche Cerrada";
        this.textoInterfaz.infocolor4 = "Secretos";
        this.textoInterfaz.enemigosExtras = "Enemigos extras";
        this.textoInterfaz.volver = "Volver a Mapas";
      }else{
        this.textoInterfaz.titulo = "Enemies";
        this.textoInterfaz.infocolor1 = "AH Base";
        this.textoInterfaz.infocolor2 = "Dark Waves";
        this.textoInterfaz.infocolor3 = "Closed Nigth";
        this.textoInterfaz.infocolor4 = "AH Secrets";
        this.textoInterfaz.enemigosExtras = "Extra enemies";
        this.textoInterfaz.volver = "Back to maps";
      }
    },
    async getEnemiesList(){
      this.monstersList = await this.$store.getters.getEnemysList;
      console.log(this.monstersList) // aqui me aparecen los enemigos en un array
    },
    closeEnemiesModal(){
      this.$store.state.viewDetalleMapa = true
      this.$store.state.modalVerEnemigos = false
    },
    async watchEnemiDetail(monster){
      this.$store.state.SeleccionarURLEnemigo = await monster.img
      this.$store.state.verDetalleEnemigo = true
    }
  },
  mounted(){
    this.getEnemiesList();
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
/* 
verde:       Base
azul claro:  Mareas
amarillo:    Noche
azul oscuro: Secretos
 */
 .sombraExpansionBase{
  box-shadow: 0px 0px 10px #05FF00 ;

}
.sombraExpansionNoche{
  box-shadow: 0px 0px 10px #fffb00 ;
}
.sombraExpansionMareas{
  box-shadow: 0px 0px 10px #00e1ff ;
}
.sombraExpansionSecretos{
  box-shadow: 0px 0px 10px #0400ff ;
}

.modal-card-foot, .modal-card-head {
  justify-content: space-between !important;
}

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

/* redondeado de cartas de enemigos */
.helperCartasEnemigos img{
  border-radius: 5%;
}

.BGEnemigos{
  background-image: url(@/assets/img/4-Enemigos/Enemigos.jpg);
  background-position: center;
  background-size: cover;
}
.helperCartasEnemigos{
  max-width: 100px
}
</style>