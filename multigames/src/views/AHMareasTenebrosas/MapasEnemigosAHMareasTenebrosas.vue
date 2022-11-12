<template>
  <div class="helperBGGeneral" :class="[BGGeneral]">
    <!-- HERO -->
    <router-link to="/">
      <div class="hero-body columns is-mobile p-4 m-0">
        <p class="f-x2 column is-one-fifth p-0"></p>
        <img id="imgTitleAH" class="column p-0" src="../../assets/img/ZZOtros/TituloArkhamHorrorEDITADO.png" alt=""/>
        <p class="column is-one-fifth p-0"></p>
      </div>
    </router-link>

    <!-- VIEW DE ENEMIGOS -->
    <EnemigoscomponentAHMareasTenebrosas v-if="viewMapa == false"
    @cambiarVistaHijo ="cambioVista"
    />

    <!-- VIEW DE MAPA -->
    <MapascomponentAHMareasTenebrosas v-if="viewMapa == true"
    @cambiarVistaHijo ="cambioVista"
    />
    <!-- 4 el evento que escucha RECIVE EL DATO y se ejecuta un metodo CON EL NOMBRE DEL EVENTO -->

    <!-- SELECCION DE PERSONAJE -->
    <router-link to="/PersonajesAHMareasTenebrosas">
      <div class="mt-3">
        <p class="subtitle has-text-white has-text-right is-5 py-3">Ir a seleccion de personaje <i class="fa-2x fas fa-forward"></i></p>
      </div>
      <!-- end seleccion de personaje  -->
    </router-link>
  </div>
</template>

<script>
  import MapascomponentAHMareasTenebrosas from "@/components/AHMareasTenebrosas/mapasAHMareasTenebrosas.vue";
  import EnemigoscomponentAHMareasTenebrosas from "@/components/AHMareasTenebrosas/enemigosAHareasTenerbosas.vue";

export default {
  name: "View Mapas AH Mareas Tenebrosas",
  components: {
    MapascomponentAHMareasTenebrosas,
    EnemigoscomponentAHMareasTenebrosas
  },
  data() {
    return {
      viewMapa: true,
      BGGeneral: "BGGameGeneralMapa5",
    }; // end return
  }, // end data

  updated(){
    if (this.$store.state.contadorMapa == 0) {
        this.BGGeneral = "BGGameGeneralMapa5";
      } else if (this.$store.state.contadorMapa == 1) {
        this.BGGeneral = "BGGameGeneralMapa6";
      } else if (this.$store.state.contadorMapa == 2) {
        this.BGGeneral = "BGGameGeneralMapa7";
      } else if (this.$store.state.contadorMapa == 3) {
        this.BGGeneral = "BGGameGeneralMapa8";
      }
  }, // end updated
  methods: {
    cambioContador(seleccionMenosMas){
      // 5 finalmente se ejecuta el evento segun el dato que traiga
      console.warn(seleccionMenosMas)
      if (seleccionMenosMas == 'mas') {
        this.$store.state.contadorMapa ++
      } else if(seleccionMenosMas == 'menos'){
        this.$store.state.contadorMapa --
      } else {
        alert("Algo ha ido mal..")
      }
    }, // end cambioMapa
    cambioVista(ValueCambiarVista){
      this.viewMapa = ValueCambiarVista
    } ,// end cambioVista

    datoEspavila(value){
      this.datoEspavilaJoder + value
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
.BGGameGeneralMapa5 {background-image: url(../../assets/img/Games/AHMareasTenebrosas/1imgMapas/BG1MapaAHMareasTenebrosas.jpg);}
.BGGameGeneralMapa6 {background-image: url(../../assets/img/Games/AHMareasTenebrosas/1imgMapas/BG2MapaAHMareasTenebrosas.jpg);}
.BGGameGeneralMapa7 {background-image: url(../../assets/img/Games/AHMareasTenebrosas/1imgMapas/BG3MapaAHMareasTenebrosas.jpg);}
.BGGameGeneralMapa8 {background-image: url(../../assets/img/Games/AHMareasTenebrosas/1imgMapas/BG4MapaAHMareasTenebrosas.jpg);}
</style>>