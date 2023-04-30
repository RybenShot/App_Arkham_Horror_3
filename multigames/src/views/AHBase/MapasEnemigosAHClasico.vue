<template>
  <div class="helperBGGeneral" :class="[BGGeneral]">
    <!-- HERO -->
    <router-link to="/">
      <div class="hero-body columns is-mobile p-4 m-0">
        <p class="f-x2 column is-one-fifth p-0"></p>
        <img id="imgTitleAH" class="column p-0" src="@/assets/img/ZZOtros/TituloArkhamHorrorEDITADO.png" alt=""/>
        <p class="column is-one-fifth p-0"></p>
      </div>
    </router-link>

    <!-- VIEW DE ENEMIGOS -->
    <Enemigoscomponent v-if="this.$store.state.viewMapa == false"
    />

    <!-- VIEW DE MAPA -->
    <Mapascomponent v-if="this.$store.state.viewMapa == true"
    @cambiarBGHijo ="MetodoCambioBG"
    />

    <!-- SELECCION DE PERSONAJE -->
    <router-link to="/PersonajesAHClasico">
      <div class="mt-3">
        <p class="subtitle has-text-right is-5 p-3" v-if="this.$store.state.lenguaje == 'español'" ><button class="button is-danger">Ir a seleccion de personaje<i class="fa-2x fas fa-forward pl-2"></i></button></p>
        <p class="subtitle has-text-right is-5 p-3" v-if="this.$store.state.lenguaje == 'ingles'" ><button class="button is-danger">Go to character selection<i class="fa-2x fas fa-forward pl-2"></i></button></p>
      </div>
      <!-- end seleccion de personaje  -->
    </router-link>
  </div>
</template>

<script>
  import Mapascomponent from "@/components/AHBase/mapasAHBase.vue";
  import Enemigoscomponent from "@/components/AHBase/enemigosAHBase.vue";

export default {
  name: "View Mapas AH Clasico",
  components: {
    Mapascomponent,
    Enemigoscomponent
  },
  data() {
    return {
      viewMapa: true, 
      contadorBGGeneral: 1
    }; // end return
  }, // end data

    beforeCreate(){
    // Esta parte se tiene que dejar para que en la primera carga aparezca ya el BG del mapa cargado.
    if (this.$store.state.contadorMapa == 0) {this.BGGeneral = "BGGameGeneralMapa1"}
    else if (this.$store.state.contadorMapa == 1) {this.BGGeneral = "BGGameGeneralMapa2"}
    else if (this.$store.state.contadorMapa == 2) {this.BGGeneral = "BGGameGeneralMapa3"}
    else if (this.$store.state.contadorMapa == 3) {this.BGGeneral = "BGGameGeneralMapa4"}
  },

  beforeUpdate(){
    if (this.$store.state.contadorMapa == 0) {// cambia el BG  
        this.BGGeneral = "BGGameGeneralMapa1";
      } else if (this.$store.state.contadorMapa == 1) {
        this.BGGeneral = "BGGameGeneralMapa2";
      } else if (this.$store.state.contadorMapa == 2) {
        this.BGGeneral = "BGGameGeneralMapa3";
      } else if (this.$store.state.contadorMapa == 3) {
        this.BGGeneral = "BGGameGeneralMapa4";
      }
  }, // end updated

  methods: {
    MetodoCambioBG(ValueCambioBG){ //intento fallido de cambiar el BG desde el hijo
      if (ValueCambioBG == `mas`) {
        this.contadorBGGeneral ++
        console.log(this.contadorBGGeneral)
      } else if (ValueCambioBG == `menos`) {
       this.contadorBGGeneral --
       console.log(this.contadorBGGeneral)
      } 
    }
  }, // end methods
};
</script>


<style >
@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap");

.allWindow {
  min-height: 70vh;
}

.titleDecoration {
  -webkit-text-stroke: 0,1px rgb(255, 255, 255)!important;
  color: black;
  font-family: "Roboto Flex", sans-serif;
  font-size: 2rem!important;
  text-align: center;
}

.card {
  background: rgba(79, 79, 79, 0.75);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

#tituloDescripcion {
  min-height: 20vh;
}

/* BACKGROUND */
.helperBGGeneral{
  min-height: 100vh;
  background-position: center;
  background-size: cover;
}
.BGGameGeneralMapa1 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/BG1MapaArkham.jpg);}
.BGGameGeneralMapa2 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/BG2MapaArkham.jpg);}
.BGGameGeneralMapa3 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/BG3MapaArkham.jpg);}
.BGGameGeneralMapa4 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/BG4MapaArkham.jpg);}
</style>>