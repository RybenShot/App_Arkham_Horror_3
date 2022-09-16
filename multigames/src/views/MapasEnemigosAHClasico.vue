<template>
  <div class="helperBGGeneral" :class="[BGGeneral]">
    <!-- HERO -->
    <router-link to="/">
      <div class="hero-body columns is-mobile p-4 m-0">
        <p class="f-x2 column is-one-fifth p-0"></p>
        <img id="imgTitleAH" class="column p-0" src="../assets/img/ZZOtros/TituloArkhamHorrorEDITADO.png" alt=""/>
        <p class="column is-one-fifth p-0"></p>
      </div>
    </router-link>

    <!-- VIEW DE ENEMIGOS -->
    <Enemigoscomponent v-if="viewMapa == false"
    :contador="contador"
    @valorMenosMasHijo="cambioContador"
    @cambiarVistaHijo ="cambioVista"
    />

    <!-- VIEW DE MAPA -->
    <Mapascomponent v-if="viewMapa == true"
    :contador="contador"
    @valorMenosMasHijo="cambioContador"
    @cambiarVistaHijo ="cambioVista"
    />
    <!-- 4 el evento que escucha RECIVE EL DATO y se ejecuta un metodo CON EL NOMBRE DEL EVENTO -->

    <!-- SELECCION DE PERSONAJE -->
    <router-link to="/PersonajesAHClasico">
      <div class="mt-3">
        <p class="subtitle has-text-white has-text-right is-5 py-3">Ir a seleccion de personaje <i class="fa-2x fas fa-forward"></i></p>
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
      contador: "1",
      viewMapa: true,
      BGGeneral: "BGGameGeneralMapa1",
    }; // end return
  }, // end data

  updated(){
    if (this.contador == 1) {
        this.BGGeneral = "BGGameGeneralMapa1";
      } else if (this.contador == 2) {
        this.BGGeneral = "BGGameGeneralMapa2";
      } else if (this.contador == 3) {
        this.BGGeneral = "BGGameGeneralMapa3";
      } else if (this.contador == 4) {
        this.BGGeneral = "BGGameGeneralMapa4";
      }
  }, // end updated
  methods: {
    cambioContador(seleccionMenosMas){
      // 5 finalmente se ejecuta el evento segun el dato que traiga
      console.warn(seleccionMenosMas)
      if (seleccionMenosMas == 'mas') {
        this.contador ++
      } else if(seleccionMenosMas == 'menos'){
        this.contador --
      } else {
        alert("Algo ha ido mal..")
      }
    }, // end cambioMapa
    cambioVista(ValueCambiarVista){
      this.viewMapa = ValueCambiarVista
    } // end cambioVista
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
.BGGameGeneralMapa1 {background-image: url(../assets/img/Games/AHBase/1imgMapas/BG1MapaArkham.jpg);}
.BGGameGeneralMapa2 {background-image: url(../assets/img/Games/AHBase/1imgMapas/BG2MapaArkham.jpg);}
.BGGameGeneralMapa3 {background-image: url(../assets/img/Games/AHBase/1imgMapas/BG3MapaArkham.jpg);}
.BGGameGeneralMapa4 {background-image: url(../assets/img/Games/AHBase/1imgMapas/BG4MapaArkham.jpg);}
</style>>